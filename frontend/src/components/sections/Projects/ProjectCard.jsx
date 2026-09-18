import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all">
      <div className="flex justify-between items-start">
        <h4 className="font-extrabold text-slate-900 text-xs">{project.title}</h4>
      </div>
      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{project.desc}</p>
      <div className="flex gap-1 mt-2">
        {project.tags?.map((t, i) => (
          <span key={i} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-bold border border-blue-100">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}