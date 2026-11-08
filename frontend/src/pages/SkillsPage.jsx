import React, { useEffect, useState, useCallback } from 'react';
import SkillDetailModal from '../components/ui/SkillDetailModal';

// ─── CATEGORIZED SKILLS CONFIGURATION ───
const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'fa-solid fa-code',
    skills: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
      { name: 'Java', icon: 'devicon-java-plain colored' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'fa-solid fa-desktop',
    skills: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
      { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' },
      { name: 'Vite', icon: 'devicon-vitejs-plain colored' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'fa-solid fa-server',
    skills: [
      { name: 'Django', icon: 'devicon-django-plain colored' },
      {
        name: 'Django REST',
        customIcon: (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 text-white flex flex-col items-center justify-center font-black leading-none shadow-xs px-1">
            <span className="text-[9.5px] tracking-tight font-extrabold">DJANGO</span>
            <span className="text-[7.5px] tracking-widest text-rose-200 font-black mt-0.5">REST</span>
          </div>
        ),
      },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'fa-solid fa-database',
    skills: [
      {
        name: 'SQL',
        customIcon: (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white flex items-center justify-center font-extrabold text-[11px] shadow-xs tracking-tight">
            SQL
          </div>
        ),
      },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'MySQL', icon: 'devicon-mysql-original colored' },
      { name: 'SQLite', icon: 'devicon-sqlite-plain colored' },
      { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: 'fa-solid fa-mobile-screen',
    skills: [
      { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
      { name: 'Dart', icon: 'devicon-dart-plain colored' },
      { name: 'Android', icon: 'devicon-android-plain colored' },
      { name: 'Kotlin', icon: 'devicon-kotlin-plain colored' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Utilities',
    icon: 'fa-solid fa-screwdriver-wrench',
    skills: [
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', icon: 'devicon-github-original text-slate-900' },
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
      { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
      { name: 'Figma', icon: 'devicon-figma-plain colored' },
    ],
  },
];

// ─── LOOKUP MAP: MAP SKILL IDENTIFIERS TO CORRESPONDING CATEGORY ───
const SKILL_TO_CATEGORY_MAP = {
  // Programming Languages
  python: 'languages',
  javascript: 'languages',
  js: 'languages',
  'c++': 'languages',
  cpp: 'languages',
  java: 'languages',

  // Frontend Development
  react: 'frontend',
  'react.js': 'frontend',
  'react js': 'frontend',
  html: 'frontend',
  html5: 'frontend',
  'html5 & css3': 'frontend',
  css: 'frontend',
  css3: 'frontend',
  tailwind: 'frontend',
  tailwindcss: 'frontend',
  'tailwind css': 'frontend',
  bootstrap: 'frontend',
  vite: 'frontend',

  // Backend Development
  django: 'backend',
  'django rest': 'backend',
  'django rest framework': 'backend',
  drf: 'backend',
  'rest api': 'backend',
  'restful apis': 'backend',
  node: 'backend',
  'node.js': 'backend',
  nodejs: 'backend',

  // Database
  sql: 'database',
  postgresql: 'database',
  postgres: 'database',
  mysql: 'database',
  sqlite: 'database',
  firebase: 'database',
  mongodb: 'database',
  mongo: 'database',

  // Mobile App Development
  flutter: 'mobile',
  dart: 'mobile',
  android: 'mobile',
  kotlin: 'mobile',

  // Tools & Utilities
  git: 'tools',
  github: 'tools',
  'git & github': 'tools',
  docker: 'tools',
  'vs code': 'tools',
  vscode: 'tools',
  'vs code & linux': 'tools',
  figma: 'tools',
};

// ─── OTHER TECHNICAL COMPETENCIES ───
const OTHER_SKILLS = [
  { name: 'Full-stack Dev', icon: 'fa-solid fa-layer-group', color: 'text-blue-500' },
  { name: 'RESTful APIs Integration', icon: 'fa-solid fa-network-wired', color: 'text-indigo-500' },
  { name: 'ORM Technologies', icon: 'fa-solid fa-database', color: 'text-cyan-500' },
  { name: 'Responsive Web Design', icon: 'fa-solid fa-mobile-screen-button', color: 'text-blue-600' },
  { name: 'Version Control (Git)', icon: 'fa-solid fa-code-branch', color: 'text-orange-500' },
  { name: 'Clean Code', icon: 'fa-solid fa-wand-magic-sparkles', color: 'text-amber-500' },
  { name: 'Problem Solving', icon: 'fa-solid fa-puzzle-piece', color: 'text-purple-500' },
  { name: 'Agile Methodologies', icon: 'fa-solid fa-arrows-rotate', color: 'text-emerald-500' },
];

// ─── SOFT SKILLS / INTERPERSONAL STRENGTHS ───
const SOFT_SKILLS = [
  { name: 'Team Collaboration', icon: 'fa-solid fa-people-group', color: 'text-indigo-500' },
  { name: 'Effective Communication', icon: 'fa-solid fa-comments', color: 'text-blue-500' },
  { name: 'Critical Thinking', icon: 'fa-solid fa-lightbulb', color: 'text-amber-500' },
  { name: 'Adaptability & Agility', icon: 'fa-solid fa-bolt', color: 'text-cyan-500' },
  { name: 'Time Management', icon: 'fa-solid fa-clock', color: 'text-rose-500' },
  { name: 'Attention to Detail', icon: 'fa-solid fa-bullseye', color: 'text-teal-500' },
  { name: 'Leadership & Ownership', icon: 'fa-solid fa-award', color: 'text-purple-500' },
  { name: 'Continuous Learning', icon: 'fa-solid fa-graduation-cap', color: 'text-emerald-500' },
];

// ─── CURRENTLY LEARNING ───
const CURRENTLY_LEARNING = [
  { name: 'Machine Learning', icon: 'fa-solid fa-brain', color: 'text-emerald-600' },
  { name: 'Cloud Platforms (AWS)', icon: 'fa-solid fa-cloud', color: 'text-emerald-600' },
  { name: 'System Design Basics', icon: 'fa-solid fa-diagram-project', color: 'text-emerald-600' },
  { name: 'Mobile App Publishing', icon: 'fa-solid fa-rocket', color: 'text-emerald-600' },
  { name: 'Docker Containerization', icon: 'fa-brands fa-docker', color: 'text-emerald-600' },
  { name: 'CI/CD Automation', icon: 'fa-solid fa-gears', color: 'text-emerald-600' },
];

export default function SkillsPage({ setActiveTab, targetSkill = null }) {
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [highlightedSkillName, setHighlightedSkillName] = useState(null);
  const [activeModalSkill, setActiveModalSkill] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlSkill = params.get('skill');
        if (urlSkill) return urlSkill;

        if (window.location.hash && window.location.hash.includes('?')) {
          const hashQuery = window.location.hash.split('?')[1];
          const hashParams = new URLSearchParams(hashQuery);
          const hashSkill = hashParams.get('skill');
          if (hashSkill) return hashSkill;
        }

        const storedSkill = sessionStorage.getItem('open_skill_id');
        if (storedSkill) return storedSkill;
      }
    } catch {
      // fallback
    }
    return null;
  });

  const openSkill = useCallback((skillKey) => {
    if (!skillKey) return;
    setActiveModalSkill(skillKey);
    try {
      sessionStorage.setItem('open_skill_id', skillKey);
      sessionStorage.setItem('active_portfolio_section', 'skills');
      sessionStorage.setItem('active_portfolio_tab', 'skills');
      const url = new URL(window.location.href);
      url.searchParams.set('skill', skillKey);
      url.hash = 'skills';
      window.history.pushState({ skillKey }, '', url);
    } catch {
      // fallback
    }
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    }
  }, []);

  const closeSkill = useCallback(() => {
    setActiveModalSkill(null);
    if (typeof document !== 'undefined') {
      const isOtherModalOpen = Boolean(sessionStorage.getItem('open_project_id'));
      if (!isOtherModalOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    }
    try {
      sessionStorage.removeItem('open_skill_id');
      sessionStorage.setItem('active_portfolio_section', 'skills');
      sessionStorage.setItem('active_portfolio_tab', 'skills');
      const url = new URL(window.location.href);
      url.searchParams.delete('skill');
      url.hash = 'skills';
      window.history.replaceState({}, '', url);
    } catch {
      // fallback
    }

    if (typeof setActiveTab === 'function') {
      setActiveTab('skills', null, 'instant');
    }
    const el = document.getElementById('skills');
    if (el) {
      const navHeight = 70;
      const buffer = 16;
      const targetTop = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - navHeight - buffer);
      window.scrollTo({ top: targetTop, behavior: 'instant' });
    }
  }, [setActiveTab]);

  useEffect(() => {
    if (activeModalSkill) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      sessionStorage.setItem('open_skill_id', activeModalSkill);
      sessionStorage.setItem('active_portfolio_section', 'skills');
      sessionStorage.setItem('active_portfolio_tab', 'skills');
    }
  }, [activeModalSkill]);

  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlSkill = params.get('skill');
        if (urlSkill) {
          setActiveModalSkill(urlSkill);
          sessionStorage.setItem('open_skill_id', urlSkill);
          return;
        }
        const storedSkill = sessionStorage.getItem('open_skill_id');
        if (storedSkill && !params.has('skill')) {
          sessionStorage.removeItem('open_skill_id');
          setActiveModalSkill(null);
          return;
        }
        setActiveModalSkill(null);
      } catch {
        setActiveModalSkill(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auto-scroll & Highlight identified category when arriving from a specific skill button click
  useEffect(() => {
    if (!targetSkill) return;

    const clean = String(targetSkill).trim().toLowerCase();
    const categoryId = SKILL_TO_CATEGORY_MAP[clean];

    if (categoryId) {
      setHighlightedCategory(categoryId);
      setHighlightedSkillName(clean);

      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(`category-${categoryId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      const fadeTimer = setTimeout(() => {
        setHighlightedCategory(null);
        setHighlightedSkillName(null);
      }, 4000);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(fadeTimer);
      };
    }
  }, [targetSkill]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── Header & Breadcrumb ─── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <i className="fa-solid fa-code text-lg"></i>
            </div>
            <span>Skills & Technologies</span>
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            <span
              className="cursor-pointer hover:underline text-blue-600 font-semibold"
              onClick={() => setActiveTab('home')}
            >
              Home
            </span>{' '}
            / Skills
          </p>
        </div>

        {/* Live Identification Notification Banner if arriving from Home Scroller */}
        {highlightedCategory && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold animate-pulse shadow-sm">
            <i className="fa-solid fa-crosshairs text-blue-600"></i>
            <span>
              Identified Category:{' '}
              <span className="capitalize underline">
                {SKILL_CATEGORIES.find((c) => c.id === highlightedCategory)?.title || highlightedCategory}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* ─── Top 6 Core Categories Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const isCategoryHighlighted = highlightedCategory === category.id;

          return (
            <div
              id={`category-${category.id}`}
              key={category.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-500 flex flex-col justify-between ${
                isCategoryHighlighted
                  ? 'border-blue-500 ring-4 ring-blue-400/30 shadow-xl bg-blue-50/15 scale-[1.01]'
                  : 'border-slate-200/90 shadow-sm hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {/* Category Title & Identification Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-xs transition-colors ${
                      isCategoryHighlighted
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {isCategoryHighlighted && (
                  <span className="text-[10.5px] font-bold text-blue-700 bg-blue-100/90 border border-blue-300 px-2.5 py-0.5 rounded-full animate-bounce">
                    Selected
                  </span>
                )}
              </div>

              {/* Skills Icons & Names Row (Evenly distributed per category count) */}
              <div
                className={`grid grid-cols-2 ${
                  category.skills.length === 3
                    ? 'sm:grid-cols-3'
                    : category.skills.length === 4
                    ? 'sm:grid-cols-4'
                    : category.skills.length === 5
                    ? 'sm:grid-cols-5'
                    : 'sm:grid-cols-6'
                } gap-3 sm:gap-4 items-center justify-items-center`}
              >
                {category.skills.map((skill, sIdx) => {
                  const isSkillHighlighted =
                    highlightedSkillName &&
                    (skill.name.toLowerCase() === highlightedSkillName ||
                      highlightedSkillName.includes(skill.name.toLowerCase()) ||
                      skill.name.toLowerCase().includes(highlightedSkillName));

                  return (
                    <div
                      key={sIdx}
                      onClick={() => openSkill(skill.name)}
                      className="flex flex-col items-center justify-center group/item cursor-pointer text-center p-1 rounded-xl hover:bg-slate-50 transition-all"
                      title={`Click to view detailed competencies for ${skill.name}`}
                    >
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isSkillHighlighted
                            ? 'scale-125 ring-2 ring-blue-500 bg-blue-50 shadow-md'
                            : 'group-hover/item:scale-110'
                        }`}
                      >
                        {skill.customIcon ? (
                          skill.customIcon
                        ) : (
                          <i className={`${skill.icon} text-2xl sm:text-3xl drop-shadow-xs`}></i>
                        )}
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-semibold mt-1.5 transition-colors whitespace-nowrap ${
                          isSkillHighlighted
                            ? 'text-blue-600 font-extrabold'
                            : 'text-slate-700 group-hover/item:text-blue-600'
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Bottom Row: Other Skills + Soft Skills + Currently Learning ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* 1. Other Technical Skills */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shadow-xs">
                <i className="fa-solid fa-shapes"></i>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Other Skills
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {OTHER_SKILLS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 hover:shadow-2xs transition-all cursor-default"
                >
                  <i className={`${item.icon} ${item.color} text-xs flex-shrink-0`}></i>
                  <span className="text-[11.5px] font-bold text-slate-700 leading-tight truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Soft Skills */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-purple-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold shadow-xs">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Soft Skills
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {SOFT_SKILLS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/30 border border-purple-100/70 hover:bg-purple-50 hover:border-purple-200 hover:shadow-2xs transition-all cursor-default"
                >
                  <i className={`${item.icon} ${item.color} text-xs flex-shrink-0`}></i>
                  <span className="text-[11.5px] font-bold text-slate-700 leading-tight truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Currently Learning */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-xs">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Currently Learning
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {CURRENTLY_LEARNING.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100/70 hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-2xs transition-all cursor-default"
                >
                  <i className={`${item.icon} ${item.color} text-xs flex-shrink-0`}></i>
                  <span className="text-[11.5px] font-bold text-slate-700 leading-tight truncate">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive 5-Subheading Skill Detail Modal ─── */}
      <SkillDetailModal
        isOpen={Boolean(activeModalSkill)}
        skillKey={activeModalSkill}
        onClose={closeSkill}
      />
    </div>
  );
}