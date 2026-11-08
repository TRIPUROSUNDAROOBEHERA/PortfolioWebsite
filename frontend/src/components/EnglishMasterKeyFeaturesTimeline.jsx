import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterKeyFeaturesTimeline
 * 
 * Project Milestone Presentation Template Architecture:
 * - Continuous central horizontal ribbon track divided into 8 sequential segments (01 to 08)
 * - All 8 milestones fit completely on screen in the FRONT VISUAL (no horizontal scroll needed!)
 * - Thick, graceful curved ribbon arrows branching OUT:
 *    * Step 01: Curves DOWN (↓) — AI-Powered Learning Guidance (Teal Blue)
 *    * Step 02: Curves UP (↑) — Grammar and Vocabulary (Plum / Wine)
 *    * Step 03: Curves DOWN (↓) — Speaking and Pronunciation (Deep Petrol Blue)
 *    * Step 04: Curves UP (↑) — Writing Skills (Crimson Red)
 *    * Step 05: Curves DOWN (↓) — Interactive Practice (Coral Rose)
 *    * Step 06: Curves UP (↑) — Progress Analytics (Royal Indigo)
 *    * Step 07: Curves DOWN (↓) — Learning Achievements (Warm Amber)
 *    * Step 08: Curves UP (↑) — Certificates (Deep Purple)
 * - Selection & Interaction:
 *    * Click ANY milestone (01 to 08) to lock/select it in place!
 *    * Click again to clear selection and resume smooth auto-cycle.
 *    * Clear visual feedback with selected state ring and badge.
 *    * Text selection is fully enabled (no select-none).
 * - 100% Full Unabridged Text Display without any truncation (no ellipsis, no line-clamp)!
 */

const MILESTONES = [
  {
    id: 1,
    step: '01',
    badge: 'AI-Powered Learning Guidance',
    fullTitle: 'AI-Powered Learning Guidance',
    desc: 'AI-powered learning guidance, if supported.',
    color: '#0284C7', // Teal Blue
    glowColor: 'rgba(2, 132, 199, 0.45)',
    direction: 'down',
    icon: 'fa-robot',
  },
  {
    id: 2,
    step: '02',
    badge: 'Grammar and Vocabulary',
    fullTitle: 'Grammar and Vocabulary',
    desc: 'Build a strong English foundation with structured lessons and practical exercises.',
    color: '#7B1E58', // Plum / Wine
    glowColor: 'rgba(123, 30, 88, 0.45)',
    direction: 'up',
    icon: 'fa-book-open-reader',
  },
  {
    id: 3,
    step: '03',
    badge: 'Speaking and Pronunciation',
    fullTitle: 'Speaking and Pronunciation',
    desc: 'Practice communication and improve pronunciation.',
    color: '#0D9488', // Deep Petrol Blue
    glowColor: 'rgba(13, 148, 136, 0.45)',
    direction: 'down',
    icon: 'fa-microphone',
  },
  {
    id: 4,
    step: '04',
    badge: 'Writing Skills',
    fullTitle: 'Writing Skills',
    desc: 'Practical composition and sentence structure exercises to enhance written English.',
    color: '#C02626', // Crimson Red
    glowColor: 'rgba(192, 38, 38, 0.45)',
    direction: 'up',
    icon: 'fa-pen-nib',
  },
  {
    id: 5,
    step: '05',
    badge: 'Interactive Practice',
    fullTitle: 'Interactive Practice',
    desc: 'Reinforce learning through quizzes, exercises, and assessments.',
    color: '#E05263', // Coral Rose
    glowColor: 'rgba(224, 82, 99, 0.45)',
    direction: 'down',
    icon: 'fa-gamepad',
  },
  {
    id: 6,
    step: '06',
    badge: 'Progress Analytics',
    fullTitle: 'Progress Analytics',
    desc: 'Track learning progress with detailed feedback, metrics, and visual analytics.',
    color: '#4F46E5', // Royal Indigo
    glowColor: 'rgba(79, 70, 229, 0.45)',
    direction: 'up',
    icon: 'fa-chart-line',
  },
  {
    id: 7,
    step: '07',
    badge: 'Learning Achievements',
    fullTitle: 'Learning Achievements',
    desc: 'Celebrate milestones with gamified streak rewards and completion achievements.',
    color: '#D97706', // Warm Amber
    glowColor: 'rgba(217, 119, 6, 0.45)',
    direction: 'down',
    icon: 'fa-trophy',
  },
  {
    id: 8,
    step: '08',
    badge: 'Certificates',
    fullTitle: 'Certificates',
    desc: 'Official course completion certificates, where supported by the application.',
    color: '#6B21A8', // Deep Purple
    glowColor: 'rgba(107, 33, 168, 0.45)',
    direction: 'up',
    icon: 'fa-certificate',
  },
];

export default function EnglishMasterKeyFeaturesTimeline() {
  const [autoIndex, setAutoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const mobileScrollRef = useRef(null);
  const touchTimeoutRef = useRef(null);

  // Automatic slow animation: cycles 01 to 08 smoothly every 2.4s
  // Pauses automatically if hovered or if user selects an item
  useEffect(() => {
    if (isPaused || selectedId !== null) return;

    const timer = setInterval(() => {
      setAutoIndex(prev => (prev + 1) % MILESTONES.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [isPaused, selectedId]);

  // Priority: selectedId takes absolute precedence, otherwise hoveredId, otherwise autoIndex
  const activeId = selectedId || hoveredId || (MILESTONES[autoIndex] ? MILESTONES[autoIndex].id : 1);

  // Automatic mobile scroll tracking active item (01 to 08)
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;

    const activeEl = container.querySelector(`[data-step-id="${activeId}"]`);
    if (activeEl) {
      const containerWidth = container.clientWidth;
      const elLeft = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      // Center active step in the mobile horizontal scroll container
      const targetScroll = elLeft - (containerWidth / 2) + (elWidth / 2);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  const handleSelect = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-3 font-['Plus_Jakarta_Sans',sans-serif] overflow-visible pt-1">
      {/* ─── INLINE STYLES FOR DYNAMIC RIBBON ANIMATIONS ─── */}
      <style>{`
        @keyframes activePulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.12); }
        }
        @keyframes arrowBounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes arrowBounceUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .anim-active-pulse {
          animation: activePulse 2s ease-in-out infinite;
        }
        .anim-bounce-down {
          animation: arrowBounceDown 1.8s ease-in-out infinite;
        }
        .anim-bounce-up {
          animation: arrowBounceUp 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* ─── SECTION TITLE ─── */}
      <div className="pb-2.5 border-b border-slate-200">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Key Features
        </h3>
      </div>

      {/* ─── DESKTOP & TABLETS: ALL 01 TO 08 FIT IN FRONT VISUAL (NO SCROLL NEEDED) ─── */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredId(null);
        }}
        className="hidden md:block w-full py-2 relative"
      >
        {/* Main 8-Column Grid: Fits 100% width across front screen */}
        <div className="grid grid-cols-8 gap-1.5 lg:gap-2.5 w-full items-center">
          {MILESTONES.map((item) => {
            const isUp = item.direction === 'up';
            const isSelected = selectedId === item.id;
            const isFocused = activeId === item.id;

            return (
              <div
                key={item.id}
                onClick={(e) => handleSelect(item.id, e)}
                onMouseEnter={() => {
                  if (!selectedId) setHoveredId(item.id);
                }}
                onMouseLeave={() => {
                  if (!selectedId) setHoveredId(null);
                }}
                className="flex flex-col items-center cursor-pointer group transition-all duration-300"
                title={`Click to ${isSelected ? 'deselect' : 'select and hold'} Step ${item.step}`}
              >
                {/* ─── TOP ZONE (FOR 'UP' MILESTONES: DESC + BADGE + UPWARD ARROW) ─── */}
                <div className="min-h-[200px] h-[200px] w-full flex flex-col items-center justify-end">
                  {isUp && (
                    <div
                      style={{
                        transform: isFocused ? 'translateY(-4px)' : 'translateY(0)',
                      }}
                      className="flex flex-col items-center text-center transition-transform duration-300 px-0.5 w-full"
                    >
                      {/* Description Text Above (Enlarged to 12.5px–13.5px for crisp readability) */}
                      <p className={`text-[12px] lg:text-[12.5px] xl:text-[13px] leading-snug mb-2 max-w-[145px] transition-colors duration-300 ${
                        isFocused ? 'text-slate-900 font-bold' : 'text-slate-700 font-semibold'
                      }`}>
                        {item.desc}
                      </p>

                      {/* Solid Rectangular Title Badge (Enlarged to 12.5px–13px) */}
                      <div
                        style={{
                          backgroundColor: isFocused ? item.color : '#FFFFFF',
                          borderColor: item.color,
                          color: isFocused ? '#FFFFFF' : item.color,
                          boxShadow: isFocused ? `0 6px 16px -2px ${item.glowColor}` : '0 1px 3px rgba(0,0,0,0.06)',
                        }}
                        className={`w-full max-w-[145px] min-h-[48px] py-1.5 px-2 rounded-xl font-black text-[12px] lg:text-[12.5px] xl:text-[13px] leading-tight transition-all duration-300 border-[2px] flex items-center justify-center gap-1.5 text-center relative ${
                          isSelected
                            ? 'scale-105 ring-3 ring-indigo-400 ring-offset-1 z-20'
                            : isFocused
                            ? 'scale-105 ring-2 ring-white/90 z-10'
                            : 'group-hover:scale-102'
                        }`}
                      >
                        <i className={`fa-solid ${item.icon} text-xs shrink-0`} />
                        <span className="break-words leading-tight">{item.badge}</span>

                        {/* Selected Indicator Pin */}
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[8px] shadow-sm">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        )}
                      </div>

                      {/* Upward Curving Branch Arrow (↑) */}
                      <div className={`mt-0.5 flex flex-col items-center ${isFocused ? 'anim-bounce-up' : ''}`}>
                        <svg
                          width="34"
                          height="36"
                          viewBox="0 0 44 46"
                          fill="none"
                          className="transition-all duration-300"
                        >
                          {/* Curved stem */}
                          <path
                            d="M 12 46 C 12 30, 26 26, 26 14"
                            stroke={isFocused ? item.color : '#94A3B8'}
                            strokeWidth="9"
                            strokeLinecap="round"
                            className="transition-colors duration-300"
                          />
                          {/* Upward Arrowhead */}
                          <polygon
                            points="14,16 38,16 26,2"
                            fill={isFocused ? item.color : '#94A3B8'}
                            className="transition-colors duration-300"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── MIDDLE ZONE: CONTINUOUS HORIZONTAL RIBBON TRACK (01 TO 08) ─── */}
                <div className="w-full relative h-[34px] flex items-center justify-center my-0.5">
                  <div
                    style={{
                      backgroundColor: isFocused ? item.color : '#E2E8F0',
                      color: isFocused ? '#FFFFFF' : '#475569',
                      boxShadow: isFocused ? `0 0 16px ${item.glowColor}` : undefined,
                    }}
                    className={`w-full h-[30px] flex items-center justify-center font-black text-[13px] sm:text-sm tracking-wider transition-all duration-300 relative ${
                      item.id === 1 ? 'rounded-l-full' : ''
                    } ${item.id === 8 ? 'rounded-r-full' : ''} ${
                      isSelected
                        ? 'scale-y-120 z-20 brightness-110 ring-2 ring-indigo-400'
                        : isFocused
                        ? 'scale-y-115 z-10 brightness-105 ring-2 ring-white/70'
                        : 'hover:bg-slate-300'
                    }`}
                  >
                    <span>{item.step}</span>

                    {/* Animated spotlight beam */}
                    {isFocused && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-sm" />
                    )}
                  </div>
                </div>

                {/* ─── BOTTOM ZONE (FOR 'DOWN' MILESTONES: DOWNWARD ARROW + BADGE + DESC) ─── */}
                <div className="min-h-[200px] h-[200px] w-full flex flex-col items-center justify-start">
                  {!isUp && (
                    <div
                      style={{
                        transform: isFocused ? 'translateY(4px)' : 'translateY(0)',
                      }}
                      className="flex flex-col items-center text-center transition-transform duration-300 px-0.5 w-full"
                    >
                      {/* Downward Curving Branch Arrow (↓) */}
                      <div className={`mb-0.5 flex flex-col items-center ${isFocused ? 'anim-bounce-down' : ''}`}>
                        <svg
                          width="34"
                          height="36"
                          viewBox="0 0 44 46"
                          fill="none"
                          className="transition-all duration-300"
                        >
                          {/* Curved stem */}
                          <path
                            d="M 12 0 C 12 16, 26 20, 26 32"
                            stroke={isFocused ? item.color : '#94A3B8'}
                            strokeWidth="9"
                            strokeLinecap="round"
                            className="transition-colors duration-300"
                          />
                          {/* Downward Arrowhead */}
                          <polygon
                            points="14,30 38,30 26,44"
                            fill={isFocused ? item.color : '#94A3B8'}
                            className="transition-colors duration-300"
                          />
                        </svg>
                      </div>

                      {/* Solid Rectangular Title Badge (Enlarged to 12.5px–13px) */}
                      <div
                        style={{
                          backgroundColor: isFocused ? item.color : '#FFFFFF',
                          borderColor: item.color,
                          color: isFocused ? '#FFFFFF' : item.color,
                          boxShadow: isFocused ? `0 6px 16px -2px ${item.glowColor}` : '0 1px 3px rgba(0,0,0,0.06)',
                        }}
                        className={`w-full max-w-[145px] min-h-[48px] py-1.5 px-2 rounded-xl font-black text-[12px] lg:text-[12.5px] xl:text-[13px] leading-tight transition-all duration-300 border-[2px] flex items-center justify-center gap-1.5 text-center relative ${
                          isSelected
                            ? 'scale-105 ring-3 ring-indigo-400 ring-offset-1 z-20'
                            : isFocused
                            ? 'scale-105 ring-2 ring-white/90 z-10'
                            : 'group-hover:scale-102'
                        }`}
                      >
                        <i className={`fa-solid ${item.icon} text-xs shrink-0`} />
                        <span className="break-words leading-tight">{item.badge}</span>

                        {/* Selected Indicator Pin */}
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[8px] shadow-sm">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        )}
                      </div>

                      {/* Description Text Below (Enlarged to 12.5px–13.5px for crisp readability) */}
                      <p className={`text-[12px] lg:text-[12.5px] xl:text-[13px] leading-snug mt-2 max-w-[145px] transition-colors duration-300 ${
                        isFocused ? 'text-slate-900 font-bold' : 'text-slate-700 font-semibold'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── MOBILE PHONES: EXACT IMAGE 2 REPLICA (HORIZONTAL RIBBON TRACK WITH UP/DOWN CARDS & AUTO-SCROLL) ─── */}
      <div 
        onTouchStart={() => {
          setIsPaused(true);
          if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
        }}
        onTouchEnd={() => {
          if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
          touchTimeoutRef.current = setTimeout(() => setIsPaused(false), 3500);
        }}
        className="block md:hidden w-full py-2 relative"
      >
        {/* Mobile Swipe / Scroll Container with hidden scrollbar & automatic scroll tracking */}
        <div 
          ref={mobileScrollRef}
          className="overflow-x-auto no-scrollbar pt-3 pb-3 px-3 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Main 8-Column Ribbon Grid matching Image 2 Layout */}
          <div className="min-w-[820px] xs:min-w-[860px] grid grid-cols-8 gap-2 w-full items-center py-1 pr-3">
            {MILESTONES.map((item) => {
              const isUp = item.direction === 'up';
              const isSelected = selectedId === item.id;
              const isFocused = activeId === item.id;

              return (
                <div
                  key={`mob-h-${item.id}`}
                  data-step-id={item.id}
                  onClick={(e) => handleSelect(item.id, e)}
                  className="flex flex-col items-center cursor-pointer group transition-all duration-300"
                  title={`Tap to ${isSelected ? 'deselect' : 'select'} Step ${item.step}`}
                >
                  {/* ─── TOP ZONE (FOR 'UP' MILESTONES: DESC + BADGE + UPWARD ARROW) ─── */}
                  <div className="min-h-[135px] h-[135px] w-full flex flex-col items-center justify-end">
                    {isUp && (
                      <div
                        style={{
                          transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
                        }}
                        className="flex flex-col items-center text-center transition-transform duration-300 px-0.5 w-full"
                      >
                        {/* Description Text Above */}
                        <p
                          className={`text-[8.5px] xs:text-[9px] leading-tight mb-1 max-w-[96px] transition-colors duration-300 ${
                            isFocused ? 'text-slate-900 font-bold' : 'text-slate-700 font-semibold'
                          }`}
                        >
                          {item.desc}
                        </p>

                        {/* Solid Rectangular Title Badge */}
                        <div
                          style={{
                            backgroundColor: isFocused ? item.color : '#FFFFFF',
                            borderColor: item.color,
                            color: isFocused ? '#FFFFFF' : item.color,
                            boxShadow: isFocused ? `0 4px 12px -2px ${item.glowColor}` : '0 1px 3px rgba(0,0,0,0.06)',
                          }}
                          className={`w-full max-w-[96px] min-h-[36px] py-1 px-1 rounded-lg font-black text-[8.5px] xs:text-[9px] leading-tight transition-all duration-300 border-[1.5px] flex items-center justify-center gap-1 text-center relative ${
                            isSelected
                              ? 'scale-105 ring-2 ring-indigo-400 ring-offset-1 z-20'
                              : isFocused
                              ? 'scale-105 ring-2 ring-white/90 z-10'
                              : 'active:scale-98'
                          }`}
                        >
                          <i className={`fa-solid ${item.icon} text-[9px] shrink-0`} />
                          <span className="break-words leading-tight">{item.badge}</span>

                          {/* Selected Indicator Pin */}
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[7px] shadow-sm">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )}
                        </div>

                        {/* Upward Curving Branch Arrow (↑) */}
                        <div className={`mt-0.5 flex flex-col items-center ${isFocused ? 'anim-bounce-up' : ''}`}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 44 46"
                            fill="none"
                            className="transition-all duration-300"
                          >
                            <path
                              d="M 12 46 C 12 30, 26 26, 26 14"
                              stroke={isFocused ? item.color : '#94A3B8'}
                              strokeWidth="9"
                              strokeLinecap="round"
                              className="transition-colors duration-300"
                            />
                            <polygon
                              points="14,16 38,16 26,2"
                              fill={isFocused ? item.color : '#94A3B8'}
                              className="transition-colors duration-300"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── MIDDLE ZONE: CONTINUOUS HORIZONTAL RIBBON TRACK (01 TO 08) ─── */}
                  <div className="w-full relative h-[26px] flex items-center justify-center my-0.5">
                    <div
                      style={{
                        backgroundColor: isFocused ? item.color : '#E2E8F0',
                        color: isFocused ? '#FFFFFF' : '#475569',
                        boxShadow: isFocused ? `0 0 12px ${item.glowColor}` : undefined,
                      }}
                      className={`w-full h-[24px] flex items-center justify-center font-black text-[11px] tracking-wider transition-all duration-300 relative ${
                        item.id === 1 ? 'rounded-l-full' : ''
                      } ${item.id === 8 ? 'rounded-r-full' : ''} ${
                        isSelected
                          ? 'scale-y-115 z-20 brightness-110 ring-2 ring-indigo-400'
                          : isFocused
                          ? 'scale-y-110 z-10 brightness-105 ring-2 ring-white/70'
                          : ''
                      }`}
                    >
                      <span>{item.step}</span>

                      {/* Animated spotlight beam */}
                      {isFocused && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-sm" />
                      )}
                    </div>
                  </div>

                  {/* ─── BOTTOM ZONE (FOR 'DOWN' MILESTONES: DOWNWARD ARROW + BADGE + DESC) ─── */}
                  <div className="min-h-[135px] h-[135px] w-full flex flex-col items-center justify-start">
                    {!isUp && (
                      <div
                        style={{
                          transform: isFocused ? 'translateY(2px)' : 'translateY(0)',
                        }}
                        className="flex flex-col items-center text-center transition-transform duration-300 px-0.5 w-full"
                      >
                        {/* Downward Curving Branch Arrow (↓) */}
                        <div className={`mb-0.5 flex flex-col items-center ${isFocused ? 'anim-bounce-down' : ''}`}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 44 46"
                            fill="none"
                            className="transition-all duration-300"
                          >
                            <path
                              d="M 12 0 C 12 16, 26 20, 26 32"
                              stroke={isFocused ? item.color : '#94A3B8'}
                              strokeWidth="9"
                              strokeLinecap="round"
                              className="transition-colors duration-300"
                            />
                            <polygon
                              points="14,30 38,30 26,44"
                              fill={isFocused ? item.color : '#94A3B8'}
                              className="transition-colors duration-300"
                            />
                          </svg>
                        </div>

                        {/* Solid Rectangular Title Badge */}
                        <div
                          style={{
                            backgroundColor: isFocused ? item.color : '#FFFFFF',
                            borderColor: item.color,
                            color: isFocused ? '#FFFFFF' : item.color,
                            boxShadow: isFocused ? `0 4px 12px -2px ${item.glowColor}` : '0 1px 3px rgba(0,0,0,0.06)',
                          }}
                          className={`w-full max-w-[96px] min-h-[36px] py-1 px-1 rounded-lg font-black text-[8.5px] xs:text-[9px] leading-tight transition-all duration-300 border-[1.5px] flex items-center justify-center gap-1 text-center relative ${
                            isSelected
                              ? 'scale-105 ring-2 ring-indigo-400 ring-offset-1 z-20'
                              : isFocused
                              ? 'scale-105 ring-2 ring-white/90 z-10'
                              : 'active:scale-98'
                          }`}
                        >
                          <i className={`fa-solid ${item.icon} text-[9px] shrink-0`} />
                          <span className="break-words leading-tight">{item.badge}</span>

                          {/* Selected Indicator Pin */}
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[7px] shadow-sm">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )}
                        </div>

                        {/* Description Text Below */}
                        <p
                          className={`text-[8.5px] xs:text-[9px] leading-tight mt-1 max-w-[96px] transition-colors duration-300 ${
                            isFocused ? 'text-slate-900 font-bold' : 'text-slate-700 font-semibold'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

