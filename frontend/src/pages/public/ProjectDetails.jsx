import React from 'react';

export default function ProjectDetails({ project, setActiveTab }) {
  const currentProject = project || {
    title: 'Portfolio Website & Content Management Suite',
    category: 'Full Stack Web App',
    tags: ['React', 'Django REST Framework', 'Tailwind CSS', 'MySQL'],
    desc: 'An end-to-end customizable portfolio architecture featuring dynamic administrative control panels, live system health telemetry, responsive views, and direct messaging channels.',
    features: [
      'JWT and session-based authentication for administrative dashboard controls.',
      'Dynamic CRUD management for projects, blogs, skills, and certifications.',
      'PostgreSQL/MySQL integrated backend with Django REST endpoints.',
    ],
    liveUrl: 'http://localhost:5173',
    repoUrl: 'https://github.com',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('projects')}
          className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1.5 cursor-pointer mb-3"
        >
          <i className="fa-solid fa-arrow-left text-[10px]"></i> Back to Projects
        </button>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{currentProject.title}</h2>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          {currentProject.category}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Project Overview</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{currentProject.desc}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Core Features</h3>
          <ul className="space-y-2">
            {currentProject.features.map((feat, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                <i className="fa-solid fa-check text-emerald-500 mt-0.5"></i>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
          {currentProject.tags.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          {currentProject.liveUrl && (
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-all flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Live Preview
            </a>
          )}
          {currentProject.repoUrl && (
            <a
              href={currentProject.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <i className="fa-brands fa-github text-xs"></i> GitHub Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
}