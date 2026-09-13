import React, { useState, useEffect } from 'react';
import { Zap, X, CheckCircle2, AlertCircle, Award, Loader2, CloudUpload } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client';

export default function DynamicQuizModal({ isOpen, onClose, studentProfile }) {
  const { isAuthenticated } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Reset quiz state each time the modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(0);
      setSelectedOption(null);
      setScore(0);
      setQuizFinished(false);
      setSaving(false);
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quizQuestions = [
    {
      q: "Which data structure uses the LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Binary Tree", "Linked List"],
      answer: 1,
      explanation: "A Stack removes the last inserted element first (LIFO)."
    },
    {
      q: "What is the primary purpose of an ATS (Applicant Tracking System) in hiring?",
      options: [
        "Automated payroll processing",
        "Filtering resumes based on keyword relevance & structure",
        "Conducting video interviews",
        "Managing employee leave balances"
      ],
      answer: 1,
      explanation: "ATS algorithms filter resumes based on keyword matches before recruiters review them."
    },
    {
      q: "Which entrance exam is primarily accepted for admission to Indian Institutes of Technology (IITs)?",
      options: ["CUET UG", "GATE", "JEE Advanced", "NEET UG"],
      answer: 2,
      explanation: "JEE Advanced is mandatory for undergraduate B.Tech entry into IITs."
    },
    {
      q: "In Big-O notation, what is the average time complexity of searching a sorted array using Binary Search?",
      options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
      answer: 2,
      explanation: "Binary search repeatedly divides the search interval in half, yielding O(log N) complexity."
    },
    {
      q: "Which field of Generative AI focuses on converting spoken words into structured digital text?",
      options: ["Text-to-Speech (TTS)", "Speech Recognition (STT)", "Computer Vision", "Reinforcement Learning"],
      answer: 1,
      explanation: "Speech-to-Text (STT) transcribe human voice audio into text."
    }
  ];

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (index === quizQuestions[currentIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      if (isAuthenticated) {
        setSaving(true);
        api.saveQuizScore({
          score,
          total: quizQuestions.length,
          domain: studentProfile.targetDomain,
        })
          .then(() => setSaved(true))
          .catch(() => setSaved(false))
          .finally(() => setSaving(false));
      }
    }
  };

  const handleSaveAndClose = async () => {
    if (!saved && isAuthenticated && !saving) {
      setSaving(true);
      try {
        await api.saveQuizScore({
          score,
          total: quizQuestions.length,
          domain: studentProfile.targetDomain,
        });
        setSaved(true);
      } catch (err) {
        console.warn('Quiz save failed:', err.message);
      } finally {
        setSaving(false);
      }
    }
    onClose();
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQ = quizQuestions[currentIdx];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '580px', background: '#F7F8F3' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #E2E4D8', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: '#F9EFE3', borderRadius: '10px' }}>
              <Zap size={22} color="#D4A373" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#243027' }}>
                AI Aptitude & Skill Test
              </h3>
              <span style={{ fontSize: '0.725rem', color: '#6B7D70' }}>Tailored for {studentProfile.targetDomain} ({studentProfile.stage})</span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6B7D70', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {!quizFinished ? (
          <div>
            {/* Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: '#6B7D70' }}>Question {currentIdx + 1} of {quizQuestions.length}</span>
              <span className="badge badge-amber">Score: {score}</span>
            </div>

            {/* Question Text */}
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#243027', marginBottom: '18px', lineHeight: 1.4 }}>
              {currentQ.q}
            </h4>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === currentQ.answer;

                let optionBg = '#FFFFFF';
                let optionBorder = '#E2E4D8';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    optionBg = '#E8F3EB';
                    optionBorder = '#3F7D58';
                  } else if (isSelected) {
                    optionBg = '#FDF2F2';
                    optionBorder = '#C86D51';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    disabled={selectedOption !== null}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: optionBg,
                      border: `1px solid ${optionBorder}`,
                      color: '#243027',
                      fontSize: '0.875rem',
                      cursor: selectedOption === null ? 'pointer' : 'default',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && isCorrect && <CheckCircle2 size={18} color="#3F7D58" />}
                    {selectedOption !== null && isSelected && !isCorrect && <AlertCircle size={18} color="#C86D51" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {selectedOption !== null && (
              <div style={{ padding: '12px', background: '#E4EFE7', borderRadius: '8px', border: '1px solid #C5DCCC', marginBottom: '16px', fontSize: '0.825rem', color: '#275239' }}>
                💡 <strong>Explanation:</strong> {currentQ.explanation}
              </div>
            )}

            {/* Next Button */}
            {selectedOption !== null && (
              <button className="btn-primary" onClick={handleNextQuestion} style={{ width: '100%', justifyContent: 'center' }}>
                {currentIdx < quizQuestions.length - 1 ? 'Next Question →' : 'See Results'}
              </button>
            )}
          </div>
        ) : (
          /* Quiz Results View */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Award size={54} color="#D4A373" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#243027', marginBottom: '6px' }}>
              Quiz Completed!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6B7D70', marginBottom: '20px' }}>
              You scored <strong style={{ color: '#3F7D58', fontSize: '1.2rem' }}>{score} / {quizQuestions.length}</strong> ({Math.round((score/quizQuestions.length)*100)}%)
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={handleResetQuiz}>Retake Quiz</button>
              <button className="btn-primary" onClick={handleSaveAndClose} disabled={saving}>
                {saving ? <Loader2 size={16} className="spin" /> : <CloudUpload size={16} />}
                <span>{saving ? 'Saving to backend...' : 'Close & Save Score'}</span>
              </button>
            </div>

            {isAuthenticated && (
              <p style={{ fontSize: '0.72rem', color: saved ? '#3F7D58' : '#8C5E32', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                {saved ? '✅ Score synced to your backend profile' : '⚠️ Your score will sync when you save'}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
