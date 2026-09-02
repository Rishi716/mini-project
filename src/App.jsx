import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CareerExplorerView from './components/CareerExplorerView';
import ExamPlannerView from './components/ExamPlannerView';
import StudyMentorView from './components/StudyMentorView';
import PlacementLabView from './components/PlacementLabView';
import VoiceMentorModal from './components/VoiceMentorModal';
import DynamicQuizModal from './components/DynamicQuizModal';
import ProfileModal from './components/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Student Profile State
  const [studentProfile, setStudentProfile] = useState({
    name: 'Adarsh',
    stage: 'Class 11-12',
    targetDomain: 'Computer Science & AI',
    interests: ['Coding', 'Artificial Intelligence', 'Mathematics']
  });

  // Modal Controls
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleSaveProfile = (updatedProfile) => {
    setStudentProfile(updatedProfile);
  };

  const handleSelectDomainFromExplorer = (domainTitle) => {
    setStudentProfile(prev => ({ ...prev, targetDomain: domainTitle }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F8F3' }}>
      
      {/* Global Navbar */}
      <Navbar 
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenVoiceMentor={() => setIsVoiceModalOpen(true)}
      />

      {/* Body Layout: Sidebar + Main Content View */}
      <div style={{ flex: 1, display: 'flex', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '28px 32px', minWidth: 0 }}>
          {activeTab === 'dashboard' && (
            <DashboardView 
              studentProfile={studentProfile}
              setActiveTab={setActiveTab}
              onOpenVoiceMentor={() => setIsVoiceModalOpen(true)}
              onOpenQuiz={() => setIsQuizModalOpen(true)}
            />
          )}

          {activeTab === 'explorer' && (
            <CareerExplorerView 
              studentProfile={studentProfile}
              onSelectDomain={handleSelectDomainFromExplorer}
            />
          )}

          {activeTab === 'exams' && (
            <ExamPlannerView studentProfile={studentProfile} />
          )}

          {activeTab === 'colleges' && (
            <ExamPlannerView studentProfile={studentProfile} />
          )}

          {activeTab === 'mentor' && (
            <StudyMentorView 
              studentProfile={studentProfile}
              onOpenVoiceMentor={() => setIsVoiceModalOpen(true)}
              onOpenQuiz={() => setIsQuizModalOpen(true)}
            />
          )}

          {activeTab === 'placement' && (
            <PlacementLabView studentProfile={studentProfile} />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <VoiceMentorModal 
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        studentProfile={studentProfile}
      />

      <DynamicQuizModal 
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        studentProfile={studentProfile}
      />

      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        studentProfile={studentProfile}
        onSaveProfile={handleSaveProfile}
      />

    </div>
  );
}
