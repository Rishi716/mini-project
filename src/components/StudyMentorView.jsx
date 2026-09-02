import React, { useState } from 'react';
import { Bot, Mic, CheckCircle2, Circle, Zap, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudyMentorView({ 
  studentProfile, 
  onOpenVoiceMentor,
  onOpenQuiz 
}) {
  const [activeTab, setActiveTab] = useState('plan');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Solve 10 Practice Questions on Binary Search Trees', category: 'Lesson', isCompleted: true },
    { id: 2, title: 'Revise Physics Weightage Topics for JEE / CUET', category: 'Revision', isCompleted: false },
    { id: 3, title: 'Take 5-Min Career Aptitude Quiz', category: 'Quiz', isCompleted: false },
    { id: 4, title: 'Review ATS Resume Keywords for Software Engineer Role', category: 'Project', isCompleted: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const updated = !t.isCompleted;
        if (updated) {
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
        }
        return { ...t, isCompleted: updated };
      }
      return t;
    }));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card gradient-bg-cyan" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Bot size={22} color="#3F7D58" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#243027' }}>
              Module 3 — AI Study Mentor & Voice Assistant
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#4A5B4F' }}>
            Continuous AI guidance with interactive daily targets, quiz engine, and parent reports.
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={onOpenVoiceMentor}
        >
          <Mic size={16} />
          <span>Launch Live Voice AI</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #E2E4D8', paddingBottom: '12px' }}>
        <button 
          className="btn-secondary"
          onClick={() => setActiveTab('plan')}
          style={{
            background: activeTab === 'plan' ? '#E4EFE7' : 'rgba(255, 255, 255, 0.8)',
            borderColor: activeTab === 'plan' ? '#3F7D58' : '#D6DACB',
            color: activeTab === 'plan' ? '#275239' : '#4A5B4F'
          }}
        >
          Daily Study Plan ({completedCount}/{tasks.length})
        </button>

        <button 
          className="btn-secondary"
          onClick={() => setActiveTab('parent')}
          style={{
            background: activeTab === 'parent' ? '#F4EBE2' : 'rgba(255, 255, 255, 0.8)',
            borderColor: activeTab === 'parent' ? '#D4A373' : '#D6DACB',
            color: activeTab === 'parent' ? '#8C5E32' : '#4A5B4F'
          }}
        >
          <Users size={16} />
          <span>Parent View & Guidance</span>
        </button>
      </div>

      {activeTab === 'plan' ? (
        /* Daily Study Plan Tab */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Today's Action Checklist */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#243027' }}>
                Today's Targets ({completedCount} of {tasks.length} Done)
              </h3>
              <span className="badge badge-cyan">{Math.round((completedCount/tasks.length)*100)}% Completed</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    borderRadius: '10px',
                    background: task.isCompleted ? '#E8F3EB' : '#F4F7F1',
                    border: task.isCompleted ? '1px solid #C6E2CD' : '1px solid #E2E4D8',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {task.isCompleted ? (
                      <CheckCircle2 size={20} color="#3F7D58" />
                    ) : (
                      <Circle size={20} color="#6B7D70" />
                    )}
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: task.isCompleted ? '#6B7D70' : '#243027',
                      textDecoration: task.isCompleted ? 'line-through' : 'none'
                    }}>
                      {task.title}
                    </span>
                  </div>

                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quiz Engine Card */}
          <div className="glass-card gradient-bg-purple" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Zap size={22} color="#D4A373" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#243027' }}>
                  Smart Learning & Quiz AI
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4A5B4F', marginBottom: '16px' }}>
                Test your knowledge with 5 dynamic MCQs tailored to your target stage (<strong>{studentProfile.targetDomain}</strong>).
              </p>
            </div>

            <button 
              id="launch-quiz-btn"
              className="btn-primary" 
              onClick={onOpenQuiz}
              style={{ background: '#3F7D58', width: '100%', justifyContent: 'center' }}
            >
              <span>Generate Instant AI Quiz</span>
            </button>
          </div>

        </div>
      ) : (
        /* Parent View Tab */
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Users size={24} color="#8C5E32" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#243027' }}>
                Parent View & Progress Dashboard
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#6B7D70' }}>
                Transparent reports, target exam deadlines, and support guidance for parents.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <div style={{ padding: '16px', background: '#F4F7F1', borderRadius: '12px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70' }}>Overall Weekly Engagement</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3F7D58', margin: '4px 0' }}>8.4 hrs</div>
              <p style={{ fontSize: '0.75rem', color: '#275239' }}>↑ +1.2 hrs more study time than last week</p>
            </div>

            <div style={{ padding: '16px', background: '#F4F7F1', borderRadius: '12px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70' }}>Top Strengths</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span className="badge badge-green">Logical Aptitude</span>
                <span className="badge badge-cyan">Python Basics</span>
              </div>
            </div>

            <div style={{ padding: '16px', background: '#F4F7F1', borderRadius: '12px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70' }}>Area for Parent Support</span>
              <p style={{ fontSize: '0.825rem', color: '#243027', marginTop: '6px' }}>
                Encourage practice in <strong>Physics Numerical Speed</strong> before upcoming CUET/JEE deadlines.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
