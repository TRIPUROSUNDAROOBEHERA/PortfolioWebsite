import React, { useState, useEffect, useRef } from 'react';

/**
 * IdsSecurityNotes
 * 
 * SECURITY & IMPLEMENTATION NOTES:
 * - Clean panel headers: "Secure Operations (Safe Activities)" & "Attack Attempts (Danger Activities)".
 * - Content text and team illustrations preserved with zero modifications:
 *   - Left Panel: 5 Secure Operations (Safe Activities) + Safe Team illustration (/ids_team_safe_white.png).
 *   - Right Panel: 5 Attack Attempts (Danger Activities) + Threat Defense Team illustration (/ids_team_danger_white.png).
 * - Smooth scroll & page refresh cascade animation:
 *   - Slowly comes in from top to bottom one by one.
 *   - Staggered delay sequence across items.
 *   - Interactive hover transitions with micro-scaling and elevation.
 */

const SAFE_OPERATIONS = [
  {
    id: 'safe-1',
    num: '1',
    title: 'Network Monitoring',
    desc: 'Monitor legitimate traffic and identify unusual activity.',
    icon: '/icon_safe_1_white.png',
  },
  {
    id: 'safe-2',
    num: '2',
    title: 'Secure Data Processing',
    desc: 'Clean and preprocess NSL-KDD network data.',
    icon: '/icon_safe_2_white.png',
  },
  {
    id: 'safe-3',
    num: '3',
    title: 'Model Security',
    desc: 'Use Random Forest and SVM for traffic classification.',
    icon: '/icon_safe_3_white.png',
  },
  {
    id: 'safe-4',
    num: '4',
    title: 'Access Control',
    desc: 'Protect user accounts with authentication and role-based permissions.',
    icon: '/icon_safe_4_white.png',
  },
  {
    id: 'safe-5',
    num: '5',
    title: 'Secure Logging',
    desc: 'Store detection results and maintain security reports.',
    icon: '/icon_safe_5_white.png',
  },
];

const DANGER_ATTEMPTS = [
  {
    id: 'danger-1',
    num: '1',
    title: 'DoS Attacks',
    desc: 'Detect traffic patterns associated with denial-of-service attacks.',
    icon: '/icon_danger_1_white.png',
  },
  {
    id: 'danger-2',
    num: '2',
    title: 'Probe Attacks',
    desc: 'Identify suspicious network scanning and reconnaissance.',
    icon: '/icon_danger_2_white.png',
  },
  {
    id: 'danger-3',
    num: '3',
    title: 'R2L Attacks',
    desc: 'Detect attempts to gain unauthorized local access remotely.',
    icon: '/icon_danger_3_white.png',
  },
  {
    id: 'danger-4',
    num: '4',
    title: 'U2R Attacks',
    desc: 'Identify attempts to gain unauthorized administrator privileges.',
    icon: '/icon_danger_4_white.png',
  },
  {
    id: 'danger-5',
    num: '5',
    title: 'Malicious Traffic Alerts',
    desc: 'Flag suspicious traffic and notify administrators.',
    icon: '/icon_danger_5_white.png',
  },
];

export default function IdsSecurityNotes() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Check visibility relative to viewport or modal scroll container
    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // Trigger when section enters within 92% of screen height
      if (rect.top <= windowHeight * 0.92 && rect.bottom >= 0) {
        setHasAnimated(true);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const initialTimer = setTimeout(checkVisibility, 100);
    const secondaryTimer = setTimeout(checkVisibility, 300);

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
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
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
      clearTimeout(secondaryTimer);
      if (observer && node) observer.disconnect();
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-2.5 xs:p-3 sm:p-6 lg:p-7 relative overflow-hidden"
    >
      
      {/* ── Background Subtle Cyber Overlay ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-200/15 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-200/15 rounded-full blur-3xl"></div>
      </div>

      {/* ── Final Split Comparison Panels (Cascading Entrance from Top One by One) ── */}
      <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-5 items-stretch">
        
        {/* Left Column: Secure Operations */}
        <div className="flex flex-col bg-white rounded-xl sm:rounded-2xl border border-emerald-200/90 shadow-sm overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#009245] to-[#10B981] py-2 px-1 sm:py-3.5 sm:px-4 text-center text-white shadow-xs flex items-center justify-center will-change-transform"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(-16px)',
              transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 50ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 50ms',
            }}
          >
            <h5 className="text-[10px] xs:text-[11.5px] sm:text-base md:text-lg font-black tracking-tight text-white leading-tight">
              <span className="hidden sm:inline">Secure Operations (Safe Activities)</span>
              <span className="sm:hidden block">
                Secure Operations
                <span className="block text-[8px] xs:text-[8.5px] font-semibold text-emerald-100 mt-0.5">(Safe Activities)</span>
              </span>
            </h5>
          </div>
          <div className="p-1.5 xs:p-2 sm:p-5 space-y-1.5 sm:space-y-3 flex-1 bg-white">
            {SAFE_OPERATIONS.map((item, idx) => (
              <div
                key={item.id}
                className="group flex items-start sm:items-center gap-1.5 sm:gap-3 p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md cursor-default transition-all will-change-transform"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(-28px)',
                  transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${120 + idx * 120}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${120 + idx * 120}ms, box-shadow 250ms, border-color 250ms, background-color 250ms`,
                }}
              >
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-md sm:rounded-lg bg-white overflow-hidden shadow-2xs mt-0.5 sm:mt-0">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-[8px] xs:text-[8.5px] sm:text-xs md:text-[13.5px] text-slate-900 leading-tight sm:leading-snug flex-1">
                  <span className="font-black text-slate-950">{item.num}. {item.title}: </span>
                  <span className="font-medium text-slate-700">{item.desc}</span>
                </p>
              </div>
            ))}
          </div>
          <div
            className="w-full mt-auto pt-1 sm:pt-2 overflow-hidden bg-white flex items-end justify-center border-t border-emerald-100/60 will-change-transform"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(-14px)',
              transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 750ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 750ms',
            }}
          >
            <img
              src="/ids_team_safe_white.png"
              alt="Safe Team"
              className="w-full h-auto object-contain max-h-[55px] xs:max-h-[65px] sm:max-h-[135px] transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Right Column: Attack Attempts */}
        <div className="flex flex-col bg-white rounded-xl sm:rounded-2xl border border-rose-200/90 shadow-sm overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] py-2 px-1 sm:py-3.5 sm:px-4 text-center text-white shadow-xs flex items-center justify-center will-change-transform"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(-16px)',
              transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 90ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 90ms',
            }}
          >
            <h5 className="text-[10px] xs:text-[11.5px] sm:text-base md:text-lg font-black tracking-tight text-white leading-tight">
              <span className="hidden sm:inline">Attack Attempts (Danger Activities)</span>
              <span className="sm:hidden block">
                Attack Attempts
                <span className="block text-[8px] xs:text-[8.5px] font-semibold text-rose-100 mt-0.5">(Danger Activities)</span>
              </span>
            </h5>
          </div>
          <div className="p-1.5 xs:p-2 sm:p-5 space-y-1.5 sm:space-y-3 flex-1 bg-white">
            {DANGER_ATTEMPTS.map((item, idx) => (
              <div
                key={item.id}
                className="group flex items-start sm:items-center gap-1.5 sm:gap-3 p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-100 hover:border-rose-300 hover:bg-rose-50/40 hover:shadow-md cursor-default transition-all will-change-transform"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(-28px)',
                  transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${180 + idx * 120}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${180 + idx * 120}ms, box-shadow 250ms, border-color 250ms, background-color 250ms`,
                }}
              >
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-md sm:rounded-lg bg-white overflow-hidden shadow-2xs mt-0.5 sm:mt-0">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-[8px] xs:text-[8.5px] sm:text-xs md:text-[13.5px] text-slate-900 leading-tight sm:leading-snug flex-1">
                  <span className="font-black text-slate-950">{item.num}. {item.title}: </span>
                  <span className="font-medium text-slate-700">{item.desc}</span>
                </p>
              </div>
            ))}
          </div>
          <div
            className="w-full mt-auto pt-1 sm:pt-2 overflow-hidden bg-white flex items-end justify-center border-t border-rose-100/60 will-change-transform"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(-14px)',
              transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 820ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 820ms',
            }}
          >
            <img
              src="/ids_team_danger_white.png"
              alt="Threat Defense Team"
              className="w-full h-auto object-contain max-h-[55px] xs:max-h-[65px] sm:max-h-[135px] transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
