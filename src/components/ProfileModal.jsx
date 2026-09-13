import React, { useState, useEffect } from 'react';
import { User, X, Check } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose, studentProfile, onSaveProfile }) {
  const [formData, setFormData] = useState({
    name: studentProfile.name,
    stage: studentProfile.stage,
    targetDomain: studentProfile.targetDomain,
    interests: studentProfile.interests || ['Coding', 'Artificial Intelligence', 'Mathematics'],
    parentName: studentProfile.parentName || '',
    parentEmail: studentProfile.parentEmail || ''
  });

  // Keep form in sync if studentProfile changes externally
  useEffect(() => {
    setFormData({
      name: studentProfile.name,
      stage: studentProfile.stage,
      targetDomain: studentProfile.targetDomain,
      interests: studentProfile.interests || [],
      parentName: studentProfile.parentName || '',
      parentEmail: studentProfile.parentEmail || ''
    });
  }, [studentProfile]);

  if (!isOpen) return null;

  const stageOptions = [
    'Class 6-10',
    'Class 11-12',
    'Entrance Aspirant',
    'College Student',
    'Placement Stage'
  ];

  const domainOptions = [
    'Computer Science & AI',
    'Cybersecurity & Hacking',
    'Data Science & Analytics',
    'Fintech & Finance',
    'Medical & Biotech',
    'Design & Product UI/UX'
  ];

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px', background: '#F7F8F3' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #E2E4D8', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: '#E4EFE7', borderRadius: '10px' }}>
              <User size={22} color="#3F7D58" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#243027' }}>
                Student Profile & Stage Settings
              </h3>
              <span style={{ fontSize: '0.725rem', color: '#6B7D70' }}>Customize your personalized AI recommendation engine</span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6B7D70', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4A5B4F', display: 'block', marginBottom: '6px' }}>
              Student Name
            </label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '1px solid #CBD2C0',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#243027',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4A5B4F', display: 'block', marginBottom: '6px' }}>
              Academic Stage (Student Life Cycle)
            </label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '1px solid #CBD2C0',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#243027',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            >
              {stageOptions.map((stg, i) => (
                <option key={i} value={stg}>{stg}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4A5B4F', display: 'block', marginBottom: '6px' }}>
              Target Domain & Career Choice
            </label>
            <select
              value={formData.targetDomain}
              onChange={(e) => setFormData({ ...formData, targetDomain: e.target.value })}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '1px solid #CBD2C0',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#243027',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            >
              {domainOptions.map((dom, i) => (
                <option key={i} value={dom}>{dom}</option>
              ))}
            </select>
          </div>

          {/* Parent Contact Section */}
          <div style={{ borderTop: '1px solid #E2E4D8', paddingTop: '14px', marginTop: '4px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8C5E32', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🛡️ Parent / Guardian Contact (for Safety Alerts)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4A5B4F', display: 'block', marginBottom: '6px' }}>
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD2C0',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#243027',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#4A5B4F', display: 'block', marginBottom: '6px' }}>
                  Parent / Guardian Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. parent@gmail.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD2C0',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#243027',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>
          </div>

          <button className="btn-primary" type="submit" style={{ marginTop: '8px', justifyContent: 'center' }}>
            <Check size={16} />
            <span>Save & Recalculate AI Match</span>
          </button>
        </form>

      </div>
    </div>
  );
}
