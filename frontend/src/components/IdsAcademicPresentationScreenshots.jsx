import React, { useState, useEffect } from 'react';

const IDS_ACADEMIC_SLIDES = [
  {
    id: 'ids-home-portal',
    title: 'Intrusion Detection System Portal',
    subtitle: 'Machine Learning Techniques Applied for Detection of Cyber Attacks.',
    desc: 'Primary cybersecurity landing platform built with Python & Django. Features real-time threat monitoring navigation, live security alerts, and centralized role access for system administrators and security analysts.',
    image: '/ids-gallery/01_ids_home_page.png',
    icon: 'fa-solid fa-shield-halved',
    tag: 'Core System Interface',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 'ids-prediction-form',
    title: 'Network Packet Feature Input Form',
    subtitle: 'Interactive traffic packet ingestion with 14 selected features.',
    desc: 'Dynamic input interface allowing security analysts to enter critical network connection parameters—including destination host count, service error rates, port rates, and protocol flags isolated via RFE & VIF—for real-time ML evaluation.',
    image: '/ids-gallery/12_ids_intrusion_prediction_form.png',
    icon: 'fa-solid fa-network-wired',
    tag: 'Feature Ingestion & Analysis',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    id: 'ids-classification-output',
    title: 'Real-Time Threat Classification Output',
    subtitle: 'Instant categorization into DoS, Probe, R2L, U2R, or Normal.',
    desc: 'Live detection engine outputs immediate multi-class traffic categorization. Successfully detects malicious behavior (such as PROBE or DOS attacks), logs event telemetry, and triggers defensive safeguards.',
    image: '/ids-gallery/18_ids_predicted_result_probe_attack.png',
    icon: 'fa-solid fa-triangle-exclamation',
    tag: 'Real-Time Threat Detection',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
  },
  {
    id: 'ids-accuracy-benchmark',
    title: 'Multi-Algorithm Accuracy Evaluation',
    subtitle: 'Empirical benchmark across Random Forest, Decision Tree & Ensembles.',
    desc: 'Comprehensive accuracy evaluation dashboard confirming 98.60% accuracy for Random Forest, 98.00% for Decision Tree, 99.00% for XGBoost, and 99.00% for Extra Trees, leading to Random Forest deployment in production.',
    image: '/ids-gallery/14_ids_model_accuracy_multi_algorithm.png',
    icon: 'fa-solid fa-chart-column',
    tag: 'Model Performance Benchmark',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    id: 'ids-admin-oversight',
    title: 'Role-Based Administrator Dashboard',
    subtitle: 'Centralized oversight of registered users and audit records.',
    desc: 'Restricted administrative gateway governing registered analyst profiles, session authorization, real-time threat logs, and database records with encrypted authentication protocols.',
    image: '/ids-gallery/16_ids_admin_view_users_list.png',
    icon: 'fa-solid fa-user-shield',
    tag: 'Administrative Oversight',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    id: 'ids-user-auth',
    title: 'Secured User Authentication & Session Control',
    subtitle: 'Multi-layer access controls for authorized network analysts.',
    desc: 'Robust credential validation system featuring CSRF protection, secure password hashing, session tokens, and protected routes to ensure sensitive network metrics remain guarded.',
    image: '/ids-gallery/02_ids_user_login.png',
    icon: 'fa-solid fa-lock',
    tag: 'Security & Access Control',
    badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  },
];

export default function IdsAcademicPresentationScreenshots() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 4 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % IDS_ACADEMIC_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + IDS_ACADEMIC_SLIDES.length) % IDS_ACADEMIC_SLIDES.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % IDS_ACADEMIC_SLIDES.length);
  };

  const currentSlide = IDS_ACADEMIC_SLIDES[slideIndex];

  return (
    <section className="space-y-4">
      {/* ─── SECTION HEADER ─── */}
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Academic Project Presentation Screenshots
        </h3>
      </div>

      {/* ─── INTERACTIVE CAROUSEL (LEFT IMAGE + RIGHT CONTENT) ─── */}
      <div
        className="grid grid-cols-12 lg:grid-cols-12 gap-2 xs:gap-2.5 sm:gap-6 items-stretch"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ─── LEFT COLUMN: SCREENSHOT VIEWER WITH SMOOTH HORIZONTAL SLIDER ─── */}
        <div className="col-span-7 xl:col-span-8 flex flex-col justify-between space-y-1.5 xs:space-y-2 sm:space-y-3">
          <div
            onClick={handleNext}
            className="w-full h-[160px] xs:h-[185px] sm:h-[340px] md:h-[400px] lg:h-[430px] rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-slate-200/90 overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400 group relative bg-slate-900"
          >
            {/* Sliding Track */}
            <div
              className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {IDS_ACADEMIC_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="w-full shrink-0 h-full overflow-hidden bg-slate-900 flex items-center justify-center relative"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain object-center select-none block"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    style={{ imageRendering: 'high-quality' }}
                  />
                </div>
              ))}
            </div>

            {/* Slide Index Badge (e.g. 01 / 06) */}
            <div className="absolute top-1.5 right-1.5 sm:top-3.5 sm:right-3.5 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[7px] xs:text-[8px] sm:text-[11px] font-black tracking-wider uppercase bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-md">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                {String(slideIndex + 1).padStart(2, '0')} / {String(IDS_ACADEMIC_SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Left Nav Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg z-20 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-[9px] sm:text-sm"></i>
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg z-20 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-right text-[9px] sm:text-sm"></i>
            </button>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 pt-0.5 sm:pt-1">
            {IDS_ACADEMIC_SLIDES.map((slide, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setSlideIndex(dotIdx)}
                className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  dotIdx === slideIndex
                    ? 'w-4 xs:w-5 sm:w-8 bg-[#0062FF] shadow-xs sm:shadow-sm'
                    : 'w-1.5 sm:w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                title={slide.title}
                aria-label={`Go to slide ${dotIdx + 1}: ${slide.title}`}
              />
            ))}
          </div>
        </div>

        {/* ─── RIGHT COLUMN: PRESENTATION SLIDE DETAILS ─── */}
        <div className="col-span-5 xl:col-span-4 h-[160px] xs:h-[185px] sm:h-[340px] md:h-[400px] lg:h-[430px] self-start flex flex-col justify-center bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs sm:shadow-sm p-2 xs:p-2.5 sm:p-7 space-y-1 xs:space-y-1.5 sm:space-y-4 overflow-hidden">
          <div key={`title-${slideIndex}`} className="space-y-1 xs:space-y-1.5 sm:space-y-2.5 animate-academic-slide">
            {/* Tag Badge */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[7px] xs:text-[8px] sm:text-[11px] font-bold border ${currentSlide.badgeColor}`}>
                <i className={`${currentSlide.icon} text-[6.5px] xs:text-[7.5px] sm:text-[10px]`}></i>
                {currentSlide.tag}
              </span>
            </div>

            {/* Slide Title */}
            <h4 className="text-[8.5px] xs:text-[10px] sm:text-xl font-black text-slate-900 tracking-tight leading-tight sm:leading-snug">
              {currentSlide.title}
            </h4>

            {/* Subtitle */}
            <p className="text-[6px] xs:text-[7px] sm:text-[13px] text-slate-500 font-medium leading-tight sm:leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Detailed Narrative */}
          <p
            key={`desc-${slideIndex}`}
            className="text-[5.5px] xs:text-[6.5px] sm:text-[13px] text-slate-600 font-normal leading-tight sm:leading-relaxed pt-1 sm:pt-3 border-t border-slate-100 animate-academic-slide"
          >
            {currentSlide.desc}
          </p>

          {/* Quick Info Points */}
          <div className="pt-1 sm:pt-2 flex flex-wrap gap-1 sm:gap-2 text-[6px] xs:text-[7px] sm:text-[11px] text-slate-500 font-medium">
            <span className="inline-flex items-center gap-0.5 sm:gap-1 bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg">
              <i className="fa-solid fa-check text-blue-600 text-[6px] sm:text-[10px]"></i> Academic Presentation
            </span>
            <span className="inline-flex items-center gap-0.5 sm:gap-1 bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg">
              <i className="fa-solid fa-desktop text-purple-600 text-[6px] sm:text-[10px]"></i> Live Django UI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
