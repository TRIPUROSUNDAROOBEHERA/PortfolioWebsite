import React, { useState, useEffect, useRef } from 'react';

// ─── TRIPGEN 10 KEY FEATURES ───
export const TRIPGEN_KEY_FEATURES = [
  {
    num: '01',
    title: 'Role-Based Access Control',
    desc: 'Separate Admin, Employee, and Traveler portals.',
    icon: 'fa-solid fa-users',
    badgeColor: 'bg-[#0066FF] text-white',
    iconColor: 'text-[#0066FF]',
    activeRing: 'ring-[#0066FF]/40 border-[#0066FF]',
    cardBg: 'bg-[#eff6ff]/75 border-[#bfdbfe]/80',
    nodeColor: 'bg-[#0066FF]'
  },
  {
    num: '02',
    title: 'Itinerary Management',
    desc: 'Create, update, search, and manage travel packages with day-wise schedules.',
    icon: 'fa-solid fa-calendar-days',
    badgeColor: 'bg-[#10B981] text-white',
    iconColor: 'text-[#10B981]',
    activeRing: 'ring-[#10B981]/40 border-[#10B981]',
    cardBg: 'bg-[#ecfdf5]/75 border-[#a7f3d0]/80',
    nodeColor: 'bg-[#10B981]'
  },
  {
    num: '03',
    title: 'Transport Management',
    desc: 'Manage flight, bus, and train details.',
    icon: 'fa-solid fa-plane-departure',
    badgeColor: 'bg-[#F97316] text-white',
    iconColor: 'text-[#F97316]',
    activeRing: 'ring-[#F97316]/40 border-[#F97316]',
    cardBg: 'bg-[#fff7ed]/75 border-[#fed7aa]/80',
    nodeColor: 'bg-[#F97316]'
  },
  {
    num: '04',
    title: 'Hotel Management',
    desc: 'Manage hotel listings, amenities, and accommodation rates.',
    icon: 'fa-solid fa-hotel',
    badgeColor: 'bg-[#8B5CF6] text-white',
    iconColor: 'text-[#8B5CF6]',
    activeRing: 'ring-[#8B5CF6]/40 border-[#8B5CF6]',
    cardBg: 'bg-[#f5f3ff]/75 border-[#ddd6fe]/80',
    nodeColor: 'bg-[#8B5CF6]'
  },
  {
    num: '05',
    title: 'Booking Management',
    desc: 'Handle reservations, booking records, and cancellations.',
    icon: 'fa-solid fa-ticket',
    badgeColor: 'bg-[#14B8A6] text-white',
    iconColor: 'text-[#14B8A6]',
    activeRing: 'ring-[#14B8A6]/40 border-[#14B8A6]',
    cardBg: 'bg-[#f0fdfa]/75 border-[#99f6e4]/80',
    nodeColor: 'bg-[#14B8A6]'
  },
  {
    num: '06',
    title: 'Customer Feedback',
    desc: 'Submit and manage traveler reviews and ratings.',
    icon: 'fa-solid fa-comments',
    badgeColor: 'bg-[#F43F5E] text-white',
    iconColor: 'text-[#F43F5E]',
    activeRing: 'ring-[#F43F5E]/40 border-[#F43F5E]',
    cardBg: 'bg-[#fff1f2]/75 border-[#fecdd3]/80',
    nodeColor: 'bg-[#F43F5E]'
  },
  {
    num: '07',
    title: 'Employee Management',
    desc: 'Add employees and maintain employee records.',
    icon: 'fa-solid fa-user-tie',
    badgeColor: 'bg-[#6366F1] text-white',
    iconColor: 'text-[#6366F1]',
    activeRing: 'ring-[#6366F1]/40 border-[#6366F1]',
    cardBg: 'bg-[#eef2ff]/75 border-[#c7d2fe]/80',
    nodeColor: 'bg-[#6366F1]'
  },
  {
    num: '08',
    title: 'Login Audit Tracking',
    desc: 'View login history and filter audit records by date.',
    icon: 'fa-solid fa-file-invoice',
    badgeColor: 'bg-[#F59E0B] text-white',
    iconColor: 'text-[#F59E0B]',
    activeRing: 'ring-[#F59E0B]/40 border-[#F59E0B]',
    cardBg: 'bg-[#fffbeb]/75 border-[#fde68a]/80',
    nodeColor: 'bg-[#F59E0B]'
  },
  {
    num: '09',
    title: 'Destination Exploration',
    desc: 'Browse travel destinations and view available packages.',
    icon: 'fa-solid fa-map-location-dot',
    badgeColor: 'bg-[#0EA5E9] text-white',
    iconColor: 'text-[#0EA5E9]',
    activeRing: 'ring-[#0EA5E9]/40 border-[#0EA5E9]',
    cardBg: 'bg-[#f0f9ff]/75 border-[#bae6fd]/80',
    nodeColor: 'bg-[#0EA5E9]'
  },
  {
    num: '10',
    title: 'Form Validation',
    desc: 'Validate user inputs and display appropriate error messages.',
    icon: 'fa-solid fa-list-check',
    badgeColor: 'bg-[#A855F7] text-white',
    iconColor: 'text-[#A855F7]',
    activeRing: 'ring-[#A855F7]/40 border-[#A855F7]',
    cardBg: 'bg-[#faf5ff]/75 border-[#e9d5ff]/80',
    nodeColor: 'bg-[#A855F7]'
  }
];

export default function TripGenKeyFeatures() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Scroll and Refresh entrance animation trigger
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when section top enters visible viewport
      if (rect.top <= windowHeight * 0.90 && rect.bottom >= 60) {
        setHasAnimated(true);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const timer1 = setTimeout(checkVisibility, 60);
    const timer2 = setTimeout(checkVisibility, 200);
    const timer3 = setTimeout(checkVisibility, 500);

    // 2. IntersectionObserver for viewport detection
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHasAnimated(true);
              if (observer && node) observer.unobserve(node);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );
      observer.observe(node);
    }

    // 3. Scroll event listener on window & nearest scrollable ancestor (modal container)
    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (observer && node) observer.disconnect();
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  // Active state strictly driven by user hover or click (automatic animation turned off)
  const currentActive =
    selectedId !== null
      ? selectedId
      : hoveredIndex;

  const handleCardClick = (idx) => {
    // If user is selecting/highlighting text, do not toggle selection state
    if (typeof window !== 'undefined' && window.getSelection && window.getSelection().toString().trim().length > 0) {
      return;
    }
    setSelectedId((prev) => (prev === idx ? null : idx));
  };

  return (
    <section ref={containerRef} className="space-y-4 tripgen-reveal-section font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── SECTION HEADER ─── */}
      <div>
        <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Key Features
        </h2>
      </div>

      {/* ─── MASTER INFOGRAPHIC CONTAINER (2-COLUMN LAYOUT) ─── */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-2.5 xs:p-3 sm:p-5 shadow-xs overflow-hidden relative"
      >
        <div className="flex flex-row gap-1.5 xs:gap-2 sm:gap-2.5 items-stretch">

          {/* Left Column: Scenic Visual Graphic (~53% on Desktop, ~42% on Mobile) - Slide from Left */}
          <div
            className="w-[40%] xs:w-[44%] lg:w-[53%] flex flex-col justify-center shrink-0"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated
                ? 'translateX(0)'
                : (typeof window !== 'undefined' && window.innerWidth < 768 ? 'translateX(-15px)' : 'translateX(-85px)'),
              filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
              transition: 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 80ms, opacity 0.85s ease-out 80ms, filter 0.85s ease-out 80ms',
              willChange: 'transform, opacity, filter'
            }}
          >
            <div className="relative w-full h-full min-h-[160px] xs:min-h-[190px] sm:min-h-[520px] rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-xs bg-white group flex items-center justify-center transition-all duration-500 hover:shadow-lg">
              <img
                src="/tripgen_key_features_visual.jpg"
                alt="TripGen Travel Plan Itinerary Generator"
                className="w-full h-full object-cover rounded-lg xs:rounded-xl sm:rounded-2xl select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                loading="eager"
              />
              {/* Interactive Light Sheen Reflection */}
              <div className="tripgen-card-sheen" />
            </div>
          </div>

          {/* Right Column: 10 Connected Timeline Feature Text Cards - Desktop format preserved side-by-side */}
          <div className="w-[60%] xs:w-[56%] lg:w-[47%] relative pl-2 xs:pl-2.5 sm:pl-4 space-y-1 xs:space-y-1.5 sm:space-y-2 flex flex-col justify-between select-text">
            
            {/* Vertical Connecting Timeline Line (Middle Round Color Stick) - Slowly comes from Top into position */}
            <div
              className="absolute left-0.5 sm:left-1.5 top-2 sm:top-3 bottom-2 sm:bottom-3 w-[1.5px] sm:w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full overflow-hidden"
              style={{
                transform: hasAnimated ? 'translateY(0) scaleY(1)' : 'translateY(-65px) scaleY(0.4)',
                transformOrigin: 'top center',
                opacity: hasAnimated ? 1 : 0,
                transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 0.75s ease-out 120ms',
                willChange: 'transform, opacity'
              }}
            >
              <div className="tripgen-timeline-beam" />
            </div>

            {TRIPGEN_KEY_FEATURES.map((feat, fIdx) => {
              const isActive = currentActive === fIdx;
              const isTopHalf = fIdx < 5; // 01 to 05: Top half
              const bottomIndex = fIdx - 5; // 06 to 10: 0, 1, 2, 3, 4

              // Serial staggered delays:
              // Top corner (01 to 05): serial stagger starting at 180ms
              // Bottom corner (06 to 10): serial stagger starting at 260ms
              const serialDelay = isTopHalf
                ? 180 + fIdx * 115
                : 260 + bottomIndex * 115;

              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const initialTransform = isTopHalf
                ? (isMobile ? 'translate(14px, -6px)' : 'translate(85px, -35px)')
                : (isMobile ? 'translate(14px, 6px)' : 'translate(85px, 35px)');

              return (
                <div
                  key={fIdx}
                  onMouseEnter={() => setHoveredIndex(fIdx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(fIdx)}
                  className="relative group cursor-pointer select-text"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translate(0, 0)' : initialTransform,
                    filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
                    transition: `transform 0.82s cubic-bezier(0.16, 1, 0.3, 1) ${serialDelay}ms, opacity 0.75s ease-out ${serialDelay}ms, filter 0.75s ease-out ${serialDelay}ms`,
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {/* Colored Circular Node on Timeline - Drops sequentially down from top into position */}
                  <span
                    className={`absolute -left-2.5 xs:-left-3 sm:-left-4 top-1/2 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full border border-white sm:border-2 shadow-2xs ${feat.nodeColor} transition-all duration-300 z-10 ${
                      isActive
                        ? 'scale-150 ring-2 sm:ring-4 ring-blue-300/60 shadow-md ring-offset-1'
                        : 'group-hover:scale-135 group-hover:ring-2 group-hover:ring-slate-300/50'
                    }`}
                    style={{
                      opacity: hasAnimated ? 1 : 0,
                      transform: hasAnimated
                        ? (isActive ? 'translateY(-50%) scale(1.5)' : 'translateY(-50%) scale(1)')
                        : 'translateY(-90px) scale(0.3)',
                      filter: hasAnimated ? 'blur(0px)' : 'blur(2px)',
                      transition: `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${140 + fIdx * 55}ms, opacity 0.65s ease-out ${140 + fIdx * 55}ms, filter 0.65s ease-out ${140 + fIdx * 55}ms`,
                      willChange: 'transform, opacity'
                    }}
                  />

                  {/* Pill Card */}
                  <div
                    className={`relative overflow-hidden flex items-center justify-between gap-1 xs:gap-1.5 sm:gap-3 px-1.5 py-1 xs:px-2 xs:py-1.5 sm:px-3.5 sm:py-2.5 rounded-md xs:rounded-lg sm:rounded-xl border transition-all duration-300 select-text ${
                      isActive
                        ? `bg-white shadow-md border-blue-400 ring-2 ${feat.activeRing} translate-x-1 sm:translate-x-3`
                        : `${feat.cardBg} hover:translate-x-0.5 sm:hover:translate-x-1 hover:shadow-md hover:border-slate-300/80`
                    }`}
                  >
                    <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 min-w-0 flex-1 relative z-1 select-text">
                      {/* Number Badge */}
                      <div
                        className={`w-4 h-4 xs:w-5 xs:h-4.5 sm:w-8 sm:h-7 rounded-xs xs:rounded-sm sm:rounded-xl ${feat.badgeColor} flex items-center justify-center font-black text-[7.5px] xs:text-[8.5px] sm:text-xs shrink-0 shadow-2xs transition-transform duration-300 select-text ${
                          isActive
                            ? 'scale-110 rotate-[-2deg] shadow-sm'
                            : 'group-hover:scale-110 group-hover:rotate-[-2deg]'
                        }`}
                      >
                        {feat.num}
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 flex items-center justify-center text-[8px] xs:text-[9.5px] sm:text-sm ${feat.iconColor} shrink-0 transition-transform duration-300 ${
                          isActive ? 'scale-125' : 'group-hover:scale-125'
                        }`}
                      >
                        <i className={feat.icon}></i>
                      </div>

                      {/* Content - Selectable Text */}
                      <div className="min-w-0 flex-1 select-text cursor-text">
                        <h3 className={`font-black sm:font-extrabold text-[8px] xs:text-[9px] sm:text-[13px] leading-tight tracking-tight transition-colors duration-200 select-text cursor-text ${
                          isActive ? 'text-blue-600 font-black' : 'text-slate-900 group-hover:text-blue-600'
                        }`}>
                          {feat.title}
                        </h3>
                        <p className="text-[7px] xs:text-[8px] sm:text-[11.5px] text-slate-800 font-medium sm:font-normal leading-tight line-clamp-1 xs:line-clamp-2 select-text cursor-text">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

