import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterRoadmapOutcome
 * 
 * Tangent Concentric Circles Architecture & Scope Hierarchy:
 * - Faithfully inspired by Image 1 (Role-Based Access Control Structure)
 * - 4 Concentric circles tangent at the common bottom base:
 *    Level 1 (Innermost - Lime Green #84cc16 / #65a30d): Current Application
 *    Level 2 (Second - Emerald Green #10b981 / #059669): Smart Learning
 *    Level 3 (Third - Sky Blue #0ea5e9 / #0284c7): Advanced Features
 *    Level 4 (Outermost - Royal Blue #3b82f6 / #2563eb): Future Expansion
 * - Left-column descriptions precisely aligned with each circle level
 * - Interactive 2-way hover synchronization between descriptions and circle rings
 * - Smooth CSS ripple wave, breathing float animations, and glow transitions
 * - Expected Outcome callout banner preserved cleanly below
 */

export const LEVELS = [
  {
    id: 4,
    badge: 'Phase 04 • Global Scale',
    title: 'Future Expansion',
    desc: 'Publish on app stores, improve accessibility, and expand the learning experience for more users.',
    strokeColor: '#3B82F6',
    activeStroke: '#2563EB',
    textColor: '#2563EB',
    lightFill: 'rgba(59, 130, 246, 0.04)',
    hoverFill: 'rgba(59, 130, 246, 0.12)',
    bgCard: 'bg-blue-50/60',
    borderCard: 'border-blue-400',
    ringCard: 'ring-blue-400',
    glowFilter: 'url(#glowBlue)',
    tagBg: 'bg-blue-100 text-blue-700 border-blue-200',
    // Tangent circle geometry in viewBox 0 0 500 500 (tangent base at y = 465)
    r: 216,
    cy: 249,
    textY: 85,
  },
  {
    id: 3,
    badge: 'Phase 03 • Scaled Platform',
    title: 'Advanced Features',
    desc: 'Introduce detailed analytics, gamification, downloadable lessons, and multilingual support.',
    strokeColor: '#0EA5E9',
    activeStroke: '#0284C7',
    textColor: '#0284C7',
    lightFill: 'rgba(14, 165, 233, 0.05)',
    hoverFill: 'rgba(14, 165, 233, 0.14)',
    bgCard: 'bg-sky-50/60',
    borderCard: 'border-sky-400',
    ringCard: 'ring-sky-400',
    glowFilter: 'url(#glowSky)',
    tagBg: 'bg-sky-100 text-sky-700 border-sky-200',
    r: 164,
    cy: 301,
    textY: 189,
  },
  {
    id: 2,
    badge: 'Phase 02 • Intelligent Learning',
    title: 'Smart Learning',
    desc: 'Add AI-based recommendations, personalized lessons, and improved pronunciation practice.',
    strokeColor: '#10B981',
    activeStroke: '#059669',
    textColor: '#059669',
    lightFill: 'rgba(16, 185, 129, 0.06)',
    hoverFill: 'rgba(16, 185, 129, 0.16)',
    bgCard: 'bg-emerald-50/60',
    borderCard: 'border-emerald-400',
    ringCard: 'ring-emerald-400',
    glowFilter: 'url(#glowEmerald)',
    tagBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    r: 112,
    cy: 353,
    textY: 293,
  },
  {
    id: 1,
    badge: 'Phase 01 • Core Foundation',
    title: 'Current Application',
    desc: 'Flutter app, student authentication, learning modules, quizzes, and Firebase integration.',
    strokeColor: '#84CC16',
    activeStroke: '#65A30D',
    textColor: '#65A30D',
    lightFill: 'rgba(132, 204, 22, 0.08)',
    hoverFill: 'rgba(132, 204, 22, 0.20)',
    bgCard: 'bg-lime-50/60',
    borderCard: 'border-lime-400',
    ringCard: 'ring-lime-400',
    glowFilter: 'url(#glowLime)',
    tagBg: 'bg-lime-100 text-lime-800 border-lime-200',
    r: 60,
    cy: 405,
    textY: 400,
    isCenterDoubleLine: true,
  },
];

const CYCLE_ORDER = [1, 2, 3, 4]; // Phase 01 -> Phase 02 -> Phase 03 -> Phase 04

/**
 * EnglishMasterConcentricDiagram
 * Pure visual component of the Concentric Tangent Circles diagram
 * for seamless embedding into the single unified roadmap card.
 * Features:
 * - Automatic sequential spotlight animation across Phase 01 to 04
 * - Synchronized highlighting between Left Card and Right Tangent Circle
 * - Instant freeze/pause on mouse hover or touch for effortless reading
 * - Click-to-lock on any phase with instant "Resume Auto" toggle
 * - Step pills (01, 02, 03, 04) showing real-time automatic progress
 */
export function EnglishMasterConcentricDiagram({
  onSwitchToRibbon,
  onSwitchToConcentric,
  hideHeader = false,
  controlledActiveId = null,
  isPausedProp = false,
  onSelectPhase = null,
  onHoverChange = null,
}) {
  const [autoIndex, setAutoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Trigger entrance animation on mount / page display
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Active level calculation:
  // 1. Explicitly clicked phase takes top priority
  // 2. Mouse hover phase takes second priority (while hovered)
  // 3. Otherwise, internal automatic continuous cycling phase
  const activeId =
    selectedId !== null
      ? selectedId
      : hoveredId !== null
      ? hoveredId
      : controlledActiveId !== null
      ? controlledActiveId
      : CYCLE_ORDER[autoIndex];

  // Automatic sequential cycle across levels (Phase 01 -> 02 -> 03 -> 04 -> repeat)
  useEffect(() => {
    if (!isAutoPlaying || selectedId !== null || isPausedProp) return;

    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % CYCLE_ORDER.length);
    }, 2300);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedId, isPausedProp]);

  // If user clicked to lock a phase, automatically resume cycling after 6 seconds
  useEffect(() => {
    if (selectedId === null) return;
    const resumeTimer = setTimeout(() => {
      setSelectedId(null);
      setIsAutoPlaying(true);
      if (onSelectPhase) onSelectPhase(null);
    }, 6000);
    return () => clearTimeout(resumeTimer);
  }, [selectedId, onSelectPhase]);

  // Click handler to lock or toggle off a phase
  const handleToggleSelect = (id) => {
    if (selectedId === id) {
      setSelectedId(null);
      setIsAutoPlaying(true);
      if (onSelectPhase) onSelectPhase(null);
    } else {
      setSelectedId(id);
      if (onSelectPhase) onSelectPhase(id);
    }
  };

  const handleMouseEnter = () => {
    if (onHoverChange) onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    if (onHoverChange) onHoverChange(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={() => {
        setTimeout(handleMouseLeave, 2000);
      }}
      className="relative w-full"
    >
      {/* ─── INLINE STYLES FOR FLUID ANIMATIONS & TRANSITIONS ─── */}
      <style>{`
        @keyframes ringSpinDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 80; }
        }
        @keyframes breatheDiagram {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.7; }
        }
        @keyframes notchPoint {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .anim-breathe-subtle {
          animation: breatheDiagram 6s ease-in-out infinite;
        }
        .anim-dash-travel {
          stroke-dasharray: 8 8;
          animation: ringSpinDash 4.5s linear infinite;
        }
        .anim-pulse-dot {
          animation: pulseDot 1.6s ease-in-out infinite;
        }
        .anim-notch {
          animation: notchPoint 1.2s ease-in-out infinite;
        }
      `}</style>

      {/* ─── ARCHITECTURE ROADMAP HEADING & VIEW SWITCHER (OPTIONAL) ─── */}
      {!hideHeader && (
        <div className="relative z-10 mb-4 sm:mb-5 pb-2.5 border-b border-sky-100/80 flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Architecture Roadmap
          </h4>
          {onSwitchToRibbon && (
            <div className="inline-flex p-0.5 bg-slate-100/90 rounded-lg border border-slate-200/80 text-xs font-bold">
              <button
                onClick={onSwitchToRibbon}
                className="px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <i className="fa-solid fa-shapes text-emerald-600"></i>
                Ribbon Roadmap
              </button>
              <button
                className="px-2.5 py-1 rounded-md bg-white text-blue-800 shadow-xs font-extrabold cursor-default flex items-center gap-1.5"
              >
                <i className="fa-solid fa-circle-nodes text-blue-600"></i>
                Concentric Circles
              </button>
            </div>
          )}
        </div>
      )}



      {/* ─── 2-COLUMN SIDE-BY-SIDE LAYOUT: DESCRIPTIONS (LEFT) + CONCENTRIC CIRCLES (RIGHT) (MATCHES IMAGE 2 TYPE) ─── */}
      <div className="relative z-10 grid grid-cols-12 items-center gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-8">
        
        {/* ─── LEFT COLUMN: 4 DESCRIPTIONS SYNCHRONIZED WITH CIRCLE TIERS ─── */}
        <div className="col-span-7 sm:col-span-6 md:col-span-6 flex flex-col justify-between space-y-1.5 xs:space-y-2 sm:space-y-3.5 md:space-y-4">
          {LEVELS.map((lvl, lIdx) => {
            const isActive = activeId === lvl.id;

            return (
              <div
                key={lvl.id}
                onMouseEnter={() => setHoveredId(lvl.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleToggleSelect(lvl.id)}
                className={`relative p-2 xs:p-2.5 sm:p-4 md:p-4.5 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `${lvl.bgCard} ${lvl.borderCard} shadow-md shadow-slate-900/10 -translate-y-0.5 md:translate-x-2 scale-[1.01]`
                    : 'bg-white/70 border-slate-200/80 hover:border-slate-300 hover:bg-white/95 opacity-85 hover:opacity-100'
                }`}
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated
                    ? (isActive ? 'translateX(0) scale(1.01)' : 'translateX(0)')
                    : 'translateX(-50px)',
                  filter: hasAnimated ? 'blur(0px)' : 'blur(3px)',
                  transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease-out, filter 0.75s ease-out',
                  transitionDelay: `${lIdx * 100 + 60}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Active Indicator Accent Bar on Right (Facing Circle Diagram - Image 2 Replica) */}
                <div
                  className="block absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 rounded-l-full transition-all duration-300"
                  style={{
                    backgroundColor: lvl.activeStroke,
                    height: isActive ? '75%' : '0%',
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* Right Arrow Notch pointing toward matching circle when active */}
                {isActive && (
                  <div
                    className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 items-center justify-center anim-notch text-xs"
                    style={{ color: lvl.activeStroke }}
                  >
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                )}

                {/* Header Row: Title & Phase Badge Pill */}
                <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1.5 flex-wrap">
                  <h5
                    className="text-[10px] xs:text-[11px] sm:text-base font-bold tracking-tight transition-colors duration-200 leading-tight"
                    style={{ color: isActive ? lvl.activeStroke : lvl.textColor }}
                  >
                    {lvl.title}
                  </h5>
                  <span className={`text-[7px] xs:text-[8px] sm:text-[10.5px] font-bold px-1.5 py-0.2 sm:px-2.5 sm:py-0.5 rounded-full border whitespace-nowrap ${lvl.tagBg}`}>
                    {lvl.badge}
                  </span>
                </div>

                {/* Description Text */}
                <p
                  className={`text-[7.5px] xs:text-[8.5px] sm:text-xs md:text-[13px] leading-tight sm:leading-relaxed transition-colors duration-200 ${
                    isActive ? 'text-slate-800 font-medium' : 'text-slate-600 font-normal'
                  }`}
                >
                  {lvl.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── RIGHT COLUMN: CONCENTRIC TANGENT CIRCLES SVG (IMAGE 1 REPLICA) ─── */}
        <div
          className="col-span-5 sm:col-span-6 md:col-span-6 flex items-center justify-center relative py-1 sm:py-2"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'scale(1)' : 'scale(0.86)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
            transition: 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 0.85s ease-out 120ms, filter 0.85s ease-out 120ms',
            willChange: 'transform, opacity'
          }}
        >
          
          <div className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] aspect-square relative anim-breathe-subtle">
            
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible select-none"
            >
              <defs>
                {/* Glow Filters for Active Circles */}
                <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#2563EB" floodOpacity="0.75" />
                </filter>
                <filter id="glowSky" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.75" />
                </filter>
                <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#059669" floodOpacity="0.75" />
                </filter>
                <filter id="glowLime" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#65A30D" floodOpacity="0.75" />
                </filter>

                {/* Subtle Radial Fills */}
                <radialGradient id="gradRadBlue" cx="50%" cy="90%" r="70%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.03" />
                </radialGradient>
                <radialGradient id="gradRadSky" cx="50%" cy="90%" r="70%">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.04" />
                </radialGradient>
                <radialGradient id="gradRadEmerald" cx="50%" cy="90%" r="70%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </radialGradient>
                <radialGradient id="gradRadLime" cx="50%" cy="90%" r="70%">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#84CC16" stopOpacity="0.08" />
                </radialGradient>
              </defs>

              {/* ─── 4 TANGENT CIRCLES (OUTER TO INNER ORDER FOR PROPER DOM STACKING) ─── */}
              {LEVELS.map((lvl) => {
                const isActive = activeId === lvl.id;

                return (
                  <g
                    key={`circle-${lvl.id}`}
                    onMouseEnter={() => setHoveredId(lvl.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleToggleSelect(lvl.id)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {/* Circle Perimeter with Tangent Base at (250, 465) */}
                    <circle
                      cx="250"
                      cy={lvl.cy}
                      r={lvl.r}
                      fill={isActive ? lvl.hoverFill : lvl.lightFill}
                      stroke={isActive ? lvl.activeStroke : lvl.strokeColor}
                      strokeWidth={isActive ? '4' : '2.2'}
                      filter={isActive ? lvl.glowFilter : 'none'}
                      className="transition-all duration-300"
                    />

                    {/* Animated Dashed Traveling Halo on Active Phase */}
                    {isActive && (
                      <circle
                        cx="250"
                        cy={lvl.cy}
                        r={lvl.r}
                        fill="none"
                        stroke={lvl.activeStroke}
                        strokeWidth="1.8"
                        className="anim-dash-travel opacity-85"
                      />
                    )}
                  </g>
                );
              })}

              {/* ─── TANGENT POINT ANCHOR INDICATOR AT BOTTOM CENTER (250, 465) ─── */}
              <circle
                cx="250"
                cy="465"
                r={activeId === 1 ? '5' : '3.5'}
                fill={activeId === 1 ? '#84CC16' : '#64748B'}
                opacity={activeId === 1 ? 1 : 0.6}
                className="transition-all duration-300"
              />

              {/* ─── CIRCLE LABELS CENTERED IN UPPER TIERS (IMAGE 1 REPLICA) ─── */}
              {LEVELS.map((lvl) => {
                const isActive = activeId === lvl.id;

                if (lvl.isCenterDoubleLine) {
                  // Level 1: Innermost Circle Center ("Current Application" on 2 centered lines)
                  return (
                    <g
                      key={`text-${lvl.id}`}
                      onMouseEnter={() => setHoveredId(lvl.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleToggleSelect(lvl.id)}
                      className="cursor-pointer pointer-events-auto"
                    >
                      <text
                        x="250"
                        y="397"
                        textAnchor="middle"
                        fill={isActive ? lvl.activeStroke : lvl.textColor}
                        fontSize={isActive ? '21' : '19'}
                        fontWeight={isActive ? '800' : '700'}
                        letterSpacing="-0.01em"
                        className="transition-all duration-300 drop-shadow-2xs"
                      >
                        Current
                      </text>
                      <text
                        x="250"
                        y="418"
                        textAnchor="middle"
                        fill={isActive ? lvl.activeStroke : lvl.textColor}
                        fontSize={isActive ? '21' : '19'}
                        fontWeight={isActive ? '800' : '700'}
                        letterSpacing="-0.01em"
                        className="transition-all duration-300 drop-shadow-2xs"
                      >
                        Application
                      </text>
                    </g>
                  );
                }

                // Levels 2, 3, 4: Centered in the top arc space of their respective bands
                return (
                  <g
                    key={`text-${lvl.id}`}
                    onMouseEnter={() => setHoveredId(lvl.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleToggleSelect(lvl.id)}
                    className="cursor-pointer pointer-events-auto"
                  >
                    <text
                      x="250"
                      y={lvl.textY}
                      textAnchor="middle"
                      fill={isActive ? lvl.activeStroke : lvl.textColor}
                      fontSize={isActive ? '24' : '21'}
                      fontWeight={isActive ? '800' : '700'}
                      letterSpacing="-0.01em"
                      className="transition-all duration-300 drop-shadow-2xs"
                    >
                      {lvl.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
}

/**
 * Default export: Renders Expected Outcome section
 * Left side: Comprehensive Outcome details and core learning pillars
 * Right side: Interactive English Master Pro video showcase
 */
export default function EnglishMasterRoadmapOutcome({ selectedProject }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoSrc = selectedProject?.video || '/english-master-demo.mp4';

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="pt-0 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── EXPECTED OUTCOME SECTION ─── */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          Expected Outcome
        </h3>

        {/* ─── ONE UNIFIED ROUND SHAPE CONTAINER FOR LEFT CONTENT & RIGHT VIDEO (SIDE-BY-SIDE MATCHING IMAGE 2) ─── */}
        <div className="p-2 xs:p-2.5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-sky-50/70 border border-blue-200/80 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-12 lg:grid-cols-[45.5%_1fr] gap-2 xs:gap-2.5 sm:gap-5 lg:gap-6 items-stretch">
            
            {/* ─── LEFT SIDE: OUTCOME OVERVIEW & CORE LEARNING IMPACTS ─── */}
            <div className="col-span-6 lg:col-span-1 flex flex-col justify-between space-y-1.5 xs:space-y-2 sm:space-y-4 min-w-0">
              
              {/* Primary Outcome Text */}
              <div className="space-y-1 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] xs:text-[9px] sm:text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Core Learning Impact
                </div>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[13px] sm:text-sm text-slate-700 leading-tight sm:leading-relaxed font-normal">
                  <strong className="font-semibold text-slate-900">English Master Pro</strong> aims to become a smart, interactive, and user-friendly platform that helps learners improve their English grammar, vocabulary, speaking, and writing skills.
                </p>
              </div>

              {/* 4 Outcome Pillars (2x2 Grid Matching Image 2) */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
                <div className="p-1.5 xs:p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded sm:rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[8px] xs:text-[9px] sm:text-xs shrink-0">
                      <i className="fa-solid fa-brain"></i>
                    </div>
                    <h5 className="text-[8px] xs:text-[9px] sm:text-xs font-bold text-slate-900 leading-tight">Smart &amp; Adaptive</h5>
                  </div>
                  <p className="text-[7px] xs:text-[7.5px] sm:text-[11.5px] text-slate-600 leading-tight sm:leading-relaxed font-normal">
                    AI recommendations &amp; personalized lessons.
                  </p>
                </div>

                <div className="p-1.5 xs:p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded sm:rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-[8px] xs:text-[9px] sm:text-xs shrink-0">
                      <i className="fa-solid fa-microphone-lines"></i>
                    </div>
                    <h5 className="text-[8px] xs:text-[9px] sm:text-xs font-bold text-slate-900 leading-tight">Speaking &amp; Fluency</h5>
                  </div>
                  <p className="text-[7px] xs:text-[7.5px] sm:text-[11.5px] text-slate-600 leading-tight sm:leading-relaxed font-normal">
                    Interactive drills &amp; pronunciation feedback.
                  </p>
                </div>

                <div className="p-1.5 xs:p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded sm:rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-[8px] xs:text-[9px] sm:text-xs shrink-0">
                      <i className="fa-solid fa-spell-check"></i>
                    </div>
                    <h5 className="text-[8px] xs:text-[9px] sm:text-xs font-bold text-slate-900 leading-tight">Grammar &amp; Vocab</h5>
                  </div>
                  <p className="text-[7px] xs:text-[7.5px] sm:text-[11.5px] text-slate-600 leading-tight sm:leading-relaxed font-normal">
                    Structured rules &amp; dynamic flashcards.
                  </p>
                </div>

                <div className="p-1.5 xs:p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/90 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded sm:rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-[8px] xs:text-[9px] sm:text-xs shrink-0">
                      <i className="fa-solid fa-cloud-arrow-down"></i>
                    </div>
                    <h5 className="text-[8px] xs:text-[9px] sm:text-xs font-bold text-slate-900 leading-tight">Offline &amp; Cloud Sync</h5>
                  </div>
                  <p className="text-[7px] xs:text-[7.5px] sm:text-[11.5px] text-slate-600 leading-tight sm:leading-relaxed font-normal">
                    Local cache with Cloud Firestore sync.
                  </p>
                </div>
              </div>

              {/* Bottom Outcome Pills */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 pt-1 sm:pt-2 border-t border-blue-200/60">
                <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md text-[6.5px] xs:text-[7.5px] sm:text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs flex items-center gap-1 sm:gap-1.5">
                  <i className="fa-solid fa-bolt text-amber-500 text-[6px] sm:text-[10px]"></i> Instant Quizzes
                </span>
                <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md text-[6.5px] xs:text-[7.5px] sm:text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs flex items-center gap-1 sm:gap-1.5">
                  <i className="fa-solid fa-chart-line text-emerald-500 text-[6px] sm:text-[10px]"></i> Progress Telemetry
                </span>
                <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md text-[6.5px] xs:text-[7.5px] sm:text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs flex items-center gap-1 sm:gap-1.5">
                  <i className="fa-solid fa-certificate text-purple-500 text-[6px] sm:text-[10px]"></i> Completion Badges
                </span>
              </div>

            </div>

            {/* ─── RIGHT SIDE: INTERACTIVE VIDEO DEMO (EXPANDED TO FILL TOP & BOTTOM HEIGHT ON MOBILE) ─── */}
            <div className="col-span-6 lg:col-span-1 flex flex-col justify-between space-y-1 xs:space-y-1.5 sm:space-y-3.5 min-w-0 h-full">
              
              {/* Top Bar above Video matching Left Side Header */}
              <div className="flex items-center">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] xs:text-[9px] sm:text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Interactive Demo Preview
                </div>
              </div>

              {/* Video Player in Rounded Frame - Expanded to fill top & bottom height on mobile */}
              <div className="relative w-full flex-1 min-h-[115px] xs:min-h-[125px] sm:min-h-0 sm:aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-md border border-slate-700/60 bg-black group/video my-0.5 sm:my-auto flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover sm:object-contain"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Unmute Toggle Overlay Button */}
                <div className="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 flex items-center gap-1 sm:gap-2 z-20">
                  <button
                    type="button"
                    onClick={toggleMute}
                    title={isMuted ? "Unmute sound" : "Mute sound"}
                    className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-lg bg-black/80 hover:bg-black/95 text-white text-[7px] xs:text-[8px] sm:text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 sm:gap-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <i className={`fa-solid ${isMuted ? 'fa-volume-xmark text-rose-400' : 'fa-volume-high text-emerald-400'} text-[7px] sm:text-xs`}></i>
                    <span className="text-[7px] xs:text-[8px] sm:text-[11px] font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Caption & Pills: App Walkthrough on left, Live UI Demo on right corner side */}
              <div className="flex items-center justify-between gap-1 sm:gap-2 pt-1 sm:pt-2 border-t border-blue-200/60">
                <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md text-[6.5px] xs:text-[7.5px] sm:text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs flex items-center gap-1 sm:gap-1.5">
                  <i className="fa-solid fa-play text-blue-600 text-[6px] sm:text-[10px]"></i> App Walkthrough
                </span>
                <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-md text-[6.5px] xs:text-[7.5px] sm:text-[11px] font-semibold bg-white/90 text-slate-700 border border-slate-200/80 shadow-2xs flex items-center gap-1 sm:gap-1.5">
                  <i className="fa-solid fa-mobile-screen text-emerald-600 text-[6px] sm:text-[10px]"></i> Live UI Demo
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
