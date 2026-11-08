import React, { useState } from 'react';
import {
  Settings,
  Grid,
  ArrowLeftRight,
} from 'lucide-react';

/**
 * IdsDualDashboardShowcase
 * 
 * Clean category switcher & animation transition banner matching the reference design:
 * - Left: Key Features category card
 * - Center: ANIMATION TRANSITION button with animated flowing wave connectors
 * - Right: Application Modules category card
 * - Removed the two lower panels as requested ("only round color removed")
 */
export default function IdsDualDashboardShowcase({ onModeChange }) {
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'features' | 'modules'

  // Toggle presentation view modes
  const handleToggleTransition = () => {
    let nextMode = 'both';
    if (viewMode === 'both') {
      nextMode = 'features';
    } else if (viewMode === 'features') {
      nextMode = 'modules';
    } else {
      nextMode = 'both';
    }
    setViewMode(nextMode);
    if (onModeChange) onModeChange(nextMode);
  };

  const handleSelectMode = (mode) => {
    const nextMode = viewMode === mode ? 'both' : mode;
    setViewMode(nextMode);
    if (onModeChange) onModeChange(nextMode);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#EEF4FF] via-[#F4F7FE] to-[#F8FAFF] text-slate-800 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xl border border-indigo-100/80 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden select-none my-6">
      
      {/* ─── DELICATE AMBIENT GLOW & NETWORK LINE ARTIFACTS IN BACKGROUND ─── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-300/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-purple-300/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-indigo-200/20 rounded-full blur-[110px] pointer-events-none"></div>

      {/* ─── TWO CATEGORY CARDS & CENTER ANIMATION TRANSITION ─── */}
      <section className="relative z-20">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* SVG Animated Flowing Connector Waves between Left, Center and Right */}
          <div className="hidden md:block absolute inset-x-12 top-1/2 -translate-y-1/2 h-16 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="idsWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                d="M 120 30 C 260 5, 380 55, 500 30 C 620 5, 740 55, 880 30"
                fill="none"
                stroke="url(#idsWaveGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* LEFT CATEGORY CARD: Key Features */}
          <div
            onClick={() => handleSelectMode('features')}
            className={`w-full md:w-[40%] bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex items-center gap-4 shadow-md hover:shadow-lg cursor-pointer group z-10 ${
              viewMode === 'features' ? 'border-blue-500 ring-2 ring-blue-400/40 bg-white' : 'border-slate-200/90 hover:border-blue-300'
            }`}
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 group-hover:rotate-6 transition-transform">
              <Settings className="w-6.5 h-6.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Key Features
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Core capabilities of our IDS system
              </p>
            </div>
          </div>

          {/* CENTER: Glowing Circular Transition Button */}
          <div className="flex flex-col items-center justify-center text-center z-10 shrink-0 my-2 md:my-0">
            <button
              type="button"
              onClick={handleToggleTransition}
              className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group"
              title="Click to toggle presentation views"
            >
              {/* Outer pulsing animated energy ring */}
              <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-35"></span>
              <span className="absolute -inset-1 rounded-full border border-purple-300/40 animate-pulse"></span>
              <ArrowLeftRight className="w-6 h-6 transition-transform group-hover:rotate-180 duration-500" />
            </button>
            <div className="mt-2">
              <div className="text-[11px] font-black tracking-wider text-slate-800 uppercase">
                ANIMATION TRANSITION
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Click to switch view ({viewMode === 'both' ? 'Both Active' : viewMode === 'features' ? 'Features View' : 'Modules View'})
              </div>
            </div>
          </div>

          {/* RIGHT CATEGORY CARD: Application Modules */}
          <div
            onClick={() => handleSelectMode('modules')}
            className={`w-full md:w-[40%] bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex items-center gap-4 shadow-md hover:shadow-lg cursor-pointer group z-10 ${
              viewMode === 'modules' ? 'border-purple-500 ring-2 ring-purple-400/40 bg-white' : 'border-slate-200/90 hover:border-purple-300'
            }`}
          >
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/25 shrink-0 group-hover:scale-105 group-hover:rotate-6 transition-transform">
              <Grid className="w-6.5 h-6.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Application Modules
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Main modules of the IDS application
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
