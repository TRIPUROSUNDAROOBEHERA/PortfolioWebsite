import React from 'react';

export default function Blog({ setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Blog & Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900">Building Scalable Django Backends</h3>
          <p className="text-xs text-slate-500 mt-1">Best practices for structuring Django REST APIs.</p>
        </div>
      </div>
    </div>
  );
}