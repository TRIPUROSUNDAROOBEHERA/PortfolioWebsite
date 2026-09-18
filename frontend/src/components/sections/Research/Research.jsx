import React from 'react';
import ResearchCard from './ResearchCard';

export default function Research() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Research Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResearchCard item={{ title: 'Database Indexing Optimization', summary: 'Analysis of B-Trees in MySQL architectures.' }} />
      </div>
    </div>
  );
}