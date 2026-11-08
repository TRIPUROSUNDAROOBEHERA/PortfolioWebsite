import React, { useState, useRef, useEffect } from 'react';

// ─── 6 FULL-STACK DEVELOPER RESPONSIBILITIES (DATA MATCHING USER SPECIFICATION) ───
const CONTRIBUTIONS_DATA = [
  {
    id: 1,
    title: 'Backend Development',
    color: '#2563EB', // Royal Blue
    accentColor: '#1D4ED8',
    lightBg: '#EFF6FF',
    cardBorder: 'border-blue-200/90',
    hoverBorder: 'hover:border-blue-300',
    activeBg: 'bg-blue-50/70',
    barColor: 'bg-[#2563EB]',
    textColor: 'text-[#2563EB]',
    icon: 'fa-solid fa-server',
    points: [
      'Developed Django views and handled user requests.',
      'Configured URLs for Admin, Employee, and Traveler modules.',
      'Implemented validation, error handling, and sessions.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'Python, Django, MVT Architecture'
    }
  },
  {
    id: 2,
    title: 'Database Management',
    color: '#0284C7', // Ocean / Sky Blue
    accentColor: '#0369A1',
    lightBg: '#F0F9FF',
    cardBorder: 'border-sky-200/90',
    hoverBorder: 'hover:border-sky-300',
    activeBg: 'bg-sky-50/70',
    barColor: 'bg-[#0284C7]',
    textColor: 'text-[#0284C7]',
    icon: 'fa-solid fa-database',
    points: [
      'Managed data for employees, hotels, transport, and bookings.',
      'Created database tables and relationships.',
      'Performed CRUD operations using SQL queries.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'MySQL, SQL'
    }
  },
  {
    id: 3,
    title: 'Frontend Development',
    color: '#06B6D4', // Vivid Cyan
    accentColor: '#0891B2',
    lightBg: '#ECFEFF',
    cardBorder: 'border-cyan-200/90',
    hoverBorder: 'hover:border-cyan-300',
    activeBg: 'bg-cyan-50/70',
    barColor: 'bg-[#06B6D4]',
    textColor: 'text-[#06B6D4]',
    icon: 'fa-solid fa-laptop-code',
    points: [
      'Designed 34 Django HTML templates.',
      'Created forms, tables, and dashboards.',
      'Built responsive layouts with interactive elements.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'HTML5, Tailwind CSS, JavaScript'
    }
  },
  {
    id: 4,
    title: 'Authentication & Authorization',
    color: '#0D9488', // Teal
    accentColor: '#0F766E',
    lightBg: '#F0FDFA',
    cardBorder: 'border-teal-200/90',
    hoverBorder: 'hover:border-teal-300',
    activeBg: 'bg-teal-50/70',
    barColor: 'bg-[#0D9488]',
    textColor: 'text-[#0D9488]',
    icon: 'fa-solid fa-shield-halved',
    points: [
      'Created separate login portals for Admin, Employee, and Traveler.',
      'Implemented session verification and role-based access.',
      'Documented secure password-handling practices.'
    ],
    footer: {
      label: 'Technologies:',
      value: 'Django Authentication, Sessions, Access Control'
    }
  },
  {
    id: 5,
    title: 'Application Modules',
    color: '#10B981', // Emerald
    accentColor: '#059669',
    lightBg: '#ECFDF5',
    cardBorder: 'border-emerald-200/90',
    hoverBorder: 'hover:border-emerald-300',
    activeBg: 'bg-emerald-50/70',
    barColor: 'bg-[#10B981]',
    textColor: 'text-[#10B981]',
    icon: 'fa-solid fa-cubes',
    points: [
      'Developed itinerary creation, editing, and search features.',
      'Managed hotel, transport, and booking operations.',
      'Implemented cancellations and user feedback.'
    ],
    footer: {
      label: 'Tools:',
      value: 'VS Code, Git, GitHub, MySQL Workbench'
    }
  },
  {
    id: 6,
    title: 'Testing & Debugging',
    color: '#84CC16', // Lime / Green
    accentColor: '#65A30D',
    lightBg: '#F7FEE7',
    cardBorder: 'border-lime-200/90',
    hoverBorder: 'hover:border-lime-300',
    activeBg: 'bg-lime-50/70',
    barColor: 'bg-[#84CC16]',
    textColor: 'text-[#84CC16]',
    icon: 'fa-solid fa-vial-circle-check',
    points: [
      'Tested form validation and login functionality.',
      'Checked access permissions and database operations.',
      'Verified booking records and status updates.'
    ],
    footer: {
      label: 'Tools:',
      value: 'Django Testing, MySQL Workbench, Python'
    }
  }
];

export default function TripGenContributions() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef(null);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : selectedIdx;

  // ─── SCROLL & REFRESH OBSERVER (BUFFER ROUND TO PUSH CONTENT ANIMATION) ───
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            setAnimKey((prev) => prev + 1);
          } else {
            // Reset so scrolling away and returning triggers the animation again
            setIsRevealed(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);

    // Immediate check on initial mount / page refresh
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
      setAnimKey((prev) => prev + 1);
    }

    return () => observer.disconnect();
  }, []);

  // ─── MATHEMATICAL GEOMETRY FOR THE PINWHEEL IRIS SHUTTER ───
  const cx = 200;
  const cy = 200;
  const rCenter = 65;
  const rRimIn = 146;
  const rRimOut = 175;
  const beta = (Math.acos(rCenter / rRimIn) * 180) / Math.PI; // ~63.56 deg

  const polar = (r, deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  const handleCardClick = (idx) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
  };

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <section ref={sectionRef} className="space-y-6 tripgen-reveal-section font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── BUFFER THE ROUND & PUSH CONTENT KEYFRAME ANIMATIONS ─── */}
      <style>{`
        /* 1. Buffer the Round Wheel on Scroll & Refresh */
        @keyframes tripgenWheelBuffer {
          0% {
            transform: rotate(-180deg) scale(0.65);
            opacity: 0;
            filter: drop-shadow(0 0 0px rgba(37, 99, 235, 0));
          }
          55% {
            transform: rotate(20deg) scale(1.05);
            opacity: 1;
            filter: drop-shadow(0 0 20px rgba(37, 99, 235, 0.35));
          }
          80% {
            transform: rotate(-6deg) scale(0.98);
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
            filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.12));
          }
        }

        /* 2. Push the All Content Showing (Cards cascade in from wheel) */
        @keyframes tripgenCardPush {
          0% {
            opacity: 0;
            transform: translate3d(-38px, 0, 0) scale(0.94);
          }
          65% {
            opacity: 1;
            transform: translate3d(6px, 0, 0) scale(1.015);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        /* 3. Idle Floating Breathing after Entrance */
        @keyframes tripgenWheelFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(0.4deg);
          }
        }

        .tripgen-anim-active .tripgen-wheel-wrap {
          animation: tripgenWheelBuffer 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tripgen-anim-active .tripgen-push-card-1 {
          animation: tripgenCardPush 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
        }
        .tripgen-anim-active .tripgen-push-card-2 {
          animation: tripgenCardPush 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.40s both;
        }
        .tripgen-anim-active .tripgen-push-card-3 {
          animation: tripgenCardPush 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.52s both;
        }
        .tripgen-anim-active .tripgen-push-card-4 {
          animation: tripgenCardPush 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.64s both;
        }
        .tripgen-anim-active .tripgen-push-card-5 {
          animation: tripgenCardPush 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.76s both;
        }
        .tripgen-anim-active .tripgen-push-card-6 {
          animation: tripgenCardPush 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.88s both;
        }

        .tripgen-blade-wedge {
          transition: fill 0.25s ease, fill-opacity 0.25s ease;
        }
        .tripgen-blade-arc {
          transition: transform 0.25s ease, filter 0.25s ease;
          transform-origin: 200px 200px;
        }
        .tripgen-blade-spoke {
          transition: stroke-width 0.25s ease;
        }
        .tripgen-blade-icon {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center;
        }
      `}</style>

      {/* ─── SECTION TITLE ─── */}
      <div className="text-left">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          My Contributions
        </h2>
      </div>

      {/* ─── MASTER INFOGRAPHIC CANVAS (EXACT MATCH TO REFERENCE IMAGE 2) ─── */}
      <div
        key={animKey}
        className={`${isRevealed ? 'tripgen-anim-active' : ''} bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl border border-slate-200/80 p-2 xs:p-3 sm:p-7 lg:p-8 shadow-xs relative overflow-hidden`}
      >
        <div className="grid grid-cols-12 gap-1.5 xs:gap-2.5 sm:gap-6 lg:gap-10 items-center">
          
          {/* ─── LEFT: PINWHEEL IRIS APERTURE WHEEL WITH BUFFER ANIMATION ─── */}
          <div className="col-span-4 xs:col-span-4 lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-[120px] xs:max-w-[145px] sm:max-w-[370px] lg:max-w-[390px] aspect-square relative select-none">
              <div className="tripgen-wheel-wrap w-full h-full">
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-sm">
                {/* 6 APERTURE BLADES */}
                {CONTRIBUTIONS_DATA.map((item, i) => {
                  const thetaStart = -90 + i * 60;
                  const thetaEnd = -90 + (i + 1) * 60;
                  const phiStart = thetaStart + beta;
                  const phiEnd = thetaEnd + beta;

                  const pRimStart = polar(rRimIn, thetaStart);
                  const pRimEnd = polar(rRimIn, thetaEnd);
                  const pCenterEnd = polar(rCenter, phiEnd);
                  const pCenterStart = polar(rCenter, phiStart);

                  const wedgeD = `M ${pRimStart.x.toFixed(2)} ${pRimStart.y.toFixed(2)} ` +
                                 `A ${rRimIn} ${rRimIn} 0 0 1 ${pRimEnd.x.toFixed(2)} ${pRimEnd.y.toFixed(2)} ` +
                                 `L ${pCenterEnd.x.toFixed(2)} ${pCenterEnd.y.toFixed(2)} ` +
                                 `A ${rCenter} ${rCenter} 0 0 0 ${pCenterStart.x.toFixed(2)} ${pCenterStart.y.toFixed(2)} Z`;

                  const arcStart = thetaStart + 1.5;
                  const arcEnd = thetaEnd - 1.5;
                  const pOut1 = polar(rRimOut, arcStart);
                  const pOut2 = polar(rRimOut, arcEnd);
                  const pIn2 = polar(rRimIn, arcEnd);
                  const pIn1 = polar(rRimIn, arcStart);

                  const arcD = `M ${pOut1.x.toFixed(2)} ${pOut1.y.toFixed(2)} ` +
                               `A ${rRimOut} ${rRimOut} 0 0 1 ${pOut2.x.toFixed(2)} ${pOut2.y.toFixed(2)} ` +
                               `L ${pIn2.x.toFixed(2)} ${pIn2.y.toFixed(2)} ` +
                               `A ${rRimIn} ${rRimIn} 0 0 0 ${pIn1.x.toFixed(2)} ${pIn1.y.toFixed(2)} Z`;

                  const pSpokeStart = polar(rRimIn, thetaStart);
                  const pSpokeEnd = polar(rCenter, phiStart);

                  const midAngle = thetaStart + 30;
                  const pIcon = polar(106, midAngle);

                  const isItemActive = activeIdx === i;

                  return (
                    <g
                      key={item.id}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => handleCardClick(i)}
                    >
                      {/* Blade Wedge Surface */}
                      <path
                        d={wedgeD}
                        fill={isItemActive ? item.lightBg : '#FFFFFF'}
                        stroke="#F1F5F9"
                        strokeWidth="1.5"
                        className="tripgen-blade-wedge"
                      />

                      {/* Outer Arc Band with dynamic hover glow */}
                      <path
                        d={arcD}
                        fill={item.color}
                        className={`tripgen-blade-arc ${isItemActive ? 'scale-[1.03] drop-shadow-md' : ''}`}
                      />

                      {/* Spoke Line Tangent to Center Hub */}
                      <line
                        x1={pSpokeStart.x.toFixed(2)}
                        y1={pSpokeStart.y.toFixed(2)}
                        x2={pSpokeEnd.x.toFixed(2)}
                        y2={pSpokeEnd.y.toFixed(2)}
                        stroke={item.color}
                        strokeWidth={isItemActive ? '4.5' : '3'}
                        strokeLinecap="round"
                        className="tripgen-blade-spoke"
                      />

                      {/* Icon Container inside Blade */}
                      <g
                        className={`tripgen-blade-icon ${isItemActive ? 'scale-125' : 'group-hover:scale-110'}`}
                        transform={`translate(${pIcon.x.toFixed(2)}, ${pIcon.y.toFixed(2)})`}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r="16.5"
                          fill="#FFFFFF"
                          stroke={item.color}
                          strokeWidth="1.75"
                          className="drop-shadow-xs"
                        />
                        <foreignObject x="-15" y="-15" width="30" height="30" className="pointer-events-none">
                          <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className="w-full h-full flex items-center justify-center text-[15px]"
                            style={{ color: item.color }}
                          >
                            <i className={item.icon}></i>
                          </div>
                        </foreignObject>
                      </g>
                    </g>
                  );
                })}

                {/* CENTER DARK CIRCLE HUB (Exact match to RPA hub in Image 2) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={rCenter}
                  fill="#1E293B"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  filter="drop-shadow(0 8px 16px rgba(0,0,0,0.22))"
                />
                <text
                  x={cx}
                  y={cy - 5}
                  textAnchor="middle"
                  fontSize="19.5"
                  fontWeight="900"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="1"
                >
                  <tspan fill="#FFFFFF">Trip</tspan>
                  <tspan fill="#FF2B2B">Gen</tspan>
                </text>
                <text
                  x={cx}
                  y={cy + 16}
                  textAnchor="middle"
                  fill="#38BDF8"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="1.5"
                >
                  FULL-STACK
                </text>
              </svg>
            </div>
          </div>
        </div>

          {/* ─── RIGHT: 2 COLUMNS OF 3 ITEMS (EXACT MATCH TO REFERENCE IMAGE 2) ─── */}
          <div className="col-span-8 xs:col-span-8 lg:col-span-7">
            <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-4.5">
              
              {/* COLUMN 1: ITEMS 1, 2, 3 (Core Development) */}
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3.5">
                {CONTRIBUTIONS_DATA.slice(0, 3).map((item, localIdx) => {
                  const globalIdx = localIdx;
                  const isItemActive = activeIdx === globalIdx;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredIdx(globalIdx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => handleCardClick(globalIdx)}
                      className={`tripgen-push-card-${globalIdx + 1} flex items-start gap-1.5 xs:gap-2 sm:gap-3 p-1.5 xs:p-2 sm:p-3.5 rounded-lg xs:rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer shadow-2xs group ${
                        isItemActive
                          ? `${item.activeBg} ${item.cardBorder} shadow-sm scale-[1.01]`
                          : 'bg-white border-slate-200/80 hover:bg-slate-50/70 hover:border-slate-300'
                      }`}
                    >
                      {/* Colored Vertical Indicator Bar (Matching Image 2) */}
                      <div
                        className={`w-1 sm:w-2 self-stretch rounded-full shrink-0 min-h-[24px] sm:min-h-[36px] transition-transform duration-200 ${
                          isItemActive ? 'scale-y-105' : ''
                        }`}
                        style={{ backgroundColor: item.color }}
                      />

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <div className="mb-0.5 sm:mb-1">
                          <h3 className="font-extrabold text-[8px] xs:text-[9.5px] sm:text-sm text-slate-900 tracking-tight leading-tight sm:leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        {/* Bullet Points (Tightened Spacing) */}
                        <ul className="space-y-0.5 sm:space-y-1 my-0.5 sm:my-1">
                          {item.points.map((pt, pIdx) => (
                            <li
                              key={pIdx}
                              className="text-[7.5px] xs:text-[8px] sm:text-xs text-slate-800 leading-tight font-medium sm:font-normal flex items-start gap-1 sm:gap-2"
                            >
                              <span
                                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 mt-0.5 sm:mt-1"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="line-clamp-2 xs:line-clamp-3 sm:line-clamp-none">{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Footer Technologies / Tools (Zero Extra Gap) */}
                        {item.footer && (
                          <div className="pt-0.5 sm:pt-1.5 mt-0.5 sm:mt-1 text-[6px] xs:text-[7px] sm:text-xs font-medium text-slate-700 border-t border-slate-100 flex items-baseline gap-1 sm:gap-1.5">
                            <span className="font-bold shrink-0" style={{ color: item.color }}>
                              {item.footer.label}
                            </span>
                            <span className="text-slate-600 font-normal truncate">
                              {item.footer.value}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* COLUMN 2: ITEMS 4, 5, 6 (Platform Operations & Assurance) */}
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3.5">
                {CONTRIBUTIONS_DATA.slice(3, 6).map((item, localIdx) => {
                  const globalIdx = localIdx + 3;
                  const isItemActive = activeIdx === globalIdx;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredIdx(globalIdx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => handleCardClick(globalIdx)}
                      className={`tripgen-push-card-${globalIdx + 1} flex items-start gap-1.5 xs:gap-2 sm:gap-3 p-1.5 xs:p-2 sm:p-3.5 rounded-lg xs:rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer shadow-2xs group ${
                        isItemActive
                          ? `${item.activeBg} ${item.cardBorder} shadow-sm scale-[1.01]`
                          : 'bg-white border-slate-200/80 hover:bg-slate-50/70 hover:border-slate-300'
                      }`}
                    >
                      {/* Colored Vertical Indicator Bar (Matching Image 2) */}
                      <div
                        className={`w-1 sm:w-2 self-stretch rounded-full shrink-0 min-h-[24px] sm:min-h-[36px] transition-transform duration-200 ${
                          isItemActive ? 'scale-y-105' : ''
                        }`}
                        style={{ backgroundColor: item.color }}
                      />

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <div className="mb-0.5 sm:mb-1">
                          <h3 className="font-extrabold text-[8px] xs:text-[9.5px] sm:text-sm text-slate-900 tracking-tight leading-tight sm:leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        {/* Bullet Points (Tightened Spacing) */}
                        <ul className="space-y-0.5 sm:space-y-1 my-0.5 sm:my-1">
                          {item.points.map((pt, pIdx) => (
                            <li
                              key={pIdx}
                              className="text-[7.5px] xs:text-[8px] sm:text-xs text-slate-800 leading-tight font-medium sm:font-normal flex items-start gap-1 sm:gap-2"
                            >
                              <span
                                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 mt-0.5 sm:mt-1"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="line-clamp-2 xs:line-clamp-3 sm:line-clamp-none">{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Footer Technologies / Tools (Zero Extra Gap) */}
                        {item.footer && (
                          <div className="pt-0.5 sm:pt-1.5 mt-0.5 sm:mt-1 text-[6px] xs:text-[7px] sm:text-xs font-medium text-slate-700 border-t border-slate-100 flex items-baseline gap-1 sm:gap-1.5">
                            <span className="font-bold shrink-0" style={{ color: item.color }}>
                              {item.footer.label}
                            </span>
                            <span className="text-slate-600 font-normal truncate">
                              {item.footer.value}
                            </span>
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
      </div>
    </section>
  );
}
