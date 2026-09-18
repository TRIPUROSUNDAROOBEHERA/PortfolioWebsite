import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

export default function Footer({ setActiveTab, profile }) {
  const [systemStatus, setSystemStatus] = useState({
    server: 'Checking...',
    db: 'Checking...',
    version: 'Django 5.1 + REST',
    isOnline: false,
  });

  useEffect(() => {
    let isMounted = true;

    const checkSystemHealth = async () => {
      try {
        // Direct call to Django health check endpoint
        const res = await axiosClient.get('/health/');
        const data = res.data || res;

        if (isMounted) {
          setSystemStatus({
            server: data.backend || 'Online',
            db: data.database || 'Healthy (Local)',
            version: data.architecture || 'Django 5.1 + REST',
            isOnline: true,
          });
        }
      } catch (err) {
        if (isMounted) {
          setSystemStatus({
            server: 'Offline',
            db: 'Check Backend',
            version: 'Django 5.1 + REST',
            isOnline: false,
          });
        }
      }
    };

    // Immediate check on mount
    checkSystemHealth();

    // Auto refresh status every 15 seconds
    const interval = setInterval(checkSystemHealth, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleNavClick = (tabId) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinksLeft = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'blog', label: 'Blog Posts' },
  ];

  const quickLinksRight = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Honors' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer
      className="w-full relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-none mt-20"
      style={{
        background:
          'linear-gradient(90deg, #1d4ed8 0%, #2563eb 25%, #4f46e5 50%, #7c3aed 75%, #9333ea 100%)',
        boxShadow: '0 -10px 40px rgba(124, 58, 237, 0.25)',
      }}
    >
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 pt-10 pb-6 text-white">
        
        {/* ─── 4 COLUMNS MAIN GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">
          
          {/* COLUMN 1: IDENTITY & DESCRIPTION */}
          <div className="space-y-3">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-8 h-8 rounded-xl bg-white text-blue-600 flex items-center justify-center font-black text-xs shadow-md group-hover:scale-105 transition-transform">
                {profile?.initials || 'SR'}
              </div>
              <span className="font-black text-base tracking-tight text-[#FFE600]">
                {profile?.full_name || 'S. Ram Kumar'}
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-white/90 font-medium">
              A modern full-stack web portfolio &amp; content management system
              engineered with React, Tailwind CSS, and Django REST Framework.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFE600] pt-1">
              <i className="fa-solid fa-link text-[11px]"></i>
              <a href="http://localhost:5173" className="hover:underline tracking-wide">
                portfolio.sramkumar.dev
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:pl-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFE600] mb-3 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-xs"></i> QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px] font-semibold text-white/95">
              <div className="space-y-2">
                {quickLinksLeft.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="block text-left hover:text-[#FFE600] transition-colors cursor-pointer w-full"
                  >
                    • {link.label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {quickLinksRight.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="block text-left hover:text-[#FFE600] transition-colors cursor-pointer w-full"
                  >
                    • {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: REAL-TIME SYSTEM STATUS */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFE600] mb-3 flex items-center gap-1.5">
              <i className="fa-solid fa-server text-xs"></i> SYSTEM STATUS
            </h4>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 space-y-2 text-[12px] font-medium shadow-sm">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-white/90">Backend API:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 border ${
                    systemStatus.isOnline
                      ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400/30'
                      : 'bg-rose-500/25 text-rose-300 border-rose-400/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      systemStatus.isOnline
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-rose-400'
                    }`}
                  ></span>
                  {systemStatus.server}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-white/90">Database:</span>
                <span className="text-white font-bold">{systemStatus.db}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Architecture:</span>
                <span className="text-white font-bold">{systemStatus.version}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: BUILT BY PROFILE CARD */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFE600] mb-3 flex items-center gap-1.5">
              <span className="font-mono text-sm font-black">&lt;/&gt;</span> BUILT BY
            </h4>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
              <div>
                <div className="font-black text-xs text-[#FFE600]">
                  {profile?.full_name || 'S. Ram Kumar'}
                </div>
                <div className="text-[10px] text-white/80 font-medium">
                  Full Stack Developer
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1">
                {['React 19', 'Tailwind', 'Django 5', 'MySQL', 'REST API'].map(
                  (tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-white/15 text-white text-[9.5px] font-semibold border border-white/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 pt-2 border-t border-white/15 text-[11px] font-bold text-[#FFE600]">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <i className="fa-brands fa-github text-xs"></i> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <i className="fa-brands fa-linkedin text-xs"></i> LinkedIn
                </a>
                <a
                  href="https://www.naukri.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <i className="fa-solid fa-briefcase text-xs"></i> Naukri
                </a>
                <a
                  href={`mailto:${profile?.email || 'sramkumar0101@gmail.com'}`}
                  className="flex items-center gap-1 hover:underline"
                >
                  <i className="fa-solid fa-envelope text-xs"></i> Email
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ─── BOTTOM COPYRIGHT STRIP ─── */}
        <div className="mt-8 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/85 gap-3 font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFE600] text-slate-900 font-black px-1.5 py-0.5 rounded text-[10px]">
              {profile?.initials || 'SR'}
            </span>
            <span>
              © 2026 {profile?.full_name || 'S. Ram Kumar'}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-5 font-semibold">
            <a href="#privacy" className="hover:text-[#FFE600] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#FFE600] transition-colors">Terms of Service</a>
            <a href="#sitemap" className="hover:text-[#FFE600] transition-colors">Sitemap</a>
          </div>

          <div>
            Made with <span className="text-red-400">❤</span> using React &amp; Django REST Framework
          </div>
        </div>

      </div>
    </footer>
  );
}