import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <span className="px-2.5 py-1 rounded-xl bg-slate-50 text-slate-700 text-[10.5px] font-bold border border-slate-200/90 hover:border-blue-400 hover:text-blue-600 transition-colors">
      {skill}
    </span>
  );
}