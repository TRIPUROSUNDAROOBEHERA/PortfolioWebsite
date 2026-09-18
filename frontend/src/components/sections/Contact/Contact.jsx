import React from 'react';
import ContactCard from './ContactCard';

export default function Contact({ setActiveTab, profile }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]" id="contact">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Contact & Transmission Terminal</h2>
      <div className="max-w-md mx-auto">
        <ContactCard />
      </div>
    </section>
  );
}