import React from 'react';

// ─── TRIPGEN 3 PROJECT OVERVIEW PILLARS ───
export const TRIPGEN_PROJECT_PILLARS = [
  {
    title: 'The Problem',
    icon: 'fa-solid fa-triangle-exclamation',
    iconColor: 'text-[#FF4D4D] drop-shadow-[0_2px_10px_rgba(255,77,77,0.7)]',
    topBg: '#16A34A',
    chevronBg: '#15803D',
    hoverBorder: 'hover:border-emerald-400',
    glowColor: 'rgba(22, 163, 74, 0.3)',
    desc: 'Planning a trip typically requires searching across disconnected booking sites, managing disparate transport schedules, calculating distances, and tracking reservations manually. Travelers frequently face scheduling conflicts, travel fatigue, and inefficient backtracking between distant destinations.'
  },
  {
    title: 'The Solution',
    icon: 'fa-solid fa-lightbulb',
    iconColor: 'text-[#FACC15] drop-shadow-[0_2px_8px_rgba(250,204,21,0.5)]',
    topBg: '#2C70B1',
    chevronBg: '#216095',
    hoverBorder: 'hover:border-sky-400',
    glowColor: 'rgba(44, 112, 177, 0.3)',
    desc: 'TripGen integrates Python Django views and a normalized MySQL database to deliver four dedicated, role-guarded operational modules (Public, Admin, Employee, and Traveler) spanning specialized views, catalog managers, booking checkout, and feedback loops.'
  },
  {
    title: 'The Objective',
    icon: 'fa-solid fa-bullseye',
    iconColor: 'text-[#34D399] drop-shadow-[0_2px_8px_rgba(52,211,153,0.45)]',
    topBg: '#2898A3',
    chevronBg: '#237D88',
    hoverBorder: 'hover:border-teal-400',
    glowColor: 'rgba(40, 152, 163, 0.3)',
    desc: 'To engineer an integrated, web-based travel management platform that connects travelers with customizable tour itineraries, multi-modal transport options, and hotel accommodations, while offering role-guarded administrative and employee operations.'
  }
];

export default function TripGenProjectOverview() {
  return (
    <section className="space-y-4 tripgen-reveal-section font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── SCOPED KEYFRAME ANIMATION FOR AUTOMATIC FLOATING ─── */}
      <style>{`
        @keyframes tripgenChevronFloat {
          0%, 100% {
            transform: translateY(0px);
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.08));
          }
          50% {
            transform: translateY(-8px);
            filter: drop-shadow(0 14px 18px rgba(0, 0, 0, 0.16));
          }
        }
      `}</style>

      {/* ─── SECTION HEADER ─── */}
      <div>
        <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Project Overview
        </h2>
      </div>

      {/* ─── 3 CHEVRON PILLARS WITH AUTOMATIC FLOATING ANIMATION (SIDE-BY-SIDE ON ALL VIEWPORTS) ─── */}
      <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4 md:gap-5 lg:gap-6 pt-1 sm:pt-2">
        {TRIPGEN_PROJECT_PILLARS.map((pillar, idx) => (
          <div
            key={pillar.title}
            className={`bg-white rounded-lg xs:rounded-xl sm:rounded-3xl border border-slate-200/90 p-2 xs:p-2.5 sm:p-6 pt-2 xs:pt-2.5 sm:pt-7 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col items-center text-center tripgen-stagger-card group ${pillar.hoverBorder}`}
          >
            {/* 2-Tier Chevron Banner with Automatic Floating Animation */}
            <div
              className="w-full max-w-[85px] xs:max-w-[95px] sm:max-w-[210px] mx-auto mb-1 xs:mb-1.5 sm:mb-4 will-change-transform group-hover:[animation-play-state:paused]"
              style={{
                animation: 'tripgenChevronFloat 3.2s ease-in-out infinite',
                animationDelay: `${idx * 1.05}s`
              }}
            >
              {/* Title Block (Rounded Top) */}
              <div
                className="h-6 xs:h-7 sm:h-12 rounded-t-md sm:rounded-t-xl flex items-center justify-center px-1 sm:px-3 text-white font-extrabold text-[8px] xs:text-[9px] sm:text-[15px] tracking-tight text-center"
                style={{ backgroundColor: pillar.topBg }}
              >
                {pillar.title}
              </div>

              {/* Chevron Point with Colored Icon */}
              <div
                className="h-5 xs:h-6 sm:h-11 flex items-center justify-center pb-0.5 sm:pb-1.5 relative"
                style={{
                  backgroundColor: pillar.chevronBg,
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 50% 100%, 0 45%)'
                }}
              >
                <i className={`${pillar.icon} ${pillar.iconColor} text-[10px] xs:text-[12px] sm:text-[25px] -translate-y-0.5 transition-transform duration-300 group-hover:scale-115`}></i>
              </div>
            </div>

            {/* Description Text (Total Justified Alignment on Mobile, Preserved Center on Desktop) */}
            <p className="w-full text-[8px] xs:text-[9px] sm:text-[13px] text-slate-800 leading-snug sm:leading-relaxed font-medium text-justify [text-align-last:center] sm:text-center sm:[text-align-last:center] mt-1 sm:mt-1">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
