import React from 'react';
import SkillCard from './SkillCard';

export default function Skills({ setActiveTab }) {
  const skills = ['Python', 'Django', 'React.js', 'JavaScript', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis', 'Linux'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Skills & Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {skills.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="font-extrabold text-sm text-slate-900">{s}</div>
            <span className="text-xs text-blue-600 font-bold mt-1 block">Proficient</span>
          </div>
        ))}
      </div>
    </div>
  );
}