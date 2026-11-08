import React, { useState, useEffect, useRef } from 'react';

/**
 * IdsProjectOverview
 * 
 * 3 Droplet / Teardrop Cards for the Intrusion Detection System (IDS):
 * 1. The Problem (Problem Statement) - Slowly enters from the LEFT.
 * 2. Proposed Solution - Slowly enters from the TOP.
 * 3. Objective - Slowly enters from the RIGHT.
 * 
 * Triggers on page refresh / load AND on scroll when entering the viewport.
 * Operates on a smooth, elegant "one attempt - one time" entrance with staggered text reveal.
 */
export default function IdsProjectOverview() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Check visibility relative to viewport
    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when top of section is within 88% of screen height
      if (rect.top <= windowHeight * 0.88 && rect.bottom >= 0) {
        setHasAnimated(true);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const initialTimer = setTimeout(checkVisibility, 120);

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
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(node);
    }

    // 3. Scroll event listener on window & nearest scrollable ancestor (e.g. modal container)
    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(initialTimer);
      if (observer && node) observer.disconnect();
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <section ref={containerRef} className="space-y-5 sm:space-y-6 overflow-x-clip select-none">
      {/* ─── SECTION TITLE ─── */}
      <div>
        <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-[26px] font-black text-black tracking-tight">
          Project Overview
        </h2>
      </div>

      {/* ─── 3 DROPLET CARDS (SIDE-BY-SIDE ON ALL VIEWPORTS) ─── */}
      <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-6 lg:gap-8 items-stretch pt-1">
        
        {/* ════════════════════════════════════════════════════════════════
            1. THE PROBLEM (Problem Statement) - SLOWLY COMING FROM LEFT
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="group flex flex-col will-change-transform"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateX(0) scale(1)' : 'translateX(-110px) scale(0.92)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
            transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1), transform 1.45s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease-out',
            transitionDelay: '0ms',
          }}
        >
          {/* Outer Droplet Border (Sharp corner at bottom-right, rounded top & bottom-left) */}
          <div className="h-full rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none sm:rounded-tl-[64px] sm:rounded-tr-[64px] sm:rounded-bl-[64px] sm:rounded-br-none border-[1.5px] sm:border-[3.5px] border-[#EF4444] bg-white p-1 xs:p-1.5 sm:p-3 shadow-md sm:shadow-xl shadow-red-500/15 group-hover:shadow-2xl group-hover:shadow-red-500/30 transition-all duration-300 flex flex-col">
            
            {/* Inner Solid Colored Teardrop Container */}
            <div className="flex-1 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-none sm:rounded-tl-[52px] sm:rounded-tr-[52px] sm:rounded-bl-[52px] sm:rounded-br-none bg-gradient-to-br from-[#F87171] via-[#EF4444] to-[#DC2626] p-1.5 xs:p-2 sm:p-7 text-white flex flex-col items-center justify-between text-center min-h-[160px] xs:min-h-[190px] sm:min-h-[360px] relative overflow-hidden">
              
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full"></div>
              
              {/* Top Icon Disc (Slow Staggered Reveal) */}
              <div
                className="relative z-10 w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs xs:text-sm sm:text-lg shadow-inner mb-1 sm:mb-3 border border-white/30"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
                  transition: 'opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '220ms',
                }}
              >
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>

              {/* Title (Slow Staggered Reveal) */}
              <div
                className="relative z-10 mb-1 sm:mb-2"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '340ms',
                }}
              >
                <h3 className="text-[7.5px] xs:text-[9px] sm:text-xl font-black text-white tracking-tight leading-snug font-['Outfit',sans-serif]">
                  Problem Statement
                </h3>
                <div className="w-6 sm:w-12 h-[1.5px] sm:h-[2.5px] bg-white/50 rounded-full mx-auto mt-1 sm:mt-2"></div>
              </div>

              {/* Full Description Paragraph (Slow Staggered Reveal) */}
              <div
                className="relative z-10 flex-1 flex items-center justify-center"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 1.3s ease-out, transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '460ms',
                }}
              >
                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-white/95 leading-tight xs:leading-snug sm:leading-relaxed font-normal">
                  Traditional signature-based intrusion detection systems primarily rely on known attack patterns. They may struggle to identify new, modified, or previously unseen threats, creating a need for more adaptive network traffic classification techniques.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2. PROPOSED SOLUTION - SLOWLY COMING FROM TOP
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="group flex flex-col will-change-transform"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(-110px) scale(0.92)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
            transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1), transform 1.45s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease-out',
            transitionDelay: '180ms',
          }}
        >
          {/* Outer Droplet Border */}
          <div className="h-full rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none sm:rounded-tl-[64px] sm:rounded-tr-[64px] sm:rounded-bl-[64px] sm:rounded-br-none border-[1.5px] sm:border-[3.5px] border-[#9333EA] bg-white p-1 xs:p-1.5 sm:p-3 shadow-md sm:shadow-xl shadow-purple-500/15 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300 flex flex-col">
            
            {/* Inner Solid Colored Teardrop Container */}
            <div className="flex-1 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-none sm:rounded-tl-[52px] sm:rounded-tr-[52px] sm:rounded-bl-[52px] sm:rounded-br-none bg-gradient-to-br from-[#A855F7] via-[#9333EA] to-[#7E22CE] p-1.5 xs:p-2 sm:p-7 text-white flex flex-col items-center justify-between text-center min-h-[160px] xs:min-h-[190px] sm:min-h-[360px] relative overflow-hidden">
              
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full"></div>

              {/* Top Icon Disc (Slow Staggered Reveal) */}
              <div
                className="relative z-10 w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs xs:text-sm sm:text-lg shadow-inner mb-1 sm:mb-3 border border-white/30"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
                  transition: 'opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '380ms',
                }}
              >
                <i className="fa-solid fa-lightbulb"></i>
              </div>

              {/* Title (Slow Staggered Reveal) */}
              <div
                className="relative z-10 mb-1 sm:mb-2"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '500ms',
                }}
              >
                <h3 className="text-[7.5px] xs:text-[9px] sm:text-xl font-black text-white tracking-tight leading-snug font-['Outfit',sans-serif]">
                  Proposed Solution
                </h3>
                <div className="w-6 sm:w-12 h-[1.5px] sm:h-[2.5px] bg-white/50 rounded-full mx-auto mt-1 sm:mt-2"></div>
              </div>

              {/* Full Description Paragraph (Slow Staggered Reveal) */}
              <div
                className="relative z-10 flex-1 flex items-center justify-center"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 1.3s ease-out, transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '620ms',
                }}
              >
                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-white/95 leading-tight xs:leading-snug sm:leading-relaxed font-normal">
                  The proposed system uses machine learning algorithms, including Random Forest and Support Vector Machine (SVM), to analyze network traffic features and classify records as normal or potentially malicious. The NSL-KDD dataset supports model training and evaluation, while Django provides the web interface for user authentication, intrusion prediction, and viewing model performance.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. OBJECTIVE - SLOWLY COMING FROM RIGHT
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="group flex flex-col will-change-transform"
          style={{
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? 'translateX(0) scale(1)' : 'translateX(110px) scale(0.92)',
            filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
            transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1), transform 1.45s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease-out',
            transitionDelay: '360ms',
          }}
        >
          {/* Outer Droplet Border */}
          <div className="h-full rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none sm:rounded-tl-[64px] sm:rounded-tr-[64px] sm:rounded-bl-[64px] sm:rounded-br-none border-[1.5px] sm:border-[3.5px] border-[#D97706] bg-white p-1 xs:p-1.5 sm:p-3 shadow-md sm:shadow-xl shadow-amber-500/15 group-hover:shadow-2xl group-hover:shadow-amber-500/30 transition-all duration-300 flex flex-col">
            
            {/* Inner Solid Colored Teardrop Container */}
            <div className="flex-1 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-none sm:rounded-tl-[52px] sm:rounded-tr-[52px] sm:rounded-bl-[52px] sm:rounded-br-none bg-gradient-to-br from-[#FBBF24] via-[#F59E0B] to-[#D97706] p-1.5 xs:p-2 sm:p-7 text-white flex flex-col items-center justify-between text-center min-h-[160px] xs:min-h-[190px] sm:min-h-[360px] relative overflow-hidden">
              
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full"></div>

              {/* Top Icon Disc (Slow Staggered Reveal) */}
              <div
                className="relative z-10 w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs xs:text-sm sm:text-lg shadow-inner mb-1 sm:mb-3 border border-white/30"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
                  transition: 'opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '480ms',
                }}
              >
                <i className="fa-solid fa-bullseye"></i>
              </div>

              {/* Title (Slow Staggered Reveal) */}
              <div
                className="relative z-10 mb-1 sm:mb-2"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '600ms',
                }}
              >
                <h3 className="text-[7.5px] xs:text-[9px] sm:text-xl font-black text-white tracking-tight leading-snug font-['Outfit',sans-serif]">
                  Project Objective
                </h3>
                <div className="w-6 sm:w-12 h-[1.5px] sm:h-[2.5px] bg-white/50 rounded-full mx-auto mt-1 sm:mt-2"></div>
              </div>

              {/* Full Description Paragraph (Slow Staggered Reveal) */}
              <div
                className="relative z-10 flex-1 flex items-center justify-center"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 1.3s ease-out, transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '720ms',
                }}
              >
                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-white/95 leading-tight xs:leading-snug sm:leading-relaxed font-normal">
                  The primary objective of this project is to develop and evaluate a machine learning-based intrusion detection prototype that classifies network traffic, provides prediction outcomes through a Django web application, and demonstrates a basic workflow for network anomaly identification.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
