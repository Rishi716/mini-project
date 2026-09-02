import React from 'react';
import { 
  Target, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Zap, 
  BrainCircuit,
  Bot,
  PlayCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function DashboardView({ 
  studentProfile, 
  setActiveTab, 
  onOpenVoiceMentor,
  onOpenQuiz 
}) {
  const skillData = [
    { skill: 'Data Structures', current: 75, target: 90 },
    { skill: 'AI / ML Basics', current: 82, target: 95 },
    { skill: 'System Design', current: 55, target: 80 },
    { skill: 'Aptitude & Math', current: 88, target: 90 },
    { skill: 'Communication', current: 70, target: 85 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Welcome Banner Header (Slide 13 Figma) */}
      <div className="glass-card gradient-bg-cyan" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.4rem' }}>🌿</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#243027' }}>
              Hello, <span className="gradient-text">{studentProfile.name}</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#4A5B4F' }}>
            Your personalized career dashboard is updated for <strong>{studentProfile.stage}</strong> ({studentProfile.targetDomain}).
          </p>
        </div>

        <button 
          id="dashboard-ask-ai-btn"
          className="btn-primary"
          onClick={onOpenVoiceMentor}
        >
          <Bot size={18} />
          <span>Ask AI Mentor</span>
        </button>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Career Match */}
        <div 
          className="glass-card glass-card-interactive" 
          onClick={() => setActiveTab('explorer')}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7D70' }}>Career Match</span>
              <Target size={20} color="#3F7D58" />
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#3F7D58', marginBottom: '4px' }}>
              86%
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#4A5B4F' }}>
            Top recommendation: <strong style={{ color: '#243027' }}>{studentProfile.targetDomain}</strong>
          </p>
        </div>

        {/* Card 2: Today's Plan */}
        <div 
          className="glass-card glass-card-interactive" 
          onClick={() => setActiveTab('mentor')}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7D70' }}>Today’s Plan</span>
              <CheckCircle2 size={20} color="#8C5E32" />
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#8C5E32', marginBottom: '4px' }}>
              4 tasks
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#4A5B4F' }}>
            Complete aptitude quiz + 2 lessons
          </p>
        </div>

        {/* Card 3: Upcoming Exam */}
        <div 
          className="glass-card glass-card-interactive" 
          onClick={() => setActiveTab('exams')}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7D70' }}>Upcoming Exam</span>
              <Calendar size={20} color="#D4A373" />
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#D4A373', marginBottom: '4px' }}>
              12 days
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#4A5B4F' }}>
            CUET / JEE registration reminder
          </p>
        </div>

        {/* Card 4: Resume Score */}
        <div 
          className="glass-card glass-card-interactive" 
          onClick={() => setActiveTab('placement')}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7D70' }}>Resume Score</span>
              <FileText size={20} color="#84A98C" />
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#275239', marginBottom: '4px' }}>
              72%
            </div>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#4A5B4F' }}>
            Improve projects and keywords
          </p>
        </div>

      </div>

      {/* 3. Continue Journey Navigation Bar */}
      <div className="glass-card" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#243027' }}>Continue Journey</span>
            <ArrowRight size={16} color="#3F7D58" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              id="continue-roadmap-btn"
              className="btn-secondary" 
              onClick={() => setActiveTab('explorer')}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <span>Career Roadmap</span>
            </button>

            <button 
              id="continue-quiz-btn"
              className="btn-secondary" 
              onClick={onOpenQuiz}
              style={{ fontSize: '0.8rem', padding: '6px 12px', borderColor: '#E8D5C4', background: '#F4EBE2', color: '#8C5E32' }}
            >
              <Zap size={14} color="#D4A373" />
              <span>Daily Quiz</span>
            </button>

            <button 
              id="continue-mentor-btn"
              className="btn-secondary" 
              onClick={() => setActiveTab('mentor')}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <BrainCircuit size={14} color="#3F7D58" />
              <span>Progress & Tasks</span>
            </button>

            <button 
              id="continue-voice-btn"
              className="btn-secondary" 
              onClick={onOpenVoiceMentor}
              style={{ fontSize: '0.8rem', padding: '6px 12px', background: '#E4EFE7', borderColor: '#C5DCCC', color: '#275239' }}
            >
              <PlayCircle size={14} color="#3F7D58" />
              <span>Voice Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Deep Analytics & Roadmap Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Skill Readiness Breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#243027' }}>Skill Gap Analysis</h3>
              <p style={{ fontSize: '0.75rem', color: '#6B7D70' }}>AI comparison vs Industry Target Score</p>
            </div>
            <span className="badge badge-cyan">AI Scored</span>
          </div>

          <div style={{ height: '200px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="skill" stroke="#6B7D70" fontSize={10} tickLine={false} />
                <YAxis stroke="#6B7D70" fontSize={10} domain={[0, 100]} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#FFFFFF', borderColor: '#E2E4D8', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(36,48,39,0.08)' }} 
                  itemStyle={{ color: '#3F7D58' }}
                />
                <Bar dataKey="current" radius={[4, 4, 0, 0]}>
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3F7D58' : '#D4A373'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Immediate Actions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#243027', marginBottom: '16px' }}>
            Recommended Next Steps
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: '#F4F7F1', border: '1px solid #E2E4D8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={16} color="#D4A373" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#243027' }}>Take 5-Min Aptitude Test</div>
                  <div style={{ fontSize: '0.725rem', color: '#6B7D70' }}>Boosts Career Match accuracy by +8%</div>
                </div>
              </div>
              <button className="btn-secondary" onClick={onOpenQuiz} style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                Start
              </button>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: '#F4F7F1', border: '1px solid #E2E4D8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={16} color="#3F7D58" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#243027' }}>Upload PDF Resume for ATS Score</div>
                  <div style={{ fontSize: '0.725rem', color: '#6B7D70' }}>Identify missing target skills</div>
                </div>
              </div>
              <button className="btn-secondary" onClick={() => setActiveTab('placement')} style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                Upload
              </button>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: '#F4F7F1', border: '1px solid #E2E4D8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={16} color="#8C5E32" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#243027' }}>Voice AI Counseling Session</div>
                  <div style={{ fontSize: '0.725rem', color: '#6B7D70' }}>Ask doubts about JEE/CUET roadmap</div>
                </div>
              </div>
              <button className="btn-secondary" onClick={onOpenVoiceMentor} style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                Talk
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
