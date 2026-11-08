import React from 'react';

/**
 * TripGenHeader
 * 
 * FAITHFUL RECREATION OF IMAGE 2 (SUNSET COASTAL TRAVELER HEADER BANNER)
 * - Panoramic Santorini / Mediterranean coastal sunset backdrop:
 *   Traveler with backpack looking out over the bay, white cliffside village,
 *   bougainvillea flowers, sailboat, and twin-engine jet with flight loop to map pin.
 * - Exact typography and branding:
 *   - "TripGen" wordmark ("Trip" in pure white, "Gen" in bright coral-red)
 *   - "(Travel Plan Itinerary Generator)" subtitle
 *   - Red accent underline bar
 *   - Full TripGen web application project description
 * - 5 Circular Feature Badges in horizontal row:
 *   1. Explore Destinations (Red Pin)
 *   2. Discover Tour Packages (Blue Luggage)
 *   3. Manage Bookings (Purple Calendar)
 *   4. Hotel Listings (Teal Bed)
 *   5. Transportation Management (Orange Car)
 * - Glowing red gradient accent underline line across the base of the badges.
 */
export default function TripGenHeader({ selectedProject }) {
  const projectDesc =
    selectedProject?.longDesc ||
    selectedProject?.desc ||
    'TripGen is a travel planning web application that helps users explore destinations, find tour packages, plan itineraries, book hotels and transportation, and manage their trips. It also provides tools for administrators and employees to manage bookings, users, and customer feedback.';

  const featurePillars = [
    {
      id: 'explore-destinations',
      title: 'Explore',
      subtitle: 'Destinations',
      icon: 'fa-solid fa-location-dot',
      color: 'text-[#EF4444]',
      hoverGlow: 'hover:shadow-rose-500/30',
    },
    {
      id: 'discover-tour-packages',
      title: 'Discover',
      subtitle: 'Tour Packages',
      icon: 'fa-solid fa-suitcase-rolling',
      color: 'text-[#0284C7]',
      hoverGlow: 'hover:shadow-sky-500/30',
    },
    {
      id: 'manage-bookings',
      title: 'Manage',
      subtitle: 'Bookings',
      icon: 'fa-solid fa-calendar-days',
      color: 'text-[#8B5CF6]',
      hoverGlow: 'hover:shadow-purple-500/30',
    },
    {
      id: 'hotel-listings',
      title: 'Hotel',
      subtitle: 'Listings',
      icon: 'fa-solid fa-bed',
      color: 'text-[#10B981]',
      hoverGlow: 'hover:shadow-emerald-500/30',
    },
    {
      id: 'transportation-management',
      title: 'Transportation',
      subtitle: 'Management',
      icon: 'fa-solid fa-car',
      color: 'text-[#F97316]',
      hoverGlow: 'hover:shadow-orange-500/30',
    },
  ];

  return (
    <header
      className="relative w-full overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-text shadow-2xl bg-[#07255d]"
    >
      {/* ─── SCOPED KEYFRAME ANIMATIONS ─── */}
      <style>{`
        @keyframes tgPlaneFloat {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(2px, -3px);
          }
        }
        @keyframes tgGlowPulse {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }
        header *::selection {
          background-color: #00C2FF !important;
          color: #FFFFFF !important;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
      `}</style>

      {/* ─── MASTER HERO CONTAINER (EXACT 2ND IMAGE SUNSET TRAVELER BANNER) ─── */}
      <div className="relative w-full min-h-[350px] xs:min-h-[380px] sm:min-h-[500px] md:min-h-[530px] lg:min-h-[560px] flex items-center overflow-hidden">
        
        {/* Background Scenic Backdrop: Exact Twilight Sunset Gradient on Left, Santorini Scenery & Traveler on Right - 100% Unified */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none bg-cover bg-no-repeat bg-center md:bg-[center_right] z-0"
          style={{
            backgroundImage: "url('/tripgen_sunset_backdrop_2x.png'), url('/tripgen_sunset_backdrop_clean.png')",
          }}
          aria-hidden="true"
        />

        {/* ─── FOREGROUND CONTENT LAYER (PURE CRISP TEXT & ICONS DIRECTLY ON SUNSET GRADIENT) ─── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 py-3.5 xs:py-4.5 sm:py-8 lg:py-9 flex flex-col justify-center">
          
          {/* Left Text & Features Column (Matching Image 2 Reference) */}
          <div className="w-full max-w-xl lg:max-w-2xl space-y-1.5 xs:space-y-2 sm:space-y-3 select-text selection:bg-[#00C2FF] selection:text-white">
            
            {/* 1. TripGen Brand Wordmark & Emblem */}
            <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 select-text cursor-text">
              <div className="relative shrink-0 w-8 h-8 xs:w-9 xs:h-9 sm:w-13 sm:h-13 lg:w-14 lg:h-14 flex items-center justify-center">
                <img
                  src="/tripgen_logo_clean.png"
                  alt="TripGen Logo"
                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] select-none pointer-events-none"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col leading-none select-text cursor-text">
                <div className="flex items-center text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight font-['Outfit',sans-serif] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                  <span className="text-white">Trip</span>
                  <span className="text-[#00C2FF]">Gen</span>
                </div>
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] lg:text-[10.5px] font-bold text-white tracking-[0.2em] sm:tracking-[0.22em] uppercase pt-0.5 sm:pt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)] select-text">
                  SMART TRAVEL PLANNER
                </span>
              </div>
            </div>

            {/* 2. Red Accent Underline Bar */}
            <div className="pt-0.5 pointer-events-none">
              <div className="w-8 xs:w-10 sm:w-14 h-[2.5px] sm:h-[3.5px] bg-[#F82C32] rounded-full shadow-[0_0_8px_rgba(248,44,50,0.6)]"></div>
            </div>

            {/* 3. Time To 'TRAVEL ✈ Headline */}
            <div className="select-text cursor-text leading-none pt-0.5">
              <span className="block text-sm xs:text-base sm:text-xl lg:text-[24px] font-bold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] font-['Outfit',sans-serif] select-text">
                Time To
              </span>
              <div className="flex items-center text-2xl xs:text-[28px] sm:text-5xl lg:text-[54px] font-black tracking-wider uppercase text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)] font-['Outfit',sans-serif] mt-0.5 select-text">
                <span>&apos;TRAVEL</span>
                {/* Golden Yellow Paper Airplane Icon taking off */}
                <span className="inline-block text-[#FFB800] ml-1.5 xs:ml-2 -mt-1 sm:-mt-2 transform -rotate-12 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1 select-none">
                  <i className="fa-solid fa-paper-plane text-lg xs:text-xl sm:text-3xl lg:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"></i>
                </span>
              </div>
            </div>

            {/* 4. Tagline: Your Journey, Planned Smarter. */}
            <div className="select-text cursor-text pt-0.5">
              <span className="text-xs xs:text-[13px] sm:text-base lg:text-[18px] font-bold text-white [text-shadow:_0_1.5px_4px_rgba(0,0,0,0.6)] font-['Outfit',sans-serif] select-text">
                Your Journey, Planned <span className="text-[#00C2FF] font-black [text-shadow:_0_1.5px_4px_rgba(0,0,0,0.7)]">Smarter.</span>
              </span>
            </div>

            {/* 5. Complete Project Description Paragraph (Clean Aesthetic Matching Image 2 Reference) */}
            <div className="max-w-lg lg:max-w-xl">
              <p className="text-[11px] xs:text-[11.5px] sm:text-[13px] lg:text-[13.5px] text-white leading-relaxed font-normal text-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] select-text cursor-text">
                {projectDesc}
              </p>
            </div>

            {/* 6. CTA Button: Explore Destinations */}
            <div className="pt-0.5 sm:pt-1">
              <button
                type="button"
                onClick={() => {
                  const elem = document.querySelector('.tripgen-reveal-section') || document.querySelector('#tripgen-modules');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#00A3FF] to-[#9333EA] text-white font-bold text-[10.5px] xs:text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 group cursor-pointer border border-white/20 select-none"
              >
                <span className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                  <i className="fa-regular fa-compass text-[10px] xs:text-[11px] sm:text-xs text-white"></i>
                </span>
                <span>Explore Destinations</span>
                <i className="fa-solid fa-arrow-right text-[10px] xs:text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
              </button>
            </div>

            {/* 7. The 5 Feature Circular Badges in Horizontal Row */}
            <div className="pt-1.5 sm:pt-2.5">
              <div className="flex items-start gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-5 flex-wrap sm:flex-nowrap">
                {featurePillars.map((feat) => (
                  <div
                    key={feat.id}
                    className="flex flex-col items-center gap-1 sm:gap-1.5 text-center group cursor-default select-none"
                  >
                    {/* White Circular Disc with Category Icon */}
                    <div
                      className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white shadow-md shadow-black/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${feat.hoverGlow}`}
                    >
                      <i className={`${feat.icon} ${feat.color} text-xs xs:text-sm sm:text-xl`}></i>
                    </div>

                    {/* Dual-line Label (Clean Drop Shadow Matching Image 2 Reference) */}
                    <span className="text-[7.5px] xs:text-[8.5px] sm:text-[11px] font-bold text-white leading-tight tracking-tight whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] sm:drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
                      {feat.title}
                      <br />
                      {feat.subtitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
