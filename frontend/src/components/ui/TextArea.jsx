import React from 'react';

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
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
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 resize-none ${
          error ? 'border-rose-400 ring-2 ring-rose-100' : ''
        } ${className}`}
      ></textarea>
      {error && <span className="text-[10.5px] font-bold text-rose-500">{error}</span>}
    </div>
  );
}