import React from 'react';

export default function CourseCard({ setActiveTab }) {
  const courses = [
    'Data Structures & Algorithms',
    'Web Development Bootcamp',
    'Database Management Systems'
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-book-open text-blue-600"></i>
          <span>Courses Completed</span>
        </div>
        <button onClick={() => setActiveTab('courses')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2">
        {courses.map((c, idx) => (
          <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
            <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}