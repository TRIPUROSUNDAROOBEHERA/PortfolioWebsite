import React, { useState, useEffect, useRef } from 'react';

/**
 * 7 Workflow Steps matching Curved Path Flow
 * Intrusion Detection System (IDS)
 */
const FLOW_STEPS = [
  {
    step: 1,
    title: 'Network Traffic',
    desc: 'Normal and malicious network packets',
    color: '#0088FF', // Vibrant Blue
    glowColor: 'rgba(0, 136, 255, 0.55)',
    bgTint: 'bg-[#F0F7FF] border-[#BAE0FD]',
    activeBg: 'bg-[#E1F0FF] border-[#0088FF] shadow-[#0088FF]/30',
    gradient: 'from-[#0088FF] to-[#0055CC]',
    icon: 'fa-globe',
  },
  {
    step: 2,
    title: 'Data Collection',
    desc: 'Capture traffic and extract network features',
    color: '#8B5CF6', // Vivid Purple
    glowColor: 'rgba(139, 92, 246, 0.55)',
    bgTint: 'bg-[#F6F2FF] border-[#DDD0FE]',
    activeBg: 'bg-[#EFE7FF] border-[#8B5CF6] shadow-[#8B5CF6]/30',
    gradient: 'from-[#A78BFA] to-[#7C3AED]',
    icon: 'fa-database',
  },
  {
    step: 3,
    title: 'Data Preprocessing',
    desc: 'Clean data, encode features, and normalize values',
    color: '#EC4899', // Hot Pink
    glowColor: 'rgba(236, 72, 153, 0.55)',
    bgTint: 'bg-[#FFF0F6] border-[#FBCFE8]',
    activeBg: 'bg-[#FFE4EE] border-[#EC4899] shadow-[#EC4899]/30',
    gradient: 'from-[#F472B6] to-[#DB2777]',
    icon: 'fa-file-lines',
  },
  {
    step: 4,
    title: 'Machine Learning Model',
    desc: 'Analyze patterns and classify network traffic',
    color: '#F59E0B', // Amber / Gold
    glowColor: 'rgba(245, 158, 11, 0.55)',
    bgTint: 'bg-[#FFFBEB] border-[#FDE68A]',
    activeBg: 'bg-[#FEF3C7] border-[#F59E0B] shadow-[#F59E0B]/35',
    gradient: 'from-[#FBBF24] to-[#D97706]',
    icon: 'fa-brain',
  },
  {
    step: 5,
    title: 'Intrusion Detection & Prediction',
    desc: 'Identify normal, suspicious, and attack traffic',
    color: '#10B981', // Emerald Green
    glowColor: 'rgba(16, 185, 129, 0.55)',
    bgTint: 'bg-[#F0FDF4] border-[#A7F3D0]',
    activeBg: 'bg-[#DCFCE7] border-[#10B981] shadow-[#10B981]/30',
    gradient: 'from-[#34D399] to-[#059669]',
    icon: 'fa-magnifying-glass-chart',
  },
  {
    step: 6,
    title: 'Real-Time Alerts',
    desc: 'Notify administrators about detected threats',
    color: '#EF4444', // Red
    glowColor: 'rgba(239, 68, 68, 0.55)',
    bgTint: 'bg-[#FEF2F2] border-[#FECACA]',
    activeBg: 'bg-[#FEE2E2] border-[#EF4444] shadow-[#EF4444]/30',
    gradient: 'from-[#F87171] to-[#DC2626]',
    icon: 'fa-bell',
  },
  {
    step: 7,
    title: 'Dashboard & Database',
    desc: 'Display results and store in DB',
    color: '#0284C7', // Ocean Blue
    glowColor: 'rgba(2, 132, 199, 0.55)',
    bgTint: 'bg-[#F0F9FF] border-[#BAE6FD]',
    activeBg: 'bg-[#E0F2FE] border-[#0284C7] shadow-[#0284C7]/30',
    gradient: 'from-[#38BDF8] to-[#0284C7]',
    icon: 'fa-display',
  },
];

export default function IdsCurvedPathWorkflow() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFlowType] = useState('slide');
  const [flowSpeed] = useState(1); // 1x, 1.5x, 2x
  const timerRef = useRef(null);

  // Auto-flow loop advancing forward in direction of flow
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = Math.max(1400 / flowSpeed, 700);
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev >= 7 ? 1 : prev + 1));
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, flowSpeed]);

  // Positions on SVG canvas (1200 x 240)
  // Node Centers: X = [85, 250, 420, 590, 760, 930, 1100], Y = 105
  const nodeCoords = [
    { x: 90, y: 105 },
    { x: 255, y: 105 },
    { x: 425, y: 105 },
    { x: 595, y: 105 },
    { x: 765, y: 105 },
    { x: 935, y: 105 },
    { x: 1105, y: 105 },
  ];

  // Alternating undulating wave:
  // 1 -> 2: dips DOWN to y=190
  // 2 -> 3: arcs UP to y=20
  // 3 -> 4: dips DOWN to y=190
  // 4 -> 5: arcs UP to y=20
  // 5 -> 6: dips DOWN to y=190
  // 6 -> 7: arcs UP to y=20
  const fullCurvedPathD = `
    M 90 105 
    C 140 195, 205 195, 255 105 
    C 305 15, 375 15, 425 105 
    C 475 195, 545 195, 595 105 
    C 645 15, 715 15, 765 105 
    C 815 195, 885 195, 935 105 
    C 985 15, 1055 15, 1105 105
  `;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-7 overflow-hidden">
      {/* ─── THE MODERN CURVED PATH FLOW (DESKTOP / WIDE VIEW) ─── */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="min-w-[1020px] lg:min-w-full relative px-2 py-2">

          {/* SVG Wave Path Layer */}
          <div className="relative w-full h-[225px]">
            <svg
              viewBox="0 0 1200 225"
              className="w-full h-full overflow-visible pointer-events-none select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Smooth flowing gradient across all 7 steps */}
                <linearGradient id="curvedFlowGradientModern" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0088FF" />
                  <stop offset="16%" stopColor="#8B5CF6" />
                  <stop offset="33%" stopColor="#EC4899" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="67%" stopColor="#10B981" />
                  <stop offset="84%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>

                {/* Soft neon aura glow for the path */}
                <filter id="waveNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background ambient path track */}
              <path
                d={fullCurvedPathD}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Main colored undulating ribbon line */}
              <path
                d={fullCurvedPathD}
                fill="none"
                stroke="url(#curvedFlowGradientModern)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#waveNeonGlow)"
                className="transition-all duration-300"
              />

              {/* Directional animated flow: electric dashes moving forward */}
              <path
                d={fullCurvedPathD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeDasharray="12 16"
                strokeLinecap="round"
                opacity="0.9"
                style={{
                  animation: `flowingDashForward ${2.8 / flowSpeed}s linear infinite`,
                }}
              />

              {/* Traveling light particle orb moving forward in the direction of the flow */}
              <circle r="7" fill="#FFFFFF" filter="url(#waveNeonGlow)">
                <animateMotion
                  path={fullCurvedPathD}
                  dur={`${4.2 / flowSpeed}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </circle>
              <circle r="12" fill="#38BDF8" opacity="0.5">
                <animateMotion
                  path={fullCurvedPathD}
                  dur={`${4.2 / flowSpeed}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </circle>

              {/* In-between Directional Flow Arrows at Crests & Valleys (Flowing Left to Right) */}
              {/* Valley 1 -> 2 (x=175, y=175) */}
              <g transform="translate(178, 178) rotate(-16)">
                <polygon points="0,0 9,5 0,10" fill="#8B5CF6" />
              </g>
              {/* Crest 2 -> 3 (x=340, y=32) */}
              <g transform="translate(340, 32) rotate(16)">
                <polygon points="0,0 9,5 0,10" fill="#EC4899" />
              </g>
              {/* Valley 3 -> 4 (x=510, y=178) */}
              <g transform="translate(510, 178) rotate(-16)">
                <polygon points="0,0 9,5 0,10" fill="#F59E0B" />
              </g>
              {/* Crest 4 -> 5 (x=680, y=32) */}
              <g transform="translate(680, 32) rotate(16)">
                <polygon points="0,0 9,5 0,10" fill="#10B981" />
              </g>
              {/* Valley 5 -> 6 (x=850, y=178) */}
              <g transform="translate(850, 178) rotate(-16)">
                <polygon points="0,0 9,5 0,10" fill="#EF4444" />
              </g>
              {/* Crest 6 -> 7 (x=1020, y=32) */}
              <g transform="translate(1020, 32) rotate(16)">
                <polygon points="0,0 9,5 0,10" fill="#0088FF" />
              </g>
            </svg>

            {/* 7 Glowing Node Circles Positioned Over the SVG */}
            {FLOW_STEPS.map((item, idx) => {
              const coords = nodeCoords[idx];
              const isActive = activeStep === item.step;
              const leftPercent = (coords.x / 1200) * 100;

              return (
                <div
                  key={item.step}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    top: '105px',
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="flex flex-col items-center pointer-events-auto cursor-pointer group z-20"
                  onClick={() => {
                    setActiveStep(item.step);
                    setIsPlaying(false);
                  }}
                >
                  {/* Step Number Tag on Top */}
                  <div
                    style={{ backgroundColor: item.color }}
                    className={`w-6 h-6 rounded-full text-white text-[11px] font-black flex items-center justify-center mb-1 shadow-sm transition-all duration-300 ${isActive ? 'scale-125 ring-3 ring-white shadow-md' : 'group-hover:scale-110'
                      }`}
                  >
                    {item.step}
                    Database
                  </div>

                  {/* Main Glowing Multi-Layer Circular Badge */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer Neon Glow Halo when Active or in Glow/Pulse mode */}
                    <div
                      style={{
                        backgroundColor: item.color,
                        boxShadow: isActive ? `0 0 32px ${item.color}` : 'none',
                        opacity: isActive ? 0.45 : 0,
                      }}
                      className={`absolute -inset-2.5 rounded-full transition-all duration-500 ${activeFlowType === 'pulse' && isActive ? 'animate-ping' : 'animate-pulse'
                        }`}
                    />

                    {/* Outer Rotating Accent Ring */}
                    <div
                      style={{ borderColor: item.color }}
                      className={`w-15 h-15 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center bg-white shadow-md transition-all duration-300 ${isActive
                          ? `scale-115 border-4 shadow-xl ring-4 ring-${item.color}/20`
                          : 'group-hover:scale-105 border-opacity-75'
                        } ${activeFlowType === 'scale' && isActive ? 'scale-125' : ''}`}
                    >
                      {/* Inner Gradient Core with Icon */}
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center shadow-inner transition-transform duration-300 ${isActive ? 'scale-110' : ''
                          }`}
                      >
                        <i className={`fa-solid ${item.icon} text-lg sm:text-xl`}></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── 3. ROW OF 7 STEP DESCRIPTION CARDS (MATCHING IMAGE 2) ─── */}
          <div className="grid grid-cols-7 gap-2.5 sm:gap-3 pt-3">
            {FLOW_STEPS.map((item) => {
              const isActive = activeStep === item.step;

              return (
                <div
                  key={`card-${item.step}`}
                  onClick={() => {
                    setActiveStep(item.step);
                    setIsPlaying(false);
                  }}
                  className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-300 flex flex-col justify-between cursor-pointer border text-center ${isActive
                      ? `${item.activeBg} shadow-md scale-[1.03]`
                      : `${item.bgTint} hover:shadow-xs`
                    } ${activeFlowType === 'fade' && isActive
                      ? 'animate-fade-in'
                      : activeFlowType === 'scale' && isActive
                        ? 'scale-105'
                        : ''
                    }`}
                >
                  <div>
                    <h4
                      style={{ color: isActive ? item.color : '#0F172A' }}
                      className="font-black text-[12px] sm:text-[13px] leading-tight tracking-tight mb-1"
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug font-normal mt-1">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes for Flow Stream in Direction of Flow */}
      <style>{`
        @keyframes flowingDashForward {
          from {
            stroke-dashoffset: 56;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
