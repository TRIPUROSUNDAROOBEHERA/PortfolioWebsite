import React from 'react';

export default function Courses({ setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Courses Completed</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Data Structures & Algorithms', 'Full Stack Web Development', 'DBMS & SQL Mastery'].map((c, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <i className="fa-solid fa-circle-check text-emerald-500 text-xl"></i>
            <span className="font-bold text-xs text-slate-900">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}