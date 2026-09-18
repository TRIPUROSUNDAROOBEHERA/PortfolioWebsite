import React from 'react';

export default function SectionHeading({ badge, title, subtitle, centered = false }) {
  return (
    <div className={`mb-6 space-y-1 font-['Plus_Jakarta_Sans',sans-serif] ${centered ? 'text-center' : 'text-left'}`}>
      {badge && (
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[10px] tracking-wider uppercase border border-blue-100 mb-1">
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-xs text-slate-500 font-medium max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}