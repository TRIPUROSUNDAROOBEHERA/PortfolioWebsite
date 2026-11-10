import React, { useState, useEffect, useRef } from 'react';
import educationApi from '../../api/educationApi';
import { assetUrl } from '../../utils/assetUrl';

export default function EducationSection({ isStandalonePage = false, refreshKey = 0, refreshingSection = null }) {
  const defaultItems = [
    {
      id: 1,
      degree: 'MCA (Post Graduate)',
      institution: 'Sree Venkateswara College of Engineering, Nellore',
      university: 'Jawaharlal Nehru Technological University Anantapur (JNTUA)',
      status: 'Completed',
      isOngoing: false,
      duration: '2024 – 2026',
      score_display: 'CGPA: 8.47 / 10.0',
      icon: 'graduation-cap',
      focus: 'Advanced Software Engineering, Cloud Computing, Full-Stack Architecture',
    },
    {
      id: 2,
      degree: 'B.Sc. Science - MPE',
      institution: 'Government Degree College for Men, Srikakulam',
      university: 'Dr. B.R. Ambedkar University, Srikakulam (BRAU)',
      status: 'Completed',
      isOngoing: false,
      duration: '2018 – 2021',
      score_display: 'Percentage: 70.80%',
      icon: 'flask',
      focus: 'Computer Science, Mathematics, Analytical Programming & Algorithms',
    },
    {
      id: 3,
      degree: 'Intermediate (12th) - MPC',
      institution: 'Gayatri Junior College, Srikakulam',
      university: 'Board of Intermediate Education, Andhra Pradesh (BIEAP)',
      status: 'Completed',
      isOngoing: false,
      duration: '2016 – 2017',
      score_display: 'Percentage: 74.40%',
      icon: 'book',
      focus: 'Science Stream (MPC), Analytical Mathematics & Physics Principles',
    },
    {
      id: 4,
      degree: '10th (Secondary School)',
      institution: 'Z.P. High School',
      university: 'Board of Secondary Education, Andhra Pradesh (BSEAP)',
      status: 'Completed',
      isOngoing: false,
      duration: '2015',
      score_display: 'Percentage: 60.00%',
      icon: 'school',
      focus: 'Secondary Academic Foundation, Mathematics & General Sciences',
    },
  ];

  const [educationList, setEducationList] = useState(defaultItems);
  // activeIndex starts as null so no card is identified with active color on initial scroll/load
  const [activeIndex, setActiveIndex] = useState(null);

  // ─── SCROLL-TRIGGERED ONE-BY-ONE ENTRANCE CONTROLLER ───
  // Condition 1: Top to Down scroll triggers smooth one-by-one staggered entrance of content & cards
  // Condition 2: Down to Top scroll remains rock-solid and stable
  // Condition 3: Reset when scrolled completely above, so scrolling down again replays entrance
  // Condition 4: Replays on refreshKey update (Navbar or section refresh)
  const [educationAnimationActive, setEducationAnimationActive] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom')) return true;
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') return true;
    return isStandalonePage;
  });

  const educationLastScrollYRef = useRef(0);
  const educationHasAnimatedDownRef = useRef(false);
  const sectionRef = useRef(null);

  // Replay animation on explicit refresh
  useEffect(() => {
    if (refreshKey > 0) {
      educationHasAnimatedDownRef.current = false;
      setEducationAnimationActive(false);
      const t = setTimeout(() => {
        educationHasAnimatedDownRef.current = true;
        setEducationAnimationActive(true);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [refreshKey]);

  useEffect(() => {
    if (isStandalonePage) {
      setEducationAnimationActive(true);
      return;
    }

    const checkEducationVisibility = () => {
      if (typeof window === 'undefined') return;

      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const isScrollingDown = currentScrollY >= educationLastScrollYRef.current;
      educationLastScrollYRef.current = currentScrollY;

      const el = sectionRef.current || document.getElementById('education');
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // In JSDOM / test runner where rect dimensions are all 0
      if (rect.top === 0 && rect.bottom === 0) {
        setEducationAnimationActive(true);
        return;
      }

      // Check if Education section is entering/inside the viewport
      const inView = rect.top < viewportHeight * 0.85 && rect.bottom > 60;
      // Completely above viewport: user is at Home, About, or Skills
      const completelyBelow = rect.top >= viewportHeight;

      if (inView) {
        // 1) Top to Down scroll triggers one-by-one staggered entrance
        if (isScrollingDown && !educationHasAnimatedDownRef.current) {
          educationHasAnimatedDownRef.current = true;
          setEducationAnimationActive(true);
        } else if (!educationHasAnimatedDownRef.current && currentScrollY < 120 && rect.top < viewportHeight) {
          // In case user refreshed while already at Education section
          educationHasAnimatedDownRef.current = true;
          setEducationAnimationActive(true);
        }
      } else if (completelyBelow) {
        // User scrolled all the way back up above Education: reset so scrolling down triggers again
        educationHasAnimatedDownRef.current = false;
        setEducationAnimationActive(false);
      }
    };

    window.addEventListener('scroll', checkEducationVisibility, { passive: true });
    window.addEventListener('touchmove', checkEducationVisibility, { passive: true });
    document.addEventListener('scroll', checkEducationVisibility, { capture: true, passive: true });
    window.addEventListener('resize', checkEducationVisibility, { passive: true });

    let observer = null;
    const targetEl = sectionRef.current || document.getElementById('education');
    if (typeof IntersectionObserver !== 'undefined' && targetEl) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              educationHasAnimatedDownRef.current = true;
              setEducationAnimationActive(true);
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(targetEl);
    }

    // Immediate check on mount / tab switch
    checkEducationVisibility();
    const t1 = setTimeout(checkEducationVisibility, 80);
    const t2 = setTimeout(checkEducationVisibility, 250);

    return () => {
      window.removeEventListener('scroll', checkEducationVisibility);
      window.removeEventListener('touchmove', checkEducationVisibility);
      document.removeEventListener('scroll', checkEducationVisibility, { capture: true });
      window.removeEventListener('resize', checkEducationVisibility);
      if (observer) observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [refreshKey, isStandalonePage]);

  useEffect(() => {
    let isMounted = true;
    educationApi
      .getAll()
      .then((res) => {
        const data = res?.data?.results || res?.results || res?.data || res;
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setEducationList(
            data.map((item, idx) => {
              const fallback = defaultItems[idx] || {};
              const isMCA = idx === 0 || (item.degree && item.degree.toLowerCase().includes('mca'));
              const isBSc = idx === 1 || (item.degree && item.degree.toLowerCase().includes('b.sc'));
              const isInter = idx === 2 || (item.degree && (item.degree.toLowerCase().includes('intermediate') || item.degree.toLowerCase().includes('12th')));

              let degreeName = fallback.degree || item.degree || 'Degree Program';
              if (isMCA) {
                degreeName = 'MCA (Post Graduate)';
              } else if (isBSc) {
                degreeName = 'B.Sc. Science - MPE';
              } else if (isInter) {
                degreeName = 'Intermediate (12th) - MPC';
              } else if (item.degree) {
                degreeName = item.degree;
              }

              let duration = item.duration;
              if (!duration && item.start_year && item.end_year) {
                duration = item.start_year === item.end_year
                  ? `${item.start_year}`
                  : `${item.start_year} – ${item.end_year}`;
              }
              if (!duration) duration = fallback.duration || '-';
              if (typeof duration === 'string') {
                duration = duration.replace(' - ', ' – ').replace('â€“', '–');
              }

              const isOldPlaceholder = !item.institution || [
                'department of computer science',
                'science college',
                'board of intermediate education',
                'board of secondary education'
              ].includes(item.institution.toLowerCase().trim());

              const institutionName = isOldPlaceholder ? fallback.institution : item.institution;
              const universityName = (idx === 2 || (institutionName && institutionName.toLowerCase().includes('gayatri')))
                ? 'Board of Intermediate Education, Andhra Pradesh (BIEAP)'
                : (fallback.university || item.university || '');
              const scoreDisplay = (isMCA && (!item.score_display || item.score_display.includes('8.7')))
                ? 'CGPA: 8.47 / 10.0'
                : (item.score_display || fallback.score_display || '');

              return {
                id: item.id || idx + 1,
                degree: degreeName,
                institution: institutionName,
                university: universityName,
                status: 'Completed',
                isOngoing: false,
                duration: duration,
                score_display: scoreDisplay,
                icon: item.icon || fallback.icon || 'graduation-cap',
                focus: fallback.focus || '',
              };
            })
          );
        }
      })
      .catch(() => {
        // Retain default items matching reference
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  // ─── MOBILE ONLY: HEADER ILLUSTRATION SMOOTH ENTRANCE ON SCROLL / REFRESH ───
  const [educationIllustrationInView, setEducationIllustrationInView] = useState(false);
  const [educationShouldSlide, setEducationShouldSlide] = useState(true);
  const educationIllustrationRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const scrollDirection = useRef('down');

  useEffect(() => {
    const illusNode = educationIllustrationRef.current;

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
          // If scrolling UP from bottom to top: DO NOT slide! Settle immediately without slide animation.
          if (isUp) {
            setEducationShouldSlide(false);
            setEducationIllustrationInView(true);
          } else {
            // Scrolling down or initial load / refresh: slide smoothly into position
            setEducationShouldSlide(true);
            setEducationIllustrationInView(true);
          }
        } else if (r1.top > window.innerHeight + 60) {
          // Only reset when element goes BELOW the viewport (user scrolled back up to the top)
          setEducationIllustrationInView(false);
          setEducationShouldSlide(true);
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
                  setEducationShouldSlide(false);
                  setEducationIllustrationInView(true);
                } else {
                  setEducationShouldSlide(true);
                  setEducationIllustrationInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setEducationIllustrationInView(false);
                setEducationShouldSlide(true);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      if (illusNode) observer.observe(illusNode);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t);
      if (observer && illusNode) {
        observer.unobserve(illusNode);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [refreshKey]);

  return (
    <section
      ref={sectionRef}
      {...(isStandalonePage ? { id: 'education' } : {})}
      className={`w-full font-['Plus_Jakarta_Sans',sans-serif] ${isStandalonePage
        ? 'py-8 sm:py-12 lg:py-16 min-h-[calc(100vh-70px)] bg-white'
        : ''
        }`}
    >
      <div className={isStandalonePage ? 'max-w-7xl mx-auto px-4 sm:px-8' : 'w-full'}>

        {/* ─── POINT 1: HEADING (ALWAYS VISIBLE WITH FULL CLARITY) ─── */}
        <div className="mb-2.5 sm:mb-3.5 lg:mb-4 animate-heading-fade-slide-up">
          {/* Mobile Only: Top-Right Academic Journey Illustration (< lg) - Transparent 3D illustration without round color blob */}
          <div
            ref={educationIllustrationRef}
            className={`lg:hidden float-right ml-2.5 -mb-2 w-[145px] xs:w-[160px] sm:w-[175px] md:w-[190px] select-none ${
              educationIllustrationInView
                ? educationShouldSlide
                  ? 'animate-mobile-about-slide'
                  : 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <img
              src={assetUrl('education-header-illustration.png')}
              alt="Academic Journey 3D Illustration"
              className="w-full h-auto object-contain drop-shadow-sm pointer-events-none"
              loading="eager"
            />
          </div>

          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-1.5 xs:mb-2 lg:mb-2.5">
            <span className="text-[12px] xs:text-[12.5px] sm:text-[13px] font-black tracking-wider text-[#1E6BFF] uppercase">
              EDUCATION
            </span>
            <span className="w-8 sm:w-10 h-[2.5px] bg-[#1E6BFF] rounded-full inline-block"></span>
          </div>

          {/* Main Headline */}
          <h2 className="text-[22px] xs:text-[24px] sm:text-3xl lg:text-[35px] font-black text-slate-900 tracking-tight leading-[1.15]">
            <span className="block lg:inline">My Academic </span>
            <span className="text-[#1E6BFF] block lg:inline">Journey</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[11.5px] xs:text-[12px] sm:text-[14px] lg:text-[15px] text-slate-500 font-normal max-w-2xl mt-1 lg:mt-1.5 leading-relaxed text-justify xs:text-left">
            A strong academic foundation has helped me build the skills and confidence to pursue my goals in technology.
          </p>

          <div className="clear-both"></div>
        </div>

        {/* ─── TWO-COLUMN ACADEMIC LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

          {/* LEFT COLUMN: Vertical Timeline (Compact & Fitting 4 Cards on One Screen) */}
          <div className="lg:col-span-7 xl:col-span-8 relative">
            {/* ─── POINT 2: TIMELINE DRAW ANIMATION (TOP TO BOTTOM FLOW) ─── */}
            <div className={`absolute left-[14px] xs:left-[15px] sm:left-[24px] top-4 bottom-4 w-[2px] sm:w-[3px] bg-blue-100/90 -translate-x-1/2 z-0 block overflow-hidden rounded-full transition-opacity duration-500 ${
              educationAnimationActive ? 'animate-edu-line-draw opacity-100' : 'opacity-0 scale-y-0'
            }`}>
              <div className="animate-timeline-beam-up rounded-full pointer-events-none"></div>
            </div>

            <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 lg:space-y-3.5 relative z-10">
              {educationList.map((edu, idx) => {
                const isActive = activeIndex === idx;
                const nodeDelays = ['0.06s', '0.22s', '0.38s', '0.54s'];
                const cardDelays = ['0.1s', '0.26s', '0.42s', '0.58s'];
                const textDelays = ['0.14s', '0.3s', '0.46s', '0.62s'];
                const badgeDelays = ['0.18s', '0.34s', '0.5s', '0.66s'];

                const nodeDelay = nodeDelays[idx] || `${(idx * 0.16 + 0.06).toFixed(2)}s`;
                const cardDelay = cardDelays[idx] || `${(idx * 0.16 + 0.10).toFixed(2)}s`;
                const textDelay = textDelays[idx] || `${(idx * 0.16 + 0.14).toFixed(2)}s`;
                const badgeDelay = badgeDelays[idx] || `${(idx * 0.16 + 0.18).toFixed(2)}s`;

                return (
                  <div
                    key={edu.id || idx}
                    onClick={() => setActiveIndex(idx)}
                    className="flex items-center gap-2 xs:gap-2.5 sm:gap-6 group cursor-pointer"
                  >

                    {/* ─── POINT 4: ICON POP & SCALE ANIMATION (ONE-BY-ONE ON SCROLL; SLIGHTLY DECREASED ON MOBILE) ─── */}
                    <div className="relative flex-shrink-0">
                      {/* Outer pulse wave */}
                      <span
                        className={`absolute -inset-0.5 sm:-inset-1 rounded-full bg-[#1E6BFF]/30 pointer-events-none ${
                          isActive ? 'animate-ping' : ''
                        }`}
                      ></span>

                      <div
                        className={`w-[26px] h-[26px] xs:w-[28px] xs:h-[28px] sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center text-[10px] xs:text-[11px] sm:text-[17px] z-10 transition-all duration-300 ring-[2px] sm:ring-4 ring-white bg-[#1E6BFF] shadow-2xs sm:shadow-md shadow-blue-500/25 group-hover:scale-110 group-hover:shadow-blue-500/40 relative ${
                          educationAnimationActive
                            ? 'animate-edu-node-pop animate-icon-scale opacity-100'
                            : 'opacity-0 scale-50'
                        } ${isActive ? 'scale-105 sm:scale-110 ring-blue-300 shadow-blue-500/50' : ''}`}
                        style={
                          educationAnimationActive
                            ? { animationDelay: nodeDelay }
                            : undefined
                        }
                      >
                        <i className="fa-solid fa-graduation-cap transition-transform duration-300 group-hover:-rotate-12"></i>
                      </div>
                    </div>

                    {/* ─── POINT 3 & 5: CARD SLIDE IN + FADE (ZERO-VIBRATION STABLE HOVER) ─── */}
                    <div
                      style={
                        educationAnimationActive
                          ? { animationDelay: cardDelay }
                          : undefined
                      }
                      className={`flex-1 rounded-xl xs:rounded-2xl p-2.5 xs:p-3 sm:p-4 lg:p-4.5 edu-card-hover animate-card-slide-fade flex flex-col justify-between gap-1.5 sm:gap-2 relative overflow-hidden transition-all duration-200 edu-text-clarity ${
                        educationAnimationActive
                          ? 'animate-edu-card-in opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-6 pointer-events-none'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50/70 via-white to-white border border-[#60A5FA] sm:border-2 sm:border-[#1E6BFF] shadow-xs sm:shadow-md shadow-blue-500/10'
                          : 'bg-white border border-slate-200/90 shadow-2xs hover:border-[#1E6BFF] hover:shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-x-4 sm:gap-y-1">
                        {/* 1. Title + Score Badge (Row 1 Col 1 on desktop; Top row on mobile) */}
                        <div
                          style={
                            educationAnimationActive
                              ? { animationDelay: textDelay }
                              : undefined
                          }
                          className={`order-1 sm:order-none sm:col-start-1 sm:row-start-1 flex items-center flex-nowrap sm:flex-wrap gap-1.5 xs:gap-2 sm:gap-2.5 min-w-0 edu-text-clarity ${
                            educationAnimationActive ? 'animate-edu-text-in' : ''
                          }`}
                        >
                          <h3
                            className={`font-extrabold text-[11.5px] xs:text-[12.5px] sm:text-[16.5px] lg:text-[17.5px] tracking-tight leading-snug transition-colors shrink-0 ${
                              isActive ? 'text-[#1E6BFF]' : 'text-slate-900 group-hover:text-[#1E6BFF]'
                            }`}
                          >
                            {edu.degree}
                          </h3>

                          {edu.score_display && (
                            <span className="inline-flex items-center gap-1 xs:gap-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-lg text-[9px] xs:text-[9.5px] sm:text-[12px] lg:text-[12.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs shrink-0 whitespace-nowrap">
                              <i className="fa-solid fa-award text-[8px] xs:text-[8.5px] sm:text-[10.5px] text-emerald-600"></i>
                              <span>{edu.score_display}</span>
                            </span>
                          )}
                        </div>

                        {/* 2. Institution & University (Row 2 on desktop; Middle on mobile) */}
                        <div className="order-2 sm:order-none sm:col-span-2 space-y-0.5 pt-0.5">
                          <p className="text-[11px] xs:text-[11.5px] sm:text-[13.5px] lg:text-[14px] text-slate-800 font-bold leading-tight break-words">
                            {edu.institution}
                          </p>
                          {edu.university && (
                            <p className="text-[9.5px] xs:text-[10px] sm:text-[12px] lg:text-[12.5px] text-slate-500 font-medium leading-tight break-words">
                              {edu.university}
                            </p>
                          )}
                        </div>

                        {/* 3. Duration & Completed: Bottom row on mobile (left corner duration, right corner completed); Top-right Col 2 on desktop */}
                        <div
                          style={
                            educationAnimationActive
                              ? { animationDelay: badgeDelay }
                              : undefined
                          }
                          className={`order-3 sm:order-none sm:col-start-2 sm:row-start-1 flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 flex-shrink-0 edu-text-clarity pt-1.5 sm:pt-0 border-t border-slate-100/90 sm:border-t-0 ${
                            educationAnimationActive ? 'animate-edu-badge-in' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1 text-[10px] xs:text-[10.5px] sm:text-[13px] lg:text-[13.5px] text-slate-600 font-bold whitespace-nowrap">
                            <i className="fa-regular fa-calendar text-[9px] xs:text-[9.5px] text-slate-400 sm:hidden"></i>
                            <span>{edu.duration !== '-' ? edu.duration : '—'}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9.5px] xs:text-[10px] sm:text-[12px] lg:text-[12.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 sm:text-[#1E6BFF] sm:bg-blue-50 sm:border-blue-200/70 shadow-2xs whitespace-nowrap">
                            <i className="fa-solid fa-circle-check text-[8px] xs:text-[8.5px] text-emerald-600 sm:hidden"></i>
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── POINT 6: ILLUSTRATION FLOAT (DESKTOP ONLY; ON MOBILE FEATURED IN HEADER) ─── */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-center select-none pt-4 lg:pt-0">
            <div
              className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] rounded-3xl overflow-hidden border border-blue-100 shadow-xl shadow-blue-500/10 bg-gradient-to-b from-blue-50/60 to-white p-3 sm:p-4 animate-illustration-float transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 flex items-center justify-center select-none"
              title="Academic Journey - MCA, B.Sc., 12th, 10th"
            >
              <img
                src={assetUrl('education-illustration-3d.png')}
                alt="Academic Journey 3D Illustration - MCA, B.Sc., 12th, 10th"
                className="w-full h-auto object-contain rounded-2xl pointer-events-none select-none transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
