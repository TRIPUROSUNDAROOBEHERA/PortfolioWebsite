import React, { useState, useEffect, useRef } from 'react';

/**
 * IdsTechnologiesUsed
 * 
 * Re-architected into the "Ikigai PowerPoint Diagram" (Image 2):
 * - Central 4-Circle Overlapping Ikigai Venn Diagram with precision circular intersections
 * - 4 Sector Dimensions: "What you LOVE (Machine Learning)", "What the world NEEDS (Threat Defense)",
 *   "What you can be PAID FOR (Data & Storage)", "What you are GOOD AT (Web Platform)"
 * - 4 Intersecting Lens Petals with Image 2 color accents:
 *   - PASSION (Sky Blue): Feature Engineering & Pipeline
 *   - MISSION (Warm Amber/Gold): AI Models & 98.4% Accuracy
 *   - PROFESSION (Purple): Full-Stack Django & Interactive UI
 *   - VOCATION (Coral Red): Benchmark Datasets & Forensics
 * - Center Hub: Dark Navy IDS CORE Squircle with luminous pulsing halo
 * - Elegant dashed callout lines and vertical accent bars radiating to surrounding cards
 * - All 9 Technology Nodes (01 to 09) rendered simultaneously with complete text, bullets, code snippets, tags & official brand logos
 * - Interactive filtering, petal selection, and responsive layout without any horizontal scrollbar
 * - View switcher to toggle between Ikigai Diagram (Image 2), Wavy Timeline, and Executive Grid
 */

// ─── 9 CORE TECHNOLOGY NODES DATA (EXACT USER PROMPT SPECIFICATION) ───
const TECH_CARDS = [
  // ── Machine Learning & Analysis (Nodes 01-04) ──
  {
    num: '01',
    pillarId: 1,
    pillarName: 'Machine Learning & Analysis',
    domainLabel: 'Machine Learning & Analysis (4 Nodes)',
    color: '#0284C7', // Sky Blue / Python Blue
    category: 'Programming Language',
    title: 'Python',
    icon: 'fa-code',
    ikigaiSector: 'love',
    ikigaiPetal: 'passion',
    bullets: [
      'Simple & powerful',
      'Widely used in ML',
      'Open source',
    ],
    snippet: 'def detect(packet):',
    tag: 'Python 3.10',
    logo: (
      <svg viewBox="0 0 128 128" className="w-5 h-5 shrink-0 drop-shadow-xs" fill="none">
        <path
          d="M63.5 12c-27.6 0-25.9 12-25.9 12l.1 12.4h26.4v3.8H26.8S12 38.6 12 66.2c0 27.6 12.8 26.7 12.8 26.7h7.6v-10.7s-.4-12.8 12.6-12.8h21.6s12-.2 12-11.7V40.2s1.7-16.2-25.5-16.2z"
          fill="#387EB8"
        />
        <circle cx="48.5" cy="23.5" r="3.5" fill="#fff" />
        <path
          d="M64.5 116c27.6 0 25.9-12 25.9-12l-.1-12.4H63.9v-3.8h37.3s14.8 1.6 14.8-26c0-27.6-12.8-26.7-12.8-26.7h-7.6v10.7s.4 12.8-12.6 12.8H47.2s-12 .2-12 11.7v17.5s-1.7 16.2 25.5 16.2z"
          fill="#FFE052"
        />
        <circle cx="79.5" cy="104.5" r="3.5" fill="#fff" />
      </svg>
    ),
  },
  {
    num: '02',
    pillarId: 1,
    pillarName: 'Machine Learning & Analysis',
    domainLabel: 'Machine Learning & Analysis (4 Nodes)',
    color: '#EA580C', // Coral Orange / Amber
    category: 'Machine Learning',
    title: 'Scikit-learn',
    icon: 'fa-brain',
    ikigaiSector: 'love',
    ikigaiPetal: 'mission',
    bullets: [
      'Easy to use',
      'Powerful ML library',
      'Widely adopted',
    ],
    snippet: 'fit() → predict()',
    tag: '98.4% Acc',
    logo: (
      <div className="relative w-8 h-5 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 90 60" className="w-full h-full">
          <circle cx="28" cy="30" r="18" fill="#38BDF8" fillOpacity="0.9" />
          <circle cx="52" cy="30" r="18" fill="#FB923C" fillOpacity="0.9" />
          <text x="40" y="32" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="900" fontStyle="italic">
            scikit
          </text>
          <text x="40" y="44" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="800">
            learn
          </text>
        </svg>
      </div>
    ),
  },
  {
    num: '03',
    pillarId: 1,
    pillarName: 'Machine Learning & Analysis',
    domainLabel: 'Machine Learning & Analysis (4 Nodes)',
    color: '#2563EB', // Royal Blue
    category: 'Algorithms',
    title: 'Random Forest & Support Vector Machine (SVM)',
    icon: 'fa-diagram-project',
    ikigaiSector: 'needs',
    ikigaiPetal: 'mission',
    bullets: [
      'High accuracy',
      'Effective for classification',
      'Suitable for intrusion detection',
    ],
    snippet: '100 Trees • RBF Kernel',
    tag: 'Ensemble',
    logo: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0" fill="none">
        <circle cx="24" cy="11" r="6" fill="#10B981" />
        <circle cx="19" cy="14" r="4.5" fill="#059669" />
        <circle cx="29" cy="14" r="4.5" fill="#10B981" />
        <line x1="24" y1="18" x2="13" y2="33" stroke="#059669" strokeWidth="2" />
        <line x1="24" y1="18" x2="24" y2="33" stroke="#059669" strokeWidth="2" />
        <line x1="24" y1="18" x2="35" y2="33" stroke="#059669" strokeWidth="2" />
        <circle cx="13" cy="34" r="4" fill="#34D399" stroke="#059669" strokeWidth="1.2" />
        <circle cx="24" cy="34" r="4" fill="#10B981" stroke="#047857" strokeWidth="1.2" />
        <circle cx="35" cy="34" r="4" fill="#34D399" stroke="#059669" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    num: '04',
    pillarId: 1,
    pillarName: 'Machine Learning & Analysis',
    domainLabel: 'Machine Learning & Analysis (4 Nodes)',
    color: '#10B981', // Apple Green / Emerald
    category: 'Data Processing',
    title: 'NumPy and pandas',
    icon: 'fa-table-cells',
    ikigaiSector: 'good',
    ikigaiPetal: 'passion',
    bullets: [
      'Data manipulation',
      'Feature preprocessing',
      'Efficient data analysis',
    ],
    snippet: 'Shape: (125k, 41)',
    tag: 'Normalized',
    logo: (
      <div className="flex items-center gap-1.5 shrink-0">
        <svg viewBox="0 0 36 36" className="w-4.5 h-4.5" fill="none">
          <polygon points="18,2 34,10 18,18 2,10" fill="#4DABF7" />
          <polygon points="2,10 18,18 18,34 2,26" fill="#1C7ED6" />
          <polygon points="34,10 34,26 18,34 18,18" fill="#1971C2" />
          <text x="18" y="16" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="900">
            NP
          </text>
        </svg>
        <span className="text-[9.5px] font-black text-[#150458] tracking-tighter">pandas</span>
      </div>
    ),
  },

  // ── Web Development (Nodes 05-06) ──
  {
    num: '05',
    pillarId: 2,
    pillarName: 'Web Development',
    domainLabel: 'Web Development (2 Nodes)',
    color: '#D97706', // Amber / Warm Gold
    category: 'Web Framework',
    title: 'Django',
    icon: 'fa-server',
    ikigaiSector: 'good',
    ikigaiPetal: 'profession',
    bullets: [
      'Robust & secure',
      'Rapid development',
      'Scalable web applications',
    ],
    snippet: 'MVT URL → View → Model',
    tag: 'CSRF Safe',
    logo: (
      <div className="w-5 h-5 rounded bg-[#092E20] flex items-center justify-center text-white font-serif font-black text-[11px] tracking-tighter shadow-2xs shrink-0">
        dj
      </div>
    ),
  },
  {
    num: '06',
    pillarId: 2,
    pillarName: 'Web Development',
    domainLabel: 'Web Development (2 Nodes)',
    color: '#8B5CF6', // Violet Purple
    category: 'Frontend',
    title: 'HTML, CSS, JavaScript',
    icon: 'fa-desktop',
    ikigaiSector: 'good',
    ikigaiPetal: 'profession',
    bullets: [
      'Responsive UI',
      'Interactive interface',
      'User-friendly experience',
    ],
    snippet: 'Responsive Grid',
    tag: 'Live UI',
    logo: (
      <div className="flex items-center gap-0.5 shrink-0">
        <div className="w-3.5 h-4 bg-[#E34F26] rounded-xs flex items-center justify-center text-white font-black text-[7.5px]">
          5
        </div>
        <div className="w-3.5 h-4 bg-[#1572B6] rounded-xs flex items-center justify-center text-white font-black text-[7.5px]">
          3
        </div>
        <div className="w-3.5 h-4 bg-[#F7DF1E] rounded-xs flex items-center justify-center text-black font-black text-[7px]">
          JS
        </div>
      </div>
    ),
  },

  // ── Data & Storage (Nodes 07-09) ──
  {
    num: '07',
    pillarId: 3,
    pillarName: 'Data & Storage',
    domainLabel: 'Data & Storage (3 Nodes)',
    color: '#0EA5E9', // Cyan / Light Blue
    category: 'Dataset',
    title: 'NSL-KDD',
    icon: 'fa-shield-halved',
    ikigaiSector: 'needs',
    ikigaiPetal: 'vocation',
    bullets: [
      'Improved KDD dataset',
      'Standard benchmark',
      'Used for intrusion detection',
    ],
    snippet: '41 Features',
    tag: 'Benchmark',
    logo: (
      <svg viewBox="0 0 48 54" className="w-4.5 h-5 shrink-0" fill="none">
        <ellipse cx="24" cy="9" rx="18" ry="6.5" fill="#0284C7" />
        <path d="M6 9v9c0 3.8 8 6.5 18 6.5s18-2.7 18-6.5V9" fill="#0EA5E9" />
        <path d="M6 20v9c0 3.8 8 6.5 18 6.5s18-2.7 18-6.5V20" fill="#38BDF8" />
        <path d="M6 31v9c0 3.8 8 6.5 18 6.5s18-2.7 18-6.5V31" fill="#0284C7" />
      </svg>
    ),
  },
  {
    num: '08',
    pillarId: 3,
    pillarName: 'Data & Storage',
    domainLabel: 'Data & Storage (3 Nodes)',
    color: '#0D9488', // Teal / Ocean Blue
    category: 'Database',
    title: 'SQL (SQLite / MySQL)',
    icon: 'fa-database',
    ikigaiSector: 'paid',
    ikigaiPetal: 'vocation',
    bullets: [
      'Data storage',
      'Efficient queries',
      'Reliable database management',
    ],
    snippet: 'Audit Logs',
    tag: '1.2ms Query',
    logo: (
      <div className="flex flex-col items-end gap-0.5 shrink-0 text-[9px] font-black">
        <span className="text-[#0284C7] leading-none">SQLite</span>
        <span className="text-[#00758F] leading-none">MySQL</span>
      </div>
    ),
  },
  {
    num: '09',
    pillarId: 3,
    pillarName: 'Data & Storage',
    domainLabel: 'Data & Storage (3 Nodes)',
    color: '#DC2626', // Crimson Red
    category: 'Development Tools',
    title: 'Visual Studio Code, Git, and GitHub',
    icon: 'fa-code-branch',
    ikigaiSector: 'paid',
    ikigaiPetal: 'profession',
    bullets: [
      'Code development',
      'Version control',
      'Collaboration & deployment',
    ],
    snippet: 'main ●──●',
    tag: 'v1.0 Ready',
    logo: (
      <div className="flex items-center gap-1.5 shrink-0 text-[11.5px]">
        <i className="fa-solid fa-code text-[#007ACC]" title="VS Code"></i>
        <i className="fa-brands fa-git-alt text-[#F05032]" title="Git"></i>
        <i className="fa-brands fa-github text-slate-800" title="GitHub"></i>
      </div>
    ),
  },
];

export default function IdsTechnologiesUsed() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSector, setActiveSector] = useState(null);
  const [viewMode, setViewMode] = useState('venn3'); // 'venn3' (Image 2 3-circle), 'ikigai' (4-circle), or 'grid' (Image 1)
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Entrance Cascade Trigger on Refresh & Scroll
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let hasEverAnimated = false;

    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger when entering visible viewport (or if already visible on page load/refresh)
      if (rect.top <= windowHeight * 0.90 && rect.bottom >= windowHeight * 0.10) {
        setHasAnimated(true);
        hasEverAnimated = true;
      } else if (hasEverAnimated && (rect.top > windowHeight * 1.35 || rect.bottom < -350)) {
        // Reset when scrolled substantially out of view so re-scrolling down replays the animation cleanly
        setHasAnimated(false);
      }
    };

    checkVisibility();
    const timer = setTimeout(checkVisibility, 50);

    const scrollParent = node.closest('.overflow-y-auto') || window;
    scrollParent.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(timer);
      scrollParent.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  // Separate nodes by domain for the executive flanking layout
  const mlCards = TECH_CARDS.filter((c) => c.pillarId === 1);
  const webAndDataCards = TECH_CARDS.filter((c) => (c.pillarId === 2 || c.pillarId === 3) && c.num !== '09');
  const devToolsCard = TECH_CARDS.find((c) => c.num === '09');

  // Handle Pillar click in 3-Circle Venn Diagram
  const handlePillarSelect = (pillarId) => {
    if (activeFilter === pillarId) {
      setActiveFilter('all');
    } else {
      setActiveFilter(pillarId);
    }
  };

  // Handle Sector/Petal click in Ikigai Diagram to filter or focus
  const handleSectorSelect = (sector) => {
    if (activeSector === sector) {
      setActiveSector(null);
      setActiveFilter('all');
    } else {
      setActiveSector(sector);
      if (sector === 'love') setActiveFilter(1);
      else if (sector === 'good') setActiveFilter(2);
      else if (sector === 'paid' || sector === 'needs') setActiveFilter(3);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full space-y-6 font-['Plus_Jakarta_Sans',sans-serif] select-text"
    >
      {/* ── Dynamic Micro-Animations for Venn Spheres, Radiant Auras & Interactive Cards ── */}
      <style>{`
        /* 1. Curved Circular Path Entrance for 3 Venn Spheres */
        @keyframes idsVennEnterTop {
          0% {
            opacity: 0;
            transform: translate(45px, -240px) scale(0.55) rotate(16deg);
          }
          32% {
            opacity: 0.85;
            transform: translate(-30px, -105px) scale(0.85) rotate(-8deg);
          }
          72% {
            opacity: 1;
            transform: translate(10px, -12px) scale(1.03) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }

        @keyframes idsVennEnterLeft {
          0% {
            opacity: 0;
            transform: translate(-220px, 200px) scale(0.55) rotate(-22deg);
          }
          32% {
            opacity: 0.85;
            transform: translate(-115px, 95px) scale(0.85) rotate(-8deg);
          }
          72% {
            opacity: 1;
            transform: translate(-14px, 12px) scale(1.03) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }

        @keyframes idsVennEnterRight {
          0% {
            opacity: 0;
            transform: translate(220px, 200px) scale(0.55) rotate(22deg);
          }
          32% {
            opacity: 0.85;
            transform: translate(115px, 95px) scale(0.85) rotate(8deg);
          }
          72% {
            opacity: 1;
            transform: translate(14px, 12px) scale(1.03) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }

        .ids-venn-enter-top {
          animation: idsVennEnterTop 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 250px 160px;
        }
        .ids-venn-enter-left {
          animation: idsVennEnterLeft 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 185px 275px;
        }
        .ids-venn-enter-right {
          animation: idsVennEnterRight 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 315px 275px;
        }

        /* 2. Background Dim Light (Radiant Aura) Blooms in 3 Divisions */
        @keyframes idsVennAuraBloomTop {
          0% {
            opacity: 0;
            transform: scale(0.4);
          }
          60% {
            opacity: 0.55;
            transform: scale(1.08);
          }
          100% {
            opacity: 0.20;
            transform: scale(1);
          }
        }

        @keyframes idsVennAuraBloomLeft {
          0% {
            opacity: 0;
            transform: scale(0.4);
          }
          60% {
            opacity: 0.55;
            transform: scale(1.08);
          }
          100% {
            opacity: 0.20;
            transform: scale(1);
          }
        }

        @keyframes idsVennAuraBloomRight {
          0% {
            opacity: 0;
            transform: scale(0.4);
          }
          60% {
            opacity: 0.55;
            transform: scale(1.08);
          }
          100% {
            opacity: 0.20;
            transform: scale(1);
          }
        }

        .ids-aura-bloom-1 {
          animation: idsVennAuraBloomTop 1.1s cubic-bezier(0.16, 1, 0.3, 1) 1.25s both;
          transform-origin: 250px 160px;
        }
        .ids-aura-bloom-2 {
          animation: idsVennAuraBloomLeft 1.1s cubic-bezier(0.16, 1, 0.3, 1) 1.35s both;
          transform-origin: 185px 275px;
        }
        .ids-aura-bloom-3 {
          animation: idsVennAuraBloomRight 1.1s cubic-bezier(0.16, 1, 0.3, 1) 1.45s both;
          transform-origin: 315px 275px;
        }

        /* 3. Continuous One-By-One Subtle Dim Light Flash Sequence */
        @keyframes idsFlashTop {
          0%, 33.3%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
            stroke-width: 1.5;
            stroke-opacity: 0.4;
          }
          6% {
            transform: scale(1.025);
            filter: drop-shadow(0 0 16px rgba(0, 163, 255, 0.65)) drop-shadow(0 0 6px rgba(56, 189, 248, 0.7)) brightness(1.12);
            stroke-width: 2.4;
            stroke-opacity: 0.9;
          }
          26% {
            transform: scale(1.02);
            filter: drop-shadow(0 0 13px rgba(0, 163, 255, 0.55)) drop-shadow(0 0 5px rgba(56, 189, 248, 0.6)) brightness(1.10);
            stroke-width: 2.2;
            stroke-opacity: 0.85;
          }
        }

        @keyframes idsFlashLeft {
          0%, 33.3%, 66.6%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
            stroke-width: 1.5;
            stroke-opacity: 0.4;
          }
          39.3% {
            transform: scale(1.025);
            filter: drop-shadow(0 0 16px rgba(225, 29, 72, 0.65)) drop-shadow(0 0 6px rgba(251, 113, 133, 0.7)) brightness(1.12);
            stroke-width: 2.4;
            stroke-opacity: 0.9;
          }
          59.3% {
            transform: scale(1.02);
            filter: drop-shadow(0 0 13px rgba(225, 29, 72, 0.55)) drop-shadow(0 0 5px rgba(251, 113, 133, 0.6)) brightness(1.10);
            stroke-width: 2.2;
            stroke-opacity: 0.85;
          }
        }

        @keyframes idsFlashRight {
          0%, 66.6%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
            stroke-width: 1.5;
            stroke-opacity: 0.4;
          }
          72.6% {
            transform: scale(1.025);
            filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.65)) drop-shadow(0 0 6px rgba(52, 211, 153, 0.7)) brightness(1.12);
            stroke-width: 2.4;
            stroke-opacity: 0.9;
          }
          92.6% {
            transform: scale(1.02);
            filter: drop-shadow(0 0 13px rgba(16, 185, 129, 0.55)) drop-shadow(0 0 5px rgba(52, 211, 153, 0.6)) brightness(1.10);
            stroke-width: 2.2;
            stroke-opacity: 0.85;
          }
        }

        /* Ambient Subtle Dim Light for Background Radiant Auras */
        @keyframes idsAuraFlashTop {
          0%, 33.3%, 100% {
            opacity: 0.12;
            transform: scale(0.98);
          }
          6%, 26% {
            opacity: 0.65;
            transform: scale(1.06);
          }
        }

        @keyframes idsAuraFlashLeft {
          0%, 33.3%, 66.6%, 100% {
            opacity: 0.12;
            transform: scale(0.98);
          }
          39.3%, 59.3% {
            opacity: 0.65;
            transform: scale(1.06);
          }
        }

        @keyframes idsAuraFlashRight {
          0%, 66.6%, 100% {
            opacity: 0.12;
            transform: scale(0.98);
          }
          72.6%, 92.6% {
            opacity: 0.65;
            transform: scale(1.06);
          }
        }

        .ids-flash-top {
          animation: idsFlashTop 6.6s ease-in-out infinite;
          transform-origin: 250px 160px;
        }
        .ids-flash-left {
          animation: idsFlashLeft 6.6s ease-in-out infinite;
          transform-origin: 185px 275px;
        }
        .ids-flash-right {
          animation: idsFlashRight 6.6s ease-in-out infinite;
          transform-origin: 315px 275px;
        }

        .ids-aura-flash-top {
          animation: idsAuraFlashTop 6.6s ease-in-out infinite;
          transform-origin: 250px 160px;
        }
        .ids-aura-flash-left {
          animation: idsAuraFlashLeft 6.6s ease-in-out infinite;
          transform-origin: 185px 275px;
        }
        .ids-aura-flash-right {
          animation: idsAuraFlashRight 6.6s ease-in-out infinite;
          transform-origin: 315px 275px;
        }

        /* Fallback Floating Keyframes */
        @keyframes idsFloatTop {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes idsFloatLeft {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-3.5px, 2.5px); }
        }
        @keyframes idsFloatRight {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(3.5px, 2.5px); }
        }
        .ids-float-top {
          animation: idsFloatTop 5s ease-in-out infinite;
          transform-origin: 250px 160px;
        }
        .ids-float-left {
          animation: idsFloatLeft 5.6s ease-in-out infinite;
          transform-origin: 185px 275px;
        }
        .ids-float-right {
          animation: idsFloatRight 6.2s ease-in-out infinite;
          transform-origin: 315px 275px;
        }
      `}</style>

      {/* ─── MAIN PLATFORM CARD ─── */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-7 space-y-6 transition-all duration-300">

        {/* ─── 3-COLUMN EXECUTIVE VENN ARCHITECTURE LAYOUT ─── */}
        {viewMode === 'venn3' || viewMode === 'ikigai' ? (
          <div
            className="w-full"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* ─── ARCHITECTURE LAYOUT: MOBILE 2-COL + DESKTOP 3-COL (EXACT IMAGE 2 REPLICA) ─── */}
            <div className="grid grid-cols-12 gap-2.5 xs:gap-3 sm:gap-4 lg:gap-5 xl:gap-6 items-center">

              {/* ─── CENTER COLUMN (DIAGRAM ONLY ON MOBILE): Order 1 on Mobile, Center Column on Desktop ─── */}
              <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 py-1 sm:py-2 gap-2 sm:gap-3">
                <div
                  className="w-full flex justify-center"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'scale(1)' : 'scale(0.9)',
                    transition: 'opacity 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {viewMode === 'venn3' ? (
                    <Venn3ArchitectureDiagram
                      hasAnimated={hasAnimated}
                      activeFilter={activeFilter}
                      onSelectPillar={handlePillarSelect}
                      onResetAll={() => {
                        setActiveFilter('all');
                        setSelectedCard(null);
                      }}
                    />
                  ) : (
                    <IkigaiDiagram
                      activeSector={activeSector}
                      onSelectSector={handleSectorSelect}
                      onResetAll={() => {
                        setActiveFilter('all');
                        setActiveSector(null);
                        setSelectedCard(null);
                      }}
                    />
                  )}
                </div>

                {/* Node 09: Development Tools - Desktop only in center column */}
                {devToolsCard && (
                  <div
                    className="hidden lg:block w-full max-w-[480px]"
                    style={{
                      opacity: hasAnimated ? 1 : 0,
                      transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                      transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) 2300ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 2300ms',
                    }}
                  >
                    <IkigaiCalloutCard
                      card={devToolsCard}
                      isSelected={selectedCard === devToolsCard.num}
                      isDimmed={activeFilter !== 'all' && devToolsCard.pillarId !== activeFilter}
                      onSelect={() => setSelectedCard(selectedCard === devToolsCard.num ? null : devToolsCard.num)}
                      align="center"
                    />
                  </div>
                )}
              </div>

              {/* ─── LEFT COLUMN: Machine Learning & Analysis (Nodes 01-04) ─── */}
              <div className="col-span-6 lg:col-span-3 space-y-2 sm:space-y-3.5 order-2 lg:order-1">
                <div
                  className="flex items-center gap-1.5 sm:gap-2 pb-1 border-b border-slate-100"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1) 1300ms, transform 550ms cubic-bezier(0.16, 1, 0.3, 1) 1300ms',
                  }}
                >
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#0284C7] animate-pulse"></span>
                  <h4 className="text-[10px] xs:text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-700 truncate">
                    Machine Learning
                  </h4>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {mlCards.map((card, idx) => {
                    const isSelected = selectedCard === card.num;
                    const isDimmed = activeFilter !== 'all' && card.pillarId !== activeFilter;
                    const cardDelay = 1400 + idx * 220;

                    return (
                      <div
                        key={card.num}
                        style={{
                          opacity: hasAnimated ? 1 : 0,
                          transform: hasAnimated ? 'translate(0, 0) scale(1)' : 'translate(-28px, 14px) scale(0.96)',
                          transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms`,
                        }}
                      >
                        <IkigaiCalloutCard
                          card={card}
                          isSelected={isSelected}
                          isDimmed={isDimmed}
                          onSelect={() => setSelectedCard(isSelected ? null : card.num)}
                          align="left"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ─── RIGHT COLUMN: Web Development & Data Storage (Nodes 05-08) ─── */}
              <div className="col-span-6 lg:col-span-3 space-y-2 sm:space-y-3.5 order-3">
                <div
                  className="flex items-center gap-1.5 sm:gap-2 pb-1 border-b border-slate-100"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1) 1350ms, transform 550ms cubic-bezier(0.16, 1, 0.3, 1) 1350ms',
                  }}
                >
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#D97706] animate-pulse"></span>
                  <h4 className="text-[10px] xs:text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-700 truncate">
                    Web &amp; Storage
                  </h4>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {webAndDataCards.map((card, idx) => {
                    const isSelected = selectedCard === card.num;
                    const isDimmed = activeFilter !== 'all' && card.pillarId !== activeFilter;
                    const cardDelay = 1480 + idx * 220;

                    return (
                      <div
                        key={card.num}
                        style={{
                          opacity: hasAnimated ? 1 : 0,
                          transform: hasAnimated ? 'translate(0, 0) scale(1)' : 'translate(28px, 14px) scale(0.96)',
                          transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${cardDelay}ms`,
                        }}
                      >
                        <IkigaiCalloutCard
                          card={card}
                          isSelected={isSelected}
                          isDimmed={isDimmed}
                          onSelect={() => setSelectedCard(isSelected ? null : card.num)}
                          align="right"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ─── NODE 09: Development Tools - Mobile only centered across bottom ─── */}
              {devToolsCard && (
                <div
                  className="col-span-12 block lg:hidden w-full order-4 pt-1"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                    transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) 2300ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 2300ms',
                  }}
                >
                  <IkigaiCalloutCard
                    card={devToolsCard}
                    isSelected={selectedCard === devToolsCard.num}
                    isDimmed={activeFilter !== 'all' && devToolsCard.pillarId !== activeFilter}
                    onSelect={() => setSelectedCard(selectedCard === devToolsCard.num ? null : devToolsCard.num)}
                    align="center"
                  />
                </div>
              )}

            </div>
          </div>
        ) : (
          /* ─── VIEW 3: 3x3 EXECUTIVE GRID (IMAGE 1 REPLICA) ─── */
          <div className="w-full pt-2 pb-2 pl-4 sm:pl-5 pr-2 sm:pr-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-9">
              {TECH_CARDS.filter((c) => activeFilter === 'all' || c.pillarId === activeFilter).map((card, idx) => (
                <div
                  key={card.num}
                  className="w-full flex"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms`,
                  }}
                >
                  <NineTemplateCard
                    item={card}
                    isSelected={selectedCard === card.num}
                    onSelect={() => setSelectedCard(selectedCard === card.num ? null : card.num)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

/**
 * IkigaiCalloutCard Component
 * Recreates the presentation callout blocks from Image 2:
 * - Vertical accent bar on the outer edge (matching Image 2's callout pointer lines)
 * - Category pill with node number
 * - Technology title with official brand logo
 * - 3 crisp bullet points with colored dots
 * - Monospace code snippet & metric tag bar
 */
function IkigaiCalloutCard({ card, isSelected, isDimmed, onSelect, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div
      onClick={onSelect}
      className={`relative w-full bg-white rounded-xl sm:rounded-2xl border p-2 xs:p-2.5 sm:p-3.5 flex flex-col justify-between cursor-pointer select-text transition-all duration-300 group ${
        isCenter ? 'border-t-4' : align === 'left' ? 'border-l-4' : 'border-r-4'
      } ${
        isSelected
          ? 'border-slate-800 shadow-lg ring-2 ring-slate-800/20 z-20'
          : isDimmed
          ? 'opacity-35 border-slate-200 shadow-2xs hover:opacity-100 hover:shadow-md'
          : 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 z-10'
      }`}
      style={{
        [isCenter ? 'borderTopColor' : align === 'left' ? 'borderLeftColor' : 'borderRightColor']: card.color,
      }}
    >
      {/* Top Row: Category Pill & Brand Logo */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
        <div
          className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-white text-[9px] xs:text-[10px] sm:text-[11.5px] font-extrabold tracking-wide flex items-center shadow-2xs shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: card.color }}
        >
          <span className="truncate max-w-[110px] xs:max-w-[135px] sm:max-w-[175px]">{card.category}</span>
        </div>
        <div className="shrink-0 scale-90 sm:scale-110 flex items-center justify-center transition-transform duration-300 group-hover:scale-120 group-hover:rotate-2">
          {card.logo}
        </div>
      </div>

      {/* Content: Title & Bullet Points */}
      <div className="my-1 sm:my-1.5">
        <h4
          className="text-[10.5px] xs:text-[11.5px] sm:text-[13px] font-black text-slate-900 tracking-tight leading-tight line-clamp-1"
          title={card.title}
        >
          {card.title}
        </h4>

        {/* 3 Bullet Points: Horizontal grid if center, vertical list if side */}
        {isCenter ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 mt-1 sm:mt-2 pt-1 sm:pt-1.5 border-t border-slate-100">
            {card.bullets.map((b, bi) => (
              <div key={bi} className="flex items-center gap-1 sm:gap-1.5 text-[9px] xs:text-[9.5px] sm:text-[10.5px] text-slate-600 leading-tight">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: card.color }}
                />
                <span className="truncate font-medium">{b}</span>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5 mt-1 sm:mt-1.5 mb-0.5 sm:mb-1">
            {card.bullets.map((b, bi) => (
              <li key={bi} className="flex items-start gap-1 sm:gap-1.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] text-slate-600 leading-tight">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1 shrink-0 transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: card.color }}
                />
                <span className="line-clamp-1 font-medium">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

/**
 * NineTemplateCard Component
 * 1:1 recreation of the card anatomy from Image 1 / Image 2 Nine Roles Template
 */
function NineTemplateCard({ item, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative w-full bg-[#F3F4F6] hover:bg-white rounded-2xl border transition-all duration-300 pt-8 sm:pt-9 pb-5 pl-10 sm:pl-11 pr-5 sm:pr-6 flex flex-col justify-between cursor-pointer select-text group ${
        isSelected
          ? 'border-slate-400 shadow-md ring-2 ring-slate-400/20'
          : 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300'
      }`}
      title={`${item.title} (${item.category})`}
    >
      {/* ─── 1. TOP PILL HEADER ─── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 px-5 sm:px-6 py-1.5 rounded-b-2xl text-white font-bold text-xs sm:text-[13px] tracking-wide shadow-xs whitespace-nowrap flex items-center z-20 transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: item.color }}
      >
        <span>{item.category}</span>
      </div>

      {/* ─── 2. LEFT PROTRUDING SEMI-CIRCLE ICON TAB ─── */}
      <div className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center select-none pointer-events-none">
        <div
          className="absolute -left-3 w-6 h-13 rounded-l-full shadow-2xs transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: item.color }}
        />
        <div className="relative w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200/70 flex items-center justify-center text-slate-700 transition-transform duration-300 group-hover:scale-110">
          <i
            className={`fa-solid ${item.icon} text-sm drop-shadow-2xs`}
            style={{ color: item.color }}
          ></i>
        </div>
      </div>

      {/* ─── 3. CARD BODY TOP: TITLE & OFFICIAL BRAND LOGO ─── */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-[15px] sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
              {item.title}
            </h4>
          </div>
          <div className="shrink-0 mt-0.5">
            {item.logo}
          </div>
        </div>

        {/* ─── 4. BULLET POINTS ─── */}
        <ul className="space-y-1.5 mt-3 mb-3">
          {item.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs sm:text-[12.5px] text-slate-700 leading-snug"
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-slate-600">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

/**
 * Venn3ArchitectureDiagram Component
 * 1:1 replica of the 3 Round Color Shape Venn Diagram from Image 2:
 * - Top Blue Circle: "Machine Learning & Analysis" with cloud-cluster pill icon and Python/Scikit/Algo/NumPy/pandas
 *   Radiant cyan glowing aura behind it.
 * - Bottom-Left Rose/Magenta Circle: "Web Development & Interface" with desktop monitor icon and Django/HTML/CSS/JS
 * - Bottom-Right Emerald/Teal Circle: "Data & Storage" with database cylinder icon and NSL-KDD/SQL
 * - Multiply blend mode for natural overlapping hues (purple, ocean cyan, midnight core)
 * - Central luminous "IDS CORE" badge linking all 9 nodes
 * - Radiating architectural dashed callout lines connecting to flanking cards
 */
function Venn3ArchitectureDiagram({ hasAnimated, activeFilter, onSelectPillar, onResetAll }) {
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    if (hasAnimated) {
      const timer = setTimeout(() => {
        setIsAssembled(true);
      }, 1650);
      return () => clearTimeout(timer);
    } else {
      setIsAssembled(false);
    }
  }, [hasAnimated]);

  return (
    <div className="flex flex-col items-center justify-center py-1 sm:py-2 w-full">
      <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center">
        <svg
          className="w-full h-full drop-shadow-sm select-none overflow-visible"
          viewBox="0 0 500 480"
          fill="none"
        >
          <defs>
            {/* Ambient Cyan Aura behind Top Circle (Image 2 Replica) */}
            <radialGradient id="topBlueGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#0284C7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>

            {/* Soft Ambient Glows for Lower Circles */}
            <radialGradient id="leftRoseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.70" />
              <stop offset="50%" stopColor="#E11D48" stopOpacity="0.40" />
              <stop offset="85%" stopColor="#E11D48" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#E11D48" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rightTealGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.70" />
              <stop offset="50%" stopColor="#0D9488" stopOpacity="0.40" />
              <stop offset="85%" stopColor="#0D9488" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
            </radialGradient>

            {/* Blur filter for the radiant aura */}
            <filter id="softGlowBlur" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="22" />
            </filter>

            {/* Drop shadow for 3D depth */}
            <filter id="circleDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.14" />
            </filter>

            {/* Luminous linear gradients for the 3 round shapes */}
            {/* 1. Top Blue Sphere */}
            <linearGradient id="mlBlueGrad" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="55%" stopColor="#0084FF" />
              <stop offset="100%" stopColor="#025996" />
            </linearGradient>

            {/* 2. Bottom-Left Rose Sphere */}
            <linearGradient id="webRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="45%" stopColor="#E11D48" />
              <stop offset="85%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>

            {/* 3. Bottom-Right Teal Sphere */}
            <linearGradient id="dataTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="45%" stopColor="#10B981" />
              <stop offset="85%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
          </defs>

          {/* ── 1. BACKGROUND RADIANT AURAS: Dim Light in 3 Divisions (Blooms, then flashes one by one) ── */}
          <circle
            cx="250"
            cy="160"
            r="140"
            fill="url(#topBlueGlow)"
            filter="url(#softGlowBlur)"
            className={`pointer-events-none transition-opacity duration-500 ${
              !hasAnimated
                ? 'opacity-0'
                : !isAssembled
                ? 'ids-aura-bloom-1'
                : activeFilter === 'all'
                ? 'ids-aura-flash-top'
                : activeFilter === 1
                ? 'opacity-65 scale-106'
                : 'opacity-15'
            }`}
          />
          <circle
            cx="185"
            cy="275"
            r="140"
            fill="url(#leftRoseGlow)"
            filter="url(#softGlowBlur)"
            className={`pointer-events-none transition-opacity duration-500 ${
              !hasAnimated
                ? 'opacity-0'
                : !isAssembled
                ? 'ids-aura-bloom-2'
                : activeFilter === 'all'
                ? 'ids-aura-flash-left'
                : activeFilter === 2
                ? 'opacity-65 scale-106'
                : 'opacity-15'
            }`}
          />
          <circle
            cx="315"
            cy="275"
            r="140"
            fill="url(#rightTealGlow)"
            filter="url(#softGlowBlur)"
            className={`pointer-events-none transition-opacity duration-500 ${
              !hasAnimated
                ? 'opacity-0'
                : !isAssembled
                ? 'ids-aura-bloom-3'
                : activeFilter === 'all'
                ? 'ids-aura-flash-right'
                : activeFilter === 3
                ? 'opacity-65 scale-106'
                : 'opacity-15'
            }`}
          />

          {/* ── 2. THE 3 OVERLAPPING ROUND COLOR SPHERES (MULTIPLY BLEND) ── */}
          <g style={{ mixBlendMode: 'multiply' }}>
            {/* Top Circle: Machine Learning & Analysis (Slowly coming from top, then flashes one by one) */}
            <circle
              cx="250"
              cy="160"
              r="125"
              fill="url(#mlBlueGrad)"
              fillOpacity="0.88"
              stroke="#FFFFFF"
              strokeWidth={activeFilter === 1 ? '3' : '1.5'}
              strokeOpacity={activeFilter === 1 ? '1' : '0.4'}
              filter="url(#circleDropShadow)"
              className={`transition-all duration-300 cursor-pointer hover:opacity-95 ${
                !hasAnimated
                  ? 'opacity-0'
                  : !isAssembled
                  ? 'ids-venn-enter-top'
                  : activeFilter === 'all'
                  ? 'ids-flash-top'
                  : activeFilter === 1
                  ? 'scale-105 brightness-112'
                  : 'opacity-70'
              }`}
              style={{
                transformOrigin: '250px 160px',
                transform: isAssembled && activeFilter === 1 ? 'scale(1.04)' : undefined,
              }}
              onClick={() => onSelectPillar(1)}
            />

            {/* Bottom-Left Circle: Web Development & Interface (Slowly coming from left bottom, then flashes one by one) */}
            <circle
              cx="185"
              cy="275"
              r="125"
              fill="url(#webRoseGrad)"
              fillOpacity="0.88"
              stroke="#FFFFFF"
              strokeWidth={activeFilter === 2 ? '3' : '1.5'}
              strokeOpacity={activeFilter === 2 ? '1' : '0.4'}
              filter="url(#circleDropShadow)"
              className={`transition-all duration-300 cursor-pointer hover:opacity-95 ${
                !hasAnimated
                  ? 'opacity-0'
                  : !isAssembled
                  ? 'ids-venn-enter-left'
                  : activeFilter === 'all'
                  ? 'ids-flash-left'
                  : activeFilter === 2
                  ? 'scale-105 brightness-112'
                  : 'opacity-70'
              }`}
              style={{
                transformOrigin: '185px 275px',
                transform: isAssembled && activeFilter === 2 ? 'scale(1.04)' : undefined,
              }}
              onClick={() => onSelectPillar(2)}
            />

            {/* Bottom-Right Circle: Data & Storage (Slowly coming from right bottom, then flashes one by one - Image 2 Replica) */}
            <circle
              cx="315"
              cy="275"
              r="125"
              fill="url(#dataTealGrad)"
              fillOpacity="0.88"
              stroke="#FFFFFF"
              strokeWidth={activeFilter === 3 ? '3' : '1.5'}
              strokeOpacity={activeFilter === 3 ? '1' : '0.4'}
              filter="url(#circleDropShadow)"
              className={`transition-all duration-300 cursor-pointer hover:opacity-95 ${
                !hasAnimated
                  ? 'opacity-0'
                  : !isAssembled
                  ? 'ids-venn-enter-right'
                  : activeFilter === 'all'
                  ? 'ids-flash-right'
                  : activeFilter === 3
                  ? 'scale-105 brightness-112'
                  : 'opacity-70'
              }`}
              style={{
                transformOrigin: '315px 275px',
                transform: isAssembled && activeFilter === 3 ? 'scale(1.04)' : undefined,
              }}
              onClick={() => onSelectPillar(3)}
            />
          </g>

          {/* ── 4. HIGH-CONTRAST PURE WHITE TEXT & ICONS LAYER (NO MULTIPLY) ── */}

          {/* ── 4A. TOP SPHERE CONTENT: Machine Learning & Analysis ── */}
          <g
            className={`cursor-pointer transition-transform duration-300 select-none group ${
              !hasAnimated
                ? 'opacity-0'
                : !isAssembled
                ? 'ids-venn-enter-top'
                : activeFilter === 'all'
                ? 'ids-flash-top'
                : activeFilter === 1
                ? 'scale-105'
                : 'opacity-85'
            }`}
            style={{
              transformOrigin: '250px 160px',
              transform: isAssembled && activeFilter === 1 ? 'scale(1.04)' : undefined,
            }}
            onClick={() => onSelectPillar(1)}
          >
            {/* Title */}
            <text
              x="250"
              y="82"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="15"
              fontWeight="900"
              letterSpacing="0.2px"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
            >
              Machine Learning
            </text>
            <text
              x="250"
              y="101"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="15"
              fontWeight="900"
              letterSpacing="0.2px"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
            >
              &amp; Analysis
            </text>

            {/* Icon: White cloud cluster pill with 3 cyan dots from Image 2 */}
            <g transform="translate(231, 116)" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              <path
                d="M 11 20 C 6 20 2 16.5 2 12 C 2 7.8 5.8 4.5 10 4.2 C 12 1.8 15 0.5 18.5 0.5 C 23.5 0.5 27.5 3.2 28.5 7.5 C 32.5 8 35.5 11 35.5 15 C 35.5 18.5 32.5 20 28.5 20 Z"
                fill="#FFFFFF"
              />
              <circle cx="12" cy="12" r="2.2" fill="#0284C7" />
              <circle cx="19" cy="9.5" r="2.4" fill="#0284C7" />
              <circle cx="26" cy="13" r="2" fill="#0284C7" />
            </g>

            {/* Overlap Technologies Text */}
            <text
              x="250"
              y="160"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.1px"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
            >
              Python, Scikit-learn,
            </text>
            <text
              x="250"
              y="176"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.1px"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
            >
              Algorithms, NumPy, pandas
            </text>
          </g>

          {/* ── 4B. BOTTOM-LEFT SPHERE CONTENT: Web Development & Interface ── */}
          <g
            className={`cursor-pointer transition-transform duration-300 select-none group ${
              !hasAnimated
                ? 'opacity-0'
                : !isAssembled
                ? 'ids-venn-enter-left'
                : activeFilter === 'all'
                ? 'ids-flash-left'
                : activeFilter === 2
                ? 'scale-105'
                : 'opacity-85'
            }`}
            style={{
              transformOrigin: '185px 275px',
              transform: isAssembled && activeFilter === 2 ? 'scale(1.04)' : undefined,
            }}
            onClick={() => onSelectPillar(2)}
          >
            {/* Title */}
            <text
              x="140"
              y="265"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="900"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
            >
              Web Development
            </text>
            <text
              x="140"
              y="282"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="900"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
            >
              &amp; Interface
            </text>

            {/* Icon: Desktop monitor from Image 2 */}
            <g transform="translate(127, 296)" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              <rect x="1" y="1" width="24" height="16" rx="2.5" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
              <line x1="5" y1="13" x2="9" y2="13" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="13" cy="13" r="1" fill="#FFFFFF" />
              <circle cx="17" cy="13" r="1" fill="#FFFFFF" />
              <line x1="13" y1="17" x2="13" y2="21" stroke="#FFFFFF" strokeWidth="2.2" />
              <line x1="8" y1="21" x2="18" y2="21" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* Technologies */}
            <text
              x="140"
              y="336"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10.5"
              fontWeight="700"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
            >
              Django, HTML, CSS,
            </text>
            <text
              x="140"
              y="350"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10.5"
              fontWeight="700"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
            >
              JavaScript
            </text>
          </g>

          {/* ── 4C. BOTTOM-RIGHT SPHERE CONTENT: Data & Storage ── */}
          <g
            className={`cursor-pointer transition-transform duration-300 select-none group ${
              !hasAnimated
                ? 'opacity-0'
                : !isAssembled
                ? 'ids-venn-enter-right'
                : activeFilter === 'all'
                ? 'ids-flash-right'
                : activeFilter === 3
                ? 'scale-105'
                : 'opacity-85'
            }`}
            style={{
              transformOrigin: '315px 275px',
              transform: isAssembled && activeFilter === 3 ? 'scale(1.04)' : undefined,
            }}
            onClick={() => onSelectPillar(3)}
          >
            {/* Title */}
            <text
              x="360"
              y="273"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="14.5"
              fontWeight="900"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
            >
              Data &amp; Storage
            </text>

            {/* Icon: Database cylinder from Image 2 */}
            <g transform="translate(348, 292)" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              <ellipse cx="12" cy="5" rx="11" ry="4" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
              <path d="M 1 5 v 6 c 0 2.2 4.9 4 11 4 s 11 -1.8 11 -4 v -6" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
              <path d="M 1 11 v 6 c 0 2.2 4.9 4 11 4 s 11 -1.8 11 -4 v -6" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
            </g>

            {/* Technologies */}
            <text
              x="360"
              y="336"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10.5"
              fontWeight="700"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
            >
              NSL-KDD, SQL
            </text>
            <text
              x="360"
              y="350"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10.5"
              fontWeight="700"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
            >
              (SQLite/MySQL)
            </text>
          </g>


        </svg>
      </div>
    </div>
  );
}

/**
 * IkigaiDiagram Component
 * Preserves the 4-Circle Ikigai Architecture Diagram option
 */
function IkigaiDiagram({ activeSector, onSelectSector, onResetAll }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 w-full">
      <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
        <svg
          className="w-full h-full drop-shadow-sm select-none"
          viewBox="0 0 460 460"
          fill="none"
        >
          <defs>
            <clipPath id="clipTopCircle">
              <circle cx="230" cy="165" r="115" />
            </clipPath>
            <clipPath id="clipRightCircle">
              <circle cx="295" cy="230" r="115" />
            </clipPath>
            <clipPath id="clipBottomCircle">
              <circle cx="230" cy="295" r="115" />
            </clipPath>
            <clipPath id="clipLeftCircle">
              <circle cx="165" cy="230" r="115" />
            </clipPath>
            <filter id="ikigaiShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Top Circle: What you LOVE */}
          <circle
            cx="230"
            cy="165"
            r="115"
            fill="#F8FAFC"
            fillOpacity="0.85"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            className={`transition-all duration-300 cursor-pointer hover:stroke-sky-400 ${
              activeSector === 'love' ? 'stroke-sky-500 stroke-2 fill-sky-50/40' : ''
            }`}
            onClick={() => onSelectSector('love')}
          />

          {/* Bottom Circle: What you can be PAID FOR */}
          <circle
            cx="230"
            cy="295"
            r="115"
            fill="#F8FAFC"
            fillOpacity="0.85"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            className={`transition-all duration-300 cursor-pointer hover:stroke-teal-400 ${
              activeSector === 'paid' ? 'stroke-teal-500 stroke-2 fill-teal-50/40' : ''
            }`}
            onClick={() => onSelectSector('paid')}
          />

          {/* Left Circle: What you are GOOD AT */}
          <circle
            cx="165"
            cy="230"
            r="115"
            fill="#F8FAFC"
            fillOpacity="0.85"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            className={`transition-all duration-300 cursor-pointer hover:stroke-amber-400 ${
              activeSector === 'good' ? 'stroke-amber-500 stroke-2 fill-amber-50/40' : ''
            }`}
            onClick={() => onSelectSector('good')}
          />

          {/* Right Circle: What the world NEEDS */}
          <circle
            cx="295"
            cy="230"
            r="115"
            fill="#F8FAFC"
            fillOpacity="0.85"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            className={`transition-all duration-300 cursor-pointer hover:stroke-rose-400 ${
              activeSector === 'needs' ? 'stroke-rose-500 stroke-2 fill-rose-50/40' : ''
            }`}
            onClick={() => onSelectSector('needs')}
          />

          {/* Top-Right Petal: MISSION */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ transformOrigin: '280px 180px' }}
            onClick={() => onSelectSector('love')}
          >
            <circle
              cx="295"
              cy="230"
              r="115"
              clipPath="url(#clipTopCircle)"
              fill="#F59E0B"
              fillOpacity="0.9"
              stroke="#D97706"
              strokeWidth="1"
              filter="url(#ikigaiShadow)"
            />
            <text x="272" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900" letterSpacing="0.5px">
              MISSION
            </text>
            <text x="272" y="190" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" opacity="0.9">
              98.4% Acc
            </text>
          </g>

          {/* Bottom-Right Petal: VOCATION */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ transformOrigin: '280px 280px' }}
            onClick={() => onSelectSector('needs')}
          >
            <circle
              cx="295"
              cy="230"
              r="115"
              clipPath="url(#clipBottomCircle)"
              fill="#EF4444"
              fillOpacity="0.9"
              stroke="#DC2626"
              strokeWidth="1"
              filter="url(#ikigaiShadow)"
            />
            <text x="272" y="276" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900" letterSpacing="0.5px">
              VOCATION
            </text>
            <text x="272" y="288" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" opacity="0.9">
              NSL-KDD
            </text>
          </g>

          {/* Top-Left Petal: PASSION */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ transformOrigin: '180px 180px' }}
            onClick={() => onSelectSector('love')}
          >
            <circle
              cx="165"
              cy="230"
              r="115"
              clipPath="url(#clipTopCircle)"
              fill="#0284C7"
              fillOpacity="0.88"
              stroke="#0369A1"
              strokeWidth="1"
              filter="url(#ikigaiShadow)"
            />
            <text x="188" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900" letterSpacing="0.5px">
              PASSION
            </text>
            <text x="188" y="190" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" opacity="0.9">
              ML Pipeline
            </text>
          </g>

          {/* Bottom-Left Petal: PROFESSION */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ transformOrigin: '180px 280px' }}
            onClick={() => onSelectSector('good')}
          >
            <circle
              cx="165"
              cy="230"
              r="115"
              clipPath="url(#clipBottomCircle)"
              fill="#8B5CF6"
              fillOpacity="0.88"
              stroke="#7C3AED"
              strokeWidth="1"
              filter="url(#ikigaiShadow)"
            />
            <text x="188" y="276" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900" letterSpacing="0.5px">
              PROFESSION
            </text>
            <text x="188" y="288" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" opacity="0.9">
              Web Engine
            </text>
          </g>

          {/* Outer Sector Labels */}
          <g className="cursor-pointer" onClick={() => onSelectSector('love')}>
            <text x="230" y="82" textAnchor="middle" fill="#64748B" fontSize="8.5" fontWeight="600">What you LOVE</text>
            <text x="230" y="97" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="900">MACHINE LEARNING</text>
          </g>
          <g className="cursor-pointer" onClick={() => onSelectSector('needs')}>
            <text x="368" y="224" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">What the world</text>
            <text x="368" y="237" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="900">NEEDS</text>
          </g>
          <g className="cursor-pointer" onClick={() => onSelectSector('paid')}>
            <text x="230" y="368" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">What you can be</text>
            <text x="230" y="381" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="900">PAID FOR</text>
          </g>
          <g className="cursor-pointer" onClick={() => onSelectSector('good')}>
            <text x="92" y="224" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">What you are</text>
            <text x="92" y="237" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="900">GOOD AT</text>
          </g>

          {/* Center Squircle Badge: IDS CORE */}
          <g className="cursor-pointer transition-transform duration-300 hover:scale-105" onClick={onResetAll}>
            <circle cx="230" cy="230" r="38" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 3" className="animate-spin" style={{ animationDuration: '14s' }} />
            <rect x="195" y="205" width="70" height="50" rx="16" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#ikigaiShadow)" />
            <text x="230" y="228" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="0.5px">IDS</text>
            <text x="230" y="243" textAnchor="middle" fill="#38BDF8" fontSize="8.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="1px">CORE</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
