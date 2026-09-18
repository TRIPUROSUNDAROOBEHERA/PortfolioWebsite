import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon = null
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer rounded-xl disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs gap-2',
    lg: 'px-6 py-3 text-sm gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] text-white shadow-md shadow-purple-500/25 hover:from-[#195ada] hover:to-[#7e22ce]',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 shadow-sm',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900',
    ghost: 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      {icon && <span className="text-current">{icon}</span>}
      {children}
    </button>
  );
}