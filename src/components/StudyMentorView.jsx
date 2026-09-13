import React, { useState, useEffect } from 'react';
import { Bot, Mic, CheckCircle2, Circle, Zap, Users, CloudUpload } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client';

const DEFAULT_TASKS = [
  { id: 1, title: 'Solve 10 Practice Questions on Binary Search Trees', category: 'Lesson', isCompleted: true },
  { id: 2, title: 'Revise Physics Weightage Topics for JEE / CUET', category: 'Revision', isCompleted: false },
  { id: 3, title: 'Take 5-Min Career Aptitude Quiz', category: 'Quiz', isCompleted: false },
  { id: 4, title: 'Review ATS Resume Keywords for Software Engineer Role', category: 'Project', isCompleted: false }
];

export default function StudyMentorView({ 
  studentProfile, 
  onOpenVoiceMentor,
  onOpenQuiz 
}) {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('plan');
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [synced, setSynced] = useState(false);

  // Load tasks from backend for authenticated users
  useEffect(() => {
    if (!isAuthenticated) return;
    api.getProgress()
      .then(({ progress }) => {
        if (progress?.tasks && progress.tasks.length > 0) {
          setTasks(progress.tasks);
        }
      })
      .catch(() => {});
  }, [isAuthenticated]);

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === id) {
        const updated = !t.isCompleted;
        if (updated) {
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
        }
        return { ...t, isCompleted: updated };
      }
      return t;
    });
    setTasks(updatedTasks);

    if (isAuthenticated) {
      try {
        await api.updateTasks(updatedTasks);
        setSynced(true);
        setTimeout(() => setSynced(false), 3000);
      } catch (err) {
        console.warn('Task sync failed:', err.message);
      }
    }
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
        {synced && (
          <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
            <CloudUpload size={11} /> Tasks Synced to Backend
          </span>
        )}
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
                Transparent progress reports for <strong>{studentProfile.name}</strong>'s guardian.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '20px' }}>

            {/* Student summary */}
            <div style={{ padding: '16px', background: '#F4F7F1', borderRadius: '12px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70', fontWeight: 600 }}>Student Profile</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#243027', margin: '6px 0 2px' }}>{studentProfile.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#3F7D58', fontWeight: 600 }}>{studentProfile.stage}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7D70', marginTop: '4px' }}>Target: {studentProfile.targetDomain}</div>
            </div>

            {/* Daily Task Progress */}
            <div style={{ padding: '16px', background: '#F4F7F1', borderRadius: '12px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70', fontWeight: 600 }}>Today's Task Completion</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3F7D58', margin: '4px 0' }}>
                {completedCount} / {tasks.length}
              </div>
              <div style={{ background: '#C5DCCC', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.round((completedCount / tasks.length) * 100)}%`,
                  background: '#3F7D58', height: '100%', borderRadius: '999px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
              <p style={{ fontSize: '0.72rem', color: '#275239', marginTop: '6px' }}>
                {Math.round((completedCount / tasks.length) * 100)}% of today's study plan completed
              </p>
            </div>

            {/* Pending Tasks */}
            <div style={{ padding: '16px', background: '#F4F7F1', borderRadius: '12px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70', fontWeight: 600 }}>Pending Tasks</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                {tasks.filter(t => !t.isCompleted).length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: '#3F7D58', fontWeight: 600 }}>🎉 All tasks completed today!</p>
                ) : (
                  tasks.filter(t => !t.isCompleted).map(t => (
                    <div key={t.id} style={{ fontSize: '0.75rem', color: '#4A5B4F', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#D4A373' }}>●</span> {t.title}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Parent contact info */}
            <div style={{ padding: '16px', background: '#FFF8EE', borderRadius: '12px', border: '1px solid #F5D9A3' }}>
              <span style={{ fontSize: '0.75rem', color: '#8C5E32', fontWeight: 700 }}>🛡️ Safety Contact on Record</span>
              <div style={{ marginTop: '8px' }}>
                {studentProfile.parentName || studentProfile.parentEmail ? (
                  <>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#243027' }}>
                      {studentProfile.parentName || 'Not set'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7D70', marginTop: '2px' }}>
                      {studentProfile.parentEmail || 'No email set'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#3F7D58', marginTop: '6px', fontWeight: 600 }}>
                      ✅ Will receive Eshva safety alerts
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: '#8C5E32' }}>
                    ⚠️ No parent contact set. Please update in Edit Profile.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
