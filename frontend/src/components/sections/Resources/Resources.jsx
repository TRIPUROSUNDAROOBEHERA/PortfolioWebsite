import React from 'react';
import ResourceCard from './ResourceCard';

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Resources & Downloads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResourceCard resource={{ title: 'Django REST Framework Guide' }} />
        <ResourceCard resource={{ title: 'React 19 State Patterns' }} />
      </div>
    </div>
  );
}