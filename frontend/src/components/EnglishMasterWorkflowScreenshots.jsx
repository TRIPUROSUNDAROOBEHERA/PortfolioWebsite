import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterWorkflowScreenshots
 * 
 * 4-Step System Architecture & Workflow with Individual Vertical Mobile Screens:
 * 1. Step 1: Onboarding & Proficiency Assessment -> Screenshot #01 (/english-master-gallery/onboarding_assessment_screen.png)
 * 2. Step 2: Interactive Lesson Study -> Screenshot #12 (/english-master-gallery/home_hub_screen_hd.png)
 * 3. Step 3: Skill Evaluation & Quizzing -> Quiz Board Screenshot (/english-master-gallery/quiz_board_screen.png)
 * 4. Step 4: Cloud Sync & Analytics -> Cloud Sync & Analytics (/english-master-gallery/cloud_sync_analytics_screen.png)
 * 
 * Design Features:
 * - Top Workflow Step Cards with dim pastel backgrounds (no bottom numbers)
 * - Vertical Connector Line with glowing pulse dots
 * - Staggered "Down to Up" Slow Entrance: When web page is refreshed and scrolled down slowly,
 *   the 4 horizontal mobile screens glide up one by one VERY SLOWLY from bottom to their vertical position!
 * - Once arrived, they STAY in that ONE FIXED POSITION (no continuous bouncing up/down).
 * - Ultra-Attractive Flagship Mobile Hardware Frame (Titanium bezel, side buttons, earpiece, Dynamic Island)
 * - 100% Clarity Native Screenshots in one steady position
 * - Big screen lightbox modal removed as requested ("2nd image removed dont show the big screen")
 */

const WORKFLOW_STEPS = [
  {
    stepNum: 1,
    serial: '01',
    title: '1. Onboarding & Proficiency Assessment',
    desc: 'Learner chooses their learning goal and proficiency level to unlock a tailored curriculum path.',
    badge: 'Step 1 • Assessment',
    screenLabel: 'Onboarding Assessment Screen',
    screenSubtitle: 'Grammar Curriculum & Placement',
    image: '/english-master-gallery/onboarding_assessment_screen.png',
    accentColor: 'indigo',
    cardBg: 'bg-gradient-to-br from-indigo-100/90 via-indigo-50/80 to-blue-50/70',
    cardBorder: 'border-indigo-200 hover:border-indigo-400',
    badgeClass: 'bg-indigo-600 text-white',
    lineColor: 'border-indigo-400',
    dotColor: 'bg-indigo-500 shadow-indigo-400/50',
    hoverGlow: 'hover:shadow-[0_20px_45px_-8px_rgba(99,102,241,0.40)] hover:border-indigo-500/60',
    iconClass: 'fa-solid fa-user-check text-indigo-600',
  },
  {
    stepNum: 2,
    serial: '02',
    title: '2. Interactive Lesson Study',
    desc: 'Content is delivered through clear rule explanations, example dialogues, and flashcard practice.',
    badge: 'Step 2 • Lesson Study',
    screenLabel: 'Home & Core Learning Hub',
    screenSubtitle: 'Interactive Module Navigation',
    image: '/english-master-gallery/home_hub_screen_hd.png',
    accentColor: 'purple',
    cardBg: 'bg-gradient-to-br from-purple-100/90 via-purple-50/80 to-pink-50/70',
    cardBorder: 'border-purple-200 hover:border-purple-400',
    badgeClass: 'bg-purple-600 text-white',
    lineColor: 'border-purple-400',
    dotColor: 'bg-purple-500 shadow-purple-400/50',
    hoverGlow: 'hover:shadow-[0_20px_45px_-8px_rgba(168,85,247,0.40)] hover:border-purple-500/60',
    iconClass: 'fa-solid fa-book-open-reader text-purple-600',
  },
  {
    stepNum: 3,
    serial: '03',
    title: '3. Skill Evaluation & Quizzing',
    desc: 'Students complete periodic quizzes; answers are evaluated instantly with detailed explanations.',
    badge: 'Step 3 • Quiz Evaluation',
    screenLabel: 'Quiz Board Screenshot',
    screenSubtitle: 'Available Evaluation Tracks',
    image: '/english-master-gallery/quiz_board_screen.png',
    accentColor: 'sky',
    cardBg: 'bg-gradient-to-br from-sky-100/90 via-sky-50/80 to-cyan-50/70',
    cardBorder: 'border-sky-200 hover:border-sky-400',
    badgeClass: 'bg-sky-600 text-white',
    lineColor: 'border-sky-400',
    dotColor: 'bg-sky-500 shadow-sky-400/50',
    hoverGlow: 'hover:shadow-[0_20px_45px_-8px_rgba(14,165,233,0.40)] hover:border-sky-500/60',
    iconClass: 'fa-solid fa-clipboard-question text-sky-600',
  },
  {
    stepNum: 4,
    serial: '04',
    title: '4. Cloud Sync & Analytics',
    desc: 'Progress telemetry is synchronized to Cloud Firestore, updating streak counts and unlocking subsequent modules.',
    badge: 'Step 4 • Cloud Sync',
    screenLabel: 'Cloud Sync & Analytics',
    screenSubtitle: 'Firebase Telemetry & Sync',
    image: '/english-master-gallery/cloud_sync_analytics_screen.png',
    accentColor: 'emerald',
    cardBg: 'bg-gradient-to-br from-emerald-100/90 via-emerald-50/80 to-teal-50/70',
    cardBorder: 'border-emerald-200 hover:border-emerald-400',
    badgeClass: 'bg-emerald-600 text-white',
    lineColor: 'border-emerald-400',
    dotColor: 'bg-emerald-500 shadow-emerald-400/50',
    hoverGlow: 'hover:shadow-[0_20px_45px_-8px_rgba(16,185,129,0.40)] hover:border-emerald-500/60',
    iconClass: 'fa-solid fa-cloud-arrow-up text-emerald-600',
  },
];

export default function EnglishMasterWorkflowScreenshots() {
  const [isAnimated, setIsAnimated] = useState(false);
  const phonesContainerRef = useRef(null);

  // Scroll detection: Triggers when the mobile screens enter into the viewport
  useEffect(() => {
    const node = phonesContainerRef.current;
    if (!node) return;

    // Detect scrollable modal container if present
    const findScrollParent = (el) => {
      let cur = el.parentElement;
      while (cur) {
        const style = window.getComputedStyle(cur);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          return cur;
        }
        cur = cur.parentElement;
      }
      return null;
    };

    const scrollContainer = findScrollParent(node);

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // When the top of the mobile screens reaches the lower 90% of screen height
      if (rect.top <= viewportHeight * 0.90 && rect.bottom >= viewportHeight * 0.05) {
        setIsAnimated(true);
      } else if (rect.top > viewportHeight * 1.05) {
        // Reset when scrolled back above the phones so scrolling down replays the slow entrance
        setIsAnimated(false);
      }
    };

    // IntersectionObserver directly on the phones row
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
          }
        });
      },
      {
        root: scrollContainer || null,
        threshold: 0.12,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(node);

    // Global scroll capture: intercepts any scroll in document, modal, or window
    document.addEventListener('scroll', checkVisibility, { capture: true, passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkVisibility, { passive: true });
    }

    // Initial check on mount
    const t = setTimeout(checkVisibility, 200);

    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', checkVisibility, { capture: true });
      window.removeEventListener('scroll', checkVisibility);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkVisibility);
      }
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="w-full space-y-3 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── 4-COLUMN WORKFLOW GRID (CARDS + VERTICAL CONNECTOR + MOBILE SCREENS) ─── */}
      <div 
        ref={phonesContainerRef}
        className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-6 lg:gap-6 items-stretch"
      >
        {WORKFLOW_STEPS.map((step, idx) => {
          const phoneDelay = `${idx * 420}ms`;
          const lineDelay = `${idx * 420 + 150}ms`;

          return (
            <div
              key={step.stepNum}
              className="flex flex-col items-center justify-between group/col"
            >
              {/* 1. TOP WORKFLOW STEP CARD WITH DIM COLOR BACKGROUND */}
              <div
                className={`w-full p-1.5 xs:p-2 sm:p-5 rounded-lg xs:rounded-xl sm:rounded-2xl ${step.cardBg} border ${step.cardBorder} shadow-xs transition-all duration-300 hover:shadow-md flex flex-col justify-between min-h-[62px] xs:min-h-[72px] sm:min-h-[125px]`}
              >
                <div>
                  <h5 className="font-extrabold text-[7px] xs:text-[8px] sm:text-sm text-slate-900 leading-tight mb-0.5 sm:mb-1.5">
                    {step.title}
                  </h5>
                  <p className="text-[5.5px] xs:text-[6.5px] sm:text-xs text-slate-600 leading-tight font-normal mt-0.5 line-clamp-2 xs:line-clamp-3 sm:line-clamp-none">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* 2. VERTICAL CONNECTOR LINE (SYNCS AS EACH PHONE RISES UP) */}
              <div 
                style={{
                  transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
                  transitionDelay: isAnimated ? lineDelay : '0ms',
                  transform: isAnimated ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  opacity: isAnimated ? 1 : 0.2,
                }}
                className="w-full flex flex-col items-center justify-center py-1 sm:py-2 relative"
              >
                {/* Continuous vertical dashed line */}
                <div className={`w-0.5 h-3 xs:h-4 sm:h-7 border-l-2 border-dashed ${step.lineColor} opacity-75`}></div>
                
                {/* Pulse glowing dot in the center */}
                <div className="relative -my-1 sm:-my-1.5 flex items-center justify-center z-10">
                  <span className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full ${step.dotColor} shadow-sm group-hover/col:scale-125 transition-transform duration-300`}></span>
                  <span className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full ${step.dotColor} opacity-30 animate-ping`}></span>
                </div>
                
                {/* Lower arrow pointing down into phone */}
                <div className="text-[8px] sm:text-[10px] text-slate-400 font-bold -mt-0.5">
                  <i className="fa-solid fa-chevron-down text-[7px] sm:text-[9px] text-slate-500"></i>
                </div>
              </div>

              {/* 3. INDIVIDUAL VERTICAL MOBILE SCREEN (ONE BY ONE VERY SLOWLY COMING UP FROM BOTTOM TO VERTICAL POSITION) */}
              <div
                style={{
                  transition: 'transform 1.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isAnimated ? phoneDelay : '0ms',
                  transform: isAnimated ? 'translateY(0px)' : 'translateY(60px)',
                  opacity: isAnimated ? 1 : 0,
                }}
                className="w-full max-w-[80px] xs:max-w-[92px] sm:max-w-[205px] md:max-w-[215px] mx-auto flex flex-col items-center select-none group/phone"
              >
                {/* Plain Minimal Smartphone Mockup Frame (Matching User's Plain Frame Image) */}
                <div className={`relative w-full aspect-[9/19.5] rounded-[14px] xs:rounded-[18px] sm:rounded-[34px] p-[2.5px] xs:p-[3px] sm:p-[6px] bg-slate-900 border-[1.5px] sm:border-[2.5px] border-slate-900 shadow-[0_10px_20px_rgba(15,23,42,0.30)] sm:shadow-[0_16px_32px_rgba(15,23,42,0.35)] ring-1 ring-slate-800 transition-all duration-300 group-hover/phone:scale-[1.02] ${step.hoverGlow}`}>
                  
                  {/* Physical Hardware Buttons on Left Side (Volume Rockers) */}
                  <div className="hidden sm:block absolute -left-[3px] top-[60px] w-[3px] h-5 rounded-l-xs bg-slate-800"></div>
                  <div className="hidden sm:block absolute -left-[3px] top-[86px] w-[3px] h-5 rounded-l-xs bg-slate-800"></div>

                  {/* Physical Hardware Button on Right Side (Power Button) */}
                  <div className="hidden sm:block absolute -right-[3px] top-[72px] w-[3px] h-7 rounded-r-xs bg-slate-800"></div>

                  {/* Inner Screen Display Surface - 100% Plain, Zero Notch, Zero Chin, Plain Bottom */}
                  <div className="relative w-full h-full rounded-[11px] xs:rounded-[14px] sm:rounded-[28px] overflow-hidden bg-black flex items-start justify-center">
                    <img
                      src={step.image}
                      alt={`${step.title} - ${step.screenLabel}`}
                      className="w-full h-[105.5%] object-cover object-top select-none"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      loading="lazy"
                    />

                    {/* Subtle Glass Glare Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[11px] xs:rounded-[14px] sm:rounded-[28px]"></div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
