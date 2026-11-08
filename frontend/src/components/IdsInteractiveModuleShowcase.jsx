import React, { useState, useRef, useEffect } from 'react';

/**
 * IDS Application Modules - Interactive Tabbed Showcase
 * Matching the exact procedure from TripGen (Image 2):
 * Tabs: [Home] [Admin] [User] [Prediction] [Reports]
 * Features:
 * - High-clarity live screenshots
 * - Left/Right click zones for instant navigation
 * - Numbered pagination + Previous/Next buttons
 * - Subheading and descriptive walkthrough text
 * - Lightbox full-resolution modal preview
 */

export const IDS_ROLE_TABS = [
  {
    key: 'home',
    tabLabel: 'Home',
    fullName: 'Home & Navigation Gateway',
    subheading: 'Public Landing Page & Real-Time Security Alert Portal',
    desc: 'Main application landing interface presenting system capabilities, architectural overview, live intrusion alert banner, and public access points without requiring authentication.',
    icon: 'fa-house',
    badge: 'Guest / Public Access',
    colorClasses: {
      activeBtn: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25',
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      dotColor: 'bg-blue-600',
    },
    screens: [
      {
        num: 1,
        title: 'IDS System Home & Navigation Gateway',
        subheading: 'Machine Learning Techniques Applied for Cyber Attack Detection',
        desc: 'Main landing page introducing the Machine Learning Intrusion Detection System, system navigation bar (Home, Admin, Login, Register), and live ALERT Intrusion Detected banner.',
        image: '/ids-gallery/01_ids_home_page.png',
        resolution: '1221 × 716 HD',
        techInfo: 'Django View: views.index | Template: index.html',
        features: ['Landing page overview', 'Header navigation links', 'Real-time alert banner', 'Guest access entrypoint'],
      },
    ],
  },
  {
    key: 'admin',
    tabLabel: 'Admin',
    fullName: 'Admin Superuser Console',
    subheading: 'Administrative Command Center & Staff Governance Console',
    desc: 'Dedicated superuser console providing centralized analyst account monitoring, system diagnostic verification, live threat alert inspection, and administrative audit logging.',
    icon: 'fa-shield-halved',
    badge: 'Admin Superuser (3 Screens)',
    colorClasses: {
      activeBtn: 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/25',
      iconColor: 'text-purple-600',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      dotColor: 'bg-purple-600',
    },
    screens: [
      {
        num: 1,
        title: 'Administrator Authentication Terminal',
        subheading: 'Superuser Security Access Control Gateway',
        desc: 'Dedicated administrative terminal enforcing privileged credential authentication and session key verification to prevent unauthorized privilege escalation.',
        image: '/ids-gallery/05_ids_admin_login.png',
        resolution: '1185 × 873 HD',
        techInfo: 'Django View: views.admin_login | Template: admin_login.html',
        features: ['Superuser authentication', 'Role privilege verification', 'Session token generation', 'Administrative audit logging'],
      },
      {
        num: 2,
        title: 'Admin Operations Control Bar',
        subheading: 'Executive System Command & Diagnostic Bar',
        desc: 'Top-level administrative menu with immediate switches for View Users, Accuracy Result inspection, and secure session management.',
        image: '/ids-gallery/06_ids_admin_dashboard_header.png',
        resolution: '1202 × 660 HD',
        techInfo: 'Django View: views.admin_home | Template: admin_base.html',
        features: ['One-click module switching', 'Active administrative session status', 'System notification badges', 'Logout handler'],
      },
      {
        num: 3,
        title: 'Admin User Management & Audit Directory',
        subheading: 'Operator Registry & Account Governance Console',
        desc: 'Administrative registry monitoring all registered analysts and operators with contact credentials, locations, emails, and active user badges.',
        image: '/ids-gallery/16_ids_admin_view_users_list.png',
        resolution: '1108 × 1035 HD',
        techInfo: 'Django View: views.view_users | Template: view_users.html',
        features: ['User directory audit table', 'Credential and contact inspection', 'Profile image validation', 'Operator accountability controls'],
      },
    ],
  },
  {
    key: 'user',
    tabLabel: 'User',
    fullName: 'User / Operator Workspace',
    subheading: 'Analyst Workspace, Profile Management & Session Hub',
    desc: 'Operator workspace allowing registered security analysts to sign in, complete biometric registration, modify profile credentials, update passwords, and initiate intrusion classification tests.',
    icon: 'fa-user',
    badge: 'User Workspace (6 Screens)',
    colorClasses: {
      activeBtn: 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/25',
      iconColor: 'text-amber-600',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-600',
    },
    screens: [
      {
        num: 1,
        title: 'Secure Operator Login Portal',
        subheading: 'Operator Credential Verification & Session Initialization',
        desc: 'User authentication gateway validating registered operator credentials with CSRF protection and password security checks.',
        image: '/ids-gallery/02_ids_user_login.png',
        resolution: '1100 × 932 HD',
        techInfo: 'Django View: views.user_login | Template: user_login.html',
        features: ['Username and password authentication', 'Session management', 'Error validation alerts', 'Secure cookie verification'],
      },
      {
        num: 2,
        title: 'Operator Registration & Profile Upload',
        subheading: 'Multi-Field Analyst Onboarding Portal',
        desc: 'Self-registration interface for network analysts capturing username, password, phone number, email address, city, and profile picture upload.',
        image: '/ids-gallery/03_ids_user_registration.png',
        resolution: '1217 × 1025 Full HD',
        techInfo: 'Django View: views.user_register | Template: register.html',
        features: ['Multi-field operator registration', 'Image file upload handler', 'Form input validation', 'MySQL/SQLite user entity insertion'],
      },
      {
        num: 3,
        title: 'User Workspace & Session Home',
        subheading: 'Personalized Operator Management Workspace',
        desc: 'Personalized user landing dashboard showing "welcome : Sram" greeting and user action navigation (View Profile, Edit Profile, Change Password, Prediction, Logout).',
        image: '/ids-gallery/08_ids_user_welcome_dashboard.png',
        resolution: '1221 × 1017 HD',
        techInfo: 'Django View: views.user_home | Template: user_home.html',
        features: ['Personalized welcome banner', 'Operator session state', 'Direct link to Intrusion Prediction engine', 'Profile navigation toolbar'],
      },
      {
        num: 4,
        title: 'Operator Profile & Credentials Record',
        subheading: 'Verified Identity & Contact Metadata Overview',
        desc: 'Profile inspection screen rendering operator information: User Name (Sram), Email Address (sram@gmail.com), City Address (Nellore), Contact Number, and verified profile picture.',
        image: '/ids-gallery/09_ids_user_profile_view.png',
        resolution: '1223 × 1002 HD',
        techInfo: 'Django View: views.view_profile | Template: view_profile.html',
        features: ['Complete operator profile record', 'Live avatar rendering', 'Contact and location metadata', 'Session data verification'],
      },
      {
        num: 5,
        title: 'Edit Profile & Details Modification',
        subheading: 'Self-Service Analyst Information Update Form',
        desc: 'Self-service profile update screen allowing operators to change contact numbers, email addresses, residence locations, and upload new avatar images.',
        image: '/ids-gallery/10_ids_edit_profile_screen.png',
        resolution: '1212 × 1026 HD',
        techInfo: 'Django View: views.edit_profile | Template: edit_profile.html',
        features: ['Dynamic form pre-population', 'File upload replacement handler', 'Validation before database commit', 'Instant feedback notification'],
      },
      {
        num: 6,
        title: 'Change Password & Security Gateway',
        subheading: 'Cryptographic Credential Rotation Terminal',
        desc: 'Password rotation interface providing secure credential replacement with cryptographic hashing to guard against credential stuffing.',
        image: '/ids-gallery/11_ids_change_password_screen.png',
        resolution: '1207 × 901 HD',
        techInfo: 'Django View: views.change_password | Template: change_password.html',
        features: ['Secure password update', 'Encrypted hash storage in DB', 'Session authentication check', 'Success confirmation banner'],
      },
    ],
  },
  {
    key: 'prediction',
    tabLabel: 'Prediction',
    fullName: 'Intrusion Prediction Engine',
    subheading: 'Live Feature Telemetry Ingestion & ML Inference Pipeline',
    desc: 'Real-time intrusion detection and classification workspace analyzing 41 NSL-KDD network packet parameters to identify malicious patterns, DoS attacks, probes, and anomalies.',
    icon: 'fa-brain',
    badge: 'ML Prediction (2 Screens)',
    colorClasses: {
      activeBtn: 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/25',
      iconColor: 'text-cyan-600',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      dotColor: 'bg-cyan-600',
    },
    screens: [
      {
        num: 1,
        title: 'Live Intrusion Prediction Input Form',
        subheading: 'NSL-KDD Feature Input & Classification Interface',
        desc: 'Network traffic feature extraction form where operators input live packet telemetry: dst_host_count, dst_host_diff_srv_rate, dst_host_same_src_port_rate, status flags, and HTTP protocol flags for ML inference.',
        image: '/ids-gallery/12_ids_intrusion_prediction_form.png',
        resolution: '1102 × 1031 HD',
        techInfo: 'Django View: views.prediction | ML Model: Random Forest Classifier',
        features: ['NSL-KDD 41-feature subset input fields', 'Drop-down protocol flags', 'Feature validation prior to inference', 'Trigger real-time machine learning prediction'],
      },
      {
        num: 2,
        title: 'Live Intrusion Detection: PROBE Attack Identified',
        subheading: 'Live Threat Classification & Incident Flagging',
        desc: 'Live detection report demonstrating machine learning model output identifying incoming traffic as "Predicted Result: PROBE" attack, allowing security personnel to immediately quarantine malicious IP addresses.',
        image: '/ids-gallery/18_ids_predicted_result_probe_attack.png',
        resolution: '1107 × 1027 HD',
        techInfo: 'Inference Output: model.predict(X_test) -> "PROBE Attack"',
        features: ['Instant ML classification output', 'Accurate threat identification (PROBE)', 'Visual red/bold alert result display', 'Actionable security incident telemetry'],
      },
    ],
  },
  {
    key: 'reports',
    tabLabel: 'Reports',
    fullName: 'Accuracy & Detection Reports',
    subheading: 'Ensemble Algorithm Accuracy Metrics & Incident Telemetry Reports',
    desc: 'Comprehensive diagnostic reports and benchmark evaluations demonstrating 98.6% Random Forest accuracy, comparative classifier charts, confusion matrices, and threat logs.',
    icon: 'fa-file-lines',
    badge: 'Reports & Diagnostics (2 Screens)',
    colorClasses: {
      activeBtn: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25',
      iconColor: 'text-emerald-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-600',
    },
    screens: [
      {
        num: 1,
        title: 'Multi-Algorithm Accuracy Benchmark Comparison',
        subheading: 'Comparative Performance Diagnostics (RF, DT, Extra Trees)',
        desc: 'Comprehensive benchmark comparison table showing performance of tested classifiers: Random Forest (98.6%), Decision Tree, XGBoost, and Extra Trees on the NSL-KDD intrusion detection dataset.',
        image: '/ids-gallery/14_ids_model_accuracy_multi_algorithm.png',
        resolution: '1333 × 1020 HD',
        techInfo: 'Scikit-learn: cross_val_score, accuracy_score evaluation',
        features: ['Side-by-side accuracy comparison', 'Evaluates 4 state-of-the-art ML models', 'Performance metric transparency', 'Dataset benchmark scoring'],
      },
      {
        num: 2,
        title: 'Forensic Detection Report & Audit Incident Summary',
        subheading: 'Quarantine & Mitigation Telemetry Record',
        desc: 'Forensic detection report summarizing identified attack vectors (PROBE, DoS, U2R, R2L), model confidence levels, and actionable mitigation telemetry for security operations.',
        image: '/ids-gallery/18_ids_predicted_result_probe_attack.png',
        resolution: '1107 × 1027 HD',
        techInfo: 'Incident Log: Forensic audit export & SIEM dispatcher payload',
        features: ['Incident quarantine trigger', 'Granular attack signature match', 'Threat mitigation recommendation', 'Exportable compliance log'],
      },
    ],
  },
];

export default function IdsInteractiveModuleShowcase() {
  // activeTabKey starts as null so no button is pre-identified on initial load or scroll!
  const [activeTabKey, setActiveTabKey] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Transition state: tracks outgoing screen, animation direction ('right' | 'left'), and counter
  const [transitionState, setTransitionState] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const animTimeoutRef = useRef(null);

  const effectiveTabKey = activeTabKey || 'home';
  const activeGroup = IDS_ROLE_TABS.find((t) => t.key === effectiveTabKey) || IDS_ROLE_TABS[0];
  const screens = activeGroup.screens;
  const currentIdx = Math.max(0, Math.min(slideIndex, screens.length - 1));
  const currentScreen = screens[currentIdx] || screens[0];

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const goToSlide = (targetIdx, dir) => {
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setTransitionState({ prevScreen: currentScreen, dir });
    setAnimKey((k) => k + 1);
    setSlideIndex(targetIdx);
    animTimeoutRef.current = setTimeout(() => {
      setTransitionState(null);
    }, 400);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (screens.length <= 1) {
      // Advance to next module tab smoothly coming from right
      const currentTabIdx = IDS_ROLE_TABS.findIndex((t) => t.key === effectiveTabKey);
      const nextTabIdx = (currentTabIdx + 1) % IDS_ROLE_TABS.length;
      handleSelectTab(IDS_ROLE_TABS[nextTabIdx].key, 'right');
      return;
    }
    const nextIdx = currentIdx < screens.length - 1 ? currentIdx + 1 : 0;
    goToSlide(nextIdx, 'right');
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (screens.length <= 1) {
      // Advance to previous module tab smoothly coming from left
      const currentTabIdx = IDS_ROLE_TABS.findIndex((t) => t.key === effectiveTabKey);
      const prevTabIdx = (currentTabIdx - 1 + IDS_ROLE_TABS.length) % IDS_ROLE_TABS.length;
      handleSelectTab(IDS_ROLE_TABS[prevTabIdx].key, 'left');
      return;
    }
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : screens.length - 1;
    goToSlide(prevIdx, 'left');
  };

  const handlePillClick = (targetIdx) => {
    if (targetIdx === currentIdx) return;
    goToSlide(targetIdx, targetIdx > currentIdx ? 'right' : 'left');
  };

  const handleSelectTab = (key, forcedDir) => {
    if (key === activeTabKey) return;
    const currentTabIdx = IDS_ROLE_TABS.findIndex((t) => t.key === effectiveTabKey);
    const newTabIdx = IDS_ROLE_TABS.findIndex((t) => t.key === key);
    const dir = forcedDir || (newTabIdx >= currentTabIdx ? 'right' : 'left');

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setTransitionState({ prevScreen: currentScreen, dir });
    setAnimKey((k) => k + 1);
    setActiveTabKey(key);
    setSlideIndex(0);

    animTimeoutRef.current = setTimeout(() => {
      setTransitionState(null);
    }, 400);
  };

  return (
    <div id="ids-interactive-modules-showcase" className="w-full space-y-4">
      {/* ─── 1. TOP HEADER & TABS (LEFT-ALIGNED TITLE ON MOBILE & DESKTOP) ─── */}
      <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-center gap-2 sm:gap-3 w-full">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-black tracking-tight text-left self-start lg:w-auto lg:absolute lg:left-0 select-text">
          Application Modules
        </h2>

        {/* Five Middle-Centered Category Tabs: Home | Admin | User | Prediction | Reports (All in ONE row matching Image 2) */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 flex-nowrap justify-center mx-auto">
          {IDS_ROLE_TABS.map((tab) => {
            const isSelected = activeTabKey === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleSelectTab(tab.key)}
                className={`px-2 xs:px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-[9px] xs:text-[10.5px] sm:text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 xs:gap-1.5 sm:gap-2 border active:scale-95 shrink-0 ${
                  isSelected
                    ? tab.colorClasses.activeBtn
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <i
                  className={`fa-solid ${tab.icon} text-[8px] xs:text-[9.5px] sm:text-xs transition-colors ${
                    isSelected ? 'text-white' : tab.colorClasses.iconColor
                  }`}
                ></i>
                <span className="whitespace-nowrap">{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 2. ADAPTIVE LAYOUT: MOBILE STACKED (IMAGE TOP -> PAGINATION -> CONTENT BOTTOM, MATCHING IMAGE 2) | DESKTOP SPLIT (CONTENT LEFT, IMAGE RIGHT) ─── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-5 lg:gap-6 md:items-center">
          
          {/* ─── SCREEN IMAGE VIEWER & PAGINATION (MOBILE: TOP ORDER-1 | DESKTOP: RIGHT ORDER-2) ─── */}
          <div className="order-1 md:order-2 md:col-span-7 lg:col-span-8 flex flex-col space-y-2 sm:space-y-3">
            
            {/* Main Screen Container with Click-to-Next/Prev Zones */}
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-md group">
              <div className="relative w-full bg-slate-950 flex items-center justify-center min-h-[190px] xs:min-h-[220px] sm:min-h-[360px] lg:min-h-[400px] select-none overflow-hidden">
                
                {/* Outgoing Slide (visible during directional animation) */}
                {transitionState?.prevScreen && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center p-1 xs:p-1.5 sm:p-3 pointer-events-none ${
                      transitionState.dir === 'right'
                        ? 'animate-ids-slide-out-left'
                        : 'animate-ids-slide-out-right'
                    }`}
                  >
                    <img
                      src={transitionState.prevScreen.image}
                      alt={transitionState.prevScreen.title}
                      className="w-full h-auto max-h-[240px] xs:max-h-[270px] sm:max-h-[500px] object-contain rounded-lg sm:rounded-xl select-none"
                    />
                  </div>
                )}

                {/* Incoming / Active Slide */}
                <div
                  key={`active-slide-${effectiveTabKey}-${currentIdx}-${animKey}`}
                  onAnimationEnd={() => setTransitionState(null)}
                  className={`w-full h-full flex items-center justify-center p-1 xs:p-1.5 sm:p-3 ${
                    transitionState
                      ? transitionState.dir === 'right'
                        ? 'animate-ids-slide-in-right'
                        : 'animate-ids-slide-in-left'
                      : ''
                  }`}
                >
                  <img
                    src={currentScreen.image}
                    alt={currentScreen.title}
                    className="w-full h-auto max-h-[240px] xs:max-h-[270px] sm:max-h-[500px] object-contain rounded-lg sm:rounded-xl select-none cursor-pointer"
                    loading="eager"
                    onClick={() => setLightboxOpen(true)}
                    title="Click to view full screen"
                  />
                </div>

                {/* Left Side Touch / Click Zone -> Previous Image (Slides smoothly from left) */}
                <div
                  onClick={handlePrev}
                  className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-20 select-none"
                  style={{ touchAction: 'manipulation' }}
                  title="Click left side for Previous Image"
                  aria-label="Previous Image"
                />

                {/* Right Side Touch / Click Zone -> Next Image (Slides smoothly from right) */}
                <div
                  onClick={handleNext}
                  className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-20 select-none"
                  style={{ touchAction: 'manipulation' }}
                  title="Click right side for Next Image"
                  aria-label="Next Image"
                />
              </div>
            </div>

            {/* ─── PAGINATION CONTROLS DIRECTLY UNDER IMAGE (MATCHING IMAGE 2) ─── */}
            <div className="flex items-center justify-between w-full px-0.5 sm:px-1 select-none pt-0.5 sm:pt-1">
              {/* Left: Previous */}
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1 text-[10px] xs:text-[11px] sm:text-xs font-semibold text-slate-600 transition-colors py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:text-slate-900 hover:bg-slate-100 active:scale-95"
              >
                <i className="fa-solid fa-chevron-left text-[8px] xs:text-[9px] sm:text-[10px]"></i>
                <span>Previous</span>
              </button>

              {/* Middle: Numbered Pills */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                {screens.map((sc, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <button
                      key={sc.num || idx}
                      type="button"
                      onClick={() => handlePillClick(idx)}
                      className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg text-[10px] xs:text-[11px] sm:text-xs font-extrabold transition-all duration-150 flex items-center justify-center cursor-pointer ${
                        isActive
                          ? `${activeGroup.colorClasses.activeBtn} shadow-xs scale-105`
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold border border-slate-200/80'
                      }`}
                      title={sc.title}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Right: Next */}
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 text-[10px] xs:text-[11px] sm:text-xs font-semibold text-slate-600 transition-colors py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg border border-slate-200/80 shadow-2xs cursor-pointer hover:text-slate-900 hover:bg-slate-100 active:scale-95"
              >
                <span>Next</span>
                <i className="fa-solid fa-chevron-right text-[8px] xs:text-[9px] sm:text-[10px]"></i>
              </button>
            </div>

          </div>

          {/* ─── SCREEN CONTENT (MOBILE: BOTTOM ORDER-2 | DESKTOP: LEFT ORDER-1) ─── */}
          <div
            key={`content-${effectiveTabKey}-${currentIdx}-${animKey}`}
            className={`order-2 md:order-1 md:col-span-5 lg:col-span-4 flex flex-col justify-center space-y-1 sm:space-y-2.5 pt-1.5 md:pt-0 ${
              transitionState
                ? transitionState.dir === 'right'
                  ? 'animate-ids-content-right'
                  : 'animate-ids-content-left'
                : 'animate-fadeIn'
            }`}
          >
            <h3 className="text-base xs:text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {currentScreen.title}
            </h3>
            <h4 className="text-xs xs:text-sm font-bold text-slate-700 leading-snug">
              {currentScreen.subheading}
            </h4>
            <p className="text-xs xs:text-sm text-slate-600 leading-relaxed font-normal">
              {currentScreen.desc}
            </p>
          </div>

        </div>
      </div>

      {/* ─── 5. FULLSCREEN LIGHTBOX PREVIEW ─── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
            title="Close (Esc)"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          {/* Lightbox Image */}
          <div
            className="relative max-w-6xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentScreen.image}
              alt={currentScreen.title}
              className="max-h-[80vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Caption */}
          <div
            className="mt-3 text-center text-white max-w-3xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm sm:text-base font-bold">{currentScreen.title}</h4>
            <p className="text-xs text-white/70 mt-0.5">{currentScreen.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
