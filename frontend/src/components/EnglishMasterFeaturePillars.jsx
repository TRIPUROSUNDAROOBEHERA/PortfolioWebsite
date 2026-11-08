import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterFeaturePillars
 * 
 * 3D Book Page Flip Animation Showcase:
 * - Left & Right pages are 100% ATTACHED at the center spine & top/bottom corners (gap-0, seamless hinge)
 * - Slowly and very smoothly opens over 2200ms with silky cubic-bezier deceleration
 * - Automatically opens on scroll and refresh, with manual toggle in header
 */

const LEFT_PAGE_PILLARS = [
  {
    id: 'grammar',
    title: 'English Grammar',
    desc: 'Learn rules, tenses & sentence structure with examples.',
    cardBg: 'from-[#FAF5FF] via-[#FDFBFF] to-[#FAF5FF]',
    cardBorder: 'border-purple-200/80',
    hoverBorder: 'hover:border-purple-400',
    hoverShadow: 'hover:shadow-[0_16px_30px_-8px_rgba(147,51,234,0.22)]',
    sphereStyle: {
      background: 'radial-gradient(circle at 32% 28%, #D8B4FE 0%, #A855F7 32%, #7E22CE 72%, #581C87 100%)',
      boxShadow: '0 8px 18px -2px rgba(126,34,206,0.45), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.3)',
    },
    renderIcon: () => (
      <i className="fa-solid fa-book-open text-white text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"></i>
    ),
    items: [
      { id: 1, title: 'Tenses', desc: 'Learn past, present, and future tenses.' },
      { id: 2, title: 'Parts of Speech', desc: 'Understand nouns, verbs, adjectives, and more.' },
      { id: 3, title: 'Sentence Structure', desc: 'Build grammatically correct sentences.' },
      { id: 4, title: 'Articles & Prepositions', desc: 'Use articles and prepositions correctly.' },
      { id: 5, title: 'Active & Passive Voice', desc: 'Transform sentences using different voices.' },
    ],
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Builder',
    desc: 'Learn new words, synonyms, antonyms & useful expressions.',
    cardBg: 'from-[#F0F9FF] via-[#F8FCFF] to-[#F0F9FF]',
    cardBorder: 'border-sky-200/80',
    hoverBorder: 'hover:border-sky-400',
    hoverShadow: 'hover:shadow-[0_16px_30px_-8px_rgba(2,132,199,0.22)]',
    sphereStyle: {
      background: 'radial-gradient(circle at 32% 28%, #7DD3FC 0%, #0284C7 35%, #0369A1 72%, #075985 100%)',
      boxShadow: '0 8px 18px -2px rgba(2,132,199,0.45), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.3)',
    },
    renderIcon: () => (
      <div className="flex items-center justify-center font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] select-none">
        <span className="text-xl font-black leading-none">A</span>
        <span className="text-sm font-black leading-none -ml-0.5 mt-0.5">Z</span>
      </div>
    ),
    items: [
      { id: 1, title: 'Word of the Day', desc: 'Discover a new word with its meaning.' },
      { id: 2, title: 'Synonyms & Antonyms', desc: 'Learn similar and opposite words.' },
      { id: 3, title: 'Idioms & Expressions', desc: 'Understand common English expressions.' },
      { id: 4, title: 'Phrasal Verbs', desc: 'Learn commonly used phrasal verbs.' },
      { id: 5, title: 'Spelling Practice', desc: 'Improve spelling through interactive exercises.' },
    ],
  },
];

const RIGHT_PAGE_PILLARS = [
  {
    id: 'speaking',
    title: 'Speaking & Communication',
    desc: 'Practice conversations, improve pronunciation & build confidence.',
    cardBg: 'from-[#FFF1F2] via-[#FFFBFC] to-[#FFF1F2]',
    cardBorder: 'border-rose-200/80',
    hoverBorder: 'hover:border-rose-400',
    hoverShadow: 'hover:shadow-[0_16px_30px_-8px_rgba(244,63,94,0.22)]',
    sphereStyle: {
      background: 'radial-gradient(circle at 32% 28%, #FDA4AF 0%, #F43F5E 32%, #BE123C 72%, #881337 100%)',
      boxShadow: '0 8px 18px -2px rgba(225,29,72,0.45), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.3)',
    },
    renderIcon: () => (
      <i className="fa-solid fa-microphone text-white text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"></i>
    ),
    items: [
      { id: 1, title: 'Daily Conversations', desc: 'Practice everyday English dialogues.' },
      { id: 2, title: 'Pronunciation Practice', desc: 'Improve clarity with guided exercises.' },
      { id: 3, title: 'Role-Play Activities', desc: 'Practice real-life speaking situations.' },
      { id: 4, title: 'Public Speaking', desc: 'Develop confidence when speaking to an audience.' },
      { id: 5, title: 'Interview Preparation', desc: 'Practice answering common interview questions.' },
    ],
  },
  {
    id: 'quizzes',
    title: 'Quizzes & Practice',
    desc: 'Test your knowledge, review mistakes & track progress.',
    cardBg: 'from-[#F0FDF4] via-[#F8FEF9] to-[#F0FDF4]',
    cardBorder: 'border-emerald-200/80',
    hoverBorder: 'hover:border-emerald-400',
    hoverShadow: 'hover:shadow-[0_16px_30px_-8px_rgba(16,185,129,0.22)]',
    sphereStyle: {
      background: 'radial-gradient(circle at 32% 28%, #6EE7B7 0%, #10B981 32%, #047857 72%, #064E3B 100%)',
      boxShadow: '0 8px 18px -2px rgba(16,185,129,0.45), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.3)',
    },
    renderIcon: () => (
      <div className="w-6 h-6 rounded-[7px] bg-white/25 border-1.5 border-white flex items-center justify-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        <i className="fa-solid fa-check text-xs font-black"></i>
      </div>
    ),
    items: [
      { id: 1, title: 'Grammar Quiz', desc: 'Test your understanding of grammar rules.' },
      { id: 2, title: 'Vocabulary Quiz', desc: 'Check your knowledge of English words.' },
      { id: 3, title: 'Listening Quiz', desc: 'Answer questions based on audio exercises.' },
      { id: 4, title: 'Mistake Review', desc: 'Learn from incorrect answers.' },
      { id: 5, title: 'Progress Tracking', desc: 'Monitor scores and measure improvement.' },
    ],
  },
];

export default function EnglishMasterFeaturePillars() {
  const containerRef = useRef(null);
  // Starts closed, then slowly very smoothly swings open!
  const [isOpen, setIsOpen] = useState(false);

  // Trigger opening animation on scroll & mount in BOTH forward (top-to-bottom) and backward (bottom-to-top) directions
  useEffect(() => {
    let openTimer = null;

    // Detect the modal or page scrollable parent
    const scrollParent = containerRef.current?.closest('.overflow-y-auto') || null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scrolled into view from EITHER direction (top-to-bottom OR bottom-to-top)
            // 60ms delay ensures initial closed frame is rendered before 2200ms cubic-bezier transition swings open
            if (openTimer) clearTimeout(openTimer);
            openTimer = setTimeout(() => {
              setIsOpen(true);
            }, 60);
          } else {
            // Scrolled completely out of view in either direction:
            // Silently reset to closed state off-screen so that scrolling back into view (both front and back)
            // always plays the smooth, majestic folding open animation!
            if (openTimer) clearTimeout(openTimer);
            setIsOpen(false);
          }
        });
      },
      {
        root: scrollParent,
        threshold: 0,
        rootMargin: '40px 0px 40px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (openTimer) clearTimeout(openTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-6 pt-1 pb-4 font-['Plus_Jakarta_Sans',sans-serif]">

      {/* ─── 1. SECTION HEADER (CLEAN, NO BUTTON) ─── */}
      <div className="pb-2.5 border-b border-slate-200">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Core Curriculum & Learning Modules
        </h3>
      </div>

      {/* ─── 2. 3D BOOK SPREAD CONTAINER (LEFT & RIGHT CORNERS 100% ATTACHED AT CENTER HINGE) ─── */}
      <div 
        className="w-full relative py-1"
        style={{ perspective: '2400px', perspectiveOrigin: 'center 40%' }}
      >
        <div 
          className="w-full grid grid-cols-2 gap-0 relative"
          style={{ transformStyle: 'preserve-3d' }}
        >

          {/* ══════════════════════════════════════════════════════
              LEFT PAGE SPREAD (ATTACHED AT RIGHT HINGE TO RIGHT PAGE)
              - Hinges directly on right edge, attached to center spine
              - Top-right corner is square (rounded-r-none) to touch right page
             ══════════════════════════════════════════════════════ */}
          <div
            className="relative p-1 xs:p-1.5 sm:p-3 rounded-l-xl xs:rounded-l-2xl rounded-r-none bg-gradient-to-r from-white via-white to-slate-50/90 border border-slate-200/80 border-r-0 select-text"
            style={{
              transformOrigin: 'right center',
              transform: isOpen 
                ? 'rotateY(0deg)' 
                : 'rotateY(75deg)',
              boxShadow: isOpen 
                ? 'inset -6px 0 14px -5px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)' 
                : 'inset -25px 0 35px -5px rgba(0,0,0,0.22), -8px 12px 25px rgba(0,0,0,0.12)',
              opacity: isOpen ? 1 : 0.75,
              transition: 'transform 2200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 2200ms ease, opacity 1600ms ease',
            }}
          >
            <div className="grid grid-cols-2 gap-1 xs:gap-1.5 sm:gap-4 items-stretch pt-2 xs:pt-2.5 sm:pt-4">
              {LEFT_PAGE_PILLARS.map((pillar) => (
                <PillarCard key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              SEAMLESS CENTER SPINE HAIRLINE (100% ATTACHED HINGE)
             ══════════════════════════════════════════════════════ */}
          <div className="block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-slate-300/80 z-30 pointer-events-none"></div>

          {/* ══════════════════════════════════════════════════════
              RIGHT PAGE SPREAD (ATTACHED AT LEFT HINGE TO LEFT PAGE)
              - Hinges directly on left edge, attached to center spine
              - Top-left corner is square (rounded-l-none) to touch left page
             ══════════════════════════════════════════════════════ */}
          <div
            className="relative p-1 xs:p-1.5 sm:p-3 rounded-r-xl xs:rounded-r-2xl rounded-l-none bg-gradient-to-l from-white via-white to-slate-50/90 border border-slate-200/80 border-l-0 select-text mt-0"
            style={{
              transformOrigin: 'left center',
              transform: isOpen 
                ? 'rotateY(0deg)' 
                : 'rotateY(-75deg)',
              boxShadow: isOpen 
                ? 'inset 6px 0 14px -5px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)' 
                : 'inset 25px 0 35px -5px rgba(0,0,0,0.22), 8px 12px 25px rgba(0,0,0,0.12)',
              opacity: isOpen ? 1 : 0.75,
              transition: 'transform 2200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 2200ms ease, opacity 1600ms ease',
            }}
          >
            <div className="grid grid-cols-2 gap-1 xs:gap-1.5 sm:gap-4 items-stretch pt-2 xs:pt-2.5 sm:pt-4">
              {RIGHT_PAGE_PILLARS.map((pillar) => (
                <PillarCard key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/**
 * PillarCard
 * Reusable unified card component containing 3D sphere, header, and 5 structured lessons.
 */
function PillarCard({ pillar }) {
  return (
    <div
      className={`group relative bg-gradient-to-b ${pillar.cardBg} border ${pillar.cardBorder} ${pillar.hoverBorder} ${pillar.hoverShadow} rounded-lg xs:rounded-xl sm:rounded-2xl pt-3.5 xs:pt-4 sm:pt-9 pb-1 xs:pb-1.5 sm:pb-5 px-1 xs:px-1.5 sm:px-3.5 flex flex-col justify-between shadow-xs transition-all duration-300 cursor-default select-text`}
    >
      {/* 3D Glossy Sphere (Overlapping Top Border) */}
      <div className="absolute -top-2.5 xs:-top-3 sm:-top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div
          style={pillar.sphereStyle}
          className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-13 sm:h-13 rounded-full ring-[1.5px] sm:ring-[3.5px] ring-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
        >
          {/* Glossy reflection arc highlight */}
          <div className="absolute top-0.5 left-0.5 xs:left-1 sm:left-2 w-1.5 xs:w-2 sm:w-5 h-0.5 xs:h-1 sm:h-2 bg-white/60 rounded-full blur-[0.3px] sm:blur-[0.4px] rotate-[-25deg] pointer-events-none"></div>

          {/* Inner icon */}
          <div className="relative z-10 flex items-center justify-center scale-50 xs:scale-60 sm:scale-100 transition-transform duration-300 group-hover:scale-105">
            {pillar.renderIcon()}
          </div>
        </div>
      </div>

      {/* Pillar Header Info */}
      <div className="pt-0.5 xs:pt-1 sm:pt-2 text-center pb-1 xs:pb-1.5 sm:pb-3 border-b border-slate-200/70 mb-1 xs:mb-1.5 sm:mb-3">
        <h4 className="text-[7.5px] xs:text-[8.5px] sm:text-[16.5px] font-black text-slate-900 tracking-tight leading-tight mb-0.5 sm:mb-1 transition-transform duration-300 group-hover:scale-102">
          {pillar.title}
        </h4>
        <p className="text-[5.5px] xs:text-[6.5px] sm:text-[12px] text-slate-600 font-medium leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
          {pillar.desc}
        </p>
      </div>

      {/* 5 Structured Lesson Items */}
      <div className="space-y-0.5 xs:space-y-1 sm:space-y-2 flex-1">
        {pillar.items.map((item) => (
          <div
            key={item.id}
            className="group/item p-0.5 xs:p-1 sm:p-2.5 rounded xs:rounded-md sm:rounded-xl bg-white/95 hover:bg-white border border-slate-200/80 hover:border-slate-300 transition-all duration-200 flex items-start gap-0.5 xs:gap-1 sm:gap-2.5 shadow-2xs hover:shadow-xs hover:translate-x-0.5 sm:hover:translate-x-1"
          >
            <span className="text-[5.5px] xs:text-[6.5px] sm:text-[10px] font-extrabold w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4.5 sm:h-4.5 rounded flex items-center justify-center shrink-0 mt-0.5 bg-slate-100 text-slate-700 border border-slate-200 group-hover/item:bg-slate-900 group-hover/item:text-white transition-colors duration-200">
              {item.id}
            </span>
            <div className="min-w-0">
              <h5 className="text-[6px] xs:text-[7px] sm:text-[12px] font-extrabold text-slate-900 leading-tight truncate xs:line-clamp-1 sm:line-clamp-none">
                {item.title}
              </h5>
              <p className="text-[5px] xs:text-[5.5px] sm:text-[11px] text-slate-600 font-normal leading-tight mt-0.5 line-clamp-1 sm:line-clamp-none">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
