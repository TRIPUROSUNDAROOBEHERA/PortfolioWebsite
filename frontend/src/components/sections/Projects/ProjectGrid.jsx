import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ setActiveTab }) {
  const projects = [
    { title: 'Portfolio CMS Version', desc: 'Django 5 + React Full-stack management suite.', tags: ['Django', 'React'] },
    { title: 'Task Management Platform', desc: 'Authorization REST API, Kanban board.', tags: ['MySQL', 'JWT'] }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-laptop-code text-blue-600"></i>
          <span>Projects</span>
        </div>
        <button onClick={() => setActiveTab('projects')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2.5">
        {projects.map((p, idx) => (
          <ProjectCard key={idx} project={p} />
        ))}
      </div>
    </div>
  );
}