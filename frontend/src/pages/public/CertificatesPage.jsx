import React, { useState, useEffect } from 'react';
import certificatesApi from '../../api/certificatesApi';

export default function CertificatesPage({ setActiveTab }) {
  const [certificates, setCertificates] = useState([
    { title: 'React - Complete Guide', issuer: 'Udemy' },
    { title: 'JavaScript Algorithms', issuer: 'freeCodeCamp' },
    { title: 'Python for Data Science', issuer: 'Coursera' },
  ]);

  useEffect(() => {
    let isMounted = true;
    certificatesApi
      .getAll()
      .then((res) => {
        const data = res?.results || res;
        if (isMounted && Array.isArray(data) && data.length) setCertificates(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <h2 className="text-2xl font-extrabold text-slate-900">Certificates</h2>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        <span className="cursor-pointer hover:underline text-blue-600 font-semibold" onClick={() => setActiveTab('home')}>
          Home
        </span>{' '}
        / Certificates
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((c, i) => (
          <div key={i} className="bg-white text-slate-800 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="font-bold text-xs text-slate-900">{c.title || c.name}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{c.issuer || c.organization || 'Verified Credential'}</p>
            </div>
            <i className="fa-solid fa-award text-amber-500 text-xl"></i>
          </div>
        ))}
      </div>
    </div>
  );
}