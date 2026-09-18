import React, { useState, useEffect } from 'react';
import educationApi from '../../api/educationApi';

export default function EducationPage({ setActiveTab }) {
  const [educationList, setEducationList] = useState([
    { degree: 'Master of Computer Applications', school: 'Department of Computer Science', period: '2024 – 2026', score: 'CGPA: 8.7 / 10' },
    { degree: 'Bachelor of Science', school: 'Science College', period: '2018 – 2021', score: 'Percentage: 70.80%' },
    { degree: 'Higher Secondary (12th)', school: 'Board of Intermediate Education', period: '2017 – 2018', score: 'Percentage: 74.40%' },
    { degree: 'Board of Secondary Education in AP (10th)', school: 'Secondary School', period: '2015', score: 'Percentage: 60%' },
  ]);

  useEffect(() => {
    let isMounted = true;
    educationApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setEducationList(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900">Academic Qualifications</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
          Home
        </span>{' '}
        / Education
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationList.map((edu, idx) => (
          <div key={idx} className="bg-white text-slate-800 rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg mb-4 font-bold">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <h3 className="font-extrabold text-base text-slate-900">{edu.degree || edu.degree_title}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {edu.school || edu.institution} • {edu.period || `${edu.start_year || ''}-${edu.end_year || ''}`}
            </p>
            <div className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold inline-block border border-emerald-100">
              {edu.score || edu.grade}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}