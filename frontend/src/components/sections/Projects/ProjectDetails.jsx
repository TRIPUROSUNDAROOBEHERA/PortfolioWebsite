import React from 'react';

export default function ProjectDetails({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
        <h3 className="font-extrabold text-base text-slate-900 mb-2">{project.title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{project.desc || project.description}</p>
      </div>
    </div>
  );
}