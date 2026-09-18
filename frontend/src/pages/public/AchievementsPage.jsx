import React, { useState, useEffect } from 'react';
import achievementsApi from '../../api/achievementsApi';

export default function AchievementsPage({ setActiveTab }) {
  const [achievements, setAchievements] = useState([
    { title: 'College Topper - MCA (2023)', desc: 'Awarded for outstanding academic excellence across all semesters.' },
    { title: 'Hackathon Winner', desc: 'State Level Smart India Hackathon Finalist 2023.' },
  ]);

  useEffect(() => {
    let isMounted = true;
    achievementsApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setAchievements(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900">Achievements & Honors</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
          Home
        </span>{' '}
        / Achievements
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item, idx) => (
          <div key={idx} className="bg-white text-slate-800 p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <i className="fa-solid fa-trophy text-amber-500 text-4xl"></i>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{item.desc || item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}