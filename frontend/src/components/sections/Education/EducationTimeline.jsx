import React from 'react';

export default function EducationTimeline({ setActiveTab }) {
  const items = [
    { title: 'MCA', sub: 'Master of Comp', period: '2021 - 2023', score: 'CGPA: 8.7/10' },
    { title: 'B.Sc', sub: 'Bachelor of Science', period: '2018 - 2021', score: '78.20%' },
    { title: '12th', sub: 'Higher Secondary', period: '2016 - 2018', score: '82.60%' }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-graduation-cap text-blue-600"></i>
          <span>Education Timeline</span>
        </div>
        <button onClick={() => setActiveTab('education')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {items.map((it, idx) => (
          <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="font-extrabold text-blue-600 text-xs">{it.title}</div>
            <div className="text-[9.5px] text-slate-500 font-medium truncate">{it.sub}</div>
            <div className="text-[9px] text-slate-400 mt-1">{it.period}</div>
            <div className="text-[9.5px] font-bold text-emerald-600 mt-1 bg-emerald-50 py-0.5 rounded border border-emerald-100">
              {it.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}