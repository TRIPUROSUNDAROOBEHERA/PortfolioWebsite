import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Shield,
  Activity,
  Zap,
  Sparkles,
} from 'lucide-react';

/**
 * 10 Modules with exact coordinates on 1024x682 master image
 * Left Column: 01, 03, 05, 07, 09
 * Right Column: 02, 04, 06, 08, 10
 */
const MODULES_10 = [
  {
    num: '01',
    id: 'traffic',
    title: 'Network Traffic Monitoring',
    desc: 'Monitors network traffic to identify suspicious activities in real-time.',
    color: '#06B6D4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    side: 'left',
    // Card bounds on 1024x682
    box: { x: 18, y: 104, w: 342, h: 86, rx: 16 },
    // Cable start and end into shield (520, 416)
    cablePath: 'M 360 144 C 400 144, 430 220, 455 290 C 475 350, 495 395, 510 412',
    duration: 1.8,
  },
  {
    num: '02',
    id: 'preprocess',
    title: 'Data Preprocessing',
    desc: 'Cleans, transforms, and prepares network data for machine learning analysis.',
    color: '#A855F7', // Purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
    side: 'right',
    box: { x: 664, y: 104, w: 342, h: 86, rx: 16 },
    cablePath: 'M 664 144 C 624 144, 594 220, 570 290 C 550 350, 535 395, 528 412',
    duration: 1.8,
  },
  {
    num: '03',
    id: 'ml_detect',
    title: 'Machine Learning Detection',
    desc: 'Uses a trained machine learning model to identify normal and abnormal network activities.',
    color: '#EC4899', // Pink / Magenta
    glowColor: 'rgba(236, 72, 153, 0.4)',
    side: 'left',
    box: { x: 18, y: 214, w: 342, h: 86, rx: 16 },
    cablePath: 'M 360 254 C 405 254, 435 320, 465 375 C 485 400, 498 412, 510 416',
    duration: 1.7,
  },
  {
    num: '04',
    id: 'classify',
    title: 'Attack Classification',
    desc: 'Classifies network traffic as normal or potentially malicious (DoS, Probe, U2R, R2L).',
    color: '#EF4444', // Red
    glowColor: 'rgba(239, 68, 68, 0.4)',
    side: 'right',
    box: { x: 664, y: 214, w: 342, h: 86, rx: 16 },
    cablePath: 'M 664 254 C 620 254, 590 320, 560 375 C 542 400, 532 412, 528 416',
    duration: 1.7,
  },
  {
    num: '05',
    id: 'predict',
    title: 'Intrusion Prediction',
    desc: 'Analyzes network traffic features to predict potential intrusions using ML models.',
    color: '#10B981', // Emerald
    glowColor: 'rgba(16, 185, 129, 0.4)',
    side: 'left',
    box: { x: 18, y: 324, w: 342, h: 86, rx: 16 },
    cablePath: 'M 360 364 C 400 370, 445 390, 475 410 C 492 420, 502 425, 512 428',
    duration: 1.6,
  },
  {
    num: '06',
    id: 'alerts',
    title: 'Real-Time Alert System',
    desc: 'Generates instant alerts when suspicious activities or potential threats are detected.',
    color: '#F97316', // Orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
    side: 'right',
    box: { x: 664, y: 324, w: 342, h: 86, rx: 16 },
    cablePath: 'M 664 364 C 624 370, 580 390, 550 410 C 535 420, 528 425, 524 428',
    duration: 1.6,
  },
  {
    num: '07',
    id: 'auth',
    title: 'User Authentication',
    desc: 'Provides secure user registration, login, and access control.',
    color: '#3B82F6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.4)',
    side: 'left',
    box: { x: 18, y: 434, w: 342, h: 86, rx: 16 },
    cablePath: 'M 360 474 C 410 474, 450 460, 480 445 C 495 438, 505 433, 514 430',
    duration: 1.8,
  },
  {
    num: '08',
    id: 'admin',
    title: 'Admin Dashboard',
    desc: 'Displays user information, intrusion detection results, and system statistics.',
    color: '#6366F1', // Indigo
    glowColor: 'rgba(99, 102, 241, 0.4)',
    side: 'right',
    box: { x: 664, y: 434, w: 342, h: 86, rx: 16 },
    cablePath: 'M 664 474 C 614 474, 574 460, 545 445 C 532 438, 525 433, 522 430',
    duration: 1.8,
  },
  {
    num: '09',
    id: 'accuracy',
    title: 'Model Accuracy Results',
    desc: 'Presents performance and accuracy metrics of implemented machine learning models.',
    color: '#F59E0B', // Amber
    glowColor: 'rgba(245, 158, 11, 0.4)',
    side: 'left',
    box: { x: 18, y: 544, w: 342, h: 86, rx: 16 },
    cablePath: 'M 360 584 C 420 584, 465 525, 492 475 C 504 455, 512 445, 516 438',
    duration: 2.0,
  },
  {
    num: '10',
    id: 'reports',
    title: 'Detection Reports',
    desc: 'Displays and generates detailed reports on intrusion predictions and detection results.',
    color: '#059669', // Mint / Emerald
    glowColor: 'rgba(5, 150, 105, 0.4)',
    side: 'right',
    box: { x: 664, y: 544, w: 342, h: 86, rx: 16 },
    cablePath: 'M 664 584 C 604 584, 560 525, 532 475 C 522 455, 518 445, 516 438',
    duration: 2.0,
  },
];

/**
 * IdsArchitecture10WorkflowAnimation
 * 
 * Recreates Master Reference Image 2 with automatic 1-to-10 sequential animation:
 * - Automatically cycles 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07 -> 08 -> 09 -> 10
 * - Illuminates each card in order with neon borders & active pulsing indicators
 * - Fires high-speed photon packets along the dedicated fiber cable into the center shield
 * - Pedestal energy rings and central shield lock surge with energy on each step
 * - Controls: Auto Run / Pause, Step Next/Prev, Speed toggle, and manual Click to Inspect
 */
export default function IdsArchitecture10WorkflowAnimation() {
  const [activeStep, setActiveStep] = useState(1); // 1 to 10
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(2000); // ms per step

  // Auto-running loop from 1 to 10
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 10 ? 1 : prev + 1));
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const currentModule = MODULES_10[activeStep - 1];

  const handleNext = () => {
    setActiveStep((prev) => (prev >= 10 ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev <= 1 ? 10 : prev - 1));
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 sm:my-8 font-['Plus_Jakarta_Sans',sans-serif] select-none">
      
      {/* ─── 1. TOP CONTROL & TELEMETRY HUD BAR ─── */}
      <div className="mb-3 px-4 py-3 rounded-2xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md text-white flex flex-wrap items-center justify-between gap-3 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        
        {/* Left: Current Active Step Info */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md transition-all duration-300"
            style={{ backgroundColor: currentModule.color, boxShadow: `0 0 20px ${currentModule.color}` }}
          >
            {currentModule.num}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
              <span className="tracking-tight">{currentModule.title}</span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider animate-pulse"
                style={{
                  color: currentModule.color,
                  borderColor: currentModule.color,
                  backgroundColor: `${currentModule.color}15`,
                }}
              >
                Step {activeStep} of 10 Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {currentModule.desc}
            </p>
          </div>
        </div>

        {/* Right: Auto Run Controls */}
        <div className="flex items-center gap-2">
          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Auto Run Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 active:scale-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer border border-indigo-400/40"
            title={isPlaying ? 'Pause automatic 1-to-10 cycle' : 'Play automatic 1-to-10 cycle'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-300" />
                <span>Auto Run: ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300" />
                <span>Play 1 to 10</span>
              </>
            )}
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Next step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed Pill Selector */}
          <button
            type="button"
            onClick={() => setSpeed(speed === 2000 ? 1200 : speed === 1200 ? 3000 : 2000)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-[10px] font-mono text-cyan-400 border border-slate-700 transition-colors cursor-pointer"
            title="Toggle playback speed"
          >
            {speed === 1200 ? 'Fast (1.2s)' : speed === 2000 ? 'Norm (2.0s)' : 'Slow (3.0s)'}
          </button>
        </div>
      </div>

      {/* ─── 2. MAIN 1024x682 CINEMATIC STAGE: EXACT IMAGE 2 WITH POINT-BY-POINT ANIMATION ─── */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#030712] border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.25)]">
        
        {/* Base Canvas Image (1024 x 682 Master Clean File without title text) */}
        <div className="relative w-full select-none">
          <img
            src="/ids_architecture_workflow_10_clean.jpg"
            alt="Intrusion Detection System Architecture & Workflow (10 Steps)"
            className="w-full h-auto object-cover sm:object-contain block pointer-events-none"
            style={{ imageRendering: 'high-quality' }}
            loading="eager"
          />

          {/* ─── POINT-BY-POINT 1-TO-10 SVG LASER & FIBER OPTIC OVERLAY ─── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1024 682"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Vibrant Laser Glow Filter */}
              <filter id="wfGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Intense Active Stream Glow Filter */}
              <filter id="wfActiveGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ─── CABLE PATHS FOR ALL 10 MODULES ─── */}
            {MODULES_10.map((m, idx) => {
              const isActive = activeStep === idx + 1;
              return (
                <g key={`cable-${m.num}`}>
                  {/* Base Cable Glow Line */}
                  <path
                    d={m.cablePath}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={isActive ? 3.5 : 1.5}
                    strokeDasharray={isActive ? '6 4' : '3 5'}
                    opacity={isActive ? 1 : 0.35}
                    filter={isActive ? 'url(#wfActiveGlow)' : 'url(#wfGlow)'}
                    style={{ transition: 'stroke-width 0.3s, opacity 0.3s' }}
                  >
                    {isActive && (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="60"
                        to="0"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    )}
                  </path>

                  {/* Traveling High-Speed Photons when Active */}
                  {isActive && (
                    <>
                      <circle r="5" fill="#FFFFFF" filter="url(#wfActiveGlow)">
                        <animateMotion
                          dur={`${m.duration * 0.7}s`}
                          repeatCount="indefinite"
                          path={m.cablePath}
                        />
                      </circle>
                      <circle r="4" fill={m.color} filter="url(#wfGlow)">
                        <animateMotion
                          dur={`${m.duration * 0.7}s`}
                          begin="0.35s"
                          repeatCount="indefinite"
                          path={m.cablePath}
                        />
                      </circle>
                      <circle r="3" fill="#FFFFFF">
                        <animateMotion
                          dur={`${m.duration * 0.7}s`}
                          begin="0.7s"
                          repeatCount="indefinite"
                          path={m.cablePath}
                        />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}

            {/* ─── CENTRAL CYBER SHIELD PEDESTAL COUNTER-ROTATING ENERGY RINGS ─── */}
            {/* Center: (520, 480) */}
            <ellipse
              cx="520"
              cy="480"
              rx="76"
              ry="18"
              fill="none"
              stroke={currentModule.color}
              strokeWidth="2.5"
              strokeDasharray="20 12"
              opacity="0.9"
              filter="url(#wfGlow)"
              style={{ transition: 'stroke 0.4s' }}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 520 480"
                to="360 520 480"
                dur={isPlaying ? '6s' : '12s'}
                repeatCount="indefinite"
              />
            </ellipse>

            <ellipse
              cx="520"
              cy="480"
              rx="54"
              ry="13"
              fill="none"
              stroke="#00D8F6"
              strokeWidth="1.8"
              strokeDasharray="14 8"
              opacity="0.8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 520 480"
                to="0 520 480"
                dur={isPlaying ? '4.5s' : '9s'}
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Central Padlock Energy Surge (Center 520, 416) */}
            <circle
              cx="520"
              cy="416"
              r="40"
              fill={currentModule.glowColor}
              stroke={currentModule.color}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              filter="url(#wfGlow)"
              style={{ transition: 'all 0.4s' }}
            >
              <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx="520" cy="416" r="12" fill="#FFFFFF" opacity="0.8" filter="url(#wfActiveGlow)">
              <animate attributeName="r" values="8;14;8" dur="1.2s" repeatCount="indefinite" />
            </circle>

            {/* ─── CARD HIGHLIGHT BOXES (1 TO 10) ─── */}
            {MODULES_10.map((m, idx) => {
              const isActive = activeStep === idx + 1;
              return (
                <rect
                  key={`box-${m.num}`}
                  x={m.box.x}
                  y={m.box.y}
                    width={m.box.w}
                    height={m.box.h}
                    rx={m.box.rx}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={isActive ? 2.5 : 0.8}
                    opacity={isActive ? 1 : 0.2}
                    filter={isActive ? 'url(#wfActiveGlow)' : 'none'}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {isActive && (
                      <animate
                        attributeName="stroke-width"
                        values="2;3.2;2"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    )}
                  </rect>
              );
            })}
          </svg>

          {/* ─── INTERACTIVE CLICKABLE HOTBOXES OVER CARDS 1 TO 10 ─── */}
          <div className="absolute inset-0 pointer-events-auto">
            {MODULES_10.map((m, idx) => (
              <button
                key={`btn-${m.num}`}
                type="button"
                onClick={() => {
                  setActiveStep(idx + 1);
                  setIsPlaying(false); // Pause auto-run when user manually clicks
                }}
                style={{
                  position: 'absolute',
                  left: `${(m.box.x / 1024) * 100}%`,
                  top: `${(m.box.y / 682) * 100}%`,
                  width: `${(m.box.w / 1024) * 100}%`,
                  height: `${(m.box.h / 682) * 100}%`,
                }}
                className="cursor-pointer rounded-2xl bg-transparent transition-all focus:outline-none"
                title={`Click to inspect Step ${m.num}: ${m.title}`}
              />
            ))}
          </div>

          {/* Top-Right: View Full Resolution Master Button */}
          <a
            href="/ids_architecture_workflow_10.jpg"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-cyan-600 text-white border border-white/20 text-xs font-semibold backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 shadow-lg hover:scale-105 pointer-events-auto z-20"
            title="Open full resolution master image in new tab"
          >
            <i className="fa-solid fa-expand text-[11px]"></i>
            <span>View 100% Clarity</span>
          </a>
        </div>
      </div>

      {/* ─── 3. BOTTOM TIMELINE SCRUBBER: 10 NUMBERED STEP PILLS ─── */}
      <div className="mt-3 p-2.5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md backdrop-blur-md flex items-center justify-between gap-1.5 overflow-x-auto">
        {MODULES_10.map((m, idx) => {
          const isActive = activeStep === idx + 1;
          return (
            <button
              key={`pill-${m.num}`}
              type="button"
              onClick={() => {
                setActiveStep(idx + 1);
                setIsPlaying(false);
              }}
              style={{
                backgroundColor: isActive ? m.color : 'transparent',
                borderColor: isActive ? m.color : '#E2E8F0',
                color: isActive ? '#FFFFFF' : '#64748B',
                boxShadow: isActive ? `0 0 15px ${m.color}60` : 'none',
              }}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                isActive ? 'font-black scale-105' : 'hover:bg-slate-50 font-bold'
              }`}
            >
              <div className="text-xs leading-none">{m.num}</div>
              <div className="text-[9px] truncate mt-0.5 opacity-90">{m.title.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
