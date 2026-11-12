import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import SkillDetailModal from './SkillDetailModal';
import { assetUrl } from '../../utils/assetUrl';

// Brand configurations with distinctive colors, custom colored icon boxes, and SVG/icon rendering
const SKILL_REGISTRY = {
  django: {
    displayName: 'Django',
    brandColor: '#0C4B33',
    cardBgHover: 'rgba(12, 75, 51, 0.06)',
    cardBorderHover: '#0C4B33',
    cardShadowHover: '0 8px 24px rgba(12, 75, 51, 0.22)',
    cardTextHover: '#0C4B33',
    iconBoxBg: '#0C4B33',
    iconBoxBorder: 'transparent',
    renderIcon: () => (
      <span className="font-serif font-black text-3xl sm:text-4xl lg:text-[42px] text-white tracking-tight">
        dj
      </span>
    ),
  },

  'django rest framework': {
    displayName: 'Django REST',
    brandColor: '#E11D48',
    cardBgHover: 'rgba(225, 29, 72, 0.06)',
    cardBorderHover: '#E11D48',
    cardShadowHover: '0 8px 24px rgba(225, 29, 72, 0.22)',
    cardTextHover: '#E11D48',
    iconBoxBg: '#DC2626',
    iconBoxBorder: 'transparent',
    renderIcon: () => (
      <div className="flex flex-col items-center justify-center font-black leading-none text-white">
        <span className="text-[13px] sm:text-[15px] lg:text-base tracking-tight font-extrabold">DJANGO</span>
        <span className="text-[9px] sm:text-[10px] lg:text-[11px] tracking-widest font-black mt-0.5 text-rose-100">REST</span>
      </div>
    ),
  },

  react: {
    displayName: 'React.js',
    brandColor: '#00d8ff',
    cardBgHover: '#ecfeff',
    cardBorderHover: '#00d8ff',
    cardShadowHover: '0 10px 25px rgba(0, 216, 255, 0.32)',
    cardTextHover: '#0284c7',
    iconBoxBg: '#e0f7fa',
    iconBoxBorder: 'rgba(0, 216, 255, 0.4)',
    renderIcon: () => (
      <i className="fa-brands fa-react text-[#00d8ff] text-3xl sm:text-4xl lg:text-[42px] drop-shadow-xs"></i>
    ),
  },

  tailwindcss: {
    displayName: 'Tailwind CSS',
    brandColor: '#38BDF8',
    cardBgHover: '#f0f9ff',
    cardBorderHover: '#38bdf8',
    cardShadowHover: '0 8px 24px rgba(56, 189, 248, 0.25)',
    cardTextHover: '#0284c7',
    iconBoxBg: '#e0f2fe',
    iconBoxBorder: 'rgba(56, 189, 248, 0.4)',
    renderIcon: () => (
      <svg className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },

  html5: {
    displayName: 'HTML5 & CSS3',
    brandColor: '#E34F26',
    cardBgHover: '#fff7ed',
    cardBorderHover: '#f97316',
    cardShadowHover: '0 8px 24px rgba(227, 79, 38, 0.22)',
    cardTextHover: '#c2410c',
    iconBoxBg: '#ffedd5',
    iconBoxBorder: 'rgba(249, 115, 22, 0.35)',
    renderIcon: () => (
      <div className="flex items-center -space-x-1">
        <i className="devicon-html5-plain colored text-3xl sm:text-4xl lg:text-[40px]"></i>
        <i className="devicon-css3-plain colored text-3xl sm:text-4xl lg:text-[40px]"></i>
      </div>
    ),
  },

  postgresql: {
    displayName: 'PostgreSQL',
    brandColor: '#336791',
    cardBgHover: '#eef2ff',
    cardBorderHover: '#336791',
    cardShadowHover: '0 8px 24px rgba(51, 103, 145, 0.25)',
    cardTextHover: '#1e40af',
    iconBoxBg: '#e0e7ff',
    iconBoxBorder: 'rgba(51, 103, 145, 0.35)',
    renderIcon: () => (
      <i className="devicon-postgresql-plain colored text-3xl sm:text-4xl lg:text-[42px]"></i>
    ),
  },

  mysql: {
    displayName: 'MySQL',
    brandColor: '#00758F',
    cardBgHover: '#f0fdfa',
    cardBorderHover: '#00758F',
    cardShadowHover: '0 8px 24px rgba(0, 117, 143, 0.25)',
    cardTextHover: '#0e7490',
    iconBoxBg: '#ccfbf1',
    iconBoxBorder: 'rgba(0, 117, 143, 0.35)',
    renderIcon: () => (
      <i className="devicon-mysql-original colored text-3xl sm:text-4xl lg:text-[42px]"></i>
    ),
  },

  mongodb: {
    displayName: 'MongoDB',
    brandColor: '#47A248',
    cardBgHover: '#f0fdf4',
    cardBorderHover: '#47A248',
    cardShadowHover: '0 8px 24px rgba(71, 162, 72, 0.25)',
    cardTextHover: '#15803d',
    iconBoxBg: '#dcfce7',
    iconBoxBorder: 'rgba(71, 162, 72, 0.35)',
    renderIcon: () => (
      <i className="devicon-mongodb-plain colored text-3xl sm:text-4xl lg:text-[42px]"></i>
    ),
  },

  python: {
    displayName: 'Python',
    brandColor: '#387EB8',
    cardBgHover: '#eff6ff',
    cardBorderHover: '#387EB8',
    cardShadowHover: '0 8px 24px rgba(56, 126, 184, 0.25)',
    cardTextHover: '#1d4ed8',
    iconBoxBg: '#dbeafe',
    iconBoxBorder: 'rgba(56, 126, 184, 0.35)',
    renderIcon: () => (
      <svg className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12" viewBox="0 0 128 128">
        <path fill="#387EB8" d="M63.2 4.2c-7.7.1-15.1.7-21.7 1.8-19.4 3.1-23 9.6-23 21.5v15.8h44.6v4.5H23.5C10.7 47.8 0 55.4 0 71.4c0 15.6 9.4 23.9 23.3 23.9h13.5v-18.7c0-13.6 11.7-24.9 25.7-24.9h44v-26c0-11.4-9.6-20.1-23.2-21.5-6.8-.7-13.4-1-20.1-1z" />
        <path fill="#FFE052" d="M64.8 123.8c7.7-.1 15.1-.7 21.7-1.8 19.4-3.1 23-9.6 23-21.5v-15.8H64.9v-4.5h39.6c12.8 0 23.5-7.6 23.5-23.6 0-15.6-9.4-23.9-23.3-23.9H91.2v18.7c0 13.6-11.7 24.9-25.7 24.9h-44v26c0 11.4 9.6 20.1 23.2 21.5 6.8.7 13.4 1 20.1 1z" />
        <circle cx="47" cy="18.5" r="4.5" fill="#fff" />
        <circle cx="81" cy="109.5" r="4.5" fill="#fff" />
      </svg>
    ),
  },

  javascript: {
    displayName: 'JavaScript',
    brandColor: '#EAB308',
    cardBgHover: '#fefce8',
    cardBorderHover: '#eab308',
    cardShadowHover: '0 8px 24px rgba(234, 179, 8, 0.25)',
    cardTextHover: '#a16207',
    iconBoxBg: '#fef9c3',
    iconBoxBorder: 'rgba(234, 179, 8, 0.35)',
    renderIcon: () => (
      <i className="devicon-javascript-plain colored text-3xl sm:text-4xl lg:text-[42px]"></i>
    ),
  },

  sqlite: {
    displayName: 'SQLite',
    brandColor: '#003B57',
    cardBgHover: '#f0f9ff',
    cardBorderHover: '#0284c7',
    cardShadowHover: '0 8px 24px rgba(2, 132, 199, 0.22)',
    cardTextHover: '#0369a1',
    iconBoxBg: '#e0f2fe',
    iconBoxBorder: 'rgba(2, 132, 199, 0.3)',
    renderIcon: () => (
      <i className="devicon-sqlite-plain colored text-3xl sm:text-4xl lg:text-[42px]"></i>
    ),
  },

  docker: {
    displayName: 'Docker',
    brandColor: '#2496ED',
    cardBgHover: '#f0f9ff',
    cardBorderHover: '#2496ed',
    cardShadowHover: '0 8px 24px rgba(36, 150, 237, 0.25)',
    cardTextHover: '#0284c7',
    iconBoxBg: '#e0f2fe',
    iconBoxBorder: 'rgba(36, 150, 237, 0.3)',
    renderIcon: () => (
      <i className="devicon-docker-plain colored text-3xl sm:text-4xl lg:text-[42px]"></i>
    ),
  },

  git: {
    displayName: 'Git & GitHub',
    brandColor: '#F05032',
    cardBgHover: '#fff7ed',
    cardBorderHover: '#f05032',
    cardShadowHover: '0 8px 24px rgba(240, 80, 50, 0.25)',
    cardTextHover: '#c2410c',
    iconBoxBg: '#ffedd5',
    iconBoxBorder: 'rgba(240, 80, 50, 0.3)',
    renderIcon: () => (
      <div className="flex items-center -space-x-1">
        <i className="devicon-git-plain colored text-3xl sm:text-4xl lg:text-[40px]"></i>
        <i className="devicon-github-original text-slate-800 text-3xl sm:text-4xl lg:text-[40px]"></i>
      </div>
    ),
  },

  'rest api': {
    displayName: 'REST APIs',
    brandColor: '#E11D48',
    cardBgHover: '#fff1f2',
    cardBorderHover: '#e11d48',
    cardShadowHover: '0 8px 24px rgba(225, 29, 72, 0.22)',
    cardTextHover: '#be123c',
    iconBoxBg: '#ffe4e6',
    iconBoxBorder: 'rgba(225, 29, 72, 0.3)',
    renderIcon: () => (
      <div className="flex flex-col items-center justify-center font-black leading-none text-[#E11D48]">
        <span className="text-sm sm:text-base lg:text-[18px] tracking-tight font-black">REST</span>
        <span className="text-[9.5px] sm:text-[11px] lg:text-xs tracking-wider font-extrabold text-[#be123c]">API</span>
      </div>
    ),
  },

  vscode: {
    displayName: 'VS Code & Linux',
    brandColor: '#007ACC',
    cardBgHover: '#f0f9ff',
    cardBorderHover: '#007acc',
    cardShadowHover: '0 8px 24px rgba(0, 122, 204, 0.25)',
    cardTextHover: '#0369a1',
    iconBoxBg: '#e0f2fe',
    iconBoxBorder: 'rgba(0, 122, 204, 0.3)',
    renderIcon: () => (
      <div className="flex items-center -space-x-1">
        <i className="devicon-vscode-plain colored text-3xl sm:text-4xl lg:text-[40px]"></i>
        <i className="devicon-linux-plain text-slate-800 text-3xl sm:text-4xl lg:text-[40px]"></i>
      </div>
    ),
  },
};

// Aliases lookup table for fuzzy / multi-word matching
const ALIAS_LOOKUP = {
  django: 'django',
  'django rest': 'django rest framework',
  'django rest framework': 'django rest framework',
  drf: 'django rest framework',
  'django drf': 'django rest framework',
  react: 'react',
  'react.js': 'react',
  'react js': 'react',
  tailwindcss: 'tailwindcss',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  html: 'html5',
  html5: 'html5',
  'html5 & css3': 'html5',
  'html5 and css3': 'html5',
  'html & css': 'html5',
  css: 'html5',
  css3: 'html5',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  mysql: 'mysql',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  python: 'python',
  javascript: 'javascript',
  js: 'javascript',
  sqlite: 'sqlite',
  docker: 'docker',
  git: 'git',
  github: 'git',
  'git & github': 'git',
  'git and github': 'git',
  'rest api': 'rest api',
  'restful api': 'rest api',
  'restful apis': 'rest api',
  'rest apis': 'rest api',
  apis: 'rest api',
  'vs code & linux': 'vscode',
  'vs code': 'vscode',
  vscode: 'vscode',
  linux: 'vscode',
};

// Helper to resolve or construct a skill card config
function resolveSkillCard(skillItem) {
  const rawName = typeof skillItem === 'string' ? skillItem : skillItem?.name || '';
  const cleanKey = rawName.trim().toLowerCase();
  const canonicalKey = ALIAS_LOOKUP[cleanKey] || cleanKey;
  const matched = SKILL_REGISTRY[canonicalKey];

  if (matched) {
    return {
      id: canonicalKey,
      displayName: matched.displayName || rawName,
      brandColor: matched.brandColor,
      cardBgHover: matched.cardBgHover,
      cardBorderHover: matched.cardBorderHover,
      cardShadowHover: matched.cardShadowHover,
      cardTextHover: matched.cardTextHover,
      iconBoxBg: matched.iconBoxBg,
      iconBoxBorder: matched.iconBoxBorder,
      renderIcon: matched.renderIcon,
    };
  }

  // Fallback for custom dynamically added skills with matching stylish color box
  return {
    id: cleanKey,
    displayName: rawName,
    brandColor: '#3b82f6',
    cardBgHover: 'rgba(59, 130, 246, 0.08)',
    cardBorderHover: '#3b82f6',
    cardShadowHover: '0 8px 24px rgba(59, 130, 246, 0.22)',
    cardTextHover: '#2563eb',
    iconBoxBg: '#e0f2fe',
    iconBoxBorder: 'rgba(59, 130, 246, 0.25)',
    renderIcon: () => (
      <span className="text-blue-600 font-extrabold text-lg sm:text-xl lg:text-2xl uppercase">
        {rawName.slice(0, 3)}
      </span>
    ),
  };
}

// Ordered default tech skills matching user screenshot
const DEFAULT_SKILL_KEYS = [
  'django',
  'django rest framework',
  'react',
  'tailwindcss',
  'html5',
  'postgresql',
  'mysql',
  'mongodb',
  'python',
  'javascript',
  'sqlite',
  'docker',
  'git',
  'rest api',
  'vscode',
];

export default function SkillsMarquee({ setActiveTab, skills = [], refreshingSection = null, refreshKey = 0, onOpenProject }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const mobileMarqueeRef = useRef(null);
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
      }
    } catch {
      // fallback
    }
    return null;
  });

  const activeModalSkillRef = useRef(activeModalSkill);
  useEffect(() => {
    activeModalSkillRef.current = activeModalSkill;
  }, [activeModalSkill]);

  // Mobile Skill Identified State: transient in-memory state, resets to null on page refresh
  const [identifiedSkillId, setIdentifiedSkillId] = useState(null);
  useEffect(() => {
    try {
      sessionStorage.removeItem('identified_skill_id');
    } catch {
      // fallback
    }
  }, []);

  const openSkill = useCallback((skillKey) => {
    if (!skillKey) return;

    // Anchor underlying page at skills landing position before locking scroll
    const el = document.getElementById('skills');
    if (el) {
      const navHeight = 70;
      const targetTop = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - navHeight);
      window.scrollTo({ top: targetTop, behavior: 'instant' });
      sessionStorage.setItem('landing_pos_skills', Math.round(targetTop));
    }

    const cleanKey = String(skillKey).trim().toLowerCase();
    const canonical = ALIAS_LOOKUP[cleanKey] || cleanKey;
    setIdentifiedSkillId(canonical);

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
    if (activeModalSkillRef.current) {
      const cleanKey = String(activeModalSkillRef.current).trim().toLowerCase();
      const canonical = ALIAS_LOOKUP[cleanKey] || cleanKey;
      setIdentifiedSkillId(canonical);
    }
    setActiveModalSkill(null);
    if (typeof document !== 'undefined') {
      const isOtherModalOpen =
        Boolean(sessionStorage.getItem('open_project_id')) ||
        Boolean(sessionStorage.getItem('open_cert_id'));
      if (!isOtherModalOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }
    try {
      sessionStorage.removeItem('open_skill_id');
      sessionStorage.setItem('active_portfolio_section', 'skills');
      sessionStorage.setItem('active_portfolio_tab', 'skills');
      const url = new URL(window.location.href);
      if (url.searchParams.has('skill')) {
        url.searchParams.delete('skill');
        url.hash = 'skills';
        window.history.replaceState({}, '', url);
      }
    } catch {
      // fallback
    }

    // Immediately return user directly to #skills without jumping or rolling
    const immediateReturnToSkills = () => {
      const el = document.getElementById('skills');
      const navHeight = 70;
      const saved = sessionStorage.getItem('landing_pos_skills');
      const parsed = saved ? parseInt(saved, 10) : NaN;

      let targetTop = 0;
      if (el) {
        const rect = el.getBoundingClientRect();
        const calculated = rect.top + window.pageYOffset - navHeight;
        targetTop = calculated > 0 ? calculated : (!isNaN(parsed) ? parsed : 0);
      } else if (!isNaN(parsed)) {
        targetTop = parsed;
      }

      window.scrollTo({ top: targetTop, behavior: 'instant' });
    };

    immediateReturnToSkills();
    requestAnimationFrame(immediateReturnToSkills);
    setTimeout(immediateReturnToSkills, 50);
  }, []);

  // Ensure mobile marquee animation continues automatically after closing any skill detail modal
  useEffect(() => {
    if (!activeModalSkill && mobileMarqueeRef.current) {
      mobileMarqueeRef.current.style.animationPlayState = 'running';
    }
  }, [activeModalSkill]);

  // Synchronize modal state & body lock on initial mount / refresh
  useLayoutEffect(() => {
    if (activeModalSkill) {
      const el = document.getElementById('skills');
      if (el) {
        const navHeight = 70;
        const buffer = 16;
        const targetTop = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - navHeight - buffer);
        window.scrollTo({ top: targetTop, behavior: 'instant' });
        sessionStorage.setItem('landing_pos_skills', Math.round(targetTop));
      } else {
        const saved = sessionStorage.getItem('landing_pos_skills');
        if (saved) {
          window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
        }
      }

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      sessionStorage.setItem('open_skill_id', activeModalSkill);
      sessionStorage.setItem('active_portfolio_section', 'skills');
      sessionStorage.setItem('active_portfolio_tab', 'skills');
    }
  }, [activeModalSkill]);

  // Clear stale open_skill_id if not present in URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (!params.get('skill')) {
      sessionStorage.removeItem('open_skill_id');
    }
  }, []);

  // Listen to browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlSkill = params.get('skill');
        if (urlSkill) {
          const cleanKey = String(urlSkill).trim().toLowerCase();
          const canonical = ALIAS_LOOKUP[cleanKey] || cleanKey;
          setIdentifiedSkillId(canonical);
          setActiveModalSkill(urlSkill);
          sessionStorage.setItem('open_skill_id', urlSkill);
          return;
        }

        // Only trigger closeSkill if a skill was actually open in React state
        const wasSkillOpen = Boolean(activeModalSkillRef.current);
        if (wasSkillOpen) {
          if (activeModalSkillRef.current) {
            const cleanKey = String(activeModalSkillRef.current).trim().toLowerCase();
            const canonical = ALIAS_LOOKUP[cleanKey] || cleanKey;
            setIdentifiedSkillId(canonical);
          }
          closeSkill();
        }
      } catch {
        // fallback
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [closeSkill]);

  // ─── MOBILE ONLY: HEADER ILLUSTRATION SMOOTH ENTRANCE ON SCROLL / REFRESH ───
  const [skillsIllustrationInView, setSkillsIllustrationInView] = useState(false);
  const [skillsShouldSlide, setSkillsShouldSlide] = useState(true);
  const skillsIllustrationRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const scrollDirection = useRef('down');

  useEffect(() => {
    const illusNode = skillsIllustrationRef.current;

    const handleScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      const diff = currentY - lastScrollY.current;
      if (Math.abs(diff) > 2) {
        scrollDirection.current = diff > 0 ? 'down' : 'up';
        lastScrollY.current = currentY;
      }
      checkVisibility();
    };

    const checkVisibility = () => {
      const isUp = scrollDirection.current === 'up';
      if (illusNode) {
        const r1 = illusNode.getBoundingClientRect();
        if (r1.top < window.innerHeight * 0.95 && r1.bottom > 0) {
          // If scrolling UP from bottom to top: DO NOT slide! Settle immediately without slide animation.
          if (isUp) {
            setSkillsShouldSlide(false);
            setSkillsIllustrationInView(true);
          } else {
            // Scrolling down or initial load / refresh: slide smoothly into position
            setSkillsShouldSlide(true);
            setSkillsIllustrationInView(true);
          }
        } else if (r1.top > window.innerHeight + 60) {
          // Only reset when element goes BELOW the viewport (user scrolled back up to the top)
          setSkillsIllustrationInView(false);
          setSkillsShouldSlide(true);
        }
      }
    };

    checkVisibility();
    const t = setTimeout(checkVisibility, 120);

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const isUp = scrollDirection.current === 'up';
          entries.forEach((entry) => {
            if (entry.target === illusNode) {
              if (entry.isIntersecting) {
                if (isUp) {
                  setSkillsShouldSlide(false);
                  setSkillsIllustrationInView(true);
                } else {
                  setSkillsShouldSlide(true);
                  setSkillsIllustrationInView(true);
                }
              } else if (entry.boundingClientRect.top > window.innerHeight) {
                setSkillsIllustrationInView(false);
                setSkillsShouldSlide(true);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      if (illusNode) observer.observe(illusNode);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      clearTimeout(t);
      if (observer && illusNode) {
        observer.unobserve(illusNode);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [refreshKey]);

  // Build resolved skills list
  let displayList = [];

  if (Array.isArray(skills) && skills.length > 0) {
    const seen = new Set();
    skills.forEach((s) => {
      const card = resolveSkillCard(s);
      if (!seen.has(card.id)) {
        seen.add(card.id);
        displayList.push(card);
      }
    });
  }

  // Fallback to default list if skills are empty
  if (displayList.length === 0) {
    displayList = DEFAULT_SKILL_KEYS.map((k) => resolveSkillCard(k));
  }

  // Duplicate list to achieve seamless continuous looping without jump
  const marqueeList = [...displayList, ...displayList];

  return (
    <div className="space-y-6 sm:space-y-7 lg:space-y-8 w-full">
      {/* ─── Mobile Section Header with Top-Right Illustration (< md) matching Reference Template ─── */}
      <div className="md:hidden pb-1 animate-heading-fade-slide-up">
        {/* Top-right illustration: Clean coding laptop & gear illustration (transparent, no round color blob) */}
        <div
          ref={skillsIllustrationRef}
          className={`float-right ml-2.5 mb-1.5 w-[145px] xs:w-[160px] sm:w-[175px] select-none ${
            skillsIllustrationInView
              ? skillsShouldSlide
                ? 'animate-mobile-about-slide'
                : 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-10'
          }`}
        >
          <img
            src={assetUrl('skills-header-illustration.png')}
            alt="Skills Illustration"
            className="w-full h-auto object-contain drop-shadow-sm pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Sub-header / Category Tag: SKILLS — (Rounded color pill matching PROJECTS & EDUCATION) */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[12.5px] xs:text-[13px] font-black tracking-wider text-[#0062FF] uppercase">
            SKILLS
          </span>
          <span className="w-8 sm:w-10 h-[2.5px] bg-[#0062FF] rounded-full inline-block"></span>
        </div>

        {/* Main Headline: Technologies on line 1, I Work With on line 2 */}
        <h2 className="text-[22px] xs:text-[24px] font-black tracking-tight leading-tight mb-2 text-slate-900">
          <span className="block">Technologies</span>
          <span className="block text-[#0062FF]">I Work With</span>
        </h2>

        {/* Subtitle description */}
        <p className="text-[12px] xs:text-[12.5px] text-slate-500 font-normal leading-relaxed text-justify">
          I have developed a strong foundation in modern web technologies, programming languages, and development tools. Here are the key skills I&apos;ve been working on as a Python Full-Stack Developer.
        </p>

        <div className="clear-both"></div>
      </div>

      {/* ─── Desktop Section Header: SKILLS — Technologies I Work With (>= md) UNCHANGED ─── */}
      <div className="hidden md:flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 sm:pb-4 animate-heading-fade-slide-up">
        <div className="space-y-2.5">
          {/* Sub-header / Category Tag: SKILLS — */}
          <div className="flex items-center gap-2.5">
            <span className="text-[13.5px] xs:text-sm sm:text-sm font-black tracking-wider text-[#0062FF] uppercase">
              SKILLS
            </span>
            <span className="w-9 sm:w-12 h-[3px] bg-[#0062FF] rounded-full inline-block"></span>
          </div>

          {/* Main Headline: Technologies I Work With */}
          <h2 className="text-[27px] xs:text-[30px] sm:text-4xl lg:text-[40px] font-black tracking-tight leading-tight">
            <span className="text-[#0f172a]">Technologies </span>
            <span className="text-[#0062FF]">I Work With</span>
          </h2>

          {/* Subtitle description */}
          <p className="text-[14.5px] xs:text-[15px] sm:text-base lg:text-[16.5px] text-slate-500 font-normal leading-relaxed max-w-3xl">
            I have developed a strong foundation in modern web technologies, programming languages, and development tools. Here are the key skills I&apos;ve been working on as a Python Full-Stack Developer.
          </p>
        </div>
      </div>

      {/* ─── Desktop Scrolling Track with Individual Cards & Colored Icon Boxes (>= md) ─── */}
      <div className="hidden md:block w-full overflow-hidden relative py-3 animate-card-slide-fade">
        {/* Left Fade Gradient Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

        {/* Right Fade Gradient Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Marquee Track in Continuous Slow Motion (Pauses on Hover/Touch) */}
        <div
          className="animate-marquee-slow flex items-center gap-4 sm:gap-5 py-4 cursor-grab active:cursor-grabbing select-none"
          title="Skills & Technologies"
        >
          {marqueeList.map((skill, idx) => {
            const isHovered = hoveredIdx === `${skill.id}-${idx}`;

            return (
              <div
                key={`${skill.id}-${idx}`}
                onMouseEnter={() => setHoveredIdx(`${skill.id}-${idx}`)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  const skillKey = skill.id || skill.displayName || skill.name;
                  openSkill(skillKey);
                }}
                className="w-[146px] h-[162px] sm:w-[162px] sm:h-[178px] lg:w-[172px] lg:h-[188px] rounded-3xl flex-shrink-0 flex flex-col items-center justify-center p-3.5 sm:p-4 transition-all duration-300 cursor-pointer select-none group"
                style={{
                  backgroundColor: isHovered ? (skill.cardBgHover || '#ffffff') : '#ffffff',
                  borderWidth: isHovered ? '2px' : '1px',
                  borderStyle: 'solid',
                  borderColor: isHovered ? (skill.cardBorderHover || '#3b82f6') : '#e2e8f0',
                  boxShadow: isHovered
                    ? (skill.cardShadowHover || '0 10px 25px rgba(59, 130, 246, 0.2)')
                    : '0 1px 2px rgba(0, 0, 0, 0.04)',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                {/* ─── Colored Icon Box (Round Color Shape to All) ─── */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[84px] lg:h-[84px] rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: skill.iconBoxBg,
                    borderWidth: skill.iconBoxBorder && skill.iconBoxBorder !== 'transparent' ? '1px' : '0',
                    borderStyle: 'solid',
                    borderColor: skill.iconBoxBorder || 'transparent',
                  }}
                >
                  {skill.renderIcon()}
                </div>

                {/* ─── Skill Label ─── */}
                <span
                  className="text-sm sm:text-[15px] font-extrabold text-center tracking-tight truncate max-w-[136px] sm:max-w-[150px] leading-tight transition-colors duration-200 mt-3 text-slate-800"
                  style={{
                    color: isHovered ? (skill.cardTextHover || '#2563eb') : undefined,
                  }}
                >
                  {skill.displayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Mobile Scrolling Track in Continuous Automatic Motion (< md) Same as PC Skills Section ─── */}
      <div className="md:hidden -mx-4 w-[calc(100%+2rem)] overflow-hidden relative py-2 animate-card-slide-fade">
        {/* Marquee Track in Continuous Slow Motion (Automatic Scrolled, Full Visual Clarity with Zero Fog Mask) */}
        <div
          ref={mobileMarqueeRef}
          className="animate-marquee-slow flex items-center gap-3 py-3 select-none"
          style={{ animationPlayState: 'running' }}
          title="Skills & Technologies"
        >
          {marqueeList.map((skill, idx) => {
            const isIdentified = Boolean(
              identifiedSkillId &&
              (skill.id === identifiedSkillId ||
               String(skill.displayName || '').toLowerCase() === identifiedSkillId)
            );

            return (
              <div
                key={`mobile-${skill.id}-${idx}`}
                onClick={() => {
                  const skillKey = skill.id || skill.displayName || skill.name;
                  openSkill(skillKey);
                }}
                data-identified={isIdentified ? 'true' : 'false'}
                className="w-[128px] h-[144px] rounded-2xl flex-shrink-0 flex flex-col items-center justify-center p-3 transition-all duration-300 cursor-pointer select-none active:scale-95 group"
                style={{
                  backgroundColor: isIdentified ? (skill.cardBgHover || '#ffffff') : '#ffffff',
                  borderWidth: isIdentified ? '2px' : '1px',
                  borderStyle: 'solid',
                  borderColor: isIdentified ? (skill.cardBorderHover || skill.brandColor || '#3b82f6') : '#e2e8f0',
                  boxShadow: isIdentified
                    ? (skill.cardShadowHover || '0 8px 24px rgba(0, 0, 0, 0.15)')
                    : '0 1px 2px rgba(0, 0, 0, 0.04)',
                }}
              >
                {/* Colored Icon Box */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: skill.iconBoxBg,
                    borderWidth: skill.iconBoxBorder && skill.iconBoxBorder !== 'transparent' ? '1px' : '0',
                    borderStyle: 'solid',
                    borderColor: skill.iconBoxBorder || 'transparent',
                  }}
                >
                  {skill.renderIcon()}
                </div>

                {/* Skill Label */}
                <span
                  className={`text-[12.5px] text-center tracking-tight truncate max-w-[112px] leading-tight transition-colors duration-200 mt-2.5 ${
                    isIdentified ? 'font-black' : 'font-extrabold text-slate-800'
                  }`}
                  style={{
                    color: isIdentified ? (skill.cardTextHover || skill.brandColor || '#2563eb') : undefined,
                  }}
                >
                  {skill.displayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Interactive 5-Subheading Skill Detail Modal ─── */}
      <SkillDetailModal
        isOpen={Boolean(activeModalSkill)}
        skillKey={activeModalSkill}
        onClose={closeSkill}
        onOpenProject={onOpenProject}
      />
    </div>
  );
}
