import React, { useState, useEffect, useRef } from 'react';

/**
 * EnglishMasterGallery
 * 
 * 100% High-Clarity Serial-Wise Application Screenshots Showcase for English Master Pro:
 * - 26 Sequential High-Definition Mobile Screens (Serial #01 to #26)
 * - 100% Uncompressed Clarity with object-contain (Zero Cropping / Zero Blur)
 * - Toggleable Views:
 *    1. "All 26 Screens Grid" (displays all screens at once in 100% clarity)
 *    2. "Interactive Device Spotlight" (walkthrough inside phone mockup)
 * - Fullscreen 100% Native Resolution Lightbox Modal with 1x/1.5x zoom and keyboard navigation
 */

const SCREENS = [
  // ─── Real Full-Clarity Flutter Mobile App Screenshots (from ram4) ───
  { id: 1, serial: '01', title: 'Grammar Academy Structural Roadmap', tag: 'Grammar', image: '/english-master-gallery/ram4/grammar_academy_screen.png' },
  { id: 2, serial: '02', title: 'Alphabet & Vowels Interactive Board', tag: 'Phonetics', image: '/english-master-gallery/ram4/alphabet_vowels_screen.png' },
  { id: 3, serial: '03', title: 'Lexicon & Vocabulary Expansion', tag: 'Vocabulary', image: '/english-master-gallery/ram4/lexicon_vocabulary_screen.png' },
  { id: 4, serial: '04', title: 'Speaking Lab & Audio Analysis', tag: 'Speaking', image: '/english-master-gallery/ram4/speaking_lab_screen.png' },
  { id: 5, serial: '05', title: 'Writing Center & Composition Fluency', tag: 'Writing', image: '/english-master-gallery/ram4/writing_center_screen.png' },
  { id: 6, serial: '06', title: 'Interactive Quiz Board & Tests', tag: 'Quiz Engine', image: '/english-master-gallery/ram4/quiz_board_screen.png' },

  // ─── Complete Learning Flow & System Flow Screens ───
  { id: 7, serial: '07', title: 'Proficiency Assessment & Placement', tag: 'Assessment', image: '/english-master-gallery/02_screen.png' },
  { id: 8, serial: '08', title: 'Curriculum Path & Grammar Dashboard', tag: 'Curriculum', image: '/english-master-gallery/03_screen.png' },
  { id: 9, serial: '09', title: 'Tenses & Voice Rule Engine', tag: 'Grammar', image: '/english-master-gallery/04_screen.png' },
  { id: 10, serial: '10', title: 'Interactive Grammar Lesson Detail', tag: 'Lesson Study', image: '/english-master-gallery/05_screen.png' },
  { id: 11, serial: '11', title: 'Contextual Flashcard Practice', tag: 'Flashcards', image: '/english-master-gallery/06_screen.png' },
  { id: 12, serial: '12', title: 'Vocabulary Definitions & Audio TTS', tag: 'Vocabulary', image: '/english-master-gallery/07_screen.png' },
  { id: 13, serial: '13', title: 'Sentence Construction Exercise', tag: 'Practice', image: '/english-master-gallery/08_screen.png' },
  { id: 14, serial: '14', title: 'Interactive Quiz Assessment', tag: 'Quiz Engine', image: '/english-master-gallery/09_screen.png' },
  { id: 15, serial: '15', title: 'Instant Quiz Feedback & Grading', tag: 'Evaluation', image: '/english-master-gallery/10_screen.png' },
  { id: 16, serial: '16', title: 'Mistake Review & Explanations', tag: 'Review Mode', image: '/english-master-gallery/11_screen.png' },
  { id: 17, serial: '17', title: 'Progress Tracking & Streak Analytics', tag: 'Analytics', image: '/english-master-gallery/ram4/progress_analytics_screen.png' },
  { id: 18, serial: '18', title: 'Milestone & Achievement Badges', tag: 'Gamification', image: '/english-master-gallery/ram4/learning_achievements_analytics_screen.png' },
  { id: 19, serial: '19', title: 'Daily Word Builder Challenge', tag: 'Vocabulary', image: '/english-master-gallery/14_screen.png' },
  { id: 20, serial: '20', title: 'Idioms & Practical Phrases', tag: 'Idioms', image: '/english-master-gallery/15_screen.png' },
  { id: 21, serial: '21', title: 'Advanced Conversation Dialogues', tag: 'Dialogue', image: '/english-master-gallery/16_screen.png' },
  { id: 22, serial: '22', title: 'Offline Cached Lesson Reader', tag: 'Offline Mode', image: '/english-master-gallery/17_screen.png' },
  { id: 23, serial: '23', title: 'Firebase Cloud Sync Telemetry', tag: 'Cloud Sync', image: '/english-master-gallery/18_screen.png' },
  { id: 24, serial: '24', title: 'User Profile & Study Goals', tag: 'Profile', image: '/english-master-gallery/19_screen.png' },
  { id: 25, serial: '25', title: 'Dark Mode Learning Theme', tag: 'Theme UI', image: '/english-master-gallery/20_screen.png' },
  { id: 26, serial: '26', title: 'Phonetic Pronunciation Guide', tag: 'Pronunciation', image: '/english-master-gallery/21_screen.png' },
  { id: 27, serial: '27', title: 'Multi-Tier Proficiency Catalog', tag: 'Curriculum', image: '/english-master-gallery/22_screen.png' },
  { id: 28, serial: '28', title: 'Bookmarked Flashcards & Notes', tag: 'Bookmarks', image: '/english-master-gallery/23_screen.png' },
  { id: 29, serial: '29', title: 'Speed Drill & Timer Practice', tag: 'Practice Drill', image: '/english-master-gallery/24_screen.png' },
  { id: 30, serial: '30', title: 'Comprehensive Module Summary', tag: 'Summary', image: '/english-master-gallery/25_screen.png' },
  { id: 31, serial: '31', title: 'Student Certificate & Completion', tag: 'Certification', image: '/english-master-gallery/ram4/certificate_credential_screen.png' },
  { id: 32, serial: '32', title: 'Account Settings & Notifications', tag: 'Settings', image: '/english-master-gallery/27_screen.png' },
];

export default function EnglishMasterGallery() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'spotlight'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const stripRef = useRef(null);

  // Auto-play slideshow when enabled
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SCREENS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keep thumbnail strip scrolled into view in spotlight mode
  useEffect(() => {
    if (stripRef.current) {
      const activeThumb = stripRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % SCREENS.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
        setLightboxZoom(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const activeScreen = SCREENS[currentIndex];

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SCREENS.length);
  };

  const openLightboxAt = (idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
    setLightboxZoom(false);
  };

  return (
    <div className="space-y-5">
      
      {/* ─── 1. SECTION HEADER WITH CONTROLS ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Application Screenshots &amp; Live Mobile UI Flow
          </h3>
        </div>

        {/* View Mode Switcher & Stats */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-grip"></i>
              <span>All {SCREENS.length} Screens</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('spotlight')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'spotlight'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-mobile-screen"></i>
              <span>Device Spotlight</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. VIEW MODE: ALL SCREENS GRID (100% CLARITY) ─── */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          {/* Mobile Screen Cards Grid (Attractive Smartphone Frames) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {SCREENS.map((screen, idx) => (
              <div
                key={screen.id}
                onClick={() => openLightboxAt(idx)}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-xs hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer"
              >
                {/* Card Top: Serial Badge & Tag */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-blue-600 text-white shadow-2xs">
                    #{screen.serial}
                  </span>
                  <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md truncate max-w-[100px]">
                    {screen.tag}
                  </span>
                </div>

                {/* Realistic Attractive Mobile Device Mockup Frame */}
                <div className="relative w-full rounded-[24px] sm:rounded-[26px] p-[4.5px] sm:p-[5px] bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 shadow-md ring-1 ring-black/30 group-hover:ring-blue-400 group-hover:shadow-xl transition-all duration-300">
                  
                  {/* Top Mini Dynamic Island / Camera Pill */}
                  <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-10 sm:w-11 h-2 sm:h-2.5 rounded-full bg-black/95 ring-1 ring-white/10 flex items-center justify-between px-1.5 shadow-inner">
                      <span className="w-1 h-1 rounded-full bg-slate-900"></span>
                      <span className="w-1 h-1 rounded-full bg-slate-950 flex items-center justify-center">
                        <span className="w-0.5 h-0.5 rounded-full bg-blue-500/80"></span>
                      </span>
                    </div>
                  </div>

                  {/* Inner Screen Surface */}
                  <div className="relative w-full aspect-[9/19.5] rounded-[20px] sm:rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center ring-1 ring-black/40">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-full object-contain block select-none group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Subtle Glass Sheen Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.09] pointer-events-none rounded-[20px] sm:rounded-[22px]"></div>

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 text-white">
                      <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-md">
                        <i className="fa-solid fa-magnifying-glass-plus text-xs"></i>
                      </div>
                      <span className="text-[10px] font-bold tracking-wide">100% Fullscreen</span>
                    </div>
                  </div>

                  {/* Bottom Mini Home Bar */}
                  <div className="w-full pt-1 pb-0.5 flex justify-center items-center">
                    <div className="w-12 h-0.5 rounded-full bg-slate-600/70 group-hover:bg-white/40 transition-colors"></div>
                  </div>
                </div>

                {/* Card Bottom: Title */}
                <h5 className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight mt-2 truncate group-hover:text-blue-600 transition-colors">
                  {screen.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── 3. VIEW MODE: INTERACTIVE DEVICE SPOTLIGHT ─── */}
      {viewMode === 'spotlight' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-slate-800 text-white shadow-xl overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              
              {/* Smartphone Mockup Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div 
                  onClick={() => openLightboxAt(currentIndex)}
                  className="relative w-[215px] sm:w-[245px] aspect-[9/19.5] rounded-[38px] sm:rounded-[42px] bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 p-[6px] sm:p-[7px] shadow-2xl ring-1 ring-white/20 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                  title="Click to view in 100% clarity"
                >
                  {/* Side Hardware Buttons */}
                  <div className="absolute -left-[2.5px] top-[70px] w-[2.5px] h-5 rounded-l-xs bg-slate-600/80"></div>
                  <div className="absolute -left-[2.5px] top-[96px] w-[2.5px] h-5 rounded-l-xs bg-slate-600/80"></div>
                  <div className="absolute -right-[2.5px] top-[80px] w-[2.5px] h-7 rounded-r-xs bg-slate-600/80"></div>

                  {/* Top Earpiece Speaker Bar */}
                  <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-9 h-[2px] rounded-full bg-slate-700/70 z-30"></div>

                  {/* Notch / Dynamic Island */}
                  <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[62px] sm:w-[68px] h-3.5 sm:h-4 bg-black/95 rounded-full z-20 flex items-center justify-between px-2 ring-1 ring-white/10 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 flex items-center justify-center">
                      <span className="w-0.5 h-0.5 rounded-full bg-blue-500/80"></span>
                    </span>
                  </div>

                  {/* 100% Screen Container with object-contain */}
                  <div className="w-full h-full rounded-[30px] sm:rounded-[34px] overflow-hidden bg-black relative flex items-center justify-center ring-1 ring-black/40">
                    <img
                      key={activeScreen.id}
                      src={activeScreen.image}
                      alt={activeScreen.title}
                      className="w-full h-full object-contain block animate-in fade-in duration-300 select-none"
                      loading="eager"
                    />

                    {/* Glass sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.10] pointer-events-none rounded-[30px] sm:rounded-[34px]"></div>

                    {/* Hover Hint */}
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 text-white">
                      <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                        <i className="fa-solid fa-magnifying-glass-plus text-base"></i>
                      </div>
                      <span className="text-xs font-bold tracking-wide">100% Fullscreen</span>
                    </div>
                  </div>

                  {/* Bottom Gesture Bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-white/40 rounded-full z-20 pointer-events-none"></div>
                </div>
              </div>

              {/* Spotlight Metadata & Controls */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs">
                    SERIAL #{activeScreen.serial}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/10">
                    {activeScreen.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                    {activeScreen.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal mt-2 leading-relaxed">
                    100% full-clarity uncompressed mobile capture showing live application interface, interactive lesson flow, and real-time cloud data binding.
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Sequence Progress</span>
                    <span className="text-blue-400 font-mono font-black">{currentIndex + 1} / {SCREENS.length}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentIndex + 1) / SCREENS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <i className="fa-solid fa-arrow-left"></i> Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Next <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300' 
                        : 'bg-white/10 hover:bg-white/20 border-white/15 text-slate-300'
                    }`}
                  >
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openLightboxAt(currentIndex)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ml-auto"
                  >
                    <i className="fa-solid fa-expand"></i>
                    <span className="hidden sm:inline">100% Zoom</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Serial-Wise Thumbnail Strip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Serial Strip (#01 to #{SCREENS.length.toString().padStart(2, '0')})
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {currentIndex + 1} of {SCREENS.length}
              </span>
            </div>

            <div 
              ref={stripRef}
              className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth no-scrollbar"
            >
              {SCREENS.map((screen, idx) => {
                const isActive = idx === currentIndex;

                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`group relative shrink-0 w-[72px] sm:w-[84px] aspect-[9/19.5] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-blue-600 ring-2 ring-blue-500/50 shadow-md scale-105'
                        : 'border-slate-200 hover:border-blue-400 opacity-75 hover:opacity-100'
                    }`}
                    title={`Serial #${screen.serial}: ${screen.title}`}
                  >
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-full object-contain bg-slate-950 block select-none"
                      loading="lazy"
                    />
                    <div className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black leading-none ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-900/80 text-white'
                    }`}>
                      #{screen.serial}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── 4. FULLSCREEN 100% NATIVE RESOLUTION LIGHTBOX MODAL ─── */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[96vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-slate-950/90 shrink-0 text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white">
                  SERIAL #{activeScreen.serial}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                    {activeScreen.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Screen {currentIndex + 1} of {SCREENS.length} • 100% Native Clarity (720 × 1600)
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    lightboxZoom 
                      ? 'bg-blue-600 text-white border-blue-500' 
                      : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
                  }`}
                  title={lightboxZoom ? 'Fit to screen' : 'View 100% native size'}
                >
                  <i className="fa-solid fa-magnifying-glass text-[11px] mr-1.5"></i>
                  <span>{lightboxZoom ? 'Fit Screen' : '100% Zoom'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            </div>

            {/* Modal Body: Uncompressed Screen Display */}
            <div className={`flex-1 overflow-auto flex items-center justify-center p-3 sm:p-5 bg-black/60 relative ${lightboxZoom ? 'overflow-scroll' : ''}`}>
              <img
                src={activeScreen.image}
                alt={activeScreen.title}
                className={`object-contain rounded-2xl shadow-2xl transition-all duration-300 ${
                  lightboxZoom ? 'max-h-none w-auto max-w-none' : 'max-h-[80vh] w-auto'
                }`}
                style={{ imageRendering: 'auto' }}
              />

              {/* Floating Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                title="Previous screen (Left arrow)"
              >
                <i className="fa-solid fa-chevron-left text-sm"></i>
              </button>

              {/* Floating Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                title="Next screen (Right arrow)"
              >
                <i className="fa-solid fa-chevron-right text-sm"></i>
              </button>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-5 py-2.5 bg-slate-950/90 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="hidden sm:inline">Use Left/Right arrow keys to navigate • Esc to close</span>
              <span className="font-mono font-bold text-white ml-auto">
                Screen {currentIndex + 1} of {SCREENS.length} (Serial #{activeScreen.serial})
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
