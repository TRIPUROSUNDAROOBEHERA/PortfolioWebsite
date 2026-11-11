import React, { useState, useEffect, useRef } from 'react';
import { assetUrl } from '../../utils/assetUrl';

export default function AboutSection({ setActiveTab, isStandalonePage = false, refreshingSection = null, refreshKey = 0 }) {
  const [isInView, setIsInView] = useState(false);
  const [cardsInView, setCardsInView] = useState(false);
  const [illustrationShouldSlide, setIllustrationShouldSlide] = useState(true);
  const [cardsShouldSlide, setCardsShouldSlide] = useState(true);
  const illustrationRef = useRef(null);
  const cardsRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const scrollDirection = useRef('down');

  useEffect(() => {
    const illusNode = illustrationRef.current;
    const cardsNode = cardsRef.current;

    const handleScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const diff = currentY - lastScrollY.current;
      if (Math.abs(diff) > 2) {
        scrollDirection.current = diff > 0 ? 'down' : 'up';
        lastScrollY.current = currentY;
      }
      checkVisibility();
    };

    const checkVisibility = () => {
      const isUp = scrollDirection.current === 'up';

      if (illusNode) {
        const r1 = illusNode.getBoundingClientRect();
        if (r1.top < window.innerHeight * 0.95 && r1.bottom > 0) {
          // If scrolling UP from bottom to top: DO NOT slide! Display settled immediately.
          if (isUp) {
            setIllustrationShouldSlide(false);
            setIsInView(true);
          } else {
            setIllustrationShouldSlide(true);
            setIsInView(true);
          }
        } else if (r1.top > window.innerHeight + 60) {
          // Only reset when element goes BELOW the viewport (user scrolled back up to the top of the page)
          // Never reset when r1.bottom < -60, so scrolling back up leaves it settled without re-animating.
          setIsInView(false);
          setIllustrationShouldSlide(true);
        }
      }

      if (cardsNode) {
        const r2 = cardsNode.getBoundingClientRect();
        if (r2.top < window.innerHeight * 0.95 && r2.bottom > 0) {
          if (isUp) {
            setCardsShouldSlide(false);
            setCardsInView(true);
          } else {
            setCardsShouldSlide(true);
            setCardsInView(true);
          }
        } else if (r2.top > window.innerHeight + 60) {
          setCardsInView(false);
          setCardsShouldSlide(true);
        }
      }
    };

    checkVisibility();
    const t = setTimeout(checkVisibility, 120);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const isUp = scrollDirection.current === 'up';
          entries.forEach((entry) => {
            if (entry.target === illusNode) {
              if (entry.isIntersecting) {
                if (isUp) {
                  setIllustrationShouldSlide(false);
                  setIsInView(true);
                } else {
                  setIllustrationShouldSlide(true);
                  setIsInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setIsInView(false);
                setIllustrationShouldSlide(true);
              }
            }
            if (entry.target === cardsNode) {
              if (entry.isIntersecting) {
                if (isUp) {
                  setCardsShouldSlide(false);
                  setCardsInView(true);
                } else {
                  setCardsShouldSlide(true);
                  setCardsInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setCardsInView(false);
                setCardsShouldSlide(true);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      if (illusNode) observer.observe(illusNode);
      if (cardsNode) observer.observe(cardsNode);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t);
      if (observer) {
        if (illusNode) observer.unobserve(illusNode);
        if (cardsNode) observer.unobserve(cardsNode);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [refreshKey]);

  const handleNavigateSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth',
      });
    } else if (typeof setActiveTab === 'function') {
      setActiveTab(sectionId);
    }
  };

  const getCardNavigationProps = (sectionId) => ({
    role: 'button',
    tabIndex: 0,
    onClick: () => handleNavigateSection(sectionId),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavigateSection(sectionId);
      }
    },
  });

  const handleExploreProjects = () => handleNavigateSection('projects');

  const bioText =
    "I'm an MCA postgraduate and aspiring Python Full-Stack Developer seeking to start my career in software development. I have developed four academic and personal projects, gaining practical knowledge of application development and problem-solving. I have a strong foundation in Python, Django, Django REST Framework, React.js, JavaScript, and SQL, and I am eager to learn, grow, and build reliable, user-friendly applications.";

  return (
    <section
      {...(isStandalonePage ? { id: 'about' } : {})}
      className={`w-full font-['Plus_Jakarta_Sans',sans-serif] ${isStandalonePage
        ? 'py-8 sm:py-12 lg:py-16 min-h-[calc(100vh-70px)] bg-white'
        : ''
        }`}
    >
      <div className={isStandalonePage ? 'max-w-7xl mx-auto px-4 sm:px-8' : 'w-full'}>
        {/* ─── TWO-COLUMN MAIN CONTENT (100% MATCH TO USER'S REFERENCE IMAGE) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Journey Narrative & 3 Core Pillar Cards */}
          <div className="lg:col-span-7 space-y-2 xs:space-y-2.5 sm:space-y-4 lg:space-y-5">

            {/* Header Block & Narrative: Right-floated illustration on mobile allows bio content to start immediately below 'my journey' without any empty gap space */}
            <div className="animate-heading-fade-slide-up">
              {/* Mobile Only: Top-Right Developer Illustration (Floated Right on Mobile, slowly coming from right side on scroll/refresh) */}
              <div
                ref={illustrationRef}
                className={`lg:hidden float-right ml-3 xs:ml-3.5 mb-2 mt-1 xs:mt-1.5 lg:mt-0 w-[155px] xs:w-[175px] sm:w-[200px] select-none ${
                  isInView
                    ? illustrationShouldSlide
                      ? 'animate-mobile-about-slide'
                      : 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                }`}
              >
                <img
                  src={assetUrl('about-illustration.png')}
                  alt="Developer Working Illustration"
                  className="w-full h-auto object-contain select-none drop-shadow-sm pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Sub-header / Category Tag: ABOUT ME — */}
              <div className="flex items-center gap-2.5 mb-2.5 xs:mb-3 sm:mb-3 lg:mb-2">
                <span className="text-[13px] xs:text-[13.5px] sm:text-[13px] font-black tracking-wider text-[#1E6BFF] uppercase">
                  ABOUT ME
                </span>
                <span className="w-8 sm:w-10 h-[2.5px] bg-[#1E6BFF] rounded-full inline-block"></span>
              </div>

              {/* Main Headline */}
              {isStandalonePage ? (
                <h1 className="text-[25px] xs:text-[27px] sm:text-3xl lg:text-[35px] font-black text-slate-800 tracking-tight leading-[1.15] mb-2 sm:mb-3">
                  A little about <span className="block lg:inline text-[#1E6BFF]">my journey</span>
                </h1>
              ) : (
                <h2 className="text-[25px] xs:text-[27px] sm:text-3xl lg:text-[35px] font-black text-slate-800 tracking-tight leading-[1.15] mb-2 sm:mb-3">
                  A little about <span className="block lg:inline text-[#1E6BFF]">my journey</span>
                </h2>
              )}

              {/* Paragraph Bio: Starts immediately under 'my journey', wraps around the floated right-side image, and continues */}
              <p className="text-[14px] xs:text-[14.5px] sm:text-[15px] text-slate-600 leading-relaxed font-normal text-justify lg:text-left">
                {bioText}
              </p>

              {/* Clearfix for float */}
              <div className="clear-both"></div>
            </div>

            {/* 3 Pillar Cards in a Horizontal Row with Staggered Entrance Animations (Optimized for Mobile, Center Aligned, Custom Badges & Bottom Accents) */}
            <div
              ref={cardsRef}
              className="grid grid-cols-3 gap-2 xs:gap-2.5 sm:gap-4 pt-2 xs:pt-2.5 sm:pt-0.5 lg:pt-2 overflow-hidden lg:overflow-visible"
            >

              {/* Card 1: My Education (Left side slowly coming into position on mobile) */}
              <div
                {...getCardNavigationProps('education')}
                style={{ animationDelay: '0.1s' }}
                className={`bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 border-b-[3.5px] border-b-[#0062FF] lg:border-b-slate-200/90 px-2.5 xs:px-3 pt-2.5 xs:pt-3 pb-2 xs:pb-2.5 sm:p-5 shadow-xs hover:shadow-md hover:border-blue-300 card-hover-lift lg:animate-card-slide-fade transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left justify-between h-full cursor-pointer ${
                  cardsInView
                    ? cardsShouldSlide
                      ? 'animate-mobile-pillar-left'
                      : 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-8 lg:opacity-100 lg:translate-x-0'
                }`}
              >
                <div className="w-full flex flex-col items-center lg:items-start">
                  <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-11 sm:h-11 rounded-full bg-blue-100/70 text-[#0062FF] lg:bg-blue-50 lg:text-[#1E6BFF] flex items-center justify-center text-sm xs:text-base sm:text-lg mb-1.5 xs:mb-2 sm:mb-3 shadow-2xs flex-shrink-0">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-[12px] xs:text-[13px] sm:text-[15px] leading-tight w-full text-center lg:text-left">
                    My Education
                  </h3>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug w-full text-center lg:text-left">
                    Master of Computer Applications (MCA)
                  </p>
                </div>
              </div>

              {/* Card 2: What I'm Learning (Middle slowly coming up from down below on mobile) */}
              <div
                {...getCardNavigationProps('skills')}
                style={{ animationDelay: '0.25s' }}
                className={`bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 border-b-[3.5px] border-b-[#7C3AED] lg:border-b-slate-200/90 px-2.5 xs:px-3 pt-2.5 xs:pt-3 pb-2 xs:pb-2.5 sm:p-5 shadow-xs hover:shadow-md hover:border-purple-300 card-hover-lift lg:animate-card-slide-fade transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left justify-between h-full cursor-pointer ${
                  cardsInView
                    ? cardsShouldSlide
                      ? 'animate-mobile-pillar-down'
                      : 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 lg:opacity-100 lg:translate-y-0'
                }`}
              >
                <div className="w-full flex flex-col items-center lg:items-start">
                  <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-11 sm:h-11 rounded-full bg-purple-100/70 text-[#7C3AED] lg:bg-blue-50 lg:text-[#1E6BFF] flex items-center justify-center text-xs xs:text-sm sm:text-base mb-1.5 xs:mb-2 sm:mb-3 shadow-2xs flex-shrink-0">
                    <span className="font-mono font-black text-[11px] xs:text-xs sm:text-sm">&lt;/&gt;</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-[12px] xs:text-[13px] sm:text-[15px] leading-tight w-full text-center lg:text-left">
                    What I&apos;m Learning
                  </h3>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug w-full text-center lg:text-left">
                    Python • Django • React • SQL
                    <br />
                    Web Development
                  </p>
                </div>
              </div>

              {/* Card 3: My Approach (Right side slowly coming into position on mobile) */}
              <div
                {...getCardNavigationProps('contact')}
                style={{ animationDelay: '0.4s' }}
                className={`bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 border-b-[3.5px] border-b-[#06B6D4] lg:border-b-slate-200/90 px-2.5 xs:px-3 pt-2.5 xs:pt-3 pb-2 xs:pb-2.5 sm:p-5 shadow-xs hover:shadow-md hover:border-cyan-300 card-hover-lift lg:animate-card-slide-fade transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left justify-between h-full cursor-pointer ${
                  cardsInView
                    ? cardsShouldSlide
                      ? 'animate-mobile-pillar-right'
                      : 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8 lg:opacity-100 lg:translate-x-0'
                }`}
              >
                <div className="w-full flex flex-col items-center lg:items-start">
                  <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-11 sm:h-11 rounded-full bg-cyan-100/70 text-[#06B6D4] lg:bg-blue-50 lg:text-[#1E6BFF] flex items-center justify-center text-xs xs:text-sm sm:text-base mb-1.5 xs:mb-2 sm:mb-3 shadow-2xs flex-shrink-0">
                    <i className="fa-solid fa-bullseye"></i>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-[12px] xs:text-[13px] sm:text-[15px] leading-tight w-full text-center lg:text-left">
                    My Approach
                  </h3>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug w-full text-center lg:text-left">
                    Learn by building,
                    <br />
                    improve through feedback.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom CTA Action Link / Button: Mobile shows styled pill button matching reference image; Desktop preserves original link style 100% */}
            <div className="flex justify-center pt-2 xs:pt-2.5 sm:pt-2 lg:justify-start lg:pt-2">
              <button
                type="button"
                onClick={handleExploreProjects}
                className="w-full max-w-[270px] xs:max-w-[290px] lg:w-auto inline-flex items-center justify-center gap-2.5 px-6 xs:px-7 py-2.5 xs:py-3 lg:p-0 rounded-full lg:rounded-none bg-gradient-to-r from-[#0052FF] to-[#0066FF] lg:bg-none text-white lg:text-[#1E6BFF] font-extrabold text-[13.5px] xs:text-[14px] sm:text-[14.5px] shadow-md shadow-blue-500/25 lg:shadow-none hover:shadow-lg lg:hover:shadow-none hover:opacity-95 lg:hover:text-blue-700 transition-all cursor-pointer group select-none"
              >
                <i className="fa-solid fa-rocket text-white text-xs xs:text-sm lg:hidden group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"></i>
                <span>Explore my projects</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5 font-black text-base text-white lg:text-[#1E6BFF]">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Full Clarity Original Illustration (100% Match to 2nd Image on Desktop, Hidden on Mobile since moved up) */}
          <div
            style={{ animationDelay: '0.3s' }}
            className="hidden lg:flex lg:col-span-5 items-center justify-center relative select-none animate-card-slide-fade pt-4 lg:pt-0"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] flex items-center justify-center">
              <img
                src={assetUrl('about-illustration.png')}
                alt="Developer Working Illustration - Better Code Better Tomorrow"
                className="w-full h-auto max-h-[300px] sm:max-h-[360px] lg:max-h-[440px] object-contain drop-shadow-xs transition-transform duration-300 hover:scale-[1.02] select-none"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
