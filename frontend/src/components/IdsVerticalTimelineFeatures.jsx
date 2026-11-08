import React, { useState, useEffect, useRef } from 'react';

/**
 * 10 Core Features matching Image 2 "4 Vertical Timeline (Alternating)"
 * IDS Core Features with central alternating vertical spine and 10 modules
 */
const TIMELINE_ROWS = [
  {
    row: 1,
    centerNum: '1',
    centerColor: '#0088FF',
    left: {
      num: '01',
      title: 'Network Traffic Monitoring',
      desc: 'Monitors network traffic to identify suspicious activities in real-time.',
      color: '#0088FF',
      glowColor: 'rgba(0, 136, 255, 0.45)',
      bgTint: 'bg-sky-50/70 border-sky-200/80',
      activeBg: 'bg-sky-50 border-sky-400 shadow-sky-500/25',
      icon: 'fa-chart-line',
    },
    right: {
      num: '02',
      title: 'Data Preprocessing',
      desc: 'Cleans, transforms, and prepares network data for machine learning analysis.',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.45)',
      bgTint: 'bg-purple-50/70 border-purple-200/80',
      activeBg: 'bg-purple-50 border-purple-400 shadow-purple-500/25',
      icon: 'fa-database',
    },
  },
  {
    row: 2,
    centerNum: '2',
    centerColor: '#EC4899',
    left: {
      num: '03',
      title: 'Machine Learning Detection',
      desc: 'Uses a trained machine learning model to identify normal and abnormal network activities.',
      color: '#EC4899',
      glowColor: 'rgba(236, 72, 153, 0.45)',
      bgTint: 'bg-pink-50/70 border-pink-200/80',
      activeBg: 'bg-pink-50 border-pink-400 shadow-pink-500/25',
      icon: 'fa-brain',
    },
    right: {
      num: '04',
      title: 'Attack Classification',
      desc: 'Classifies network traffic as normal or malicious, such as DoS, Probe, U2R, and R2L attacks.',
      color: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      bgTint: 'bg-amber-50/70 border-amber-200/80',
      activeBg: 'bg-amber-50 border-amber-400 shadow-amber-500/25',
      icon: 'fa-shield-halved',
    },
  },
  {
    row: 3,
    centerNum: '3',
    centerColor: '#F59E0B',
    left: {
      num: '05',
      title: 'Intrusion Prediction',
      desc: 'Analyzes network traffic features to predict potential intrusions using ML models.',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      bgTint: 'bg-emerald-50/70 border-emerald-200/80',
      activeBg: 'bg-emerald-50 border-emerald-400 shadow-emerald-500/25',
      icon: 'fa-chart-simple',
    },
    right: {
      num: '06',
      title: 'Real-Time Alert System',
      desc: 'Generates instant alerts when suspicious activities or potential threats are detected.',
      color: '#EF4444',
      glowColor: 'rgba(239, 68, 68, 0.45)',
      bgTint: 'bg-red-50/70 border-red-200/80',
      activeBg: 'bg-red-50 border-red-400 shadow-red-500/25',
      icon: 'fa-bell',
    },
  },
  {
    row: 4,
    centerNum: '4',
    centerColor: '#10B981',
    left: {
      num: '07',
      title: 'User Authentication',
      desc: 'Provides secure user registration, login, and access control.',
      color: '#0284C7',
      glowColor: 'rgba(2, 132, 199, 0.45)',
      bgTint: 'bg-sky-50/70 border-sky-200/80',
      activeBg: 'bg-sky-50 border-sky-400 shadow-sky-500/25',
      icon: 'fa-user-shield',
    },
    right: {
      num: '08',
      title: 'Admin Dashboard',
      desc: 'Displays user information, intrusion detection results, and system statistics.',
      color: '#6366F1',
      glowColor: 'rgba(99, 102, 241, 0.45)',
      bgTint: 'bg-indigo-50/70 border-indigo-200/80',
      activeBg: 'bg-indigo-50 border-indigo-400 shadow-indigo-500/25',
      icon: 'fa-desktop',
    },
  },
  {
    row: 5,
    centerNum: '5',
    centerColor: '#0088FF',
    left: {
      num: '09',
      title: 'Model Accuracy Results',
      desc: 'Presents the performance and accuracy metrics of implemented ML algorithms.',
      color: '#EAB308',
      glowColor: 'rgba(234, 179, 8, 0.45)',
      bgTint: 'bg-amber-50/70 border-amber-200/80',
      activeBg: 'bg-amber-50 border-amber-400 shadow-amber-500/25',
      icon: 'fa-star',
    },
    right: {
      num: '10',
      title: 'Detection Reports',
      desc: 'Displays and generates detailed reports on intrusion predictions and detection results.',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      bgTint: 'bg-emerald-50/70 border-emerald-200/80',
      activeBg: 'bg-emerald-50 border-emerald-400 shadow-emerald-500/25',
      icon: 'fa-file-lines',
    },
  },
];

export default function IdsVerticalTimelineFeatures() {
  const [activeStep, setActiveStep] = useState('01');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  // Auto-scan cycling sequentially through 01 to 10
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Smooth step-by-step cycle (2.4 seconds per step) so each step lights up and identifies clearly
    const intervalTime = 2400;
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const num = parseInt(prev, 10);
        const next = num >= 10 ? 1 : num + 1;
        return next < 10 ? `0${next}` : `${next}`;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-7 overflow-hidden">
      {/* ─── MAIN ALTERNATING VERTICAL TIMELINE ─── */}
      <div className="relative py-2">
        {/* Central Vertical Spine Line running full height with very slow downward flowing animation */}
        <div className="hidden lg:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-6 pointer-events-none z-10 overflow-hidden">
          {/* Base gradient track */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-[#0088FF] via-[#EC4899] via-[#F59E0B] via-[#10B981] to-[#0088FF] rounded-full opacity-50" />

          {/* Very slow glowing energy beam traveling downward along the spine (10s duration) */}
          <div
            style={{ animation: 'spineGlowOrbSlow 10s linear infinite' }}
            className="absolute left-1/2 -translate-x-1/2 w-3.5 h-20 bg-gradient-to-b from-transparent via-white to-transparent rounded-full blur-[1px] shadow-[0_0_14px_rgba(255,255,255,0.95)]"
          />

          {/* Secondary bright center spark moving down the spine */}
          <div
            style={{ animation: 'spineGlowOrbSlow 10s linear infinite' }}
            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-3.5 bg-white rounded-full shadow-[0_0_12px_#38BDF8]"
          />
        </div>

        {/* 5 Rows with 2 Modules Each (Total 10 Modules) */}
        <div className="space-y-6 sm:space-y-7 relative">
          {TIMELINE_ROWS.map((row) => {
            const isLeftActive = activeStep === row.left.num;
            const isRightActive = activeStep === row.right.num;
            const isRowActive = isLeftActive || isRightActive;

            return (
              <div
                key={`row-${row.row}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-16 items-center relative"
              >
                {/* ─── LEFT SIDE MODULE ─── */}
                <div
                  className="flex items-center justify-end gap-3 sm:gap-3.5 group cursor-pointer"
                  onClick={() => {
                    setActiveStep(row.left.num);
                    setIsPlaying(false);
                  }}
                >
                  {/* Card (Right-aligned text) */}
                  <div
                    className={`flex-1 rounded-2xl p-3.5 sm:p-4 text-right transition-all duration-300 border ${
                      isLeftActive
                        ? `${row.left.activeBg} shadow-md scale-[1.02] -translate-x-1 sm:-translate-x-1.5`
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <h4
                      style={{ color: isLeftActive ? row.left.color : '#1E293B' }}
                      className={`leading-tight tracking-tight mb-1 transition-colors duration-300 ${
                        isLeftActive
                          ? 'font-black text-sm sm:text-[14px]'
                          : 'font-bold text-xs sm:text-[13px] text-slate-700'
                      }`}
                    >
                      {row.left.title}
                    </h4>
                    <p
                      className={`text-[11px] sm:text-[11.5px] leading-snug transition-colors duration-300 ${
                        isLeftActive ? 'text-slate-700 font-medium' : 'text-slate-500 font-normal'
                      }`}
                    >
                      {row.left.desc}
                    </p>
                  </div>

                  {/* Dot between Card and Icon */}
                  <div
                    style={{
                      backgroundColor: isLeftActive ? row.left.color : '#CBD5E1',
                    }}
                    className={`rounded-full shrink-0 transition-all duration-300 ${
                      isLeftActive
                        ? 'w-2.5 h-2.5 scale-150 ring-2 ring-white shadow-xs'
                        : 'w-2 h-2 opacity-50'
                    }`}
                  />

                  {/* Left Circular Icon Badge */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    {/* Outer Neon Glow Halo - ONLY when active */}
                    <div
                      style={{
                        backgroundColor: row.left.color,
                        boxShadow: isLeftActive ? `0 0 24px ${row.left.color}` : 'none',
                        opacity: isLeftActive ? 0.45 : 0,
                      }}
                      className="absolute -inset-2 rounded-full transition-all duration-300 animate-pulse pointer-events-none"
                    />

                    {/* Icon Circle: Neutral white by default, colored border & glow when active */}
                    <div
                      style={{
                        borderColor: isLeftActive ? row.left.color : '#E2E8F0',
                        boxShadow: isLeftActive
                          ? `0 0 16px ${row.left.color}50`
                          : '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 ${
                        isLeftActive ? 'scale-110 border-3' : 'group-hover:scale-105 group-hover:border-slate-300'
                      }`}
                    >
                      {/* Inner circle: Neutral gray background when inactive, vibrant color when active! */}
                      <div
                        style={{
                          backgroundColor: isLeftActive ? row.left.color : '#F1F5F9',
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isLeftActive
                            ? 'text-white scale-105 shadow-inner'
                            : 'text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-200/80'
                        }`}
                      >
                        <i className={`fa-solid ${row.left.icon} text-base sm:text-lg`}></i>
                      </div>
                    </div>
                  </div>

                  {/* Dashed connector arrow to center (Desktop) */}
                  <div className="hidden lg:flex items-center gap-1 shrink-0 w-8">
                    <div
                      style={{
                        borderColor: isLeftActive ? row.left.color : '#E2E8F0',
                        borderTopWidth: isLeftActive ? '2.5px' : '1.5px',
                        borderTopStyle: 'dashed',
                      }}
                      className="flex-1 transition-all duration-300"
                    />
                    <i
                      style={{ color: isLeftActive ? row.left.color : '#CBD5E1' }}
                      className="fa-solid fa-play text-[8px] transition-colors duration-300"
                    ></i>
                  </div>
                </div>

                {/* ─── CENTRAL NUMBERED SPINE NODE (DESKTOP) ─── */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="hidden lg:flex z-20 cursor-pointer pointer-events-auto"
                  onClick={() => {
                    setActiveStep(isLeftActive ? row.right.num : row.left.num);
                    setIsPlaying(false);
                  }}
                  title={`Step row ${row.row}`}
                >
                  <div
                    style={{
                      borderColor: isRowActive ? row.centerColor : '#CBD5E1',
                      color: isRowActive ? row.centerColor : '#64748B',
                      boxShadow: isRowActive ? `0 0 20px ${row.centerColor}60` : '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                    className={`w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center font-black text-sm transition-all duration-300 ${
                      isRowActive ? 'scale-120 ring-4 ring-white shadow-md border-3' : 'hover:scale-105'
                    }`}
                  >
                    {row.centerNum}
                  </div>
                </div>

                {/* ─── RIGHT SIDE MODULE ─── */}
                <div
                  className="flex items-center justify-start gap-3 sm:gap-3.5 group cursor-pointer"
                  onClick={() => {
                    setActiveStep(row.right.num);
                    setIsPlaying(false);
                  }}
                >
                  {/* Dashed connector arrow from center (Desktop) */}
                  <div className="hidden lg:flex items-center gap-1 shrink-0 w-8">
                    <i
                      style={{ color: isRightActive ? row.right.color : '#CBD5E1' }}
                      className="fa-solid fa-play text-[8px] transition-colors duration-300"
                    ></i>
                    <div
                      style={{
                        borderColor: isRightActive ? row.right.color : '#E2E8F0',
                        borderTopWidth: isRightActive ? '2.5px' : '1.5px',
                        borderTopStyle: 'dashed',
                      }}
                      className="flex-1 transition-all duration-300"
                    />
                  </div>

                  {/* Right Circular Icon Badge */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    {/* Outer Neon Glow Halo - ONLY when active */}
                    <div
                      style={{
                        backgroundColor: row.right.color,
                        boxShadow: isRightActive ? `0 0 24px ${row.right.color}` : 'none',
                        opacity: isRightActive ? 0.45 : 0,
                      }}
                      className="absolute -inset-2 rounded-full transition-all duration-300 animate-pulse pointer-events-none"
                    />

                    {/* Icon Circle: Neutral white by default, colored border & glow when active */}
                    <div
                      style={{
                        borderColor: isRightActive ? row.right.color : '#E2E8F0',
                        boxShadow: isRightActive
                          ? `0 0 16px ${row.right.color}50`
                          : '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 ${
                        isRightActive ? 'scale-110 border-3' : 'group-hover:scale-105 group-hover:border-slate-300'
                      }`}
                    >
                      {/* Inner circle: Neutral gray background when inactive, vibrant color when active! */}
                      <div
                        style={{
                          backgroundColor: isRightActive ? row.right.color : '#F1F5F9',
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isRightActive
                            ? 'text-white scale-105 shadow-inner'
                            : 'text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-200/80'
                        }`}
                      >
                        <i className={`fa-solid ${row.right.icon} text-base sm:text-lg`}></i>
                      </div>
                    </div>
                  </div>

                  {/* Dot between Icon and Card */}
                  <div
                    style={{
                      backgroundColor: isRightActive ? row.right.color : '#CBD5E1',
                    }}
                    className={`rounded-full shrink-0 transition-all duration-300 ${
                      isRightActive
                        ? 'w-2.5 h-2.5 scale-150 ring-2 ring-white shadow-xs'
                        : 'w-2 h-2 opacity-50'
                    }`}
                  />

                  {/* Card (Left-aligned text) */}
                  <div
                    className={`flex-1 rounded-2xl p-3.5 sm:p-4 text-left transition-all duration-300 border ${
                      isRightActive
                        ? `${row.right.activeBg} shadow-md scale-[1.02] translate-x-1 sm:translate-x-1.5`
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <h4
                      style={{ color: isRightActive ? row.right.color : '#1E293B' }}
                      className={`leading-tight tracking-tight mb-1 transition-colors duration-300 ${
                        isRightActive
                          ? 'font-black text-sm sm:text-[14px]'
                          : 'font-bold text-xs sm:text-[13px] text-slate-700'
                      }`}
                    >
                      {row.right.title}
                    </h4>
                    <p
                      className={`text-[11px] sm:text-[11.5px] leading-snug transition-colors duration-300 ${
                        isRightActive ? 'text-slate-700 font-medium' : 'text-slate-500 font-normal'
                      }`}
                    >
                      {row.right.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* Keyframe animation for vertical light flow */}
      <style>{`
        @keyframes spineFlow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(600%);
          }
        }
      `}</style>
    </div>
  );
}
