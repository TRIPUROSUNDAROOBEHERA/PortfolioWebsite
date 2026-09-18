import React from 'react';
import SkillCard from './SkillCard';

export default function SkillCategory({ setActiveTab }) {
  const skills = ['Python', 'Django', 'React.js', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'Bootstrap', 'Git & GitHub', 'REST API', 'Docker'];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-code text-blue-600"></i>
          <span>Skills & Technologies</span>
        </div>
        <button onClick={() => setActiveTab('skills')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skills.map((s, idx) => (
          <SkillCard key={idx} skill={s} />
        ))}
      </div>
    </div>
  );
}