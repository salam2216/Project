/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const LEGACY_TOKEN_KEY = "token";

// ─── Token helpers ────────────────────────────────────────────────────────────
function getStoredToken(): string | null {
  try {
    const raw = localStorage.getItem(ACCESS_TOKEN_KEY) ?? localStorage.getItem(LEGACY_TOKEN_KEY);
    if (!raw) return null;
    return raw.startsWith("Bearer ") ? raw.replace(/^Bearer\s+/, "") : raw;
  } catch {
    return null;
  }
}

function clearAuthStorage() {
  try {
    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, LEGACY_TOKEN_KEY].forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────
async function fetchJson<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const token = getStoredToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();

  let data: T | null = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text as unknown as T;
  }

  if (res.status === 401) {
    clearAuthStorage();
    throw { status: 401, message: "Unauthorized", data };
  }

  if (!res.ok) throw data || { status: res.status, message: res.statusText };
  return data as T;
}

// ─── Context types ────────────────────────────────────────────────────────────
export interface UserType {
  name: string;
  id: string;
  email: string;
  fullName: string;
  isVerified: boolean;
}

export interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  register: (payload: { email: string; password: string; fullName?: string; role?: "user" | "admin" }) => Promise<any>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  setUser: (u: UserType | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// ─── AuthProvider ─────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Register ─────────────────────────────────────────────────────────────
  const register = async (payload: { email: string; password: string; fullName?: string; role?: "user" | "admin" }) => {
    const res = await fetchJson("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...payload, role: payload.role ?? "user" }),
    });

    // backend: { ok, data: { accessToken, refreshToken, user } }
    const access  = res?.data?.accessToken ?? null;
    const refresh = res?.data?.refreshToken ?? null;
    const userObj = res?.data?.user ?? null;

    if (access) {
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
      setUser(userObj ?? null);
    }

    return res;
  };

  // ── Sign In ───────────────────────────────────────────────────────────────
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetchJson("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // backend: { ok, data: { accessToken, refreshToken, user } }
      const access  = res?.data?.accessToken ?? null;
      const refresh = res?.data?.refreshToken ?? null;
      const userObj = res?.data?.user ?? null;

      if (access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, access);
        if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
        setUser(userObj ?? null);
        return { success: true };
      }

      return { success: false, error: res?.error ?? res?.message ?? "Login failed" };
    } catch (err: any) {
      return { success: false, error: err?.error ?? err?.message ?? "Login failed" };
    }
  };

  // ── Sign Out ──────────────────────────────────────────────────────────────
  const signOut = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      await fetchJson("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {});
    } finally {
      clearAuthStorage();
      setUser(null);
    }
  };

  // ── Load user on mount ────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const token = getStoredToken();
        if (token) {
          const me = await fetchJson("/api/auth/me");
          const userObj = me?.user ?? null;
          if (mounted) setUser(userObj);
        } else {
          if (mounted) setUser(null);
        }
      } catch {
        clearAuthStorage();
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;