import React from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error = '',
  icon = null,
  className = '',
  disabled = false,
  name,
}) {
  return (
    <div className="space-y-1.5 text-left font-['Plus_Jakarta_Sans',sans-serif]">
      {label && (
        <label className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-slate-400 text-xs pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-50 ${
            icon ? 'pl-9 pr-4 py-2.5' : 'px-4 py-2.5'
          } ${error ? 'border-rose-400 ring-2 ring-rose-100' : ''} ${className}`}
        />
      </div>
      {error && <span className="text-[10.5px] font-bold text-rose-500">{error}</span>}
    </div>
  );
}