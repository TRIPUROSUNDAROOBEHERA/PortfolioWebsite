import React from 'react';

export default function ProgressBar({ progress = 0, label = '', showPercentage = true }) {
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
          <span>{label}</span>
          {showPercentage && <span className="text-blue-600 font-mono">{safeProgress}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}