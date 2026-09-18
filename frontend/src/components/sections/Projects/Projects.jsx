import React, { useState, useEffect } from 'react';
import projectsApi from '../../../api/projectsApi';

export default function Projects({ setActiveTab }) {
  const [list, setList] = useState([
    { title: 'Portfolio Website', cat: 'frontend', tags: ['React', 'Tailwind CSS'], desc: 'Personal portfolio CMS with full administration.' },
    { title: 'Task Management System', cat: 'fullstack', tags: ['React', 'Django', 'MySQL'], desc: 'Complete enterprise task manager.' }
  ]);

  useEffect(() => {
    projectsApi.getAll().then(res => {
      const data = res?.results || res;
      if (Array.isArray(data) && data.length) setList(data);
    }).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((proj, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
            <p className="text-xs text-slate-500 mt-2">{proj.desc || proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}