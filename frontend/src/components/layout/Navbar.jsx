import React, { useState, useEffect, useRef } from 'react';
import ResumeModal from '../ui/ResumeModal';
import { assetUrl } from '../../utils/assetUrl';

export default function Navbar({
  activeTab,
  setActiveTab,
  profile,
  onRefresh,
  isRefreshing = false,
  onActiveSectionChange,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const VALID_SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'];

  // Keyboard navigation: Escape key closes the mobile navigation menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile full-screen drawer is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('overflow-hidden');
      }
    };
  }, [mobileMenuOpen]);

  const getInitialSection = () => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      if (search.get('skill') || sessionStorage.getItem('open_skill_id')) {
        return 'skills';
      }
      if (search.get('project') || sessionStorage.getItem('open_project_id')) {
        return 'projects';
      }
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && VALID_SECTIONS.includes(hash)) {
        return hash;
      }
      const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      if (path && VALID_SECTIONS.includes(path)) {
        return path;
      }
      const saved = sessionStorage.getItem('active_portfolio_section');
      if (saved && VALID_SECTIONS.includes(saved)) {
        return saved;
      }
    }
    return 'home';
  };

  const [activeSection, setActiveSection] = useState(getInitialSection);
  const manualTargetRef = useRef(getInitialSection());

  const navLinks = [
    { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
    { id: 'about', label: 'About', icon: 'fa-regular fa-user' },
    { id: 'skills', label: 'Skills', icon: 'fa-solid fa-globe' },
    { id: 'projects', label: 'Projects', icon: 'fa-regular fa-folder' },
    { id: 'education', label: 'Education', icon: 'fa-solid fa-graduation-cap' },
    { id: 'certificates', label: 'Certificates', icon: 'fa-solid fa-certificate' },
    { id: 'contact', label: 'Contact', icon: 'fa-regular fa-envelope' },
  ];

  // Lock target on initial page load / refresh to allow layout and DOM heights to settle
  useEffect(() => {
    const initialSec = getInitialSection();
    if (initialSec && initialSec !== 'home') {
      manualTargetRef.current = initialSec;
      setActiveSection(initialSec);
      const timer = setTimeout(() => {
        manualTargetRef.current = null;
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      manualTargetRef.current = null;
    }
  }, []);

  // Dynamic ScrollSpy: identify the active section as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // If any modal (skill or project) is open, freeze ScrollSpy to avoid resetting section or flipping URL to home
      const isModalOpen = Boolean(
        (typeof document !== 'undefined' && document.body.classList.contains('modal-open')) ||
        (typeof window !== 'undefined' && (
          new URLSearchParams(window.location.search).get('skill') ||
          new URLSearchParams(window.location.search).get('project') ||
          sessionStorage.getItem('open_skill_id') ||
          sessionStorage.getItem('open_project_id')
        ))
      );
      if (isModalOpen) return;

      // If user recently clicked a nav item or page is settling from reload, hold target
      if (manualTargetRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullDocHeight = document.documentElement.scrollHeight;
      const search = window.location.search || '';

      // 1. Top of page (< 80px scroll)
      if (scrollY < 80) {
        if (activeSection !== 'home') {
          setActiveSection('home');
          sessionStorage.setItem('active_portfolio_section', 'home');
          if (window.location.hash) {
            window.history.replaceState(null, '', `${window.location.pathname}${search}`);
          }
        }
        return;
      }

      // 2. Near bottom of page -> activate Contact
      if (windowHeight + scrollY >= fullDocHeight - 60) {
        if (activeSection !== 'contact') {
          setActiveSection('contact');
          sessionStorage.setItem('active_portfolio_section', 'contact');
          window.history.replaceState(null, '', `${window.location.pathname}${search}#contact`);
        }
        return;
      }

      // 3. Focal Line Detection (Just below sticky navbar at 130px):
      // Because sections are vertically stacked, exactly one section spans Y = 130.
      const focalLine = 130;
      let matchedSection = null;

      for (const id of VALID_SECTIONS) {
        if (id === 'home') continue;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine && rect.bottom > focalLine) {
            matchedSection = id;
            break;
          }
        }
      }

      // Fallback if between sections: choose the section whose top is closest to (and <=) focalLine
      if (!matchedSection) {
        let closestDist = -Infinity;
        for (const id of VALID_SECTIONS) {
          if (id === 'home') continue;
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= focalLine && rect.top > closestDist) {
              closestDist = rect.top;
              matchedSection = id;
            }
          }
        }
      }

      const nextActive = matchedSection || 'home';
      if (nextActive !== activeSection) {
        setActiveSection(nextActive);
        sessionStorage.setItem('active_portfolio_section', nextActive);
        if (nextActive === 'home') {
          if (window.location.hash) {
            window.history.replaceState(null, '', `${window.location.pathname}${search}`);
          }
        } else {
          window.history.replaceState(null, '', `${window.location.pathname}${search}#${nextActive}`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Notify parent of active section changes
  useEffect(() => {
    if (typeof onActiveSectionChange === 'function') {
      onActiveSectionChange(activeSection);
    }
  }, [activeSection, onActiveSectionChange]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);

    // Lock manual target to prevent ScrollSpy from jumping
    manualTargetRef.current = id;
    setActiveSection(id);
    sessionStorage.setItem('active_portfolio_section', id);

    const search = window.location.search || '';

    if (id === 'home') {
      if (window.location.hash) {
        window.history.replaceState(null, '', `${window.location.pathname}${search}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        manualTargetRef.current = null;
      }, 1000);
      return;
    }

    // Update URL hash without reload jump
    window.history.replaceState(null, '', `${window.location.pathname}${search}#${id}`);

    const scrollToElement = (targetEl) => {
      const navHeight = 70;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navHeight);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Maintain lock until smooth scroll finishes
      setTimeout(() => {
        manualTargetRef.current = null;
      }, 1000);
    };

    const element = document.getElementById(id);
    if (element) {
      scrollToElement(element);
    } else {
      if (typeof setActiveTab === 'function') {
        setActiveTab('home');
      }
      setTimeout(() => {
        const targetEl = document.getElementById(id);
        if (targetEl) {
          scrollToElement(targetEl);
        }
      }, 100);
    }
  };

  const currentActive = activeSection;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md z-40 border-b border-slate-200/80 shadow-xs font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 lg:py-3.5 flex items-center justify-between gap-3 sm:gap-6 min-h-[64px] sm:min-h-[70px]">

          {/* Left Side: Brand Identity (TB Monogram + Vertical Divider + Name/Role) */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 xl:flex-none xl:w-auto">
            <div
              className="flex items-center gap-2 sm:gap-2.5 md:gap-3 cursor-pointer group select-none min-w-0 flex-1"
              onClick={() => handleNavClick('home')}
            >
              {/* Exact TB Logo Image */}
              <div className="flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform select-none">
                <img
                  src={assetUrl('tb-logo.png')}
                  alt="TB"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain block"
                />
              </div>

              {/* Vertical Divider (Matching 2nd Image) */}
              <div className="h-6 sm:h-7 w-[1.5px] bg-slate-200 flex-shrink-0"></div>

              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h1 className="font-black text-[14.5px] xs:text-[15.5px] sm:text-[15px] leading-tight text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {(profile?.first_name && profile.first_name !== 'Your') ? profile.first_name : 'Tripurosundaro'}{' '}
                  <span className="text-[#0062FF]">
                    {(profile?.last_name && profile.last_name !== 'Name') ? profile.last_name : 'Behera'}
                  </span>
                </h1>
                <p className="text-[11px] xs:text-[11.5px] sm:text-[11.5px] font-semibold text-slate-500 leading-none mt-0.5 truncate">
                  {profile?.role || profile?.headline || 'Python Full-Stack Developer'}
                </p>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) - Centered in middle matching Image 3 with rounded pill buttons */}
          <nav className="hidden xl:flex items-center justify-center gap-1.5 2xl:gap-2 text-[13px] 2xl:text-[13.5px] xl:mx-auto">
            {navLinks.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`transition-all py-1.5 px-3.5 rounded-full cursor-pointer whitespace-nowrap ${currentActive === tab.id
                  ? 'bg-blue-50 text-[#1E6BFF] font-black border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:text-[#1E6BFF] hover:bg-slate-50 font-bold'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Side: Desktop View Resume Button + Mobile Hamburger Menu Toggle (Matching 2nd Image) */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 xl:flex-none xl:w-auto">
            {/* View Resume Button (Desktop) */}
            <button
              onClick={() => setResumeModalOpen(true)}
              className="hidden xl:inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-[12.5px] font-extrabold text-white bg-gradient-to-r from-[#2563eb] to-[#8b5cf6] hover:from-[#1d4ed8] hover:to-[#7c3aed] shadow-xs hover:shadow-sm transition-all cursor-pointer whitespace-nowrap select-none"
              title="View Official Resume"
            >
              <i className="fa-regular fa-file-lines text-xs"></i>
              <span>View Resume</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button (Right Side, Matching 2nd Image) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200/90 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-[#0062FF] cursor-pointer transition-colors flex items-center justify-center flex-shrink-0 min-w-[38px] min-h-[38px]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Full-Screen Drawer Menu (Mounted directly outside <header> so backdrop-filter does NOT trap fixed position) */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[100] bg-white flex flex-col justify-between p-5 sm:p-6 animate-fade-in overflow-y-auto w-full h-[100dvh]">
          {/* Top Bar inside Drawer: Brand Identity + Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none"
              onClick={() => handleNavClick('home')}
            >
              <img
                src={assetUrl('tb-logo.png')}
                alt="TB"
                className="h-7 w-auto object-contain block"
              />
              <div className="h-6 w-[1.5px] bg-slate-200"></div>
              <div className="flex flex-col justify-center">
                <h2 className="font-black text-[15.5px] leading-tight text-slate-900">
                  {(profile?.first_name && profile.first_name !== 'Your') ? profile.first_name : 'Tripurosundaro'}{' '}
                  <span className="text-[#0062FF]">
                    {(profile?.last_name && profile.last_name !== 'Name') ? profile.last_name : 'Behera'}
                  </span>
                </h2>
                <p className="text-[11.5px] font-semibold text-slate-500 leading-none mt-0.5">
                  {profile?.role || profile?.headline || 'Python Full-Stack Developer'}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-rose-500 cursor-pointer transition-colors"
              aria-label="Close Navigation Menu"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Middle Section: Vertical Navigation Links List */}
          <div className="py-4 space-y-1.5 flex-1 overflow-y-auto">
            {navLinks.map((tab) => {
              const isActive = currentActive === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                    isActive
                      ? 'bg-[#eef5ff] text-[#0062FF] font-black shadow-2xs'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-5 text-center text-base flex-shrink-0 ${isActive ? 'text-[#0062FF]' : 'text-slate-600'}`}>
                    <i className={tab.icon}></i>
                  </span>
                  <span className="tracking-tight">{tab.label}</span>
                </button>
              );
            })}

            {/* Subtle Horizontal Divider */}
            <div className="border-b border-slate-100 my-3"></div>

            {/* View Resume Button (Gradient matching 2nd Image) */}
            <button
              onClick={() => {
                setResumeModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#2563eb] to-[#8b5cf6] shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer select-none min-h-[48px]"
              title="View Official Resume"
            >
              <i className="fa-regular fa-file-lines text-base"></i>
              <span>View Resume</span>
              <span className="sr-only">View Official Resume</span>
            </button>
          </div>

          {/* Bottom Decorative Wave (Matching 2nd Image) */}
          <div className="relative h-20 w-full pointer-events-none opacity-40 overflow-hidden mt-auto flex-shrink-0">
            <svg viewBox="0 0 400 120" className="w-full h-full object-cover" preserveAspectRatio="none" fill="none">
              <path d="M0,80 C150,140 250,20 400,80 L400,120 L0,120 Z" fill="#93c5fd" opacity="0.35" />
              <path d="M0,100 C180,60 280,120 400,90 L400,120 L0,120 Z" fill="#60a5fa" opacity="0.45" />
            </svg>
          </div>
        </div>
      )}
      {/* Spacer to preserve natural layout flow height for fixed navbar */}
      <div className="h-16 sm:h-[70px] w-full flex-shrink-0" aria-hidden="true" />

      {/* ─── Official Interactive Resume Viewer Modal (Mounted to Document Body) ─── */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        profile={profile}
      />
    </>
  );
}