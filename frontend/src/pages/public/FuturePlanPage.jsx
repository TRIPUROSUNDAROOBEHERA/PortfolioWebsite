import React from 'react';

export default function FuturePlanPage({ setActiveTab }) {
  const plans = [
    {
      title: 'Machine Learning & AI Integration',
      target: 'Q3 2026',
      status: 'In Progress',
      desc: 'Integrate LLM API workflows and intelligent recommendation engines into Django-based full stack applications.',
    },
    {
      title: 'Cloud & DevOps Architecture Mastery',
      target: 'Q4 2026',
      status: 'Planned',
      desc: 'Master container orchestration with Kubernetes, CI/CD automated pipeline builds, and AWS cloud deployment.',
    },
    {
      title: 'Open Source Python Package Contributions',
      target: '2027',
      status: 'Planned',
      desc: 'Publish developer utilities and API scaffolding tools for the Django and React developer ecosystem.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <i className="fa-solid fa-compass text-blue-600"></i> Future Roadmap & Career Milestones
        </h2>
        <p className="text-xs font-semibold text-slate-500 mt-1.5">
          <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
            Home
          </span>{' '}
          / <span className="text-slate-700 font-bold">Future Plans</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                  {p.target}
                </span>
                <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {p.status}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}