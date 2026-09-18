import React from 'react';

export default function About({ profile, setActiveTab }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900">About Me</h2>
        <p className="text-xs text-slate-500 mt-1">
          <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>Home</span> / About
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm text-center">
          <div className="p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-blue-600 to-indigo-500 mb-4 shadow-md">
              <img src={profile?.avatar} alt={profile?.full_name} className="w-full h-full object-cover rounded-full border-2 border-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{profile?.full_name}</h3>
            <p className="text-xs text-blue-600 font-semibold">{profile?.role}</p>
          </div>

          <div className="bg-slate-50 p-6 text-left border-t border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Degree:</span> <span className="font-bold text-slate-900">MCA Graduate</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Email:</span> <span className="font-bold text-blue-600">{profile?.email}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Location:</span> <span className="font-bold text-slate-900">{profile?.location}</span></div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white text-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900">Who I Am</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{profile?.bio}</p>
        </div>
      </div>
    </div>
  );
}