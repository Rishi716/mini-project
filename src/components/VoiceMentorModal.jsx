import React, { useState } from 'react';
import { Mic, MicOff, X, Bot } from 'lucide-react';

export default function VoiceMentorModal({ isOpen, onClose, studentProfile }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'ai',
      text: `Hello ${studentProfile.name}! I am your Career GenAI Voice Mentor. I am ready to guide you on your ${studentProfile.targetDomain} roadmap, entrance exam strategies, or placement preparation. How can I help you today?`
    }
  ]);

  if (!isOpen) return null;

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Web Speech API is not supported in this browser. You can type your query below!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSendQuery = (customText) => {
    const textToSend = customText || transcript;
    if (!textToSend.trim()) return;

    const updatedLog = [...chatLog, { sender: 'user', text: textToSend }];
    setChatLog(updatedLog);
    setTranscript('');

    setTimeout(() => {
      let reply = `Based on your profile for ${studentProfile.targetDomain} in ${studentProfile.stage}, my recommendation is to prioritize core subjects alongside practical project development. For entrance exams, allocate 2 hours daily to question solving.`;
      
      if (textToSend.toLowerCase().includes('jee') || textToSend.toLowerCase().includes('cuet')) {
        reply = `For ${studentProfile.targetDomain}, JEE Main and CUET are crucial. Focus on high-weightage topics like Calculus in Maths and Mechanics in Physics. Practice mock tests twice a week.`;
      } else if (textToSend.toLowerCase().includes('resume') || textToSend.toLowerCase().includes('job')) {
        reply = `To improve your resume score for ${studentProfile.targetDomain}, include at least 2 full-stack capstone projects, highlight Python/JavaScript algorithms, and keep your formatting ATS-compliant.`;
      }

      setChatLog([...updatedLog, { sender: 'ai', text: reply }]);
      speakText(reply);
    }, 800);
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', background: '#F7F8F3' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #E2E4D8', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: '#E4EFE7', borderRadius: '10px' }}>
              <Bot size={22} color="#3F7D58" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#243027' }}>
                AI Voice & Doubt Assistant
              </h3>
              <span style={{ fontSize: '0.725rem', color: '#3F7D58', fontWeight: 600 }}>● Powered by Web Speech Engine & Gemini AI</span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6B7D70', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Transcript Area */}
        <div style={{
          height: '280px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '14px',
          background: '#F4F7F1',
          borderRadius: '12px',
          border: '1px solid #E2E4D8',
          marginBottom: '20px'
        }}>
          {chatLog.map((msg, i) => (
            <div 
              key={i} 
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: msg.sender === 'user' ? '#3F7D58' : '#FFFFFF',
                color: msg.sender === 'user' ? '#FFFFFF' : '#243027',
                fontSize: '0.85rem',
                lineHeight: 1.4,
                border: msg.sender === 'ai' ? '1px solid #E2E4D8' : 'none',
                boxShadow: '0 1px 2px rgba(36,48,39,0.03)'
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.8, marginBottom: '2px' }}>
                {msg.sender === 'user' ? 'You' : 'Voice Mentor AI'}
              </div>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              id="voice-mic-record-btn"
              onClick={handleVoiceInput}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isListening ? '#C86D51' : '#3F7D58',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(63, 125, 88, 0.3)',
                flexShrink: 0
              }}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <input 
              type="text" 
              placeholder={isListening ? "Listening... Speak now!" : "Type or speak your question..."}
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
                fontSize: '0.85rem'
              }}
            />

            <button className="btn-primary" onClick={() => handleSendQuery()} style={{ padding: '11px 16px' }}>
              Send
            </button>
          </div>

          {/* Quick Prompts */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button 
              onClick={() => handleSendQuery("What is the best preparation strategy for JEE/CUET exams?")}
              style={{ fontSize: '0.725rem', padding: '4px 10px', background: '#F0F2EA', border: '1px solid #E2E4D8', borderRadius: '999px', color: '#4A5B4F', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              💡 Exam Strategy
            </button>
            <button 
              onClick={() => handleSendQuery("How can I prepare for technical interviews?")}
              style={{ fontSize: '0.725rem', padding: '4px 10px', background: '#F0F2EA', border: '1px solid #E2E4D8', borderRadius: '999px', color: '#4A5B4F', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              💡 Interview Prep
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
