import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare } from 'lucide-react';

export default function VoiceMentorModal({ isOpen, onClose, studentProfile }) {
  const [transcript, setTranscript] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'ai',
      text: `Hello ${studentProfile.name}! I am your Career GenAI AI Mentor. I am ready to guide you on your ${studentProfile.targetDomain} roadmap, entrance exam strategies, or placement preparation. How can I help you today?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '💡 Exam Strategy', text: 'What is the best preparation strategy for JEE/CUET exams?' },
    { label: '🎯 Career Roadmap', text: 'Give me a step by step roadmap for Computer Science & AI.' },
    { label: '📄 Resume Tips', text: 'How can I improve my resume to get shortlisted by top companies?' },
    { label: '💼 Interview Prep', text: 'How should I prepare for technical interviews at top tech companies?' },
  ];

  const getAIReply = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes('jee') || lower.includes('cuet')) {
      return `For ${studentProfile.targetDomain}, JEE Main and CUET are your primary entrance exams. Here's a focused strategy:\n\n📌 **Mathematics**: Focus on Calculus, Algebra, and Coordinate Geometry — they carry the highest weightage.\n📌 **Physics**: Mechanics and Electromagnetism are critical. Solve 30 numericals daily.\n📌 **Mock Tests**: Take 2 full-length mock tests per week under timed conditions.\n📌 **Registration**: Keep JEE Main registration windows (Nov–Jan) and CUET (Feb–March) saved in your calendar.\n\nYou currently have 12 days before your next exam milestone — focus on high-weightage topics first!`;
    }

    if (lower.includes('resume') || lower.includes('ats')) {
      return `To improve your resume score for ${studentProfile.targetDomain}:\n\n✅ **Add 2-3 Full Stack Projects** with live links (GitHub + deployed URL)\n✅ **Technical Keywords**: Include Python, REST APIs, Docker, Git, System Design\n✅ **Metrics**: Add quantifiable impact (e.g., "Reduced API response time by 40%")\n✅ **ATS Format**: Use single-column layout, no tables, no graphics\n✅ **Skills Section**: List languages, frameworks, and tools clearly\n\nYour current resume score is 72% — the missing keywords are Docker, CI/CD, and System Architecture. Adding those can push it past 90%!`;
    }

    if (lower.includes('interview') || lower.includes('technical')) {
      return `For technical interview preparation at top companies:\n\n🔹 **DSA**: Solve 150–200 LeetCode problems (focus on Arrays, Trees, Graphs, DP)\n🔹 **System Design**: Study Grokking the System Design Interview (free resources online)\n🔹 **CS Fundamentals**: Revise OS (processes/threads), DBMS (indexing, normalization), Networks (TCP/IP)\n🔹 **Mock Interviews**: Practice with Pramp.com or InterviewBit\n🔹 **HR Questions**: Prepare STAR-method answers for behavioral questions\n\nFor ${studentProfile.stage}, I recommend starting DSA now and adding System Design in 2–3 months.`;
    }

    if (lower.includes('roadmap') || lower.includes('career')) {
      return `Here's your personalized roadmap for **${studentProfile.targetDomain}**:\n\n**Stage 1 — ${studentProfile.stage}** (Current)\n• Master core Math & Science fundamentals\n• Build 1–2 beginner projects in Python or JavaScript\n• Prepare for entrance exams (JEE/CUET)\n\n**Stage 2 — College (Years 1–2)**\n• Learn Data Structures & Algorithms deeply\n• Complete online certifications (CS50, NPTEL)\n• Contribute to open-source projects\n\n**Stage 3 — College (Years 3–4)**\n• Build 3–5 full-stack capstone projects\n• Target internships at product companies\n• Solve 200+ LeetCode problems\n\n**Stage 4 — Placement**\n• ATS-optimized resume with measurable impact\n• Mock interviews + system design rounds\n• Apply to Tier-1 companies (Google, Microsoft, Amazon)\n\nYou're at Stage 1 — focus on consistency and building your foundation!`;
    }

    return `Great question! Based on your profile as a **${studentProfile.stage}** student targeting **${studentProfile.targetDomain}**, here's my recommendation:\n\n• **Short term**: Focus on building a strong foundation in core subjects and 1 hands-on project.\n• **Medium term**: Target competitive exams (JEE/CUET) and collect certifications in your domain.\n• **Long term**: Build a portfolio of 3+ real projects and practice DSA + System Design for placements.\n\nIs there a specific area you'd like to go deeper into — exams, projects, resume, or interview prep?`;
  };

  const handleSendQuery = (customText) => {
    const textToSend = (customText || transcript).trim();
    if (!textToSend) return;

    const updatedLog = [...chatLog, { sender: 'user', text: textToSend }];
    setChatLog(updatedLog);
    setTranscript('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIReply(textToSend);
      setChatLog([...updatedLog, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', background: '#F7F8F3' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #E2E4D8', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: '#E4EFE7', borderRadius: '10px' }}>
              <Bot size={22} color="#3F7D58" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#243027' }}>
                AI Career Mentor
              </h3>
              <span style={{ fontSize: '0.725rem', color: '#3F7D58', fontWeight: 600 }}>
                ● Personalized Guidance for {studentProfile.stage}
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6B7D70', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div style={{
          height: '320px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '14px',
          background: '#F4F7F1',
          borderRadius: '12px',
          border: '1px solid #E2E4D8',
          marginBottom: '16px'
        }}>
          {chatLog.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: msg.sender === 'user' ? '#275239' : '#8C5E32',
                marginBottom: '3px',
                paddingLeft: '4px'
              }}>
                {msg.sender === 'user' ? '👤 You' : '🤖 AI Mentor'}
              </div>
              <div style={{
                padding: '10px 14px',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: msg.sender === 'user' ? '#3F7D58' : '#FFFFFF',
                color: msg.sender === 'user' ? '#FFFFFF' : '#243027',
                fontSize: '0.85rem',
                lineHeight: 1.55,
                border: msg.sender === 'ai' ? '1px solid #E2E4D8' : 'none',
                boxShadow: '0 1px 3px rgba(36,48,39,0.05)',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8C5E32', marginBottom: '3px', paddingLeft: '4px' }}>
                🤖 AI Mentor
              </div>
              <div style={{
                padding: '10px 16px',
                borderRadius: '12px 12px 12px 2px',
                background: '#FFFFFF',
                border: '1px solid #E2E4D8',
                display: 'flex',
                gap: '5px',
                alignItems: 'center'
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#84A98C',
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendQuery(qp.text)}
              style={{
                fontSize: '0.725rem',
                padding: '5px 12px',
                background: '#FFFFFF',
                border: '1px solid #D6DACB',
                borderRadius: '999px',
                color: '#4A5B4F',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { e.target.style.borderColor = '#3F7D58'; e.target.style.color = '#3F7D58'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#D6DACB'; e.target.style.color = '#4A5B4F'; }}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Text Input + Send */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Ask about exams, careers, resume, or interview prep..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            style={{
              flex: 1,
              background: '#FFFFFF',
              border: '1px solid #CBD2C0',
              borderRadius: '10px',
              padding: '11px 14px',
              color: '#243027',
              outline: 'none',
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif'
            }}
          />

          <button
            className="btn-primary"
            onClick={() => handleSendQuery()}
            disabled={!transcript.trim()}
            style={{ padding: '11px 18px', opacity: !transcript.trim() ? 0.6 : 1 }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>

        {/* Bounce animation */}
        <style>{`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
          }
        `}</style>

      </div>
    </div>
  );
}
