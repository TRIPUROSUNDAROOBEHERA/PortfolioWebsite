import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab, profile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'courses', label: 'Courses' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 px-4 sm:px-8 py-3.5 shadow-sm font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Left */}
        <div
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] flex items-center justify-center font-black text-white text-sm shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
            {profile?.initials || 'SR'}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-black text-base leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] whitespace-nowrap">
              {profile?.full_name || 'S. Ram Kumar'}
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 leading-none mt-1 whitespace-nowrap">
              MCA Graduate | Software Developer
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-[13px] 2xl:text-[13.5px] font-bold">
          {navLinks.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`transition-all py-1 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#1E6BFF] border-b-2 border-[#1E6BFF] font-black'
                  : 'text-slate-600 hover:text-[#1E6BFF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Download CV */}
          <a
            href="/resume.pdf"
            download
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-extrabold text-white bg-gradient-to-r from-[#2563eb] to-[#8b5cf6] hover:from-[#1d4ed8] hover:to-[#7c3aed] shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap select-none"
          >
            <i className="fa-solid fa-download text-[11px]"></i>
            <span>Download CV</span>
          </a>

          {/* Direct Django Backend Admin Panel Link */}
          <a
            href="http://127.0.0.1:8000/admin/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-extrabold text-white bg-[#0f172a] hover:bg-[#1e293b] shadow-sm transition-all border border-slate-900 cursor-pointer whitespace-nowrap select-none"
          >
            <i className="fa-solid fa-lock text-[10.5px] text-[#38bdf8]"></i>
            <span>Admin Panel</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors ml-1"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Collapsible) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 mt-3 pt-3 pb-2 grid grid-cols-2 sm:grid-cols-3 gap-1.5 animate-fade-in max-w-7xl mx-auto">
          {navLinks.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              • {tab.label}
            </button>
          ))}
          <div className="col-span-2 sm:col-span-3 pt-2 flex flex-col gap-2">
            <a
              href="/resume.pdf"
              download
              className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#2563eb] to-[#8b5cf6]"
            >
              <i className="fa-solid fa-download text-xs"></i> Download CV
            </a>
            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#0f172a]"
            >
              <i className="fa-solid fa-lock text-xs text-[#38bdf8]"></i> Admin Panel
            </a>
          </div>
        </div>
      )}
    </header>
  );
}