import React from 'react';

export default function SectionHeading({
  title,
  subtitle,
  icon,
  breadcrumb = null,
}) {
  return (
    <div className="mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
        {icon && <span className="text-blue-600 text-xl">{icon}</span>}
        <span>{title}</span>
      </h2>
      {subtitle && (
        <p className="text-xs font-semibold text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
      {breadcrumb && (
        <div className="text-xs font-semibold text-slate-500 mt-1.5">
          {breadcrumb}
        </div>
      )}
    </div>
  );
}