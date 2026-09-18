import React from 'react';

export default function AboutPage({ profile, setActiveTab }) {
  const defaultProfile = {
    full_name: profile?.full_name || 'S. Ram Kumar',
    role: profile?.role || 'MCA Graduate | Software Developer',
    email: profile?.email || 'sramkumar0101@gmail.com',
    phone: profile?.phone || '+91 98765 43210',
    location: profile?.location || 'India',
    avatar:
      profile?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    bio:
      profile?.bio ||
      'I am a motivated MCA graduate with a strong foundation in computer applications and a passion for full-stack software development. I specialize in Django, React.js, and REST APIs, building resilient real-world software solutions.',
  };

  const handleNavClick = (tabId) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const infoRows = [
    { label: 'Name:', value: defaultProfile.full_name, isLink: false },
    { label: 'Degree:', value: 'MCA Graduate', isLink: false },
    { label: 'Email:', value: defaultProfile.email, isLink: true, isEmail: true },
    { label: 'Phone:', value: defaultProfile.phone, isLink: false },
    { label: 'Location:', value: defaultProfile.location, isLink: false },
  ];

  const highlights = [
    {
      icon: 'fa-solid fa-code',
      iconColor: 'text-blue-600',
      title: 'Web Development',
      desc: 'Building responsive and modern web applications.',
    },
    {
      icon: 'fa-solid fa-server',
      iconColor: 'text-purple-600',
      title: 'Backend Systems',
      desc: 'Creating RESTful APIs and database architecture.',
    },
    {
      icon: 'fa-regular fa-lightbulb',
      iconColor: 'text-amber-500',
      title: 'Problem Solving',
      desc: 'Turning requirements into clean, scalable software.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── Breadcrumbs & Heading ─── */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">About Me</h1>
        <p className="text-xs font-semibold text-slate-500 mt-1.5">
          <button
            onClick={() => handleNavClick('home')}
            className="text-blue-600 hover:underline cursor-pointer font-bold"
          >
            Home
          </button>{' '}
          <span className="text-slate-400">/</span> <span className="text-slate-700">About</span>
        </p>
      </div>

      {/* ─── 2-Column Responsive Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Profile Identification Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          {/* Top Avatar & Name */}
          <div className="p-8 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#2563eb] to-[#9333ea] shadow-xl shadow-blue-500/10 mb-5">
              <img
                src={defaultProfile.avatar}
                alt={defaultProfile.full_name}
                className="w-full h-full object-cover rounded-full border-4 border-white"
              />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {defaultProfile.full_name}
            </h2>
            <p className="text-xs font-bold text-blue-600 mt-1">
              {defaultProfile.role}
            </p>
          </div>

          {/* Bottom Contact Details Table */}
          <div className="bg-slate-50/60 p-6 border-t border-slate-100 space-y-3.5 text-xs font-medium">
            {infoRows.map((row, idx) => (
              <div key={idx} className="flex justify-between items-center gap-2">
                <span className="text-slate-500">{row.label}</span>
                {row.isLink ? (
                  <a
                    href={row.isEmail ? `mailto:${row.value}` : row.value}
                    className="font-bold text-blue-600 hover:underline text-right truncate"
                  >
                    {row.value}
                  </a>
                ) : (
                  <span className="font-bold text-slate-800 text-right">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Bio & Focus Pillars */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
          
          {/* Bio Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Who I Am</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {defaultProfile.bio}
            </p>
          </div>

          {/* 3 Focus Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {highlights.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-2 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center shadow-xs">
                  <i className={`${card.icon} ${card.iconColor} text-base group-hover:scale-110 transition-transform`}></i>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 pt-1">
                  {card.title}
                </h4>
                <p className="text-[11.5px] text-slate-500 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}