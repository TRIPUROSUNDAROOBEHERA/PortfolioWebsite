import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterInteractiveModules
 * 
 * Interactive Application Modules Component for English Master Pro:
 * - 3 Portals: [Home Portal (5)] vs [Learner Portal (8)] vs [Admin Dashboard (5)]
 * - Home Portal linked to the 5 actual app screenshots from C:\Users\style\Music\ram4
 * - Left: High-Clarity Smartphone Mockup Frame with dynamic image transition & matching indicator dots
 * - Right: Clean, Simple, Uniform Module Cards (consistent clean styling, no multi-color bars)
 * - Behavior: Clicking or hovering any card updates the mobile screen!
 */

export const MODULE_PORTALS = {
  home: {
    key: 'home',
    portalName: 'Home Portal',
    portalBadge: 'Main Mobile Application Hub',
    icon: 'fa-house',
    accentColor: 'sky',
    themeClasses: {
      activeTab: 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/25 scale-[1.02]',
      activeCard: 'border-2 border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/40 shadow-md',
      activeTitle: 'text-sky-600 font-extrabold',
      dotColor: 'bg-sky-600',
    },
    modules: [
      {
        id: 1,
        serial: '01',
        title: 'Home Hub & AI Learning Center',
        image: '/english-master-gallery/home_portal/Screenshot_20261023-135238.png',
        summary: 'Central mobile homepage with AI learning banner, quick category hubs for Core Learning, Reading, Speaking, and Exam Prep.',
      },
      {
        id: 2,
        serial: '02',
        title: 'Global Navigation & Platform Drawer',
        image: '/english-master-gallery/home_portal/Screenshot_20261023-135300.png',
        summary: 'Comprehensive navigation drawer accessing Grammar, Vocabulary, Speaking, Listening, Writing, Communication, Quizzes, and Settings.',
      },
      {
        id: 3,
        serial: '03',
        title: 'Professional & Career English Hub',
        image: '/english-master-gallery/home_portal/Screenshot_20261023-135328.png',
        summary: 'Specialized corporate mastery tracks, AI tutor assistant, cognitive retention games, study planners, and interview preparation.',
      },
      {
        id: 4,
        serial: '04',
        title: 'Academic & Digital Skills Modules',
        image: '/english-master-gallery/home_portal/Screenshot_20261023-135449.png',
        summary: 'Multilingual translation, Kids English foundations, K-12 academic syllabus, tech literacies, and live group audio speaking rooms.',
      },
      {
        id: 5,
        serial: '05',
        title: 'Community, Social & Rewards Hub',
        image: '/english-master-gallery/home_portal/Screenshot_20261023-135516.png',
        summary: 'Pop culture entertainment lessons, competitive challenge leaderboards, peer social messaging feeds, and learner reward wallets.',
      },
    ]
  },
  learner: {
    key: 'learner',
    portalName: 'Learner Portal',
    portalBadge: 'Student Learning Environment',
    icon: 'fa-graduation-cap',
    accentColor: 'blue',
    themeClasses: {
      activeTab: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]',
      activeCard: 'border-2 border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/40 shadow-md',
      activeTitle: 'text-blue-600 font-extrabold',
      dotColor: 'bg-blue-600',
    },
    modules: [
      {
        id: 1,
        serial: '01',
        title: 'Grammar & Vocabulary',
        image: '/english-master-gallery/ram4/grammar_academy_screen.png',
        summary: 'Learn grammar rules, tenses, sentence structures, and new words with simple examples.',
      },
      {
        id: 2,
        serial: '02',
        title: 'AI-Powered Learning',
        image: '/english-master-gallery/ram4/ai_tutor_conversation_screen.png',
        summary: 'Get personalized learning guidance and support from AI, where available.',
      },
      {
        id: 3,
        serial: '03',
        title: 'Speaking & Pronunciation',
        image: '/english-master-gallery/ram4/speaking_lab_screen.png',
        summary: 'Practice speaking, improve pronunciation, and build confidence in English communication.',
      },
      {
        id: 4,
        serial: '04',
        title: 'Writing Skills',
        image: '/english-master-gallery/ram4/writing_center_screen.png',
        summary: 'Improve sentence formation, grammar, and written communication through practice.',
      },
      {
        id: 5,
        serial: '05',
        title: 'Quizzes & Assessments',
        image: '/english-master-gallery/ram4/quiz_board_screen.png',
        summary: 'Test your knowledge with interactive quizzes and evaluate your understanding.',
      },
      {
        id: 6,
        serial: '06',
        title: 'Progress Analytics',
        image: '/english-master-gallery/ram4/progress_analytics_screen.png',
        summary: 'Track learning progress, quiz scores, and skill improvement over time.',
      },
      {
        id: 7,
        serial: '07',
        title: 'Learning Achievements',
        image: '/english-master-gallery/ram4/learning_achievements_analytics_screen.png',
        summary: 'Earn badges and recognize milestones as you complete learning activities.',
      },
      {
        id: 8,
        serial: '08',
        title: 'Certificates',
        image: '/english-master-gallery/ram4/certificate_credential_screen.png',
        summary: 'Receive certificates upon successful completion of eligible courses, where supported.',
      },
    ]
  },
  admin: {
    key: 'admin',
    portalName: 'Admin Dashboard',
    portalBadge: 'Instructor & Administrator Console',
    icon: 'fa-shield-halved',
    accentColor: 'indigo',
    themeClasses: {
      activeTab: 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 scale-[1.02]',
      activeCard: 'border-2 border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/40 shadow-md',
      activeTitle: 'text-indigo-600 font-extrabold',
      dotColor: 'bg-indigo-600',
    },
    modules: [
      {
        id: 1,
        serial: '01',
        title: 'Admin Architecture & Operator Console',
        image: '/english-master-gallery/admin/admin_architecture_console.png',
        summary: 'Centralized administrator console monitoring active operator sessions, total users, premium records, and multi-tier learning content modules.',
      },
      {
        id: 2,
        serial: '02',
        title: 'User Directory Portfolios & Access Management',
        image: '/english-master-gallery/admin/user_directory_portfolios.png',
        summary: 'Granular learner records archive tracking active, blocked, free-tier, and Premium Plus subscription profiles with live mapping controls.',
      },
      {
        id: 3,
        serial: '03',
        title: 'Curriculum & Content Management',
        image: '/english-master-gallery/admin/content_management_lessons.png',
        summary: 'Comprehensive curriculum administration configuring active modules for grammar, vocabulary, speaking, listening, writing, and communication courses.',
      },
      {
        id: 4,
        serial: '04',
        title: 'Quiz Parameter Control & Assessment Engine',
        image: '/english-master-gallery/admin/quiz_parameter_control.png',
        summary: 'Rule-based evaluation management engine to organize diagnostic question banks, time constraints, active test takers, and automated quiz creation.',
      },
      {
        id: 5,
        serial: '05',
        title: 'Certificate Audit & Credential Authority',
        image: '/english-master-gallery/admin/certificate_audit_control.png',
        summary: 'Institutional credential authority issuing, auditing, and verifying digital course completion certificates with unique student verification IDs.',
      }
    ]
  }
};

export default function EnglishMasterInteractiveModules() {
  // Portal selected by user: null by default so NO button is pre-colored on initial load/scroll!
  const [selectedPortalKey, setSelectedPortalKey] = useState(null); // null | 'home' | 'learner' | 'admin'
  const [activeModuleIndex, setActiveModuleIndex] = useState(null); // null by default: no card is colored until mouse touch!
  const [isInView, setIsInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const containerRef = useRef(null);
  const touchStartXRef = useRef(0);

  // Active portal data: defaults to 'home' content if no portal button is clicked yet
  const effectivePortalKey = selectedPortalKey || 'home';
  const currentPortal = MODULE_PORTALS[effectivePortalKey];
  
  // Default phone screen: switches dynamically depending on whether Home Portal, Learner Portal or Admin Dashboard is active!
  const defaultOverviewScreen = effectivePortalKey === 'home'
    ? {
        id: 'home_overview',
        title: 'Home Hub & AI Learning Center',
        image: '/english-master-gallery/home_portal/Screenshot_20261023-135238.png',
      }
    : effectivePortalKey === 'admin'
    ? {
        id: 'admin_overview',
        title: 'Admin Architecture & Operator Console',
        image: '/english-master-gallery/admin/admin_architecture_console.png',
      }
    : {
        id: 'learner_overview',
        title: 'English Master Pro AI Home Hub',
        image: '/english-master-gallery/home_hub_screen_hd.png',
      };

  // Display active module screen if hovered/touched, or default to appropriate overview screen
  const activeModule = (activeModuleIndex !== null && currentPortal.modules[activeModuleIndex])
    ? currentPortal.modules[activeModuleIndex]
    : defaultOverviewScreen;

  // Whenever a portal button is clicked, switch portal cleanly
  const handleSwitchPortal = (key) => {
    setSelectedPortalKey(prev => prev === key ? null : key);
    setActiveModuleIndex(null);
    setAnimKey(prev => prev + 1);
  };

  // ─── SCROLL & REFRESH ENTRANCE DETECTION ───
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkVisibility = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // Section entered viewport (top is within 92% of viewport height and bottom is above 40px)
      if (rect.top < windowHeight * 0.92 && rect.bottom > 40) {
        setIsInView(true);
      } else if (rect.top > windowHeight * 1.35 || rect.bottom < -120) {
        // Reset when scrolled completely out of view so re-scrolling down triggers animation again
        setIsInView(false);
      }
    };

    // Immediate check on mount (e.g. for page refresh while already at this position)
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 60);
    const t2 = setTimeout(checkVisibility, 250);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
            }
          });
        },
        { threshold: 0.08 }
      );
      observer.observe(el);
    }

    // Scroll listeners: capture mode captures scroll events inside modal containers as well as window
    document.addEventListener('scroll', checkVisibility, { capture: true, passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer && el) observer.disconnect();
      document.removeEventListener('scroll', checkVisibility, { capture: true });
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="space-y-6 pt-2 pb-4 font-['Plus_Jakarta_Sans',sans-serif] overflow-visible"
    >

      {/* ─── 1. SECTION HEADER WITH PORTAL SWITCHER (SLOWLY COMING UP FROM DOWN INTO VERTICAL POSITION) ─── */}
      <div 
        key={`header-${animKey}`}
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-6 md:gap-12 lg:gap-20 min-h-[52px] sm:min-h-[58px] pb-3.5 sm:pb-4 border-b border-slate-200 ${
          isInView ? 'em-scroll-header-entrance' : 'opacity-0 translate-y-7'
        }`}
      >
        <div className="shrink-0 w-full sm:w-auto">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight text-left">
            Application Modules
          </h3>
        </div>

        {/* ─── INDIVIDUAL PORTAL SWITCHER BUTTONS: HOME PORTAL | LEARNER PORTAL | ADMIN DASHBOARD ─── */}
        <div className="flex flex-nowrap items-center justify-center sm:justify-start gap-1.5 xs:gap-2 sm:gap-3.5 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
          
          {/* 1. Home Portal Button */}
          <button
            type="button"
            onClick={() => handleSwitchPortal('home')}
            className={`px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10.5px] xs:text-[11.5px] sm:text-sm font-extrabold flex items-center gap-1 sm:gap-2 cursor-pointer border shrink-0 whitespace-nowrap transition-all duration-200 ${
              selectedPortalKey === 'home'
                ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/25'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-sky-300 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <i className={`fa-solid fa-house text-xs sm:text-sm ${
              selectedPortalKey === 'home' ? 'text-white' : 'text-sky-600'
            }`}></i>
            <span>Home Portal</span>
          </button>

          {/* 2. Learner Portal Button */}
          <button
            type="button"
            onClick={() => handleSwitchPortal('learner')}
            className={`px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10.5px] xs:text-[11.5px] sm:text-sm font-extrabold flex items-center gap-1 sm:gap-2 cursor-pointer border shrink-0 whitespace-nowrap transition-all duration-200 ${
              selectedPortalKey === 'learner'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <i className={`fa-solid fa-graduation-cap text-xs sm:text-sm ${
              selectedPortalKey === 'learner' ? 'text-white' : 'text-blue-600'
            }`}></i>
            <span>Learner Portal</span>
          </button>

          {/* 3. Admin Dashboard Button */}
          <button
            type="button"
            onClick={() => handleSwitchPortal('admin')}
            className={`px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10.5px] xs:text-[11.5px] sm:text-sm font-extrabold flex items-center gap-1 sm:gap-2 cursor-pointer border shrink-0 whitespace-nowrap transition-all duration-200 ${
              selectedPortalKey === 'admin'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <i className={`fa-solid fa-shield-halved text-xs sm:text-sm ${
              selectedPortalKey === 'admin' ? 'text-white' : 'text-indigo-600'
            }`}></i>
            <span>Admin Dashboard</span>
          </button>

        </div>
      </div>

      {/* ─── 2. MAIN WORKSPACE: SIDE-BY-SIDE (PHONE LEFT | CARDS RIGHT - MATCHES IMAGE 2 TYPE ON ALL SCREENS) ─── */}
      <div className="flex flex-row items-start justify-center gap-2 xs:gap-3 sm:gap-4 lg:gap-5 xl:gap-6 pt-2 sm:pt-5 px-0.5 sm:px-3">

        {/* ─── LEFT OFFSET SPACER (DESKTOP ONLY) ─── */}
        <div className="hidden xl:block xl:w-6 shrink-0"></div>

        {/* ─── LEFT: SMARTPHONE MOCKUP FRAME & INDICATOR DOTS ─── */}
        <div 
          className={`shrink-0 flex flex-col items-center justify-start relative select-none ${
            isInView ? 'em-scroll-mobile-entrance' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Smartphone Frame Mockup */}
          <div 
            onTouchStart={(e) => {
              if (e.touches && e.touches[0]) {
                touchStartXRef.current = e.touches[0].clientX;
              }
            }}
            onTouchEnd={(e) => {
              if (e.changedTouches && e.changedTouches[0]) {
                const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
                if (Math.abs(deltaX) > 30) {
                  if (deltaX < 0) {
                    // Swipe left -> next
                    setActiveModuleIndex(prev => {
                      const curr = prev === null ? 0 : prev;
                      return (curr + 1) % currentPortal.modules.length;
                    });
                  } else {
                    // Swipe right -> prev
                    setActiveModuleIndex(prev => {
                      const curr = prev === null ? 0 : prev;
                      return (curr - 1 + currentPortal.modules.length) % currentPortal.modules.length;
                    });
                  }
                }
              }
            }}
            className="relative w-[115px] xs:w-[130px] sm:w-[185px] md:w-[215px] lg:w-[250px] aspect-[9/19.5] rounded-[18px] xs:rounded-[22px] sm:rounded-[34px] p-[3px] xs:p-[4px] sm:p-[6px] bg-slate-900 border-[1.5px] xs:border-[2px] sm:border-[2.5px] border-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.3)] sm:shadow-[0_16px_36px_rgba(15,23,42,0.38)] ring-1 ring-slate-800"
          >
            
            {/* Physical Hardware Buttons on Left Side (Volume Rockers) */}
            <div className="absolute -left-[2px] sm:-left-[3px] top-[38px] sm:top-[65px] w-[2px] sm:w-[3px] h-3.5 sm:h-5.5 rounded-l-xs bg-slate-800"></div>
            <div className="absolute -left-[2px] sm:-left-[3px] top-[56px] sm:top-[96px] w-[2px] sm:w-[3px] h-3.5 sm:h-5.5 rounded-l-xs bg-slate-800"></div>

            {/* Physical Hardware Button on Right Side (Power Button) */}
            <div className="absolute -right-[2px] sm:-right-[3px] top-[46px] sm:top-[80px] w-[2px] sm:w-[3px] h-5 sm:h-8 rounded-r-xs bg-slate-800"></div>

            {/* Inner Screen Display Surface - High-Clarity Visualization */}
            <div className="relative w-full h-full rounded-[15px] xs:rounded-[18px] sm:rounded-[28px] overflow-hidden bg-black flex items-start justify-center">
              <img
                key={`${effectivePortalKey}-${activeModule.id}`}
                src={activeModule.image}
                alt={activeModule.title}
                className="w-full h-[105.5%] object-cover object-top select-none"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
              />

              {/* Subtle Glass Glare Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.09] pointer-events-none rounded-[15px] xs:rounded-[18px] sm:rounded-[28px]"></div>
            </div>

          </div>

          {/* Interactive Screen Indicator Dots */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 pt-2 sm:pt-3.5 w-full max-w-[130px] sm:max-w-[250px]">
            {currentPortal.modules.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onMouseEnter={() => setActiveModuleIndex(i)}
                onMouseLeave={() => setActiveModuleIndex(null)}
                onClick={() => setActiveModuleIndex(i)}
                className={`h-1 xs:h-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                  activeModuleIndex === i
                    ? `w-4 xs:w-6 shadow-xs ${currentPortal.themeClasses.dotColor}`
                    : 'w-1 xs:w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`View ${m.title}`}
                aria-label={`View ${m.title}`}
              />
            ))}
          </div>
        </div>

        {/* ─── RIGHT: CONTENT CARDS (MATCHES IMAGE 2 TYPE: CLEAN UNIFORM CARDS) ─── */}
        <div 
          key={`cards-container-${effectivePortalKey}-${animKey}`}
          className="flex-1 w-full min-w-0 flex flex-col justify-start gap-1 xs:gap-1.5 sm:gap-2 max-h-[300px] xs:max-h-[330px] sm:max-h-none overflow-y-auto sm:overflow-visible custom-slim-scrollbar pr-0.5"
          onMouseLeave={() => setActiveModuleIndex(null)}
        >

          {currentPortal.modules.map((mod, idx) => {
            const isActive = activeModuleIndex === idx;
            const delay = `${0.12 + idx * 0.08}s`;

            return (
              <div
                key={`${effectivePortalKey}-${mod.id}`}
                onMouseEnter={() => setActiveModuleIndex(idx)}
                onMouseLeave={() => setActiveModuleIndex(null)}
                onClick={() => setActiveModuleIndex(idx)}
                style={isInView ? { animationDelay: delay } : undefined}
                className={`group relative overflow-hidden w-full text-left py-1 px-1.5 xs:py-1.5 xs:px-2 sm:py-2.5 sm:px-4 rounded-lg sm:rounded-2xl cursor-pointer border transition-all duration-200 ${
                  isInView ? 'em-scroll-card-entrance' : 'opacity-0 translate-y-9'
                } ${
                  isActive
                    ? `${currentPortal.themeClasses.activeCard} shadow-sm`
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                }`}
              >
                <h4 className={`text-[10px] xs:text-[11.5px] sm:text-[15px] font-extrabold leading-snug mb-0.5 ${
                  isActive ? currentPortal.themeClasses.activeTitle : 'text-slate-800 group-hover:text-slate-900'
                }`}>
                  {mod.title}
                </h4>

                <p className={`text-[8.5px] xs:text-[9.5px] sm:text-[12.5px] font-normal leading-tight sm:leading-normal line-clamp-2 ${
                  isActive ? 'text-slate-700' : 'text-slate-600'
                }`}>
                  {mod.summary}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
