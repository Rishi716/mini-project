import React, { useState } from 'react';
import { X, Sparkles, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register({ email: form.email, password: form.password, name: form.name });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (m) => {
    setMode(m);
    setError('');
  };

  const inputStyle = {
    width: '100%', background: '#FFFFFF', border: '1px solid #CBD2C0',
    borderRadius: '10px', padding: '10px 14px', color: '#243027',
    outline: 'none', fontSize: '0.875rem',
  };
  const labelStyle = { fontSize: '0.8rem', fontWeight: 600, color: '#4A5B4F', display: 'block', marginBottom: '6px' };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px', background: '#F7F8F3' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #E2E4D8', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: '#E4EFE7', borderRadius: '10px' }}>
              <Sparkles size={22} color="#3F7D58" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#243027' }}>
                {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
              </h3>
              <span style={{ fontSize: '0.725rem', color: '#6B7D70' }}>
                {mode === 'login'
                  ? 'Sign in to continue your AI mentorship journey'
                  : 'Save your profile, quiz scores & chat history across devices'}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6B7D70', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', background: '#F0F2EA', padding: '4px', borderRadius: '10px', border: '1px solid #E2E4D8', marginBottom: '18px' }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                background: mode === m ? '#3F7D58' : 'transparent',
                color: mode === m ? '#FFF' : '#4A5B4F',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              {m === 'login' ? <LogIn size={14} /> : <UserPlus size={14} />}
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'register' && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Adarsh Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ padding: '10px 12px', background: '#FFF0EE', border: '1px solid #F5C2B8', borderRadius: '8px', color: '#922B21', fontSize: '0.8rem', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <button className="btn-primary" type="submit" disabled={loading} style={{ justifyContent: 'center', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
            {loading ? <Loader2 size={16} className="spin" /> : mode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
            <span>{loading ? 'Please wait...' : mode === 'login' ? 'Login & Sync My Journey' : 'Sign Up & Start Mentorship'}</span>
          </button>

          <p style={{ fontSize: '0.7rem', color: '#6B7D70', textAlign: 'center', marginTop: '4px' }}>
            🔒 Your data (profile, chat history, quizzes) is securely stored & synced.
          </p>
        </form>
      </div>
    </div>
  );
}