import React from 'react';

export default function BlogCard({ setActiveTab }) {
  const blogs = [
    { title: 'Building Scalable Django Backends', date: 'May 10, 2024 • 5 min read' },
    { title: 'How I Built My Portfolio CMS', date: 'May 15, 2024 • 3 min read' }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-newspaper text-pink-600"></i>
          <span>Latest Blog Posts</span>
        </div>
        <button onClick={() => setActiveTab('blog')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2.5">
        {blogs.map((b, idx) => (
          <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="font-extrabold text-slate-900 text-xs">{b.title}</h4>
            <span className="text-[9.5px] text-slate-400 font-medium">{b.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}