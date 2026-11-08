import React, { useState, useEffect, useRef } from 'react';
import IdsVennDiagramModules from './IdsVennDiagramModules';
import IdsSystemHistorySimulation from './IdsSystemHistorySimulation';

/**
 * IdsArchitectureWorkflowPanel
 * Unified container uniting:
 * 1. System Architecture Core Features (Interactive Venn Diagram & Modules)
 * 2. Prediction Workflow (System History & 3D Simulation Vector)
 * 
 * Auto-Loop Workflow:
 * - System Architecture Core Features cycles through modules 1 to 10.
 * - When all 10 modules finish, it automatically switches to Prediction Workflow.
 * - Prediction Workflow executes Real-Time Console & 3D Simulator Vector:
 *   Safe Traffic flow simulation -> Malicious Intrusion flow simulation.
 * - Once both simulations complete, it automatically returns to System Architecture Core Features.
 * - Manual clicks on tab buttons remain fully interactive.
 */
export default function IdsArchitectureWorkflowPanel() {
  const [activeTab, setActiveTab] = useState('core-features'); // 'core-features' | 'prediction-workflow'
  const [isAutoLoop, setIsAutoLoop] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const panelRef = useRef(null);

  // Monitor visibility to only auto-advance when panel is in the viewport
  useEffect(() => {
    const scrollParent = panelRef.current?.closest('.overflow-y-auto') || null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        root: scrollParent,
        threshold: 0.15,
      }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // When System Architecture Core Features completes all 10 modules:
  const handleCoreFeaturesComplete = () => {
    if (isAutoLoop && isInView) {
      setActiveTab('prediction-workflow');
    }
  };

  // When Prediction Workflow completes both Safe Traffic and Malicious Intrusion:
  const handlePredictionWorkflowComplete = () => {
    if (isAutoLoop && isInView) {
      setActiveTab('core-features');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      ref={panelRef}
      id="ids-architecture-workflow-panel"
      className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-2 xs:p-2.5 sm:p-6 lg:p-7 space-y-3 sm:space-y-6 overflow-hidden"
    >
      {/* ─── TOP TOGGLE BUTTONS: SYSTEM ARCHITECTURE CORE FEATURES | PREDICTION WORKFLOW (CENTERED) ─── */}
      <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3.5 flex-nowrap w-full">
        {/* Tab 1: System Architecture Core Features (Vibrant Blue Icon & Theme) */}
        <button
          type="button"
          onClick={() => handleTabClick('core-features')}
          className={`px-2.5 xs:px-3 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-[9px] xs:text-[10.5px] sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 cursor-pointer active:scale-95 shrink-0 ${
            activeTab === 'core-features'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.01]'
              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80 hover:border-slate-300'
          }`}
          title="Switch to System Architecture Core Features"
        >
          <span
            className={`w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] transition-all shrink-0 ${
              activeTab === 'core-features'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            <i className="fa-solid fa-sitemap"></i>
          </span>
          <span className="whitespace-nowrap">System Architecture Core Features</span>
        </button>

        {/* Tab 2: Prediction Workflow (Distinct Vibrant Emerald Green Icon & Theme) */}
        <button
          type="button"
          onClick={() => handleTabClick('prediction-workflow')}
          className={`px-2.5 xs:px-3 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-[9px] xs:text-[10.5px] sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 cursor-pointer active:scale-95 shrink-0 ${
            activeTab === 'prediction-workflow'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-[1.01]'
              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80 hover:border-slate-300'
          }`}
          title="Switch to Prediction Workflow"
        >
          <span
            className={`w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] transition-all shrink-0 ${
              activeTab === 'prediction-workflow'
                ? 'bg-white text-emerald-600 shadow-2xs'
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <i className="fa-solid fa-chart-simple"></i>
          </span>
          <span className="whitespace-nowrap">Prediction Workflow</span>
        </button>
      </div>

      {/* ─── SAME PANEL DISPLAY AREA ─── */}
      <div className="w-full">
        {activeTab === 'core-features' ? (
          <div key="core-features" className="w-full animate-fadeIn">
            <IdsVennDiagramModules isEmbedded={true} onComplete={handleCoreFeaturesComplete} />
          </div>
        ) : (
          <div key="prediction-workflow" className="w-full animate-fadeIn">
            <IdsSystemHistorySimulation isEmbedded={true} onComplete={handlePredictionWorkflowComplete} />
          </div>
        )}
      </div>
    </div>
  );
}
