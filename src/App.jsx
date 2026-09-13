import React, { useState, useEffect } from 'react';
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
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext.jsx';
import { api } from './api/client';

const DEFAULT_PROFILE = {
  name: 'Adarsh',
  stage: 'Class 11-12',
  targetDomain: 'Computer Science & AI',
  interests: ['Coding', 'Artificial Intelligence', 'Mathematics'],
  parentEmail: 'parent@example.com',
  parentName: 'Parent/Guardian'
};

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Student Profile State
  const [studentProfile, setStudentProfile] = useState(DEFAULT_PROFILE);

  // Modal Controls
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync logged-in user's profile from backend
  useEffect(() => {
    if (user) {
      setStudentProfile({
        name: user.name || DEFAULT_PROFILE.name,
        stage: user.stage || DEFAULT_PROFILE.stage,
        targetDomain: user.targetDomain || DEFAULT_PROFILE.targetDomain,
        interests: user.interests || DEFAULT_PROFILE.interests,
        parentEmail: user.parentEmail || '',
        parentName: user.parentName || '',
      });
    }
  }, [user]);

  const handleSaveProfile = async (updatedProfile) => {
    setStudentProfile(updatedProfile);
    if (isAuthenticated) {
      try {
        await api.updateProfile(updatedProfile);
      } catch (err) {
        console.warn('Profile sync failed:', err.message);
      }
    }
  };

  const handleSelectDomainFromExplorer = async (domainTitle) => {
    const updated = { ...studentProfile, targetDomain: domainTitle };
    setStudentProfile(updated);
    if (isAuthenticated) {
      try {
        await api.updateProfile(updated);
      } catch (err) {
        console.warn('Domain sync failed:', err.message);
      }
    }
  };

  const openVoiceMentor = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsVoiceModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F8F3' }}>

      {/* Global Navbar */}
      <Navbar
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenVoiceMentor={openVoiceMentor}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Body Layout: Sidebar + Main Content View */}
      <div className="app-container">

        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="main-content">
          {activeTab === 'dashboard' && (
            <DashboardView
              studentProfile={studentProfile}
              setActiveTab={setActiveTab}
              onOpenVoiceMentor={openVoiceMentor}
              onOpenQuiz={() => {
                if (!isAuthenticated) { setIsAuthModalOpen(true); return; }
                setIsQuizModalOpen(true);
              }}
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
              onOpenVoiceMentor={openVoiceMentor}
              onOpenQuiz={() => {
                if (!isAuthenticated) { setIsAuthModalOpen(true); return; }
                setIsQuizModalOpen(true);
              }}
            />
          )}

          {activeTab === 'placement' && (
            <PlacementLabView studentProfile={studentProfile} />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <VoiceMentorModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        studentProfile={studentProfile}
        onProfileUpdate={setStudentProfile}
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