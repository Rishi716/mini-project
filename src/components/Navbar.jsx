import React from 'react';
import { Sparkles, User, MessageSquare, Compass, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ studentProfile, onOpenProfile, onOpenVoiceMentor, onOpenAuth }) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3F7D58 0%, #2D5F42 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(63, 125, 88, 0.3)'
          }}>
            <Sparkles size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#243027' }}>
                Career <span className="gradient-text">GenAI</span>
              </h1>
              {isAuthenticated && (
                <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>
                  <CheckCircle2 size={11} color="#3F7D58" />
                  Synced
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6B7D70', fontWeight: 500 }}>
              Eshva · Your AI career mentor.
            </p>
          </div>
        </div>

        {/* Current Student Context Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#F0F2EA',
          border: '1px solid #E2E4D8',
          borderRadius: '999px',
          padding: '6px 16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: '#243027' }}>
            <Compass size={16} color="#3F7D58" />
            <span>Stage: <strong style={{ color: '#243027' }}>{studentProfile.stage}</strong></span>
          </div>
          <span style={{ color: '#CBD2C0' }}>|</span>
          <div style={{ fontSize: '0.825rem', color: '#6B7D70' }}>
            Domain: <span style={{ color: '#8C5E32', fontWeight: 600 }}>{studentProfile.targetDomain}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            id="voice-mentor-nav-btn"
            className="btn-secondary"
            onClick={onOpenVoiceMentor}
            style={{ borderColor: '#C5DCCC', background: '#E4EFE7', color: '#275239' }}
          >
            <MessageSquare size={16} color="#3F7D58" />
            <span>Chat with Eshva</span>
          </button>

          {isAuthenticated ? (
            <>
              <button
                id="edit-profile-nav-btn"
                className="btn-primary"
                onClick={onOpenProfile}
              >
                <User size={16} />
                <span>{user?.name || 'Edit Profile'}</span>
              </button>
              <button
                id="logout-btn"
                className="btn-secondary"
                onClick={logout}
                title="Logout"
                style={{ padding: '9px 12px' }}
              >
                <LogOut size={16} color="#C86D51" />
              </button>
            </>
          ) : (
            <button
              id="login-nav-btn"
              className="btn-primary"
              onClick={onOpenAuth}
            >
              <LogIn size={16} />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}