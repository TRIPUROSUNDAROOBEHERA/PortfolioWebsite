import React from 'react';
import PublicationsCard from './PublicationsCard';

export default function Publications() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Publications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PublicationsCard publication={{ title: 'Optimizing RESTful Microservices', publisher: 'International Journal of CS' }} />
      </div>
    </div>
  );
}