import React, { useState } from 'react';
import { Compass, CheckCircle2, Sparkles, Search } from 'lucide-react';

export default function CareerExplorerView({ studentProfile, onSelectDomain }) {
  const [selectedDomain, setSelectedDomain] = useState('Computer Science & AI');
  const [searchQuery, setSearchQuery] = useState('');

  const careerDatabase = [
    {
      id: 'cs-ai',
      title: 'Computer Science & AI Specialist',
      matchScore: 94,
      category: 'Tech & Engineering',
      description: 'Design intelligent systems, build machine learning models, and engineer high-scale software applications.',
      eligibility: 'Class 12 Science (PCM) with minimum 60% or B.Tech CS',
      duration: '4 Years (B.Tech / B.E.)',
      subjects: ['Data Structures', 'Python', 'Machine Learning', 'Linear Algebra', 'Web Systems'],
      skills: ['Problem Solving', 'Algorithm Design', 'PyTorch / TensorFlow', 'System Design'],
      exams: ['JEE Main', 'JEE Advanced', 'CUET', 'GATE CS'],
      salaryRange: { entry: '₹8 - 14 LPA', mid: '₹18 - 30 LPA', senior: '₹45+ LPA' },
      growth: 'High Growth (+28% annual demand increase)',
      roles: ['AI Engineer', 'Machine Learning Specialist', 'Full-Stack Software Architect', 'Data Scientist'],
      roadmap: [
        { step: 1, phase: 'School Stage (Class 9-12)', action: 'Focus on Mathematics, Physics, and Logic. Build basic Python/JS projects.' },
        { step: 2, phase: 'Entrance Prep', action: 'Target JEE Main / CUET. Master PCM concepts and analytical speed.' },
        { step: 3, phase: 'College Semesters 1-4', action: 'Master Data Structures & Algorithms (DSA), Object Oriented Programming, Git.' },
        { step: 4, phase: 'College Semesters 5-8', action: 'Specialize in GenAI / Cloud, complete 2 major projects, solve 300+ LeetCode problems.' },
        { step: 5, phase: 'Placement Stage', action: 'ATS Resume optimization, System Design practice, mock interviews.' }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Ethical Hacking Expert',
      matchScore: 88,
      category: 'Information Security',
      description: 'Protect corporate infrastructure, conduct penetration testing, and defend against zero-day cyber threats.',
      eligibility: 'Class 12 Science / BCA / B.Tech CS',
      duration: '3 to 4 Years',
      subjects: ['Computer Networks', 'Cryptography', 'Linux Kernel', 'Network Security'],
      skills: ['Wireshark', 'Metasploit', 'Python Scripting', 'Threat Analysis'],
      exams: ['CUET', 'GATE', 'CEH Certification'],
      salaryRange: { entry: '₹6 - 10 LPA', mid: '₹15 - 24 LPA', senior: '₹38+ LPA' },
      growth: 'Critical Demand (+32% annual deficit of skilled engineers)',
      roles: ['Penetration Tester', 'Security Operations Center Analyst', 'Cybersecurity Architect'],
      roadmap: [
        { step: 1, phase: 'Class 10-12', action: 'Understand TCP/IP, Linux command line, networking basics.' },
        { step: 2, phase: 'Undergrad Study', action: 'Obtain CompTIA Security+ or Certified Ethical Hacker (CEH).' },
        { step: 3, phase: 'Hands-on Labs', action: 'Practice on TryHackMe, HackTheBox, participate in CTF competitions.' }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science & Business Analytics Specialist',
      matchScore: 85,
      category: 'Analytics & Big Data',
      description: 'Transform raw enterprise data into actionable predictive insights and executive dashboards.',
      eligibility: 'Class 12 (Maths / Statistics preferred) or B.Sc / B.Tech',
      duration: '3 to 4 Years',
      subjects: ['Applied Statistics', 'SQL & Relational DBs', 'R / Python', 'PowerBI / Tableau'],
      skills: ['Data Wrangling', 'Predictive Modeling', 'Business Intelligence', 'SQL Queries'],
      exams: ['CUET', 'GATE Data Science (DA)', 'CAT'],
      salaryRange: { entry: '₹7 - 12 LPA', mid: '₹16 - 26 LPA', senior: '₹40+ LPA' },
      growth: 'Very High Growth (+25%)',
      roles: ['Data Analyst', 'Business Intelligence Manager', 'Analytics Consultant'],
      roadmap: [
        { step: 1, phase: 'Foundations', action: 'Master Excel, SQL fundamentals, and Descriptive Statistics.' },
        { step: 2, phase: 'Tool Proficiency', action: 'Build interactive dashboards in Tableau and Python Pandas.' },
        { step: 3, phase: 'Real-world Capstone', action: 'Analyze e-commerce / financial datasets on Kaggle.' }
      ]
    },
    {
      id: 'fintech-finance',
      title: 'Fintech & Investment Banking Analyst',
      matchScore: 79,
      category: 'Finance & Tech',
      description: 'Analyze financial markets, build quantitative algorithmic trading models, and manage venture portfolios.',
      eligibility: 'Class 12 Commerce / PCM or B.Com / BBA / B.Tech',
      duration: '3 Years (B.Com/BBA) + 2 Years (MBA/CFA)',
      subjects: ['Corporate Finance', 'Financial Modeling', 'Algorithmic Trading', 'Economics'],
      skills: ['Financial Analysis', 'Python for Finance', 'Excel Valuation', 'Market Research'],
      exams: ['CUET', 'CAT', 'CFA Level 1'],
      salaryRange: { entry: '₹8 - 15 LPA', mid: '₹22 - 35 LPA', senior: '₹50+ LPA' },
      growth: 'High Growth (+20%)',
      roles: ['Quantitative Analyst', 'Investment Banking Associate', 'Fintech Product Manager'],
      roadmap: [
        { step: 1, phase: 'School Stage', action: 'Master Accounting principles, Economics, and Financial Mathematics.' },
        { step: 2, phase: 'College Stage', action: 'Prepare for CFA Level 1 or CAT exam for Tier-1 IIM admission.' }
      ]
    }
  ];

  const filteredCareers = careerDatabase.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeCareer = careerDatabase.find(c => c.title === selectedDomain) || careerDatabase[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card gradient-bg-purple" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Compass size={22} color="#3F7D58" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#243027' }}>
              Module 1 — Career, Course & Profession Explorer
            </h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#4A5B4F' }}>
            AI matches your profile with verified career fields, subjects, entrance exams, and 5-stage roadmaps.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 14px', borderRadius: '10px', border: '1px solid #E2E4D8', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <Search size={16} color="#6B7D70" />
          <input 
            type="text" 
            placeholder="Search career, skill, exam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#243027', outline: 'none', fontSize: '0.85rem', width: '180px' }}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '20px' }}>
        
        {/* Left Side: Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7D70', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Matched Career Fields ({filteredCareers.length})
          </div>

          {filteredCareers.map((c) => {
            const isSelected = selectedDomain === c.title;
            return (
              <div 
                key={c.id}
                onClick={() => setSelectedDomain(c.title)}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '16px',
                  borderColor: isSelected ? '#3F7D58' : '#E2E4D8',
                  background: isSelected ? '#E4EFE7' : 'rgba(255, 255, 255, 0.75)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{c.category}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isSelected ? '#275239' : '#3F7D58' }}>
                    {c.matchScore}% Fit
                  </span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#243027', marginBottom: '4px' }}>
                  {c.title}
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#6B7D70', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {c.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Detailed View */}
        <div className="glass-card" style={{ padding: '28px' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #E2E4D8', paddingBottom: '20px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-cyan">{activeCareer.category}</span>
                <span className="badge badge-green">Salary: {activeCareer.salaryRange.mid}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#243027' }}>
                {activeCareer.title}
              </h2>
            </div>

            <button 
              className="btn-primary" 
              onClick={() => onSelectDomain(activeCareer.title)}
              style={{ fontSize: '0.85rem' }}
            >
              <CheckCircle2 size={16} />
              <span>Set as Target Goal</span>
            </button>
          </div>

          {/* Overview Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '14px', background: '#F4F7F1', borderRadius: '10px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70', display: 'block', marginBottom: '4px' }}>Eligibility & Course</span>
              <strong style={{ fontSize: '0.85rem', color: '#243027' }}>{activeCareer.eligibility}</strong>
            </div>

            <div style={{ padding: '14px', background: '#F4F7F1', borderRadius: '10px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70', display: 'block', marginBottom: '4px' }}>Target Entrance Exams</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {activeCareer.exams.map((ex, i) => (
                  <span key={i} className="badge badge-purple">
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ padding: '14px', background: '#F4F7F1', borderRadius: '10px', border: '1px solid #E2E4D8' }}>
              <span style={{ fontSize: '0.75rem', color: '#6B7D70', display: 'block', marginBottom: '4px' }}>Market Growth & Demand</span>
              <strong style={{ fontSize: '0.85rem', color: '#3F7D58' }}>{activeCareer.growth}</strong>
            </div>
          </div>

          {/* 5-Step Connected Student Journey Roadmap */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={18} color="#3F7D58" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#243027' }}>
                Personalized 5-Stage Roadmap (School to Placement)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activeCareer.roadmap.map((step) => (
                <div 
                  key={step.step} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px',
                    background: '#F4F7F1',
                    borderRadius: '12px',
                    borderLeft: '4px solid #3F7D58',
                    border: '1px solid #E2E4D8',
                    borderLeftWidth: '4px'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#3F7D58',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {step.step}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#3F7D58', marginBottom: '2px' }}>
                      {step.phase}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#4A5B4F' }}>
                      {step.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
