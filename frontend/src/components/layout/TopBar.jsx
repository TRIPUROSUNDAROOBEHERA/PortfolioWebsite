import React from 'react';

export default function TopBar({ systemStatus }) {
  return (
    <div className="bg-[#0e1738] text-slate-300 text-[11px] px-4 sm:px-8 py-1.5 border-b border-slate-800 font-mono flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>System: {systemStatus?.server || 'Online'}</span>
        </span>
        <span className="hidden sm:inline-block text-slate-600">•</span>
        <span className="hidden sm:inline-block text-slate-400">
          Database: {systemStatus?.db || 'Connected (MySQL)'}
        </span>
      </div>
      <div className="flex items-center gap-3 text-slate-400">
        <span>Latency: {systemStatus?.apiLatency || '24ms'}</span>
        <span>•</span>
        <span className="text-blue-400 font-semibold">{systemStatus?.version || 'Django 5.1'}</span>
      </div>
    </div>
  );
}