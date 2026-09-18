import React, { useState, useEffect } from 'react';

export default function OfflinePage() {
  const [checking, setChecking] = useState(false);
  const [retryFailed, setRetryFailed] = useState(false);

  // Automatically restore when browser detects connection is back
  useEffect(() => {
    const handleAutoRestore = () => {
      window.location.reload();
    };

    window.addEventListener('online', handleAutoRestore);
    return () => window.removeEventListener('online', handleAutoRestore);
  }, []);

  const handleRetry = async () => {
    setChecking(true);
    setRetryFailed(false);

    try {
      // Check real internet reachability by pinging favicon or health endpoint with timestamp
      const response = await fetch(`/api/health/?t=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
      });

      if (response.ok || navigator.onLine) {
        window.location.reload();
      } else {
        setChecking(false);
        setRetryFailed(true);
      }
    } catch {
      setTimeout(() => {
        setChecking(false);
        setRetryFailed(true);
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0f19] text-white px-6 font-['Plus_Jakarta_Sans',sans-serif] select-none">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        {/* Animated Offline Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center text-4xl shadow-xl shadow-rose-500/10 animate-pulse">
            <i className="fa-solid fa-wifi-slash"></i>
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </span>
        </div>

        {/* Heading & Information */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 inline-block">
            Connection Lost
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            You are Offline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            Please check your Wi-Fi or mobile data connection. Live project galleries, blog feeds, and API services cannot load while offline.
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleRetry}
            disabled={checking}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <i className={`fa-solid fa-rotate-right text-xs ${checking ? 'animate-spin' : ''}`}></i>
            {checking ? 'Checking Connection...' : 'Try Again'}
          </button>

          {retryFailed && (
            <p className="text-[11px] font-bold text-rose-400 animate-fade-in">
              Still offline. Please check your network cables or Wi-Fi.
            </p>
          )}
        </div>

        {/* Network Status Badge */}
        <div className="pt-6 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Status: Disconnected from Network</span>
        </div>
      </div>
    </div>
  );
}