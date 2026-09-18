import React from 'react';

export default function PlanItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
      <i className="fa-solid fa-circle-check text-blue-600 text-xs"></i>
      <span>{text}</span>
    </div>
  );
}