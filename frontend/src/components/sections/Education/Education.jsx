import React, { useState, useEffect } from 'react';
import educationApi from '../../../api/educationApi';

export default function Education({ setActiveTab }) {
  const [list, setList] = useState([
    { degree: 'Master of Computer Applications', school: 'Department of Computer Science', period: '2021 – 2023', score: 'CGPA: 8.7 / 10' },
    { degree: 'Bachelor of Science', school: 'Science College', period: '2018 – 2021', score: 'Percentage: 78.20%' },
    { degree: 'Higher Secondary (12th)', school: 'State Board Higher Secondary', period: '2016 – 2018', score: 'Percentage: 82.60%' }
  ]);

  useEffect(() => {
    educationApi.getAll().then(res => {
      const data = res?.results || res;
      if (Array.isArray(data) && data.length) setList(data);
    }).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Academic Qualifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((edu, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-base text-slate-900">{edu.degree || edu.degree_title}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">{edu.school || edu.institution}</p>
            <div className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold inline-block border border-emerald-100">
              {edu.score || edu.grade}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}