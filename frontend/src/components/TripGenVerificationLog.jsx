import React, { useState, useEffect, useRef } from 'react';

/**
 * TripGenVerificationLog
 * 
 * Detailed Unit & Integration Verification Log (10 Test Suites).
 * Featuring smooth, staggered scroll-entrance cascade animation:
 * As the user scrolls down to this section, rows 01 to 10 slowly glide in
 * one by one from the left side with seamless opacity and transform.
 */
export default function TripGenVerificationLog({ items = [] }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Detect scrollable ancestor (modal container or window)
    const getScrollParent = () => {
      let parent = node.parentElement;
      while (parent) {
        const overflow = window.getComputedStyle(parent).overflowY;
        if (overflow === 'auto' || overflow === 'scroll') return parent;
        parent = parent.parentElement;
      }
      return window;
    };

    const scrollParent = getScrollParent();

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const pRect =
        scrollParent !== window
          ? scrollParent.getBoundingClientRect()
          : { top: 0, bottom: window.innerHeight || document.documentElement.clientHeight };

      // Trigger when the top of the table enters the viewport
      const inView = rect.top <= pRect.bottom - 40 && rect.bottom >= pRect.top + 40;
      const outOfView = rect.bottom < pRect.top - 180 || rect.top > pRect.bottom + 180;

      if (inView) {
        setIsVisible(true);
      } else if (outOfView) {
        // Reset when scrolled substantially away so re-scrolling back replays the animation cleanly
        setIsVisible(false);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 60);
    const t2 = setTimeout(checkVisibility, 200);

    // 2. Modern IntersectionObserver with bidirectional visibility tracking
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      const rootEl = scrollParent !== window ? scrollParent : null;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              const r = entry.boundingClientRect;
              const rRoot = entry.rootBounds;
              if (rRoot) {
                if (r.bottom < rRoot.top - 120 || r.top > rRoot.bottom + 120) {
                  setIsVisible(false);
                }
              } else {
                const wh = window.innerHeight || 800;
                if (r.bottom < -120 || r.top > wh + 120) {
                  setIsVisible(false);
                }
              }
            }
          });
        },
        {
          root: rootEl,
          threshold: 0.05,
          rootMargin: '0px 0px -20px 0px',
        }
      );
      observer.observe(node);
    }

    // 3. Scroll event listener on nearest scrollable ancestor and window
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer) observer.disconnect();
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <section ref={containerRef} className="space-y-3 sm:space-y-4 tripgen-reveal-section is-revealed">
      {/* Header Bar matching Testing & Validation size */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 pr-9 sm:pr-0">
        <div>
          <h2 className="text-base xs:text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Detailed Unit & Integration Verification Log
          </h2>
        </div>

        {/* 100% Passed Badge with Dynamic Live Beacon Animation */}
        <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-0.5 xs:px-2.5 xs:py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-600 text-white font-extrabold text-[8.5px] xs:text-[9.5px] sm:text-xs shadow-md shadow-emerald-500/25 shrink-0 hover:scale-105 transition-transform duration-300">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
          </span>
          <i className="fa-solid fa-check text-[7.5px] xs:text-[8.5px] sm:text-xs font-black"></i>
          <span className="tracking-wide whitespace-nowrap">100% Passed</span>
        </div>
      </div>

      {/* Master Infographic Table Canvas */}
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden transition-shadow hover:shadow-md duration-300">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed sm:table-auto sm:min-w-[850px]">
            {/* Colored Header Row matching user mockup */}
            <thead>
              <tr className="text-white text-[7.5px] xs:text-[8.5px] sm:text-xs font-extrabold tracking-wider border-b border-white/20 select-none">
                <th className="py-1.5 px-0.5 xs:py-2 xs:px-1 sm:py-3 sm:px-3 text-center bg-[#0284C7] w-[20px] xs:w-[22px] sm:w-[60px] shadow-inner">
                  #
                </th>
                <th className="py-1.5 px-1 xs:py-2 xs:px-1.5 sm:py-3 sm:px-4 bg-[#2563EB] w-[70px] xs:w-[80px] sm:w-[220px]">
                  Test Suite
                </th>
                <th className="py-1.5 px-0.5 xs:py-2 xs:px-1 sm:py-3 sm:px-4 text-center bg-[#7C3AED] w-[52px] xs:w-[60px] sm:w-[170px]">
                  Category
                </th>
                <th className="py-1.5 px-1 xs:py-2 xs:px-1.5 sm:py-3 sm:px-4 bg-[#2563EB]">
                  Description
                </th>
                <th className="py-1.5 px-0.5 xs:py-2 xs:px-1 sm:py-3 sm:px-4 text-center bg-[#059669] w-[52px] xs:w-[58px] sm:w-[180px]">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={item.num}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-55px)',
                    filter: isVisible ? 'blur(0px)' : 'blur(4px)',
                    transition:
                      'opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${idx * 110 + 60}ms`,
                    willChange: 'transform, opacity',
                  }}
                  className={`${item.rowBg} border-b border-white hover:brightness-95 hover:shadow-inner transition-colors duration-200 group/row cursor-default`}
                >
                  {/* Column 1: # Number Badge with Hover Dynamics */}
                  <td className="py-1.5 px-0.5 xs:py-2 xs:px-1 sm:py-3 sm:px-3 text-center align-middle">
                    <div
                      className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-7 sm:h-7 rounded-full ${item.badgeBg} text-white font-black text-[6.5px] xs:text-[7.5px] sm:text-xs flex items-center justify-center mx-auto shadow-2xs group-hover/row:scale-110 group-hover/row:rotate-6 transition-transform duration-300`}
                    >
                      {item.num}
                    </div>
                  </td>

                  {/* Column 2: Test Suite (Animated Icon + Title) */}
                  <td className="py-1.5 px-1 xs:py-2 xs:px-1.5 sm:py-3 sm:px-4 align-middle">
                    <div className="flex items-center gap-1 sm:gap-2.5">
                      <i
                        className={`fa-solid ${item.icon} ${item.iconColor} text-[7.5px] xs:text-[8.5px] sm:text-base shrink-0 w-3 xs:w-3.5 sm:w-5 text-center group-hover/row:scale-125 transition-transform duration-300`}
                      ></i>
                      <span className="font-bold text-[6.5px] xs:text-[7.5px] sm:text-[13px] text-slate-900 leading-tight sm:leading-snug group-hover/row:text-blue-600 transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </td>

                  {/* Column 3: Category Pill Badge with Hover Glow */}
                  <td className="py-1.5 px-0.5 xs:py-2 xs:px-1 sm:py-3 sm:px-4 text-center align-middle">
                    <span
                      className={`inline-block px-1 py-0.5 sm:px-3 sm:py-1 rounded-xs sm:rounded-lg text-[5px] xs:text-[6px] sm:text-xs font-bold border ${item.categoryBadge} shadow-2xs leading-tight sm:leading-none whitespace-normal sm:whitespace-nowrap group-hover/row:scale-105 transition-transform duration-200`}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Column 4: Description Text */}
                  <td className="py-1.5 px-1 xs:py-2 xs:px-1.5 sm:py-3 sm:px-4 align-middle">
                    <p className="text-[5.5px] xs:text-[6.5px] sm:text-xs text-slate-700 font-medium leading-tight sm:leading-relaxed group-hover/row:text-slate-950 transition-colors">
                      {item.desc}
                    </p>
                  </td>

                  {/* Column 5: Result Status with Live Beacon */}
                  <td className="py-1.5 px-0.5 xs:py-2 xs:px-1 sm:py-3 sm:px-4 text-center align-middle">
                    <div className="inline-flex items-center justify-center gap-0.5 sm:gap-2 font-bold text-[5px] xs:text-[6px] sm:text-xs text-emerald-700 leading-tight sm:leading-normal whitespace-normal sm:whitespace-nowrap group-hover/row:scale-105 transition-transform duration-200">
                      <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <i className="fa-solid fa-circle-check text-emerald-500 text-[6.5px] xs:text-[7.5px] sm:text-sm shrink-0"></i>
                      <span>{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

