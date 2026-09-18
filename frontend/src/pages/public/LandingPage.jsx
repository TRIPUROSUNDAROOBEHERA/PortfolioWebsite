import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Modular Public Views
import Home from './Home';
import AboutPage from './AboutPage';
import ExperiencePage from './ExperiencePage';
import EducationPage from './EducationPage';
import SkillsPage from './SkillsPage';
import ProjectsPage from './ProjectsPage';
import CertificatesPage from './CertificatesPage';
import AchievementsPage from './AchievementsPage';
import CoursesPage from './CoursesPage';
import BlogPage from './BlogPage';
import ContactPage from './ContactPage';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');

  const profile = {
    full_name: 'S. Ram Kumar',
    initials: 'SR',
    role: 'MCA Graduate | Full Stack Developer | Python & React',
    email: 'sramkumar0101@gmail.com',
    phone: '+91 98765 43210',
    location: 'India',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    workspaceImg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
    bio: 'I am a motivated MCA graduate with a strong foundation in computer applications and a passion for full-stack software development. I specialize in Django, React.js, and REST APIs, building resilient real-world software solutions.',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutPage profile={profile} setActiveTab={setActiveTab} />;
      case 'experience':
        return <ExperiencePage setActiveTab={setActiveTab} />;
      case 'education':
        return <EducationPage setActiveTab={setActiveTab} />;
      case 'skills':
        return <SkillsPage setActiveTab={setActiveTab} />;
      case 'projects':
        return <ProjectsPage setActiveTab={setActiveTab} />;
      case 'certificates':
        return <CertificatesPage setActiveTab={setActiveTab} />;
      case 'achievements':
        return <AchievementsPage setActiveTab={setActiveTab} />;
      case 'courses':
        return <CoursesPage setActiveTab={setActiveTab} />;
      case 'blog':
        return <BlogPage setActiveTab={setActiveTab} />;
      case 'contact':
        return <ContactPage setActiveTab={setActiveTab} />;
      default:
        return <Home profile={profile} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* 1. Sticky Header Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} profile={profile} />

      {/* 2. Dynamic Tab Container */}
      <main className="flex-1 w-full">{renderContent()}</main>

      {/* 3. Gradient Footer */}
      <Footer setActiveTab={setActiveTab} profile={profile} />
    </div>
  );
}