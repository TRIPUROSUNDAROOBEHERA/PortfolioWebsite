import React from 'react';

export default function AchievementCard({ setActiveTab }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-trophy text-amber-500"></i>
          <span>Achievements</span>
        </div>
        <button onClick={() => setActiveTab('achievements')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <i className="fa-solid fa-medal text-amber-500 text-xs mt-0.5"></i>
          <div>
            <div className="font-bold text-slate-900 text-[11px]">College Topper - MCA</div>
            <div className="text-[9.5px] text-slate-500">Rank 1 in Academic Excellence</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <i className="fa-solid fa-trophy text-blue-600 text-xs mt-0.5"></i>
          <div>
            <div className="font-bold text-slate-900 text-[11px]">Hackathon Winner</div>
            <div className="text-[9.5px] text-slate-500">State Level Smart India Finalist</div>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <i className="fa-solid fa-trophy text-amber-400 text-2xl"></i>
      </div>
    </div>
  );
}