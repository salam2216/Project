/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Mail, User, BadgeCheck, CalendarDays,
  ShieldCheck, LogOut, RefreshCw, Vote, Clock
} from 'lucide-react';
import { useAuth } from '../provider/AuthProvider';

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000').replace(/\/+$/, '');
const ACCESS_TOKEN_KEY = 'accessToken';
const LEGACY_TOKEN_KEY  = 'token';

function getStoredToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? localStorage.getItem(LEGACY_TOKEN_KEY);
  } catch { return null; }
}

function formatDate(value?: string | null) {
  if (!value) return 'Not available';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  }).format(date);
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getStoredToken();
      if (!token) { navigate('/login', { replace: true }); return; }

      const res  = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.detail || data?.message || 'Failed to load profile');
      setProfile(data?.user ?? null);
    } catch (err: any) {
      setError(err?.message || 'Failed to load profile');
      if ((err?.message || '').toLowerCase().includes('unauthorized'))
        navigate('/login', { replace: true });
    } finally { setLoading(false); }
  }, [navigate]);

  useEffect(() => { if (!authLoading) void loadProfile(); }, [authLoading, loadProfile]);

  const current = profile ?? user;
  const initials = useMemo(() => {
    const name = current?.fullName || current?.name || current?.email || 'U';
    return name.split(' ').filter(Boolean).slice(0, 2)
      .map((p: string) => p[0]?.toUpperCase()).join('') || 'U';
  }, [current]);

  const roleLabel = (current?.role || 'user').toString().toUpperCase();
  const isVerified = Boolean(current?.isVerified);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .prof-wrap * { box-sizing: border-box; }
        .prof-wrap {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0b0f1a;
          padding: 40px 24px 64px;
          position: relative;
        }

        .prof-bg-grid {
          position: fixed; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .prof-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }

        /* ── Top bar ── */
        .prof-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 36px;
        }
        .prof-topbar-left {}
        .prof-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(37,99,235,0.12);
          border: 1px solid rgba(37,99,235,0.28);
          color: #93c5fd;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px;
          margin-bottom: 14px;
        }
        .prof-page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.2;
          margin: 0 0 6px;
        }
        .prof-page-title span { color: #60a5fa; }
        .prof-page-sub {
          font-size: 13px; color: #475569; font-weight: 300;
        }
        .prof-page-sub code {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1px 7px; border-radius: 5px;
          font-size: 11px; color: #64748b;
          font-family: 'Courier New', monospace;
        }

        .prof-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .prof-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          padding: 9px 16px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #94a3b8;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .prof-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; border-color: rgba(255,255,255,0.14); }
        .prof-btn.danger { color: #f87171; border-color: rgba(239,68,68,0.2); }
        .prof-btn.danger:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.35); }

        /* ── States ── */
        .state-card {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 56px 28px;
          display: flex; align-items: center; justify-content: center;
          color: #475569; font-size: 14px;
        }
        .state-card.error-state {
          border-color: rgba(239,68,68,0.18);
          flex-direction: column; gap: 8px; align-items: flex-start;
          padding: 28px;
        }
        .state-err-title { color: #f87171; font-weight: 600; font-size: 15px; }
        .state-err-msg   { color: #64748b; font-size: 13px; }

        /* ── Profile hero card ── */
        .hero-card {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }

        .hero-header {
          padding: 32px 32px 28px;
          background: linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(17,24,39,0) 60%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .hero-header::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(37,99,235,0.08);
          filter: blur(60px);
          pointer-events: none;
        }

        .avatar {
          width: 80px; height: 80px; flex-shrink: 0;
          border-radius: 18px;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700;
          color: #fff;
          box-shadow: 0 12px 32px rgba(37,99,235,0.4);
          letter-spacing: 0.02em;
          position: relative; z-index: 1;
        }

        .hero-info { flex: 1; min-width: 200px; position: relative; z-index: 1; }
        .hero-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: #f1f5f9; margin: 0 0 4px;
        }
        .hero-email { font-size: 13px; color: #475569; margin-bottom: 14px; }
        .hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }

        .tag {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600;
          padding: 5px 11px; border-radius: 100px;
          letter-spacing: 0.04em;
        }
        .tag-role {
          background: rgba(37,99,235,0.14);
          border: 1px solid rgba(37,99,235,0.25);
          color: #93c5fd;
        }
        .tag-verified {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.22);
          color: #86efac;
        }
        .tag-unverified {
          background: rgba(234,179,8,0.1);
          border: 1px solid rgba(234,179,8,0.22);
          color: #fde047;
        }

        /* ── Stats row ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .stat-cell {
          padding: 20px 24px;
          border-right: 1px solid rgba(255,255,255,0.04);
        }
        .stat-cell:last-child { border-right: none; }
        .stat-cell-label {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #334155; margin-bottom: 6px;
        }
        .stat-cell-value {
          font-size: 14px; font-weight: 500;
          color: #cbd5e1; word-break: break-word; line-height: 1.4;
        }

        /* ── Detail grid ── */
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        .detail-card {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 20px;
          transition: border-color 0.2s;
        }
        .detail-card:hover { border-color: rgba(255,255,255,0.1); }

        .detail-card-header {
          display: flex; align-items: center; gap: 8px;
          color: #475569;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 10px;
        }
        .detail-card-icon {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          color: #475569;
        }
        .detail-card-value {
          font-size: 14px; color: #94a3b8;
          line-height: 1.5; word-break: break-word;
        }
      `}</style>

      <div className="prof-wrap">
        <div className="prof-bg-grid" />
        <div className="prof-inner">

          {/* Top bar */}
          <div className="prof-topbar">
            <div className="prof-topbar-left">
              <div className="prof-badge">
                <Shield size={11} />
                Secure Profile
              </div>
              <h1 className="prof-page-title">User <span>Profile</span></h1>
            </div>
            <div className="prof-actions">
              <button className="prof-btn" onClick={loadProfile}>
                <RefreshCw size={13} /> Refresh
              </button>
              <button
                className="prof-btn danger"
                onClick={() => signOut().then(() => navigate('/login', { replace: true }))}
              >
                <LogOut size={13} /> Logout
              </button>
            </div>
          </div>

          {/* States */}
          {loading ? (
            <div className="state-card">Loading profile…</div>
          ) : error ? (
            <div className="state-card error-state">
              <div className="state-err-title">Unable to load profile</div>
              <div className="state-err-msg">{error}</div>
            </div>
          ) : (
            <>
              {/* Hero card */}
              <div className="hero-card">
                <div className="hero-header">
                  <div className="avatar">{initials}</div>
                  <div className="hero-info">
                    <h2 className="hero-name">
                      {current?.fullName || current?.name || 'Unnamed User'}
                    </h2>
                    <p className="hero-email">{current?.email}</p>
                    <div className="hero-tags">
                      <span className="tag tag-role">
                        <ShieldCheck size={11} /> {roleLabel}
                      </span>
                      <span className={`tag ${isVerified ? 'tag-verified' : 'tag-unverified'}`}>
                        <BadgeCheck size={11} />
                        {isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats strip */}
                <div className="stats-row">
                  {[
                    { label: 'Role',         value: roleLabel },
                    { label: 'Verified',     value: isVerified ? 'Yes' : 'No' },
                    { label: 'Email',        value: current?.email  || 'N/A' },
                  ].map(s => (
                    <div className="stat-cell" key={s.label}>
                      <div className="stat-cell-label">{s.label}</div>
                      <div className="stat-cell-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail grid */}
              <div className="detail-grid">
                {[
                  { icon: <Mail size={14} />,        label: 'Contact Email',  value: current?.email       || 'N/A' },
                  { icon: <CalendarDays size={14} />, label: 'Created At',     value: formatDate(current?.createdAt)  },
                  { icon: <Shield size={14} />,       label: 'Updated At',     value: formatDate(current?.updatedAt)  },
                  { icon: <Clock size={14} />,        label: 'Last Login',     value: formatDate(current?.lastLogin)  },
                  { icon: <User size={14} />,         label: 'Full Name',      value: current?.fullName || current?.name || 'N/A' },
                  { icon: <Vote size={14} />,         label: 'Voting Status',  value: isVerified ? 'Eligible to vote' : 'Pending verification' },
                ].map(d => (
                  <div className="detail-card" key={d.label}>
                    <div className="detail-card-header">
                      <div className="detail-card-icon">{d.icon}</div>
                      {d.label}
                    </div>
                    <div className="detail-card-value">{d.value}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}