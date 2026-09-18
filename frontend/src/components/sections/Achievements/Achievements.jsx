import React from 'react';

export default function Achievements({ setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Achievements & Honors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <i className="fa-solid fa-trophy text-amber-500 text-4xl"></i>
          <div>
            <h3 className="font-bold text-sm text-slate-900">College Topper - MCA (2023)</h3>
            <p className="text-xs text-slate-500 mt-1">Outstanding academic excellence across all semesters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}