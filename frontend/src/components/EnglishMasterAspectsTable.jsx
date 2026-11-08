import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterAspectsTable
 * 
 * 4 Overview Aspect Cards for English Master Pro:
 * 1. Platform - Slowly enters from the LEFT side.
 * 2. Role - Slowly enters from the TOP.
 * 3. Tech Stack - Slowly enters from the BOTTOM / DOWN.
 * 4. Learning Modules - Slowly enters from the RIGHT side.
 * 
 * Triggers on page refresh / load AND on scroll when entering the viewport.
 * Features staggered content text reveals and fluid cubic-bezier animations.
 */

const ASPECTS_DATA = [
  {
    aspect: 'Platform',
    lineColor: 'bg-indigo-500',
    cardBorder: 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md',
    accentDot: 'bg-indigo-500',
    summary: 'A mobile application developed using Flutter that works on Android and iOS devices.',
    // Direction: LEFT
    initialTransform: 'translateX(-90px)',
    finalTransform: 'translateX(0)',
    delay: '0ms',
    items: [
      { label: 'Android App', desc: 'Works on Android phones and tablets.' },
      { label: 'iOS App', desc: 'Supports iPhones and iPads.' },
      { label: 'Single Codebase', desc: 'One codebase is used to develop both apps.' },
      { label: 'Responsive Design', desc: 'The app adjusts to different screen sizes.' },
    ],
  },
  {
    aspect: 'Role',
    lineColor: 'bg-purple-500',
    cardBorder: 'border-slate-200/90 hover:border-purple-300 hover:shadow-md',
    accentDot: 'bg-purple-500',
    summary: 'Responsible for developing the mobile application and connecting it with the backend services.',
    // Direction: TOP
    initialTransform: 'translateY(-80px)',
    finalTransform: 'translateY(0)',
    delay: '140ms',
    items: [
      { label: 'Mobile App Developer', desc: 'Designed screens, animations, audio players, and navigation.' },
      { label: 'Full-Stack Developer', desc: 'Integrated login, registration, and cloud data storage.' },
      { label: 'Database Management', desc: 'Managed student data and learning progress.' },
      { label: 'Testing', desc: 'Tested app functionality, performance, and memory usage.' },
    ],
  },
  {
    aspect: 'Tech Stack',
    lineColor: 'bg-sky-500',
    cardBorder: 'border-slate-200/90 hover:border-sky-300 hover:shadow-md',
    accentDot: 'bg-sky-500',
    summary: 'Technologies used to develop the application.',
    // Direction: BOTTOM / DOWN
    initialTransform: 'translateY(80px)',
    finalTransform: 'translateY(0)',
    delay: '280ms',
    items: [
      { label: 'Flutter & Dart', desc: 'Used to build the mobile application.' },
      { label: 'Firebase Authentication', desc: 'Handles student login and registration.' },
      { label: 'Cloud Firestore', desc: 'Stores student profiles, quiz scores, and learning progress.' },
      { label: 'Offline Storage', desc: 'Allows users to access saved learning content without an internet connection and syncs data when connectivity returns.' },
    ],
  },
  {
    aspect: 'Learning Modules',
    lineColor: 'bg-emerald-500',
    cardBorder: 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md',
    accentDot: 'bg-emerald-500',
    summary: 'The application contains 26 interactive learning units to improve English skills.',
    // Direction: RIGHT
    initialTransform: 'translateX(90px)',
    finalTransform: 'translateX(0)',
    delay: '420ms',
    items: [
      { label: 'Grammar Academy', desc: 'Learn grammar rules, tenses, and sentence structures.' },
      { label: 'Vocabulary Builder', desc: 'Learn new words, synonyms, idioms, and phrases.' },
      { label: 'Speaking & Audio Lab', desc: 'Practice conversations and pronunciation.' },
      { label: 'Quizzes & Certificates', desc: 'Test your knowledge, view results, and earn certificates when supported.' },
    ],
  },
];

export default function EnglishMasterAspectsTable() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Check visibility relative to viewport & parent modal scroll container
    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when top of section is within 90% of screen height
      if (rect.top <= windowHeight * 0.90 && rect.bottom >= 0) {
        setHasAnimated(true);
      }
    };

    // 1. Initial check immediately on mount / page refresh
    checkVisibility();
    const initialTimer = setTimeout(checkVisibility, 80);
    const backupTimer = setTimeout(checkVisibility, 250);

    // 2. IntersectionObserver for modern view detection
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
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      );
      observer.observe(node);
    }

    // 3. Scroll event listener on window & nearest scrollable ancestor (modal container)
    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(backupTimer);
      if (observer && node) observer.disconnect();
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full font-['Plus_Jakarta_Sans',sans-serif] overflow-x-clip select-none">
      {/* 4 Individual Boxes in a Responsive Grid (4-Column Format on All Viewports) */}
      <div className="grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-4 lg:gap-5 items-stretch">
        {ASPECTS_DATA.map((row, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-1 xs:p-1.5 sm:p-5 border ${row.cardBorder} shadow-xs hover:shadow-md flex flex-col justify-between will-change-transform`}
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? row.finalTransform : row.initialTransform,
              filter: hasAnimated ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 1150ms cubic-bezier(0.16, 1, 0.3, 1), transform 1150ms cubic-bezier(0.16, 1, 0.3, 1), filter 1150ms cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: row.delay,
            }}
          >
            <div>
              {/* Box Header: Heading with Full-Width Colored Divider Line */}
              <div className="mb-1 sm:mb-3">
                <h4
                  className="font-extrabold text-[7.5px] xs:text-[9px] sm:text-base text-slate-900 tracking-tight text-center truncate"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translateY(0)' : 'translateY(-4px)',
                    transition: 'opacity 700ms ease, transform 700ms ease',
                    transitionDelay: `${idx * 140 + 200}ms`,
                  }}
                >
                  {row.aspect}
                </h4>
                {/* Full-Width Colored Divider Line that gracefully draws across */}
                <div className="w-full h-0.5 bg-slate-100 mt-1 sm:mt-2.5 overflow-hidden rounded-full">
                  <div
                    className={`h-full ${row.lineColor} rounded-full`}
                    style={{
                      width: hasAnimated ? '100%' : '0%',
                      transition: 'width 850ms cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${idx * 140 + 350}ms`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Box Brief Summary */}
              <p
                className="text-[6px] xs:text-[7px] sm:text-xs text-slate-600 leading-tight sm:leading-relaxed font-normal mb-1 sm:mb-3 line-clamp-2 xs:line-clamp-3 sm:line-clamp-none"
                style={{
                  opacity: hasAnimated ? 1 : 0,
                  transform: hasAnimated ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 700ms ease, transform 700ms ease',
                  transitionDelay: `${idx * 140 + 300}ms`,
                }}
              >
                {row.summary}
              </p>

              {/* Items Listed Down One by One with Staggered Fade & Slide */}
              <div className="space-y-1 sm:space-y-2.5 pt-1 sm:pt-2.5 border-t border-slate-100">
                {row.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-0.5 sm:gap-2 text-[6px] xs:text-[7px] sm:text-xs leading-tight sm:leading-relaxed"
                    style={{
                      opacity: hasAnimated ? 1 : 0,
                      transform: hasAnimated ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${idx * 140 + 380 + i * 75}ms`,
                    }}
                  >
                    <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${row.accentDot} mt-1 sm:mt-1.5 shrink-0`}></span>
                    <div>
                      <strong className="font-bold text-slate-900 block xs:inline">{item.label}: </strong>
                      <span className="text-slate-600 font-normal text-[5.5px] xs:text-[6.5px] sm:text-[11.5px] line-clamp-1 xs:line-clamp-2 sm:line-clamp-none">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
