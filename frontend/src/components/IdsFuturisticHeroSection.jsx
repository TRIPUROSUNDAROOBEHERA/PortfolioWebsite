import React from 'react';

/**
 * IdsFuturisticHeroSection
 * 
 * 100% clarity clean static visual showcase for Intrusion Detection System (IDS):
 * - Displays the master clean IDS cyber architecture image (/ids_core_features_clean.jpg)
 * - All SVG animations removed as requested ("only removed the animation")
 * - 100% clarity display with zoom/expand action
 */
export default function IdsFuturisticHeroSection() {
  return (
    <section
      className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#030712] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.18)] select-none my-6 sm:my-8"
      aria-label="Intrusion Detection System Visual Showcase"
    >
      <div className="relative z-10 w-full overflow-hidden">
        <div className="relative w-full select-none">
          <img
            src="/ids_core_features_clean.jpg"
            alt="Intrusion Detection System Architecture & Cyber Defense Visual Showcase"
            className="w-full h-auto object-cover sm:object-contain block select-none pointer-events-none"
            style={{ imageRendering: 'high-quality' }}
            loading="eager"
          />

          {/* Bottom-Right: View 100% Clarity Button */}
          <a
            href="/ids_core_features_clean.jpg"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-cyan-600 text-white border border-white/20 text-xs font-semibold backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 shadow-lg hover:scale-105 pointer-events-auto z-20"
            title="Open full resolution uncompressed image in new tab"
          >
            <i className="fa-solid fa-expand text-[11px]"></i>
            <span>View 100% Clarity</span>
          </a>
        </div>
      </div>
    </section>
  );
}
