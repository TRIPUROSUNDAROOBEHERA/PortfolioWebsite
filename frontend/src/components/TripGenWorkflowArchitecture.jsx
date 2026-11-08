import React, { useState, useEffect } from 'react';

/**
 * 4 SYSTEM MODULES (ROLE-BASED FEATURES)
 */
const TRIPGEN_SYSTEM_MODULES = [
  {
    id: 'public',
    roleKey: 'public',
    title: 'Public / Guest',
    icon: 'fa-solid fa-users',
    headerBg: 'bg-[#0284C7] text-white',
    cardBg: 'bg-[#F0F9FF] border-[#BAE6FD]',
    activeRing: 'ring-2 ring-[#0284C7] shadow-lg shadow-sky-500/20',
    bulletColor: 'text-[#0284C7]',
    bullets: [
      'Landing / Home Page',
      'Search Destinations',
      'View Packages',
      'FAQ & Helpdesk',
      'Register / Login'
    ]
  },
  {
    id: 'admin',
    roleKey: 'admin',
    title: 'Admin',
    icon: 'fa-solid fa-gear',
    headerBg: 'bg-[#E11D48] text-white',
    cardBg: 'bg-[#FFF1F2] border-[#FECDD3]',
    activeRing: 'ring-2 ring-[#E11D48] shadow-lg shadow-rose-500/20',
    bulletColor: 'text-[#E11D48]',
    bullets: [
      'Admin Login',
      'Admin Dashboard',
      'Add / Manage Employees',
      'View Employees',
      'Employee Login History',
      'System Settings'
    ]
  },
  {
    id: 'employee',
    roleKey: 'employee',
    title: 'Employee',
    icon: 'fa-solid fa-user',
    headerBg: 'bg-[#059669] text-white',
    cardBg: 'bg-[#ECFDF5] border-[#A7F3D0]',
    activeRing: 'ring-2 ring-[#059669] shadow-lg shadow-emerald-500/20',
    bulletColor: 'text-[#059669]',
    bullets: [
      'Employee Login',
      'Create / Manage Itineraries',
      'Manage Transport Details',
      'Manage Hotel Listings',
      'View Bookings',
      'View Customer Feedback'
    ]
  },
  {
    id: 'traveler',
    roleKey: 'traveler',
    title: 'Traveler',
    icon: 'fa-solid fa-suitcase-rolling',
    headerBg: 'bg-[#D97706] text-white',
    cardBg: 'bg-[#FFFBEB] border-[#FDE68A]',
    activeRing: 'ring-2 ring-[#D97706] shadow-lg shadow-amber-500/20',
    bulletColor: 'text-[#D97706]',
    bullets: [
      'Sign Up / Register',
      'User Login',
      'Browse Itinerary Packages',
      'Make Reservations',
      'Booking Receipt',
      'Manage Cancellations',
      'Post Trip Reviews'
    ]
  }
];


export default function TripGenWorkflowArchitecture() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  // Auto-advance loop: 1 (Users) -> 2 (Frontend) -> 3 (Django) -> 4 (MySQL) -> 5 (Modules)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || selectedStep !== null) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 3200);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, selectedStep]);

  const currentStep = selectedStep !== null ? selectedStep : activeStep;

  const handleStepClick = (stepId) => {
    if (selectedStep === stepId) {
      setSelectedStep(null);
      setIsAutoPlaying(true);
    } else {
      setSelectedStep(stepId);
      setIsAutoPlaying(false);
    }
  };

  return (
    <section className="space-y-4 tripgen-reveal-section font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── INLINE STYLES FOR HIGH-PERFORMANCE 60FPS FLOW ANIMATIONS ─── */}
      <style>{`
        @keyframes tgDashForward {
          0% { stroke-dashoffset: 18; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes tgDashReverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 18; }
        }
        @keyframes tgPulseHalo {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.015); opacity: 1; }
        }
        @keyframes tgShimmerSweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        @keyframes tgScreenFlicker {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .anim-tg-dash-fwd {
          stroke-dasharray: 5 4;
          animation: tgDashForward 1.2s linear infinite;
        }
        .anim-tg-dash-rev {
          stroke-dasharray: 5 4;
          animation: tgDashReverse 1.2s linear infinite;
        }
        .anim-tg-dash-v-down {
          stroke-dasharray: 5 4;
          animation: tgDashForward 1.4s linear infinite;
        }
        .anim-tg-shimmer {
          animation: tgShimmerSweep 3s ease-in-out infinite;
        }
        .anim-tg-screen {
          animation: tgScreenFlicker 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* ─── SECTION HEADER ─── */}
      <div>
        <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          System Workflow &amp; Architecture
        </h2>
      </div>

      {/* Master Infographic Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredRole(null);
        }}
        className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl border border-slate-200/90 p-2.5 xs:p-3 sm:p-5 shadow-xs space-y-2 sm:space-y-3 overflow-hidden relative"
      >
        
        {/* Part 1: Top 4 Architectural Layers with Dual Flow Connectors (Side-by-Side Horizontal Flow) */}
        <div className="flex flex-row overflow-x-auto custom-slim-scrollbar pb-1.5 sm:pb-0 items-stretch justify-between gap-1 xs:gap-1.5 lg:gap-1.5 min-w-full">
          
          {/* ─── LAYER 1: USERS ─── */}
          <div
            onClick={() => handleStepClick(1)}
            className={`flex-1 min-w-[130px] xs:min-w-[145px] sm:min-w-[170px] lg:min-w-0 bg-[#F0F9FF] rounded-lg xs:rounded-xl sm:rounded-2xl border border-[#BAE6FD] p-1.5 xs:p-2 sm:p-3.5 flex flex-col justify-between shadow-2xs transition-all duration-300 group cursor-pointer relative overflow-hidden ${
              currentStep === 1
                ? 'ring-2 ring-[#0284C7] shadow-lg shadow-sky-500/20 bg-[#E0F2FE]'
                : 'hover:shadow-md'
            }`}
          >
            {/* Shimmer on active step */}
            {currentStep === 1 && (
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none anim-tg-shimmer" />
            )}

            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between p-1 xs:p-1.5 sm:p-2 rounded-md sm:rounded-xl bg-[#0284C7] text-white mb-1.5 sm:mb-2.5 shadow-2xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white text-[#0284C7] flex items-center justify-center font-black text-[9px] sm:text-xs shrink-0 shadow-xs">
                    1
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-[9px] xs:text-[10px] sm:text-[13px] leading-tight">
                      Users
                    </div>
                    <div className="text-[7px] xs:text-[7.5px] sm:text-[9.5px] font-semibold text-sky-100 leading-none">
                      (Multi-Role Interface)
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                {currentStep === 1 && (
                  <span className="px-1 py-0.5 rounded-full bg-white/20 text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-tight animate-pulse">
                    Initiating
                  </span>
                )}
              </div>

              {/* 3 User Avatars Header (Interactive & Synchronized with Bottom Role Modules) */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 xs:p-1.5 sm:p-2.5 border border-sky-100 shadow-2xs space-y-0.5 sm:space-y-1.5 mb-1 sm:mb-2">
                <div className="grid grid-cols-3 gap-0.5 sm:gap-1 text-center items-center">
                  {/* Admin */}
                  <div
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredRole('admin'); }}
                    onMouseLeave={() => setHoveredRole(null)}
                    className="flex flex-col items-center group/role cursor-pointer"
                  >
                    <div className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-2xs transition-all duration-300 ${
                      hoveredRole === 'admin'
                        ? 'bg-rose-100 border-2 border-rose-500 text-rose-600 scale-110 shadow-md ring-2 ring-rose-300'
                        : 'bg-blue-50 border border-blue-400 text-blue-600 group-hover/role:scale-105'
                    }`}>
                      <i className="fa-solid fa-user-tie text-[9px] xs:text-[10px] sm:text-[15px]"></i>
                    </div>
                    <span className={`text-[7px] xs:text-[8px] sm:text-[11px] font-black mt-0.5 sm:mt-1.5 leading-none transition-colors whitespace-nowrap ${
                      hoveredRole === 'admin' ? 'text-rose-600 font-extrabold' : 'text-slate-800'
                    }`}>Admin</span>
                  </div>

                  {/* Employee */}
                  <div
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredRole('employee'); }}
                    onMouseLeave={() => setHoveredRole(null)}
                    className="flex flex-col items-center group/role cursor-pointer"
                  >
                    <div className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-2xs transition-all duration-300 ${
                      hoveredRole === 'employee'
                        ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-600 scale-110 shadow-md ring-2 ring-emerald-300'
                        : 'bg-emerald-50 border border-emerald-400 text-emerald-600 group-hover/role:scale-105'
                    }`}>
                      <i className="fa-solid fa-user-gear text-[9px] xs:text-[10px] sm:text-[15px]"></i>
                    </div>
                    <span className={`text-[7px] xs:text-[8px] sm:text-[11px] font-black mt-0.5 sm:mt-1.5 leading-none transition-colors whitespace-nowrap ${
                      hoveredRole === 'employee' ? 'text-emerald-600 font-extrabold' : 'text-slate-800'
                    }`}>Employee</span>
                  </div>

                  {/* Traveler */}
                  <div
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredRole('traveler'); }}
                    onMouseLeave={() => setHoveredRole(null)}
                    className="flex flex-col items-center group/role cursor-pointer"
                  >
                    <div className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-2xs transition-all duration-300 ${
                      hoveredRole === 'traveler'
                        ? 'bg-amber-100 border-2 border-amber-500 text-amber-600 scale-110 shadow-md ring-2 ring-amber-300'
                        : 'bg-amber-50 border border-amber-400 text-amber-600 group-hover/role:scale-105'
                    }`}>
                      <i className="fa-solid fa-person-hiking text-[10px] xs:text-[11px] sm:text-[15px]"></i>
                    </div>
                    <span className={`text-[7px] xs:text-[8px] sm:text-[11px] font-black mt-0.5 sm:mt-1.5 leading-none transition-colors whitespace-nowrap ${
                      hoveredRole === 'traveler' ? 'text-amber-600 font-extrabold' : 'text-slate-800'
                    }`}>Traveler</span>
                  </div>
                </div>
              </div>

              {/* 8 Role Capabilities & Portals */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-sky-100 shadow-2xs space-y-0.5">
                {[
                  { icon: 'fa-solid fa-right-to-bracket text-blue-600', text: 'Separate Login Portals' },
                  { icon: 'fa-solid fa-id-badge text-indigo-600', text: 'Role-Based Permissions' },
                  { icon: 'fa-solid fa-chart-pie text-emerald-600', text: 'Admin Executive View' },
                  { icon: 'fa-solid fa-user-check text-purple-600', text: 'Employee Ops Console' },
                  { icon: 'fa-solid fa-map-location-dot text-amber-600', text: 'Traveler Itinerary Hub' },
                  { icon: 'fa-solid fa-lock text-rose-600', text: 'Session Authenticator' },
                  { icon: 'fa-solid fa-table-columns text-teal-600', text: 'Custom Role Dashboards' },
                  { icon: 'fa-solid fa-mobile-screen text-sky-600', text: 'Responsive Multi-Device' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1 sm:gap-1.5 px-1 sm:px-1.5 py-0.5 rounded text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold transition-colors ${
                      currentStep === 1 ? 'bg-sky-100/70 text-slate-900' : 'bg-sky-50/50 text-slate-700'
                    }`}
                  >
                    <i className={`${item.icon} text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center shrink-0`}></i>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="tripgen-card-sheen"></div>
          </div>

          {/* ─── FLOW CONNECTOR 1 ➔ 2 (WITH ANIMATED TRAVELING PHOTONS) ─── */}
          {/* Dual Animated Flow Pipes (Visible on All Viewports) */}
          <div className="flex flex-col justify-center items-center px-0.5 text-center self-center shrink-0 w-[42px] xs:w-[50px] lg:w-[68px] py-1 select-none">
            <div className={`text-[7px] xs:text-[7.5px] lg:text-[8.5px] font-black leading-tight transition-all duration-300 ${
              currentStep === 1 ? 'text-blue-600 scale-105' : 'text-slate-600'
            }`}>
              HTTP Request
            </div>
            <div className="text-[6px] xs:text-[6.5px] lg:text-[7.5px] font-semibold text-slate-500 leading-none mb-0.5 sm:mb-1 truncate max-w-full">(Form/API)</div>

            {/* SVG Wire with Animated Forward & Reverse Energy Pulses */}
            <svg className="w-full h-6 sm:h-8 overflow-visible" viewBox="0 0 68 30">
              {/* Forward Path: Blue Wire */}
              <line x1="2" y1="8" x2="60" y2="8" stroke="#0284C7" strokeWidth="2.5" className="anim-tg-dash-fwd" strokeLinecap="round" />
              <polygon points="56,4 66,8 56,12" fill="#0284C7" />
              {/* Animated Moving Photon Dot */}
              <circle r="3" fill="#38BDF8" className="drop-shadow-xs">
                <animate attributeName="cx" from="4" to="60" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="8;8" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" />
              </circle>

              {/* Reverse Path: Emerald Wire */}
              <line x1="66" y1="22" x2="8" y2="22" stroke="#059669" strokeWidth="2.5" className="anim-tg-dash-rev" strokeLinecap="round" />
              <polygon points="12,18 2,22 12,26" fill="#059669" />
              {/* Animated Reverse Moving Photon Dot */}
              <circle r="3" fill="#34D399" className="drop-shadow-xs">
                <animate attributeName="cx" from="64" to="6" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="22;22" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className={`text-[7px] xs:text-[7.5px] lg:text-[8.5px] font-black leading-tight mt-0.5 sm:mt-1 transition-all duration-300 ${
              currentStep === 2 ? 'text-emerald-600 scale-105' : 'text-slate-600'
            }`}>
              HTTP Response
            </div>
            <div className="text-[6px] xs:text-[6.5px] lg:text-[7.5px] font-semibold text-slate-500 leading-none truncate max-w-full">(HTML/JSON)</div>
          </div>

          {/* ─── LAYER 2: FRONTEND UI ─── */}
          <div
            onClick={() => handleStepClick(2)}
            className={`flex-1 min-w-[130px] xs:min-w-[145px] sm:min-w-[170px] lg:min-w-0 bg-[#ECFDF5] rounded-lg xs:rounded-xl sm:rounded-2xl border border-[#A7F3D0] p-1.5 xs:p-2 sm:p-3.5 flex flex-col justify-between shadow-2xs transition-all duration-300 group cursor-pointer relative overflow-hidden ${
              currentStep === 2
                ? 'ring-2 ring-[#059669] shadow-lg shadow-emerald-500/20 bg-[#D1FAE5]'
                : 'hover:shadow-md'
            }`}
          >
            {currentStep === 2 && (
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none anim-tg-shimmer" />
            )}

            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between p-1 xs:p-1.5 sm:p-2 rounded-md sm:rounded-xl bg-[#059669] text-white mb-1.5 sm:mb-2.5 shadow-2xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white text-[#059669] flex items-center justify-center font-black text-[9px] sm:text-xs shrink-0 shadow-xs">
                    2
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-[9px] xs:text-[10px] sm:text-[13px] leading-tight">
                      Frontend UI
                    </div>
                    <div className="text-[7px] xs:text-[7.5px] sm:text-[9.5px] font-semibold text-emerald-100 leading-none">
                      (Web Interface)
                    </div>
                  </div>
                </div>

                {currentStep === 2 && (
                  <span className="px-1 py-0.5 rounded-full bg-white/20 text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-tight animate-pulse">
                    Rendering
                  </span>
                )}
              </div>

              {/* Responsive Devices Mockup & Tech Badges */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-emerald-100 shadow-2xs space-y-0.5 sm:space-y-1 mb-1 sm:mb-2">
                {/* Devices Illustration */}
                <div className="flex items-end justify-center gap-1 sm:gap-1.5 pt-0.5">
                  {/* Monitor */}
                  <div className="w-9 h-6 sm:w-14 sm:h-9 bg-slate-800 rounded-xs sm:rounded-md p-0.5 flex flex-col justify-between shadow-xs">
                    <div className="w-full h-4 sm:h-6.5 bg-emerald-50 rounded-[2px] p-0.5 flex flex-col justify-between overflow-hidden anim-tg-screen">
                      <div className="flex items-center justify-between">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-500"></div>
                        <div className="w-2.5 sm:w-4 h-0.5 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="flex gap-0.5">
                        <div className="w-1/2 h-1.5 sm:h-2.5 bg-emerald-200/80 rounded-xs"></div>
                        <div className="w-1/2 h-1.5 sm:h-2.5 bg-emerald-300/80 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="w-2 sm:w-3 h-0.5 bg-slate-600 mx-auto -mb-0.5 rounded-full"></div>
                  </div>

                  {/* Tablet */}
                  <div className="w-5 h-5.5 sm:w-7 sm:h-8 bg-slate-800 rounded-xs sm:rounded-md p-0.5 flex flex-col justify-between shadow-xs">
                    <div className="w-full h-4 sm:h-5.5 bg-sky-50 rounded-[2px] p-0.5 space-y-0.5 anim-tg-screen">
                      <div className="w-full h-0.5 rounded-full bg-sky-300"></div>
                      <div className="w-full h-1.5 sm:h-2 rounded-xs bg-sky-200/80"></div>
                    </div>
                    <div className="w-1 h-0.5 rounded-full bg-slate-500 mx-auto"></div>
                  </div>

                  {/* Phone */}
                  <div className="w-3.5 h-5 sm:w-4.5 sm:h-7 bg-slate-800 rounded-xs sm:rounded-sm p-0.5 flex flex-col justify-between shadow-xs">
                    <div className="w-full h-3.5 sm:h-4.5 bg-amber-50 rounded-[2px] p-0.5 anim-tg-screen">
                      <div className="w-full h-1.5 sm:h-2 rounded-xs bg-amber-200/70"></div>
                    </div>
                    <div className="w-1 h-0.5 rounded-full bg-slate-500 mx-auto"></div>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 pt-0.5 sm:pt-1 border-t border-emerald-50">
                  <span className="px-1 py-0.2 rounded bg-orange-50 text-orange-600 font-black text-[6.5px] sm:text-[8px] border border-orange-200 flex items-center gap-0.5">
                    <i className="fa-brands fa-html5 text-[6px] sm:text-[7px]"></i> HTML
                  </span>
                  <span className="px-1 py-0.2 rounded bg-sky-50 text-sky-600 font-black text-[6.5px] sm:text-[8px] border border-sky-200 flex items-center gap-0.5">
                    <i className="fa-brands fa-css3-alt text-[6px] sm:text-[7px]"></i> CSS
                  </span>
                  <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-600 font-black text-[6.5px] sm:text-[8px] border border-amber-200 flex items-center gap-0.5">
                    <i className="fa-brands fa-js text-[6px] sm:text-[7px]"></i> JS
                  </span>
                  <span className="px-1 py-0.2 rounded bg-purple-50 text-purple-600 font-black text-[6.5px] sm:text-[8px] border border-purple-200 flex items-center gap-0.5">
                    <i className="fa-brands fa-bootstrap text-[6px] sm:text-[7px]"></i> B
                  </span>
                </div>
              </div>

              {/* 8 Frontend Features */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-emerald-100 shadow-2xs space-y-0.5">
                {[
                  { icon: 'fa-solid fa-table-cells text-emerald-600', text: 'Responsive Grid Design' },
                  { icon: 'fa-solid fa-chart-line text-blue-600', text: 'Interactive Dashboards' },
                  { icon: 'fa-solid fa-pen-to-square text-amber-600', text: 'Dynamic Input Forms' },
                  { icon: 'fa-solid fa-map-location text-teal-600', text: 'Tour Itinerary Viewer' },
                  { icon: 'fa-solid fa-bolt text-indigo-600', text: 'Fetch / AJAX Handlers' },
                  { icon: 'fa-solid fa-layer-group text-purple-600', text: 'Modular Web Templates' },
                  { icon: 'fa-solid fa-shield-halved text-rose-600', text: 'CSRF Token Ingestion' },
                  { icon: 'fa-solid fa-bell text-orange-600', text: 'Toast & Alert Modals' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1 sm:gap-1.5 px-1 sm:px-1.5 py-0.5 rounded text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold transition-colors ${
                      currentStep === 2 ? 'bg-emerald-100/70 text-slate-900' : 'bg-emerald-50/50 text-slate-700'
                    }`}
                  >
                    <i className={`${item.icon} text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center shrink-0`}></i>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tripgen-card-sheen"></div>
          </div>

          {/* ─── FLOW CONNECTOR 2 ➔ 3 (FRONTEND TO DJANGO SERVER) ─── */}
          <div className="flex flex-col justify-center items-center px-0.5 text-center self-center shrink-0 w-[42px] xs:w-[50px] lg:w-[68px] py-1 select-none">
            <div className={`text-[7px] xs:text-[7.5px] lg:text-[8.5px] font-black leading-tight transition-all duration-300 ${
              currentStep === 2 ? 'text-emerald-600 scale-105' : 'text-slate-600'
            }`}>
              HTTP Request
            </div>
            <div className="text-[6px] xs:text-[6.5px] lg:text-[7.5px] font-semibold text-slate-500 leading-none mb-0.5 sm:mb-1 truncate max-w-full">(Payload/JSON)</div>

            <svg className="w-full h-6 sm:h-8 overflow-visible" viewBox="0 0 68 30">
              {/* Forward: Emerald Wire */}
              <line x1="2" y1="8" x2="60" y2="8" stroke="#059669" strokeWidth="2.5" className="anim-tg-dash-fwd" strokeLinecap="round" />
              <polygon points="56,4 66,8 56,12" fill="#059669" />
              <circle r="3" fill="#34D399" className="drop-shadow-xs">
                <animate attributeName="cx" from="4" to="60" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="8;8" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" />
              </circle>

              {/* Reverse: Purple Wire */}
              <line x1="66" y1="22" x2="8" y2="22" stroke="#7C3AED" strokeWidth="2.5" className="anim-tg-dash-rev" strokeLinecap="round" />
              <polygon points="12,18 2,22 12,26" fill="#7C3AED" />
              <circle r="3" fill="#A78BFA" className="drop-shadow-xs">
                <animate attributeName="cx" from="64" to="6" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="22;22" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className={`text-[7px] xs:text-[7.5px] lg:text-[8.5px] font-black leading-tight mt-0.5 sm:mt-1 transition-all duration-300 ${
              currentStep === 3 ? 'text-purple-600 scale-105' : 'text-slate-600'
            }`}>
              HTTP Response
            </div>
            <div className="text-[6px] xs:text-[6.5px] lg:text-[7.5px] font-semibold text-slate-500 leading-none truncate max-w-full">(HTML/JSON)</div>
          </div>

          {/* ─── LAYER 3: DJANGO BACKEND ─── */}
          <div
            onClick={() => handleStepClick(3)}
            className={`flex-1 min-w-[130px] xs:min-w-[145px] sm:min-w-[170px] lg:min-w-0 bg-[#FAF5FF] rounded-lg xs:rounded-xl sm:rounded-2xl border border-[#E9D5FF] p-1.5 xs:p-2 sm:p-3.5 flex flex-col justify-between shadow-2xs transition-all duration-300 group cursor-pointer relative overflow-hidden ${
              currentStep === 3
                ? 'ring-2 ring-[#7C3AED] shadow-lg shadow-purple-500/20 bg-[#F3E8FF]'
                : 'hover:shadow-md'
            }`}
          >
            {currentStep === 3 && (
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none anim-tg-shimmer" />
            )}

            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between p-1 xs:p-1.5 sm:p-2 rounded-md sm:rounded-xl bg-[#7C3AED] text-white mb-1.5 sm:mb-2.5 shadow-2xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white text-[#7C3AED] flex items-center justify-center font-black text-[9px] sm:text-xs shrink-0 shadow-xs">
                    3
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-[9px] xs:text-[10px] sm:text-[13px] leading-tight">
                      Django Backend
                    </div>
                    <div className="text-[7px] xs:text-[7.5px] sm:text-[9.5px] font-semibold text-purple-100 leading-none">
                      (Application Layer)
                    </div>
                  </div>
                </div>

                {currentStep === 3 && (
                  <span className="px-1 py-0.5 rounded-full bg-white/20 text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-tight animate-pulse">
                    Computing
                  </span>
                )}
              </div>

              {/* Django Logo & Framework Badge */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-purple-100 shadow-2xs flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <div className="px-1.5 py-0.5 rounded bg-[#092E20] text-emerald-400 font-black text-[8px] sm:text-[10px] tracking-wide flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                  <i className="fa-solid fa-code text-[7px] sm:text-[8px]"></i> django
                </div>
                <span className="text-[7.5px] xs:text-[8px] sm:text-[9.5px] font-bold text-slate-700">Python 3.x Framework</span>
              </div>

              {/* 8 Backend Capabilities */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-purple-100 shadow-2xs space-y-0.5">
                {[
                  { icon: 'fa-solid fa-gear text-purple-600', text: 'URL Routing' },
                  { icon: 'fa-solid fa-code text-indigo-600', text: 'Views & Controllers' },
                  { icon: 'fa-solid fa-gears text-blue-600', text: 'Business Logic' },
                  { icon: 'fa-solid fa-shield-halved text-rose-600', text: 'Validation & Auth' },
                  { icon: 'fa-solid fa-users-gear text-emerald-600', text: 'Role-Based Access' },
                  { icon: 'fa-solid fa-database text-amber-600', text: 'ORM Model Mapping' },
                  { icon: 'fa-solid fa-comment-dots text-teal-600', text: 'Session & Messages' },
                  { icon: 'fa-solid fa-server text-cyan-600', text: 'API / DB Operations' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1 sm:gap-1.5 px-1 sm:px-1.5 py-0.5 rounded text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold transition-colors ${
                      currentStep === 3 ? 'bg-purple-100/70 text-slate-900' : 'bg-purple-50/50 text-slate-700'
                    }`}
                  >
                    <i className={`${item.icon} text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center shrink-0`}></i>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tripgen-card-sheen"></div>
          </div>

          {/* ─── FLOW CONNECTOR 3 ➔ 4 (DJANGO TO MYSQL DATABASE) ─── */}
          <div className="flex flex-col justify-center items-center px-0.5 text-center self-center shrink-0 w-[42px] xs:w-[50px] lg:w-[68px] py-1 select-none">
            <div className={`text-[7px] xs:text-[7.5px] lg:text-[8.5px] font-black leading-tight transition-all duration-300 ${
              currentStep === 3 ? 'text-purple-600 scale-105' : 'text-slate-600'
            }`}>
              SQL Queries
            </div>
            <div className="text-[6px] xs:text-[6.5px] lg:text-[7.5px] font-semibold text-slate-500 leading-none mb-0.5 sm:mb-1 truncate max-w-full">(ORM/CRUD)</div>

            <svg className="w-full h-6 sm:h-8 overflow-visible" viewBox="0 0 68 30">
              {/* Forward: Purple Wire */}
              <line x1="2" y1="8" x2="60" y2="8" stroke="#7C3AED" strokeWidth="2.5" className="anim-tg-dash-fwd" strokeLinecap="round" />
              <polygon points="56,4 66,8 56,12" fill="#7C3AED" />
              <circle r="3" fill="#A78BFA" className="drop-shadow-xs">
                <animate attributeName="cx" from="4" to="60" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="8;8" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" />
              </circle>

              {/* Reverse: Amber Wire */}
              <line x1="66" y1="22" x2="8" y2="22" stroke="#D97706" strokeWidth="2.5" className="anim-tg-dash-rev" strokeLinecap="round" />
              <polygon points="12,18 2,22 12,26" fill="#D97706" />
              <circle r="3" fill="#FBBF24" className="drop-shadow-xs">
                <animate attributeName="cx" from="64" to="6" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="22;22" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className={`text-[7px] xs:text-[7.5px] lg:text-[8.5px] font-black leading-tight mt-0.5 sm:mt-1 transition-all duration-300 ${
              currentStep === 4 ? 'text-amber-600 scale-105' : 'text-slate-600'
            }`}>
              Query Results
            </div>
            <div className="text-[6px] xs:text-[6.5px] lg:text-[7.5px] font-semibold text-slate-500 leading-none truncate max-w-full">(Data)</div>
          </div>

          {/* ─── LAYER 4: MYSQL DATABASE ─── */}
          <div
            onClick={() => handleStepClick(4)}
            className={`flex-1 min-w-[130px] xs:min-w-[145px] sm:min-w-[170px] lg:min-w-0 bg-[#FFFBEB] rounded-lg xs:rounded-xl sm:rounded-2xl border border-[#FDE68A] p-1.5 xs:p-2 sm:p-3.5 flex flex-col justify-between shadow-2xs transition-all duration-300 group cursor-pointer relative overflow-hidden ${
              currentStep === 4
                ? 'ring-2 ring-[#D97706] shadow-lg shadow-amber-500/20 bg-[#FEF3C7]'
                : 'hover:shadow-md'
            }`}
          >
            {currentStep === 4 && (
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none anim-tg-shimmer" />
            )}

            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between p-1 xs:p-1.5 sm:p-2 rounded-md sm:rounded-xl bg-[#D97706] text-white mb-1.5 sm:mb-2.5 shadow-2xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white text-[#D97706] flex items-center justify-center font-black text-[9px] sm:text-xs shrink-0 shadow-xs">
                    4
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-[9px] xs:text-[10px] sm:text-[13px] leading-tight">
                      MySQL Database
                    </div>
                    <div className="text-[7px] xs:text-[7.5px] sm:text-[9.5px] font-semibold text-amber-100 leading-none">
                      (Data Layer)
                    </div>
                  </div>
                </div>

                {currentStep === 4 && (
                  <span className="px-1 py-0.5 rounded-full bg-white/20 text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-tight animate-pulse">
                    Querying
                  </span>
                )}
              </div>

              {/* MySQL Header */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-amber-100 shadow-2xs flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-blue-600 shrink-0">
                  <i className="fa-solid fa-database text-[9px] sm:text-xs"></i>
                </div>
                <div className="text-left">
                  <div className="font-black text-[9px] sm:text-xs text-[#00618A] tracking-wider leading-none">MySQL</div>
                  <div className="text-[7px] xs:text-[7.5px] sm:text-[8.5px] font-semibold text-slate-500 leading-none mt-0.5">Relational DB</div>
                </div>
              </div>

              {/* 8 Database Tables */}
              <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-amber-100 shadow-2xs space-y-0.5">
                {[
                  'Users Table',
                  'Itineraries Table',
                  'Transport Table',
                  'Hotels Table',
                  'Bookings Table',
                  'Feedback Table',
                  'Login Logs Table',
                  'Others...'
                ].map((tbl, tIdx) => (
                  <div
                    key={tIdx}
                    className={`flex items-center gap-1 px-1 py-0.5 rounded text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold transition-colors ${
                      currentStep === 4 ? 'bg-amber-100/70 text-slate-900' : 'bg-amber-50/40 text-slate-700'
                    }`}
                  >
                    <i className="fa-solid fa-table-cells text-blue-500 text-[7px] sm:text-[8px] shrink-0"></i>
                    <span className="truncate">{tbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tripgen-card-sheen"></div>
          </div>

        </div>

        {/* ─── PART 2: CONNECTING MIDDLE HUB (SYSTEM MODULES WITH ANIMATED BRANCHING BUS) ─── */}
        <div className="flex flex-col items-center justify-center relative -my-0.5">
          {/* Top vertical animated dashed stem down to hub */}
          <div className="w-0.5 h-3 bg-sky-400 relative overflow-hidden">
            <div className="w-full h-2 bg-white/80 absolute top-0 animate-pulse"></div>
          </div>

          {/* Central Hub Pill Badge */}
          <div
            onClick={() => handleStepClick(5)}
            className={`relative group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dashed border-sky-400 shadow-2xs transition-all duration-300 cursor-pointer ${
              currentStep === 5 ? 'scale-105 ring-2 ring-sky-400 shadow-md bg-sky-50' : 'hover:scale-105'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#0284C7] text-white font-black text-[11px] flex items-center justify-center shadow-xs">
              5
            </div>
            <span className="font-black text-xs sm:text-[13px] text-[#0B2545] tracking-tight">
              System Modules <span className="font-semibold text-slate-600 text-xs">(Role-Based Features)</span>
            </span>

            {currentStep === 5 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            )}
          </div>

          {/* Branching SVG Bus with Line-by-Line Individual Staggered Distribution (Visible on All Viewports) */}
          <div className="block w-full max-w-[98%] sm:max-w-[94%] mx-auto h-4 xs:h-5 sm:h-7 relative -mt-0.5">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 32" preserveAspectRatio="none">
              {/* Central vertical stem down from hub: (500, 0) to (500, 14) */}
              <line x1="500" y1="0" x2="500" y2="14" stroke="#0284C7" strokeWidth="2.5" className="anim-tg-dash-v-down" strokeLinecap="round" />
              
              {/* Left distribution bus line radiating from (500, 14) to (125, 14) */}
              <line x1="500" y1="14" x2="125" y2="14" stroke="#38BDF8" strokeWidth="2.5" className="anim-tg-dash-fwd" strokeLinecap="round" />

              {/* Right distribution bus line radiating from (500, 14) to (875, 14) */}
              <line x1="500" y1="14" x2="875" y2="14" stroke="#38BDF8" strokeWidth="2.5" className="anim-tg-dash-fwd" strokeLinecap="round" />

              {/* Central Distribution Junction Node at (500, 14) */}
              <circle cx="500" cy="14" r="3.5" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />

              {/* Corner Junction Nodes */}
              <circle cx="125" cy="14" r="2.5" fill="#0284C7" />
              <circle cx="375" cy="14" r="2.5" fill="#E11D48" />
              <circle cx="625" cy="14" r="2.5" fill="#059669" />
              <circle cx="875" cy="14" r="2.5" fill="#D97706" />

              {/* ─── BRANCH 1: DOWN TO PUBLIC / GUEST (BLUE) ─── */}
              <line x1="125" y1="14" x2="125" y2="28" stroke="#0284C7" strokeWidth="2.5" className="anim-tg-dash-v-down" strokeLinecap="round" />
              <polygon points="121,26 125,32 129,26" fill="#0284C7" />
              
              {/* Traveling Photon 1: Blue -> Public/Guest (Simultaneous: (500,0) -> (500,14) -> (125,14) -> (125,30)) */}
              <g>
                <circle r="6" fill="#38BDF8" opacity="0.35">
                  <animate attributeName="cx" values="500; 500; 125; 125; 125" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 0.4; 0.4; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1">
                  <animate attributeName="cx" values="500; 500; 125; 125; 125" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* ─── BRANCH 2: DOWN TO ADMIN (ROSE / RED) ─── */}
              <line x1="375" y1="14" x2="375" y2="28" stroke="#E11D48" strokeWidth="2.5" className="anim-tg-dash-v-down" strokeLinecap="round" />
              <polygon points="371,26 375,32 379,26" fill="#E11D48" />

              {/* Traveling Photon 2: Red -> Admin (Simultaneous: (500,0) -> (500,14) -> (375,14) -> (375,30)) */}
              <g>
                <circle r="6" fill="#FB7185" opacity="0.35">
                  <animate attributeName="cx" values="500; 500; 375; 375; 375" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 0.4; 0.4; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#E11D48" stroke="#FECDD3" strokeWidth="1">
                  <animate attributeName="cx" values="500; 500; 375; 375; 375" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* ─── BRANCH 3: DOWN TO EMPLOYEE (GREEN) ─── */}
              <line x1="625" y1="14" x2="625" y2="28" stroke="#059669" strokeWidth="2.5" className="anim-tg-dash-v-down" strokeLinecap="round" />
              <polygon points="621,26 625,32 629,26" fill="#059669" />

              {/* Traveling Photon 3: Green -> Employee (Simultaneous: (500,0) -> (500,14) -> (625,14) -> (625,30)) */}
              <g>
                <circle r="6" fill="#34D399" opacity="0.35">
                  <animate attributeName="cx" values="500; 500; 625; 625; 625" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 0.4; 0.4; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#059669" stroke="#A7F3D0" strokeWidth="1">
                  <animate attributeName="cx" values="500; 500; 625; 625; 625" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* ─── BRANCH 4: DOWN TO TRAVELER (AMBER / GOLD) ─── */}
              <line x1="875" y1="14" x2="875" y2="28" stroke="#D97706" strokeWidth="2.5" className="anim-tg-dash-v-down" strokeLinecap="round" />
              <polygon points="871,26 875,32 879,26" fill="#D97706" />

              {/* Traveling Photon 4: Amber -> Traveler (Simultaneous: (500,0) -> (500,14) -> (875,14) -> (875,30)) */}
              <g>
                <circle r="6" fill="#FBBF24" opacity="0.35">
                  <animate attributeName="cx" values="500; 500; 875; 875; 875" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 0.4; 0.4; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#D97706" stroke="#FDE68A" strokeWidth="1">
                  <animate attributeName="cx" values="500; 500; 875; 875; 875" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="0; 14; 14; 30; 30" keyTimes="0; 0.10; 0.70; 0.88; 1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; 0.04; 0.85; 0.92; 1" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </div>

          {/* Mobile connecting dashed pipe (Replaced by responsive branching SVG bus) */}
          <div className="hidden"></div>
        </div>

        {/* ─── PART 3: BOTTOM 4 ROLE-BASED SYSTEM MODULES (4-COLUMN FORMAT ON ALL VIEWPORTS) ─── */}
        <div className="grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-3 lg:gap-4 items-stretch">
          {TRIPGEN_SYSTEM_MODULES.map((mod) => {
            const isRoleHovered = hoveredRole === mod.roleKey;
            const isStepActive = currentStep === 5;

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setHoveredRole(mod.roleKey)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`rounded-lg xs:rounded-xl sm:rounded-2xl border ${mod.cardBg} flex flex-col justify-between overflow-hidden shadow-2xs transition-all duration-300 group relative ${
                  isRoleHovered || isStepActive
                    ? `${mod.activeRing} scale-[1.02]`
                    : 'hover:shadow-md'
                }`}
              >
                {/* Active Shimmer */}
                {(isRoleHovered || isStepActive) && (
                  <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none anim-tg-shimmer" />
                )}

                <div>
                  {/* Header Pill */}
                  <div className={`p-1 xs:p-1.5 sm:p-3.5 ${mod.headerBg} shadow-2xs flex items-center justify-between`}>
                    <div className="flex items-center gap-1 sm:gap-2.5 min-w-0">
                      <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shrink-0 text-[8px] xs:text-[9px] sm:text-xs shadow-xs transition-transform duration-300 group-hover:scale-110">
                        <i className={mod.icon}></i>
                      </div>
                      <h4 className="font-black text-[7.5px] xs:text-[8.5px] sm:text-sm text-white tracking-tight truncate">
                        {mod.title}
                      </h4>
                    </div>

                    {isRoleHovered && (
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] font-bold text-white tracking-tight">
                        Linked
                      </span>
                    )}
                  </div>

                  {/* Bullets List */}
                  <div className="p-1 xs:p-1.5 sm:p-3.5 space-y-0.5 xs:space-y-1 sm:space-y-2.5">
                    {mod.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1 sm:gap-2 group/item transition-transform duration-200 hover:translate-x-0.5">
                        <span className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full mt-0.5 sm:mt-1 shrink-0 ${mod.bulletColor.replace('text-', 'bg-')} transition-transform duration-200 group-hover/item:scale-125`}></span>
                        <span className="text-[6.5px] xs:text-[7.5px] sm:text-xs font-bold text-slate-900 leading-tight group-hover/item:text-slate-950 truncate xs:whitespace-normal">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tripgen-card-sheen"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
