import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
    { id: 'about', label: 'About Me', icon: 'fa-solid fa-user' },
    { id: 'experience', label: 'Experience', icon: 'fa-solid fa-briefcase' },
    { id: 'education', label: 'Education', icon: 'fa-solid fa-graduation-cap' },
    { id: 'skills', label: 'Skills', icon: 'fa-solid fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fa-solid fa-laptop-code' },
    { id: 'certificates', label: 'Certificates', icon: 'fa-solid fa-award' },
    { id: 'achievements', label: 'Achievements', icon: 'fa-solid fa-trophy' },
    { id: 'courses', label: 'Courses', icon: 'fa-solid fa-book-open' },
    { id: 'blog', label: 'Blog', icon: 'fa-solid fa-newspaper' },
    { id: 'contact', label: 'Contact', icon: 'fa-solid fa-envelope' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative flex flex-col w-72 max-w-[80vw] bg-white border-r border-slate-200 shadow-2xl p-5 z-10 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <span className="text-sm font-black text-slate-900 uppercase tracking-wider">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <i className={`${item.icon} text-sm w-4 text-center`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}