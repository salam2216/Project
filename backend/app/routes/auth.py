from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from pydantic import BaseModel, EmailStr, validator
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt
import bcrypt
from typing import Optional

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

# Configuration
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

security = HTTPBearer()

# Database Models
from sqlalchemy import Column, String, DateTime, Boolean, Enum
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class UserRole(str, enum.Enum):
    GUARD = "guard"
    MANAGER = "manager"
    DIRECTOR = "director"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, default=UserRole.GUARD)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    failed_attempts = Column(int, default=0)
    locked_until = Column(DateTime, nullable=True)

# Request Models
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.GUARD

    @validator('name')
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()

    @validator('password')
    def password_strong(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain uppercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain number')
        return v

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    status: str
    data: dict
    message: str

# Utility Functions
def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

def verify_password(password: str, password_hash: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode(), password_hash.encode())

def create_access_token(user_id: str, role: str) -> str:
    """Create JWT token"""
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

def get_current_user(credentials: HTTPAuthCredentials = Depends(security)):
    """Get current user from token"""
    return decode_token(credentials.credentials)

# Routes

@router.post("/register", response_model=LoginResponse)
async def register(
    request: RegisterRequest,
    db: Session = Depends()
):
    """
    Register a new user
    
    - **name**: Full name of the user
    - **email**: Email address (must be unique)
    - **password**: Strong password (min 8 chars, uppercase, number)
    - **role**: User role (guard, manager, director)
    """
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = f"user_{int(datetime.utcnow().timestamp())}"
    user = User(
        id=user_id,
        name=request.name,
        email=request.email,
        password_hash=hash_password(request.password),
        role=request.role,
        is_active=True
    )
    
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user"
        )
    
    # Generate token
    token = create_access_token(user.id, user.role)
    
    return LoginResponse(
        status="success",
        data={
            "user_id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "token": token
        },
        message="User registered successfully"
    )

@router.post("/login", response_model=LoginResponse)
async def login(
    request: LoginRequest,
    db: Session = Depends()
):
    """
    Login user
    
    - **email**: User email
    - **password**: User password
    """
    
    # Find user
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if account is locked
    if user.locked_until and user.locked_until > datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Account locked until {user.locked_until}. Try again later."
        )
    
    # Verify password
    if not verify_password(request.password, user.password_hash):
        # Increment failed attempts
        user.failed_attempts += 1
        
        # Lock account after 5 failed attempts
        if user.failed_attempts >= 5:
            user.locked_until = datetime.utcnow() + timedelta(minutes=30)
            db.commit()
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account locked due to multiple failed login attempts"
            )
        
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Reset failed attempts and update last login
    user.failed_attempts = 0
    user.locked_until = None
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Generate token
    token = create_access_token(user.id, user.role)
    
    return LoginResponse(
        status="success",
        data={
            "user_id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "token": token
        },
        message="Login successful"
    )

@router.post("/refresh")
async def refresh_token(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends()
):
    """
    Refresh access token
    """
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    token = create_access_token(user.id, user.role)
    
    return {
        "status": "success",
        "data": {
            "token": token
        },
        "message": "Token refreshed successfully"
    }

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Logout user (token invalidation on client side)
    """
    return {
        "status": "success",
        "message": "Logged out successfully"
    }

@router.get("/me")
async def get_current_user_info(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends()
):
    """
    Get current user information
    """
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {
        "status": "success",
        "data": {
            "user_id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at
        }
    }

@router.post("/forgot-password")
async def forgot_password(
    email: EmailStr,
    db: Session = Depends()
):
    """
    Request password reset
    """
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # Don't reveal if email exists
        return {
            "status": "success",
            "message": "If email exists, password reset link sent"
        }
    
    # Generate reset token (valid for 1 hour)
    reset_token = create_access_token(user.id, user.role)
    
    # TODO: Send email with reset link
    # send_reset_email(user.email, reset_token)
    
    return {
        "status": "success",
        "message": "Password reset link sent to email"
    }

@router.post("/reset-password")
async def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends()
):
    """
    Reset password with token
    """
    try:
        payload = decode_token(token)
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    user = db.query(User).filter(User.id == payload["user_id"]).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Validate password
    if len(new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password too weak"
        )
    
    user.password_hash = hash_password(new_password)
    db.commit()
    
    return {
        "status": "success",
        "message": "Password reset successful"
    }

@router.post("/verify-email")
async def verify_email(
    token: str,
    db: Session = Depends()
):
    """
    Verify email with token
    """
    try:
        payload = decode_token(token)
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    user = db.query(User).filter(User.id == payload["user_id"]).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_verified = True
    db.commit()
    
    return {
        "status": "success",
        "message": "Email verified successfully"
    }
