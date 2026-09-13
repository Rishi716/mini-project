import React, { useState } from 'react';
import { BookOpenCheck, Clock, ExternalLink, AlertTriangle, CheckCircle2, Globe } from 'lucide-react';

function daysUntil(d) {
  const t = new Date(); t.setHours(0,0,0,0);
  const x = new Date(d); x.setHours(0,0,0,0);
  return Math.ceil((x-t)/(864e5));
}

function DaysChip({ days, label }) {
  const past = days < 0, urgent = days>=0&&days<=30, warn = days>30&&days<=90;
  const color = past?'#6B7D70':urgent?'#C0392B':warn?'#D4A373':'#3F7D58';
  const bg    = past?'#F0F2EA':urgent?'#FFF0EE':warn?'#FFF8EE':'#E4EFE7';
  return (
    <div style={{textAlign:'right'}}>
      <div style={{fontSize:'1.5rem',fontWeight:800,color}}>{past?'Passed':`${days}d`}</div>
      <span style={{fontSize:'0.68rem',fontWeight:600,color,background:bg,padding:'2px 8px',borderRadius:'999px'}}>
        {past?'✅ Done':urgent?'🔴 Urgent':warn?'🟡 Soon':'🟢 On Track'}
      </span>
      <div style={{fontSize:'0.68rem',color:'#6B7D70',marginTop:'3px'}}>{label}</div>
    </div>
  );
}

export default function ExamPlannerView({ studentProfile }) {
  const [tab, setTab] = useState('exams');
  const now = new Date();
  const ts = now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})
           + ' · ' + now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});

  const exams = [
    { name:'JEE Main 2027 (Session 1)', cat:'Engineering / IITs & NITs',
      elig:'Class 12 PCM, min 75%', pattern:'CBT — Physics, Chemistry, Maths',
      reg:'Nov 2026 – Jan 2027', examDate:'January 2027', startDate:'2027-01-20', regDeadline:'2026-11-30',
      fee:'₹1,000 (Gen) · ₹500 (SC/ST)', attempts:'2/yr, max 3 yrs',
      portal:'https://jeemain.nta.nic.in/',
      wtg:[{s:'Mathematics',w:'33.3%'},{s:'Physics',w:'33.3%'},{s:'Chemistry',w:'33.3%'}],
      domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Data Science & Analytics'], level: 'UG' },
    { name:'JEE Advanced 2027', cat:'IITs Only',
      elig:'Top 2.5L JEE Main qualifiers, Class 12 ≥75%', pattern:'Paper 1 & 2 — PCM (MCQ + Numerical)',
      reg:'April 2027', examDate:'May 2027', startDate:'2027-05-25', regDeadline:'2027-04-20',
      fee:'₹3,200 (Gen) · ₹1,600 (Women/SC/ST)', attempts:'Max 2 consecutive',
      portal:'https://jeeadv.ac.in',
      wtg:[{s:'Mathematics',w:'~33%'},{s:'Physics',w:'~33%'},{s:'Chemistry',w:'~33%'}],
      domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Data Science & Analytics'], level: 'UG' },
    { name:'CUET UG 2027', cat:'Central Universities',
      elig:'Class 12 Passed / Appearing (Any Stream)', pattern:'CBT — Language, Domain, General Test',
      reg:'Feb 2027 – Mar 2027', examDate:'May–Jun 2027', startDate:'2027-05-08', regDeadline:'2027-03-15',
      fee:'₹750 (Gen) · ₹500 (SC/ST)', attempts:'Once/year',
      portal:'https://cuet.nta.nic.in/',
      wtg:[{s:'Domain',w:'50%'},{s:'General Aptitude',w:'30%'},{s:'Language',w:'20%'}],
      domains: ['Computer Science & AI', 'Fintech & Finance', 'Medical & Biotech', 'Design & Product UI/UX', 'Data Science & Analytics'], level: 'UG' },
    { name:'AKTU UPSEE / UPTAC 2027', cat:'UP Technical Universities (AKTU)',
      elig:'Class 12 PCM with min 45%', pattern:'Online MCQ — PCM + Aptitude',
      reg:'Jan 2027 – Mar 2027', examDate:'April 2027', startDate:'2027-04-15', regDeadline:'2027-03-10',
      fee:'₹1,200 (Gen) · ₹600 (SC/ST)', attempts:'Once/year',
      portal:'https://uptac.admissions.nic.in',
      wtg:[{s:'Mathematics',w:'40%'},{s:'Physics',w:'30%'},{s:'Chemistry',w:'30%'}],
      domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Data Science & Analytics'], level: 'UG' },
    { name:'GATE 2027', cat:'Postgrad & PSU Jobs',
      elig:'3rd/4th Year B.Tech or Graduate', pattern:'65 Qs — GA + Engg Maths + Core CS',
      reg:'Sep 2026 – Oct 2026', examDate:'February 2027', startDate:'2027-02-01', regDeadline:'2026-10-07',
      fee:'₹1,800 (Gen) · ₹900 (Women/SC/ST)', attempts:'Unlimited, valid 3 yrs',
      portal:'https://gate2027.iitm.ac.in/',
      wtg:[{s:'Core CS',w:'72%'},{s:'Engg Maths',w:'13%'},{s:'General Aptitude',w:'15%'}],
      domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Data Science & Analytics'], level: 'PG' },
    { name:'BITSAT 2027', cat:'BITS Pilani / Hyderabad / Goa',
      elig:'Class 12 PCM ≥75%', pattern:'Online — PCM + English + LR (130 MCQs)',
      reg:'Jan 2027 – Mar 2027', examDate:'May 2027', startDate:'2027-05-20', regDeadline:'2027-03-31',
      fee:'₹3,400 (1 centre)', attempts:'Once/year',
      portal:'https://www.bitsadmission.com',
      wtg:[{s:'Maths+CS',w:'45%'},{s:'Physics',w:'25%'},{s:'Chemistry',w:'20%'},{s:'English+LR',w:'10%'}],
      domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Data Science & Analytics', 'Fintech & Finance'], level: 'UG' },
    { name:'NEET UG 2027', cat:'Medical / MBBS / BDS',
      elig:'Class 12 PCB with min 50%', pattern:'Pen & Paper — Biology, Physics, Chemistry (200 Qs)',
      reg:'Dec 2026 – Jan 2027', examDate:'May 2027', startDate:'2027-05-04', regDeadline:'2027-01-15',
      fee:'₹1,700 (Gen) · ₹1,000 (SC/ST)', attempts:'Unlimited (age ≤25)',
      portal:'https://neet.nta.nic.in',
      wtg:[{s:'Biology',w:'50%'},{s:'Physics',w:'25%'},{s:'Chemistry',w:'25%'}],
      domains: ['Medical & Biotech'], level: 'UG' },
    { name:'CAT 2026', cat:'MBA / IIMs',
      elig:'Graduation with min 50% (45% SC/ST)', pattern:'CBT — VARC, DILR, Quant (66 Qs)',
      reg:'Aug 2026 – Sep 2026', examDate:'November 2026', startDate:'2026-11-23', regDeadline:'2026-09-20',
      fee:'₹2,400 (Gen) · ₹1,200 (SC/ST)', attempts:'Once/year',
      portal:'https://iimcat.ac.in',
      wtg:[{s:'VARC',w:'33%'},{s:'DILR',w:'33%'},{s:'Quant',w:'33%'}],
      domains: ['Fintech & Finance', 'Data Science & Analytics', 'Design & Product UI/UX'], level: 'PG' },
  ];

  const colleges = [
    // IITs
    { name:'IIT Bombay', loc:'Mumbai, MH', rank:'#1 NIRF Engg', fees:'₹2.37L/yr', total:'~₹9.5L', avg:'₹28.5 LPA', top:'₹1.68 Cr', exam:'JEE Advanced', portal:'https://www.iitb.ac.in', type:'IIT', domains: ['Computer Science & AI', 'Data Science & Analytics', 'Design & Product UI/UX'] },
    { name:'IIT Delhi', loc:'New Delhi', rank:'#2 NIRF Engg', fees:'₹2.32L/yr', total:'~₹9.3L', avg:'₹27.2 LPA', top:'₹2.4 Cr', exam:'JEE Advanced', portal:'https://home.iitd.ac.in', type:'IIT', domains: ['Computer Science & AI', 'Data Science & Analytics', 'Cybersecurity & Hacking'] },
    { name:'IIT Madras', loc:'Chennai, TN', rank:'#3 NIRF Engg', fees:'₹2.30L/yr', total:'~₹9.2L', avg:'₹26.1 LPA', top:'₹1.2 Cr', exam:'JEE Advanced', portal:'https://www.iitm.ac.in', type:'IIT', domains: ['Computer Science & AI', 'Medical & Biotech'] },
    { name:'IIT Kanpur', loc:'Kanpur, UP', rank:'#4 NIRF Engg', fees:'₹2.12L/yr', total:'~₹8.5L', avg:'₹24.3 LPA', top:'₹1.1 Cr', exam:'JEE Advanced', portal:'https://www.iitk.ac.in', type:'IIT', domains: ['Computer Science & AI', 'Fintech & Finance'] },
    { name:'IIT Kharagpur', loc:'Kharagpur, WB', rank:'#5 NIRF Engg', fees:'₹1.48L/yr', total:'~₹5.9L', avg:'₹22.4 LPA', top:'₹1.5 Cr', exam:'JEE Advanced', portal:'https://www.iitkgp.ac.in', type:'IIT', domains: ['Computer Science & AI', 'Cybersecurity & Hacking'] },
    // NITs
    { name:'NIT Trichy', loc:'Tiruchirappalli, TN', rank:'#9 NIRF Engg', fees:'₹1.49L/yr', total:'~₹6.0L', avg:'₹18.4 LPA', top:'₹45 LPA', exam:'JEE Main', portal:'https://www.nitt.edu', type:'NIT', domains: ['Computer Science & AI', 'Data Science & Analytics'] },
    { name:'NIT Warangal', loc:'Warangal, TS', rank:'#10 NIRF Engg', fees:'₹1.35L/yr', total:'~₹5.4L', avg:'₹16.2 LPA', top:'₹40 LPA', exam:'JEE Main', portal:'https://www.nitw.ac.in', type:'NIT', domains: ['Computer Science & AI', 'Cybersecurity & Hacking'] },
    { name:'NIT Surathkal', loc:'Mangaluru, KA', rank:'#11 NIRF Engg', fees:'₹1.22L/yr', total:'~₹4.9L', avg:'₹15.5 LPA', top:'₹38 LPA', exam:'JEE Main', portal:'https://www.nitk.ac.in', type:'NIT', domains: ['Computer Science & AI', 'Fintech & Finance'] },
    // UP / AKTU
    { name:'AKTU (APJ Abdul Kalam TU)', loc:'Lucknow, UP', rank:'State Tech Univ', fees:'₹0.80L/yr', total:'~₹3.2L', avg:'₹5.5 LPA', top:'₹22 LPA', exam:'UPTAC / JEE Main', portal:'https://aktu.ac.in', type:'AKTU', domains: ['Computer Science & AI', 'Cybersecurity & Hacking'] },
    { name:'HBTU Kanpur', loc:'Kanpur, UP', rank:'AKTU Affiliated', fees:'₹0.95L/yr', total:'~₹3.8L', avg:'₹6.2 LPA', top:'₹24 LPA', exam:'UPTAC', portal:'https://www.hbtu.ac.in', type:'AKTU', domains: ['Computer Science & AI', 'Data Science & Analytics'] },
    { name:'MMMUT Gorakhpur', loc:'Gorakhpur, UP', rank:'AKTU Affiliated', fees:'₹0.85L/yr', total:'~₹3.4L', avg:'₹5.8 LPA', top:'₹18 LPA', exam:'UPTAC', portal:'https://mmmut.ac.in', type:'AKTU', domains: ['Computer Science & AI'] },
    // Gujarat
    { name:'GTU (Gujarat TU)', loc:'Ahmedabad, GJ', rank:'State Tech Univ', fees:'₹0.70L/yr', total:'~₹2.8L', avg:'₹5.2 LPA', top:'₹20 LPA', exam:'GUJCET / JEE Main', portal:'https://www.gtu.ac.in', type:'GU', domains: ['Computer Science & AI'] },
    { name:'DAIICT Gandhinagar', loc:'Gandhinagar, GJ', rank:'Top Private GJ', fees:'₹3.25L/yr', total:'~₹13L', avg:'₹14.8 LPA', top:'₹42 LPA', exam:'Own + JEE Main', portal:'https://www.daiict.ac.in', type:'GU', domains: ['Computer Science & AI', 'Data Science & Analytics', 'Design & Product UI/UX'] },
    // Private
    { name:'BITS Pilani', loc:'Pilani, RJ', rank:'#5 NIRF Private', fees:'₹5.96L/yr', total:'~₹23.8L', avg:'₹22.7 LPA', top:'₹75 LPA', exam:'BITSAT', portal:'https://www.bits-pilani.ac.in', type:'Private', domains: ['Computer Science & AI', 'Fintech & Finance', 'Data Science & Analytics'] },
    { name:'DTU Delhi', loc:'New Delhi', rank:'#8 NIRF State', fees:'₹2.04L/yr', total:'~₹8.2L', avg:'₹17.8 LPA', top:'₹55 LPA', exam:'JEE Main (JAC)', portal:'https://dtu.ac.in', type:'State', domains: ['Computer Science & AI', 'Design & Product UI/UX'] },
    { name:'VIT Vellore', loc:'Vellore, TN', rank:'#11 NIRF Private', fees:'₹2.30L/yr', total:'~₹9.2L', avg:'₹9.2 LPA', top:'₹44 LPA', exam:'VITEEE', portal:'https://vit.ac.in', type:'Private', domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Medical & Biotech'] },
    { name:'SRM Chennai', loc:'Chennai, TN', rank:'#24 NIRF', fees:'₹2.50L/yr', total:'~₹10L', avg:'₹7.5 LPA', top:'₹38 LPA', exam:'SRMJEE', portal:'https://www.srmist.edu.in', type:'Private', domains: ['Computer Science & AI', 'Medical & Biotech'] },
    { name:'Manipal University', loc:'Manipal, KA', rank:'#16 NIRF', fees:'₹3.00L/yr', total:'~₹12L', avg:'₹8.2 LPA', top:'₹36 LPA', exam:'MU OET / JEE Main', portal:'https://manipal.edu', type:'Private', domains: ['Computer Science & AI', 'Medical & Biotech', 'Fintech & Finance'] },
    // Central Universities
    { name:'BHU (Banaras Hindu University)', loc:'Varanasi, UP', rank:'Central Univ #3', fees:'₹0.35L/yr', total:'~₹1.4L', avg:'₹8.6 LPA', top:'₹28 LPA', exam:'CUET / JEE Main', portal:'https://www.bhu.ac.in', type:'Central', domains: ['Fintech & Finance', 'Medical & Biotech'] },
    { name:'Delhi University', loc:'New Delhi', rank:'#11 NIRF Univ', fees:'₹0.25L/yr', total:'~₹1.0L', avg:'₹7.8 LPA', top:'₹30 LPA', exam:'CUET UG', portal:'https://www.du.ac.in', type:'Central', domains: ['Fintech & Finance', 'Data Science & Analytics'] },
    { name:'Jadavpur University', loc:'Kolkata, WB', rank:'#7 NIRF Engg', fees:'₹0.20L/yr', total:'~₹0.8L', avg:'₹12.4 LPA', top:'₹52 LPA', exam:'WBJEE / JEE Main', portal:'https://jadavpuruniversity.in', type:'State', domains: ['Computer Science & AI', 'Cybersecurity & Hacking', 'Medical & Biotech'] },
  ];

  const typeColors = {
    IIT:     { bg:'#E4EFE7', color:'#275239', border:'#C5DCCC' },
    NIT:     { bg:'#EEF2FF', color:'#3730A3', border:'#C7D2FE' },
    AKTU:    { bg:'#FFF8EE', color:'#8C5E32', border:'#F5D9A3' },
    GU:      { bg:'#FEF3C7', color:'#92400E', border:'#FDE68A' },
    Private: { bg:'#F4EBE2', color:'#7C3AED', border:'#DDD6FE' },
    State:   { bg:'#F0FDF4', color:'#166534', border:'#BBF7D0' },
    Central: { bg:'#FDF4FF', color:'#86198F', border:'#F0ABFC' },
  };

  const filteredExams = exams.filter(e => {
    if (!e.domains.includes(studentProfile.targetDomain)) return false;
    const isSchoolStage = ['Class 6-10', 'Class 11-12', 'Entrance Aspirant'].includes(studentProfile.stage);
    const isCollegeStage = ['College Student', 'Placement Stage'].includes(studentProfile.stage);
    
    if (isSchoolStage && e.level === 'PG') return false; // Hide GATE/CAT from school students
    if (isCollegeStage && e.level === 'UG') return false; // Hide JEE/CUET from college students
    return true;
  });

  const filteredColleges = colleges.filter(c => c.domains.includes(studentProfile.targetDomain));

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>

      {/* Header */}
      <div className="glass-card gradient-bg-cyan" style={{padding:'22px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
            <BookOpenCheck size={22} color="#3F7D58"/>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,color:'#243027'}}>Module 2 — Exam, College & Resource Guidance</h2>
          </div>
          <p style={{fontSize:'0.875rem',color:'#4A5B4F'}}>
            Click any <strong>exam card</strong> or <strong>college card</strong> to open its official portal directly.
          </p>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'#E4EFE7',border:'1px solid #C5DCCC',borderRadius:'999px',padding:'4px 12px'}}>
            <Clock size={13} color="#3F7D58"/>
            <span style={{fontSize:'0.7rem',fontWeight:600,color:'#275239'}}>Live · {ts}</span>
          </div>
          <div style={{display:'flex',background:'#FFFFFF',padding:'4px',borderRadius:'10px',border:'1px solid #E2E4D8'}}>
            {['exams','colleges'].map(t => (
              <button key={t} id={`subtab-${t}`} className="btn-secondary"
                onClick={()=>setTab(t)}
                style={{background:tab===t?'#3F7D58':'transparent',color:tab===t?'#FFF':'#4A5B4F',border:'none',fontSize:'0.8rem',padding:'6px 14px'}}>
                {t==='exams'?'Entrance Exams':'Colleges & Universities'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab==='exams' ? (
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 14px',background:'#E4EFE7',borderRadius:'10px',border:'1px solid #C5DCCC',marginBottom:'16px'}}>
            <Globe size={14} color="#3F7D58"/>
            <span style={{fontSize:'0.75rem',color:'#275239',fontWeight:600}}>
              💡 Showing exams relevant to your target domain: <strong>{studentProfile.targetDomain}</strong> ({studentProfile.stage})
            </span>
          </div>
          {filteredExams.length === 0 ? (
            <p style={{textAlign: 'center', color: '#6B7D70', marginTop: '20px'}}>No specific exams found for {studentProfile.targetDomain} at your current stage.</p>
          ) : filteredExams.map((exam,i) => {
            const dE = daysUntil(exam.startDate);
            const dR = daysUntil(exam.regDeadline);
            return (
              <div key={i} className="glass-card"
                onClick={()=>window.open(exam.portal,'_blank','noopener,noreferrer')}
                style={{padding:'20px',cursor:'pointer',transition:'all 0.2s ease'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#3F7D58';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#E2E4D8';e.currentTarget.style.transform='translateY(0)';}}>

                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',marginBottom:'14px'}}>
                  <div>
                    <span className="badge badge-amber" style={{marginBottom:'6px'}}>{exam.cat}</span>
                    <h3 style={{fontSize:'1.1rem',fontWeight:700,color:'#243027'}}>{exam.name}</h3>
                    <div style={{display:'flex',alignItems:'center',gap:'4px',marginTop:'4px',fontSize:'0.72rem',color:'#3F7D58',fontWeight:600}}>
                      <ExternalLink size={11}/> {exam.portal.replace('https://','').replace('http://','').split('/')[0]}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
                    <DaysChip days={dE} label={`Exam: ${exam.examDate}`}/>
                    <DaysChip days={dR} label={`Reg closes: ${exam.regDeadline}`}/>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'10px',marginBottom:'12px'}}>
                  {[
                    {l:'Eligibility',v:exam.elig,c:'#243027'},
                    {l:'Registration Window',v:exam.reg,c:'#3F7D58'},
                    {l:'Application Fee',v:exam.fee,c:'#8C5E32'},
                    {l:'Pattern',v:exam.pattern,c:'#243027'},
                    {l:'Attempts',v:exam.attempts,c:'#243027'},
                  ].map((f,j)=>(
                    <div key={j} style={{padding:'10px',background:'#F4F7F1',borderRadius:'8px',border:'1px solid #E2E4D8'}}>
                      <div style={{fontSize:'0.65rem',color:'#6B7D70',fontWeight:600,marginBottom:'3px'}}>{f.l}</div>
                      <strong style={{fontSize:'0.78rem',color:f.c}}>{f.v}</strong>
                    </div>
                  ))}
                </div>

                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {exam.wtg.map((w,j)=>(
                    <span key={j} className="badge badge-cyan" style={{fontSize:'0.72rem'}}>
                      {w.s}: <strong>{w.w}</strong>
                    </span>
                  ))}
                </div>

                <div style={{marginTop:'10px',textAlign:'right'}}>
                  <span style={{fontSize:'0.72rem',color:'#3F7D58',fontWeight:600,display:'inline-flex',alignItems:'center',gap:'4px'}}>
                    <ExternalLink size={12}/> Click to Open Official Portal
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 14px',background:'#E4EFE7',borderRadius:'10px',border:'1px solid #C5DCCC'}}>
            <Globe size={14} color="#3F7D58"/>
            <span style={{fontSize:'0.75rem',color:'#275239',fontWeight:600}}>
              💡 Showing top colleges for <strong>{studentProfile.targetDomain}</strong>
            </span>
          </div>

          {/* Type filter legend */}
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom: '4px'}}>
            {Object.entries(typeColors).map(([type,c])=>(
              <span key={type} style={{fontSize:'0.7rem',fontWeight:700,padding:'3px 10px',borderRadius:'999px',background:c.bg,color:c.color,border:`1px solid ${c.border}`}}>
                {type}
              </span>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'14px'}}>
            {filteredColleges.length === 0 ? (
                <p style={{textAlign: 'center', color: '#6B7D70', marginTop: '20px', gridColumn: '1 / -1'}}>No specific colleges found for {studentProfile.targetDomain}.</p>
            ) : filteredColleges.map((col,i)=>{
              const tc = typeColors[col.type]||typeColors.Private;
              return (
                <div key={i} className="glass-card"
                  onClick={()=>window.open(col.portal,'_blank','noopener,noreferrer')}
                  style={{padding:'18px',cursor:'pointer',transition:'all 0.2s ease'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#3F7D58';e.currentTarget.style.transform='translateY(-2px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#E2E4D8';e.currentTarget.style.transform='translateY(0)';}}>

                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'10px'}}>
                    <div>
                      <span style={{fontSize:'0.65rem',fontWeight:700,padding:'2px 8px',borderRadius:'999px',background:tc.bg,color:tc.color,border:`1px solid ${tc.border}`,display:'inline-block',marginBottom:'6px'}}>
                        {col.type}
                      </span>
                      <h3 style={{fontSize:'0.95rem',fontWeight:700,color:'#243027'}}>{col.name}</h3>
                      <div style={{fontSize:'0.72rem',color:'#6B7D70'}}>{col.loc} · {col.rank}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:'1.2rem',fontWeight:800,color:'#3F7D58'}}>{col.avg}</div>
                      <div style={{fontSize:'0.65rem',color:'#6B7D70'}}>Avg Pkg</div>
                    </div>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginBottom:'8px'}}>
                    {[
                      {l:'Annual Fees',v:col.fees,c:'#8C5E32'},
                      {l:'Total 4-yr',v:col.total,c:'#8C5E32'},
                      {l:'Top Package',v:col.top,c:'#275239'},
                      {l:'Entrance Exam',v:col.exam,c:'#4A5B4F'},
                    ].map((f,j)=>(
                      <div key={j} style={{padding:'8px',background:'#F4F7F1',borderRadius:'7px',border:'1px solid #E2E4D8'}}>
                        <div style={{fontSize:'0.6rem',color:'#6B7D70',marginBottom:'2px',fontWeight:600}}>{f.l}</div>
                        <div style={{fontSize:'0.8rem',fontWeight:700,color:f.c}}>{f.v}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:'0.68rem',color:'#6B7D70'}}>{col.portal.replace('https://','').replace('http://','').split('/')[0]}</span>
                    <span style={{fontSize:'0.7rem',color:'#3F7D58',fontWeight:600,display:'inline-flex',alignItems:'center',gap:'4px'}}>
                      <ExternalLink size={11}/> Open Portal
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
