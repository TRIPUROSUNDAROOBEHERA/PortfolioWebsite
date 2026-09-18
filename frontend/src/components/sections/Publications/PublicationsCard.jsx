import React from 'react';

export default function PublicationsCard({ publication }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
      <h4 className="font-extrabold text-slate-900 text-xs">{publication?.title || 'Academic Paper'}</h4>
      <p className="text-[11px] text-slate-500 mt-1">{publication?.publisher || 'Journal Publication'}</p>
    </div>
  );
}