import React from 'react';

export default function BlogDetailsPage({ blog, setActiveTab }) {
  const currentBlog = blog || {
    title: 'Building Scalable Django Backends with REST Framework',
    date: 'May 20, 2026',
    readTime: '5 min read',
    author: 'S. Ram Kumar',
    content: `When building enterprise-grade full stack applications, structuring your Django backend effectively is crucial. By leveraging Django REST Framework (DRF), custom authentication token handlers, and optimized database queries, you ensure low latency and high availability.
    
Key areas to prioritize include database index design in MySQL/PostgreSQL, query serialization profiling, and setting up secure CORS/JWT headers for frontend consumption.`,
    tags: ['Django', 'Python', 'REST API', 'MySQL'],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('blog')}
          className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1.5 cursor-pointer mb-3"
        >
          <i className="fa-solid fa-arrow-left text-[10px]"></i> Back to Articles
        </button>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{currentBlog.title}</h2>
        <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mt-2">
          <span>{currentBlog.author}</span>
          <span>•</span>
          <span>{currentBlog.date}</span>
          <span>•</span>
          <span className="text-blue-600 font-bold">{currentBlog.readTime}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {currentBlog.content}
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
          {currentBlog.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}