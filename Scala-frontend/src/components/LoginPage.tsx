/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [toast, setToast]       = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn(email, password);
      if (result.success) {
        setToast(true);
        setTimeout(() => {
          setToast(false);
          navigate("/", { replace: true });
        }, 1500);
      } else {
        setError(result.error ?? "Invalid email or password");
      }
    } catch (err: any) {
      setError(err?.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #0b0f1a;
          overflow: hidden;
          position: relative;
        }

        /* Decorative left panel */
        .login-panel-left {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 64px 56px;
          width: 44%;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .login-panel-left { display: flex; }
        }

        .panel-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #1a2540 0%, #0f1929 60%, #0b0f1a 100%);
          z-index: -1;
        }

        .panel-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          pointer-events: none;
        }
        .panel-orb-1 {
          width: 320px; height: 320px;
          background: #2563eb;
          top: -60px; left: -80px;
        }
        .panel-orb-2 {
          width: 220px; height: 220px;
          background: #0ea5e9;
          bottom: 80px; right: -40px;
        }
        .panel-orb-3 {
          width: 150px; height: 150px;
          background: #6366f1;
          top: 50%; left: 40%;
        }

        .panel-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.35);
          color: #93c5fd;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 32px;
        }

        .panel-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .panel-headline span {
          color: #60a5fa;
        }

        .panel-desc {
          color: #64748b;
          font-size: 15px;
          line-height: 1.7;
          max-width: 340px;
          margin-bottom: 48px;
          font-weight: 300;
        }

        .panel-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, transparent);
          margin-bottom: 36px;
        }

        .panel-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .panel-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #94a3b8;
          font-size: 14px;
        }
        .feature-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
        }

        /* Right form panel */
        .login-panel-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
        }

        .form-card {
          width: 100%;
          max-width: 420px;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 44px 40px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
          position: relative;
          z-index: 1;
        }

        .form-card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: linear-gradient(135deg, rgba(37,99,235,0.2), transparent 50%, rgba(99,102,241,0.1));
          pointer-events: none;
          z-index: -1;
        }

        .card-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        .logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,99,235,0.4);
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .logo-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.2;
        }
        .logo-subtitle {
          font-size: 11px;
          color: #475569;
          letter-spacing: 0.04em;
        }

        .card-heading {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          color: #f1f5f9;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .card-subheading {
          font-size: 13px;
          color: #475569;
          margin-bottom: 32px;
        }

        .field-group {
          margin-bottom: 18px;
        }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .field-wrap {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #334155;
          pointer-events: none;
          transition: color 0.2s;
        }
        .field-wrap.focused .field-icon {
          color: #3b82f6;
        }
        .field-input {
          width: 100%;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 10px;
          padding: 13px 14px 13px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: #334155; }
        .field-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .field-input:disabled { opacity: 0.5; }
        .field-input.has-right { padding-right: 42px; }

        .toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #334155;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
          transition: color 0.2s;
        }
        .toggle-btn:hover { color: #94a3b8; }

        .error-box {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          color: #f87171;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.03em;
          border: none;
          border-radius: 10px;
          padding: 14px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(37,99,235,0.35);
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover:not(:disabled) {
          opacity: 0.93;
          box-shadow: 0 6px 28px rgba(37,99,235,0.5);
          transform: translateY(-1px);
        }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

        .btn-secondary {
          width: 100%;
          background: transparent;
          color: #60a5fa;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          border: 1px solid rgba(37,99,235,0.3);
          border-radius: 10px;
          padding: 13px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-secondary:hover:not(:disabled) {
          background: rgba(37,99,235,0.08);
          border-color: rgba(37,99,235,0.5);
        }
        .btn-secondary:disabled { opacity: 0.4; cursor: not-allowed; }

        .card-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .footer-dot {
          width: 4px; height: 4px;
          background: #1e3a5f;
          border-radius: 50%;
        }

        /* Toast */
        .toast {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 100;
          background: #052e16;
          border: 1px solid rgba(34,197,94,0.3);
          color: #86efac;
          padding: 14px 20px;
          border-radius: 12px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }

        /* Background grid */
        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div className="login-root">
        <div className="bg-grid" />

        {/* Left decorative panel */}
        <div className="login-panel-left">
          <div className="panel-bg" />
          <div className="panel-orb panel-orb-1" />
          <div className="panel-orb panel-orb-2" />
          <div className="panel-orb panel-orb-3" />

          <div className="panel-badge">
            <span style={{width:6,height:6,background:'#3b82f6',borderRadius:'50%',display:'inline-block'}} />
            SCALA-Guard — Secure Access
          </div>

          <h1 className="panel-headline">
            Secure Every Sign-in,<br />
            Protect the <span>System</span>
          </h1>

          <p className="panel-desc">
            A professional security portal for SCALA-Guard with role-based access, encrypted sessions, and trusted authentication.
          </p>

          <div className="panel-divider" />

          <div className="panel-features">
            {["Role-based authentication", "JWT session protection", "Secure account recovery", "Audit-ready access control"].map(f => (
              <div className="panel-feature" key={f}>
                <span className="feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-panel-right">
          <div className="form-card">
            <div className="form-card-glow" />

            <div className="card-logo">
              <div className="logo-icon">
                <ShieldCheck size={20} color="#fff" />
              </div>
              <div className="logo-text">
                <span className="logo-title">SCALA-Guard</span>
                <span className="logo-subtitle">Secure Access Portal</span>
              </div>
            </div>

            <h2 className="card-heading">Welcome back</h2>
            <p className="card-subheading">Sign in to access your dashboard</p>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label" htmlFor="email">Institutional Email</label>
                <div className={`field-wrap ${focusedField === 'email' ? 'focused' : ''}`}>
                  <Mail className="field-icon" size={16} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={loading}
                    placeholder="your.email@example.com"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="password">Password</label>
                <div className={`field-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                  <Lock className="field-icon" size={16} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                    className="field-input has-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="toggle-btn"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-box">
                  <span style={{fontSize:16}}>⚠</span>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Authenticating..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
                className="btn-secondary"
              >
                Create New Account
              </button>
            </form>

            <div className="card-footer">
              <span>Secure</span>
              <span className="footer-dot" />
              <span>Anonymous</span>
              <span className="footer-dot" />
              <span>Tamper-proof</span>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast">
          <CheckCircle size={18} color="#4ade80" />
          <span>Successfully signed in! Redirecting…</span>
        </div>
      )}
    </>
  );
}