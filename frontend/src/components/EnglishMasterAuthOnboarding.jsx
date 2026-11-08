import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterAuthOnboarding
 * 
 * Authentication & On-boarding Interactive Showcase
 * Features:
 * - Automatic step-by-step workflow animation (cycles every 3.2s)
 * - Distinct vibrant theme color for EACH of the 6 steps:
 *   1. Splash Screen: Royal Blue
 *   2. Role Selection: Purple / Violet
 *   3. Registration ID: Emerald Green
 *   4. Login ID / Email Entry: Warm Amber
 *   5. Password Login: Cyan / Sky
 *   6. Error Feedback: Vibrant Rose
 * - Color-matched left accent bars, active borders, progress bars, and indicator dots
 * - Interactive step selection on hover/click with automatic pause/resume
 * - Viewport-aware IntersectionObserver to only auto-play when in view
 */

const AUTH_STEPS = [
  {
    id: 1,
    title: '1. Splash Screen',
    image: '/english-master-gallery/02_screen.png',
    summary: 'Initial application launch screen showcasing the iconic English Master Pro brand identity, dynamic logo reveal, and background configuration caching for instant startup.',
    color: {
      activeBorder: 'border-blue-500',
      activeRing: 'ring-2 ring-blue-500/20',
      activeBg: 'bg-blue-50/70',
      activeTitle: 'text-blue-950 font-black',
      barBg: 'bg-blue-600',
      restingBar: 'bg-blue-400/80',
      hoverBorder: 'hover:border-blue-300',
      progressBg: 'bg-blue-600',
      trackBg: 'bg-blue-100',
      dotBg: 'bg-blue-600',
      badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
      pulseDot: 'bg-blue-600',
    },
  },
  {
    id: 2,
    title: '2. Role Selection',
    image: '/english-master-gallery/onboarding_assessment_screen.png',
    summary: 'Interactive onboarding flow allowing learners to select their target proficiency level, learning goals, and customize their study trajectory before starting.',
    color: {
      activeBorder: 'border-purple-500',
      activeRing: 'ring-2 ring-purple-500/20',
      activeBg: 'bg-purple-50/70',
      activeTitle: 'text-purple-950 font-black',
      barBg: 'bg-purple-600',
      restingBar: 'bg-purple-400/80',
      hoverBorder: 'hover:border-purple-300',
      progressBg: 'bg-purple-600',
      trackBg: 'bg-purple-100',
      dotBg: 'bg-purple-600',
      badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
      pulseDot: 'bg-purple-600',
    },
  },
  {
    id: 3,
    title: '3. Registration ID',
    image: '/english-master-gallery/07_screen.png',
    summary: 'Automated unique Student Registration ID generation (e.g., STD296133) paired with comprehensive account profile creation including Full Name, Mobile, and Date of Birth.',
    color: {
      activeBorder: 'border-emerald-500',
      activeRing: 'ring-2 ring-emerald-500/20',
      activeBg: 'bg-emerald-50/70',
      activeTitle: 'text-emerald-950 font-black',
      barBg: 'bg-emerald-600',
      restingBar: 'bg-emerald-400/80',
      hoverBorder: 'hover:border-emerald-300',
      progressBg: 'bg-emerald-600',
      trackBg: 'bg-emerald-100',
      dotBg: 'bg-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      pulseDot: 'bg-emerald-600',
    },
  },
  {
    id: 4,
    title: '4. Login ID / Email Entry',
    image: '/english-master-gallery/06_screen.png',
    summary: 'Flexible authentication input supporting both unique Student Registration ID and registered Email Address with real-time format validation and field focus cues.',
    color: {
      activeBorder: 'border-amber-500',
      activeRing: 'ring-2 ring-amber-500/20',
      activeBg: 'bg-amber-50/70',
      activeTitle: 'text-amber-950 font-black',
      barBg: 'bg-amber-500',
      restingBar: 'bg-amber-400/80',
      hoverBorder: 'hover:border-amber-300',
      progressBg: 'bg-amber-500',
      trackBg: 'bg-amber-100',
      dotBg: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
      pulseDot: 'bg-amber-500',
    },
  },
  {
    id: 5,
    title: '5. Password Login',
    image: '/english-master-gallery/12_screen.png',
    summary: 'Encrypted credential submission featuring masked password toggle, persistent session state ("Remember session"), and integrated self-service password recovery link.',
    color: {
      activeBorder: 'border-cyan-500',
      activeRing: 'ring-2 ring-cyan-500/20',
      activeBg: 'bg-cyan-50/70',
      activeTitle: 'text-cyan-950 font-black',
      barBg: 'bg-cyan-600',
      restingBar: 'bg-cyan-400/80',
      hoverBorder: 'hover:border-cyan-300',
      progressBg: 'bg-cyan-600',
      trackBg: 'bg-cyan-100',
      dotBg: 'bg-cyan-600',
      badge: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      pulseDot: 'bg-cyan-600',
    },
  },
  {
    id: 6,
    title: '6. Error Feedback',
    image: '/english-master-gallery/11_screen.png',
    summary: 'Context-aware validation responses, inline alert indicators for mismatched credentials, and instant visual toast feedback ensuring effortless account verification.',
    color: {
      activeBorder: 'border-rose-500',
      activeRing: 'ring-2 ring-rose-500/20',
      activeBg: 'bg-rose-50/70',
      activeTitle: 'text-rose-950 font-black',
      barBg: 'bg-rose-600',
      restingBar: 'bg-rose-400/80',
      hoverBorder: 'hover:border-rose-300',
      progressBg: 'bg-rose-600',
      trackBg: 'bg-rose-100',
      dotBg: 'bg-rose-600',
      badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
      pulseDot: 'bg-rose-600',
    },
  },
];

export default function EnglishMasterAuthOnboarding() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef(null);

  // Automatic step-by-step animation loop (3200ms per step)
  useEffect(() => {
    if (isPaused || !isInView) return;

    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % AUTH_STEPS.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  // Pause automatic animation when scrolled out of view to save resources
  useEffect(() => {
    const scrollParent = containerRef.current?.closest('.overflow-y-auto') || null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        root: scrollParent,
        threshold: 0.15,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeStep = AUTH_STEPS[activeStepIndex];

  return (
    <div ref={containerRef} className="space-y-4 pt-1 pb-6 sm:pb-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <style>{`
        @keyframes authProgressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* ─── 1. SECTION HEADER (CLEAN, NO ROUND TEXT BADGE) ─── */}
      <div className="space-y-1.5 pb-2.5 border-b border-slate-200">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Authentication & On-boarding
        </h3>
        <p className="text-xs sm:text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal">
          A secure, multi-stage user onboarding and authentication workflow engineered with Flutter and Firebase. From animated brand initialization and tailored goal selection to automated student ID generation, encrypted login, and real-time validation feedback.
        </p>
      </div>

      {/* ─── 2. MAIN 2-COLUMN WORKSPACE: LEFT SPACER | MOBILE PHONE | GAP SPACE | RIGHT CONTENT CARDS ─── */}
      <div className="flex flex-row items-center justify-between sm:justify-center gap-2 xs:gap-2.5 sm:gap-8 lg:gap-10 xl:gap-12 pt-2 xs:pt-3 sm:pt-5 px-0.5 xs:px-1 sm:px-3">

        {/* ─── LEFT OFFSET SPACER (ENSURES PHONE IS BALANCED AND NOT GLUED TO FAR LEFT) ─── */}
        <div className="hidden lg:block lg:w-6 xl:w-10 shrink-0"></div>

        {/* ─── MIDDLE: SMARTPHONE MOCKUP FRAME & DYNAMIC COLOR DOTS ─── */}
        <div className="shrink-0 flex flex-col items-center justify-center">
          <div className="relative w-[120px] xs:w-[134px] sm:w-[250px] aspect-[9/19.5] rounded-[18px] xs:rounded-[22px] sm:rounded-[34px] p-[3px] xs:p-[3.5px] sm:p-[6px] bg-slate-900 border-[1.5px] sm:border-[2.5px] border-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.30)] sm:shadow-[0_16px_32px_rgba(15,23,42,0.35)] ring-1 ring-slate-800 transition-all duration-300 select-none group/phone">
            
            {/* Physical Hardware Buttons on Left Side (Volume Rockers) */}
            <div className="hidden sm:block absolute -left-[3px] top-[65px] w-[3px] h-5.5 rounded-l-xs bg-slate-800"></div>
            <div className="hidden sm:block absolute -left-[3px] top-[96px] w-[3px] h-5.5 rounded-l-xs bg-slate-800"></div>

            {/* Physical Hardware Button on Right Side (Power Button) */}
            <div className="hidden sm:block absolute -right-[3px] top-[80px] w-[3px] h-8 rounded-r-xs bg-slate-800"></div>

            {/* Inner Screen Display Surface - 100% Plain, Zero Bottom System Buttons */}
            <div className="relative w-full h-full rounded-[14px] xs:rounded-[18px] sm:rounded-[28px] overflow-hidden bg-black flex items-start justify-center">
              <img
                key={activeStep.id}
                src={activeStep.image}
                alt={activeStep.title}
                className="w-full h-[105.5%] object-cover object-top select-none animate-in fade-in duration-300"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                loading="eager"
              />

              {/* Subtle Glass Glare Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[14px] xs:rounded-[18px] sm:rounded-[28px]"></div>
            </div>

          </div>

          {/* Interactive Screen Indicator Dots in Matching Colors */}
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 pt-1.5 xs:pt-2 sm:pt-3.5">
            {AUTH_STEPS.map((step, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setActiveStepIndex(i); setIsPaused(true); }}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStepIndex === i ? `w-3 xs:w-4 sm:w-6 shadow-xs ${step.color.dotBg}` : 'w-1 xs:w-1.5 sm:w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Jump to step ${i + 1}: ${step.title}`}
                aria-label={`Jump to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ─── RIGHT: 6 CLEAN ON-BOARDING / AUTH CARDS (EACH WITH ITS OWN COLOR) ─── */}
        <div 
          className="flex-1 w-full min-w-0 flex flex-col justify-center gap-1 xs:gap-1.5 sm:gap-2.5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {AUTH_STEPS.map((step, idx) => {
            const isCurrentActive = activeStepIndex === idx;

            return (
              <div
                key={step.id}
                onMouseEnter={() => { setActiveStepIndex(idx); setIsPaused(true); }}
                onClick={() => { setActiveStepIndex(idx); setIsPaused(true); }}
                className={`relative overflow-hidden w-full text-left py-1 px-2 xs:py-1.5 xs:px-2.5 sm:py-2.5 sm:px-4.5 rounded-lg xs:rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer border ${
                  isCurrentActive
                    ? `border-[1.5px] sm:border-2 ${step.color.activeBorder} ${step.color.activeRing} ${step.color.activeBg} shadow-sm sm:shadow-md translate-x-0.5 sm:translate-x-1.5`
                    : `border-slate-200/90 bg-white ${step.color.hoverBorder} hover:bg-slate-50/70 shadow-2xs`
                }`}
              >
                {/* Dedicated Color Left Accent Bar (Highlighted in Image 2) */}
                <div
                  className={`absolute left-0 top-1.5 bottom-1.5 sm:top-2 sm:bottom-2 rounded-r-md transition-all duration-300 ${
                    isCurrentActive
                      ? `w-1 sm:w-1.5 ${step.color.barBg}`
                      : `w-0.5 sm:w-1 ${step.color.restingBar} opacity-50`
                  }`}
                />

                {/* Title - Features Distinct Theme Color when Active */}
                <h4 className={`text-[7.5px] xs:text-[8.5px] sm:text-[15px] font-extrabold leading-snug mb-0.5 transition-colors duration-200 ${isCurrentActive ? step.color.activeTitle : 'text-slate-900'}`}>
                  {step.title}
                </h4>

                {/* Content Text Description */}
                <p className="text-[5.5px] xs:text-[6.5px] sm:text-[12.5px] font-normal leading-tight sm:leading-normal text-slate-600 line-clamp-2 sm:line-clamp-none">
                  {step.summary}
                </p>

                {/* Animated Auto-Progress Bar across bottom in Card's Theme Color */}
                {isCurrentActive && !isPaused && (
                  <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] sm:h-[2px] ${step.color.trackBg} overflow-hidden rounded-b-xl`}>
                    <div
                      key={`prog-${activeStepIndex}`}
                      className={`h-full ${step.color.progressBg} rounded-full`}
                      style={{ animation: 'authProgressFill 3200ms linear forwards' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
