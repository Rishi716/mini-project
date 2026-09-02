import React from 'react';
import { Sparkles, User, Mic, Compass } from 'lucide-react';

export default function Navbar({ studentProfile, onOpenProfile, onOpenVoiceMentor }) {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E2E4D8',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '12px 24px',
      boxShadow: '0 2px 10px rgba(36, 48, 39, 0.03)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
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
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                Sage & Cream Edition
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6B7D70', fontWeight: 500 }}>
              One AI mentor. Every career decision.
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
            style={{ borderColor: '#E8D5C4', background: '#F4EBE2', color: '#8C5E32' }}
          >
            <Mic size={16} color="#D4A373" />
            <span>Voice Mentor AI</span>
          </button>

          <button 
            id="edit-profile-nav-btn"
            className="btn-primary" 
            onClick={onOpenProfile}
          >
            <User size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
