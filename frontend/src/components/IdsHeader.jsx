import React from 'react';

/**
 * IdsHeader
 * 
 * EXACT TRIPGEN UNIFIED ARCHITECTURE (ONE LEVEL CONTENT & FULL-HEIGHT ARTWORK):
 * - Left side: 100% preserved content text, shape, typography, and badges ("no change left side no change").
 * - Right side: Full-height, full-bleed 3D cyber illustration spanning the entire header height without any box borders.
 * - One-level alignment: Left text and right 3D visual are vertically centered and unified on the exact same level.
 * - Backdrop: /ids_hero_backdrop_clean.png pinned to right with object-cover, clean white on left.
 * - Cyan Accent Line running continuously across the base.
 */

export default function IdsHeader({ selectedProject }) {
  const projectDesc =
    selectedProject?.longDesc ||
    selectedProject?.desc ||
    'The Intrusion Detection System (IDS) is a machine learning-based cybersecurity application designed to classify network traffic and identify potentially malicious activities. It uses machine learning algorithms and a Django-based web interface to provide intrusion prediction results and model performance information.';

  const featurePillars = [
    {
      id: 'live-monitoring',
      title: 'Live',
      subtitle: 'Monitoring',
      icon: 'fa-solid fa-desktop',
      color: 'text-[#0070F3]',
      hoverGlow: 'hover:shadow-blue-500/30',
      svgFallback: (
        <svg className="w-5 h-5 text-[#0070F3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <rect x="5" y="6" width="5" height="4" rx="0.5" fill="#0070F3" stroke="none" />
          <rect x="12" y="6" width="7" height="8" rx="0.5" fill="#0070F3" fillOpacity="0.25" stroke="#0070F3" strokeWidth="1" />
        </svg>
      ),
    },
    {
      id: 'threat-detection',
      title: 'Threat',
      subtitle: 'Detection',
      icon: 'fa-solid fa-shield-halved',
      color: 'text-[#EF4444]',
      hoverGlow: 'hover:shadow-rose-500/30',
      svgFallback: (
        <svg className="w-5 h-5 text-[#EF4444]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
          <path d="M9.5 11.5l2 2 4-4" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'model-analysis',
      title: 'Model',
      subtitle: 'Analysis',
      icon: 'fa-solid fa-chart-column',
      color: 'text-[#8B5CF6]',
      hoverGlow: 'hover:shadow-purple-500/30',
      svgFallback: (
        <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="12" width="3.5" height="9" rx="1" />
          <rect x="10.25" y="4" width="3.5" height="17" rx="1" />
          <rect x="16.5" y="8.5" width="3.5" height="12.5" rx="1" />
        </svg>
      ),
    },
    {
      id: 'detection-reports',
      title: 'Detection',
      subtitle: 'Reports',
      icon: 'fa-solid fa-file-shield',
      color: 'text-[#10B981]',
      hoverGlow: 'hover:shadow-emerald-500/30',
      svgFallback: (
        <svg className="w-5 h-5 text-[#10B981]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path d="M14 2v6h6" fill="#059669" />
          <line x1="7" y1="12" x2="14" y2="12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="7" y1="15" x2="14" y2="15" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="7" y1="18" x2="11" y2="18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'admin-dashboard',
      title: 'Admin',
      subtitle: 'Dashboard',
      icon: 'fa-solid fa-gear',
      color: 'text-[#F97316]',
      hoverGlow: 'hover:shadow-orange-500/30',
      svgFallback: (
        <svg className="w-5 h-5 text-[#F97316]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" fill="#FFFFFF" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2a2 2 0 0 0-2 2v.28a7.02 7.02 0 0 0-1.83.76l-.2-.2a2 2 0 0 0-2.83 0l-.7.7a2 2 0 0 0 0 2.83l.2.2c-.32.57-.58 1.18-.76 1.83H3.6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h.28c.18.65.44 1.26.76 1.83l-.2.2a2 2 0 0 0 0 2.83l.7.7a2 2 0 0 0 2.83 0l.2-.2c.57.32 1.18.58 1.83.76V20a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-.28a7.02 7.02 0 0 0 1.83-.76l.2.2a2 2 0 0 0 2.83 0l.7-.7a2 2 0 0 0 0-2.83l-.2-.2c.32-.57.58-1.18.76-1.83H20.4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-.28a7.02 7.02 0 0 0-.76-1.83l.2-.2a2 2 0 0 0 0-2.83l-.7-.7a2 2 0 0 0-2.83 0l-.2.2A7.02 7.02 0 0 0 14 4.28V4a2 2 0 0 0-2-2h-1zm0 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      ),
    },
  ];

  const handleScrollToFeatures = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // 1. Identify target feature section (System Architecture and Prediction Workflow)
    const target =
      document.getElementById('ids-features-section') ||
      document.getElementById('ids-arch-heading') ||
      document.querySelector('.ids-venn-diagram-container') ||
      document.getElementById('ids-overview-section');

    if (!target) return;

    // 2. Identify scrollable container (Modal body or Window)
    let container = target.parentElement;
    while (container && container !== document.body && container !== document.documentElement) {
      const overflowY = window.getComputedStyle(container).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        break;
      }
      container = container.parentElement;
    }

    const isWindowScroll = !container || container === document.body || container === document.documentElement;

    // 3. Compute start and target positions
    const startPos = isWindowScroll ? (window.pageYOffset || document.documentElement.scrollTop) : container.scrollTop;
    const targetRect = target.getBoundingClientRect();
    const containerRect = isWindowScroll ? { top: 0 } : container.getBoundingClientRect();
    const offset = 28;
    const targetPos = startPos + (targetRect.top - containerRect.top) - offset;
    const distance = targetPos - startPos;

    // 4. Smooth, slow scroll animation (1100ms) with easeInOut cubic curve
    const duration = 1100;
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      const currentScroll = startPos + distance * ease;

      if (isWindowScroll) {
        window.scrollTo(0, currentScroll);
      } else {
        container.scrollTop = currentScroll;
      }

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      } else {
        // "identfied given": highlight target heading to clearly identify arrival
        const heading = document.getElementById('ids-arch-heading') || target;
        heading.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        heading.style.textShadow = '0 0 20px rgba(0, 214, 252, 0.55)';
        heading.style.color = '#0070F3';
        setTimeout(() => {
          heading.style.textShadow = '';
          heading.style.color = '';
        }, 1600);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <header className="relative w-full overflow-hidden select-text shadow-sm bg-white border-b-[4px] border-[#00D6FC]">
      
      {/* ─── MASTER HERO CONTAINER (EXACT TRIPGEN UNIFIED BANNER ARCHITECTURE) ─── */}
      <div className="relative w-full min-h-0 sm:min-h-[500px] md:min-h-[530px] lg:min-h-[560px] flex items-center overflow-hidden">
        
        {/* Full-Height 3D Cyber Artwork Backdrop - Pinned Flush on Right with Zero Box Borders (Desktop/Tablet) */}
        <div
          className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none select-none bg-no-repeat bg-cover md:bg-[center_right] z-0"
          style={{
            backgroundImage: "url('/ids_hero_backdrop_clean.png?v=6')",
          }}
          aria-hidden="true"
        />

        {/* ─── FOREGROUND CONTENT LAYER (PURE CRISP TEXT & ICONS ON ONE LEVEL) ─── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 pt-3.5 xs:pt-4 sm:pt-8 lg:pt-9 pb-5 xs:pb-6 sm:pb-8 lg:pb-9 flex flex-col justify-center">
          
          {/* Left Text & Features Column - EXACT CONTENT, SHAPE & SIZING PRESERVED */}
          <div className="w-full max-w-xl lg:max-w-2xl space-y-1.5 xs:space-y-2 sm:space-y-3.5 select-text">
            
            {/* 1. Brand Wordmark & Shield Emblem */}
            <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 select-text cursor-text">
              <div className="relative shrink-0 w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 lg:w-13 lg:h-13 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-b from-[#0088FF] to-[#0A2540] shadow-md shadow-blue-500/25 p-1.5 sm:p-2">
                <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.2)" />
                  <rect x="9" y="11" width="6" height="5" rx="1" fill="#FFFFFF" stroke="none" />
                  <path d="M10 11V9a2 2 0 0 1 4 0v2" stroke="#FFFFFF" strokeWidth="1.8" />
                </svg>
              </div>

              <div className="flex flex-col leading-none select-text cursor-text">
                <div className="flex items-center text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-[#0A2540]">
                  <span>IDS</span>
                </div>
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] lg:text-[10.5px] font-bold text-[#0A2540] tracking-[0.2em] sm:tracking-[0.22em] uppercase pt-0.5 sm:pt-1 select-text">
                  INTRUSION DETECTION SYSTEM
                </span>
              </div>
            </div>

            {/* 2. Cyan Accent Underline Bar */}
            <div className="pt-0.5 pointer-events-none">
              <div className="w-8 xs:w-10 sm:w-14 h-[2.5px] sm:h-[3.5px] bg-[#00D6FC] rounded-full shadow-[0_0_8px_rgba(0,214,252,0.6)]"></div>
            </div>

            {/* 3. Main Project Title */}
            <div className="select-text cursor-text leading-none pt-0.5">
              <h1 className="text-2xl xs:text-[27px] sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#0A2540] leading-tight select-text">
                Intrusion Detection<br />
                <span className="text-[#0070F3]">System (IDS)</span>
              </h1>
            </div>

            {/* 4. Tagline */}
            <div className="select-text cursor-text pt-0.5">
              <span className="text-xs xs:text-[13px] sm:text-base lg:text-[17px] font-bold text-slate-800 select-text">
                Smart Cyber Defense <span className="text-[#0070F3]">+ Machine Learning</span>
              </span>
            </div>

            {/* 5. Complete Project Description Paragraph */}
            <p className="text-[10.5px] xs:text-[11px] sm:text-[13px] lg:text-[13.5px] text-slate-700 leading-relaxed font-normal text-left max-w-lg lg:max-w-xl pt-0.5 select-text cursor-text">
              {projectDesc}
            </p>

            {/* 6. Technology Stack Badges (All 4 on One Neat Line on Mobile, Matching Image 2) */}
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 pt-0.5 flex-nowrap">
              {/* Python */}
              <span className="px-1.5 py-0.5 xs:px-2 sm:px-3 sm:py-1 rounded-full text-[7.5px] xs:text-[8.5px] sm:text-xs font-semibold sm:font-bold bg-white text-slate-800 border border-slate-200/90 shadow-2xs inline-flex items-center gap-1 sm:gap-1.5 hover:border-blue-400 hover:shadow-xs transition-all cursor-default shrink-0">
                <span className="text-[8.5px] xs:text-[9.5px] sm:text-sm">🐍</span> Python
              </span>

              {/* Django */}
              <span className="px-1.5 py-0.5 xs:px-2 sm:px-3 sm:py-1 rounded-full text-[7.5px] xs:text-[8.5px] sm:text-xs font-semibold sm:font-bold bg-white text-slate-800 border border-slate-200/90 shadow-2xs inline-flex items-center gap-1 sm:gap-1.5 hover:border-emerald-400 hover:shadow-xs transition-all cursor-default shrink-0">
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded bg-[#092E20] text-white flex items-center justify-center text-[6.5px] sm:text-[9px] font-black leading-none">
                  dj
                </span> Django
              </span>

              {/* Machine Learning */}
              <span className="px-1.5 py-0.5 xs:px-2 sm:px-3 sm:py-1 rounded-full text-[7.5px] xs:text-[8.5px] sm:text-xs font-semibold sm:font-bold bg-white text-slate-800 border border-slate-200/90 shadow-2xs inline-flex items-center gap-1 sm:gap-1.5 hover:border-purple-400 hover:shadow-xs transition-all cursor-default shrink-0">
                <span className="text-[8.5px] xs:text-[9.5px] sm:text-sm">🧠</span> Machine Learning
              </span>

              {/* NSL-KDD Dataset */}
              <span className="px-1.5 py-0.5 xs:px-2 sm:px-3 sm:py-1 rounded-full text-[7.5px] xs:text-[8.5px] sm:text-xs font-semibold sm:font-bold bg-white text-slate-800 border border-slate-200/90 shadow-2xs inline-flex items-center gap-1 sm:gap-1.5 hover:border-cyan-400 hover:shadow-xs transition-all cursor-default shrink-0">
                <span className="text-[8.5px] xs:text-[9.5px] sm:text-sm">🗄️</span> NSL - KDD Dataset
              </span>
            </div>

            {/* 7. CTA Button: Explore IDS Features */}
            <div className="pt-0.5 sm:pt-1">
              <button
                type="button"
                onClick={handleScrollToFeatures}
                className="px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#00A3FF] to-[#9333EA] text-white font-bold text-[10.5px] xs:text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-purple-500/35 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 group cursor-pointer border border-white/20 select-none"
              >
                <span className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                  <i className="fa-regular fa-compass text-[10px] xs:text-[11px] sm:text-xs text-white"></i>
                </span>
                <span>Explore IDS Features</span>
                <i className="fa-solid fa-arrow-right text-[10px] xs:text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
              </button>
            </div>

            {/* 8. The 5 Feature Circular Badges in Horizontal Row */}
            <div className="pt-1.5 sm:pt-2.5">
              <div className="flex items-start gap-2.5 xs:gap-3.5 sm:gap-4 md:gap-5 flex-nowrap">
                {featurePillars.map((feat) => (
                  <div
                    key={feat.id}
                    onClick={handleScrollToFeatures}
                    className="flex flex-col items-center gap-1 sm:gap-1.5 text-center group cursor-pointer select-none shrink-0"
                  >
                    {/* White Circular Disc with Category Icon */}
                    <div
                      className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white shadow-md shadow-black/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${feat.hoverGlow}`}
                    >
                      {feat.svgFallback}
                    </div>

                    {/* Dual-line Label */}
                    <span className="text-[7.5px] xs:text-[8.5px] sm:text-[11px] font-bold text-[#0A2540] leading-tight tracking-tight whitespace-nowrap">
                      {feat.title}
                      <br />
                      {feat.subtitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
