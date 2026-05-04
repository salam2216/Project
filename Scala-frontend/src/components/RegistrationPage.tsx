/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck, CheckCircle, AlertCircle } from "lucide-react";

export default function RegistrationPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [message, setMessage]   = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await register({ email, password, fullName });
      const success = Boolean(res?.ok) || Boolean(res?.data?.accessToken);

      if (success) {
        setMessage({ type: "success", text: res?.message ?? "Registration successful! Redirecting…" });
        setFullName(""); setEmail(""); setPassword("");
        setTimeout(() => navigate("/", { replace: true }), 1500);
      } else {
        setMessage({ type: "error", text: res?.error ?? res?.message ?? "Registration failed" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message ?? "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Fair", "Strong"];
  const strengthColors = ["", "#ef4444", "#f59e0b", "#22c55e"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .reg-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #0b0f1a;
          overflow: hidden;
          position: relative;
        }

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

        /* Right decorative panel */
        .reg-panel-right {
          display: none;
          flex-direction: column;
          justify-content: center;
          padding: 64px 56px;
          width: 44%;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          background: linear-gradient(145deg, #1a2540 0%, #0f1929 60%, #0b0f1a 100%);
        }
        @media (min-width: 900px) {
          .reg-panel-right { display: flex; }
        }

        .panel-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          pointer-events: none;
        }
        .orb-a { width: 300px; height: 300px; background: #6366f1; top: -80px; right: -60px; }
        .orb-b { width: 200px; height: 200px; background: #8b5cf6; bottom: 60px; left: -20px; }
        .orb-c { width: 140px; height: 140px; background: #2563eb; top: 45%; left: 30%; }

        .steps-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.25;
          margin-bottom: 16px;
        }
        .steps-heading span { color: #a78bfa; }

        .steps-desc {
          color: #475569;
          font-size: 14px;
          line-height: 1.7;
          max-width: 320px;
          margin-bottom: 48px;
          font-weight: 300;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .step-num {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          color: #a78bfa;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-content {}
        .step-title {
          font-size: 14px;
          font-weight: 500;
          color: #cbd5e1;
          margin-bottom: 2px;
        }
        .step-detail {
          font-size: 12px;
          color: #475569;
        }

        /* Left form panel */
        .reg-panel-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          position: relative;
          z-index: 1;
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
        }

        .form-card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 21px;
          background: linear-gradient(135deg, rgba(99,102,241,0.18), transparent 50%, rgba(37,99,235,0.08));
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
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
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
          margin-bottom: 30px;
        }

        .field-group { margin-bottom: 16px; }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .field-wrap { position: relative; }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #334155;
          pointer-events: none;
          transition: color 0.2s;
        }
        .field-wrap.focused .field-icon { color: #818cf8; }
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
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
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

        /* Password strength bar */
        .strength-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .strength-bars {
          display: flex;
          gap: 4px;
          flex: 1;
        }
        .strength-bar {
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: #1e293b;
          transition: background 0.3s;
        }
        .strength-label {
          font-size: 11px;
          font-weight: 500;
          min-width: 36px;
          text-align: right;
        }

        .message-box {
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .message-box.error {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          color: #f87171;
        }
        .message-box.success {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2);
          color: #86efac;
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          border: none;
          border-radius: 10px;
          padding: 14px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          margin-bottom: 12px;
        }
        .btn-primary:hover:not(:disabled) {
          opacity: 0.93;
          box-shadow: 0 6px 28px rgba(99,102,241,0.5);
          transform: translateY(-1px);
        }
        .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

        .btn-secondary {
          width: 100%;
          background: transparent;
          color: #818cf8;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 10px;
          padding: 13px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-secondary:hover:not(:disabled) {
          background: rgba(99,102,241,0.08);
          border-color: rgba(99,102,241,0.5);
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
          background: #1e293b;
          border-radius: 50%;
        }
      `}</style>

      <div className="reg-root">
        <div className="bg-grid" />

        {/* Left form panel */}
        <div className="reg-panel-left">
          <div className="form-card">
            <div className="form-card-glow" />

            <div className="card-logo">
              <div className="logo-icon">
                <ShieldCheck size={20} color="#fff" />
              </div>
              <div>
                <div className="logo-title">SCALA-Guard</div>
                <div className="logo-subtitle">Secure Access Portal</div>
              </div>
            </div>

            <h2 className="card-heading">Create account</h2>
            <p className="card-subheading">Register to access the SCALA-Guard security dashboard</p>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <div className={`field-wrap ${focusedField === 'name' ? 'focused' : ''}`}>
                  <User className="field-icon" size={16} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={loading}
                    placeholder="Your full name"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className={`field-wrap ${focusedField === 'email' ? 'focused' : ''}`}>
                  <Mail className="field-icon" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    disabled={loading}
                    placeholder="you@example.com"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <div className={`field-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                  <Lock className="field-icon" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    minLength={6}
                    disabled={loading}
                    placeholder="Min. 6 characters"
                    className="field-input has-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="toggle-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="strength-row">
                    <div className="strength-bars">
                      {[1,2,3].map(i => (
                        <div
                          key={i}
                          className="strength-bar"
                          style={{ background: passwordStrength >= i ? strengthColors[passwordStrength] : '#1e293b' }}
                        />
                      ))}
                    </div>
                    <span className="strength-label" style={{ color: strengthColors[passwordStrength] }}>
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>

              {message && (
                <div className={`message-box ${message.type}`}>
                  {message.type === 'success'
                    ? <CheckCircle size={15} />
                    : <AlertCircle size={15} />
                  }
                  {message.text}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Creating account…" : "Create Account"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                disabled={loading}
                className="btn-secondary"
              >
                Already have an account? Sign In
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

        {/* Right decorative panel */}
        <div className="reg-panel-right">
          <div className="orb-a panel-orb" />
          <div className="orb-b panel-orb" />
          <div className="orb-c panel-orb" />

          <h1 className="steps-heading">
            Secure Access,<br />
            Trusted <span>Control</span>
          </h1>
          <p className="steps-desc">
            Create your account to enter a protected environment for monitoring, scanning, and managing security workflows.
          </p>

          <div className="steps-list">
            {[
              { num: "01", title: "Register with email", detail: "Use a valid email to create your secure profile" },
              { num: "02", title: "Protect your account", detail: "Set a strong password for authenticated access" },
              { num: "03", title: "Sign in securely", detail: "Use your credentials to unlock the dashboard" },
              { num: "04", title: "Monitor activity", detail: "Track secure actions and protected workflows" },
            ].map(s => (
              <div className="step-item" key={s.num}>
                <div className="step-num">{s.num}</div>
                <div className="step-content">
                  <div className="step-title">{s.title}</div>
                  <div className="step-detail">{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}