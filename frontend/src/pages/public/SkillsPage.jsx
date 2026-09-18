import React, { useState, useEffect } from 'react';
import skillApi from '../../api/skillApi';

export default function SkillsPage({ setActiveTab }) {
  const [skills, setSkills] = useState(['Python', 'Django', 'React.js', 'JavaScript', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'Docker']);

  useEffect(() => {
    let isMounted = true;
    skillApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setSkills(data.map((s) => s.name || s));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900">Skills & Technologies</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
          Home
        </span>{' '}
        / Skills
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((s, idx) => (
          <div key={idx} className="bg-white text-slate-800 p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h3 className="font-extrabold text-sm text-slate-900">{s}</h3>
            <span className="text-xs text-blue-600 font-bold mt-1 block">Proficient</span>
          </div>
        ))}
      </div>
    </div>
  );
}