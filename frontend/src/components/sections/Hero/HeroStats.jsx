import React from 'react';

export default function HeroStats() {
  const stats = [
    { label: 'Years of Learning', value: '2+', icon: 'fa-solid fa-graduation-cap', color: 'text-blue-600 bg-blue-50' },
    { label: 'Projects Completed', value: '10+', icon: 'fa-solid fa-code', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Certificates Earned', value: '25+', icon: 'fa-solid fa-award', color: 'text-amber-600 bg-amber-50' },
    { label: 'Courses Completed', value: '5+', icon: 'fa-solid fa-book-open', color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Hours of Coding', value: '1000+', icon: 'fa-regular fa-clock', color: 'text-pink-600 bg-pink-50' },
    { label: 'Dedication', value: '100%', icon: 'fa-solid fa-heart', color: 'text-rose-600 bg-rose-50' }
  ];

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-6">
      {stats.map((item, idx) => (
        <div key={idx} className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${item.color}`}>
            <i className={item.icon}></i>
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-xs leading-none">{item.value}</div>
            <div className="text-[9.5px] font-semibold text-slate-500 mt-0.5">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}