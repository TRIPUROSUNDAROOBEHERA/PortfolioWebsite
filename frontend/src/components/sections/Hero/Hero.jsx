import React from 'react';
import ProfileImage from './ProfileImage';
import SocialButtons from './SocialButtons';
import HeroStats from './HeroStats';

export default function Hero({ profile, setActiveTab }) {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 px-4 sm:px-8">
      {/* Background Pastel Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-blue-100/40 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Bio Info */}
        <div className="text-left max-w-xl space-y-4">
          <div className="text-xs font-bold text-slate-500 tracking-wide uppercase">
            Hi, Im
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 flex-wrap">
            <span>S. Ram</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E6BFF] to-[#9333EA]">
              Kumar
            </span>
            <span className="text-blue-500 text-lg sm:text-xl font-black">®</span>
          </h1>

          <div className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200/70">
            {profile?.role || 'MCA Graduate | Software Developer'}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md">
            {profile?.bio || 'Passionate about building web applications and exploring new technologies. Love to solve real-world problems and contribute to impactful solutions.'}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('projects')}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] hover:from-[#195ada] hover:to-[#7e22ce] shadow-md shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              View My Work <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-400 transition-all cursor-pointer"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right Avatar with Social Links */}
        <div className="flex items-center gap-4">
          <ProfileImage profile={profile} />
          <SocialButtons profile={profile} />
        </div>
      </div>

      {/* Hero 6 Stats Strip */}
      <HeroStats />
    </section>
  );
}