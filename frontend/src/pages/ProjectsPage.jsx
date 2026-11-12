import React, { useState, useEffect } from 'react';
import projectsApi from '../api/projectsApi';
import { assetUrl } from '../utils/assetUrl';

const FEATURED_PRIMARY_PROJECTS = [
  {
    id: 'travel-planner',
    title: 'TripGen (Travel Plan Itinerary Generator)',
    cat: 'python',
    category: 'python',
    tags: ['Python', 'Django', 'MySQL', 'Machine Learning', 'REST API'],
    desc: 'An automated travel itinerary planning web application built with Django and MySQL that sequences destinations, optimizes daily routes, and calculates budgets.',
    badge: 'Academic / Software Project',
    featured: true,
    demo_url: '',
    github_url: 'https://github.com/TRIPUROSUNDAROOBEHERA',
  },
  {
    id: 'english-master-pro',
    title: 'English Master Pro',
    cat: 'mobile',
    category: 'mobile',
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile UI', 'Cloud Firestore'],
    desc: 'A cross-platform mobile language learning application built with Flutter and Firebase featuring interactive grammar lessons, vocabulary flashcards, and quizzes.',
    badge: 'Mobile Application Project',
    featured: true,
    demo_url: '',
    github_url: 'https://github.com/TRIPUROSUNDAROOBEHERA',
  },
  {
    id: 'intrusion-detection',
    title: 'Intrusion Detection System (IDS)',
    cat: 'python',
    category: 'python',
    tags: ['Python', 'Django', 'Machine Learning', 'Scikit-learn', 'Cybersecurity'],
    desc: 'A machine learning-based network security system engineered with Django and Scikit-learn to classify traffic and detect potential intrusions.',
    badge: 'MCA Academic Project',
    featured: true,
    image: assetUrl('project-ids-showcase.png'),
    demo_url: '',
    github_url: 'https://github.com/TRIPUROSUNDAROOBEHERA',
  },
];

export default function ProjectsPage({ setActiveTab, initialData = [] }) {
  const [filter, setFilter] = useState('all');
  const [projectList, setProjectList] = useState(FEATURED_PRIMARY_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1' &&
      (!import.meta.env.VITE_API_BASE_URL ||
        import.meta.env.VITE_API_BASE_URL === '/api' ||
        import.meta.env.VITE_API_BASE_URL.includes('localhost') ||
        import.meta.env.VITE_API_BASE_URL.includes('127.0.0.1'))
    ) {
      return;
    }

    projectsApi
      .getAll()
      .then((res) => {
        const data = res?.data?.results || res?.results || res?.data || res;
        if (isMounted && Array.isArray(data) && data.length) {
          const merged = [...FEATURED_PRIMARY_PROJECTS];
          data.forEach((p) => {
            const pTitle = (p.title || '').trim().toLowerCase();
            if (!merged.some((m) => m.title.trim().toLowerCase() === pTitle)) {
              merged.push(p);
            }
          });
          setProjectList(merged);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered =
    filter === 'all'
      ? projectList
      : projectList.filter((p) => {
          const c = (p.cat || p.category || '').toLowerCase();
          if (filter === 'fullstack') return c.includes('full') || c.includes('stack');
          if (filter === 'python') return c.includes('python') || c.includes('django') || (p.tags && p.tags.some(t => t.toLowerCase().includes('python') || t.toLowerCase().includes('django')));
          if (filter === 'mobile') return c.includes('mobile') || (p.tags && p.tags.some(t => t.toLowerCase().includes('flutter')));
          if (filter === 'frontend') return c.includes('front') || (p.tags && p.tags.some(t => t.toLowerCase().includes('react') || t.toLowerCase().includes('html')));
          return c === filter;
        });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── Header & Breadcrumb ─── */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
            <i className="fa-solid fa-laptop-code text-lg"></i>
          </div>
          <span>Software Development Projects</span>
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          <span
            className="cursor-pointer hover:underline text-blue-600 font-semibold"
            onClick={() => setActiveTab('home')}
          >
            Home
          </span>{' '}
          / Projects
        </p>
      </div>

      {/* ─── Filter Tabs ─── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'fullstack', label: 'Full Stack' },
          { id: 'python', label: 'Python & Django' },
          { id: 'mobile', label: 'Mobile Apps (Flutter)' },
          { id: 'frontend', label: 'Web & Frontend' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === item.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ─── Career Profile & Introduction Banner ─── */}
      <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-white border border-blue-200/80 rounded-3xl p-5 sm:p-6 mb-8 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
            <i className="fa-solid fa-id-card text-base"></i>
          </div>
          <div>
            <span className="text-[11px] font-black tracking-wider uppercase text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              Career Profile & Introduction
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              MCA Post-Graduate with hands-on experience building web and mobile applications using <strong className="text-slate-900">Python, Django, React, REST APIs, and Flutter</strong>. Currently seeking an entry-level <strong className="text-slate-900">Software Developer</strong> opportunity to apply my technical skills and contribute to real-world software projects.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Projects Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => {
          const tagsList = proj.tags || (proj.tech_list || (proj.technologies ? proj.technologies.split(',') : []));

          return (
            <div
              key={proj.id || idx}
              className={`bg-white text-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm border transition-all duration-300 flex flex-col justify-between group ${
                proj.featured ? 'border-indigo-200 hover:border-indigo-400 hover:shadow-md' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div>
                {/* Header Icon & Category Badge Row */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                  {proj.badge ? (
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                      {proj.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      {proj.category_display || proj.category || 'Software Project'}
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {proj.title}
                </h3>

                {/* Tech Tags */}
                <div className="flex gap-1.5 my-3 flex-wrap">
                  {tagsList.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-indigo-50/70 text-indigo-700 text-[10.5px] font-bold border border-indigo-100/80"
                    >
                      {typeof t === 'string' ? t.trim() : t}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                  {proj.desc || proj.description}
                </p>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 mt-5 border-t border-slate-100 text-xs font-bold text-indigo-600">
                {(proj.demo_url || proj.live_url) && (
                  <a
                    href={proj.demo_url || proj.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                    <span>Live Demo</span>
                  </a>
                )}
                {(proj.github_url) && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                  >
                    <i className="fa-brands fa-github text-sm"></i>
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}