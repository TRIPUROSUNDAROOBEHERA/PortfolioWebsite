import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterTechStackFlow
 * 
 * Clean 1:1 replica of Image 2 ("Infographic Clipart"):
 * - Arch-top bookmark pillar tags with 3D origami folded ribbon tails
 * - Floating white circular disc centered in the arch with clean icon (all numbers removed)
 * - Category title in bold white font centered on the colored ribbon face
 * - 3D origami folded underside flap at bottom-left with realistic shadow gradient
 * - Technology values and descriptions positioned directly underneath each ribbon (no "STEP 01" labels)
 * - Single row continuous horizontal layout
 * - All clutter, numbers, and bottom banners completely removed as requested
 */

const TECH_STACK_DATA = [
  {
    id: 1,
    category: 'Programming Language',
    value: 'Dart',
    subtitle: 'Core Language',
    role: 'Object-Oriented Client Language',
    icon: 'fa-code',
    colors: {
      frontLight: '#1e6088',
      frontDark: '#2980b9',
      foldDark: '#103850',
      foldMid: '#164360',
      foldDeep: '#0b2433',
      accent: '#2980b9',
      glow: 'rgba(41, 128, 185, 0.45)',
    },
  },
  {
    id: 2,
    category: 'Framework',
    value: 'Flutter',
    subtitle: 'UI Framework',
    role: 'Cross-Platform Native SDK',
    icon: 'fa-layer-group',
    colors: {
      frontLight: '#14a3a5',
      frontDark: '#16a085',
      foldDark: '#094a4c',
      foldMid: '#0d6365',
      foldDeep: '#063435',
      accent: '#16a085',
      glow: 'rgba(22, 160, 133, 0.45)',
    },
  },
  {
    id: 3,
    category: 'Authentication',
    value: 'Firebase Auth',
    subtitle: 'Firebase Authentication',
    role: 'User Identity & Token Auth',
    icon: 'fa-shield-halved',
    colors: {
      frontLight: '#df3544',
      frontDark: '#d63031',
      foldDark: '#6c151b',
      foldMid: '#8b1c24',
      foldDeep: '#4a0e13',
      accent: '#d63031',
      glow: 'rgba(214, 48, 49, 0.45)',
    },
  },
  {
    id: 4,
    category: 'Cloud Database',
    value: 'Cloud Firestore',
    subtitle: 'NoSQL Database',
    role: 'Real-time Document Storage',
    icon: 'fa-database',
    colors: {
      frontLight: '#f39c12',
      frontDark: '#e67e22',
      foldDark: '#7d4310',
      foldMid: '#9c5415',
      foldDeep: '#572e09',
      accent: '#e67e22',
      glow: 'rgba(230, 126, 34, 0.45)',
    },
  },
  {
    id: 5,
    category: 'Development IDE',
    value: 'Android Studio / VS Code',
    subtitle: 'Android Studio / VS Code',
    role: 'Integrated Dev Environment',
    icon: 'fa-laptop-code',
    colors: {
      frontLight: '#10b981',
      frontDark: '#059669',
      foldDark: '#064e3b',
      foldMid: '#09694f',
      foldDeep: '#033326',
      accent: '#059669',
      glow: 'rgba(5, 150, 105, 0.45)',
    },
  },
  {
    id: 6,
    category: 'Platform',
    value: 'Android & iOS',
    subtitle: 'Android and iOS',
    role: 'Target Operating Systems',
    icon: 'fa-mobile-screen',
    colors: {
      frontLight: '#3b82f6',
      frontDark: '#2563eb',
      foldDark: '#1e3a8a',
      foldMid: '#1d4ed8',
      foldDeep: '#172554',
      accent: '#2563eb',
      glow: 'rgba(37, 99, 235, 0.45)',
    },
  },
  {
    id: 7,
    category: 'Version Control',
    value: 'Git & GitHub',
    subtitle: 'Git and GitHub',
    role: 'Distributed VCS & CI/CD',
    icon: 'fa-code-branch',
    colors: {
      frontLight: '#dc2626',
      frontDark: '#b91c1c',
      foldDark: '#5f0f0f',
      foldMid: '#7a1414',
      foldDeep: '#420909',
      accent: '#b91c1c',
      glow: 'rgba(185, 28, 28, 0.45)',
    },
  },
  {
    id: 8,
    category: 'Testing Tools',
    value: 'Flutter Test & Device',
    subtitle: 'Flutter Test & Android Testing',
    role: 'Unit, Widget & Device QA',
    icon: 'fa-vial-circle-check',
    colors: {
      frontLight: '#0284c7',
      frontDark: '#0891b2',
      foldDark: '#0c4a6e',
      foldMid: '#0f5984',
      foldDeep: '#073047',
      accent: '#0891b2',
      glow: 'rgba(8, 145, 178, 0.45)',
    },
  },
];

export default function EnglishMasterTechStackFlow() {
  const [autoIndex, setAutoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Scroll & Refresh entrance animation trigger
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Check visibility relative to viewport & parent modal scroll container
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
    const timer2 = setTimeout(checkVisibility, 200);

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

  // Auto-cycle animation: advances smoothly every 2.4s
  useEffect(() => {
    if (isPaused || selectedId !== null) return;

    const timer = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % TECH_STACK_DATA.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [isPaused, selectedId]);

  // Active item calculation
  const activeItem = TECH_STACK_DATA.find((item) => item.id === (selectedId || hoveredId)) 
    || TECH_STACK_DATA[autoIndex % TECH_STACK_DATA.length] 
    || TECH_STACK_DATA[0];

  const handleSelect = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={containerRef}
      className="w-full space-y-4 font-['Plus_Jakarta_Sans',sans-serif] overflow-visible pt-1"
    >
      {/* ─── SECTION HEADER (CLEAN & MINIMAL) ─── */}
      <div
        className="pb-3 border-b border-slate-200 transition-all duration-700 ease-out"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0)' : 'translateY(-12px)',
        }}
      >
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Technologies &amp; Tools Used
        </h3>
      </div>

      {/* ─── INFOGRAPHIC CLIPART RIBBONS CONTAINER (IMAGE 2 REPLICA) ─── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredId(null);
        }}
        className="relative w-full py-2"
      >
        {/* ─── DESKTOP (MD/LG): SINGLE CONTINUOUS ROW (01 TO 08) ─── */}
        <div
          ref={scrollRef}
          className="hidden md:block w-full overflow-x-auto overflow-y-hidden pb-4 pt-2 -mx-1 px-1 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-start justify-between gap-3 sm:gap-4 md:gap-5 w-full min-w-[880px] lg:min-w-0">
            {TECH_STACK_DATA.map((item, idx) => (
              <div
                key={item.id}
                className="flex-1 min-w-[105px] max-w-[155px]"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(42px) scale(0.90)',
                  filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
                  transition: `opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 105}ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 105}ms, filter 900ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 105}ms`,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <InfographicArchRibbon
                  idPrefix="desk-"
                  item={item}
                  index={idx}
                  hasAnimated={hasAnimated}
                  isActive={activeItem?.id === item.id}
                  isSelected={selectedId === item.id}
                  onSelect={(e) => handleSelect(item.id, e)}
                  onHover={() => !selectedId && setHoveredId(item.id)}
                  onLeave={() => !selectedId && setHoveredId(null)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── MOBILE (< MD): 4-COLUMN X 2-ROW GRID (ALL 8 ARCHES FULLY VISIBLE WITHOUT CLIPPING) ─── */}
        <div className="block md:hidden w-full py-1">
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 w-full">
            {TECH_STACK_DATA.map((item, idx) => (
              <div
                key={`mob-${item.id}`}
                className="w-full"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.90)',
                  filter: hasAnimated ? 'blur(0px)' : 'blur(3px)',
                  transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 75}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 75}ms, filter 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 75}ms`,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <InfographicArchRibbon
                  idPrefix="mob-"
                  item={item}
                  index={idx}
                  hasAnimated={hasAnimated}
                  isActive={activeItem?.id === item.id}
                  isSelected={selectedId === item.id}
                  onSelect={(e) => handleSelect(item.id, e)}
                  onHover={() => !selectedId && setHoveredId(item.id)}
                  onLeave={() => !selectedId && setHoveredId(null)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * InfographicArchRibbon Component
 * Replicates the authentic Arch Bookmark Ribbon with 3D origami fold from Image 2:
 * - Arch-top dome pillar with circular white disc centered in the arch
 * - ONLY the icon inside the circular disc (NO numbers or text inside the circle)
 * - Category name in white bold font on the colored banner face
 * - 3D origami folded tail at the bottom with darker underside shadow
 * - Technology values and details cleanly positioned below the ribbon (NO "STEP 01" label)
 */
function InfographicArchRibbon({ item, index = 0, hasAnimated = true, isActive, isSelected, onSelect, onHover, onLeave, idPrefix = '' }) {
  const frontGradId = `${idPrefix}grad-front-${item.id}`;
  const foldGradId = `${idPrefix}grad-fold-${item.id}`;
  const shadowFilterId = `${idPrefix}contact-shadow-${item.id}`;

  const isMob = idPrefix.includes('mob');
  const delayBase = isMob ? index * 40 : index * 105;
  const iconDelay = isMob ? delayBase + 50 : delayBase + 140;
  const titleDelay = isMob ? delayBase + 80 : delayBase + 200;
  const textDelay = isMob ? delayBase + 100 : delayBase + 260;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`flex flex-col items-center cursor-pointer group transition-transform duration-300 ${
        isActive ? '-translate-y-2' : ''
      }`}
      title={item.value}
    >
      {/* ─── ARCH BOOKMARK RIBBON (AUTHENTIC IMAGE 2 REPLICA) ─── */}
      <div className="relative w-full aspect-[100/188] select-none">
        {/* SVG Vector Architecture: Arch Dome + Slanted Cut + Folded Flap + Shadows */}
        <svg
          viewBox="0 0 100 188"
          className={`w-full h-full transition-all duration-300 ${
            isActive ? 'filter drop-shadow-md' : 'filter drop-shadow-xs'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Contact shadow blur under the bottom folded tip */}
            <filter id={shadowFilterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            {/* Front arch face gradient */}
            <linearGradient id={frontGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={item.colors.frontLight} />
              <stop offset="100%" stopColor={item.colors.frontDark} />
            </linearGradient>

            {/* Folded underside flap gradient (shadowed 3D back of ribbon) */}
            <linearGradient id={foldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={item.colors.foldDark} />
              <stop offset="45%" stopColor={item.colors.foldMid} />
              <stop offset="100%" stopColor={item.colors.foldDeep} />
            </linearGradient>
          </defs>

          {/* 1. Soft contact shadow cast by bottom folded tip onto the canvas */}
          <ellipse
            cx="14"
            cy="183"
            rx="12"
            ry="4.5"
            fill="rgba(0, 0, 0, 0.22)"
            filter={`url(#${shadowFilterId})`}
          />

          {/* 2. Folded back flap (underside of ribbon, hanging down at bottom-left) */}
          <path
            d="M 0 126 L 0 180 L 100 154 Z"
            fill={`url(#${foldGradId})`}
          />

          {/* 3. Shadow along the fold line cast by the front face onto the folded underside */}
          <path
            d="M 0 126 L 100 154 L 60 148 Z"
            fill="rgba(0, 0, 0, 0.32)"
          />

          {/* 4. Main Front Banner: Arch top dome + straight sides + slanted bottom cut */}
          <path
            d="M 0 50 A 50 50 0 0 1 100 50 L 100 154 L 0 126 Z"
            fill={`url(#${frontGradId})`}
          />

          {/* 5. Subtle gloss highlight along the top arch dome */}
          <path
            d="M 8 50 A 42 42 0 0 1 92 50"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* ─── ARCH DOME: FULLY PLACED ICON (WITH SERIAL SPRING REVEAL) ─── */}
        <div
          className="absolute top-[8%] left-1/2 w-[52%] aspect-square flex items-center justify-center pointer-events-none"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated
              ? 'translateX(-50%) translateY(0) scale(1)'
              : 'translateX(-50%) translateY(16px) scale(0.35)',
            transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${iconDelay}ms, transform 850ms cubic-bezier(0.34, 1.56, 0.64, 1) ${iconDelay}ms`,
            willChange: 'transform, opacity',
          }}
        >
          <i
            className={`fa-solid ${item.icon} text-lg xs:text-xl sm:text-3xl text-white drop-shadow-md transition-transform duration-300 ${
              isActive ? 'scale-115 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]' : 'group-hover:scale-108'
            }`}
          />
        </div>

        {/* ─── CATEGORY TITLE ON THE COLORED RIBBON FACE (SERIAL FADE-IN) ─── */}
        <div
          className="absolute top-[49%] left-0 right-0 px-1 xs:px-1.5 flex flex-col items-center text-center pointer-events-none"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${titleDelay}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${titleDelay}ms`,
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-[8.5px] xs:text-[10px] sm:text-[14px] font-extrabold text-white tracking-tight leading-tight sm:leading-snug drop-shadow-sm font-['Playfair_Display',Georgia,serif]">
            {item.category}
          </span>
        </div>
      </div>

      {/* ─── TEXT BELOW THE RIBBON: VALUE & ROLE (SERIAL SLIDE-UP) ─── */}
      <div
        className="w-full text-center pt-1.5 sm:pt-2.5 px-0.5"
        style={{
          opacity: hasAnimated ? 1 : 0,
          transform: hasAnimated ? 'translateY(0)' : 'translateY(14px)',
          transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${textDelay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${textDelay}ms`,
          willChange: 'transform, opacity',
        }}
      >
        {/* Main Technology Value */}
        <h4 className="text-[10px] xs:text-[11.5px] sm:text-[14px] font-extrabold text-slate-900 leading-tight sm:leading-snug tracking-tight">
          {item.value}
        </h4>

        {/* Role / Description Subtitle */}
        <p className="text-[8px] xs:text-[9px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5 sm:mt-1 line-clamp-2">
          {item.role}
        </p>

        {/* Active Underline Pill */}
        <div className="w-full flex justify-center mt-1 sm:mt-2">
          <span
            style={{
              backgroundColor: isActive ? item.colors.accent : 'transparent',
              width: isActive ? '24px' : '0px',
            }}
            className="sm:w-[32px] h-[2px] rounded-full transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
