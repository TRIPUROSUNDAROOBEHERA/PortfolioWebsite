import React from 'react';

export default function Certificates({ setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['React - Complete Guide (Udemy)', 'JavaScript Algorithms (freeCodeCamp)', 'Python for Data Science (Coursera)'].map((c, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900">{c}</span>
            <i className="fa-solid fa-award text-amber-500 text-xl"></i>
          </div>
        ))}
      </div>
    </div>
  );
}