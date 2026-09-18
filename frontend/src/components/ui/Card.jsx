import React from 'react';

export default function Card({
  children,
  className = '',
  hover = true,
  onClick,
  header = null,
  footer = null,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-200 overflow-hidden ${
        hover ? 'hover:shadow-md hover:border-slate-300' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between font-bold text-xs text-slate-900">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 text-xs">
          {footer}
        </div>
      )}
    </div>
  );
}