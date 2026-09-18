import React from 'react';

export default function AboutCard({ setActiveTab, profile }) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 text-xs font-black text-slate-900 mb-3">
          <i className="fa-regular fa-user text-blue-600"></i>
          <span>About Me</span>
        </div>
        <p className="text-[11.5px] text-slate-600 font-medium leading-relaxed">
          {profile?.bio || 'I am a motivated MCA graduate with a strong foundation in computer applications and a passion for software development. I enjoy building responsive, user-friendly web applications.'}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('about')}
          className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[10.5px] hover:bg-blue-700 transition-all cursor-pointer"
        >
          Read More
        </button>
        <div className="w-9 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 text-xs border border-slate-200">
          <i className="fa-solid fa-laptop-code text-blue-600"></i>
        </div>
      </div>
    </div>
  );
}