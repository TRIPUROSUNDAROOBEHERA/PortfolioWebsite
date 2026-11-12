import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import axiosClient from '../api/axiosClient';
import projectsApi from '../api/projectsApi';
import skillApi from '../api/skillApi';
import certificatesApi from '../api/certificatesApi';
import educationApi from '../api/educationApi';

// Modular Public Views
import Home from './Home';
import AboutPage from './AboutPage';
import EducationPage from './EducationPage';
import SkillsPage from './SkillsPage';
import CertificatesPage from './CertificatesPage';
import ContactPage from './ContactPage';

const PATH_TO_TAB = {
  '/': 'home',
  '/about': 'about',
  '/education': 'education',
  '/skills': 'skills',
  '/projects': 'projects',
  '/certificates': 'certificates',
  '/contact': 'contact',
  '/future-plans': 'future-plans',
  '/resources': 'resources',
};

const TAB_TO_PATH = {
  home: '/',
  about: '/about',
  education: '/education',
  skills: '/skills',
  projects: '/projects',
  certificates: '/certificates',
  contact: '/contact',
  'future-plans': '/future-plans',
  resources: '/resources',
};

const getTabFromPath = (pathname) => {
  if (!pathname) return 'home';
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (PATH_TO_TAB[clean]) {
    return PATH_TO_TAB[clean];
  }
  for (const [routePath, tabId] of Object.entries(PATH_TO_TAB)) {
    if (routePath !== '/' && clean.startsWith(routePath)) {
      return tabId;
    }
  }
  return 'home';
};

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize activeTab strictly from current URL path
  const [activeTab, setActiveTabState] = useState(() => {
    return getTabFromPath(location.pathname);
  });

  // Keep activeTab synchronized with browser URL changes (refresh, Back/Forward, direct URL)
  useEffect(() => {
    const tabFromUrl = getTabFromPath(location.pathname);
    setActiveTabState(tabFromUrl);
    sessionStorage.setItem('active_portfolio_tab', tabFromUrl);
  }, [location.pathname]);

  // Seamless Landing Position restoration on page load/refresh with zero jumping or rolling
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.get('skill')) sessionStorage.removeItem('open_skill_id');
    if (!searchParams.get('project')) sessionStorage.removeItem('open_project_id');
    if (!searchParams.get('cert')) sessionStorage.removeItem('open_cert_id');

    const hasSkill = searchParams.get('skill');
    const hasProject = searchParams.get('project');
    const hasCert = searchParams.get('cert');

    const cleanPath = location.pathname.toLowerCase().replace(/\/+$/, '').replace(/^\//, '');
    const isSpecialPath = ['about', 'skills', 'projects', 'education', 'certificates', 'contact'].includes(cleanPath);
    const targetId = hasSkill
      ? 'skills'
      : (hasProject
          ? 'projects'
          : (hasCert
              ? 'certificates'
              : (location.hash
                  ? location.hash.replace('#', '').toLowerCase()
                  : (isSpecialPath ? cleanPath : 'home'))));

    if (targetId && targetId !== 'home') {
      const applyLandingPosition = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const navHeight = 70;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navHeight);
          window.scrollTo({
            top: offsetPosition,
            behavior: 'instant',
          });
          sessionStorage.setItem('landing_pos_' + targetId, Math.round(offsetPosition));
          return true;
        }
        const saved = sessionStorage.getItem('landing_pos_' + targetId);
        if (saved) {
          window.scrollTo({
            top: parseInt(saved, 10),
            behavior: 'instant',
          });
          return true;
        }
        return false;
      };

      // Set directly at Landing Position before browser paints (zero jumping, zero rolling)
      applyLandingPosition();
      const rafId = requestAnimationFrame(() => {
        applyLandingPosition();
      });

      return () => cancelAnimationFrame(rafId);
    } else {
      // Direct visit to root URL (tripurosundaro.me) always starts strictly at the very top (Hero section)
      const resetToTop = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      };
      resetToTop();
      const rafId = requestAnimationFrame(resetToTop);
      const timer = setTimeout(resetToTop, 50);
      sessionStorage.setItem('active_portfolio_section', 'home');
      sessionStorage.setItem('active_portfolio_tab', 'home');
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    }
  }, [location.hash, location.pathname, location.search]);

  const [targetSkill, setTargetSkill] = useState(null);

  // In-page scrolling tab handler with customizable behavior ('smooth' or 'instant')
  const setActiveTab = useCallback(
    (newTab, skillParam = null, behavior = 'smooth') => {
      const targetId = (newTab || 'home').toLowerCase();

      if (skillParam) {
        setTargetSkill(skillParam);
      } else {
        setTargetSkill(null);
      }

      sessionStorage.setItem('active_portfolio_section', targetId);
      sessionStorage.setItem('active_portfolio_tab', targetId);

      if (targetId === 'home') {
        if (window.location.hash) {
          const search = window.location.search || '';
          window.history.replaceState(null, '', `${window.location.pathname}${search}`);
        }
        window.scrollTo({ top: 0, behavior });
        return;
      }

      const search = window.location.search || '';
      window.history.replaceState(null, '', `${window.location.pathname}${search}#${targetId}`);

      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 70;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, elementPosition - navHeight),
          behavior,
        });
      }
    },
    []
  );

  // ─── ONE-SCROLL FULL-PAGE TRANSITION CONTROLLER ───
  // Advances exactly 1 page per scroll action:
  // Home -> About -> Skills -> Projects -> Education -> Certificates -> Contact
  useEffect(() => {
    const FULL_PAGE_SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'];
    let isTransitioning = false;
    let touchStartY = 0;
    let touchStartX = 0;

    const isModalActive = () => {
      return (
        document.body.classList.contains('modal-open') ||
        Boolean(document.querySelector('.modal-open')) ||
        Boolean(document.querySelector('[role="dialog"]'))
      );
    };

    const getPositions = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const navHeight = 70;
      return FULL_PAGE_SECTIONS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: 0, bottom: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        const top = Math.max(0, rect.top + scrollY - navHeight);
        const height = el.offsetHeight;
        return { id, top, bottom: top + height, height };
      });
    };

    const getCurrentIndex = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const windowHeight = window.innerHeight || 0;
      const docHeight = document.documentElement.scrollHeight || 0;

      // If scrolled close to bottom of document, we are on the footer ('contact')
      if (scrollY + windowHeight >= docHeight - 40) {
        return FULL_PAGE_SECTIONS.length - 1;
      }

      const positions = getPositions();
      for (let i = positions.length - 1; i >= 0; i--) {
        if (scrollY >= positions[i].top - 60) {
          return i;
        }
      }
      return 0;
    };

    const handleWheel = (e) => {
      // Allow natural smooth scrolling on mobile/tablet viewports (< 1024px)
      if (window.innerWidth < 1024) return;

      // Don't intercept if any modal is open, or target is an input or dialog
      if (
        isModalActive() ||
        (e.target && e.target.closest && e.target.closest('[role="dialog"], .modal-content, .fixed.inset-0, input, textarea, select'))
      ) {
        return;
      }

      // Filter out micro-jitter
      if (Math.abs(e.deltaY) < 18) return;

      if (isTransitioning) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const positions = getPositions();
      const currentIndex = getCurrentIndex();
      const currentSec = positions[currentIndex];
      const isDown = e.deltaY > 0;

      if (isDown) {
        if (currentIndex < FULL_PAGE_SECTIONS.length - 1) {
          // If section is much taller than viewport (e.g. showAll certificates expanded), let natural scroll work first
          const viewportHeight = window.innerHeight - 70;
          const currentScrollBottom = (window.pageYOffset || 0) + window.innerHeight;
          if (currentSec.height > viewportHeight + 120 && currentScrollBottom < currentSec.bottom - 40) {
            return;
          }

          if (e.cancelable) e.preventDefault();
          isTransitioning = true;
          setActiveTab(FULL_PAGE_SECTIONS[currentIndex + 1], null, 'smooth');
          setTimeout(() => {
            isTransitioning = false;
          }, 850);
        }
      } else {
        if (currentIndex > 0) {
          // If scrolled down inside a tall section, let natural scroll go up to section top first
          const currentScrollTop = window.pageYOffset || 0;
          if (currentScrollTop > currentSec.top + 40) {
            return;
          }

          if (e.cancelable) e.preventDefault();
          isTransitioning = true;
          setActiveTab(FULL_PAGE_SECTIONS[currentIndex - 1], null, 'smooth');
          setTimeout(() => {
            isTransitioning = false;
          }, 850);
        }
      }
    };

    const handleTouchStart = (e) => {
      // Allow 100% natural touch scrolling on mobile and tablet screens
      if (window.innerWidth < 1024) return;

      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e) => {
      // Allow 100% natural touch scrolling on mobile and tablet screens
      if (window.innerWidth < 1024) return;

      if (
        isModalActive() ||
        (e.target && e.target.closest && e.target.closest('[role="dialog"], .modal-content, .fixed.inset-0, input, textarea, select'))
      ) {
        return;
      }

      if (isTransitioning) return;

      if (e.changedTouches && e.changedTouches.length > 0) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaY = touchStartY - touchEndY;
        const deltaX = touchStartX - touchEndX;

        // Ensure vertical swipe
        if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(deltaX) * 1.3) {
          const currentIndex = getCurrentIndex();
          if (deltaY > 0 && currentIndex < FULL_PAGE_SECTIONS.length - 1) {
            isTransitioning = true;
            setActiveTab(FULL_PAGE_SECTIONS[currentIndex + 1], null, 'smooth');
            setTimeout(() => {
              isTransitioning = false;
            }, 850);
          } else if (deltaY < 0 && currentIndex > 0) {
            isTransitioning = true;
            setActiveTab(FULL_PAGE_SECTIONS[currentIndex - 1], null, 'smooth');
            setTimeout(() => {
              isTransitioning = false;
            }, 850);
          }
        }
      }
    };

    const handleKeyDown = (e) => {
      if (
        isModalActive() ||
        (e.target && e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]'))
      ) {
        return;
      }

      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        const currentIndex = getCurrentIndex();
        if (currentIndex < FULL_PAGE_SECTIONS.length - 1) {
          e.preventDefault();
          setActiveTab(FULL_PAGE_SECTIONS[currentIndex + 1], null, 'smooth');
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        const currentIndex = getCurrentIndex();
        if (currentIndex > 0) {
          e.preventDefault();
          setActiveTab(FULL_PAGE_SECTIONS[currentIndex - 1], null, 'smooth');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setActiveTab]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState({
    full_name: 'Tripurosundaro Behera',
    first_name: 'Tripurosundaro',
    last_name: 'Behera',
    initials: 'TB',
    role: 'Python Full-Stack Developer',
    headline: 'Python Full-Stack Developer',
    email: '24jnf00084@svcn.ac.in',
    phone: '+91- 9014239763',
    linkedin_url: 'https://www.linkedin.com/in/btripurosundaro/',
    github_url: 'https://github.com/tripurosundarobehera',
    whatsapp_url: '',
    whatsapp_number: '+91 98765 43210',
    location: 'India',
    avatar: '/avatar.png',
    workspaceImg: '/about-illustration.png',
    bio: 'I am an MCA postgraduate focused on Python Full-Stack Development. I build web applications using Python, Django, React.js, JavaScript, and SQL. I enjoy solving problems and developing practical, responsive applications. I am seeking an entry-level Python Full-Stack Developer opportunity to contribute to real-world projects and grow professionally.',
    hero_description: 'Passionate Python Full-Stack Developer dedicated to building responsive, scalable web applications with Python, Django, React, and SQL. Committed to writing clean code, solving real-world engineering challenges, and delivering modern, high-impact web solutions.',
    total_projects: '4+',
    total_skills: '8+',
    total_certificates: '5+',
  });

  const fetchAllData = useCallback(async () => {
    try {
      const [profRes, projRes, skillRes, certRes, eduRes] = await Promise.allSettled([
        axiosClient.get('/profile/'),
        projectsApi.getAll(),
        skillApi.getAll({ page_size: 50 }),
        certificatesApi.getAll(),
        educationApi.getAll(),
      ]);

      if (profRes.status === 'fulfilled' && profRes.value?.data?.id) {
        const d = profRes.value.data;
        const fullName = d.full_name && d.full_name !== 'Your Name'
          ? d.full_name
          : 'Tripurosundaro Behera';
        const firstName = d.first_name && d.first_name !== 'Your'
          ? d.first_name
          : 'Tripurosundaro';
        const lastName = d.last_name && d.last_name !== 'Name'
          ? d.last_name
          : 'Behera';
        const avatar = d.avatar || '/avatar.png';

        setProfile(prev => ({
          ...prev,
          ...d,
          role: d.role || d.headline || prev.role,
          headline: d.headline || d.role || prev.headline,
          about_text: d.about_text || d.bio || prev.bio,
          bio: d.bio || d.about_text || prev.bio,
          hero_description: d.hero_description || prev.hero_description,
          full_name: fullName,
          first_name: firstName,
          last_name: lastName,
          avatar: avatar,
          initials: fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        }));
      }

      if (projRes.status === 'fulfilled') {
        const raw = projRes.value?.data || projRes.value;
        const pData = raw?.results || raw;
        if (Array.isArray(pData) && pData.length > 0) {
          if (raw?.total_items) pData.total_items = raw.total_items;
          setProjects(pData);
        }
      }

      if (skillRes.status === 'fulfilled') {
        const raw = skillRes.value?.data || skillRes.value;
        const sData = raw?.results || raw;
        if (Array.isArray(sData) && sData.length > 0) {
          if (raw?.total_items) sData.total_items = raw.total_items;
          setSkills(sData);
        }
      }

      if (certRes.status === 'fulfilled') {
        const raw = certRes.value?.data || certRes.value;
        const cData = raw?.results || raw;
        if (Array.isArray(cData) && cData.length > 0) {
          if (raw?.total_items) cData.total_items = raw.total_items;
          setCertificates(cData);
        }
      }

      if (eduRes.status === 'fulfilled') {
        const raw = eduRes.value?.data || eduRes.value;
        const eData = raw?.results || raw;
        if (Array.isArray(eData) && eData.length > 0) {
          if (raw?.total_items) eData.total_items = raw.total_items;
          setEducation(eData);
        }
      }
    } catch {
      // Retain state during transient errors
    }
  }, []);

  // ─── Smooth Refresh Animation & Data Sync Architecture ───
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshingSection, setRefreshingSection] = useState(null);
  const [sectionRefreshKeys, setSectionRefreshKeys] = useState({});
  const refreshTimerRef = useRef(null);

  const getInitialActiveSection = () => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      if (search.get('skill')) return 'skills';
      if (search.get('project')) return 'projects';
      if (search.get('cert')) return 'certificates';
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) return hash;
    }
    return getTabFromPath(location.pathname);
  };
  const [activeSection, setActiveSection] = useState(getInitialActiveSection);
  const activeSectionRef = useRef(getInitialActiveSection());
  const handleActiveSectionChange = useCallback((sec) => {
    if (sec) {
      activeSectionRef.current = sec;
      setActiveSection(sec);
    }
  }, []);

  const handleSmoothRefresh = useCallback(
    async (requestedSection) => {
      // Guard against repeated/rapid clicks to avoid duplicate requests
      if (isRefreshing) return;

      const target =
        (typeof requestedSection === 'string' && requestedSection) ||
        activeSectionRef.current ||
        'home';

      setIsRefreshing(true);
      setRefreshingSection(target);

      // Save exact scroll position so refreshing never resets the user to Home or top of page
      const savedScrollY = window.scrollY;

      // Subtle 200ms fade-out transition
      await new Promise((resolve) => setTimeout(resolve, 200));

      try {
        await fetchAllData();
      } catch (err) {
        console.error('Smooth refresh data fetch failed:', err);
      }

      // Restore position accurately anchored to the target section
      const restorePosition = () => {
        if (target !== 'home') {
          const el = document.getElementById(target);
          if (el) {
            const navHeight = 70;
            const buffer = 16;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: Math.max(0, elementPosition - navHeight - buffer),
              behavior: 'instant',
            });
            return;
          }
        }
        window.scrollTo({ top: savedScrollY, behavior: 'instant' });
      };

      restorePosition();

      // Increment key for the target section to trigger the Education-style animation replay
      setSectionRefreshKeys((prev) => ({
        ...prev,
        [target]: (prev[target] || 0) + 1,
      }));

      // Ensure position remains preserved through React render tick
      requestAnimationFrame(() => {
        restorePosition();
      });

      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = setTimeout(() => {
        setRefreshingSection(null);
        setIsRefreshing(false);
      }, 250);
    },
    [isRefreshing, fetchAllData]
  );

  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []);

  useEffect(() => {
    fetchAllData();

    // 1. Refetch immediately when tab gains focus (e.g. returning from Django admin)
    const handleFocus = () => fetchAllData();
    window.addEventListener('focus', handleFocus);

    // 2. Periodic background poll every 15s for automatic hands-free real-time sync
    const intervalId = setInterval(fetchAllData, 15000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, [fetchAllData]);

  const renderContent = () => {
    return (
      <Home
        profile={profile}
        setActiveTab={setActiveTab}
        projects={projects}
        skills={skills}
        certificates={certificates}
        education={education}
        onRefresh={handleSmoothRefresh}
        isRefreshing={isRefreshing}
        refreshingSection={refreshingSection}
        sectionRefreshKeys={sectionRefreshKeys}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* 1. Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onRefresh={handleSmoothRefresh}
        isRefreshing={isRefreshing}
        onActiveSectionChange={handleActiveSectionChange}
      />

      {/* 2. Dynamic Tab Container with Smooth Refresh & Entrance Transitions */}
      <main id="main-content" className="flex-1 w-full">
        {renderContent()}
      </main>

      {/* 3. Gradient Minimal Social Footer */}
      <Footer
        profile={profile}
        refreshingSection={refreshingSection}
        refreshKey={sectionRefreshKeys['contact'] || 0}
      />
    </div>
  );
}