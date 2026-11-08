import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Shield, Sparkles } from 'lucide-react';

/**
 * 10 Core Features matching Image 2 "6 Circular Layout"
 * IDS Core Features with central cyber shield and 10 radiating modules
 */
const CIRCULAR_FEATURES = [
  {
    num: '01',
    side: 'left',
    title: 'Network Traffic Monitoring',
    desc: 'Monitors network traffic to identify suspicious activities in real-time.',
    color: '#0088FF', // Vivid Blue
    glowColor: 'rgba(0, 136, 255, 0.45)',
    bgTint: 'bg-sky-50/70 border-sky-200/80',
    activeBg: 'bg-sky-50 border-sky-400 shadow-sky-500/25',
    icon: 'fa-chart-line',
    rayTarget: { x: 485, y: 70 },
    badgePos: { x: 415, y: 70 },
    cardPos: { top: '30px', right: '55%' },
  },
  {
    num: '02',
    side: 'left',
    title: 'Data Preprocessing',
    desc: 'Cleans and prepares network data for machine learning analysis.',
    color: '#8B5CF6', // Purple
    glowColor: 'rgba(139, 92, 246, 0.45)',
    bgTint: 'bg-purple-50/70 border-purple-200/80',
    activeBg: 'bg-purple-50 border-purple-400 shadow-purple-500/25',
    icon: 'fa-database',
    rayTarget: { x: 445, y: 205 },
    badgePos: { x: 375, y: 205 },
    cardPos: { top: '165px', right: '55%' },
  },
  {
    num: '03',
    side: 'left',
    title: 'Machine Learning Detection',
    desc: 'Uses a trained ML model to identify normal and abnormal network activities.',
    color: '#EC4899', // Hot Pink
    glowColor: 'rgba(236, 72, 153, 0.45)',
    bgTint: 'bg-pink-50/70 border-pink-200/80',
    activeBg: 'bg-pink-50 border-pink-400 shadow-pink-500/25',
    icon: 'fa-brain',
    rayTarget: { x: 425, y: 340 },
    badgePos: { x: 355, y: 340 },
    cardPos: { top: '300px', right: '55%' },
  },
  {
    num: '04',
    side: 'left',
    title: 'Attack Classification',
    desc: 'Classifies traffic as normal or malicious, such as DoS, Probe, U2R, and R2L attacks.',
    color: '#F59E0B', // Amber / Orange
    glowColor: 'rgba(245, 158, 11, 0.45)',
    bgTint: 'bg-amber-50/70 border-amber-200/80',
    activeBg: 'bg-amber-50 border-amber-400 shadow-amber-500/25',
    icon: 'fa-shield-halved',
    rayTarget: { x: 445, y: 475 },
    badgePos: { x: 375, y: 475 },
    cardPos: { top: '435px', right: '55%' },
  },
  {
    num: '05',
    side: 'left',
    title: 'Intrusion Prediction',
    desc: 'Analyzes network traffic features to predict potential intrusions using ML models.',
    color: '#10B981', // Emerald Green
    glowColor: 'rgba(16, 185, 129, 0.45)',
    bgTint: 'bg-emerald-50/70 border-emerald-200/80',
    activeBg: 'bg-emerald-50 border-emerald-400 shadow-emerald-500/25',
    icon: 'fa-chart-simple',
    rayTarget: { x: 485, y: 610 },
    badgePos: { x: 415, y: 610 },
    cardPos: { top: '570px', right: '55%' },
  },
  {
    num: '06',
    side: 'right',
    title: 'Real-Time Alert System',
    desc: 'Generates instant alerts when suspicious activities or potential threats are detected.',
    color: '#EF4444', // Red
    glowColor: 'rgba(239, 68, 68, 0.45)',
    bgTint: 'bg-red-50/70 border-red-200/80',
    activeBg: 'bg-red-50 border-red-400 shadow-red-500/25',
    icon: 'fa-bell',
    rayTarget: { x: 755, y: 70 },
    badgePos: { x: 825, y: 70 },
    cardPos: { top: '30px', left: '55%' },
  },
  {
    num: '07',
    side: 'right',
    title: 'User Authentication',
    desc: 'Provides secure user registration, login, and access control.',
    color: '#0284C7', // Sky Blue
    glowColor: 'rgba(2, 132, 199, 0.45)',
    bgTint: 'bg-sky-50/70 border-sky-200/80',
    activeBg: 'bg-sky-50 border-sky-400 shadow-sky-500/25',
    icon: 'fa-user-shield',
    rayTarget: { x: 795, y: 205 },
    badgePos: { x: 865, y: 205 },
    cardPos: { top: '165px', left: '55%' },
  },
  {
    num: '08',
    side: 'right',
    title: 'Admin Dashboard',
    desc: 'Displays user information, intrusion detection results, and system statistics.',
    color: '#8B5CF6', // Purple
    glowColor: 'rgba(139, 92, 246, 0.45)',
    bgTint: 'bg-purple-50/70 border-purple-200/80',
    activeBg: 'bg-purple-50 border-purple-400 shadow-purple-500/25',
    icon: 'fa-desktop',
    rayTarget: { x: 815, y: 340 },
    badgePos: { x: 885, y: 340 },
    cardPos: { top: '300px', left: '55%' },
  },
  {
    num: '09',
    side: 'right',
    title: 'Model Accuracy Results',
    desc: 'Presents the performance and accuracy metrics of implemented ML algorithms.',
    color: '#EAB308', // Gold / Amber
    glowColor: 'rgba(234, 179, 8, 0.45)',
    bgTint: 'bg-amber-50/70 border-amber-200/80',
    activeBg: 'bg-amber-50 border-amber-400 shadow-amber-500/25',
    icon: 'fa-star',
    rayTarget: { x: 795, y: 475 },
    badgePos: { x: 865, y: 475 },
    cardPos: { top: '435px', left: '55%' },
  },
  {
    num: '10',
    side: 'right',
    title: 'Detection Reports',
    desc: 'Displays and generates detailed reports on intrusion predictions and detection results.',
    color: '#10B981', // Emerald / Teal
    glowColor: 'rgba(16, 185, 129, 0.45)',
    bgTint: 'bg-emerald-50/70 border-emerald-200/80',
    activeBg: 'bg-emerald-50 border-emerald-400 shadow-emerald-500/25',
    icon: 'fa-file-lines',
    rayTarget: { x: 755, y: 610 },
    badgePos: { x: 825, y: 610 },
    cardPos: { top: '570px', left: '55%' },
  },
];

export default function IdsCircularCoreFeatures() {
  const [activeNum, setActiveNum] = useState('01');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  // Auto-scanning loop cycling through 01 to 10
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = Math.max(1600 / speed, 800);
    timerRef.current = setInterval(() => {
      setActiveNum((prev) => {
        const currentInt = parseInt(prev, 10);
        const nextInt = currentInt >= 10 ? 1 : currentInt + 1;
        return nextInt < 10 ? `0${nextInt}` : `${nextInt}`;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed]);

  const activeFeature = CIRCULAR_FEATURES.find((f) => f.num === activeNum) || CIRCULAR_FEATURES[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-7 space-y-6 overflow-hidden">
      {/* ─── 1. TOP HEADER & CONTROLS (MATCHING IMAGE 2) ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        {/* Left: Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs font-black shadow-xs shrink-0">
            6
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#F1F5F9] text-[#334155] text-xs font-bold border border-slate-200/70 tracking-tight">
            Circular Layout
          </span>
        </div>

        {/* Center: Title */}
        <div className="text-center md:flex-1 md:px-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            IDS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#EC4899]">
              Core Features
            </span>
          </h3>
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#0088FF] via-[#8B5CF6] to-[#EC4899] mx-auto mt-1.5"></div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-purple-600 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all duration-200 cursor-pointer"
            title={isPlaying ? 'Pause auto-scan' : 'Resume auto-scan'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause' : 'Scan'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNum('01');
              setIsPlaying(true);
            }}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all duration-200 cursor-pointer"
            title="Restart scanning from 01"
          >
            <RotateCcw size={14} />
          </button>

          <button
            type="button"
            onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all duration-200 cursor-pointer"
            title="Toggle scanning speed"
          >
            {speed}x
          </button>
        </div>
      </div>

      {/* ─── 2. THE MAIN CIRCULAR DIAGRAM (WIDESCREEN CANVAS VIEW) ─── */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="min-w-[1160px] relative h-[700px] select-none mx-auto">
          
          {/* SVG Background Layer: Dashed Connecting Rays & Streaming Cyber Particles */}
          <svg
            viewBox="0 0 1240 680"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          >
            <defs>
              <filter id="hubGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Central Ambient Radar / Halo Rings */}
            <circle cx="620" cy="340" r="140" fill="none" stroke="#E0E7FF" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
            <circle cx="620" cy="340" r="115" fill="none" stroke="#C7D2FE" strokeWidth="1.5" opacity="0.5" />
            <circle cx="620" cy="340" r="90" fill="none" stroke="#818CF8" strokeWidth="2" strokeDasharray="6 8" opacity="0.7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 620 340"
                to="360 620 340"
                dur="24s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Radiating Curved Dashed Cables from Hub (620, 340) to each of the 10 Icons */}
            {CIRCULAR_FEATURES.map((feat) => {
              const isActive = activeNum === feat.num;
              const isLeft = feat.side === 'left';
              const targetX = feat.rayTarget.x;
              const targetY = feat.rayTarget.y;

              // Cubic control point curves for organic radiating flow
              const ctrlX = isLeft ? 540 : 700;
              const ctrlY = 340 + (targetY - 340) * 0.35;
              const pathD = `M 620 340 Q ${ctrlX} ${ctrlY}, ${targetX} ${targetY}`;

              return (
                <g key={`ray-${feat.num}`}>
                  {/* Background dashed cable */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isActive ? feat.color : '#CBD5E1'}
                    strokeWidth={isActive ? '3' : '2'}
                    strokeDasharray={isActive ? 'none' : '4 6'}
                    opacity={isActive ? 0.95 : 0.45}
                    className="transition-all duration-300"
                  />

                  {/* High-speed animated streaming particles when active */}
                  {isActive && (
                    <circle r="4.5" fill={feat.color} filter="url(#hubGlow)">
                      <animateMotion
                        path={pathD}
                        dur={`${1.8 / speed}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                      />
                    </circle>
                  )}

                  {/* Horizontal Connector Line from Icon to Number Badge and Card */}
                  <line
                    x1={targetX}
                    y1={targetY}
                    x2={isLeft ? targetX - 70 : targetX + 70}
                    y2={targetY}
                    stroke={isActive ? feat.color : '#CBD5E1'}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    strokeDasharray="3 4"
                    opacity={isActive ? 0.9 : 0.5}
                  />
                </g>
              );
            })}
          </svg>

          {/* ─── 3. CENTRAL CYBER SHIELD (EXACT MATCH TO IMAGE 2) ─── */}
          <div
            style={{
              position: 'absolute',
              left: '620px',
              top: '340px',
              transform: 'translate(-50%, -50%)',
            }}
            className="flex flex-col items-center justify-center z-30 pointer-events-auto cursor-pointer group"
            onClick={() => setIsPlaying(!isPlaying)}
            title="Click to toggle auto-scan"
          >
            {/* Outer Pulsing Neon Ring */}
            <div
              style={{
                boxShadow: `0 0 45px ${activeFeature.color}50`,
              }}
              className="w-36 h-36 rounded-full border-4 border-white bg-gradient-to-tr from-[#0284C7] via-[#2563EB] to-[#7C3AED] flex flex-col items-center justify-center text-white p-3 shadow-2xl transition-all duration-500 group-hover:scale-105"
            >
              {/* Inner Shield Graphic */}
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1 shadow-inner border border-white/30">
                <Shield size={22} className="text-white fill-white/30" />
              </div>
              <h2 className="text-2xl font-black tracking-tight leading-none text-white drop-shadow-md">
                IDS
              </h2>
              <span className="text-[11px] font-bold text-sky-100 tracking-tight mt-0.5 opacity-95">
                Core Features
              </span>
            </div>
          </div>

          {/* ─── 4. THE 10 RADIATING MODULE NODES & CARDS ─── */}
          {CIRCULAR_FEATURES.map((item) => {
            const isActive = activeNum === item.num;
            const isLeft = item.side === 'left';

            return (
              <React.Fragment key={`module-${item.num}`}>
                {/* A. The Glowing Circular Icon Badge (Positioned on the Arc) */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${item.rayTarget.x}px`,
                    top: `${item.rayTarget.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => {
                    setActiveNum(item.num);
                    setIsPlaying(false);
                  }}
                  className="z-20 cursor-pointer pointer-events-auto flex items-center justify-center group"
                >
                  {/* Neon Glow Aura */}
                  <div
                    style={{
                      backgroundColor: item.color,
                      boxShadow: isActive ? `0 0 28px ${item.color}` : 'none',
                      opacity: isActive ? 0.5 : 0,
                    }}
                    className="absolute -inset-2 rounded-full transition-all duration-300 animate-pulse"
                  />

                  {/* Circular Button */}
                  <div
                    style={{
                      borderColor: item.color,
                      boxShadow: isActive ? `0 0 16px ${item.color}60` : '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                    className={`w-14 h-14 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'scale-115 border-4' : 'group-hover:scale-105'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: item.color }}
                      className={`w-10 h-10 rounded-full text-white flex items-center justify-center shadow-inner transition-transform duration-300 ${
                        isActive ? 'scale-105' : ''
                      }`}
                    >
                      <i className={`fa-solid ${item.icon} text-base`}></i>
                    </div>
                  </div>
                </div>

                {/* B. The Numbered Circle Pill Badge (01 to 10) */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${item.badgePos.x}px`,
                    top: `${item.badgePos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: item.color,
                  }}
                  onClick={() => {
                    setActiveNum(item.num);
                    setIsPlaying(false);
                  }}
                  className={`w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center shadow-sm z-20 cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-125 ring-3 ring-white shadow-md' : 'hover:scale-110'
                  }`}
                >
                  {item.num}
                </div>

                {/* C. The Descriptive Text Card */}
                <div
                  style={{
                    position: 'absolute',
                    top: `${item.rayTarget.y}px`,
                    transform: 'translateY(-50%)',
                    ...(isLeft
                      ? { right: `${1240 - item.badgePos.x + 18}px` }
                      : { left: `${item.badgePos.x + 18}px` }),
                    width: '320px',
                  }}
                  onClick={() => {
                    setActiveNum(item.num);
                    setIsPlaying(false);
                  }}
                  className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-300 cursor-pointer border ${
                    isLeft ? 'text-right' : 'text-left'
                  } ${
                    isActive
                      ? `${item.activeBg} shadow-lg scale-[1.03]`
                      : `${item.bgTint} hover:shadow-xs`
                  }`}
                >
                  <h4
                    style={{ color: isActive ? item.color : '#0F172A' }}
                    className="font-black text-xs sm:text-[13px] leading-tight tracking-tight mb-1"
                  >
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-snug font-normal">
                    {item.desc}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ─── 5. BOTTOM 10-FEATURE INTERACTIVE TIMELINE SCRUBBER ─── */}
      <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-2 sm:p-3 flex items-center justify-between gap-1.5 overflow-x-auto shadow-2xs">
        {CIRCULAR_FEATURES.map((item) => {
          const isActive = activeNum === item.num;
          return (
            <button
              key={`scrubber-${item.num}`}
              type="button"
              onClick={() => {
                setActiveNum(item.num);
                setIsPlaying(false);
              }}
              style={{
                backgroundColor: isActive ? item.color : '#FFFFFF',
                borderColor: isActive ? item.color : '#E2E8F0',
                color: isActive ? '#FFFFFF' : '#475569',
                boxShadow: isActive ? `0 2px 10px ${item.color}40` : 'none',
              }}
              className={`flex-1 min-w-[85px] py-1.5 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                isActive ? 'scale-105 font-bold shadow-xs' : 'hover:bg-slate-100 text-xs font-semibold'
              }`}
            >
              <span className="text-[11px] font-black">{item.num}</span>
              <span className="text-[10px] truncate max-w-[65px] hidden sm:inline">
                {item.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
