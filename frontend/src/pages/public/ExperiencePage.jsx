import React, { useState, useEffect } from 'react';
import experienceApi from '../../api/experienceApi';

export default function ExperiencePage({ setActiveTab }) {
  const [experiences, setExperiences] = useState([
    {
      role: 'Full Stack Python & React Developer Intern',
      company: 'Tech Solutions & Software Lab',
      type: 'Full-Time Internship',
      period: 'Jan 2024 – Jun 2024 (6 Months)',
      location: 'Hyderabad, India',
      highlights: [
        'Engineered scalable REST APIs using Django REST Framework & PostgreSQL for enterprise client portals.',
        'Developed modular React single-page frontend applications utilizing Tailwind CSS and Axios state workflows.',
        'Implemented JWT authentication, role-based user access controls, and automated database migrations.',
        'Reduced API response times by 30% through query optimization and caching strategies.',
      ],
      skills: ['Python', 'Django REST Framework', 'React.js', 'PostgreSQL', 'Tailwind CSS', 'Git'],
    },
  ]);

  useEffect(() => {
    let isMounted = true;
    experienceApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setExperiences(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <i className="fa-solid fa-briefcase text-blue-600"></i> Work Experience & Internships
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
            Home
          </span>{' '}
          / Experience
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-bold border border-blue-200">
                  {exp.type || 'Experience'}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-2">{exp.role || exp.title}</h3>
                <div className="text-xs font-bold text-slate-600 flex items-center gap-2 mt-1">
                  <span className="text-blue-600">{exp.company}</span> • <span>{exp.location}</span>
                </div>
              </div>
              <div className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                <i className="fa-regular fa-calendar text-blue-500 mr-1.5"></i>
                {exp.period || `${exp.start_date || ''} – ${exp.end_date || 'Present'}`}
              </div>
            </div>

            <ul className="space-y-2 mb-5">
              {(exp.highlights || (exp.description ? [exp.description] : [])).map((point, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs mt-1 flex-shrink-0"></i>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
              {(exp.skills || []).map((skill, sIdx) => (
                <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-[11px] font-semibold border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}