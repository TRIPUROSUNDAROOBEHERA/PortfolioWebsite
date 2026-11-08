import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterCurvedOverview
 * 
 * Interactive 3-Hexagon Infographic Architecture:
 * - Faithfully inspired by the 2nd image: 3 Hexagonal Infographic Pillars
 *    1. Sky Blue (#0ea5e9 / #0284c7): Number 1 with "The Problem" (glides in from left)
 *    2. Dark Slate (#334155 / #1e293b): Number 2 with "The Solution" (glides up from bottom)
 *    3. Coral Pink (#f43f5e / #e11d48): Number 3 with "Objectives" (glides in from right)
 * - Inside each hexagon: Crisp white house/pentagon badge with soft shadow
 * - In the middle/body: Detailed text content for each pillar
 * - Smooth scroll & refresh detection with slow, cinematic entrance animations
 */

const OVERVIEW_PILLARS = [
  {
    id: 'problem',
    num: '1',
    stepNumber: '01',
    title: 'The Problem',
    tag: 'CHALLENGE',
    primaryColor: '#0ea5e9',
    darkColor: '#0284c7',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    dividerClass: 'bg-sky-500',
    cardBorder: 'border-slate-200/90 hover:border-sky-400 hover:shadow-sky-100/60',
    activeRing: 'ring-2 ring-sky-400 border-sky-400 shadow-lg shadow-sky-900/5',
    gradId: 'hexGradProblem',
    gradFrom: '#38bdf8',
    gradTo: '#0284c7',
    text: 'Language learners frequently struggle with generic learning apps that lack structured learning progression, provide no real-time feedback, or require continuous online connectivity that hinders studying on the go.'
  },
  {
    id: 'solution',
    num: '2',
    stepNumber: '02',
    title: 'The Solution',
    tag: 'ARCHITECTURE',
    primaryColor: '#334155',
    darkColor: '#1e293b',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    dividerClass: 'bg-slate-700',
    cardBorder: 'border-slate-200/90 hover:border-slate-500 hover:shadow-slate-100/60',
    activeRing: 'ring-2 ring-slate-600 border-slate-600 shadow-lg shadow-slate-900/5',
    gradId: 'hexGradSolution',
    gradFrom: '#475569',
    gradTo: '#1e293b',
    text: 'English Master Pro delivers a structured, bite-sized curriculum categorized into Beginner, Intermediate, and Advanced tiers. Integrated quizzes reinforce learning immediately, while offline local caching paired with Firebase Cloud Firestore enables uninterrupted learning anywhere.'
  },
  {
    id: 'objectives',
    num: '3',
    stepNumber: '03',
    title: 'Objectives',
    tag: 'OUTCOMES',
    primaryColor: '#f43f5e',
    darkColor: '#e11d48',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    dividerClass: 'bg-rose-500',
    cardBorder: 'border-slate-200/90 hover:border-rose-400 hover:shadow-rose-100/60',
    activeRing: 'ring-2 ring-rose-400 border-rose-400 shadow-lg shadow-rose-900/5',
    gradId: 'hexGradObjectives',
    gradFrom: '#fb7185',
    gradTo: '#e11d48',
    text: 'English Master Pro makes learning English simple, easy, and interactive. It helps users improve their grammar, vocabulary, speaking, and writing skills. The app provides lessons, daily practice, and tests to support learning. It also tracks progress and helps users build confidence in English communication.'
  }
];

export default function EnglishMasterCurvedOverview() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activePillar, setActivePillar] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);

  const currentSelection = hoveredPillar || activePillar;

  // ─── SCROLL & REFRESH ENTRANCE DETECTION ───
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger animation when section enters viewport
      if (rect.top <= windowHeight * 0.90 && rect.bottom >= 80) {
        setIsVisible(true);
      } else if (rect.bottom < -300 || rect.top > windowHeight + 300) {
        // Reset when scrolled far away so scrolling back down replays the animation
        setIsVisible(false);
      }
    };

    // Immediate & delayed checks on mount / page refresh
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 60);
    const t2 = setTimeout(checkVisibility, 180);
    const t3 = setTimeout(checkVisibility, 400);

    // IntersectionObserver for viewport entry
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(node);
    }

    // Scroll listeners on nearest scrollable ancestor (.overflow-y-auto) & window
    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (observer && node) observer.unobserve(node);
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border border-slate-200/80 p-5 sm:p-7 md:p-8 shadow-xs transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* ─── INLINE STYLES FOR FLOATING AND PULSE ANIMATIONS ─── */}
      <style>{`
        @keyframes hexFloat1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes hexFloat2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes hexFloat3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes shimmerLine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .anim-hex-1 {
          animation: hexFloat1 4.2s ease-in-out infinite;
        }
        .anim-hex-2 {
          animation: hexFloat2 4.8s ease-in-out 0.6s infinite;
        }
        .anim-hex-3 {
          animation: hexFloat3 4.5s ease-in-out 1.2s infinite;
        }
        .shimmer-track {
          background: linear-gradient(90deg, rgba(14,165,233,0.3) 0%, rgba(51,65,85,0.4) 50%, rgba(244,63,94,0.3) 100%);
          background-size: 200% 100%;
          animation: shimmerLine 6s linear infinite;
        }
      `}</style>

      {/* ─── CONNECTING TRACK BEHIND HEXAGONS (DESKTOP ONLY) ─── */}
      <div
        className={`hidden md:block absolute top-[110px] left-[18%] right-[18%] h-1 shimmer-track rounded-full -z-0 pointer-events-none transition-all duration-1000 ${
          isVisible ? 'opacity-60 scale-x-100' : 'opacity-0 scale-x-50'
        }`}
        style={{ transitionDelay: '400ms' }}
      ></div>

      {/* ─── 3 HEXAGONAL PILLARS GRID (SIDE-BY-SIDE ON ALL VIEWPORTS) ─── */}
      <div className="relative z-10 grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-6 md:gap-6.5 items-stretch">
        {OVERVIEW_PILLARS.map((p, idx) => {
          const isSelected = currentSelection === p.id;
          const floatClass = idx === 0 ? 'anim-hex-1' : idx === 1 ? 'anim-hex-2' : 'anim-hex-3';

          // Directional Entrance Animations:
          // Left Card (0 - The Problem): slowly coming in from left
          // Middle Card (1 - The Solution): slowly rising up from bottom
          // Right Card (2 - Objectives): slowly coming in from right
          let motionClass = '';
          let motionStyle = {};

          if (idx === 0) {
            // Left Side: The Problem glides in from the left
            motionClass = isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-16 sm:-translate-x-24 pointer-events-none';
            motionStyle = {
              transition: 'transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms ease-out',
              transitionDelay: '0ms',
            };
          } else if (idx === 1) {
            // Middle: The Solution glides up from the bottom
            motionClass = isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-16 sm:translate-y-20 scale-95 pointer-events-none';
            motionStyle = {
              transition: 'transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms ease-out',
              transitionDelay: '180ms',
            };
          } else {
            // Right Side: Objectives glides in from the right
            motionClass = isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-16 sm:translate-x-24 pointer-events-none';
            motionStyle = {
              transition: 'transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms ease-out',
              transitionDelay: '360ms',
            };
          }

          return (
            <div
              key={p.id}
              onClick={() => setActivePillar(activePillar === p.id ? null : p.id)}
              onMouseEnter={() => setHoveredPillar(p.id)}
              onMouseLeave={() => setHoveredPillar(null)}
              className={`bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-6 border flex flex-col justify-between cursor-pointer group transition-shadow duration-300 ${motionClass} ${
                isSelected
                  ? `${p.activeRing}`
                  : `${p.cardBorder} shadow-xs hover:shadow-md`
              }`}
              style={motionStyle}
            >
              <div>
                {/* ─── TOP: EXACT REPLICA OF IMAGE 2 HEXAGON ─── */}
                <div className="flex justify-center mb-1 xs:mb-1.5 sm:mb-5">
                  <div className={`relative transition-transform duration-300 ${floatClass} group-hover:scale-105`}>
                    <svg
                      viewBox="0 0 160 180"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[55px] xs:w-[70px] sm:w-[148px] h-auto filter drop-shadow-md group-hover:drop-shadow-xl transition-all"
                    >
                      <defs>
                        {/* Outer Hexagon Gradient */}
                        <linearGradient id={p.gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={p.gradFrom} />
                          <stop offset="100%" stopColor={p.gradTo} />
                        </linearGradient>

                        {/* Inner White Pentagon Drop Shadow */}
                        <filter id={`shadow-${p.id}`} x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.22" />
                        </filter>
                      </defs>

                      {/* 1. Outer Colored Hexagon (Image 2) */}
                      <polygon
                        points="80,4 156,47 156,133 80,176 4,133 4,47"
                        fill={`url(#${p.gradId})`}
                      />

                      {/* 2. Inner White Pentagon/House Shape with Drop Shadow (Image 2) */}
                      <polygon
                        points="28,46 132,46 132,120 80,154 28,120"
                        fill="#FFFFFF"
                        filter={`url(#shadow-${p.id})`}
                      />

                      {/* Title Text inside the White Shield */}
                      <text
                        x="80"
                        y="98"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="13.5"
                        fontWeight="800"
                        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                        fill={p.darkColor}
                        letterSpacing="0.2"
                      >
                        {p.title}
                      </text>
                    </svg>
                  </div>
                </div>

                {/* ─── TEXT CONTENT: ALL CONTENT TEXT SLOWLY COMING IN TO SHOW FULLY ─── */}
                <div
                  className={`pt-1 transition-all duration-700 select-text ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                  style={{ transitionDelay: idx === 0 ? '350ms' : idx === 1 ? '500ms' : '650ms' }}
                >
                  <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-slate-600 leading-tight xs:leading-snug sm:leading-relaxed font-normal text-center sm:text-left selection:bg-rose-500 selection:text-white">
                    {p.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
