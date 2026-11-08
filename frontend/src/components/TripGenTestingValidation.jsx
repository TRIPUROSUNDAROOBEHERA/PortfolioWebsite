import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 7 TESTING DOMAINS DATA
 */
export const TRIPGEN_TESTING_DOMAINS = [
  {
    num: 1,
    id: 'functional',
    title: 'Functional Testing',
    subtitle: 'Tested major features of the system.',
    color: '#0284C7',
    badgeBg: 'bg-blue-600',
    hoverBorder: 'hover:border-blue-300',
    hoverShadow: 'hover:shadow-blue-500/15',
    cardBorder: 'border-blue-200/90',
    cardBg: 'bg-gradient-to-br from-white via-sky-50/20 to-blue-50/30',
    bulletCheck: 'text-blue-500',
    bullets: [
      'Login and registration',
      'Itinerary creation',
      'Transport and hotel management',
      'Booking and cancellation',
      'Feedback and reviews'
    ],
    visualType: 'monitor'
  },
  {
    num: 2,
    id: 'form-validation',
    title: 'Form Validation Testing',
    subtitle: 'Verified input validation and error handling.',
    color: '#8B5CF6',
    badgeBg: 'bg-purple-600',
    hoverBorder: 'hover:border-purple-300',
    hoverShadow: 'hover:shadow-purple-500/15',
    cardBorder: 'border-purple-200/90',
    cardBg: 'bg-gradient-to-br from-white via-purple-50/20 to-violet-50/30',
    bulletCheck: 'text-purple-500',
    bullets: [
      'Required field validation',
      'Invalid input handling',
      'Proper error messages',
      'Form submission checks'
    ],
    visualType: 'document-alert'
  },
  {
    num: 3,
    id: 'authentication',
    title: 'Authentication Testing',
    subtitle: 'Tested multi-role login and access control.',
    color: '#10B981',
    badgeBg: 'bg-emerald-600',
    hoverBorder: 'hover:border-emerald-300',
    hoverShadow: 'hover:shadow-emerald-500/15',
    cardBorder: 'border-emerald-200/90',
    cardBg: 'bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30',
    bulletCheck: 'text-emerald-500',
    bullets: [
      'Admin login',
      'Employee login',
      'Traveler login',
      'Role-based access control'
    ],
    visualType: 'roles'
  },
  {
    num: 4,
    id: 'database',
    title: 'Database Testing',
    subtitle: 'Verified MySQL database operations.',
    color: '#F59E0B',
    badgeBg: 'bg-amber-500',
    hoverBorder: 'hover:border-amber-300',
    hoverShadow: 'hover:shadow-amber-500/15',
    cardBorder: 'border-amber-200/90',
    cardBg: 'bg-gradient-to-br from-white via-amber-50/20 to-orange-50/30',
    bulletCheck: 'text-amber-500',
    bullets: [
      'Create (Insert data)',
      'Read (Retrieve data)',
      'Update (Modify data)',
      'Delete (Remove data)',
      'Data storage and consistency'
    ],
    visualType: 'database'
  },
  {
    num: 5,
    id: 'integration',
    title: 'Integration Testing',
    subtitle: 'Checked communication between components.',
    color: '#EF4444',
    badgeBg: 'bg-rose-500',
    hoverBorder: 'hover:border-rose-300',
    hoverShadow: 'hover:shadow-rose-500/15',
    cardBorder: 'border-rose-200/90',
    cardBg: 'bg-gradient-to-br from-white via-rose-50/20 to-pink-50/30',
    bulletCheck: 'text-rose-500',
    bullets: [
      'Frontend templates & Django views',
      'Django views ⟺ MySQL database',
      'API and form data flow',
      'End-to-end feature integration'
    ],
    visualType: 'integration-flow'
  },
  {
    num: 6,
    id: 'debugging',
    title: 'Debugging',
    subtitle: 'Identified and fixed application errors.',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-600',
    hoverBorder: 'hover:border-cyan-300',
    hoverShadow: 'hover:shadow-cyan-500/15',
    cardBorder: 'border-cyan-200/90',
    cardBg: 'bg-gradient-to-br from-white via-cyan-50/20 to-sky-50/30',
    bulletCheck: 'text-cyan-500',
    bullets: [
      'URL routing issues',
      'Form submission errors',
      'Database operation errors',
      'Application workflow bugs',
      'Error log analysis and fixes'
    ],
    visualType: 'debugging'
  },
  {
    num: 7,
    id: 'workflow',
    title: 'Workflow Testing',
    subtitle: 'Verified complete user workflows.',
    color: '#6366F1',
    badgeBg: 'bg-indigo-600',
    hoverBorder: 'hover:border-indigo-300',
    hoverShadow: 'hover:shadow-indigo-500/15',
    cardBorder: 'border-indigo-200/90',
    cardBg: 'bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30',
    bulletCheck: 'text-indigo-500',
    bullets: [
      'User requests to response flow',
      'Module-wise end-to-end testing',
      'Data processing and validation',
      'Correct outputs and redirections'
    ],
    visualType: 'workflow'
  }
];

// SVG Connection Paths (Coordinates mapping 910 x 500 canvas to each card)
const PATH_1 = "M 381 76 C 330 76, 310 111, 293 111";
const PATH_2 = "M 529 76 C 580 76, 600 109, 617 109";
const PATH_3 = "M 351 150 C 315 150, 305 272, 293 272";
const PATH_4 = "M 559 150 C 595 150, 605 270, 617 270";
const PATH_5 = "M 381 224 C 335 224, 315 424, 293 424";
const PATH_6 = "M 455 254 L 455 342";
const PATH_7 = "M 529 224 C 575 224, 595 424, 617 424";

/**
 * TripGenTestingValidation
 * 
 * Choreographed Entrance & Visualization:
 * 1. Resilient Scroll & Page Refresh Detection:
 *    - IntersectionObserver on section container
 *    - Scroll listener on modal container and window
 *    - Initial calculation with timeouts for page refresh
 *    - 'Replay Animation' header pill button
 * 2. Central Round Color Hub ("round color down to up slowly coming the showing the visual"):
 *    - Rises smoothly from down to up (translateY(65px) -> 0, scale 0.88 -> 1) with 1.2s easing
 *    - Continuous floating, rotating orbit rings, and pulsating gradient color aura
 * 3. Left Side Cards 1, 3, 5 ("left side slowing coming the text cotent one by one showing -1,3,5"):
 *    - Card 1 (Functional Testing): slides in from left at 0.22s
 *    - Card 3 (Authentication Testing): slides in from left at 0.44s
 *    - Card 5 (Integration Testing): slides in from left at 0.66s
 *    - Cascading checkmarks and bullet points
 * 4. 6th Content Text ("6th content text slowly down to coming the postion showing the voisulazation"):
 *    - Card 6 (Debugging, center bottom): glides smoothly into place at 0.85s with checkmarks & visualization
 * 5. Right Side Cards 2, 4, 7 ("right side 2,4,7 slowly coming showig the content text one by one showing the visualzation"):
 *    - Card 2 (Form Validation Testing): slides in from right at 0.33s
 *    - Card 4 (Database Testing): slides in from right at 0.55s
 *    - Card 7 (Workflow Testing): slides in from right at 0.77s
 *    - Cascading checkmarks and bullet points
 * 6. Smooth Transitions & Hover Reactions ("to add the all animation in transation")
 */
export default function TripGenTestingValidation() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Robust Visibility detection for page refresh, window scroll, and modal container scroll
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Locate the scroll parent container (TripGen modal or window)
    const getScrollParent = () => {
      return (
        node.closest('.custom-slim-scrollbar') ||
        node.closest('.overflow-y-auto') ||
        node.closest('.overflow-auto') ||
        window
      );
    };

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      const scrollParent = getScrollParent();

      let inView = false;
      let outOfView = false;

      if (scrollParent && scrollParent !== window) {
        const pRect = scrollParent.getBoundingClientRect();
        // Element is currently visible inside the scrollable container
        inView = rect.top < pRect.bottom - 40 && rect.bottom > pRect.top + 40;
        // Element is scrolled substantially far away from view
        outOfView = rect.bottom < pRect.top - 140 || rect.top > pRect.bottom + 140;
      } else {
        inView = rect.top <= windowHeight * 0.92 && rect.bottom >= 40;
        outOfView = rect.bottom < -140 || rect.top > windowHeight + 140;
      }

      if (inView) {
        setIsVisible(true);
      } else if (outOfView) {
        // Reset when scrolled substantially away so re-scrolling back replays the animation cleanly
        setIsVisible(false);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 60);
    const t2 = setTimeout(checkVisibility, 200);

    // 2. Modern IntersectionObserver with bidirectional visibility tracking
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      const scrollParent = getScrollParent();
      const rootEl = scrollParent !== window ? scrollParent : null;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              const r = entry.boundingClientRect;
              const rRoot = entry.rootBounds;
              if (rRoot) {
                if (r.bottom < rRoot.top - 80 || r.top > rRoot.bottom + 80) {
                  setIsVisible(false);
                }
              } else {
                const wh = window.innerHeight || 800;
                if (r.bottom < -80 || r.top > wh + 80) {
                  setIsVisible(false);
                }
              }
            }
          });
        },
        {
          root: rootEl,
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px',
        }
      );
      observer.observe(node);
    }

    // 3. Scroll and resize listeners on both scroll parent and window
    const scrollParent = getScrollParent();
    if (scrollParent && scrollParent !== window) {
      scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    }
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer && node) observer.disconnect();
      if (scrollParent && scrollParent !== window) {
        scrollParent.removeEventListener('scroll', checkVisibility);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  /**
   * Helper to render each domain card with choreographed delays,
   * slide directions, and cascading bullet checkmark visualization.
   * - Left side cards (1, 3, 5): slide in from left with left-originating text
   * - Right side cards (2, 4, 7): slide in from right with right-originating text
   * - Bottom card 6: glides up from bottom with upward cascading text
   */
  const renderTestingCard = (index) => {
    const domain = TRIPGEN_TESTING_DOMAINS[index];
    if (!domain) return null;
    const isBottomCard = index === 4 || index === 5 || index === 6; // Cards 5, 6, 7
    const isCard6 = domain.num === 6; // Card 6: Debugging (Center Bottom)
    const isLeft = domain.num === 1 || domain.num === 3 || domain.num === 5;
    const isRight = domain.num === 2 || domain.num === 4 || domain.num === 7;

    // Choreographed entrance timing & offsets:
    // Left side: 1 (0.22s), 3 (0.45s), 5 (0.68s) coming from left
    // Right side: 2 (0.34s), 4 (0.56s), 7 (0.78s) coming from right
    // Bottom Center: 6 (0.82s) coming from bottom/down
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let enterDelay = 0.25;
    let initialTransform = isMobile ? 'translateX(-16px) scale(0.98)' : 'translateX(-110px) scale(0.92)';

    switch (domain.num) {
      case 1:
        enterDelay = isMobile ? 0.08 : 0.22;
        initialTransform = isMobile ? 'translateX(-16px) scale(0.98)' : 'translateX(-110px) scale(0.92)';
        break;
      case 2:
        enterDelay = isMobile ? 0.12 : 0.34;
        initialTransform = isMobile ? 'translateX(16px) scale(0.98)' : 'translateX(110px) scale(0.92)';
        break;
      case 3:
        enterDelay = isMobile ? 0.16 : 0.45;
        initialTransform = isMobile ? 'translateX(-16px) scale(0.98)' : 'translateX(-110px) scale(0.92)';
        break;
      case 4:
        enterDelay = isMobile ? 0.20 : 0.56;
        initialTransform = isMobile ? 'translateX(16px) scale(0.98)' : 'translateX(110px) scale(0.92)';
        break;
      case 5:
        enterDelay = isMobile ? 0.24 : 0.68;
        initialTransform = isMobile ? 'translateX(-16px) scale(0.98)' : 'translateX(-110px) scale(0.92)';
        break;
      case 6:
        enterDelay = isMobile ? 0.28 : 0.82;
        initialTransform = isMobile ? 'translateY(16px) scale(0.98)' : 'translateY(85px) scale(0.92)';
        break;
      case 7:
        enterDelay = isMobile ? 0.26 : 0.78;
        initialTransform = isMobile ? 'translateX(16px) scale(0.98)' : 'translateX(110px) scale(0.92)';
        break;
      default:
        break;
    }

    return (
      <div
        key={domain.id}
        className={`rounded-lg xs:rounded-xl border ${domain.cardBorder} ${domain.cardBg} ${
          isCard6 ? 'p-1 xs:p-1.5 sm:p-2.5' : 'p-1 xs:p-1.5 sm:p-3'
        } ${
          isBottomCard ? 'lg:h-[152px]' : ''
        } shadow-2xs hover:shadow-xl ${domain.hoverShadow} ${domain.hoverBorder} transition-all duration-300 group relative overflow-hidden flex flex-col justify-between z-20 select-text`}
        style={{
          transform: isVisible ? 'translate(0, 0) scale(1)' : initialTransform,
          opacity: isVisible ? 1 : 0,
          transition: isVisible
            ? `transform 1.05s cubic-bezier(0.16, 1, 0.3, 1) ${enterDelay}s, opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${enterDelay}s, box-shadow 0.3s ease, border-color 0.3s ease`
            : 'transform 0.25s ease, opacity 0.25s ease',
          willChange: 'transform, opacity',
        }}
      >
        <div>
          {/* Card Header: Number Badge with Pop animation + Title & Subtitle */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-6 sm:h-6 rounded-full ${domain.badgeBg} text-white font-black text-[7.5px] xs:text-[8.5px] sm:text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300 ${
                isVisible ? 'anim-badge-bounce' : 'scale-0'
              }`}
              style={{
                animationDelay: `${enterDelay + 0.1}s`,
              }}
            >
              {domain.num}
            </div>
            <div
              className="min-w-0 flex-1"
              style={{
                transform: isVisible
                  ? 'translate(0, 0)'
                  : isLeft
                  ? 'translateX(-26px)'
                  : isRight
                  ? 'translateX(26px)'
                  : 'translateY(18px)',
                opacity: isVisible ? 1 : 0,
                transition: isVisible
                  ? `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${enterDelay + 0.1}s, opacity 0.65s ease ${enterDelay + 0.1}s`
                  : 'none',
              }}
            >
              <h4
                className={`font-black ${
                  isCard6 ? 'text-[7.5px] xs:text-[8.5px] sm:text-[12.5px]' : 'text-[7.5px] xs:text-[8.5px] sm:text-[13px]'
                } text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors truncate`}
              >
                {domain.title}
              </h4>
              <p
                className={`text-[6.5px] xs:text-[7.5px] ${
                  isCard6 ? 'sm:text-[10px]' : 'sm:text-[11px]'
                } text-slate-600 font-semibold sm:font-medium leading-tight line-clamp-1`}
              >
                {domain.subtitle}
              </p>
            </div>
          </div>

          {/* Bullet Points with cascading checkmark and text visualizations */}
          <div className={`${isCard6 ? 'mt-0.5 sm:mt-1 pt-0.5 sm:pt-1' : 'mt-1 sm:mt-2 pt-0.5 sm:pt-1.5'} border-t border-slate-200/60`}>
            <ul className={isCard6 ? 'space-y-0.5 sm:space-y-1' : 'space-y-0.5 sm:space-y-1'}>
              {domain.bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-1 sm:gap-1.5 ${
                    isCard6 ? 'text-[7px] xs:text-[7.5px] sm:text-[11px]' : 'text-[7px] xs:text-[7.5px] sm:text-[11px]'
                  } font-bold sm:font-semibold text-slate-800 sm:text-slate-700 leading-tight group-hover:text-slate-900 transition-all duration-200 hover:translate-x-0.5`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? 'translate(0, 0)'
                      : isLeft
                      ? 'translateX(-32px)'
                      : isRight
                      ? 'translateX(32px)'
                      : 'translateY(22px)',
                    transition: isVisible
                      ? `opacity 0.6s ease-out ${enterDelay + 0.16 + i * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${enterDelay + 0.16 + i * 0.08}s`
                      : 'none',
                  }}
                >
                  <i
                    className={`fa-solid fa-circle-check ${domain.bulletCheck} text-[6px] xs:text-[7px] sm:text-[9px] shrink-0 group-hover:scale-125 transition-transform ${
                      isVisible ? 'anim-check-scale' : 'scale-0'
                    }`}
                    style={{ animationDelay: `${enterDelay + 0.16 + i * 0.08}s` }}
                  ></i>
                  <span className="leading-tight truncate">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ambient Subtle Hover Sheen */}
        <div className="tripgen-card-sheen"></div>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="space-y-5 font-['Plus_Jakarta_Sans',sans-serif] tripgen-reveal-section is-revealed select-text"
    >
      {/* ─── SCOPED KEYFRAMES & MICRO-ANIMATIONS ─── */}
      <style>{`
        @keyframes tgBadgePopIn {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          75% {
            transform: scale(1.22) rotate(6deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes tgCheckScaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes tgHubRiseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.28)) drop-shadow(0 0 28px rgba(99, 102, 241, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 24px rgba(56, 189, 248, 0.45)) drop-shadow(0 0 40px rgba(99, 102, 241, 0.35));
          }
        }

        .anim-badge-bounce {
          animation: tgBadgePopIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-check-scale {
          animation: tgCheckScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-hub-glow {
          animation: tgHubRiseGlow 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* ─── SECTION HEADER ─── */}
      <div>
        <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Testing &amp; Validation
        </h2>
      </div>

      {/* ─── MASTER INFOGRAPHIC CANVAS ─── */}
      <div className="rounded-2xl sm:rounded-3xl border border-sky-100/90 bg-gradient-to-b from-sky-50/50 via-white to-indigo-50/30 p-2.5 xs:p-3.5 sm:p-5 lg:p-6 shadow-xs relative overflow-hidden">
        <div className="relative">

          {/* ─── ANIMATED VECTOR ARROWS & FLOWING ENERGY PARTICLES ─── */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 910 500"
            preserveAspectRatio="none"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: isVisible ? 'opacity 1.0s ease-out 0.35s' : 'opacity 0.25s ease',
            }}
          >
            <defs>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284C7" />
              </marker>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#8B5CF6" />
              </marker>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#10B981" />
              </marker>
              <marker id="arrow-orange" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#F59E0B" />
              </marker>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#EF4444" />
              </marker>
              <marker id="arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#06B6D4" />
              </marker>
              <marker id="arrow-indigo" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#6366F1" />
              </marker>
            </defs>

            {/* Base Background Guide Lines */}
            <path d={PATH_1} stroke="#0284C7" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH_2} stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH_3} stroke="#10B981" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH_4} stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH_5} stroke="#EF4444" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH_6} stroke="#06B6D4" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH_7} stroke="#6366F1" strokeWidth="2" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />

            {/* Continuous Flowing Dashes */}
            <path d={PATH_1} className="tripgen-animated-flow" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-blue)" vectorEffect="non-scaling-stroke" />
            <path d={PATH_2} className="tripgen-animated-flow" stroke="#8B5CF6" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-purple)" vectorEffect="non-scaling-stroke" />
            <path d={PATH_3} className="tripgen-animated-flow" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-green)" vectorEffect="non-scaling-stroke" />
            <path d={PATH_4} className="tripgen-animated-flow" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-orange)" vectorEffect="non-scaling-stroke" />
            <path d={PATH_5} className="tripgen-animated-flow" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-red)" vectorEffect="non-scaling-stroke" />
            <path d={PATH_6} className="tripgen-animated-flow" stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-cyan)" vectorEffect="non-scaling-stroke" />
            <path d={PATH_7} className="tripgen-animated-flow" stroke="#6366F1" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrow-indigo)" vectorEffect="non-scaling-stroke" />

            {/* Traveling Signal Light Particles */}
            <circle r="5" fill="#0284C7" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_1} /></circle>
            <circle r="3" fill="#38BDF8"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_1} /></circle>

            <circle r="5" fill="#8B5CF6" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_2} /></circle>
            <circle r="3" fill="#C084FC"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_2} /></circle>

            <circle r="5" fill="#10B981" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_3} /></circle>
            <circle r="3" fill="#34D399"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_3} /></circle>

            <circle r="5" fill="#F59E0B" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_4} /></circle>
            <circle r="3" fill="#FBBF24"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_4} /></circle>

            <circle r="5" fill="#EF4444" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_5} /></circle>
            <circle r="3" fill="#F87171"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_5} /></circle>

            <circle r="5" fill="#06B6D4" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_6} /></circle>
            <circle r="3" fill="#22D3EE"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_6} /></circle>

            <circle r="5" fill="#6366F1" opacity="0.35"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_7} /></circle>
            <circle r="3" fill="#818CF8"><animateMotion dur="2.2s" repeatCount="indefinite" path={PATH_7} /></circle>
          </svg>

          {/* ─── 3-COLUMN RESPONSIVE GRID (SIDE-BY-SIDE ON ALL VIEWPORTS) ─── */}
          <div className="grid grid-cols-12 gap-1.5 xs:gap-2 sm:gap-4 lg:gap-5 items-stretch relative z-20">

            {/* ─── LEFT COLUMN: CARDS 1, 3, 5 (SLIDE IN ONE BY ONE FROM LEFT) ─── */}
            <div className="col-span-4 lg:col-span-4 flex flex-col justify-between gap-1.5 xs:gap-2 sm:gap-3.5 h-full">
              {renderTestingCard(0)} {/* 1. Functional Testing */}
              {renderTestingCard(2)} {/* 3. Authentication Testing */}
              {renderTestingCard(4)} {/* 5. Integration Testing */}
            </div>

            {/* ─── CENTER COLUMN: ROUND COLOR HUB (DOWN TO UP) + CARD 6 (DEBUGGING) ─── */}
            <div className="col-span-4 lg:col-span-4 flex flex-col items-center justify-between h-full relative">

              {/* Big Central Animated Infographic Hub ("round color down to up slowly coming the showing the visual") */}
              <div
                className="relative flex-1 flex items-center justify-center my-auto lg:-translate-y-3.5 py-1 sm:py-4 lg:py-0"
                style={{
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(95px) scale(0.80)',
                  opacity: isVisible ? 1 : 0,
                  transition: isVisible
                    ? 'transform 1.25s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                    : 'transform 0.25s ease, opacity 0.25s ease',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="relative flex items-center justify-center tripgen-hub-float">
                  {/* Ambient Spinning Orbit Rings */}
                  <div className="absolute -inset-2 sm:-inset-3.5 rounded-full border border-dashed border-sky-300/50 tripgen-orbit-ring pointer-events-none"></div>
                  <div className="absolute -inset-3.5 sm:-inset-6 rounded-full border border-dotted border-indigo-300/40 tripgen-orbit-counter-ring pointer-events-none"></div>

                  {/* Pulsating Color Aura */}
                  <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-r from-sky-400/30 via-indigo-400/30 to-purple-400/30 blur-lg tripgen-hub-aura pointer-events-none"></div>

                  {/* Big Authentic Image from User */}
                  <img
                    src="/tripgen_testing_hub_clean.png"
                    alt="TripGen Testing & Validation Architecture Hub"
                    className="w-20 h-20 xs:w-24 xs:h-24 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105 select-none anim-hub-glow"
                  />
                </div>
              </div>

              {/* Box 6: Debugging ("6th content text slowly down to coming the position") */}
              <div className="w-full mt-auto">
                {renderTestingCard(5)} {/* 6. Debugging */}
              </div>

            </div>

            {/* ─── RIGHT COLUMN: CARDS 2, 4, 7 (SLIDE IN ONE BY ONE FROM RIGHT) ─── */}
            <div className="col-span-4 lg:col-span-4 flex flex-col justify-between gap-1.5 xs:gap-2 sm:gap-3.5 h-full">
              {renderTestingCard(1)} {/* 2. Form Validation Testing */}
              {renderTestingCard(3)} {/* 4. Database Testing */}
              {renderTestingCard(6)} {/* 7. Workflow Testing */}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
