import React, { useState, useEffect } from 'react';
import blogApi from '../../api/blogApi';

export default function BlogPage({ setActiveTab }) {
  const [blogs, setBlogs] = useState([
    { title: 'Building Scalable Django Backends', description: 'Best practices for structuring Django REST APIs with MySQL/PostgreSQL.' },
    { title: 'How I Built My Portfolio CMS', description: 'Architecting a full stack application with real-time analytics.' },
  ]);

  useEffect(() => {
    let isMounted = true;
    blogApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setBlogs(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900">Blog & Articles</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
          Home
        </span>{' '}
        / Blog
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((b, idx) => (
          <div key={idx} className="bg-white text-slate-800 p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900">{b.title}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">{b.description || b.content || b.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}