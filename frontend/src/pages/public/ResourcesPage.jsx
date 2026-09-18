import React from 'react';

export default function ResourcesPage({ setActiveTab }) {
  const resources = [
    { title: 'Django REST Framework Guide', type: 'Documentation', desc: 'Official and curated patterns for RESTful backend design.' },
    { title: 'React 19 Core Documentation', type: 'Docs & Tutorials', desc: 'Hooks, Suspense, and state management fundamentals.' },
    { title: 'Tailwind CSS Component Kit', type: 'Design System', desc: 'Utility classes and accessible UI components.' },
    { title: 'MySQL Query Optimization Cheatsheet', type: 'Database Reference', desc: 'Indexing, joins, and explain plan debugging tools.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <i className="fa-solid fa-folder-open text-blue-600"></i> Developer Resources & Tools
        </h2>
        <p className="text-xs font-semibold text-slate-500 mt-1.5">
          <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
            Home
          </span>{' '}
          / <span className="text-slate-700 font-bold">Resources</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
              <i className="fa-solid fa-bookmark"></i>
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{res.type}</span>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">{res.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{res.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}