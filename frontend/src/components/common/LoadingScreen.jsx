import React from 'react';

export default function LoadingScreen({ message = 'Initializing Application...' }) {
  return (
    <div className="fixed inset-0 bg-[#f8faff] z-[9999] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E6BFF] to-[#9333EA] flex items-center justify-center text-white text-lg font-black shadow-lg shadow-purple-500/25 animate-pulse">
        SR
      </div>
      <div className="w-8 h-8 rounded-full border-3 border-slate-200 border-t-[#1E6BFF] animate-spin" />
      <p className="text-xs font-bold text-slate-600 tracking-wider font-mono uppercase">
        {message}
      </p>
    </div>
  );
}