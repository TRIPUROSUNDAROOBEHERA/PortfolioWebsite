import React from 'react';

export default function ResourceCard({ resource }) {
  return (
    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
      <span className="font-bold text-xs text-slate-900">{resource?.title || 'Developer Cheat Sheet'}</span>
      <i className="fa-solid fa-download text-blue-600 text-xs"></i>
    </div>
  );
}