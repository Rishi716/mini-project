import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, ShieldAlert, AlertTriangle, CheckCircle2, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client';

// ─── Main Component ─────────────────────────────────────────────
export default function VoiceMentorModal({ isOpen, onClose, studentProfile }) {
  const { isAuthenticated } = useAuth();
  const [transcript, setTranscript] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [reports, setReports] = useState([]);
  const [showReportPanel, setShowReportPanel] = useState(false);
  const [lastAlert, setLastAlert] = useState(null);
  const [backendOnline, setBackendOnline] = useState(true);
  const chatEndRef = useRef(null);

  // Load chat history + safety reports from backend when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (isAuthenticated) {
      api.getChatHistory()
        .then(({ messages }) => {
          if (messages.length > 0) {
            setChatLog(messages.map(m => ({
              sender: m.sender,
              text: m.text,
              flagged: m.flagged,
              isWarning: m.isWarning,
            })));
          } else {
            setChatLog([{ sender: 'ai', text: greeting() }]);
          }
        })
        .catch(() => setBackendOnline(false));

      api.getReports()
        .then(({ reports: r }) => setReports(r))
        .catch(() => {});
    } else {
      setChatLog([{ sender: 'ai', text: greeting() }]);
    }

    return () => {
      // Keep log on close so it doesn't flash — re-sync next open
    };
  }, [isOpen, isAuthenticated]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isTyping]);

  useEffect(() => {
    if (!lastAlert) return;
    setTimeout(() => setLastAlert(null), 8000);
  }, [lastAlert]);

  if (!isOpen) return null;

  const greeting = () =>
    `Namaste ${studentProfile.name}! 🌿 I'm **Eshva**, your personal AI career mentor. I'm here to guide you on your ${studentProfile.targetDomain} journey — from entrance exams to placements. How can I help you today?`;

  const quickPrompts = [
    { label: '💡 Exam Strategy', text: 'What is the best preparation strategy for JEE/CUET exams?' },
    { label: '🎯 Career Roadmap', text: `Give me a step by step roadmap for ${studentProfile.targetDomain}.` },
    { label: '📄 Resume Tips', text: 'How can I improve my resume to get shortlisted by top companies?' },
    { label: '💼 Interview Prep', text: 'How should I prepare for technical interviews at top tech companies?' },
  ];

  // ─── Send Message Handler (calls real backend → Gemini AI) ─────
  const handleSendQuery = async (customText) => {
    const textToSend = (customText || transcript).trim();
    if (!textToSend || isTyping) return;

    // Optimistic user message
    const updatedLog = [...chatLog, { sender: 'user', text: textToSend }];
    setChatLog(updatedLog);
    setTranscript('');
    setIsTyping(true);

    try {
      if (isAuthenticated) {
        const data = await api.sendChat({ text: textToSend });

        if (data.isWarning) {
          setChatLog([...updatedLog, {
            sender: 'ai', text: data.reply, isWarning: true,
          }]);
          if (data.report) {
            setReports(prev => [{
              id: Date.now(),
              timestamp: data.report.timestamp,
              studentName: studentProfile.name,
              parentName: data.report.parentName,
              parentEmail: data.report.parentEmail,
              flaggedWords: data.report.flaggedWords,
              originalMessage: textToSend,
            }, ...prev]);
            setLastAlert({
              parentName: data.report.parentName,
              parentEmail: data.report.parentEmail,
              timestamp: data.report.timestamp,
            });
          }
        } else {
          setChatLog([...updatedLog, { sender: 'ai', text: data.reply }]);
        }
      } else {
        // Guest mode — hit public AI endpoint with profile context
        const data = await api.sendAIChat({ text: textToSend, profile: studentProfile });
        setChatLog([...updatedLog, { sender: 'ai', text: data.reply }]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setChatLog([...updatedLog, {
        sender: 'ai',
        text: `⚠️ I couldn't reach my AI engine: ${err.message}\n\nPlease make sure the backend server is running (\`npm run server\`). I'm still here — ask again in a moment! 🌿`,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ maxWidth: '680px', background: '#F7F8F3', padding: 0, overflow: 'hidden', borderRadius: '20px' }}
      >

        {/* ── Header ───────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px', borderBottom: '1px solid #E2E4D8',
          background: 'linear-gradient(135deg, #E4EFE7 0%, #F7F8F3 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #3F7D58 0%, #2D5F42 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(63,125,88,0.35)'
            }}>
              <Sparkles size={22} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#243027', letterSpacing: '-0.01em' }}>
                Eshva <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3F7D58', background: '#E4EFE7', padding: '2px 8px', borderRadius: '999px', marginLeft: '4px' }}>Gemini AI</span>
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#3F7D58', fontWeight: 600 }}>
                {backendOnline
                  ? `● Active · Personalized for ${studentProfile.stage}`
                  : '○ Offline mode — limited replies'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {reports.length > 0 && (
              <button
                id="eshva-reports-btn"
                onClick={() => setShowReportPanel(!showReportPanel)}
                title="View Safety Reports"
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '6px 12px', borderRadius: '8px',
                  background: '#FFF3F0', border: '1px solid #F5C2B8',
                  color: '#C0392B', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600
                }}
              >
                <ShieldAlert size={15} />
                {reports.length} Alert{reports.length > 1 ? 's' : ''}
              </button>
            )}
            <button
              id="eshva-close-btn"
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: '#6B7D70', cursor: 'pointer', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── Parent Alert Banner ─────────────────────────────── */}
        {lastAlert && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            padding: '12px 20px', background: '#FFF0EE', borderBottom: '1px solid #F5C2B8',
            animation: 'fadeSlideIn 0.4s ease'
          }}>
            <AlertTriangle size={18} color="#C0392B" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#922B21' }}>
                🛡️ Safety Alert Triggered · Report Sent to Parent
              </div>
              <div style={{ fontSize: '0.72rem', color: '#7B241C', marginTop: '2px' }}>
                Notified: <strong>{lastAlert.parentName}</strong> ({lastAlert.parentEmail}) at {lastAlert.timestamp}
              </div>
            </div>
            <button onClick={() => setLastAlert(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0392B' }}>
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── Safety Report Panel ─────────────────────────────── */}
        {showReportPanel && (
          <div style={{
            background: '#FFFAF9', borderBottom: '1px solid #F5C2B8',
            padding: '16px 20px', maxHeight: '200px', overflowY: 'auto'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#922B21', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={15} /> Safety Reports Log (stored in backend)
            </div>
            {reports.map(r => (
              <div key={r.id || r._id} style={{
                padding: '10px 14px', background: '#FFF0EE', borderRadius: '10px',
                border: '1px solid #F5C2B8', marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#922B21' }}>
                    ⚠️ Inappropriate Activity Detected
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#7B241C' }}>{r.timestamp}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4A5B4F', marginBottom: '4px' }}>
                  <strong>Student:</strong> {r.studentName} &nbsp;|&nbsp;
                  <strong>Flagged Words:</strong> {r.flaggedWords?.join(', ')}
                </div>
                <div style={{ fontSize: '0.73rem', color: '#4A5B4F', fontStyle: 'italic', marginBottom: '6px' }}>
                  "{r.originalMessage}"
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: '#1E8449', fontWeight: 600 }}>
                  <CheckCircle2 size={12} />
                  Report sent to {r.parentName} · {r.parentEmail}
                  <Mail size={12} style={{ marginLeft: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Chat Area ───────────────────────────────────────── */}
        <div style={{
          height: '320px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '12px',
          padding: '18px 20px', background: '#F4F7F1',
        }}>
          {chatLog.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
              <div style={{
                fontSize: '0.7rem', fontWeight: 700,
                color: msg.sender === 'user'
                  ? (msg.flagged ? '#922B21' : '#275239')
                  : '#6B4F28',
                marginBottom: '3px', paddingLeft: '4px'
              }}>
                {msg.sender === 'user' ? `👤 ${studentProfile.name}` : '✨ Eshva'}
                {msg.flagged && (
                  <span style={{ marginLeft: '6px', color: '#C0392B', fontWeight: 700 }}>
                    ⚠️ Flagged
                  </span>
                )}
              </div>
              <div style={{
                padding: '10px 14px',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: msg.sender === 'user'
                  ? (msg.flagged ? '#F5C2B8' : '#3F7D58')
                  : (msg.isWarning ? '#FFF0EE' : '#FFFFFF'),
                color: msg.sender === 'user'
                  ? (msg.flagged ? '#7B241C' : '#FFFFFF')
                  : (msg.isWarning ? '#922B21' : '#243027'),
                fontSize: '0.85rem', lineHeight: 1.6,
                border: msg.sender === 'ai'
                  ? (msg.isWarning ? '1px solid #F5C2B8' : '1px solid #E2E4D8')
                  : 'none',
                boxShadow: '0 1px 4px rgba(36,48,39,0.06)',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6B4F28', marginBottom: '3px', paddingLeft: '4px' }}>
                ✨ Eshva
              </div>
              <div style={{
                padding: '10px 16px', borderRadius: '12px 12px 12px 2px',
                background: '#FFFFFF', border: '1px solid #E2E4D8',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <Loader2 size={14} color="#84A98C" className="spin" />
                <span style={{ fontSize: '0.72rem', color: '#6B7D70', fontWeight: 500 }}>Eshva is thinking with Gemini AI...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* ── Quick Prompts ───────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          padding: '12px 20px', borderTop: '1px solid #E2E4D8', background: '#F7F8F3'
        }}>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendQuery(qp.text)}
              style={{
                fontSize: '0.72rem', padding: '5px 12px',
                background: '#FFFFFF', border: '1px solid #D6DACB',
                borderRadius: '999px', color: '#4A5B4F',
                cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { e.target.style.borderColor = '#3F7D58'; e.target.style.color = '#3F7D58'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#D6DACB'; e.target.style.color = '#4A5B4F'; }}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* ── Input Area ──────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: '10px',
          padding: '14px 20px', borderTop: '1px solid #E2E4D8', background: '#FFFFFF'
        }}>
          <input
            id="eshva-chat-input"
            type="text"
            placeholder="Ask Eshva about exams, careers, resume, or interview prep..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            style={{
              flex: 1, background: '#F7F8F3',
              border: '1px solid #CBD2C0', borderRadius: '10px',
              padding: '11px 14px', color: '#243027',
              outline: 'none', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif'
            }}
          />
          <button
            id="eshva-send-btn"
            className="btn-primary"
            onClick={() => handleSendQuery()}
            disabled={!transcript.trim() || isTyping}
            style={{ padding: '11px 18px', opacity: !transcript.trim() || isTyping ? 0.6 : 1 }}
          >
            {isTyping ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
            <span>{isTyping ? '...' : 'Send'}</span>
          </button>
        </div>

        {/* ── Safety Footer ───────────────────────────────────── */}
        <div style={{
          padding: '8px 20px', background: '#F4F7F1',
          borderTop: '1px solid #E2E4D8',
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.68rem', color: '#6B7D70'
        }}>
          <ShieldAlert size={12} color="#8C5E32" />
          <span>
            Eshva (Google Gemini AI) monitors all conversations for safety. Inappropriate usage is automatically reported to parents and stored in the backend.
          </span>
        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 0.9s linear infinite; }
      `}</style>
    </div>
  );
}