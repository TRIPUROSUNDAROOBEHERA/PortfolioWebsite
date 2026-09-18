import React from 'react';

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = ''
}) {
  const variantStyles = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200/80',
    secondary: 'bg-purple-50 text-purple-700 border-purple-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/80',
  };

  const dotColors = {
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500',
    success: 'bg-emerald-500 animate-pulse',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    neutral: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'text-[9.5px] px-2 py-0.5 font-bold',
    md: 'text-[11px] px-2.5 py-0.5 font-bold',
    lg: 'text-xs px-3 py-1 font-extrabold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all ${
        variantStyles[variant] || variantStyles.primary
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.primary}`} />}
      {children}
    </span>
  );
}