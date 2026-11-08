import React, { useState, useEffect, useRef } from 'react';

/**
 * 10 Core Modules matching the User's uploaded IDS Architecture Venn Diagram
 * ("Network Traffic Monitoring & Intrusion Detection System Architecture"):
 * 1. Network Traffic Monitoring
 * 2. Data Preprocessing
 * 3. Machine Learning Detection
 * 4. Attack Classification
 * 5. Intrusion Prediction
 * 6. Real-Time Alert System
 * 7. User Authentication
 * 8. Admin Dashboard
 * 9. Model Accuracy Results
 * 10. Detection Reports
 */
const IDS_MODULES = [
  {
    id: 1,
    num: '01',
    title: 'Network Traffic Monitoring',
    desc: 'Real-time packet ingestion and flow monitoring across network interfaces to identify suspicious flow anomalies.',
    color: '#0062FF',
    icon: 'fa-network-wired',
    cx: 517,
    cy: 222,
    r: 150,
  },
  {
    id: 2,
    num: '02',
    title: 'Data Preprocessing',
    desc: 'Cleans, normalizes, and encodes raw network features across 41 NSL-KDD attributes for ML readiness.',
    color: '#F59E0B',
    icon: 'fa-database',
    cx: 409,
    cy: 420,
    r: 150,
  },
  {
    id: 3,
    num: '03',
    title: 'Machine Learning Detection',
    desc: 'Employs trained ensemble classifiers (Random Forest, Decision Tree, LSTM) to detect abnormal traffic patterns.',
    color: '#10B981',
    icon: 'fa-brain',
    cx: 623,
    cy: 420,
    r: 151,
  },
  {
    id: 4,
    num: '04',
    title: 'Attack Classification',
    desc: 'Granular categorization of malicious vectors into DoS, Probe, U2R, and R2L intrusion signatures.',
    color: '#6366F1',
    icon: 'fa-shield-halved',
    cx: 301,
    cy: 568,
    r: 91,
  },
  {
    id: 5,
    num: '05',
    title: 'Intrusion Prediction',
    desc: 'Continuous sequence telemetry analyzing traffic trends to predict potential intrusion escalations in advance.',
    color: '#06B6D4',
    icon: 'fa-chart-line',
    cx: 199,
    cy: 728,
    r: 157,
  },
  {
    id: 6,
    num: '06',
    title: 'Real-Time Alert System',
    desc: 'Generates instant automated alerts dispatched to SIEM webhooks, Slack channels, and response teams.',
    color: '#F97316',
    icon: 'fa-bell',
    cx: 518,
    cy: 620,
    r: 151,
  },
  {
    id: 7,
    num: '07',
    title: 'User Authentication',
    desc: 'Provides secure multi-role registration, session tokens, JWT authorization, and access control.',
    color: '#8B5CF6',
    icon: 'fa-user-shield',
    cx: 417,
    cy: 790,
    r: 90,
  },
  {
    id: 8,
    num: '08',
    title: 'Admin Dashboard',
    desc: 'Displays interactive telemetry dashboards, server health status, node metrics, and intrusion history.',
    color: '#0D9488',
    icon: 'fa-gauge-high',
    cx: 585,
    cy: 800,
    r: 91,
  },
  {
    id: 9,
    num: '09',
    title: 'Model Accuracy Results',
    desc: 'Demonstrates benchmarked performance metrics: 99.4% detection accuracy, confusion matrices, and ROC curves.',
    color: '#EC4899',
    icon: 'fa-award',
    cx: 485,
    cy: 900,
    r: 55,
  },
  {
    id: 10,
    num: '10',
    title: 'Detection Reports',
    desc: 'Generates exportable compliance reports, threat telemetry logs, and forensic audit summaries (PDF/CSV).',
    color: '#2563EB',
    icon: 'fa-file-lines',
    cx: 904,
    cy: 722,
    r: 168,
  },
];

export default function IdsVennDiagramModules({ isEmbedded = false, onComplete } = {}) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [hoveredModule, setHoveredModule] = useState(null);
  const cardListRef = useRef(null);
  const activeCardRef = useRef(null);
  const cycleTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Auto-cycle sequentially through modules 1 to 10
  // When module 10 completes its display, call onComplete to automatically switch to Prediction Workflow
  useEffect(() => {
    if (!isAutoCycle) {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      return;
    }

    const stepDuration = 2600; // 2.6s per module

    cycleTimerRef.current = setTimeout(() => {
      if (activeStep < 10) {
        setActiveStep((prev) => prev + 1);
      } else {
        // Module 10 has completed its display duration!
        if (typeof onCompleteRef.current === 'function') {
          onCompleteRef.current();
        } else {
          setActiveStep(1);
        }
      }
    }, stepDuration);

    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [activeStep, isAutoCycle]);

  // Smooth scroll ONLY the inner module list container - NEVER scroll the page or modal
  useEffect(() => {
    const container = cardListRef.current;
    const activeCard = activeCardRef.current;
    if (!container || !activeCard) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    const cardOffsetTop = cardRect.top - containerRect.top + container.scrollTop;
    const cardHeight = cardRect.height;
    const containerHeight = container.clientHeight;

    const isAbove = cardRect.top < containerRect.top;
    const isBelow = cardRect.bottom > containerRect.bottom;

    if (isAbove) {
      container.scrollTo({
        top: Math.max(0, cardOffsetTop - 12),
        behavior: 'smooth',
      });
    } else if (isBelow) {
      container.scrollTo({
        top: cardOffsetTop + cardHeight - containerHeight + 12,
        behavior: 'smooth',
      });
    }
  }, [activeStep]);

  const handleSelectModule = (id) => {
    setActiveStep(id);
    setIsAutoCycle(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Auto-resume auto-cycle after 7 seconds of inactivity
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoCycle(true);
    }, 7000);
  };

  return (
    <div className={`w-full overflow-hidden ${isEmbedded ? '' : 'bg-white rounded-3xl border border-slate-200/90 shadow-md p-3 sm:p-5 lg:p-6'}`}>
      
      {/* ─── 2-COLUMN RESPONSIVE LAYOUT (SIDE-BY-SIDE MATCHING IMAGE 2) ─── */}
      <div className="grid grid-cols-12 gap-2.5 xs:gap-3 sm:gap-4 lg:gap-6 items-stretch">
        
        {/* ─── LEFT COLUMN: USER'S UPLOADED VENN DIAGRAM WITH SYNCHRONIZED ANIMATIONS (6 Cols on Mobile, 7 Cols on LG) ─── */}
        <div className="col-span-6 lg:col-span-7 flex flex-col justify-between">
          <div
            id="ids-venn-box"
            className="relative rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white shadow-xs p-1.5 xs:p-2 sm:p-4 lg:p-5 flex items-center justify-center h-full overflow-hidden"
          >
            {/* Interactive Image Container with 1:1 SVG Hotspot Overlay (Properly sized with balanced margins on all sides) */}
            <div className="relative w-full aspect-[1093/960] max-h-[560px] max-w-[630px] flex items-center justify-center select-none my-auto transition-transform duration-300">
              
              {/* Base User Diagram Image */}
              <img
                src="/ids_module_venn_custom.png"
                alt="IDS Architecture Venn Diagram"
                className="w-full h-full object-contain pointer-events-none select-none rounded-lg sm:rounded-xl"
              />

              {/* Synchronized Interactive SVG Hotspot Layer */}
              <svg
                viewBox="0 0 1093 960"
                className="absolute inset-0 w-full h-full pointer-events-auto"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Hotspot Circles for all 10 Modules */}
                {IDS_MODULES.map((mod) => {
                  const isActive = mod.id === activeStep;
                  const isHovered = hoveredModule === mod.id;

                  return (
                    <g
                      key={mod.id}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => handleSelectModule(mod.id)}
                      onMouseEnter={() => setHoveredModule(mod.id)}
                      onMouseLeave={() => setHoveredModule(null)}
                    >
                      {/* Active Highlight: Pure, Crisp Colored Ring Outline (No Outer Ping, No Blast, No Bleed) */}
                      {isActive && (
                        <circle
                          cx={mod.cx}
                          cy={mod.cy}
                          r={mod.r}
                          fill="none"
                          stroke={mod.color}
                          strokeWidth="4"
                          className="transition-all duration-300"
                        />
                      )}

                      {/* Hover Highlight (when not active) */}
                      {!isActive && isHovered && (
                        <circle
                          cx={mod.cx}
                          cy={mod.cy}
                          r={mod.r}
                          fill="none"
                          stroke={mod.color}
                          strokeWidth="2.5"
                          strokeDasharray="8 6"
                          opacity="0.75"
                        />
                      )}

                      {/* Active Indicator Crown Badge */}
                      {isActive && (
                        <g className="transition-all duration-300">
                          <circle
                            cx={mod.cx}
                            cy={mod.cy - mod.r + 14}
                            r="15"
                            fill={mod.color}
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            className="shadow-sm"
                          />
                          <text
                            x={mod.cx}
                            y={mod.cy - mod.r + 18}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="900"
                            fontFamily="'Plus Jakarta Sans', sans-serif"
                          >
                            {mod.id}
                          </text>
                        </g>
                      )}

                      {/* Clickable Hit Area */}
                      <circle
                        cx={mod.cx}
                        cy={mod.cy}
                        r={mod.r}
                        fill="transparent"
                        className="cursor-pointer"
                      >
                        <title>{`${mod.num}. ${mod.title} - Click to inspect`}</title>
                      </circle>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: 1 TO 10 MODULES LIST WITH SUBTEXT (6 Cols on Mobile, 5 Cols on LG) ─── */}
        <div className="col-span-6 lg:col-span-5 flex flex-col h-full min-h-0 justify-start">
          {/* Scrollable Container with all 10 Modules (clean layout with visible scrollbar removed and padding so active card borders never clip) */}
          <div
            id="ids-cards-container"
            ref={cardListRef}
            className="w-full h-full max-h-[235px] xs:max-h-[255px] sm:max-h-[360px] lg:max-h-[622px] overflow-y-auto overflow-x-hidden space-y-1.5 xs:space-y-2 sm:space-y-3 p-1 pr-1.5 sm:p-1.5 sm:pr-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {IDS_MODULES.map((mod) => {
              const isActive = mod.id === activeStep;

              return (
                <div
                  key={mod.id}
                  ref={isActive ? activeCardRef : null}
                  onClick={() => handleSelectModule(mod.id)}
                  className={`p-1.5 xs:p-2 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer flex items-start gap-1.5 xs:gap-2 sm:gap-3 relative min-h-0 sm:min-h-[90px] md:min-h-[92px] ${
                    isActive
                      ? 'bg-white shadow-md translate-x-0.5 sm:translate-x-1 border-2'
                      : 'bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: mod.color,
                          boxShadow: `0 4px 14px -2px ${mod.color}25, 0 0 0 1px ${mod.color}`,
                        }
                      : undefined
                  }
                >
                  {/* Left Active Glow Indicator Bar */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-1.5 bottom-1.5 sm:top-2.5 sm:bottom-2.5 w-1 sm:w-1.5 rounded-r-full"
                      style={{ backgroundColor: mod.color }}
                    />
                  )}

                  {/* Number Badge + Icon Container with Module Color */}
                  <div
                    className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-9 sm:h-9 rounded-md xs:rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 text-[8.5px] xs:text-[10px] sm:text-sm font-black transition-all border ${
                      isActive
                        ? 'text-white shadow-sm scale-105 border-transparent'
                        : 'border'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: mod.color }
                        : {
                            backgroundColor: `${mod.color}15`,
                            color: mod.color,
                            borderColor: `${mod.color}35`,
                          }
                    }
                  >
                    <i className={`fa-solid ${mod.icon}`}></i>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 sm:gap-2 mb-0.5">
                      <h6
                        className={`text-[8px] xs:text-[9px] sm:text-[13px] font-bold tracking-tight leading-tight ${
                          isActive ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                        }`}
                      >
                        {mod.title}
                      </h6>
                      {isActive && (
                        <span
                          className="px-1 py-0.2 sm:px-2 sm:py-0.5 rounded text-[6px] xs:text-[7px] sm:text-[9px] font-mono font-bold tracking-wider uppercase text-white shadow-2xs flex-shrink-0"
                          style={{ backgroundColor: mod.color }}
                        >
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <p className="text-[6.5px] xs:text-[7.5px] sm:text-[11.5px] text-slate-600 leading-tight sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                      {mod.desc}
                    </p>
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
