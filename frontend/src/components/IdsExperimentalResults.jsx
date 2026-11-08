import React, { useState, useEffect, useRef } from 'react';

/**
 * IdsExperimentalResults
 * 100% native React, DOM & SVG implementation of the
 * "Experimental Results - Intrusion Detection System (IDS)" Infographic Platform.
 * 
 * Based directly on user reference specification (NO static raster image):
 * - Top Header: "07 Experimental Results" + "Intrusion Detection System (IDS)"
 * - Left/Center 6 Cards:
 *   1. Dataset Information (NSL-KDD, 125,973 records, 41 features, 5 classes)
 *   2. Model Performance Comparison (Random Forest vs SVM metrics)
 *   3. Confusion Matrix (Random Forest) (Heatmap with highlighted diagonals)
 *   4. Accuracy Comparison (Real-time down-to-up growing bars & count-up: 98.6%, 98.0%, 99.0%, 99.0%)
 *   5. Classification Report (Random Forest) (Precision, Recall, F1-Score, Support)
 *   6. Detection Results (Sample) (5 sample predictions with green Correct badges)
 * - Right Area:
 *   7. IDS Experimental Analysis (6-petal circular diagram with central IDS badge and rotating flow)
 *   8. Key Findings (5 numbered points with solid colored circle badges)
 * - Bottom Verification Note
 * 
 * Razor-sharp, responsive, selectable DOM text, and accessible.
 */

const ACCURACY_BARS = [
  {
    name: 'Random Forest',
    target: 98.6,
    gradient: 'from-[#7C3AED] to-[#A855F7]',
    border: 'border-purple-200',
    color: '#7C3AED',
  },
  {
    name: 'Decision Tree',
    target: 98.0,
    gradient: 'from-[#0284C7] to-[#38BDF8]',
    border: 'border-blue-200',
    color: '#0284C7',
  },
  {
    name: 'XGBoost',
    target: 99.0,
    gradient: 'from-[#059669] to-[#34D399]',
    border: 'border-emerald-200',
    color: '#059669',
  },
  {
    name: 'Extra Trees',
    target: 99.0,
    gradient: 'from-[#D97706] to-[#F59E0B]',
    border: 'border-amber-200',
    color: '#D97706',
  },
];

export default function IdsExperimentalResults() {
  const [cycleStep, setCycleStep] = useState(0);
  const activePetal = (cycleStep % 6) + 1;
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Automated Clockwise Rotation Animation (cycles smoothly through the 6 petals)
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setCycleStep((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleSelectPetal = (petalNum) => {
    const currentIdx = cycleStep % 6;
    const targetIdx = petalNum - 1;
    const diff = (targetIdx - currentIdx + 6) % 6;
    setCycleStep((prev) => prev + diff);
  };

  // Real-time Down-to-Up Count and Bar Growing Animation for Accuracy Comparison
  const [accuracyValues, setAccuracyValues] = useState([98.6, 98.0, 99.0, 99.0]);
  const [barProgress, setBarProgress] = useState(1);
  const accuracyCardRef = useRef(null);
  const rAFRef = useRef(null);

  const startAccuracyAnimation = () => {
    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
    }
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds smooth real-time count up

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic: energetic rise, smooth precision finish
      const ease = 1 - Math.pow(1 - progress, 3);

      setBarProgress(ease);
      setAccuracyValues([
        +(98.6 * ease).toFixed(1),
        +(98.0 * ease).toFixed(1),
        +(99.0 * ease).toFixed(1),
        +(99.0 * ease).toFixed(1),
      ]);

      if (progress < 1) {
        rAFRef.current = requestAnimationFrame(animate);
      } else {
        setBarProgress(1);
        setAccuracyValues([98.6, 98.0, 99.0, 99.0]);
      }
    };

    setBarProgress(0);
    setAccuracyValues([0, 0, 0, 0]);
    rAFRef.current = requestAnimationFrame(animate);
  };

  // Replay animation on page refresh and on scroll into view
  useEffect(() => {
    startAccuracyAnimation();

    if (typeof IntersectionObserver === 'undefined') return;

    let isIntersecting = true;
    let timer = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isIntersecting) {
              isIntersecting = true;
              if (timer) clearTimeout(timer);
              timer = setTimeout(() => {
                startAccuracyAnimation();
              }, 40);
            }
          } else {
            isIntersecting = false;
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    if (accuracyCardRef.current) {
      observer.observe(accuracyCardRef.current);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      observer.disconnect();
    };
  }, []);

  // ─── 1. DATASET INFORMATION DATA ───
  const datasetInfo = [
    { param: 'Dataset', val: 'NSL-KDD' },
    { param: 'Total Records', val: '148,517' },
    { param: 'Training Records', val: '125,973' },
    { param: 'Testing Records', val: '22,544' },
    { param: 'Features', val: '41 (14 Selected via RFE)' },
    { param: 'Classes', val: 'Normal, DoS, Probe, R2L, U2R' },
  ];

  // ─── 2. MODEL PERFORMANCE DATA (FROM ACCURACY.HTML & NOTEBOOK) ───
  const modelPerformance = [
    {
      algo: 'Random Forest (Deployed)',
      acc: '98.60',
      prec: '98.50',
      rec: '98.70',
      f1: '98.60',
      highlight: 'bg-emerald-50/70 border-emerald-100 font-bold text-slate-900',
    },
    {
      algo: 'Decision Tree (DT)',
      acc: '98.00',
      prec: '97.80',
      rec: '98.10',
      f1: '97.95',
      highlight: 'bg-blue-50/70 border-blue-100 font-semibold text-slate-800',
    },
    {
      algo: 'XGBoost',
      acc: '99.00',
      prec: '98.90',
      rec: '99.10',
      f1: '99.00',
      highlight: 'bg-purple-50/70 border-purple-100 font-semibold text-slate-800',
    },
    {
      algo: 'Extra Trees',
      acc: '99.00',
      prec: '98.85',
      rec: '99.05',
      f1: '98.95',
      highlight: 'bg-slate-50/70 border-slate-100 font-semibold text-slate-800',
    },
  ];

  // ─── 3. CONFUSION MATRIX DATA (TEST SET TOTAL = 22,544 RECORDS) ───
  const matrixHeaders = ['Normal', 'DoS', 'Probe', 'R2L', 'U2R'];
  const confusionRows = [
    {
      actual: 'Normal',
      values: [
        { count: '9566', isDiag: true, bg: 'bg-[#0284C7] text-white font-black' },
        { count: '78', isDiag: false },
        { count: '45', isDiag: false },
        { count: '18', isDiag: false },
        { count: '4', isDiag: false },
      ],
    },
    {
      actual: 'DoS',
      values: [
        { count: '32', isDiag: false },
        { count: '7374', isDiag: true, bg: 'bg-[#0284C7] text-white font-black' },
        { count: '38', isDiag: false },
        { count: '12', isDiag: false },
        { count: '4', isDiag: false },
      ],
    },
    {
      actual: 'Probe',
      values: [
        { count: '22', isDiag: false },
        { count: '19', isDiag: false },
        { count: '2365', isDiag: true, bg: 'bg-[#38BDF8] text-white font-black' },
        { count: '11', isDiag: false },
        { count: '4', isDiag: false },
      ],
    },
    {
      actual: 'R2L',
      values: [
        { count: '94', isDiag: false },
        { count: '16', isDiag: false },
        { count: '18', isDiag: false },
        { count: '2748', isDiag: true, bg: 'bg-[#38BDF8] text-white font-black' },
        { count: '9', isDiag: false },
      ],
    },
    {
      actual: 'U2R',
      values: [
        { count: '7', isDiag: false },
        { count: '2', isDiag: false },
        { count: '2', isDiag: false },
        { count: '5', isDiag: false },
        { count: '51', isDiag: true, bg: 'bg-[#7DD3FC] text-slate-900 font-black' },
      ],
    },
  ];

  // ─── 5. CLASSIFICATION REPORT DATA (EXACT TEST SUPPORT) ───
  const classReport = [
    { cls: 'Normal', prec: '0.98', rec: '0.99', f1: '0.98', supp: '9,711' },
    { cls: 'DoS', prec: '0.98', rec: '0.99', f1: '0.99', supp: '7,460' },
    { cls: 'Probe', prec: '0.96', rec: '0.98', f1: '0.97', supp: '2,421' },
    { cls: 'R2L', prec: '0.98', rec: '0.95', f1: '0.97', supp: '2,885' },
    { cls: 'U2R', prec: '0.74', rec: '0.76', f1: '0.75', supp: '67' },
  ];

  // ─── 6. SAMPLE DETECTION RESULTS DATA ───
  const detectionSamples = [
    { no: 1, actual: 'Normal', pred: 'Normal' },
    { no: 2, actual: 'DoS', pred: 'DoS' },
    { no: 3, actual: 'Probe', pred: 'Probe' },
    { no: 4, actual: 'R2L', pred: 'R2L' },
    { no: 5, actual: 'U2R', pred: 'U2R' },
  ];

  // ─── 8. KEY FINDINGS DATA (EXTRACTED FROM INTRUSION PROJECT) ───
  const keyFindings = [
    {
      num: '01',
      badgeColor: '#007BFF',
      text: 'Random Forest achieved 98.60% test accuracy and was deployed as the production model (model.pkl).',
    },
    {
      num: '02',
      badgeColor: '#8B5CF6',
      text: 'Both Random Forest and Decision Tree demonstrated superior performance on NSL-KDD attacks.',
    },
    {
      num: '03',
      badgeColor: '#E11D48',
      text: 'Recursive Feature Elimination (RFE) & VIF isolated 14 critical features from 41 raw network parameters.',
    },
    {
      num: '04',
      badgeColor: '#F59E0B',
      text: 'NSL-KDD benchmark evaluated on 125,973 training records and 22,544 test records across 5 attack classes.',
    },
    {
      num: '05',
      badgeColor: '#10B981',
      text: 'Integrated Django web application performs real-time traffic classification and interactive attack detection.',
    },
  ];

  const renderCircularDiagram = (idPrefix = 'diag') => (
    <div className="p-3 sm:p-3.5 lg:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col items-center select-none">
      {/* ─── CARD 7: 7. IDS EXPERIMENTAL ANALYSIS (6-PETAL SVG DIAGRAM WITH ANIMATION) ─── */}
            
            <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] lg:max-w-[510px] aspect-square relative flex items-center justify-center">
              <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-md overflow-visible">
                <style>
                  {`
                    @keyframes rotateClockwise {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    @keyframes centerBadgePulse {
                      0%, 100% {
                        transform: scale(1);
                        filter: drop-shadow(0 4px 10px rgba(0, 98, 255, 0.25));
                      }
                      50% {
                        transform: scale(1.055);
                        filter: drop-shadow(0 6px 22px rgba(0, 98, 255, 0.55));
                      }
                    }
                  `}
                </style>

                <defs>
                  {/* Gradients for the 6 Petals (Unique IDs per SVG instance) */}
                  <linearGradient id={`${idPrefix}-p1-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                  <linearGradient id={`${idPrefix}-p2-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <linearGradient id={`${idPrefix}-p3-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#E11D48" />
                  </linearGradient>
                  <linearGradient id={`${idPrefix}-p4-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                  <linearGradient id={`${idPrefix}-p5-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84CC16" />
                    <stop offset="100%" stopColor="#4D7C0F" />
                  </linearGradient>
                  <linearGradient id={`${idPrefix}-p6-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#0F766E" />
                  </linearGradient>

                  {/* Central Badge Shadow */}
                  <filter id={`${idPrefix}-center-shadow`} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* ─── ROTATING OUTER AURA ORBIT RING ─── */}
                <circle
                  cx="250"
                  cy="250"
                  r="228"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  strokeOpacity="0.45"
                  style={{
                    transformOrigin: '250px 250px',
                    animation: 'rotateClockwise 24s linear infinite',
                    filter: 'drop-shadow(0 0 8px rgba(2, 132, 199, 0.3))',
                  }}
                />

                {/* ─── CLOCKWISE ORBITING ENERGY SPARK / LIGHT PULSE (SYNCHRONIZED WITH ACTIVE PETAL) ─── */}
                <g
                  style={{
                    transformOrigin: '250px 250px',
                    transform: `rotate(${cycleStep * 60}deg)`,
                    transition: 'transform 0.7s cubic-bezier(0.34, 1.25, 0.64, 1)',
                  }}
                >
                  <circle
                    cx="250"
                    cy="22"
                    r="7"
                    fill="#38BDF8"
                    style={{
                      filter: 'drop-shadow(0 0 12px #38BDF8) drop-shadow(0 0 6px #0077EE)',
                    }}
                  />
                  <circle cx="250" cy="22" r="3" fill="#ffffff" />
                </g>

                {/* ─── 6 CURVED PETAL SECTORS WITH STEP ANIMATION ─── */}
                <g>
                  {/* Petal 1: Top (Dataset NSL-KDD) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      transform: activePetal === 1 ? 'scale(1.06)' : 'scale(1)',
                      filter: activePetal === 1 ? 'drop-shadow(0 0 20px rgba(2, 132, 199, 0.85)) brightness(1.1)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => { handleSelectPetal(1); setIsAutoCycling(false); }}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => { handleSelectPetal(1); setIsAutoCycling((p) => !p); }}
                  >
                    <path
                      d="M 216.7 181.7 L 153.6 52.3 A 220 220 0 0 1 346.4 52.3 L 283.3 181.7 A 76 76 0 0 0 216.7 181.7 Z"
                      fill={`url(#${idPrefix}-p1-grad)`}
                      stroke={activePetal === 1 ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth={activePetal === 1 ? 2.5 : 1}
                    />
                    <g transform="translate(250, 110)" className="pointer-events-none select-none text-white text-center">
                      <rect x="-8" y="-40" width="3.5" height="12" rx="1" fill="#ffffff" />
                      <rect x="-2" y="-46" width="3.5" height="18" rx="1" fill="#ffffff" />
                      <rect x="4" y="-36" width="3.5" height="8" rx="1" fill="#ffffff" />
                      <text x="0" y="-18" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                        Dataset
                      </text>
                      <text x="0" y="-6" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        (NSL-KDD)
                      </text>
                      <text x="0" y="8" textAnchor="middle" fill="#E0F2FE" fontSize="8" fontWeight="600">
                        Data preprocessing
                      </text>
                      <text x="0" y="19" textAnchor="middle" fill="#E0F2FE" fontSize="8" fontWeight="600">
                        and feature selection
                      </text>
                    </g>
                  </g>

                  {/* Petal 2: Top-Right (ML Models) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      transform: activePetal === 2 ? 'scale(1.06)' : 'scale(1)',
                      filter: activePetal === 2 ? 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.85)) brightness(1.1)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => { handleSelectPetal(2); setIsAutoCycling(false); }}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => { handleSelectPetal(2); setIsAutoCycling((p) => !p); }}
                  >
                    <path
                      d="M 292.5 187.0 L 373.0 67.6 A 220 220 0 0 1 469.5 234.7 L 325.8 244.7 A 76 76 0 0 0 292.5 187.0 Z"
                      fill={`url(#${idPrefix}-p2-grad)`}
                      stroke={activePetal === 2 ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth={activePetal === 2 ? 2.5 : 1}
                    />
                    <g transform="translate(372, 195)" className="pointer-events-none select-none text-white text-center">
                      <circle cx="0" cy="-34" r="6" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="0" cy="-34" r="2.5" fill="#ffffff" />
                      <text x="0" y="-14" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        Machine Learning
                      </text>
                      <text x="0" y="-2" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        Models
                      </text>
                      <text x="0" y="12" textAnchor="middle" fill="#F3E8FF" fontSize="8" fontWeight="600">
                        Random Forest
                      </text>
                      <text x="0" y="23" textAnchor="middle" fill="#F3E8FF" fontSize="8" fontWeight="600">
                        & Decision Tree
                      </text>
                    </g>
                  </g>

                  {/* Petal 3: Bottom-Right (Performance Evaluation) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      transform: activePetal === 3 ? 'scale(1.06)' : 'scale(1)',
                      filter: activePetal === 3 ? 'drop-shadow(0 0 20px rgba(225, 29, 72, 0.85)) brightness(1.1)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => { handleSelectPetal(3); setIsAutoCycling(false); }}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => { handleSelectPetal(3); setIsAutoCycling((p) => !p); }}
                  >
                    <path
                      d="M 325.8 255.3 L 469.5 265.3 A 220 220 0 0 1 373.0 432.4 L 292.5 313.0 A 76 76 0 0 0 325.8 255.3 Z"
                      fill={`url(#${idPrefix}-p3-grad)`}
                      stroke={activePetal === 3 ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth={activePetal === 3 ? 2.5 : 1}
                    />
                    <g transform="translate(372, 305)" className="pointer-events-none select-none text-white text-center">
                      <rect x="-6" y="-36" width="12" height="15" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <line x1="-3" y1="-30" x2="3" y2="-30" stroke="#ffffff" strokeWidth="1.5" />
                      <line x1="-3" y1="-26" x2="3" y2="-26" stroke="#ffffff" strokeWidth="1.5" />
                      <text x="0" y="-12" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        Performance
                      </text>
                      <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        Evaluation
                      </text>
                      <text x="0" y="14" textAnchor="middle" fill="#FFE4E6" fontSize="8" fontWeight="600">
                        Accuracy, Precision
                      </text>
                      <text x="0" y="25" textAnchor="middle" fill="#FFE4E6" fontSize="8" fontWeight="600">
                        Recall, F1-Score
                      </text>
                    </g>
                  </g>

                  {/* Petal 4: Bottom (Result Analysis) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      transform: activePetal === 4 ? 'scale(1.06)' : 'scale(1)',
                      filter: activePetal === 4 ? 'drop-shadow(0 0 20px rgba(217, 119, 6, 0.85)) brightness(1.1)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => { handleSelectPetal(4); setIsAutoCycling(false); }}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => { handleSelectPetal(4); setIsAutoCycling((p) => !p); }}
                  >
                    <path
                      d="M 283.3 318.3 L 346.4 447.7 A 220 220 0 0 1 153.6 447.7 L 216.7 318.3 A 76 76 0 0 0 283.3 318.3 Z"
                      fill={`url(#${idPrefix}-p4-grad)`}
                      stroke={activePetal === 4 ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth={activePetal === 4 ? 2.5 : 1}
                    />
                    <g transform="translate(250, 390)" className="pointer-events-none select-none text-white text-center">
                      <circle cx="-2" cy="-30" r="5" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <line x1="2" y1="-26" x2="6" y2="-22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                        Result Analysis
                      </text>
                      <text x="0" y="4" textAnchor="middle" fill="#FEF3C7" fontSize="8.5" fontWeight="600">
                        Compare models
                      </text>
                      <text x="0" y="15" textAnchor="middle" fill="#FEF3C7" fontSize="8.5" fontWeight="600">
                        and detect attacks
                      </text>
                    </g>
                  </g>

                  {/* Petal 5: Bottom-Left (Key Insights) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      transform: activePetal === 5 ? 'scale(1.06)' : 'scale(1)',
                      filter: activePetal === 5 ? 'drop-shadow(0 0 20px rgba(77, 124, 15, 0.85)) brightness(1.1)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => { handleSelectPetal(5); setIsAutoCycling(false); }}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => { handleSelectPetal(5); setIsAutoCycling((p) => !p); }}
                  >
                    <path
                      d="M 207.5 313.0 L 127.0 432.4 A 220 220 0 0 1 30.5 265.3 L 174.2 255.3 A 76 76 0 0 0 207.5 313.0 Z"
                      fill={`url(#${idPrefix}-p5-grad)`}
                      stroke={activePetal === 5 ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth={activePetal === 5 ? 2.5 : 1}
                    />
                    <g transform="translate(128, 305)" className="pointer-events-none select-none text-white text-center">
                      <circle cx="0" cy="-32" r="5" fill="#ffffff" />
                      <line x1="-2" y1="-24" x2="2" y2="-24" stroke="#ffffff" strokeWidth="2" />
                      <text x="0" y="-12" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                        Key Insights
                      </text>
                      <text x="0" y="4" textAnchor="middle" fill="#ECFDF5" fontSize="8.5" fontWeight="600">
                        Effective detection
                      </text>
                      <text x="0" y="15" textAnchor="middle" fill="#ECFDF5" fontSize="8.5" fontWeight="600">
                        of network intrusions
                      </text>
                    </g>
                  </g>

                  {/* Petal 6: Top-Left (Real-Time Detection) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      transform: activePetal === 6 ? 'scale(1.06)' : 'scale(1)',
                      filter: activePetal === 6 ? 'drop-shadow(0 0 20px rgba(15, 118, 110, 0.85)) brightness(1.1)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => { handleSelectPetal(6); setIsAutoCycling(false); }}
                    onMouseLeave={() => setIsAutoCycling(true)}
                    onClick={() => { handleSelectPetal(6); setIsAutoCycling((p) => !p); }}
                  >
                    <path
                      d="M 174.2 244.7 L 30.5 234.7 A 220 220 0 0 1 127.0 67.6 L 207.5 187.0 A 76 76 0 0 0 174.2 244.7 Z"
                      fill={`url(#${idPrefix}-p6-grad)`}
                      stroke={activePetal === 6 ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                      strokeWidth={activePetal === 6 ? 2.5 : 1}
                    />
                    <g transform="translate(128, 195)" className="pointer-events-none select-none text-white text-center">
                      <circle cx="0" cy="-32" r="7" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="0" cy="-32" r="2.5" fill="#ffffff" />
                      <text x="0" y="-14" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        Real-Time
                      </text>
                      <text x="0" y="-2" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="900">
                        Detection
                      </text>
                      <text x="0" y="12" textAnchor="middle" fill="#CCFBF1" fontSize="8" fontWeight="600">
                        Classify network traffic
                      </text>
                      <text x="0" y="23" textAnchor="middle" fill="#CCFBF1" fontSize="8" fontWeight="600">
                        (Normal / Attack)
                      </text>
                    </g>
                  </g>
                </g>

                {/* ─── CLOCKWISE DIRECTIONAL ARROWS WITH ACTIVE PULSE ─── */}
                <g fill="#0284C7" stroke="#ffffff" strokeWidth="1.5">
                  {/* Arrow 1 -> 2 (Top Right) */}
                  <polygon
                    points="360,54 374,48 370,62"
                    fill="#0077EE"
                    style={{
                      transformOrigin: '367px 55px',
                      transform: activePetal === 1 ? 'scale(1.45)' : 'scale(1)',
                      filter: activePetal === 1 ? 'drop-shadow(0 0 12px #0077EE)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Arrow 2 -> 3 (Right) */}
                  <polygon
                    points="475,244 485,256 471,260"
                    fill="#7C3AED"
                    style={{
                      transformOrigin: '477px 253px',
                      transform: activePetal === 2 ? 'scale(1.45)' : 'scale(1)',
                      filter: activePetal === 2 ? 'drop-shadow(0 0 12px #7C3AED)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Arrow 3 -> 4 (Bottom Right) */}
                  <polygon
                    points="364,444 354,456 350,442"
                    fill="#BE123C"
                    style={{
                      transformOrigin: '356px 447px',
                      transform: activePetal === 3 ? 'scale(1.45)' : 'scale(1)',
                      filter: activePetal === 3 ? 'drop-shadow(0 0 12px #BE123C)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Arrow 4 -> 5 (Bottom Left) */}
                  <polygon
                    points="144,450 130,442 136,456"
                    fill="#D97706"
                    style={{
                      transformOrigin: '137px 449px',
                      transform: activePetal === 4 ? 'scale(1.45)' : 'scale(1)',
                      filter: activePetal === 4 ? 'drop-shadow(0 0 12px #D97706)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Arrow 5 -> 6 (Left) */}
                  <polygon
                    points="26,256 16,244 30,240"
                    fill="#4D7C0F"
                    style={{
                      transformOrigin: '24px 247px',
                      transform: activePetal === 5 ? 'scale(1.45)' : 'scale(1)',
                      filter: activePetal === 5 ? 'drop-shadow(0 0 12px #4D7C0F)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Arrow 6 -> 1 (Top Left) */}
                  <polygon
                    points="138,58 148,46 152,60"
                    fill="#0F766E"
                    style={{
                      transformOrigin: '146px 55px',
                      transform: activePetal === 6 ? 'scale(1.45)' : 'scale(1)',
                      filter: activePetal === 6 ? 'drop-shadow(0 0 12px #0F766E)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </g>

                {/* ─── CENTER CIRCULAR BADGE: "IDS Experimental Analysis" (WITH BREATHING PULSE) ─── */}
                <g
                  style={{
                    transformOrigin: '250px 250px',
                    animation: 'centerBadgePulse 4s ease-in-out infinite',
                  }}
                >
                  <circle
                    cx="250"
                    cy="250"
                    r="58"
                    fill="#ffffff"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  {/* Security Shield Icon with White Padlock */}
                  <g transform="translate(250, 226) scale(1.1)">
                    <path
                      d="M0,-14 L12,-8 V0 C12,9 6,15 0,18 C-6,15 -12,9 -12,0 V-8 Z"
                      fill="#0062FF"
                    />
                    <rect x="-3.5" y="-1" width="7" height="6.5" rx="1.2" fill="#ffffff" />
                    <path d="M-2.2,-1 V-4.5 C-2.2,-6 2.2,-6 2.2,-4.5 V-1" stroke="#ffffff" strokeWidth="1.4" fill="none" />
                  </g>
                  {/* IDS Title */}
                  <text
                    x="250"
                    y="256"
                    textAnchor="middle"
                    fill="#0A192F"
                    fontSize="16"
                    fontWeight="900"
                    letterSpacing="0.5"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    IDS
                  </text>
                  {/* Subtitle */}
                  <text
                    x="250"
                    y="273"
                    textAnchor="middle"
                    fill="#0284C7"
                    fontSize="9.5"
                    fontWeight="800"
                    letterSpacing="0.2"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    Experimental
                  </text>
                  <text
                    x="250"
                    y="285"
                    textAnchor="middle"
                    fill="#0284C7"
                    fontSize="9.5"
                    fontWeight="800"
                    letterSpacing="0.2"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                  >
                    Analysis
                  </text>
                </g>

              </svg>
            </div>

          </div>
  );

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-2.5 xs:p-3 sm:p-6 lg:p-7 space-y-4 sm:space-y-6">
      


      {/* ─── MAIN LAYOUT: MOBILE (ROUND COLOR ANIMATION FIRST -> 6 CARDS -> KEY FINDINGS) | DESKTOP UNCHANGED (6 CARDS LEFT, DIAGRAM+FINDINGS RIGHT) ─── */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-5 items-start">
        
        {/* MOBILE ONLY: Round Color Animation First (matching Image 2 firstlo added) */}
        <div className="order-1 block lg:hidden w-full">
          {renderCircularDiagram('mobile-diag')}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            6 STRUCTURED EXPERIMENTAL RESULT CARDS (MOBILE: ORDER-2 | DESKTOP: LEFT 7 COLS)
           ══════════════════════════════════════════════════════════════ */}
        <div className="order-2 lg:order-1 lg:col-span-7 grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-4 w-full">
          
          {/* ─── CARD 1: 1. DATASET INFORMATION ─── */}
          <div className="p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 sm:space-y-2.5 flex flex-col justify-start">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900">
              <i className="fa-solid fa-database text-[#0284C7] text-xs sm:text-sm shrink-0"></i>
              <h4 className="text-[10px] xs:text-[11px] sm:text-[13px] font-black tracking-tight truncate">
                Dataset <span className="hidden sm:inline">Information</span><span className="sm:hidden">Info</span>
              </h4>
            </div>
            <div className="overflow-hidden rounded-lg sm:rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-[8px] xs:text-[9px] sm:text-xs">
                <thead className="bg-slate-50/90 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-1 px-1.5 sm:py-1.5 sm:px-2.5 font-bold">Parameter</th>
                    <th className="py-1 px-1.5 sm:py-1.5 sm:px-2.5 font-bold">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {datasetInfo.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-1 px-1.5 sm:py-1.5 sm:px-2.5 font-semibold text-slate-700">{row.param}</td>
                      <td className="py-1 px-1.5 sm:py-1.5 sm:px-2.5 font-medium text-slate-900 leading-tight">{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── CARD 2: 2. MODEL PERFORMANCE COMPARISON ─── */}
          <div className="p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 sm:space-y-2.5 flex flex-col justify-start">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900">
              <i className="fa-solid fa-chart-column text-[#0284C7] text-xs sm:text-sm shrink-0"></i>
              <h4 className="text-[10px] xs:text-[11px] sm:text-[13px] font-black tracking-tight truncate">
                Model Performance<span className="hidden sm:inline"> Comparison</span>
              </h4>
            </div>
            <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-[7.5px] xs:text-[8px] sm:text-[11px]">
                <thead className="bg-slate-50/90 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-1 px-1 sm:py-1.5 sm:px-2 font-bold">Algorithm</th>
                    <th className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center font-bold"><span className="sm:hidden">Acc</span><span className="hidden sm:inline">Acc (%)</span></th>
                    <th className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center font-bold"><span className="sm:hidden">Prec</span><span className="hidden sm:inline">Prec (%)</span></th>
                    <th className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center font-bold"><span className="sm:hidden">Rec</span><span className="hidden sm:inline">Rec (%)</span></th>
                    <th className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center font-bold"><span className="sm:hidden">F1</span><span className="hidden sm:inline">F1 (%)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {modelPerformance.map((m, i) => (
                    <tr key={i} className={m.highlight}>
                      <td className="py-1 px-1 sm:py-1.5 sm:px-2 font-bold leading-tight">
                        <span className="hidden sm:inline">{m.algo}</span>
                        <span className="sm:hidden">
                          <span>{m.algo.replace(' (Deployed)', '')}</span>
                          {m.algo.includes('(Deployed)') && (
                            <span className="block text-[6px] xs:text-[7px] text-emerald-600 font-semibold">(Deployed)</span>
                          )}
                        </span>
                      </td>
                      <td className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center font-bold text-slate-900">{m.acc}</td>
                      <td className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center">{m.prec}</td>
                      <td className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center">{m.rec}</td>
                      <td className="py-1 px-0.5 sm:py-1.5 sm:px-1.5 text-center">{m.f1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── CARD 3: 3. CONFUSION MATRIX (RANDOM FOREST) ─── */}
          <div className="p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 sm:space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900">
              <i className="fa-solid fa-table-cells text-[#0284C7] text-xs sm:text-sm shrink-0"></i>
              <h4 className="text-[10px] xs:text-[11px] sm:text-[13px] font-black tracking-tight truncate">
                Confusion Matrix<span className="hidden sm:inline"> (Random Forest)</span>
              </h4>
            </div>
            <div className="relative overflow-x-auto rounded-lg sm:rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-center text-[7px] xs:text-[7.5px] sm:text-[11px]">
                <thead className="bg-slate-50/90 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-0.5 px-0.5 sm:py-1 sm:px-1.5 text-left text-[6.5px] xs:text-[7px] sm:text-[10px] text-slate-500 font-bold"><span className="sm:hidden">Act \ Pred</span><span className="hidden sm:inline">Actual \ Pred</span></th>
                    {matrixHeaders.map((h, i) => (
                      <th key={i} className="py-0.5 px-0.5 sm:py-1 sm:px-1 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {confusionRows.map((r, rIdx) => (
                    <tr key={rIdx}>
                      <td className="py-0.5 px-0.5 sm:py-1 sm:px-1.5 text-left font-bold text-slate-700 bg-slate-50/50">
                        {r.actual}
                      </td>
                      {r.values.map((v, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-0.5 px-0.5 sm:py-1 sm:px-1 transition-colors ${
                            v.isDiag
                              ? v.bg
                              : 'text-slate-600 bg-white hover:bg-slate-50 font-medium'
                          }`}
                        >
                          {v.count}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-[6.5px] xs:text-[7px] sm:text-[10px] text-slate-500 font-medium px-0.5 sm:px-1 pt-0.5">
              <span>• <span className="sm:hidden">Y: Actual</span><span className="hidden sm:inline">Y-axis: Actual Class</span></span>
              <span>• <span className="sm:hidden">X: Predicted</span><span className="hidden sm:inline">X-axis: Predicted Class</span></span>
            </div>
          </div>

          {/* ─── CARD 4: 4. ACCURACY COMPARISON BAR CHART (REAL-TIME DOWN-TO-UP COUNT & BAR ANIMATION) ─── */}
          <div
            ref={accuracyCardRef}
            className="p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 sm:space-y-2.5 flex flex-col justify-between select-text"
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900 truncate">
                <i className="fa-solid fa-chart-line text-[#0284C7] text-xs sm:text-sm shrink-0"></i>
                <h4 className="text-[10px] xs:text-[11px] sm:text-[13px] font-black tracking-tight font-['Outfit',sans-serif] truncate">
                  Accuracy<span className="hidden sm:inline"> Comparison</span>
                </h4>
              </div>
              <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/70 shadow-2xs shrink-0">
                Max: 99.0%
              </span>
            </div>

            {/* Visual Bar Chart Container */}
            <div className="w-full flex-1 flex flex-col justify-between px-1.5 pt-2 pb-1 sm:px-3 sm:pt-3.5 sm:pb-2 bg-slate-50/70 rounded-lg sm:rounded-xl border border-slate-200/80 relative select-text">
              {/* Plot Area with Y-axis & Gridlines */}
              <div className="relative w-full flex items-stretch h-[88px] sm:h-[118px]">
                {/* Y-axis scale lines (90% to 100%) */}
                <div className="flex flex-col justify-between text-[7.5px] sm:text-[9px] font-semibold text-slate-400 select-none w-5 sm:w-7 shrink-0 text-right pr-1 sm:pr-1.5 py-0.5">
                  <span>100%</span>
                  <span>98%</span>
                  <span>96%</span>
                  <span>94%</span>
                  <span>92%</span>
                  <span>90%</span>
                </div>

                {/* Grid Guide Lines & Bars Area */}
                <div className="relative flex-1 h-full">
                  {/* Horizontal Dashed Grid Guide Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-0.5">
                    <div className="border-b border-dashed border-slate-200 w-full"></div>
                    <div className="border-b border-dashed border-slate-200 w-full"></div>
                    <div className="border-b border-dashed border-slate-200 w-full"></div>
                    <div className="border-b border-dashed border-slate-200 w-full"></div>
                    <div className="border-b border-dashed border-slate-200 w-full"></div>
                    <div className="border-b border-slate-300 w-full"></div>
                  </div>

                  {/* Bars Container: Real-Time Down-to-Up Growing Bars & Real-Time Count Up */}
                  <div className="relative h-full flex items-end justify-around z-10 px-0.5 sm:px-1">
                    {ACCURACY_BARS.map((bar, idx) => {
                      // Scale bar height: 90% is 0, 100% is 55px on mobile, 75px on sm+
                      const maxPlotPx = typeof window !== 'undefined' && window.innerWidth < 640 ? 55 : 75;
                      const fullHeight = ((bar.target - 90) / 10) * maxPlotPx;
                      const currentHeight = Math.max(3, Math.round(fullHeight * barProgress));
                      const displayValue = accuracyValues[idx]?.toFixed(1) ?? bar.target.toFixed(1);

                      return (
                        <div key={bar.name} className="flex flex-col items-center justify-end h-full w-6 xs:w-7 sm:w-14 select-text">
                          {/* Counter Badge with ample breathing room, no clipping */}
                          <span className={`text-[7px] xs:text-[7.5px] sm:text-[10px] font-black text-slate-900 bg-white px-0.5 py-0.2 sm:px-1.5 sm:py-0.5 rounded shadow-2xs border ${bar.border} tabular-nums select-text transition-transform duration-100 hover:scale-105 mb-1 whitespace-nowrap`}>
                            {displayValue}%
                          </span>
                          {/* Growing Bar from Down to Up */}
                          <div
                            className={`w-3.5 xs:w-4 sm:w-8 rounded-t-sm sm:rounded-t-md bg-gradient-to-t ${bar.gradient} shadow-sm hover:brightness-110 transition-[filter] duration-200`}
                            style={{ height: `${currentHeight}px` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Model Names Row cleanly positioned underneath bars */}
              <div className="flex items-start w-full pt-1 sm:pt-1.5 select-text">
                {/* Spacer matching Y-axis width */}
                <div className="w-5 sm:w-7 shrink-0"></div>
                {/* Labels flex container matching Bars flex container */}
                <div className="flex-1 flex justify-around px-0.5 sm:px-1">
                  {ACCURACY_BARS.map((bar) => (
                    <span
                      key={bar.name}
                      className="w-6 xs:w-7 sm:w-14 text-center text-[6.5px] xs:text-[7.5px] sm:text-[10px] font-bold text-slate-700 leading-tight"
                      title={bar.name}
                    >
                      <span className="hidden sm:inline">{bar.name}</span>
                      <span className="sm:hidden truncate block">{bar.name.split(' ')[0]}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer details matching Card 3 symmetry */}
            <div className="flex items-center justify-between text-[6.5px] xs:text-[7px] sm:text-[10px] text-slate-500 font-medium px-0.5 sm:px-1 pt-0.5">
              <span className="truncate max-w-[85px] sm:max-w-none">• <span className="sm:hidden">NSL-KDD Test</span><span className="hidden sm:inline">Benchmark: NSL-KDD Test Set</span></span>
              <span className="truncate max-w-[85px] sm:max-w-none font-semibold text-emerald-600">• <span className="sm:hidden">RF (98.6%)</span><span className="hidden sm:inline">Deployed: Random Forest (98.6%)</span></span>
            </div>
          </div>

          {/* ─── CARD 5: 5. CLASSIFICATION REPORT (RANDOM FOREST) ─── */}
          <div className="p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 sm:space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900">
              <i className="fa-solid fa-file-lines text-[#0284C7] text-xs sm:text-sm shrink-0"></i>
              <h4 className="text-[10px] xs:text-[11px] sm:text-[13px] font-black tracking-tight truncate">
                Classification Report<span className="hidden sm:inline"> (Random Forest)</span>
              </h4>
            </div>
            <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-[7.5px] xs:text-[8px] sm:text-[11px]">
                <thead className="bg-slate-50/90 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-1 px-1 sm:py-1 sm:px-2 font-bold">Class</th>
                    <th className="py-1 px-0.5 sm:py-1 sm:px-1.5 text-center font-bold">Prec</th>
                    <th className="py-1 px-0.5 sm:py-1 sm:px-1.5 text-center font-bold">Rec</th>
                    <th className="py-1 px-0.5 sm:py-1 sm:px-1.5 text-center font-bold">F1</th>
                    <th className="py-1 px-1 sm:py-1 sm:px-2 text-right font-bold"><span className="sm:hidden">Supp</span><span className="hidden sm:inline">Support</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classReport.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-0.5 px-1 sm:py-1 sm:px-2 font-bold text-slate-800">{c.cls}</td>
                      <td className="py-0.5 px-0.5 sm:py-1 sm:px-1.5 text-center text-slate-700">{c.prec}</td>
                      <td className="py-0.5 px-0.5 sm:py-1 sm:px-1.5 text-center text-slate-700">{c.rec}</td>
                      <td className="py-0.5 px-0.5 sm:py-1 sm:px-1.5 text-center text-slate-700">{c.f1}</td>
                      <td className="py-0.5 px-1 sm:py-1 sm:px-2 text-right font-medium text-slate-600">{c.supp}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50/80 font-black text-slate-900 border-t border-emerald-200">
                    <td colSpan={4} className="py-1 px-1 sm:py-1.5 sm:px-2 text-left font-black text-emerald-900 text-[7px] xs:text-[8px] sm:text-[11px]">
                      <span className="sm:hidden">Overall Acc</span><span className="hidden sm:inline">Overall Accuracy</span>
                    </td>
                    <td className="py-1 px-1 sm:py-1.5 sm:px-2 text-right text-emerald-700 font-black text-[7.5px] xs:text-[8px] sm:text-xs">
                      98.60%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── CARD 6: 6. DETECTION RESULTS (SAMPLE) ─── */}
          <div className="p-2 xs:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5 sm:space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-900">
              <i className="fa-solid fa-magnifying-glass text-[#0284C7] text-xs sm:text-sm shrink-0"></i>
              <h4 className="text-[10px] xs:text-[11px] sm:text-[13px] font-black tracking-tight truncate">
                Detection Results<span className="hidden sm:inline"> (Sample)</span>
              </h4>
            </div>
            <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-[7.5px] xs:text-[8px] sm:text-[11px]">
                <thead className="bg-slate-50/90 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-1 px-1 sm:py-1 sm:px-2 font-bold w-4 sm:w-auto"><span className="sm:hidden">#</span><span className="hidden sm:inline">No.</span></th>
                    <th className="py-1 px-1 sm:py-1 sm:px-2 font-bold"><span className="sm:hidden">Actual</span><span className="hidden sm:inline">Actual Class</span></th>
                    <th className="py-1 px-1 sm:py-1 sm:px-2 font-bold"><span className="sm:hidden">Pred</span><span className="hidden sm:inline">Predicted Class</span></th>
                    <th className="py-1 px-1 sm:py-1 sm:px-2 text-center font-bold">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {detectionSamples.map((s) => (
                    <tr key={s.no} className="hover:bg-slate-50/50">
                      <td className="py-1 px-1 sm:py-1.5 sm:px-2 font-bold text-slate-500">{s.no}</td>
                      <td className="py-1 px-1 sm:py-1.5 sm:px-2 font-bold text-slate-800 bg-emerald-50/40">{s.actual}</td>
                      <td className="py-1 px-1 sm:py-1.5 sm:px-2 font-bold text-slate-800 bg-emerald-50/40">{s.pred}</td>
                      <td className="py-1 px-1 sm:py-1.5 sm:px-2 text-center">
                        <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[7px] xs:text-[7.5px] sm:text-[10px] font-bold bg-emerald-100 text-emerald-700 shadow-2xs">
                          <i className="fa-solid fa-check text-[6px] sm:text-[9px]"></i> <span className="hidden xs:inline">Correct</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            RIGHT COLUMN (DESKTOP) / KEY FINDINGS (MOBILE: ORDER-3)
           ══════════════════════════════════════════════════════════════ */}
        <div className="order-3 lg:order-2 lg:col-span-5 space-y-4 w-full">
          
          {/* DESKTOP ONLY: Circular diagram in right column */}
          <div className="hidden lg:block">
            {renderCircularDiagram('desktop-diag')}
          </div>

          {/* ─── CARD 8: 8. KEY FINDINGS ─── */}
          <div className="p-2.5 xs:p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-2xs">
                <i className="fa-solid fa-check text-[10px]"></i>
              </span>
              <h4 className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight">
                Key Findings
              </h4>
            </div>

            <div className="space-y-2.5">
              {keyFindings.map((finding) => (
                <div key={finding.num} className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-2xs mt-0.5"
                    style={{ backgroundColor: finding.badgeColor }}
                  >
                    {finding.num}
                  </span>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-700 leading-snug font-medium">
                    {finding.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>



    </div>
  );
}
