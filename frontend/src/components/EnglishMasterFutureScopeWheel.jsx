import React, { useState, useEffect, useRef } from 'react';
import { EnglishMasterConcentricDiagram } from './EnglishMasterRoadmapOutcome';

/**
 * EnglishMasterFutureScopeWheel
 * 
 * Clean presentation of Future Scope & Architecture Roadmap:
 * - Fluid entrance animation on initial refresh and when scrolled into view:
 *    • Left side cards slowly glide in from the LEFT with staggered timing
 *    • Right side cards slowly glide in from the RIGHT with staggered timing
 * - Stable, fully readable text content once cards reach position
 * - Toggleable between Future Scope and Architecture Roadmap
 */

// ─── 8 FUTURE SCOPE TABS (IMAGE 2 REPLICA) ───
const SCOPE_READ_ORDER = [
  'ai-learning',
  'speech-recognition',
  'advanced-content',
  'gamification',
  'progress-analytics',
  'offline-learning',
  'live-practice',
  'multilingual-support',
];

const LEFT_SCOPE_TABS = [
  {
    id: 'ai-learning',
    title: 'AI-Powered Learning',
    desc: 'Provide personalized English learning recommendations.',
    bgGradient: 'from-[#84CC16] to-[#65A30D]',
    shadowColor: 'shadow-lime-900/25',
  },
  {
    id: 'advanced-content',
    title: 'Advanced Learning Content',
    desc: 'Add more grammar lessons, vocabulary, and speaking exercises.',
    bgGradient: 'from-[#0EA5E9] to-[#0284C7]',
    shadowColor: 'shadow-sky-900/25',
  },
  {
    id: 'progress-analytics',
    title: 'Progress Analytics',
    desc: 'Track learning progress, strengths, and areas for improvement.',
    bgGradient: 'from-[#F59E0B] to-[#D97706]',
    shadowColor: 'shadow-amber-900/25',
  },
  {
    id: 'live-practice',
    title: 'Live Practice',
    desc: 'Enable real-time conversations and interactive speaking sessions.',
    bgGradient: 'from-[#059669] to-[#047857]',
    shadowColor: 'shadow-emerald-900/25',
    hasTail: true,
    tailColor: '#047857',
  },
];

const RIGHT_SCOPE_TABS = [
  {
    id: 'speech-recognition',
    title: 'Speech Recognition',
    desc: 'Improve pronunciation through voice analysis and feedback.',
    bgGradient: 'from-[#EF4444] to-[#DC2626]',
    shadowColor: 'shadow-rose-900/25',
  },
  {
    id: 'gamification',
    title: 'Gamification',
    desc: 'Introduce daily challenges, rewards, badges, and learning streaks.',
    bgGradient: 'from-[#0F766E] to-[#115E59]',
    shadowColor: 'shadow-teal-900/25',
  },
  {
    id: 'offline-learning',
    title: 'Offline Learning',
    desc: 'Expand downloadable lessons for learning without internet access.',
    bgGradient: 'from-[#65A30D] to-[#4D7C0F]',
    shadowColor: 'shadow-lime-900/25',
  },
  {
    id: 'multilingual-support',
    title: 'Multilingual Support',
    desc: 'Add regional languages to help beginners understand English easily.',
    bgGradient: 'from-[#3B82F6] to-[#1D4ED8]',
    shadowColor: 'shadow-blue-900/25',
  },
];

export default function EnglishMasterFutureScopeWheel() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Navigation: 'scope' (Page 1) <-> 'roadmap' (Page 2)
  const [activeCategory, setActiveCategory] = useState('scope');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [isAutoTour, setIsAutoTour] = useState(true); // Auto Tour active by default

  // Page 1 Scope cards read cycle (slowly one by one read)
  const [scopeIndex, setScopeIndex] = useState(0);
  const [hoveredScopeId, setHoveredScopeId] = useState(null);
  const [selectedScopeId, setSelectedScopeId] = useState(null);

  const currentActiveScopeId =
    selectedScopeId !== null
      ? selectedScopeId
      : hoveredScopeId !== null
      ? hoveredScopeId
      : SCOPE_READ_ORDER[scopeIndex];

  // Auto-tour: steps through the 8 scope cards slowly one by one so user can read each,
  // then gives the next page (Architecture Roadmap), runs its concentric phases slowly one by one,
  // then cycles back.
  useEffect(() => {
    if (!isAutoTour || !hasAnimated || isHovered || selectedScopeId !== null || selectedPhaseId !== null) return;

    if (activeCategory === 'scope') {
      // Step through each of the 8 cards slowly one by one (2.4s each to read comfortably)
      const stepDuration = 2400;

      const timer = setTimeout(() => {
        setScopeIndex((prev) => {
          if (prev < SCOPE_READ_ORDER.length - 1) {
            return prev + 1;
          } else {
            // All 8 cards have been read one by one!
            // After that, next page is given (Architecture Roadmap)
            setIsPageTransitioning(true);
            setTimeout(() => {
              setActiveCategory('roadmap');
              setScopeIndex(0);
              setIsPageTransitioning(false);
            }, 260);
            return 0;
          }
        });
      }, stepDuration);

      return () => clearTimeout(timer);
    } else {
      // Page 2: Architecture Roadmap (4 concentric phases: 4 x 2.4s = 9.6s)
      const roadmapDuration = 9600;

      const timer = setTimeout(() => {
        setIsPageTransitioning(true);
        setSelectedPhaseId(null);
        setTimeout(() => {
          setActiveCategory('scope');
          setScopeIndex(0);
          setIsPageTransitioning(false);
        }, 260);
      }, roadmapDuration);

      return () => clearTimeout(timer);
    }
  }, [isAutoTour, hasAnimated, isHovered, selectedScopeId, selectedPhaseId, activeCategory, scopeIndex]);

  // Scroll and Refresh entrance animation trigger
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when top of section is within 90% of screen height
      if (rect.top <= windowHeight * 0.90 && rect.bottom >= 0) {
        setHasAnimated(true);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const timer1 = setTimeout(checkVisibility, 60);
    const timer2 = setTimeout(checkVisibility, 250);

    // 2. IntersectionObserver for modern view detection
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasAnimated(true);
              if (observer && node) observer.unobserve(node);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );
      observer.observe(node);
    }

    // 3. Scroll event listener on window & nearest scrollable ancestor (modal container)
    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (observer && node) observer.disconnect();
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  // Architecture phase select handler
  const handlePhaseSelect = (id) => {
    if (id === null || selectedPhaseId === id) {
      setSelectedPhaseId(null);
    } else {
      setSelectedPhaseId(id);
    }
  };

  // Future scope card click to lock / toggle select handler
  const handleToggleScopeSelect = (id) => {
    if (selectedScopeId === id) {
      setSelectedScopeId(null);
    } else {
      setSelectedScopeId(id);
    }
  };

  // Switch to specific page
  const handleSwitchPage = (targetCategory) => {
    if (activeCategory === targetCategory) return;
    setIsPageTransitioning(true);
    setSelectedPhaseId(null);
    setSelectedScopeId(null);
    setTimeout(() => {
      setActiveCategory(targetCategory);
      setIsPageTransitioning(false);
    }, 240);
  };

  // Toggle page (Next / Prev)
  const handleToggleCategory = () => {
    handleSwitchPage(activeCategory === 'scope' ? 'roadmap' : 'scope');
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredScopeId(null);
      }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => {
          setIsHovered(false);
          setHoveredScopeId(null);
        }, 2000);
      }}
      className="w-full relative overflow-x-clip rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#e8f4f8]/50 via-white to-[#f0f9fb]/40 border border-sky-100/90 p-2.5 xs:p-3.5 sm:p-7 md:p-8 lg:p-9 shadow-xs transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* ─── ANIMATION KEYFRAMES ─── */}
      <style>{`
        @keyframes treeShimmer {
          0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          40%, 60% { opacity: 0.35; }
          100% { transform: translateX(250%) skewX(-20deg); opacity: 0; }
        }
        @keyframes gentleFloatTree {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .anim-tree-shimmer {
          animation: treeShimmer 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .anim-tree-float {
          animation: gentleFloatTree 6s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* ─── TOP SECTION HEADER ─── */}
      <div className="relative z-10 mb-5 pb-3 border-b border-sky-100/90 flex items-center justify-between">
        <h4
          onClick={handleToggleCategory}
          className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight cursor-pointer select-none hover:text-blue-600 transition-colors"
          title="Click to toggle between Future Scope and Architecture Roadmap"
        >
          {activeCategory === 'scope' ? 'Future Scope' : 'Architecture Roadmap'}
        </h4>
      </div>

      {/* ─── PAGE CONTENT CONTAINER WITH SMOOTH SLIDE/FADE TRANSITION ─── */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isPageTransitioning
            ? 'opacity-0 scale-[0.985] blur-[1px]'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {/* ─── CATEGORY 1: FUTURE SCOPE (PAGE 1) - 8-TAB STAGGERED SPEECH-BUBBLE RIBBON TREE ─── */}
        {activeCategory === 'scope' && (
          <div className="w-full overflow-x-clip">
            <div className="relative max-w-[960px] mx-auto py-2 sm:py-3 anim-tree-float">
              {/* Central Spine Shadow Line (Image 2 Replica) */}
              <div className="block absolute top-3 sm:top-6 bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[1.5px] md:w-[2px] bg-slate-300/40 pointer-events-none z-0" />

              <div className="grid grid-cols-2 gap-y-0 relative z-10">
                
                {/* ─── LEFT COLUMN: 4 TABS (ROUNDED-L, TOUCHING CENTERLINE) ─── */}
                <div className="flex flex-col space-y-2 xs:space-y-2.5 sm:space-y-4 md:space-y-5">
                  {LEFT_SCOPE_TABS.map((tab, idx) => {
                    const isActive = currentActiveScopeId === tab.id;
                    return (
                      <div
                        key={tab.id}
                        className="relative group will-change-transform"
                        style={{
                          opacity: hasAnimated ? 1 : 0,
                          transform: hasAnimated ? 'translateX(0)' : 'translateX(-85px)',
                          filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
                          transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${idx * 140}ms`,
                        }}
                      >
                        <div
                          className={`relative overflow-hidden text-white h-[54px] xs:h-[58px] sm:h-auto py-1.5 px-2 xs:py-2 xs:px-3 sm:py-4 sm:px-6 md:py-4 md:px-7 rounded-l-full sm:rounded-l-3xl rounded-r-none bg-gradient-to-r ${tab.bgGradient} shadow-md transition-all duration-500 cursor-pointer flex flex-col justify-center ${
                            isActive
                              ? 'scale-[1.02] sm:scale-[1.035] sm:-translate-x-1 origin-right ring-2 sm:ring-[2.5px] ring-white shadow-xl brightness-110 z-30'
                              : 'scale-100 translate-x-0 opacity-95 shadow-md brightness-100 hover:scale-[1.015] hover:brightness-105 z-10'
                          } ${tab.shadowColor}`}
                          onMouseEnter={() => setHoveredScopeId(tab.id)}
                          onMouseLeave={() => setHoveredScopeId(null)}
                          onClick={() => handleToggleScopeSelect(tab.id)}
                        >
                          {/* Shimmer Light Reflection Sweep */}
                          <div
                            className={`absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none anim-tree-shimmer ${
                              isActive ? 'opacity-100' : 'opacity-40'
                            }`}
                            style={{ animationDelay: `${idx * 1.4}s` }}
                          />

                          <div className="relative z-10 text-left">
                            <h4 className="font-extrabold text-[9.5px] xs:text-[10.5px] sm:text-base text-white tracking-tight drop-shadow-xs mb-0.5 sm:mb-1 leading-tight truncate sm:whitespace-normal">
                              {tab.title}
                            </h4>
                            <p className="text-[7.5px] xs:text-[8.5px] sm:text-[12.5px] text-white/95 leading-tight sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                              {tab.desc}
                            </p>
                          </div>
                        </div>

                        {/* Speech Bubble Tail on the 4th Left Tab (Image 2 Replica) */}
                        {tab.hasTail && (
                          <div className="block absolute -bottom-2 sm:-bottom-5 right-0 w-3 h-3 sm:w-7 sm:h-7 pointer-events-none z-20">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
                              <path
                                d="M32 0 C24 8 16 18 8 28 C12 16 20 6 32 0 Z"
                                fill={tab.tailColor || '#047857'}
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ─── RIGHT COLUMN: 4 TABS (ROUNDED-R, STAGGERED WITH VERTICAL OFFSET) ─── */}
                <div className="flex flex-col space-y-2 xs:space-y-2.5 sm:space-y-4 md:space-y-5 mt-[31px] xs:mt-[34px] sm:mt-6 md:mt-8">
                  {RIGHT_SCOPE_TABS.map((tab, idx) => {
                    const isActive = currentActiveScopeId === tab.id;
                    return (
                      <div
                        key={tab.id}
                        className="relative group will-change-transform"
                        style={{
                          opacity: hasAnimated ? 1 : 0,
                          transform: hasAnimated ? 'translateX(0)' : 'translateX(85px)',
                          filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
                          transition: 'opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1), transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${idx * 140 + 70}ms`,
                        }}
                      >
                        <div
                          className={`relative overflow-hidden text-white h-[54px] xs:h-[58px] sm:h-auto py-1.5 px-2 xs:py-2 xs:px-3 sm:py-4 sm:px-6 md:py-4 md:px-7 rounded-r-full sm:rounded-r-3xl rounded-l-none bg-gradient-to-r ${tab.bgGradient} shadow-md transition-all duration-500 cursor-pointer flex flex-col justify-center ${
                            isActive
                              ? 'scale-[1.02] sm:scale-[1.035] sm:translate-x-1 origin-left ring-2 sm:ring-[2.5px] ring-white shadow-xl brightness-110 z-30'
                              : 'scale-100 translate-x-0 opacity-95 shadow-md brightness-100 hover:scale-[1.015] hover:brightness-105 z-10'
                          } ${tab.shadowColor}`}
                          onMouseEnter={() => setHoveredScopeId(tab.id)}
                          onMouseLeave={() => setHoveredScopeId(null)}
                          onClick={() => handleToggleScopeSelect(tab.id)}
                        >
                          {/* Shimmer Light Reflection Sweep */}
                          <div
                            className={`absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none anim-tree-shimmer ${
                              isActive ? 'opacity-100' : 'opacity-40'
                            }`}
                            style={{ animationDelay: `${(idx + 0.5) * 1.4}s` }}
                          />

                          <div className="relative z-10 text-left">
                            <h4 className="font-extrabold text-[9.5px] xs:text-[10.5px] sm:text-base text-white tracking-tight drop-shadow-xs mb-0.5 sm:mb-1 leading-tight truncate sm:whitespace-normal">
                              {tab.title}
                            </h4>
                            <p className="text-[7.5px] xs:text-[8.5px] sm:text-[12.5px] text-white/95 leading-tight sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                              {tab.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ─── CATEGORY 2: ARCHITECTURE ROADMAP (PAGE 2) - CONCENTRIC CIRCLES ─── */}
        {activeCategory === 'roadmap' && (
          <div className="w-full">
            <div className="py-1">
              <EnglishMasterConcentricDiagram
                hideHeader={true}
                controlledActiveId={selectedPhaseId}
                isPausedProp={false}
                onSelectPhase={handlePhaseSelect}
                onHoverChange={(hovered) => setIsHovered(hovered)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
