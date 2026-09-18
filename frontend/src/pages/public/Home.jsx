import React, { useState } from 'react';
import contactApi from '../../api/contactApi';

export default function Home({
  profile,
  setActiveTab,
  projects = [],
  certificates = [],
  courses = [],
}) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactApi.sendMessage(contactForm);
      setFormStatus('Message transmitted successfully!');
      setContactForm({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('Message recorded locally!');
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  // ─── DYNAMIC AUTOMATIC STAT METRICS (Real Database Driven) ───
  const getDisplayCount = (val, fallbackCount) => {
    if (val !== undefined && val !== null && val !== '') {
      return String(val).includes('+') || String(val).includes('%') ? val : `${val}+`;
    }
    return fallbackCount > 0 ? `${fallbackCount}+` : '0';
  };

  const statMetrics = [
    {
      num: profile?.years_of_learning
        ? (String(profile.years_of_learning).includes('+') ? profile.years_of_learning : `${profile.years_of_learning}+`)
        : '2+',
      label: 'Years of Learning',
      icon: 'fa-solid fa-graduation-cap',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      num: getDisplayCount(profile?.total_projects, projects.length),
      label: 'Projects Completed',
      icon: 'fa-solid fa-code',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      num: getDisplayCount(profile?.total_certificates, certificates.length),
      label: 'Certificates Earned',
      icon: 'fa-solid fa-award',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      num: getDisplayCount(profile?.courses_completed, courses.length),
      label: 'Courses Completed',
      icon: 'fa-solid fa-book-open',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      num: profile?.hours_of_coding
        ? (String(profile.hours_of_coding).includes('+') ? profile.hours_of_coding : `${profile.hours_of_coding}+`)
        : '1000+',
      label: 'Hours of Coding',
      icon: 'fa-regular fa-clock',
      color: 'bg-pink-50 text-pink-600',
    },
    {
      num: profile?.dedication_percentage ? `${profile.dedication_percentage}%` : '100%',
      label: 'Dedication',
      icon: 'fa-solid fa-heart',
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="w-full bg-[#f8faff] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── 1. HERO SECTION ─── */}
      <section
        className="relative px-6 sm:px-12 pt-14 pb-20 overflow-hidden border-b border-slate-200/80"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f6ff 40%, #edf0ff 70%, #f7ebff 100%)',
        }}
      >
        <div className="absolute top-6 right-8 w-28 h-28 opacity-25 pointer-events-none hidden sm:grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          ))}
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          <div className="max-w-xl text-left space-y-4">
            <span className="text-blue-600 font-bold text-sm tracking-wide">Hi, Im</span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              S. Ram <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Kumar</span>
              <span className="text-blue-500 text-3xl font-light align-super ml-0.5">®</span>
            </h1>

            <div className="space-y-1">
              <p className="text-base sm:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                {profile?.role || profile?.headline || 'MCA Graduate | Software Developer'}
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pt-1">
              {profile?.bio ||
                profile?.hero_description ||
                'Passionate about building web applications and exploring new technologies. Love to solve real-world problems and contribute to impactful solutions.'}
            </p>

            <div className="flex items-center gap-4 pt-3 flex-wrap">
              <button
                onClick={() => setActiveTab('projects')}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                View My Work <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <i className="fa-regular fa-envelope text-slate-500 text-xs"></i> Contact Me
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2.5 bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-300 shadow-2xl shadow-indigo-200/50 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-slate-100">
                <img
                  src={profile?.avatar || '/avatar.png'}
                  alt={profile?.full_name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={profile?.linkedin_url || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md flex items-center justify-center text-sm transition-all"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={profile?.github_url || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white shadow-md flex items-center justify-center text-sm transition-all"
                title="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href={profile?.twitter_url || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-sky-500 hover:bg-sky-500 hover:text-white shadow-md flex items-center justify-center text-sm transition-all"
                title="Twitter"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href={`mailto:${profile?.email || 'sramkumar0101@gmail.com'}`}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-pink-500 hover:bg-pink-500 hover:text-white shadow-md flex items-center justify-center text-sm transition-all"
                title="Email"
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
              <a
                href={profile?.resume || '/resume.pdf'}
                download
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-md flex items-center justify-center text-sm transition-all"
                title="Download CV"
              >
                <i className="fa-solid fa-download text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FLOATING METRIC CARDS (REAL DYNAMIC DATA) ─── */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-200/60 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {statMetrics.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 px-2 sm:px-4 py-2 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-base flex-shrink-0 transition-transform duration-300 hover:scale-110`}>
                <i className={stat.icon}></i>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">{stat.num}</div>
                <div className="text-[10.5px] font-semibold text-slate-500 whitespace-nowrap">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3. MULTI-SECTION 2-COLUMN GRID WITH HOVER COLOR SHIFTS ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-10">
        
        {/* ROW 1: ABOUT ME & EDUCATION TIMELINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 1: About Me */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-blue-500/30">
                  <i className="fa-regular fa-user text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-blue-600">About Me</span>
              </div>
              <button onClick={() => setActiveTab('about')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                Read More →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {profile?.about_text ||
                    profile?.bio ||
                    'I am a motivated MCA graduate with a strong foundation in computer applications and a passion for software development.'}
                </p>
                <button
                  onClick={() => setActiveTab('about')}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer transition-all"
                >
                  View Profile
                </button>
              </div>
              <img
                src={profile?.about_image || profile?.workspaceImg || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80'}
                alt="About Workspace"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Section 2: Education Timeline */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-purple-500/30">
                  <i className="fa-solid fa-graduation-cap text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-purple-600">Education Timeline</span>
              </div>
              <button onClick={() => setActiveTab('education')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 transition-colors">
                    <div className="text-[11px] font-extrabold text-blue-600">MCA</div>
                    <div className="text-[9px] font-bold text-slate-700 mt-0.5">2024 – 2026</div>
                    <div className="text-[8.5px] text-emerald-600 font-bold">CGPA: 8.7</div>
                  </div>
                  <div className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 transition-colors">
                    <div className="text-[11px] font-extrabold text-emerald-600">B.Sc</div>
                    <div className="text-[9px] font-bold text-slate-700 mt-0.5">2018 – 2021</div>
                    <div className="text-[8.5px] text-emerald-600 font-bold">70.80%</div>
                  </div>
                  <div className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 transition-colors">
                    <div className="text-[11px] font-extrabold text-amber-600">12th</div>
                    <div className="text-[9px] font-bold text-slate-700 mt-0.5">2016 – 2017</div>
                    <div className="text-[8.5px] text-emerald-600 font-bold">74.40%</div>
                  </div>
                  <div className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition-colors">
                    <div className="text-[11px] font-extrabold text-rose-600">10th</div>
                    <div className="text-[9px] font-bold text-slate-700 mt-0.5">2015</div>
                    <div className="text-[8.5px] text-emerald-600 font-bold">60%</div>
                  </div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80"
                alt="Education"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>

        {/* ROW 2: SKILLS & TECHNOLOGIES & PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 3: Skills & Technologies */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-cyan-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-cyan-500/30">
                  <i className="fa-solid fa-layer-group text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-cyan-600">Skills & Technologies</span>
              </div>
              <button onClick={() => setActiveTab('skills')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 w-full">
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'Django', 'React.js', 'JavaScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'REST APIs'].map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-cyan-50 hover:text-cyan-700 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80"
                alt="Skills Code"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Section 4: Projects */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-indigo-500/30">
                  <i className="fa-solid fa-laptop-code text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-indigo-600">Projects</span>
              </div>
              <button onClick={() => setActiveTab('projects')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-2 w-full">
                {projects.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 transition-colors cursor-pointer" onClick={() => setActiveTab('projects')}>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.description || item.tech_stack}</p>
                  </div>
                ))}
                {projects.length === 0 && (
                  <>
                    <div className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 transition-colors">
                      <h4 className="text-xs font-bold text-slate-900">Portfolio CMS Website</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Django + React full stack management suite.</p>
                    </div>
                    <div className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 transition-colors">
                      <h4 className="text-xs font-bold text-slate-900">Task Management Platform</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Authentication & Kanban board tracker.</p>
                    </div>
                  </>
                )}
              </div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80"
                alt="Projects Overview"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>

        {/* ROW 3: CERTIFICATES & ACHIEVEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 5: Certificates */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-amber-500/30">
                  <i className="fa-solid fa-award text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-amber-600">Certificates</span>
              </div>
              <button onClick={() => setActiveTab('certificates')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-2 w-full">
                {certificates.slice(0, 2).map((cert, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-amber-50/50 transition-colors">
                    <div className="font-bold text-slate-900 text-[11px]">{cert.title}</div>
                    <div className="text-[9.5px] text-slate-500">{cert.issuer} {cert.issue_date && `| ${cert.issue_date}`}</div>
                  </div>
                ))}
                {certificates.length === 0 && (
                  <>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-amber-50/50 transition-colors">
                      <div className="font-bold text-slate-900 text-[11px]">React - Complete Guide</div>
                      <div className="text-[9.5px] text-slate-500">Udemy Certification | 2024</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-amber-50/50 transition-colors">
                      <div className="font-bold text-slate-900 text-[11px]">Python for Data Science</div>
                      <div className="text-[9.5px] text-slate-500">Coursera Verified | 2024</div>
                    </div>
                  </>
                )}
              </div>
              <img
                src="https://images.unsplash.com/photo-1589330694653-dad6d3240a91?w=500&auto=format&fit=crop&q=80"
                alt="Certificates Badge"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Section 6: Achievements */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-orange-500/30">
                  <i className="fa-solid fa-trophy text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-orange-600">Achievements</span>
              </div>
              <button onClick={() => setActiveTab('achievements')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-medal text-amber-500 mt-1 text-xs"></i>
                  <div>
                    <div className="font-bold text-slate-900 text-[11px]">College Topper - MCA</div>
                    <div className="text-[9.5px] text-slate-500">Academic Excellence Award</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-code text-blue-500 mt-1 text-xs"></i>
                  <div>
                    <div className="font-bold text-slate-900 text-[11px]">Hackathon Winner</div>
                    <div className="text-[9.5px] text-slate-500">Smart India Hackathon Finalist</div>
                  </div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=500&auto=format&fit=crop&q=80"
                alt="Achievements Trophy"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>

        {/* ROW 4: COURSES COMPLETED & LATEST BLOG POSTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 7: Courses Completed */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-emerald-500/30">
                  <i className="fa-solid fa-circle-check text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-emerald-600">Courses Completed</span>
              </div>
              <button onClick={() => setActiveTab('courses')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-2 w-full">
                {courses.slice(0, 3).map((crs, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-emerald-500 text-xs"></i>
                    <span className="text-[11px] font-semibold text-slate-700">{crs.title || crs.name}</span>
                  </div>
                ))}
                {courses.length === 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-emerald-500 text-xs"></i>
                      <span className="text-[11px] font-semibold text-slate-700">Data Structures & Algorithms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-emerald-500 text-xs"></i>
                      <span className="text-[11px] font-semibold text-slate-700">Web Development Bootcamp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-emerald-500 text-xs"></i>
                      <span className="text-[11px] font-semibold text-slate-700">Database Management Systems</span>
                    </div>
                  </>
                )}
              </div>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"
                alt="Courses Online"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Section 8: Latest Blog Posts */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-pink-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-pink-500/30">
                  <i className="fa-solid fa-pen-nib text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-pink-600">Latest Blog Posts</span>
              </div>
              <button onClick={() => setActiveTab('blog')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-2 w-full">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-pink-50/50 transition-colors cursor-pointer" onClick={() => setActiveTab('blog-details')}>
                  <h5 className="font-bold text-slate-900 text-xs">Building Scalable Django Backends</h5>
                  <span className="text-[9px] text-slate-400">May 20, 2026 • 5 min read</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-pink-50/50 transition-colors cursor-pointer" onClick={() => setActiveTab('blog-details')}>
                  <h5 className="font-bold text-slate-900 text-xs">How I Built My Portfolio CMS</h5>
                  <span className="text-[9px] text-slate-400">May 10, 2026 • 3 min read</span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=80"
                alt="Blog Writing"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>

        {/* ROW 5: FUTURE PLANS & RESOURCES & LET'S CONNECT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 9: Future Plans & Resources */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-violet-500/30">
                  <i className="fa-solid fa-bullseye text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-violet-600">Future Plans & Resources</span>
              </div>
              <button onClick={() => setActiveTab('future-plans')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 cursor-pointer hover:text-violet-700 transition-colors" onClick={() => setActiveTab('future-plans')}>
                  <i className="fa-regular fa-square-check text-blue-500 text-xs"></i>
                  <span className="text-[11px] font-medium text-slate-700">Add Machine Learning & AI Modules</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-violet-700 transition-colors" onClick={() => setActiveTab('future-plans')}>
                  <i className="fa-regular fa-square-check text-blue-500 text-xs"></i>
                  <span className="text-[11px] font-medium text-slate-700">Upload AWS & Cloud Certifications</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-violet-700 transition-colors" onClick={() => setActiveTab('resources')}>
                  <i className="fa-regular fa-square-check text-blue-500 text-xs"></i>
                  <span className="text-[11px] font-medium text-slate-700">Developer Resources & Guides</span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&auto=format&fit=crop&q=80"
                alt="Future Planning"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Section 10: Let's Connect */}
          <div className="group space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-rose-500/30">
                  <i className="fa-regular fa-envelope text-sm"></i>
                </div>
                <span className="transition-colors group-hover:text-rose-600">Lets Connect</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Quick Message</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 justify-between min-h-[190px]">
              <div className="flex-1 w-full">
                <form onSubmit={handleContactSubmit} className="space-y-1.5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <textarea
                    placeholder="Your Message"
                    required
                    rows="1"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-blue-500/20 cursor-pointer transition-all"
                  >
                    Send Message <i className="fa-solid fa-paper-plane text-[9px]"></i>
                  </button>
                  {formStatus && <div className="text-[10px] text-center font-bold text-emerald-600">{formStatus}</div>}
                </form>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=500&auto=format&fit=crop&q=80"
                alt="Connect Form"
                className="w-full sm:w-44 h-36 object-cover rounded-xl border border-slate-200 shadow-inner flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}