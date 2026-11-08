import React from 'react';

/**
 * EnglishMasterHeader
 * 
 * EXACT ENGLISH MASTER PRO HERO DESIGN
 * Recreated faithfully to match the reference specification:
 * 
 * 1. Left Side (approx 48% width):
 *    - Main Heading: "English" / "Master Pro" (English Master in navy #101D50, Pro in orange #FF762E)
 *    - Subtitle: "Mobile App UX Design" (Mobile App in orange #FF762E, UX Design in navy #101D50)
 *    - Description: "A smarter, simpler way to learn English." (navy sans-serif)
 *    - 3 Feature Rows with thin orange vertical divider & circular icon containers:
 *      • Learn with AI (Blue AI robot) - "Personalized practice and guidance."
 *      • Practice Every Day (Purple open book) - "Grammar, vocabulary, speaking and writing."
 *      • Track Your Progress (Orange progress chart) - "Clear goals and motivating feedback."
 * 
 * 2. Right Side (approx 52% width):
 *    - Rear Smartphone: Authentic English Master Pro Home screen (/english-master-gallery/01_screen.png)
 *      with 100% native clarity, angled slightly to the left.
 *    - Front Smartphone: Authentic Grammar Lesson onboarding screen (/english-master-gallery/03_screen.png)
 *      with 100% native clarity, angled to the right in front of the rear phone.
 *    - Plant in White Ceramic Pot: Green succulent to the left of the phones (/succulent_pot.png).
 *    - 3D Lavender Display Platform: Wide rounded platform beneath the phones & pot.
 *    - Decorative Curved Lines: Upper orange dashed curve & lower bright blue dashed curve.
 * 
 * 3. Soft Pastel Gradient Background & Flowing Waves:
 *    - Colors: White #FFFFFF, Blush pink #FFE5E8, Soft pink #F9DDF3, Pale lavender #E9E4FF,
 *      Light sky blue #BFE0FF, Peach #FFD5C1, Deep navy #101D50, Orange #FF762E, Bright blue #278BFF.
 *    - Layered bottom waves seamlessly connecting into the content area below.
 */

export default function EnglishMasterHeader() {
  return (
    <div className="relative w-full overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-text english-master-hero-bg">
      
      {/* ─── SCOPED KEYFRAME ANIMATIONS & GRADIENT STYLES ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .font-hero-serif {
          font-family: 'DM Serif Display', 'Playfair Display', Georgia, serif;
        }

        .english-master-hero-bg {
          background-color: #FFFFFF;
          background-image: 
            radial-gradient(ellipse 65% 55% at 6% 15%, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 32%, transparent 68%),
            radial-gradient(ellipse 55% 50% at 10% 85%, #FFD5C1 0%, rgba(255, 229, 232, 0.70) 35%, transparent 65%),
            radial-gradient(ellipse 48% 45% at 46% 22%, rgba(249, 221, 243, 0.65) 0%, transparent 55%),
            radial-gradient(ellipse 55% 50% at 75% 18%, rgba(233, 228, 255, 0.70) 0%, transparent 52%),
            radial-gradient(ellipse 65% 60% at 88% 48%, rgba(191, 224, 255, 0.75) 0%, rgba(233, 228, 255, 0.45) 45%, transparent 75%),
            radial-gradient(ellipse 50% 50% at 92% 88%, rgba(39, 139, 255, 0.35) 0%, transparent 60%);
        }

        /* ─── ANTI-GRAVITY LEVITATION ANIMATIONS ─── */
        @keyframes subtleFloatRear {
          0%, 100% {
            transform: rotate(-3.5deg) translateY(0px);
          }
          50% {
            transform: rotate(-3.5deg) translateY(-8px);
          }
        }

        @keyframes subtleFloatFront {
          0%, 100% {
            transform: rotate(4deg) translateY(0px);
          }
          50% {
            transform: rotate(4deg) translateY(-10px);
          }
        }

        /* ─── TRAVELING SLENDER SMALL ROPE ANIMATIONS (BEFORE GIVEN STYLE, MEDIUM SLOW GOING) ─── */
        /* Phase 1 (0s to 7s, 0% to 50%): Orange Slender Small Rope Travels (01 to 08) Medium Slow */
        @keyframes smallRopeOrangeCore {
          0% {
            opacity: 1;
            stroke-dashoffset: 191;
          }
          40% {
            opacity: 1;
            stroke-dashoffset: -1615;
          }
          44% {
            opacity: 0;
            stroke-dashoffset: -1820;
          }
          45%, 100% {
            opacity: 0;
            stroke-dashoffset: 191;
          }
        }

        @keyframes smallRopeOrangeHalo {
          0% {
            opacity: 0.35;
            stroke-dashoffset: 191;
          }
          40% {
            opacity: 0.35;
            stroke-dashoffset: -1615;
          }
          44% {
            opacity: 0;
            stroke-dashoffset: -1820;
          }
          45%, 100% {
            opacity: 0;
            stroke-dashoffset: 191;
          }
        }

        /* Phase 2 (7s to 14s, 50% to 100%): Green Slender Small Rope Travels (01 to 07) Medium Slow */
        @keyframes smallRopeGreenCore {
          0%, 49.9% {
            opacity: 0;
            stroke-dashoffset: 191;
          }
          50% {
            opacity: 1;
            stroke-dashoffset: 191;
          }
          90% {
            opacity: 1;
            stroke-dashoffset: -1424;
          }
          94% {
            opacity: 0;
            stroke-dashoffset: -1635;
          }
          95%, 100% {
            opacity: 0;
            stroke-dashoffset: 191;
          }
        }

        @keyframes smallRopeGreenHalo {
          0%, 49.9% {
            opacity: 0;
            stroke-dashoffset: 191;
          }
          50% {
            opacity: 0.35;
            stroke-dashoffset: 191;
          }
          90% {
            opacity: 0.35;
            stroke-dashoffset: -1424;
          }
          94% {
            opacity: 0;
            stroke-dashoffset: -1635;
          }
          95%, 100% {
            opacity: 0;
            stroke-dashoffset: 191;
          }
        }

        /* ─── DUAL-COLOR PLANT TREE LIGHTING (SYNCHRONIZED WITH SMALL ROPE ARRIVALS) ─── */
        @keyframes plantSequentialLighting {
          /* Idle gentle emerald glow */
          0%, 37% {
            filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.30)) drop-shadow(0 8px 16px rgba(16, 29, 80, 0.18));
            transform: scale(1);
          }
          /* 39% - 46%: ORANGE SMALL ROPE DIVES INTO POT! Warm Amber-Coral Bloom */
          41% {
            filter: drop-shadow(0 0 26px rgba(255, 118, 46, 0.95)) drop-shadow(0 0 42px rgba(255, 160, 72, 0.80)) drop-shadow(0 8px 24px rgba(255, 118, 46, 0.40));
            transform: scale(1.06);
          }
          47% {
            filter: drop-shadow(0 0 12px rgba(255, 118, 46, 0.40)) drop-shadow(0 8px 16px rgba(16, 29, 80, 0.18));
            transform: scale(1.01);
          }
          /* 50% - 87%: Idle gentle state */
          50%, 87% {
            filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.30)) drop-shadow(0 8px 16px rgba(16, 29, 80, 0.18));
            transform: scale(1);
          }
          /* 89% - 96%: GREEN SMALL ROPE DIVES INTO POT! Radiant Emerald-Teal Bloom */
          91% {
            filter: drop-shadow(0 0 26px rgba(16, 185, 129, 0.95)) drop-shadow(0 0 45px rgba(52, 211, 153, 0.80)) drop-shadow(0 8px 24px rgba(16, 185, 129, 0.40));
            transform: scale(1.06);
          }
          97% {
            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.40)) drop-shadow(0 8px 16px rgba(16, 29, 80, 0.18));
            transform: scale(1.01);
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.30)) drop-shadow(0 8px 16px rgba(16, 29, 80, 0.18));
            transform: scale(1);
          }
        }

        /* Amber Aura Behind Tree (Fires when Orange Small Rope reaches pot) */
        @keyframes plantOrangeAuraSeq {
          0%, 37% {
            opacity: 0;
            transform: scale(0.92);
          }
          41% {
            opacity: 0.95;
            transform: scale(1.30);
          }
          46% {
            opacity: 0.20;
            transform: scale(1.02);
          }
          48%, 100% {
            opacity: 0;
            transform: scale(0.92);
          }
        }

        /* Green Aura Behind Tree (Fires when Green Small Rope reaches pot) */
        @keyframes plantGreenAuraSeq {
          0%, 37% {
            opacity: 0.25;
            transform: scale(0.95);
          }
          38%, 87% {
            opacity: 0.20;
            transform: scale(0.95);
          }
          91% {
            opacity: 0.95;
            transform: scale(1.30);
          }
          97% {
            opacity: 0.35;
            transform: scale(1.02);
          }
          100% {
            opacity: 0.25;
            transform: scale(0.95);
          }
        }

                .animate-phone-rear {
          animation: subtleFloatRear 6s ease-in-out infinite;
          transform: rotate(-3.5deg);
        }

        .animate-phone-front {
          animation: subtleFloatFront 7s ease-in-out infinite;
          transform: rotate(4deg);
        }

        .animate-small-rope-orange-core {
          animation: smallRopeOrangeCore 14s linear infinite;
        }

        .animate-small-rope-orange-halo {
          animation: smallRopeOrangeHalo 14s linear infinite;
        }

        .animate-small-rope-green-core {
          animation: smallRopeGreenCore 14s linear infinite;
        }

        .animate-small-rope-green-halo {
          animation: smallRopeGreenHalo 14s linear infinite;
        }

        .animate-plant-lighting-seq {
          animation: plantSequentialLighting 14s ease-in-out infinite;
        }

        .animate-plant-aura-orange {
          animation: plantOrangeAuraSeq 14s ease-out infinite;
        }

        .animate-plant-aura-green {
          animation: plantGreenAuraSeq 14s ease-out infinite;
        }

        /* ─── SYNCHRONIZED DUAL EDGE-TO-FRONT HERO ENTRANCE (SLOW & SMOOTH) ─── */
        @keyframes floatInFromLeftEdge {
          0% {
            opacity: 0;
            transform: translate3d(calc(-100% - 120px), 0, 0) scale(0.88);
          }
          35% {
            opacity: 0.75;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes floatInFromRightEdge {
          0% {
            opacity: 0;
            transform: translate3d(calc(100% + 120px), 0, 0) scale(0.88);
          }
          35% {
            opacity: 0.75;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        /* Left Side: Slowly from left edge coming front into visualization (2.6s Duration, 0.35s delay) */
        .hero-left {
          opacity: 0;
          animation: floatInFromLeftEdge 2.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform, opacity;
        }

        /* Right Side: Slowly from right edge coming front simultaneously (2.6s Duration, 0.35s delay) */
        .hero-right {
          opacity: 0;
          animation: floatInFromRightEdge 2.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-left,
          .hero-right {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .animate-phone-rear {
            animation: none !important;
            transform: rotate(-3.5deg) !important;
          }
          .animate-phone-front {
            animation: none !important;
            transform: rotate(4deg) !important;
          }
          .animate-small-rope-orange-core,
          .animate-small-rope-orange-halo,
          .animate-small-rope-green-core,
          .animate-small-rope-green-halo,
          .animate-plant-lighting-seq,
          .animate-plant-aura-orange,
          .animate-plant-aura-green,
          .animate-hero-fade-up {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ─── HERO MAIN CONTENT: 2-COLUMN LAYOUT (LEFT 48% / RIGHT 52%) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-2.5 xs:px-3 sm:px-8 lg:px-12 pt-9 xs:pt-10 sm:pt-9 lg:pt-11 pb-1 sm:pb-4 lg:pb-5">
        <div className="grid grid-cols-12 gap-2 xs:gap-3 sm:gap-6 lg:gap-6 items-center">

          {/* ─── LEFT SIDE: APPROX 48% WIDTH (lg:col-span-5 xl:col-span-5) ─── */}
          <div className="col-span-6 xs:col-span-6 lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left space-y-1 xs:space-y-1.5 sm:space-y-4 hero-left select-text">
            
            {/* Main Heading & Sub heading (Clean editable text) */}
            <div>
              <h1 className="text-[13.5px] xs:text-[15.5px] sm:text-4xl lg:text-[44px] font-normal tracking-tight leading-[1.14] text-[#101D50] font-hero-serif">
                Master English.<br />
                Build Your <span className="bg-gradient-to-r from-[#FF762E] via-[#FF8A48] to-[#FF5E00] bg-clip-text text-transparent inline-block drop-shadow-xs">Confidence.</span>
              </h1>
              
              {/* Sub heading */}
              <div className="mt-1 sm:mt-3">
                <h2 className="text-[6.5px] xs:text-[7.5px] sm:text-sm lg:text-[14.5px] text-[#101D50]/85 leading-tight sm:leading-relaxed font-medium max-w-lg font-['Plus_Jakarta_Sans',sans-serif] line-clamp-3 sm:line-clamp-none">
                  A Complete English learning platform to Improve Grammar, Vocabulary, Speaking and more — with practices, Progress tracking and Certificates.
                </h2>
              </div>
            </div>

            {/* 3 Interactive Feature Rows with Hover Transitions */}
            <div className="w-full max-w-md space-y-1 xs:space-y-1.5 sm:space-y-3 pt-0.5 sm:pt-1">
              
              {/* Feature 1: Learn with AI */}
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 group text-left p-0.5 sm:p-2 -ml-0.5 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/70 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-1.5 cursor-default">
                <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-[#BFE0FF] flex items-center justify-center text-[#278BFF] text-[8.5px] xs:text-[10px] sm:text-lg shrink-0 shadow-[0_2px_6px_rgba(39,139,255,0.22)] sm:shadow-[0_4px_12px_rgba(39,139,255,0.22)] transition-all duration-300 group-hover:scale-115">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div className="w-[1.5px] sm:w-[2.5px] h-3.5 xs:h-4 sm:h-7 bg-[#FF762E]/70 rounded-full shrink-0 group-hover:h-5 sm:group-hover:h-8 group-hover:bg-[#FF762E] transition-all duration-300"></div>
                <div>
                  <h4 className="text-[8px] xs:text-[9.5px] sm:text-sm font-extrabold text-[#101D50] leading-tight group-hover:text-[#278BFF] transition-colors duration-200">
                    Learn with AI
                  </h4>
                  <p className="text-[6px] xs:text-[7px] sm:text-xs text-slate-700 font-normal mt-0.5 line-clamp-1 sm:line-clamp-none">
                    Personalized practice and guidance.
                  </p>
                </div>
              </div>

              {/* Feature 2: Practice Every Day */}
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 group text-left p-0.5 sm:p-2 -ml-0.5 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/70 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-1.5 cursor-default">
                <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 border border-[#E9E4FF] flex items-center justify-center text-[#8B5CF6] text-[8.5px] xs:text-[10px] sm:text-lg shrink-0 shadow-[0_2px_6px_rgba(139,92,246,0.22)] sm:shadow-[0_4px_12px_rgba(139,92,246,0.22)] transition-all duration-300 group-hover:scale-115">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <div className="w-[1.5px] sm:w-[2.5px] h-3.5 xs:h-4 sm:h-7 bg-[#FF762E]/70 rounded-full shrink-0 group-hover:h-5 sm:group-hover:h-8 group-hover:bg-[#FF762E] transition-all duration-300"></div>
                <div>
                  <h4 className="text-[8px] xs:text-[9.5px] sm:text-sm font-extrabold text-[#101D50] leading-tight group-hover:text-[#8B5CF6] transition-colors duration-200">
                    Practice Every Day
                  </h4>
                  <p className="text-[6px] xs:text-[7px] sm:text-xs text-slate-700 font-normal mt-0.5 line-clamp-1 sm:line-clamp-none">
                    Grammar, vocabulary, speaking and writing.
                  </p>
                </div>
              </div>

              {/* Feature 3: Track Your Progress */}
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 group text-left p-0.5 sm:p-2 -ml-0.5 sm:-ml-2 rounded-xl sm:rounded-2xl hover:bg-white/70 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-1.5 cursor-default">
                <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 border border-[#FFD5C1] flex items-center justify-center text-[#FF762E] text-[8.5px] xs:text-[10px] sm:text-lg shrink-0 shadow-[0_2px_6px_rgba(255,118,46,0.22)] sm:shadow-[0_4px_12px_rgba(255,118,46,0.22)] transition-all duration-300 group-hover:scale-115">
                  <i className="fa-solid fa-chart-simple"></i>
                </div>
                <div className="w-[1.5px] sm:w-[2.5px] h-3.5 xs:h-4 sm:h-7 bg-[#FF762E]/70 rounded-full shrink-0 group-hover:h-5 sm:group-hover:h-8 group-hover:bg-[#FF762E] transition-all duration-300"></div>
                <div>
                  <h4 className="text-[8px] xs:text-[9.5px] sm:text-sm font-extrabold text-[#101D50] leading-tight group-hover:text-[#FF762E] transition-colors duration-200">
                    Track Your Progress
                  </h4>
                  <p className="text-[6px] xs:text-[7px] sm:text-xs text-slate-700 font-normal mt-0.5 line-clamp-1 sm:line-clamp-none">
                    Clear goals and motivating feedback.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* ─── RIGHT SIDE: APPROX 52% WIDTH (lg:col-span-7 xl:col-span-7) ─── */}
          <div className="col-span-6 xs:col-span-6 lg:col-span-7 xl:col-span-7 relative flex items-center justify-center pt-0.5 sm:pt-4 lg:pt-0 min-h-[195px] xs:min-h-[225px] sm:min-h-[530px] hero-right">

            {/* ─── 8. DYNAMIC SNAKE FLOW DASHED CURVES (ORANGE & LIGHT GREEN 01 TO 08) ─── */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              viewBox="0 0 700 500" 
              preserveAspectRatio="none" 
              fill="none"
            >
              <defs>
                <filter id="glowOrangeSnake" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowGreenSnake" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="snakeOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF762E" />
                  <stop offset="45%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#FFA048" />
                </linearGradient>
                <linearGradient id="snakeGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>

              {/* ─── 01 TO 08 ORANGE SLENDER SMALL ROPE (BEFORE GIVEN STYLE: 0s to 7s) ─── */}
              {/* Delicate Soft Glow Under-layer */}
              <path
                d="M 20 190 C 130 145 250 100 380 75 C 455 58 535 62 590 95 C 650 130 675 220 665 305 C 655 380 625 448 545 465 C 450 480 345 470 265 455 C 190 440 155 375 180 310 C 200 265 255 275 275 330 C 290 385 245 435 185 425"
                stroke="#FF5E1E"
                strokeWidth="3.4"
                strokeDasharray="11 7 11 7 11 7 11 7 11 7 11 7 11 7 11 7 11 4000"
                strokeLinecap="round"
                className="animate-small-rope-orange-halo"
                filter="url(#glowOrangeSnake)"
              />
              {/* Slender Traveling Small Rope (Only this short segment travels) */}
              <path
                d="M 20 190 C 130 145 250 100 380 75 C 455 58 535 62 590 95 C 650 130 675 220 665 305 C 655 380 625 448 545 465 C 450 480 345 470 265 455 C 190 440 155 375 180 310 C 200 265 255 275 275 330 C 290 385 245 435 185 425"
                stroke="url(#snakeOrangeGrad)"
                strokeWidth="1.9"
                strokeDasharray="11 7 11 7 11 7 11 7 11 7 11 7 11 7 11 4000"
                strokeLinecap="round"
                className="animate-small-rope-orange-core"
              />

              {/* ─── 01 TO 07 GREEN SLENDER SMALL ROPE (BEFORE GIVEN STYLE: 7s to 14s) ─── */}
              {/* Delicate Soft Glow Under-layer */}
              <path
                d="M 50 235 C 160 255 260 185 375 135 C 465 95 550 115 620 150 C 675 185 685 280 645 365 C 600 450 480 445 370 435 C 290 425 225 415 175 380 C 145 345 155 290 210 275 C 260 260 295 305 265 365"
                stroke="#10B981"
                strokeWidth="3.4"
                strokeDasharray="11 7 11 7 11 7 11 7 11 7 11 7 11 7 11 4000"
                strokeLinecap="round"
                className="animate-small-rope-green-halo"
                filter="url(#glowGreenSnake)"
              />
              {/* Slender Traveling Small Rope (Only this short segment travels) */}
              <path
                d="M 50 235 C 160 255 260 185 375 135 C 465 95 550 115 620 150 C 675 185 685 280 645 365 C 600 450 480 445 370 435 C 290 425 225 415 175 380 C 145 345 155 290 210 275 C 260 260 295 305 265 365"
                stroke="url(#snakeGreenGrad)"
                strokeWidth="1.9"
                strokeDasharray="11 7 11 7 11 7 11 7 11 7 11 7 11 4000"
                strokeLinecap="round"
                className="animate-small-rope-green-core"
              />
            </svg>

            {/* ─── 7. WIDE ROUNDED LAVENDER DISPLAY PLATFORM (BASE STAGE) ─── */}
            <div className="absolute bottom-0 xs:bottom-1 sm:bottom-4 left-[50%] -translate-x-1/2 w-[145px] xs:w-[170px] sm:w-[440px] md:w-[480px] h-[38px] xs:h-[46px] sm:h-[95px] pointer-events-none z-10">
              <svg viewBox="0 0 480 100" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(16,29,80,0.18)] sm:drop-shadow-[0_16px_28px_rgba(16,29,80,0.20)]">
                <defs>
                  {/* Platform Top Lavender Surface */}
                  <linearGradient id="lavenderPlatformTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FAF7FF" />
                    <stop offset="100%" stopColor="#E4DCFF" />
                  </linearGradient>
                  {/* Platform Cylinder Front Body */}
                  <linearGradient id="lavenderPlatformBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4C4FF" />
                    <stop offset="100%" stopColor="#BBA4FF" />
                  </linearGradient>
                </defs>
                {/* Cylinder Front Extrusion */}
                <path d="M 30,45 L 30,75 C 30,97 450,97 450,75 L 450,45 Z" fill="url(#lavenderPlatformBody)" />
                {/* Top Elliptical Stepping Base */}
                <ellipse cx="240" cy="45" rx="210" ry="24" fill="url(#lavenderPlatformTop)" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>

            {/* ─── 7. GREEN ALOE SUCCULENT TREE IN WHITE CERAMIC POT (AUTOMATIC SYNCHRONIZED LIGHTING) ─── */}
            <div className="absolute left-0 xs:left-0.5 sm:left-7 md:left-12 bottom-0.5 xs:bottom-1 sm:bottom-6 z-25 flex flex-col items-center pointer-events-none transition-all duration-300 hover:scale-110 hover:rotate-3">
              {/* Dual-Color Energy Auras: Alternating Amber on Orange Flow & Emerald on Green Flow */}
              <div className="absolute -inset-2 sm:-inset-4 rounded-full bg-gradient-to-t from-orange-500/50 via-amber-400/40 to-yellow-200/25 blur-xs sm:blur-lg pointer-events-none animate-plant-aura-orange"></div>
              <div className="absolute -inset-2 sm:-inset-4 rounded-full bg-gradient-to-t from-emerald-500/55 via-teal-400/40 to-emerald-200/30 blur-xs sm:blur-lg pointer-events-none animate-plant-aura-green"></div>

              <img
                src="/succulent_pot_aloe.png"
                alt="Green aloe succulent tree plant with automatic dual-color lighting"
                className="w-5 xs:w-6.5 sm:w-22 md:w-24 h-auto object-contain select-none block animate-plant-lighting-seq"
                loading="eager"
              />
              {/* Soft contact shadow beneath pot */}
              <div className="w-4 xs:w-5.5 sm:w-16 h-1 sm:h-2.5 bg-[#101D50]/20 rounded-full blur-2xs sm:blur-xs -mt-0.5 sm:-mt-1.5"></div>
            </div>

            {/* ─── 5 & 6. THE TWO SMARTPHONES (ANTI-GRAVITY FLOATING WITH 100% NATIVE CLARITY) ─── */}
            <div className="relative z-30 flex items-center justify-center -space-x-3.5 xs:-space-x-4.5 sm:-space-x-11 pt-3 xs:pt-4 sm:pt-0 pb-1.5 xs:pb-2 sm:pb-10 pl-1 xs:pl-2 sm:pl-8">

              {/* ─── REAR PHONE: ENGLISH MASTER PRO HOME SCREEN (100% FULL CLARITY & HIGH RESOLUTION) ─── */}
              <div className="animate-phone-rear relative z-20 cursor-pointer group" style={{ transform: "rotate(-3.5deg)", transformStyle: "preserve-3d", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}>
                <div 
                  className="relative w-[68px] xs:w-[80px] sm:w-[198px] md:w-[220px] lg:w-[232px] aspect-[9/20] rounded-[14px] xs:rounded-[17px] sm:rounded-[38px] bg-[#0A1128] p-0.5 xs:p-1 sm:p-2.5 shadow-[0_12px_28px_-6px_rgba(16,29,80,0.36)] sm:shadow-[0_26px_55px_-10px_rgba(16,29,80,0.36)] border border-slate-700/80 ring-1 ring-black/20 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[0_36px_80px_-10px_rgba(39,139,255,0.42)] transition-all duration-500 ease-out"
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-1 sm:top-3 left-1/2 -translate-x-1/2 w-[28px] sm:w-[65px] h-1.5 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-1 sm:px-2 shadow-inner">
                    <span className="w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800"></span>
                    <span className="w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 rounded-full bg-blue-900/80"></span>
                  </div>

                  {/* Rear Screen Content: Authentic English Master Pro Home Screen */}
                  <div className="w-full h-full rounded-[12px] xs:rounded-[15px] sm:rounded-[26px] overflow-hidden bg-slate-900 relative flex items-center justify-center">
                    <img
                      src="/english-master-gallery/01_screen.png"
                      alt="Rear Phone: English Master Pro Home Screen with Core Modules and AI Banner"
                      className="w-full h-full object-cover block select-none"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                      loading="eager"
                      decoding="sync"
                    />
                  </div>

                  {/* Bottom Gesture Line */}
                  <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-8 sm:w-16 h-0.5 bg-white/45 rounded-full z-30 pointer-events-none"></div>
                </div>
              </div>

              {/* ─── FRONT PHONE: GRAMMAR LESSON ONBOARDING SCREEN (100% FULL CLARITY & HIGH RESOLUTION) ─── */}
              <div className="animate-phone-front relative z-30 cursor-pointer group" style={{ transform: "rotate(4deg)", transformStyle: "preserve-3d", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}>
                <div 
                  className="relative w-[71px] xs:w-[84px] sm:w-[202px] md:w-[224px] lg:w-[236px] aspect-[9/20] rounded-[14px] xs:rounded-[17px] sm:rounded-[38px] bg-[#0A1128] p-0.5 xs:p-1 sm:p-2.5 shadow-[0_16px_35px_-8px_rgba(16,29,80,0.42)] sm:shadow-[0_32px_70px_-12px_rgba(16,29,80,0.42)] border border-slate-700/80 ring-1 ring-black/20 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[0_42px_90px_-12px_rgba(255,118,46,0.40)] transition-all duration-500 ease-out"
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-1 sm:top-3 left-1/2 -translate-x-1/2 w-[28px] sm:w-[65px] h-1.5 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-1 sm:px-2 shadow-inner">
                    <span className="w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800"></span>
                    <span className="w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 rounded-full bg-blue-900/80"></span>
                  </div>

                  {/* Front Screen Content: Authentic Grammar Lesson Onboarding Screen */}
                  <div className="w-full h-full rounded-[12px] xs:rounded-[15px] sm:rounded-[26px] overflow-hidden bg-[#F3F8FF] relative flex items-center justify-center">
                    <img
                      src="/english-master-gallery/03_screen.png"
                      alt="Front Phone: Grammar Lesson Onboarding Screen with Practice Exercises, Tests and Next Button"
                      className="w-full h-full object-cover block select-none"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                      loading="eager"
                      decoding="sync"
                    />
                  </div>

                  {/* Bottom Gesture Line */}
                  <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-8 sm:w-16 h-0.5 bg-white/45 rounded-full z-30 pointer-events-none"></div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ─── 9. LAYERED CONTINUOUS FLOWING WAVE DIVIDER (MOVED UP TO ELIMINATE GAP) ─── */}
      <div className="relative w-full overflow-hidden leading-none z-20 -mt-3 xs:-mt-4 sm:-mt-10 lg:-mt-14 -mb-[1px]">
        <svg 
          viewBox="0 0 1440 180" 
          preserveAspectRatio="none" 
          className="w-full h-10 xs:h-12 sm:h-28 lg:h-36 block pointer-events-none"
        >
          {/* Layer 1: Soft Sky Blue / Lavender Translucent Wave */}
          <path 
            d="M 0,45 C 240,120 460,25 700,65 C 940,105 1180,65 1440,85 L 1440,180 L 0,180 Z" 
            fill="#BFE0FF" 
            fillOpacity="0.38" 
          />
          {/* Layer 2: Pale Blush Pink Translucent Wave */}
          <path 
            d="M 0,70 C 220,15 480,115 740,55 C 980,115 1220,75 1440,90 L 1440,180 L 0,180 Z" 
            fill="#FFE5E8" 
            fillOpacity="0.55" 
          />
          {/* Layer 3: Solid Pure White Base Wave Flowing Seamlessly into Lower Body */}
          <path 
            d="M 0,95 C 200,35 420,130 680,65 C 920,110 1180,80 1440,95 L 1440,180 L 0,180 Z" 
            fill="#FFFFFF" 
          />
        </svg>
      </div>

    </div>
  );
}
