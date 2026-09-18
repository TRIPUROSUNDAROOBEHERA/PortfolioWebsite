import React, { useState, useEffect } from 'react';
import projectsApi from '../../api/projectsApi';

export default function ProjectsPage({ setActiveTab }) {
  const [filter, setFilter] = useState('all');
  const [projectList, setProjectList] = useState([
    { title: 'Portfolio Website', cat: 'frontend', tags: ['React', 'Tailwind CSS', 'Vite'], desc: 'Personal portfolio website to showcase skills, projects and achievements.' },
    { title: 'Task Management System', cat: 'fullstack', tags: ['React', 'Node.js', 'MongoDB'], desc: 'A full stack task management application with authentication and dashboard.' },
    { title: 'Blog Platform', cat: 'fullstack', tags: ['Django', 'Bootstrap', 'SQLite'], desc: 'A full-stack blog platform with user authentication, categories and rich text editor.' },
    { title: 'Weather App', cat: 'frontend', tags: ['JavaScript', 'API', 'HTML'], desc: 'A simple weather application using OpenWeather API.' },
    { title: 'E-Commerce Website', cat: 'fullstack', tags: ['React', 'Node.js', 'MongoDB'], desc: 'An e-commerce web application with cart, checkout and payment integration.' },
    { title: 'Notes App', cat: 'tools', tags: ['React', 'LocalStorage', 'CSS'], desc: 'A simple notes application to add, edit, delete and manage notes locally.' },
  ]);

  useEffect(() => {
    let isMounted = true;
    projectsApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setProjectList(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = filter === 'all' ? projectList : projectList.filter((p) => (p.cat || p.category) === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">My Projects</h2>
        <p className="text-xs text-slate-500 mt-1">
          <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
            Home
          </span>{' '}
          / Projects
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        {[
          { id: 'all', label: 'All' },
          { id: 'frontend', label: 'Web Dev' },
          { id: 'fullstack', label: 'Full Stack' },
          { id: 'tools', label: 'Tools' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === item.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Projects 6-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => (
          <div key={idx} className="bg-white text-slate-800 rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="h-32 bg-slate-900 rounded-2xl mb-4 flex items-center justify-center text-blue-400 text-3xl overflow-hidden">
                {proj.image ? <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" /> : <i className="fa-solid fa-laptop-code"></i>}
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">{proj.title}</h3>
              <div className="flex gap-1.5 my-2 flex-wrap">
                {(proj.tags || (proj.technologies ? proj.technologies.split(',') : [])).map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                    {t.trim ? t.trim() : t}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{proj.desc || proj.description}</p>
            </div>
            <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-100 text-xs font-bold text-blue-600">
              {proj.demo_url && (
                <a href={proj.demo_url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Live Demo
                </a>
              )}
              {proj.github_url && (
                <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}