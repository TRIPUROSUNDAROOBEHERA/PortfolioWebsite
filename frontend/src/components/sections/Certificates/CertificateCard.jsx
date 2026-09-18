import React from 'react';

export default function CertificateCard({ setActiveTab }) {
  const certs = [
    { title: 'React - Complete Guide', issuer: 'Udemy | 2024' },
    { title: 'Python for Data Science', issuer: 'Coursera | 2024' }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <i className="fa-solid fa-award text-blue-600"></i>
          <span>Certificates</span>
        </div>
        <button onClick={() => setActiveTab('certificates')} className="text-[10.5px] font-bold text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2">
        {certs.map((c, idx) => (
          <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{c.title}</div>
              <div className="text-[9.5px] text-slate-500">{c.issuer}</div>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
          </div>
        ))}
      </div>
    </div>
  );
}