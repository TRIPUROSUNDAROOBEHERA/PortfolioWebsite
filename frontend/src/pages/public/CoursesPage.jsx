import React, { useState, useEffect } from 'react';
import coursesApi from '../../api/coursesApi';

export default function CoursesPage({ setActiveTab }) {
  const [courses, setCourses] = useState(['Data Structures & Algorithms', 'Full Stack Web Development Bootcamp', 'Database Management Systems (NPTEL)']);

  useEffect(() => {
    let isMounted = true;
    coursesApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setCourses(data.map((c) => c.name || c.title || c));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900">Courses Completed</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
          Home
        </span>{' '}
        / Courses
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((c, i) => (
          <div key={i} className="bg-white text-slate-800 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <i className="fa-solid fa-circle-check text-emerald-500 text-xl"></i>
            <span className="font-bold text-xs text-slate-900">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}