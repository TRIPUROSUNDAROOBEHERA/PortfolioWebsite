import React from 'react';

export default function NotFound({ setActiveTab }) {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1E6BFF] to-[#9333EA]">
        404
      </div>
      <h3 className="text-xl font-extrabold text-slate-900">Endpoint / Route Not Found</h3>
      <p className="text-xs text-slate-500 max-w-sm font-medium">
        The requested resource is missing or has been relocated within the portfolio router.
      </p>
      <button
        onClick={() => setActiveTab('home')}
        className="px-6 py-2.5 bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] text-white font-bold text-xs rounded-xl hover:opacity-95 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
      >
        Return to Home Overview
      </button>
    </div>
  );
}