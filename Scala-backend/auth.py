import os
import sys
from datetime import datetime, timedelta
from typing import Optional, List

import bcrypt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
import jwt
from dotenv import load_dotenv

# ─── Load .env ────────────────────────────────────────────────────────────────
load_dotenv()

DB_URL        = os.getenv("DB_URL")
JWT_SECRET    = os.getenv("JWT_SECRET", "jwt_secret_fallback")
REFRESH_SECRET = os.getenv("REFRESH_SECRET", "refresh_secret_fallback")
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", "24"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "180"))

if not DB_URL:
    print("⚠️  DB_URL missing from .env — auth will fail without it")

# ─── MongoDB Connection (shared with main.py) ─────────────────────────────────
client: Optional[AsyncIOMotorClient] = None
db = None

async def connect_db():
    """Initialize MongoDB connection — called by main.py"""
    global client, db
    try:
        client = AsyncIOMotorClient(DB_URL)
        await client.admin.command("ping")
        db_name = DB_URL.split("/")[-1].split("?")[0] or "scala_guard"
        db = client[db_name]
        print("✅  MongoDB connected (auth)")
    except Exception as e:
        print(f"⚠️  MongoDB connection error: {e}")

async def disconnect_db():
    """Close MongoDB connection — called by main.py"""
    global client
    if client:
        client.close()
        print("🔌  MongoDB disconnected (auth)")

def set_db(database):
    """Set db reference from main.py"""
    global db
    db = database

# ─── Pydantic Schemas ─────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    email:    EmailStr
    password: str
    name:     Optional[str] = ""
    fullName: Optional[str] = ""
    role:     Optional[str] = "user"

class LoginRequest(BaseModel):
    email:    EmailStr
    password: str

class RefreshRequest(BaseModel):
    refreshToken: str

class LogoutRequest(BaseModel):
    refreshToken: Optional[str] = None

class VerifyRequest(BaseModel):
    email: EmailStr
    code:  str

class UserOut(BaseModel):
    id:         str
    email:      str
    fullName:   str
    role:       str
    isVerified: bool

# ─── JWT Helpers ─────────────────────────────────────────────────────────────

def normalize_role(role: Optional[str]) -> str:
    allowed_roles = {"user", "admin"}
    normalized = (role or "user").strip().lower()
    if normalized not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role",
        )
    return normalized


def generate_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "id":    user_id,
        "email": email,
        "role":  role,
        "exp":   datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def generate_refresh_token(user_id: str) -> str:
    payload = {
        "id":  user_id,
        "exp": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
    }
    return jwt.encode(payload, REFRESH_SECRET, algorithm="HS256")

def verify_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

def verify_refresh_token(token: str) -> dict:
    try:
        return jwt.decode(token, REFRESH_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Refresh token expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid refresh token",
        )

# ─── authMiddleware (FastAPI Dependency) ─────────────────────────────────────
# JS: Authorization: Bearer <token>  →  same in Python via HTTPBearer

security = HTTPBearer()
optional_security = HTTPBearer(auto_error=False)

async def auth_middleware(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    Dependency — use in any protected route:
        current_user: dict = Depends(auth_middleware)
    Returns decoded token payload with keys: id, email, role
    """
    token   = credentials.credentials
    payload = verify_access_token(token)
    return payload

def require_role(*roles: str):
    """
    Role guard dependency factory.
    Usage:  Depends(require_role("admin"))
    """
    async def _guard(current_user: dict = Depends(auth_middleware)):
        if current_user.get("role") not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: insufficient role",
            )
        return current_user
    return _guard


async def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(optional_security),
) -> Optional[dict]:
    if not credentials:
        return None
    return verify_access_token(credentials.credentials)

# ─── FastAPI Router ──────────────────────────────────────────────────────────
router = APIRouter()


def build_user_payload(user: dict, access_token: str, refresh_token: str) -> dict:
    user_id = str(user["_id"])
    full_name = user.get("fullName", "")
    role = user.get("role", "user")
    payload = {
        "id": user_id,
        "email": user["email"],
        "fullName": full_name,
        "name": full_name,
        "role": role,
        "isVerified": user.get("isVerified", False),
        "token": access_token,
        "accessToken": access_token,
        "refreshToken": refresh_token,
    }
    payload["user"] = {
        "id": user_id,
        "email": user["email"],
        "fullName": full_name,
        "name": full_name,
        "role": role,
        "isVerified": user.get("isVerified", False),
    }
    return payload

# ─── Register ─────────────────────────────────────────────────────────────────
@router.post("/api/v1/auth/register", status_code=201)
@router.post("/api/auth/register", status_code=201)
async def register(body: RegisterRequest):
    email    = body.email.lower().strip()
    password = body.password.strip()
    full_name = (body.fullName or body.name or "").strip()
    role = normalize_role(body.role)

    if not email or not password:
        raise HTTPException(400, detail="Email and password are required")

    # Check duplicate
    existing = await db["users"].find_one({"email": email})
    if existing:
        raise HTTPException(400, detail="Email already registered")

    # Hash password — bcrypt
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    user_doc = {
        "email":            email,
        "passwordHash":     password_hash,
        "fullName":         full_name,
        "role":             role,
        "isVerified":       True,
        "verificationCode": None,
        "refreshTokens":    [],
        "createdAt":        datetime.utcnow(),
        "updatedAt":        datetime.utcnow(),
    }

    result  = await db["users"].insert_one(user_doc)
    user_id = str(result.inserted_id)

    access_token  = generate_access_token(user_id, email, role)
    refresh_token = generate_refresh_token(user_id)

    await db["users"].update_one(
        {"_id": result.inserted_id},
        {"$push": {"refreshTokens": refresh_token}},
    )

    return {
        "status": "success",
        "ok":      True,
        "message": "Registration successful",
        "data": build_user_payload({
            "_id": user_id,
            "email": email,
            "fullName": full_name,
            "role": role,
            "isVerified": True,
        }, access_token, refresh_token),
    }

# ─── Login ────────────────────────────────────────────────────────────────────
@router.post("/api/v1/auth/login")
@router.post("/api/auth/login")
async def login(body: LoginRequest):
    email    = body.email.lower().strip()
    password = body.password.strip()

    if not email or not password:
        raise HTTPException(400, detail="Email and password are required")

    user = await db["users"].find_one({"email": email})
    if not user:
        raise HTTPException(400, detail="Invalid credentials")

    match = bcrypt.checkpw(password.encode("utf-8"), user["passwordHash"].encode("utf-8"))
    if not match:
        raise HTTPException(400, detail="Invalid credentials")

    user_id = str(user["_id"])
    role = user.get("role", "user")

    access_token  = generate_access_token(user_id, email, role)
    refresh_token = generate_refresh_token(user_id)

    await db["users"].update_one(
        {"_id": user["_id"]},
        {
            "$push":  {"refreshTokens": refresh_token},
            "$set":   {"updatedAt": datetime.utcnow()},
        },
    )

    return {
        "status": "success",
        "ok":      True,
        "message": "Login successful",
        "data": build_user_payload(user, access_token, refresh_token),
    }

# ─── Refresh Access Token ─────────────────────────────────────────────────────
@router.post("/api/v1/auth/refresh")
@router.post("/api/auth/refresh")
async def refresh_token(body: RefreshRequest):
    if not body.refreshToken:
        raise HTTPException(401, detail="Refresh token required")

    payload = verify_refresh_token(body.refreshToken)
    user_id = payload.get("id")

    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    if not user or body.refreshToken not in user.get("refreshTokens", []):
        raise HTTPException(403, detail="Invalid refresh token")

    new_access_token = generate_access_token(
        user_id,
        user["email"],
        user.get("role", "user"),
    )

    return {"ok": True, "accessToken": new_access_token}

# ─── Logout ───────────────────────────────────────────────────────────────────
@router.post("/api/v1/auth/logout")
@router.post("/api/auth/logout")
async def logout(body: LogoutRequest):
    if not body.refreshToken:
        return {"ok": True, "message": "Logged out"}

    try:
        payload = verify_refresh_token(body.refreshToken)
        user_id = payload.get("id")
        user    = await db["users"].find_one({"_id": ObjectId(user_id)})
        if user:
            updated_tokens = [t for t in user.get("refreshTokens", []) if t != body.refreshToken]
            await db["users"].update_one(
                {"_id": user["_id"]},
                {"$set": {"refreshTokens": updated_tokens}},
            )
    except Exception:
        pass  # invalid token → still logout gracefully

    return {"ok": True, "message": "Logged out successfully"}

# GET logout — quick browser / Postman helper
@router.get("/api/v1/auth/logout")
@router.get("/api/auth/logout")
async def logout_get(refreshToken: Optional[str] = None):
    if not refreshToken:
        return {"ok": True}

    try:
        payload = verify_refresh_token(refreshToken)
        user_id = payload.get("id")
        user    = await db["users"].find_one({"_id": ObjectId(user_id)})
        if user:
            updated_tokens = [t for t in user.get("refreshTokens", []) if t != refreshToken]
            await db["users"].update_one(
                {"_id": user["_id"]},
                {"$set": {"refreshTokens": updated_tokens}},
            )
    except Exception:
        pass

    return {"ok": True, "message": "Logged out"}

# ─── Verify Email Code ────────────────────────────────────────────────────────
@router.post("/api/v1/auth/verify")
@router.post("/api/auth/verify")
async def verify_email(body: VerifyRequest):
    if not body.email or not body.code:
        raise HTTPException(400, detail="Email and code required")

    user = await db["users"].find_one({"email": body.email.lower()})
    if not user:
        raise HTTPException(400, detail="User not found")

    if user.get("verificationCode") == body.code:
        await db["users"].update_one(
            {"_id": user["_id"]},
            {"$set": {"isVerified": True, "verificationCode": None}},
        )
        return {"ok": True, "message": "Verification successful"}

    raise HTTPException(400, detail="Invalid verification code")

# ─── Get Current User (Protected) ────────────────────────────────────────────
@router.get("/api/v1/auth/me")
@router.get("/api/auth/me")
async def get_me(current_user: dict = Depends(auth_middleware)):
    user = await db["users"].find_one({"_id": ObjectId(current_user["id"])})
    if not user:
        raise HTTPException(404, detail="User not found")

    return {
        "ok": True,
        "user": {
            "id":         str(user["_id"]),
            "email":      user["email"],
            "fullName":   user.get("fullName", ""),
            "role":       user.get("role", "user"),
            "isVerified": user.get("isVerified", False),
            "createdAt":  user.get("createdAt", "").isoformat() if user.get("createdAt") else None,
            "updatedAt":  user.get("updatedAt", "").isoformat() if user.get("updatedAt") else None,
            "lastLogin":  user.get("lastLogin", "").isoformat() if user.get("lastLogin") else None,
        },
    }

# ─── Admin: List All Users (Protected + Role Guard) ───────────────────────────
@router.get("/api/v1/admin/users")
@router.get("/api/admin/users")
async def list_users(current_user: dict = Depends(require_role("admin"))):
    users_cursor = db["users"].find({}, {"passwordHash": 0, "verificationCode": 0, "refreshTokens": 0})
    users = []
    async for u in users_cursor:
        u["_id"] = str(u["_id"])
        users.append(u)

    return {"ok": True, "total": len(users), "users": users}


# ─── Export ───────────────────────────────────────────────────────────────────
# Router and DB utilities are imported by main.py
# The DB reference is set by main.py after connecting to MongoDB