import React, { useState } from 'react';
import { BookOpenCheck, Scale } from 'lucide-react';

export default function ExamPlannerView({ studentProfile }) {
  const [activeSubTab, setActiveSubTab] = useState('exams');

  const examsList = [
    {
      name: 'JEE Main & Advanced 2026',
      category: 'Engineering / CS',
      eligibility: 'Class 12 Science (PCM) with min 75% marks',
      pattern: 'Computer Based Test (CBT) - Physics, Chemistry, Maths MCQs + Numerical',
      weightage: [
        { subject: 'Mathematics', weight: '33.3%' },
        { subject: 'Physics', weight: '33.3%' },
        { subject: 'Chemistry', weight: '33.3%' }
      ],
      registrationWindow: 'Nov 2025 - Jan 2026',
      examDate: 'Jan & April 2026',
      daysLeft: 12,
      officialPortal: 'https://jeemain.nta.ac.in'
    },
    {
      name: 'CUET UG 2026 (Common University Entrance)',
      category: 'Central Universities',
      eligibility: 'Class 12 Passed / Appearing (Any Stream)',
      pattern: 'CBT - Section I (Language), Section II (Domain Subjects), Section III (General Test)',
      weightage: [
        { subject: 'Domain Science/Maths', weight: '50%' },
        { subject: 'General Aptitude', weight: '30%' },
        { subject: 'Language Comprehension', weight: '20%' }
      ],
      registrationWindow: 'Feb 2026 - March 2026',
      examDate: 'May 2026',
      daysLeft: 64,
      officialPortal: 'https://cuetug.ntaonline.in'
    },
    {
      name: 'GATE 2026 (Graduate Aptitude Test in Engineering)',
      category: 'Postgrad & PSU Jobs',
      eligibility: '3rd / 4th Year B.Tech Students or Graduates',
      pattern: '65 Questions (General Aptitude + Engineering Maths + Core CS)',
      weightage: [
        { subject: 'Core CS & Tech', weight: '72%' },
        { subject: 'Engineering Maths', weight: '13%' },
        { subject: 'General Aptitude', weight: '15%' }
      ],
      registrationWindow: 'Aug 2025 - Oct 2025',
      examDate: 'February 2026',
      daysLeft: 145,
      officialPortal: 'https://gate2026.iitb.ac.in'
    }
  ];

  const collegeList = [
    {
      name: 'Indian Institute of Technology (IIT) Bombay',
      rank: '#1 NIRF Engineering',
      location: 'Mumbai, Maharashtra',
      streams: 'B.Tech CS, AI, EE, Mechanical',
      avgPlacement: '₹25.8 LPA',
      topPackage: '₹1.2 Crore',
      annualFees: '₹2.2 Lakhs / yr',
      hostelFacility: 'Fully Residential 5★ Campus',
      acceptanceExam: 'JEE Advanced'
    },
    {
      name: 'BITS Pilani (Birla Institute of Tech & Science)',
      rank: '#5 NIRF Private',
      location: 'Pilani, Rajasthan / Hyderabad',
      streams: 'B.E. Computer Science, Data Science',
      avgPlacement: '₹20.5 LPA',
      topPackage: '₹60 LPA',
      annualFees: '₹5.5 Lakhs / yr',
      hostelFacility: 'Top Tier Infrastructure',
      acceptanceExam: 'BITSAT'
    },
    {
      name: 'Delhi Technological University (DTU)',
      rank: '#8 NIRF Govt',
      location: 'New Delhi',
      streams: 'B.Tech Software Engg, Information Tech',
      avgPlacement: '₹16.4 LPA',
      topPackage: '₹52 LPA',
      annualFees: '₹1.9 Lakhs / yr',
      hostelFacility: 'Available for Delhi & Outside Delhi',
      acceptanceExam: 'JEE Main (JAC Delhi)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card gradient-bg-cyan" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BookOpenCheck size={22} color="#3F7D58" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#243027' }}>
              Module 2 — Exam, College & Resource Guidance
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#4A5B4F' }}>
            Objective entrance exam breakdowns, official syllabi, and side-by-side college comparison.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div style={{ display: 'flex', background: '#FFFFFF', padding: '4px', borderRadius: '10px', border: '1px solid #E2E4D8' }}>
          <button 
            id="subtab-exams"
            className="btn-secondary"
            onClick={() => setActiveSubTab('exams')}
            style={{ 
              background: activeSubTab === 'exams' ? '#3F7D58' : 'transparent',
              color: activeSubTab === 'exams' ? '#FFF' : '#4A5B4F',
              border: 'none',
              fontSize: '0.8rem',
              padding: '6px 14px'
            }}
          >
            Entrance Exams
          </button>

          <button 
            id="subtab-colleges"
            className="btn-secondary"
            onClick={() => setActiveSubTab('colleges')}
            style={{ 
              background: activeSubTab === 'colleges' ? '#3F7D58' : 'transparent',
              color: activeSubTab === 'colleges' ? '#FFF' : '#4A5B4F',
              border: 'none',
              fontSize: '0.8rem',
              padding: '6px 14px'
            }}
          >
            College Comparison
          </button>
        </div>
      </div>

      {activeSubTab === 'exams' ? (
        /* Exams View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {examsList.map((exam, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: '6px' }}>{exam.category}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#243027' }}>{exam.name}</h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D4A373' }}>{exam.daysLeft} Days</div>
                  <span style={{ fontSize: '0.75rem', color: '#6B7D70' }}>Exam Window: {exam.examDate}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: '#F4F7F1', borderRadius: '8px', border: '1px solid #E2E4D8' }}>
                  <span style={{ fontSize: '0.725rem', color: '#6B7D70', display: 'block' }}>Eligibility</span>
                  <strong style={{ fontSize: '0.8rem', color: '#243027' }}>{exam.eligibility}</strong>
                </div>

                <div style={{ padding: '12px', background: '#F4F7F1', borderRadius: '8px', border: '1px solid #E2E4D8' }}>
                  <span style={{ fontSize: '0.725rem', color: '#6B7D70', display: 'block' }}>Form Registration Window</span>
                  <strong style={{ fontSize: '0.8rem', color: '#3F7D58' }}>{exam.registrationWindow}</strong>
                </div>

                <div style={{ padding: '12px', background: '#F4F7F1', borderRadius: '8px', border: '1px solid #E2E4D8' }}>
                  <span style={{ fontSize: '0.725rem', color: '#6B7D70', display: 'block' }}>Exam Pattern</span>
                  <strong style={{ fontSize: '0.8rem', color: '#243027' }}>{exam.pattern}</strong>
                </div>
              </div>

              {/* Weightage Breakdown */}
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#6B7D70', marginBottom: '8px', display: 'block' }}>Subject Weightage Distribution:</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {exam.weightage.map((w, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                      {w.subject}: <strong>{w.weight}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* College Comparison View */
        <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#243027', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="#3F7D58" />
            <span>Side-by-Side Target College Matrix</span>
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E4D8', color: '#6B7D70', fontSize: '0.8rem' }}>
                <th style={{ padding: '12px' }}>College Name</th>
                <th style={{ padding: '12px' }}>NIRF Ranking</th>
                <th style={{ padding: '12px' }}>Accepted Exam</th>
                <th style={{ padding: '12px' }}>Avg Placement Package</th>
                <th style={{ padding: '12px' }}>Annual Fees</th>
              </tr>
            </thead>
            <tbody>
              {collegeList.map((col, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E2E4D8', color: '#4A5B4F', fontSize: '0.85rem' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#243027' }}>
                    {col.name}
                    <span style={{ display: 'block', fontSize: '0.725rem', color: '#6B7D70', fontWeight: 400 }}>{col.location}</span>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{col.rank}</span>
                  </td>
                  <td style={{ padding: '14px', fontWeight: 600, color: '#8C5E32' }}>{col.acceptanceExam}</td>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#3F7D58' }}>{col.avgPlacement}</td>
                  <td style={{ padding: '14px' }}>{col.annualFees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
