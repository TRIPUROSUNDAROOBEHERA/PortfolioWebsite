import React, { useState, useEffect, useRef } from 'react';

/**
 * IdsFutureScope
 * 
 * FAITHFUL RECREATION OF USER REFERENCE IMAGE 2 (CIRCULAR HUB INFOGRAPHIC WITH CENTRAL GLOWING LIGHT BULB)
 * - Central Hub: Glowing Light Bulb in white circular medallion with radiant rays (rock-solid center positioning)
 * - 9 Collaborative Figures holding up the vision around the circle
 * - 100% SELECTABLE TEXT: All text can be highlighted and selected by the user (no select-none)
 * - MAXIMUM CLARITY: High-contrast typography, crisp card containers, vibrant color coding:
 *   01. Real-Time Detection (#D94828 - Red-Orange)
 *   02. Deep Learning Models (#E06D53 - Coral Orange)
 *   03. Hybrid Models (#D97706 - Amber Gold)
 *   04. Cloud Deployment (#E8899E - Soft Rose)
 *   05. IoT and Smart Devices (#F1B000 - Golden Yellow with IoT badge)
 *   06. Encrypted Traffic Analysis (#3B82F6 - Ocean Blue)
 *   07. Advanced Attack Detection (#6366F1 - Royal Purple)
 *   08. Web and Application Security (#00A896 - Teal Cyan)
 *   09. Automated Response System (#00B06F - Emerald Green)
 */

const HUB_ITEMS = [
  {
    id: 1,
    num: '01',
    angleDeg: -90, // Top (12:00)
    title: 'Real-Time Detection',
    desc: 'Deploy IDS in live network environments for real-time detection.',
    color: '#D94828',
    hoverColor: '#B91C1C',
    badgeBg: 'bg-[#D94828]',
    borderCol: 'border-red-200 hover:border-red-500',
    icon: 'fa-solid fa-gauge-high',
    figX: 580,
    figY: 222,
    cardX: 'left-[420px]',
    cardY: 'top-[12px]',
    width: 'w-[320px]',
  },
  {
    id: 2,
    num: '02',
    angleDeg: -50, // Top-Right (1:20)
    title: 'Deep Learning Models',
    desc: 'Integrate deep learning models (e.g., CNN, LSTM) for better accuracy.',
    color: '#DC583B',
    hoverColor: '#C2410C',
    badgeBg: 'bg-[#DC583B]',
    borderCol: 'border-orange-200 hover:border-orange-500',
    icon: 'fa-solid fa-brain',
    figX: 676,
    figY: 254,
    cardX: 'left-[735px]',
    cardY: 'top-[115px]',
    width: 'w-[305px]',
  },
  {
    id: 3,
    num: '03',
    angleDeg: -10, // Middle-Right (2:40)
    title: 'Hybrid Models',
    desc: 'Combine machine learning and deep learning techniques.',
    color: '#D97706',
    hoverColor: '#B45309',
    badgeBg: 'bg-[#D97706]',
    borderCol: 'border-amber-200 hover:border-amber-500',
    icon: 'fa-solid fa-diagram-project',
    figX: 724,
    figY: 338,
    cardX: 'left-[795px]',
    cardY: 'top-[285px]',
    width: 'w-[315px]',
  },
  {
    id: 4,
    num: '04',
    angleDeg: 30, // Lower-Right (4:00)
    title: 'Cloud Deployment',
    desc: 'Deploy IDS on cloud platforms (AWS, Azure, Google Cloud).',
    color: '#DB2777',
    hoverColor: '#9D174D',
    badgeBg: 'bg-[#DB2777]',
    borderCol: 'border-pink-200 hover:border-pink-500',
    icon: 'fa-solid fa-cloud-arrow-up',
    figX: 706,
    figY: 432,
    cardX: 'left-[770px]',
    cardY: 'top-[455px]',
    width: 'w-[305px]',
  },
  {
    id: 5,
    num: '05',
    angleDeg: 70, // Bottom-Right (5:20)
    title: 'IoT and Smart Devices',
    desc: 'Extend IDS to IoT networks and smart devices.',
    color: '#D97706',
    hoverColor: '#92400E',
    badgeBg: 'bg-[#D97706]',
    borderCol: 'border-amber-200 hover:border-amber-500',
    icon: 'fa-solid fa-network-wired',
    tag: 'IoT',
    figX: 630,
    figY: 494,
    cardX: 'left-[650px]',
    cardY: 'top-[605px]',
    width: 'w-[310px]',
  },
  {
    id: 6,
    num: '06',
    angleDeg: 110, // Bottom-Left (6:40)
    title: 'Encrypted Traffic Analysis',
    desc: 'Develop methods to analyze encrypted network traffic.',
    color: '#2563EB',
    hoverColor: '#1D4ED8',
    badgeBg: 'bg-[#2563EB]',
    borderCol: 'border-blue-200 hover:border-blue-500',
    icon: 'fa-solid fa-lock',
    figX: 530,
    figY: 494,
    cardX: 'right-[650px]',
    cardY: 'top-[605px]',
    width: 'w-[310px]',
  },
  {
    id: 7,
    num: '07',
    angleDeg: 150, // Lower-Left (8:00)
    title: 'Advanced Attack Detection',
    desc: 'Detect new and advanced attack types (e.g., APT, DDoS, botnets).',
    color: '#6366F1',
    hoverColor: '#4338CA',
    badgeBg: 'bg-[#6366F1]',
    borderCol: 'border-indigo-200 hover:border-indigo-500',
    icon: 'fa-solid fa-shield-virus',
    figX: 454,
    figY: 432,
    cardX: 'right-[770px]',
    cardY: 'top-[455px]',
    width: 'w-[305px]',
  },
  {
    id: 8,
    num: '08',
    angleDeg: 190, // Middle-Left (9:20)
    title: 'Web and Application Security',
    desc: 'Integrate IDS with web application firewalls (WAF).',
    color: '#0D9488',
    hoverColor: '#0F766E',
    badgeBg: 'bg-[#0D9488]',
    borderCol: 'border-teal-200 hover:border-teal-500',
    icon: 'fa-solid fa-globe',
    figX: 436,
    figY: 338,
    cardX: 'right-[795px]',
    cardY: 'top-[285px]',
    width: 'w-[315px]',
  },
  {
    id: 9,
    num: '09',
    angleDeg: 230, // Top-Left (10:40)
    title: 'Automated Response System',
    desc: 'Implement automated threat response mechanisms.',
    color: '#059669',
    hoverColor: '#047857',
    badgeBg: 'bg-[#059669]',
    borderCol: 'border-emerald-200 hover:border-emerald-500',
    icon: 'fa-solid fa-robot',
    figX: 484,
    figY: 254,
    cardX: 'right-[735px]',
    cardY: 'top-[115px]',
    width: 'w-[305px]',
  },
];

export default function IdsFutureScope() {
  const [hoveredId, setHoveredId] = useState(null);
  const [animKey, setAnimKey] = useState(1);
  const containerRef = useRef(null);

  // Scroll and Page Refresh Observer to re-trigger animations reliably on mobile and desktop
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let hasTriggered = false;

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // Trigger when top is within 90% of screen height and bottom is visible
      const isVisible = rect.top <= windowHeight * 0.90 && rect.bottom >= 60;

      if (isVisible) {
        if (!hasTriggered) {
          hasTriggered = true;
          setAnimKey((prev) => prev + 1);
        }
      } else {
        if (rect.bottom < -80 || rect.top > windowHeight + 80) {
          hasTriggered = false;
        }
      }
    };

    // 1. Initial check on mount
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 100);
    const t2 = setTimeout(checkVisibility, 350);

    // 2. Scroll listener on modal container and window
    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    // 3. IntersectionObserver as modern observer
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              checkVisibility();
            }
          });
        },
        { root: node.closest('.overflow-y-auto') || null, threshold: 0.1 }
      );
      observer.observe(node);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-2.5 xs:p-3 sm:p-5 lg:px-8 lg:pt-3.5 lg:pb-8 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden select-text"
    >
      {/* ─── SCOPED KEYFRAME ANIMATIONS & TEXT SELECTION STYLES ─── */}
      <style>{`
        ::selection {
          background-color: #38BDF8;
          color: #0F172A;
        }

        /* 1. Central Bulb Back-to-Front Zoom & Golden Light Flash */
        @keyframes idsBulbFlashEnter {
          0% {
            transform: scale(0.12);
            opacity: 0;
            filter: drop-shadow(0 0 0px rgba(250, 204, 21, 0));
          }
          45% {
            transform: scale(1.28);
            opacity: 1;
            filter: drop-shadow(0 0 45px rgba(250, 204, 21, 1)) drop-shadow(0 0 75px rgba(245, 158, 11, 0.95)) drop-shadow(0 0 100px rgba(251, 191, 36, 0.8));
          }
          75% {
            transform: scale(0.95);
            filter: drop-shadow(0 0 28px rgba(250, 204, 21, 0.85)) drop-shadow(0 0 45px rgba(245, 158, 11, 0.6));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.70)) drop-shadow(0 0 28px rgba(245, 158, 11, 0.40));
          }
        }

        /* 2. Central Bulb Continuous Ambient Pulse */
        @keyframes idsBulbPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.70)) drop-shadow(0 0 28px rgba(245, 158, 11, 0.40));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 24px rgba(250, 204, 21, 0.95)) drop-shadow(0 0 40px rgba(245, 158, 11, 0.65));
          }
        }

        /* 3. Golden Light Shockwave Ripple */
        @keyframes idsShockwavePulse {
          0% {
            r: 30px;
            opacity: 0.95;
            stroke-width: 6px;
          }
          60% {
            opacity: 0.6;
            stroke-width: 3.5px;
          }
          100% {
            r: 165px;
            opacity: 0;
            stroke-width: 0.5px;
          }
        }

        /* 4. Vertical Light Flash Beam towards Figure 01 */
        @keyframes idsVerticalBeamFlash {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          35% {
            opacity: 1;
            transform: scaleY(1.15);
            filter: drop-shadow(0 0 10px rgba(217, 72, 40, 0.9));
          }
          70% {
            opacity: 0.85;
            transform: scaleY(1);
          }
          100% {
            opacity: 0.35;
            transform: scaleY(1);
          }
        }

        /* 5. Central Hub Disc Expansion */
        @keyframes idsDiscExpand {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* 6. Sun Rays Spin & Fade */
        @keyframes idsRaysSpinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes idsFadeInSimple {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.9;
          }
        }

        /* 7. Figure Pop-Out Animation (Staggered around circle) */
        @keyframes idsFigurePop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          65% {
            transform: scale(1.22);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* 8. Directional Card Entrance Animations */
        @keyframes idsCardSlideInTop {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.92);
          }
          70% {
            opacity: 1;
            transform: translateY(2px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        @keyframes idsCardSlideInRight {
          0% {
            opacity: 0;
            transform: translateX(24px) scale(0.92);
          }
          70% {
            opacity: 1;
            transform: translateX(-2px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
        }
        @keyframes idsCardSlideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-24px) scale(0.92);
          }
          70% {
            opacity: 1;
            transform: translateX(2px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
        }
        @keyframes idsMobileCardSlide {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
      `}</style>

      {/* Dynamic Key Wrapper ensures 100% clean replay on refresh and scroll */}
      <div key={animKey}>
        {/* ══════════════════════════════════════════════════════════════
            DESKTOP VIEW: AUTHENTIC IMAGE 2 CIRCULAR HUB INFOGRAPHIC
            - 100% SELECTABLE TEXT on all cards
            - Solid centered Light Bulb that never shifts
            - High-clarity typography with crisp card boundaries
           ══════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block relative w-full max-w-[1160px] mx-auto min-h-[695px] select-text">
          {/* SVG Canvas for Wheel, Radiating Rays, and Figures */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1160 695"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Vertical light flash beam gradient (Bulb -> Figure 01) */}
              <linearGradient id="idsVerticalBeam" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#FFC000" stopOpacity="1" />
                <stop offset="100%" stopColor="#D94828" stopOpacity="0.9" />
              </linearGradient>

              {/* Central Glow Radial Gradient */}
              <radialGradient id="idsCentralGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 1. Outer Orbit Guide Ring */}
            <circle
              cx="580"
              cy="350"
              r="142"
              stroke="#F1F5F9"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              style={{
                transformOrigin: '580px 350px',
                animation: 'idsDiscExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards',
              }}
            />

            {/* 2. Central Light Hub Outer Ring */}
            <circle
              cx="580"
              cy="350"
              r="114"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="18"
              style={{
                transformOrigin: '580px 350px',
                animation: 'idsDiscExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s backwards',
              }}
            />
            <circle
              cx="580"
              cy="350"
              r="105"
              fill="#FFFFFF"
              stroke="#F8FAFC"
              strokeWidth="3"
              style={{
                transformOrigin: '580px 350px',
                animation: 'idsDiscExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s backwards',
              }}
            />

            {/* 3. Central Ambient Glow Disc */}
            <circle
              cx="580"
              cy="350"
              r="85"
              fill="url(#idsCentralGlow)"
              style={{
                animation: 'idsFadeInSimple 0.9s ease-out 0.15s backwards',
              }}
            />

            {/* 4. Radiating Sun Rays around the Bulb */}
            <g
              style={{
                transformOrigin: '580px 350px',
                animation: 'idsRaysSpinSlow 50s linear infinite, idsFadeInSimple 0.8s ease-out 0.2s backwards',
              }}
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 580 + 46 * Math.cos(rad);
                const y1 = 350 + 46 * Math.sin(rad);
                const x2 = 580 + 68 * Math.cos(rad);
                const y2 = 350 + 68 * Math.sin(rad);
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#FBBF24"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                );
              })}
            </g>

            {/* 5. Golden Shockwave Ripple Expanding Outward */}
            <circle
              cx="580"
              cy="350"
              fill="none"
              stroke="#FBBF24"
              style={{
                animation: 'idsShockwavePulse 1.1s ease-out 0.22s backwards',
              }}
            />

            {/* 6. Vertical Light Flash Beam from Bulb to Figure 01 */}
            <line
              x1="580"
              y1="315"
              x2="580"
              y2="236"
              stroke="url(#idsVerticalBeam)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                transformOrigin: '580px 315px',
                animation: 'idsVerticalBeamFlash 0.75s ease-out 0.32s backwards',
                filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))',
              }}
            />

            {/* 7. Central Glowing Light Bulb Icon (Zooms from Back to Front with Light Flash) */}
            <g transform="translate(580, 350)">
              {/* Back-to-Front Zoom & Flash Entrance Group */}
              <g
                style={{
                  transformOrigin: '0px 0px',
                  animation: 'idsBulbFlashEnter 0.95s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s backwards',
                }}
              >
                {/* Continuous Ambient Breathing Pulse Group */}
                <g
                  style={{
                    transformOrigin: '0px 0px',
                    animation: 'idsBulbPulse 4s ease-in-out infinite 1.05s',
                  }}
                >
                  {/* Bulb Glass Head */}
                  <path
                    d="M -26 -14 C -26 -32, 26 -32, 26 -14 C 26 0, 15 14, 13 20 L -13 20 C -15 14, -26 0, -26 -14 Z"
                    fill="#FFC000"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                  />
                  {/* Inner Bulb Highlight */}
                  <path
                    d="M -18 -16 C -18 -26, 0 -28, 8 -26"
                    fill="none"
                    stroke="#FFFBEB"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  {/* Filament */}
                  <path
                    d="M -8 4 L -5 -7 L 0 -3 L 5 -7 L 8 4"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Bulb Metallic Screw Base */}
                  <rect x="-11" y="21" width="22" height="4.5" rx="2" fill="#94A3B8" />
                  <rect x="-9.5" y="27" width="19" height="4" rx="1.5" fill="#64748B" />
                  <rect x="-7" y="32.5" width="14" height="3.5" rx="1" fill="#475569" />
                </g>
              </g>
            </g>

            {/* 8. The 9 Stylized Person Figures with Outstretched Arms (Staggered leap outward from bulb) */}
            {HUB_ITEMS.map((item) => {
              const isHovered = hoveredId === item.id;
              const rot = item.angleDeg + 90; // Face outwards
              const itemDelay = 360 + (item.id - 1) * 150;

              return (
                <g
                  key={item.id}
                  transform={`translate(${item.figX}, ${item.figY}) rotate(${rot})`}
                  className="pointer-events-auto"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    transformOrigin: '0px 0px',
                    cursor: 'pointer',
                  }}
                >
                  {/* Inner animated pop group with staggered delay */}
                  <g
                    style={{
                      transformOrigin: '0px 0px',
                      animation: `idsFigurePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${itemDelay}ms backwards`,
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    {/* Figure Head */}
                    <circle
                      cx="0"
                      cy="-24"
                      r={12}
                      fill={isHovered ? (item.hoverColor || item.color) : item.color}
                      filter={isHovered ? 'drop-shadow(0 0 10px rgba(0,0,0,0.4))' : 'drop-shadow(0 0 4px rgba(0,0,0,0.15))'}
                    />

                    {/* Figure Raised Outstretched Arms (U-Shape) */}
                    <path
                      d="M -24 -18 C -22 9, 22 9, 24 -18"
                      fill="none"
                      stroke={isHovered ? (item.hoverColor || item.color) : item.color}
                      strokeWidth={11}
                      strokeLinecap="round"
                    />

                    {/* Torso Base connecting into center disc */}
                    <path
                      d="M -7 4 L 7 4 L 5 18 L -5 18 Z"
                      fill={isHovered ? (item.hoverColor || item.color) : item.color}
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* ══════════════════════════════════════════════════════════════
              THE 9 RADIATING TEXT CARDS (100% SELECTABLE & MAXIMUM CLARITY)
             ══════════════════════════════════════════════════════════════ */}
          {HUB_ITEMS.map((item) => {
            const isHovered = hoveredId === item.id;
            const cardDelay = 420 + (item.id - 1) * 150;

            // Directional slide-in keyframe based on quadrant
            const cardAnimation =
              item.id === 1
                ? `idsCardSlideInTop 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms backwards`
                : item.id >= 2 && item.id <= 5
                ? `idsCardSlideInRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms backwards`
                : `idsCardSlideInLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms backwards`;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group absolute ${item.cardX} ${item.cardY} ${item.width} z-20 select-text cursor-text transition-transform duration-150 ${
                  isHovered ? 'scale-105 z-30' : ''
                }`}
                style={{
                  animation: cardAnimation,
                }}
              >
                {/* High-Clarity Card Container */}
                <div
                  className={`rounded-2xl p-3 sm:p-3.5 border shadow-sm backdrop-blur-xs transition-all duration-150 select-text ${
                    item.borderCol
                  } ${
                    isHovered
                      ? 'bg-white shadow-xl ring-2'
                      : 'bg-white/95'
                  }`}
                  style={{
                    borderColor: isHovered ? (item.hoverColor || item.color) : undefined,
                    boxShadow: isHovered ? `0 10px 28px -4px ${item.color}40` : undefined,
                  }}
                >
                  {/* Header with Number Pill and Title */}
                  <div className="flex items-center gap-2 mb-0.5 select-text">
                    <span
                      className={`w-6 h-6 rounded-lg text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-2xs select-text transition-all duration-150 ${
                        isHovered ? 'scale-110 shadow-md ring-1 ring-white/60' : ''
                      }`}
                      style={{ backgroundColor: isHovered ? (item.hoverColor || item.color) : item.color }}
                    >
                      {item.num}
                    </span>
                    <h4
                      className="text-[14px] sm:text-[15px] font-black tracking-tight leading-tight font-['Outfit',sans-serif] select-text transition-colors duration-150 group-hover:brightness-90"
                      style={{
                        color: isHovered ? (item.hoverColor || item.color) : item.color,
                        textShadow: isHovered ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                      }}
                    >
                      {item.title}
                    </h4>
                    {item.tag && (
                      <span className="text-[9px] font-black bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded ml-auto select-text">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Description Paragraph with Immediate Full Clarity on Mouse Touch/Hover */}
                  <p
                    className={`text-[12px] sm:text-[12.5px] leading-normal select-text transition-colors duration-150 group-hover:text-slate-950 group-hover:font-bold hover:text-black hover:font-bold ${
                      isHovered
                        ? 'text-slate-950 font-bold'
                        : 'text-slate-700 font-semibold'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MOBILE & TABLET VIEW: REPLICA OF IMAGE 2 WITH SCROLL ANIMATIONS
           ══════════════════════════════════════════════════════════════ */}
        <div className="block lg:hidden space-y-3 pt-1 select-text">
          {/* Central Circular Hub with 9 Figures & Glowing Light Bulb for Mobile */}
          <div className="flex items-center justify-center py-1 select-none">
            <div className="w-[200px] h-[200px] xs:w-[230px] xs:h-[230px] sm:w-[270px] sm:h-[270px] aspect-square relative flex items-center justify-center">
              <svg
                viewBox="400 170 360 360"
                className="w-full h-full overflow-visible drop-shadow-sm select-none"
                fill="none"
              >
                <defs>
                  <linearGradient id="idsVerticalBeamMob" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#FFC000" stopOpacity="1" />
                    <stop offset="100%" stopColor="#D94828" stopOpacity="0.9" />
                  </linearGradient>
                  <radialGradient id="idsCentralGlowMob" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 1. Outer Orbit Guide Ring with Expand Animation */}
                <circle
                  cx="580"
                  cy="350"
                  r="142"
                  stroke="#F1F5F9"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  style={{
                    transformOrigin: '580px 350px',
                    animation: 'idsDiscExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards',
                  }}
                />

                {/* 2. Central Light Hub Outer Ring with Expand Animation */}
                <circle
                  cx="580"
                  cy="350"
                  r="114"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="18"
                  style={{
                    transformOrigin: '580px 350px',
                    animation: 'idsDiscExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s backwards',
                  }}
                />
                <circle
                  cx="580"
                  cy="350"
                  r="105"
                  fill="#FFFFFF"
                  stroke="#F8FAFC"
                  strokeWidth="3"
                  style={{
                    transformOrigin: '580px 350px',
                    animation: 'idsDiscExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s backwards',
                  }}
                />

                {/* 3. Central Ambient Glow Disc */}
                <circle
                  cx="580"
                  cy="350"
                  r="85"
                  fill="url(#idsCentralGlowMob)"
                  style={{
                    animation: 'idsFadeInSimple 0.9s ease-out 0.15s backwards',
                  }}
                />

                {/* 4. Radiating Sun Rays around the Bulb */}
                <g
                  style={{
                    transformOrigin: '580px 350px',
                    animation: 'idsRaysSpinSlow 50s linear infinite, idsFadeInSimple 0.8s ease-out 0.2s backwards',
                  }}
                >
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const x1 = 580 + 46 * Math.cos(rad);
                    const y1 = 350 + 46 * Math.sin(rad);
                    const x2 = 580 + 68 * Math.cos(rad);
                    const y2 = 350 + 68 * Math.sin(rad);
                    return (
                      <line
                        key={deg}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#FBBF24"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    );
                  })}
                </g>

                {/* 5. Central Glowing Light Bulb Icon with Flash Enter & Continuous Pulse */}
                <g transform="translate(580, 350)">
                  <g
                    style={{
                      transformOrigin: '0px 0px',
                      animation: 'idsBulbFlashEnter 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.12s backwards, idsBulbPulse 4s ease-in-out 1.25s infinite',
                    }}
                  >
                    {/* Bulb Glass Head */}
                    <path
                      d="M -26 -14 C -26 -32, 26 -32, 26 -14 C 26 0, 15 14, 13 20 L -13 20 C -15 14, -26 0, -26 -14 Z"
                      fill="#FFC000"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                    />
                    {/* Inner Bulb Highlight */}
                    <path
                      d="M -18 -16 C -18 -26, 0 -28, 8 -26"
                      fill="none"
                      stroke="#FFFBEB"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    {/* Filament */}
                    <path
                      d="M -8 4 L -5 -7 L 0 -3 L 5 -7 L 8 4"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Bulb Metallic Screw Base */}
                    <rect x="-11" y="21" width="22" height="4.5" rx="2" fill="#94A3B8" />
                    <rect x="-9.5" y="27" width="19" height="4" rx="1.5" fill="#64748B" />
                    <rect x="-7" y="32.5" width="14" height="3.5" rx="1" fill="#475569" />
                  </g>
                </g>

                {/* 6. The 9 Stylized Person Figures with Staggered Pop-Out Animation */}
                {HUB_ITEMS.map((item, idx) => {
                  const isHovered = hoveredId === item.id;
                  const rot = item.angleDeg + 90;

                  return (
                    <g
                      key={item.id}
                      transform={`translate(${item.figX}, ${item.figY}) rotate(${rot})`}
                      className="pointer-events-auto"
                      onClick={() => setHoveredId(hoveredId === item.id ? null : item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        transformOrigin: '0px 0px',
                        cursor: 'pointer',
                      }}
                    >
                      <g
                        style={{
                          transformOrigin: '0px 0px',
                          animation: `idsFigurePop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.35 + idx * 0.08}s backwards`,
                          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                          transition: 'transform 0.25s ease',
                        }}
                      >
                        <circle
                          cx="0"
                          cy="-24"
                          r={12}
                          fill={isHovered ? (item.hoverColor || item.color) : item.color}
                          filter={isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.35))' : 'drop-shadow(0 0 3px rgba(0,0,0,0.15))'}
                        />
                        <path
                          d="M -24 -18 C -22 9, 22 9, 24 -18"
                          fill="none"
                          stroke={isHovered ? (item.hoverColor || item.color) : item.color}
                          strokeWidth={11}
                          strokeLinecap="round"
                        />
                        <path
                          d="M -7 4 L 7 4 L 5 18 L -5 18 Z"
                          fill={isHovered ? (item.hoverColor || item.color) : item.color}
                        />
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 7. 2-COLUMN RESPONSIVE CARD GRID WITH STAGGERED SCROLL ENTRANCE ANIMATION */}
          <div className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3.5 select-text pt-1">
            {HUB_ITEMS.map((item, idx) => {
              const isHovered = hoveredId === item.id;
              const isLastCard = item.id === 9; // Node 09: Automated Response System

              return (
                <div
                  key={item.id}
                  onClick={() => setHoveredId(hoveredId === item.id ? null : item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group p-2 xs:p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border shadow-2xs transition-all duration-200 select-text cursor-pointer will-change-transform ${
                    isLastCard ? 'col-span-2 max-w-[340px] sm:max-w-none mx-auto w-full' : ''
                  } ${
                    isHovered
                      ? 'shadow-md ring-2 bg-white'
                      : 'border-slate-200/90 hover:shadow-sm hover:border-slate-300'
                  }`}
                  style={{
                    animation: `idsMobileCardSlide 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.45 + idx * 0.08}s backwards`,
                    borderColor: isHovered ? (item.hoverColor || item.color) : undefined,
                    boxShadow: isHovered ? `0 8px 20px -4px ${item.color}35` : undefined,
                  }}
                >
                  <div className="flex items-start gap-1.5 xs:gap-2 sm:gap-2.5 select-text">
                    {/* Number Badge */}
                    <div
                      className={`w-5.5 h-5.5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white shrink-0 text-[9px] xs:text-[10px] sm:text-xs font-black select-text transition-all duration-150 ${
                        isHovered ? 'scale-105 shadow-sm' : 'shadow-2xs'
                      }`}
                      style={{ backgroundColor: isHovered ? (item.hoverColor || item.color) : item.color }}
                    >
                      {item.num}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 select-text">
                      <div className="flex items-center justify-between gap-1 select-text">
                        <h5
                          className="text-[10.5px] xs:text-[11.5px] sm:text-[14px] font-black tracking-tight font-['Outfit',sans-serif] select-text leading-tight"
                          style={{ color: isHovered ? (item.hoverColor || item.color) : item.color }}
                        >
                          {item.title}
                        </h5>
                        {item.tag && (
                          <span className="text-[7.5px] xs:text-[8px] font-black bg-amber-100 text-amber-900 px-1 py-0.2 rounded shrink-0 select-text">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[8.5px] xs:text-[9.5px] sm:text-xs leading-snug mt-1 select-text transition-colors duration-150 ${
                          isHovered
                            ? 'text-slate-950 font-bold'
                            : 'text-slate-600 font-medium'
                        }`}
                      >
                        {item.desc}
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
  );
}
