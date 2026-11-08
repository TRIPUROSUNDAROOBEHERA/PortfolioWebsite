import React, { useState, useEffect, useRef, useCallback } from 'react';
import TripGenWaterfall from './common/TripGenWaterfall';

/**
 * TripGenSecurityNotes
 * 
 * High-Performance Orchestrated Entrance & Visualization:
 * 1. Resilient Scroll & Page Refresh Detection:
 *    - Automatically triggers entrance when refreshed with modal open, or upon scrolling into view.
 *    - IntersectionObserver + scroll listeners on both nearest scroll container and window.
 *    - Includes an interactive 'Replay Animation' pill button to preview the sequence at any time.
 * 2. Top Banner Entrance ("top slowly coming into position"):
 *    - The scenic panoramic banner slowly glides down from above (translateY(-50px) -> 0) with a silky 1.25s easing.
 *    - Continuous realistic waterfall vector flow and 3 undulating ocean wave layers underneath.
 * 3. Left Bottom Corner Entrance ("Development Default Credential Advisory"):
 *    - Glides smoothly from bottom-left corner (-80px, 55px) into position.
 *    - Complete visual enhancements:
 *      • Red Lock circular icon with entrance pop & breathing red aura.
 *      • Red vertical bar growth.
 *      • Glowing animated pill for `admin/admin` development credentials.
 *      • Continuous rotating gear icon for Production Hardening Recommendations.
 *      • Staggered cascading checkmarks with tactile hover feedback.
 * 4. Right Bottom Corner Entrance ("Booking & Payment Workflow Status"):
 *    - Glides smoothly from bottom-right corner (80px, 55px) into position.
 *    - Complete visual enhancements:
 *      • Blue Calendar circular icon with entrance pop & breathing blue aura.
 *      • Blue vertical bar growth.
 *      • Live pulsating radar ping dots for Confirmed (Emerald) and Pending (Amber) statuses.
 *      • Heartbeat pulsing info icon for Implementation Clarity.
 *      • Staggered cascading checkmarks with tactile hover feedback.
 * 5. Bottom Scenic Footer Banner:
 *    - Glides smoothly up from the bottom (translateY(30px) -> 0) with flight path light sweep.
 */

export default function TripGenSecurityNotes() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Visibility detection with support for page refresh, scroll, and modal resize
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const getScrollParent = () => {
      return (
        node.closest('.custom-slim-scrollbar') ||
        node.closest('.overflow-y-auto') ||
        node.closest('.overflow-auto') ||
        window
      );
    };

    const checkVisibility = () => {
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      const scrollParent = getScrollParent();

      let inView = false;
      let outOfView = false;

      if (scrollParent && scrollParent !== window) {
        const pRect = scrollParent.getBoundingClientRect();
        inView = rect.top < pRect.bottom - 40 && rect.bottom > pRect.top + 40;
        outOfView = rect.bottom < pRect.top - 140 || rect.top > pRect.bottom + 140;
      } else {
        inView = rect.top <= windowHeight * 0.95 && rect.bottom >= 40;
        outOfView = rect.bottom < -140 || rect.top > windowHeight + 140;
      }

      if (inView) {
        setIsVisible(true);
      } else if (outOfView) {
        setIsVisible(false);
      }
    };

    // 1. Immediate check on initial mount / page refresh
    checkVisibility();
    const t1 = setTimeout(checkVisibility, 60);
    const t2 = setTimeout(checkVisibility, 200);

    // 2. Modern IntersectionObserver
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      const scrollParent = getScrollParent();
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
                if (r.bottom < rRoot.top - 80 || r.top > rRoot.bottom + 80) {
                  setIsVisible(false);
                }
              } else {
                const wh = window.innerHeight || 800;
                if (r.bottom < -80 || r.top > wh + 80) {
                  setIsVisible(false);
                }
              }
            }
          });
        },
        {
          root: rootEl,
          threshold: 0.08,
          rootMargin: '0px 0px -20px 0px',
        }
      );
      observer.observe(node);
    }

    // 3. Scroll and Resize event listeners
    const scrollParent = getScrollParent();
    if (scrollParent && scrollParent !== window) {
      scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    }
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer && node) observer.disconnect();
      if (scrollParent && scrollParent !== window) {
        scrollParent.removeEventListener('scroll', checkVisibility);
      }
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="space-y-4 font-['Plus_Jakarta_Sans',sans-serif] tripgen-reveal-section is-revealed select-text"
    >
      {/* ─── SCOPED HIGH-PERFORMANCE 60FPS CSS KEYFRAMES & TRANSITIONS ─── */}
      <style>{`
        /* 1. Red Lock Entrance Pop & Aura */
        @keyframes tgRedLockPop {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.18) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes tgRedAuraPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(239, 68, 68, 0);
          }
        }

        /* 2. Blue Calendar Entrance Pop & Aura */
        @keyframes tgBlueCalPop {
          0% {
            transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.18) rotate(-5deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes tgBlueAuraPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 98, 255, 0.45);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(0, 98, 255, 0);
          }
        }

        /* 3. Dev Credential Pill Pulse */
        @keyframes tgAdminPillPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.25);
            border-color: rgba(254, 205, 211, 0.9);
          }
          50% {
            box-shadow: 0 0 10px 2px rgba(225, 29, 72, 0.35);
            border-color: rgba(244, 63, 94, 0.7);
          }
        }

        /* 4. Rotating Gear for Hardening Box */
        @keyframes tgGearSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* 5. Cascading Bullet Checkmark Pop */
        @keyframes tgCheckPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* 6. Info Heartbeat Pulse */
        @keyframes tgInfoHeartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.18);
          }
        }

        /* 7. Status Pill Subtle Glows */
        @keyframes tgConfirmedGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.25);
          }
          50% {
            box-shadow: 0 0 8px 1px rgba(16, 185, 129, 0.4);
          }
        }
        @keyframes tgPendingGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.25);
          }
          50% {
            box-shadow: 0 0 8px 1px rgba(245, 158, 11, 0.4);
          }
        }

        /* 8. Light Sweep on Footer Flight Banner */
        @keyframes tgSweepShimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(250%);
          }
        }

        .anim-red-lock {
          animation: tgRedLockPop 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards, tgRedAuraPulse 2.8s ease-in-out infinite 0.7s;
        }
        .anim-blue-cal {
          animation: tgBlueCalPop 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards, tgBlueAuraPulse 2.8s ease-in-out infinite 0.7s;
        }
        .anim-gear-spin {
          animation: tgGearSpin 16s linear infinite;
        }
        .anim-info-pulse {
          animation: tgInfoHeartbeat 2.6s ease-in-out infinite;
        }
        .anim-admin-pill {
          animation: tgAdminPillPulse 2.5s ease-in-out infinite;
        }
        .anim-confirmed-pill {
          animation: tgConfirmedGlow 2.5s ease-in-out infinite;
        }
        .anim-pending-pill {
          animation: tgPendingGlow 2.5s ease-in-out infinite;
        }
        .anim-bullet-pop {
          animation: tgCheckPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ─── SECTION HEADER ─── */}
      <div>
        <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Security &amp; Implementation Notes
        </h2>
      </div>

      {/* ─── MASTER INFOGRAPHIC CONTAINER (SKY BLUE BACKDROP MATCHING IMAGE 2) ─── */}
      <div className="bg-[#EAF4FD] rounded-2xl sm:rounded-3xl border-2 border-sky-300/80 shadow-xl shadow-sky-500/10 overflow-hidden transition-all duration-300">

        {/* ─── 1. TOP SCENIC PANORAMIC BANNER ("top slowly coming into position") ─── */}
        <div
          className="relative w-full overflow-hidden bg-sky-100 min-h-[140px] xs:min-h-[160px] sm:min-h-[220px] md:min-h-[260px] max-h-[350px]"
          style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-48px) scale(0.985)',
            opacity: isVisible ? 1 : 0,
            transition: 'transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Base Original Banner: Crystal-clear TripGen logo, typography, airplanes, flight path, and scenery */}
          <img
            src="/tripgen_security_banner.png"
            alt="TripGen Travel Plan Itinerary Generator"
            className="w-full h-auto min-h-[140px] xs:min-h-[160px] sm:min-h-[220px] md:min-h-[260px] max-h-[350px] object-cover object-center select-none block"
            style={{ imageRendering: 'high-quality' }}
            loading="eager"
          />

          {/* Automatic Continuous Realistic Waterfall Video & Surrounding Pool Waves */}
          <TripGenWaterfall />

          {/* Blue Section Divider: Continuous Flowing Wave Transition with Medium Height Movement */}
          <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10 h-11 sm:h-14 md:h-16">
            {/* Layer 1: Back Coastal Sky Blue Wave */}
            <div className="absolute -bottom-3 inset-x-0 h-[calc(100%+14px)] tripgen-wave-bob-back pointer-events-none">
              <div className="w-[200%] h-full flex tripgen-wave-back pointer-events-none">
                <svg className="w-1/2 h-full flex-shrink-0" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0,28 C 160,8 360,46 600,24 C 840,8 1040,42 1200,28 L 1200,100 L 0,100 Z"
                    fill="#38BDF8"
                    fillOpacity="0.40"
                  />
                </svg>
                <svg className="w-1/2 h-full flex-shrink-0" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0,28 C 160,8 360,46 600,24 C 840,8 1040,42 1200,28 L 1200,100 L 0,100 Z"
                    fill="#38BDF8"
                    fillOpacity="0.40"
                  />
                </svg>
              </div>
            </div>

            {/* Layer 2: Middle Azure Blue Wave */}
            <div className="absolute -bottom-3 inset-x-0 h-[calc(100%+14px)] tripgen-wave-bob-mid pointer-events-none">
              <div className="w-[200%] h-full flex tripgen-wave-mid pointer-events-none">
                <svg className="w-1/2 h-full flex-shrink-0" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0,36 C 140,54 320,16 520,38 C 720,54 920,16 1100,38 C 1150,38 1180,36 1200,36 L 1200,100 L 0,100 Z"
                    fill="#0284C7"
                    fillOpacity="0.28"
                  />
                </svg>
                <svg className="w-1/2 h-full flex-shrink-0" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0,36 C 140,54 320,16 520,38 C 720,54 920,16 1100,38 C 1150,38 1180,36 1200,36 L 1200,100 L 0,100 Z"
                    fill="#0284C7"
                    fillOpacity="0.28"
                  />
                </svg>
              </div>
            </div>

            {/* Layer 3: Foreground Wave Transitioning into Container Background */}
            <div className="absolute -bottom-3 inset-x-0 h-[calc(100%+14px)] tripgen-wave-bob-front pointer-events-none">
              <div className="w-[200%] h-full flex tripgen-wave-front pointer-events-none">
                <svg className="w-1/2 h-full flex-shrink-0" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0,44 C 160,22 360,56 600,38 C 840,20 1040,50 1200,44 L 1200,100 L 0,100 Z"
                    fill="#EAF4FD"
                  />
                </svg>
                <svg className="w-1/2 h-full flex-shrink-0" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0,44 C 160,22 360,56 600,38 C 840,20 1040,50 1200,44 L 1200,100 L 0,100 Z"
                    fill="#EAF4FD"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. THE TWO CORE CARDS (LEFT & RIGHT BOTTOM CORNERS) ─── */}
        <div className="relative z-10 px-1.5 xs:px-2 sm:px-8 -mt-2 sm:-mt-3 md:-mt-4 pb-3.5 xs:pb-4 sm:pb-5">
          <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-5 items-stretch">

            {/* ─── LEFT CARD: DEVELOPMENT DEFAULT CREDENTIAL ADVISORY ─── */}
            {/* Comes in from the LEFT SIDE BOTTOM CORNER */}
            <div
              className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl border border-rose-200/80 p-1.5 xs:p-2 sm:p-5 shadow-xs flex flex-col justify-between space-y-1.5 xs:space-y-2 sm:space-y-4 hover:shadow-xl hover:shadow-rose-500/15 hover:border-rose-300 transition-all duration-300 group/leftcard select-text"
              style={{
                transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(-80px, 55px, 0) scale(0.95)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.18s',
                willChange: 'transform, opacity',
              }}
            >
              {/* Card Header: Red Lock (Circular) + Vertical Red Bar + Red Title */}
              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3">
                <div
                  className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-10 sm:h-10 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[9px] xs:text-[10px] sm:text-lg shadow-sm shrink-0 transition-transform duration-300 group-hover/leftcard:scale-110 ${
                    isVisible ? 'anim-red-lock' : 'scale-0 opacity-0'
                  }`}
                  title="Security Advisory Badge"
                >
                  <i className="fa-solid fa-lock group-hover/leftcard:rotate-6 transition-transform"></i>
                </div>
                <div
                  className="w-[2px] sm:w-[3px] bg-[#EF4444] rounded-full transition-all duration-700 ease-out"
                  style={{
                    height: isVisible ? '18px' : '0px',
                    transitionDelay: '0.35s',
                  }}
                ></div>
                <h3 className="text-[8px] xs:text-[9.5px] sm:text-lg font-black text-[#EF4444] tracking-tight leading-tight">
                  Development Default Credential Advisory
                </h3>
              </div>

              {/* Main Explanatory Paragraph with admin/admin badge */}
              <p className="text-[7px] xs:text-[8px] sm:text-[13px] text-slate-800 sm:text-slate-600 leading-tight sm:leading-relaxed font-medium sm:font-normal">
                The current prototype incorporates default administrator credentials ({' '}
                <span
                  className="inline-flex items-center gap-0.5 sm:gap-1.5 px-1 xs:px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-lg bg-rose-100/90 border border-rose-300/80 text-rose-600 font-extrabold text-[6.5px] xs:text-[7.5px] sm:text-xs font-mono tracking-wider anim-admin-pill hover:scale-105 transition-transform cursor-pointer shadow-2xs"
                  title="Default Local Development Credentials"
                >
                  <i className="fa-solid fa-key text-[6px] xs:text-[7px] sm:text-[10px] text-rose-500"></i>
                  <span>admin/admin</span>
                </span>{' '}
                ) strictly as an educational and local development default.
              </p>

              {/* Inner Box: Production Hardening Recommendations */}
              <div
                className="p-1.5 xs:p-2 sm:p-5 rounded-lg xs:rounded-xl sm:rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1 xs:space-y-1.5 sm:space-y-3 transition-all duration-500 hover:border-rose-300/90 hover:bg-rose-50/80"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.8s ease-out 0.35s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
                }}
              >
                {/* Subheading: Red Cog + Title */}
                <div className="flex items-center gap-1 sm:gap-2 text-rose-600 font-black text-[7px] xs:text-[8px] sm:text-sm">
                  <i className="fa-solid fa-gear text-[7px] xs:text-[8px] sm:text-sm anim-gear-spin"></i>
                  <span>Production Hardening Recommendations:</span>
                </div>

                {/* 3 Bullets with Dark Rose Circle Checkmarks & Interactive Hover */}
                <div className="space-y-1 xs:space-y-1.5 sm:space-y-2 pt-0.5 sm:pt-1">
                  {[
                    "Replace development defaults with Django's standard salted PBKDF2/Argon2 password hashers.",
                    "Enforce environment variables for Django SECRET_KEY and database credentials.",
                    "Enforce CSRF protection tokens and HTTPS cookie flags (SESSION_COOKIE_SECURE)."
                  ].map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-1 xs:gap-1.5 sm:gap-2.5 p-0.5 sm:p-1.5 -ml-0.5 sm:-ml-1.5 rounded-md sm:rounded-xl hover:bg-rose-100/70 transition-all duration-200 hover:translate-x-1 group/bullet cursor-default"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
                        transition: `opacity 0.6s ease-out ${0.45 + idx * 0.14}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.45 + idx * 0.14}s`,
                      }}
                    >
                      <div
                        className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full bg-[#E11D48] text-white flex items-center justify-center text-[5.5px] xs:text-[6.5px] sm:text-[9px] shrink-0 mt-0.5 shadow-2xs font-black group-hover/bullet:scale-125 transition-transform ${
                          isVisible ? 'anim-bullet-pop' : 'scale-0'
                        }`}
                        style={{ animationDelay: `${0.45 + idx * 0.14}s` }}
                      >
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <span className="text-[6px] xs:text-[7px] sm:text-[13px] font-semibold text-slate-700 leading-tight sm:leading-snug group-hover/bullet:text-rose-950 transition-colors">
                        {rec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ─── RIGHT CARD: BOOKING & PAYMENT WORKFLOW STATUS ─── */}
            {/* Comes in from the RIGHT SIDE BOTTOM CORNER */}
            <div
              className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl border border-sky-200/80 p-1.5 xs:p-2 sm:p-5 shadow-xs flex flex-col justify-between space-y-1.5 xs:space-y-2 sm:space-y-4 hover:shadow-xl hover:shadow-sky-500/15 hover:border-sky-300 transition-all duration-300 group/rightcard select-text"
              style={{
                transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(80px, 55px, 0) scale(0.95)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 1.15s cubic-bezier(0.16, 1, 0.3, 1) 0.26s, opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.26s',
                willChange: 'transform, opacity',
              }}
            >
              {/* Card Header: Blue Calendar (Circular) + Vertical Blue Bar + Blue Title */}
              <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3">
                <div
                  className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-10 sm:h-10 rounded-full bg-[#0062FF] text-white flex items-center justify-center text-[9px] xs:text-[10px] sm:text-lg shadow-sm shrink-0 transition-transform duration-300 group-hover/rightcard:scale-110 ${
                    isVisible ? 'anim-blue-cal' : 'scale-0 opacity-0'
                  }`}
                  title="Workflow Status Badge"
                >
                  <i className="fa-regular fa-calendar-days group-hover/rightcard:-translate-y-0.5 transition-transform"></i>
                </div>
                <div
                  className="w-[2px] sm:w-[3px] bg-[#0062FF] rounded-full transition-all duration-700 ease-out"
                  style={{
                    height: isVisible ? '18px' : '0px',
                    transitionDelay: '0.40s',
                  }}
                ></div>
                <h3 className="text-[8px] xs:text-[9.5px] sm:text-lg font-black text-[#0062FF] tracking-tight leading-tight">
                  Booking &amp; Payment Workflow Status
                </h3>
              </div>

              {/* Main Explanatory Paragraph with Confirmed & Pending badges */}
              <p className="text-[7px] xs:text-[8px] sm:text-[13px] text-slate-800 sm:text-slate-600 leading-tight sm:leading-relaxed font-medium sm:font-normal">
                The booking checkout module persists reservation records directly into the MySQL database with status indicators{' '}
                <span
                  className="inline-flex items-center px-1 xs:px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-lg bg-emerald-100 text-emerald-700 font-extrabold text-[6.5px] xs:text-[7.5px] sm:text-xs border border-emerald-300/80 anim-confirmed-pill hover:scale-105 transition-transform cursor-pointer shadow-2xs"
                  title="Confirmed Reservation Status with Live Activity"
                >
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mr-0.5 sm:mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                  </span>
                  <span>Confirmed</span>
                </span>{' '}
                /{' '}
                <span
                  className="inline-flex items-center px-1 xs:px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-lg bg-amber-100 text-amber-700 font-extrabold text-[6.5px] xs:text-[7.5px] sm:text-xs border border-amber-300/80 anim-pending-pill hover:scale-105 transition-transform cursor-pointer shadow-2xs"
                  title="Pending Reservation Status Awaiting Action"
                >
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mr-0.5 sm:mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-amber-500"></span>
                  </span>
                  <span>Pending</span>
                </span>{' '}
                for reservation tracking.
              </p>

              {/* Inner Box: Implementation Clarity */}
              <div
                className="p-1.5 xs:p-2 sm:p-5 rounded-lg xs:rounded-xl sm:rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-1 xs:space-y-1.5 sm:space-y-3 transition-all duration-500 hover:border-sky-300/90 hover:bg-sky-50/80"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.8s ease-out 0.40s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.40s',
                }}
              >
                {/* Subheading: Blue Info + Title */}
                <div className="flex items-center gap-1 sm:gap-2 text-blue-700 font-black text-[7px] xs:text-[8px] sm:text-sm">
                  <i className="fa-solid fa-circle-info text-[7.5px] xs:text-[8.5px] sm:text-sm text-[#0062FF] anim-info-pulse"></i>
                  <span>Implementation Clarity:</span>
                </div>

                {/* 2 Bullets with Blue Circle Checkmarks & Interactive Hover */}
                <div className="space-y-1 xs:space-y-1.5 sm:space-y-2 pt-0.5 sm:pt-1">
                  <div
                    className="flex items-start gap-1 xs:gap-1.5 sm:gap-2.5 p-0.5 sm:p-1.5 -ml-0.5 sm:-ml-1.5 rounded-md sm:rounded-xl hover:bg-sky-100/70 transition-all duration-200 hover:translate-x-1 group/item cursor-default"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(12px)',
                      transition: 'opacity 0.6s ease-out 0.50s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.50s',
                    }}
                  >
                    <div
                      className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full bg-[#0062FF] text-white flex items-center justify-center text-[5.5px] xs:text-[6.5px] sm:text-[9px] shrink-0 mt-0.5 shadow-2xs font-black group-hover/item:scale-125 transition-transform ${
                        isVisible ? 'anim-bullet-pop' : 'scale-0'
                      }`}
                      style={{ animationDelay: '0.50s' }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="text-[6px] xs:text-[7px] sm:text-[13px] text-slate-700 leading-tight sm:leading-snug font-medium group-hover/item:text-blue-950 transition-colors">
                      <strong className="text-slate-900 font-bold">Implemented:</strong> Full reservation lifecycle, unique booking references, and cancellation actions.
                    </span>
                  </div>

                  <div
                    className="flex items-start gap-1 xs:gap-1.5 sm:gap-2.5 p-0.5 sm:p-1.5 -ml-0.5 sm:-ml-1.5 rounded-md sm:rounded-xl hover:bg-sky-100/70 transition-all duration-200 hover:translate-x-1 group/item cursor-default"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(12px)',
                      transition: 'opacity 0.6s ease-out 0.64s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.64s',
                    }}
                  >
                    <div
                      className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full bg-[#0062FF] text-white flex items-center justify-center text-[5.5px] xs:text-[6.5px] sm:text-[9px] shrink-0 mt-0.5 shadow-2xs font-black group-hover/item:scale-125 transition-transform ${
                        isVisible ? 'anim-bullet-pop' : 'scale-0'
                      }`}
                      style={{ animationDelay: '0.64s' }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="text-[6px] xs:text-[7px] sm:text-[13px] text-slate-700 leading-tight sm:leading-snug font-medium group-hover/item:text-blue-950 transition-colors">
                      <strong className="text-slate-900 font-bold">Planned Enhancement:</strong> Integration with live payment gateways (Razorpay / Stripe) for webhook-driven real-time payment authorization.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ─── 4. BOTTOM FOOTER BANNER ("Explore • Book • Experience") ─── */}
        <div
          className="relative w-full overflow-hidden border-t border-sky-200/60 bg-sky-50/40 h-[48px] sm:h-[62px] md:h-[72px]"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
            opacity: isVisible ? 1 : 0,
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.36s, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.36s',
            willChange: 'transform, opacity',
          }}
        >
          <img
            src="/tripgen_security_footer.jpg"
            alt="Explore • Book • Experience"
            className="w-full h-full object-cover object-top select-none block"
            loading="lazy"
          />

          {/* Gentle Shimmer Flight Path Glint */}
          <div
            className="absolute inset-0 w-1/3 h-full pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{
              animation: 'tgSweepShimmer 6s ease-in-out infinite 1.5s',
            }}
          />
        </div>

      </div>
    </section>
  );
}
