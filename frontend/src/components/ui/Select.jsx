import React from 'react';

export default function Select({
  label,
  options = [],
  value,
  onChange,
  required = false,
  error = '',
  className = '',
  name,
}) {
  return (
    <div className="space-y-1.5 text-left font-['Plus_Jakarta_Sans',sans-serif]">
      {label && (
        <label className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer ${
            error ? 'border-rose-400 ring-2 ring-rose-100' : ''
          } ${className}`}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
          <i className="fa-solid fa-chevron-down text-[10px]"></i>
        </div>
      </div>
      {error && <span className="text-[10.5px] font-bold text-rose-500">{error}</span>}
    </div>
  );
}