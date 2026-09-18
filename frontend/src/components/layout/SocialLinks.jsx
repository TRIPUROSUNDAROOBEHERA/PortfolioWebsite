import React from 'react';

export default function SocialLinks({ email = 'sramkumar0101@gmail.com', className = '' }) {
  const socials = [
    {
      name: 'GitHub',
      icon: 'fa-brands fa-github',
      url: 'https://github.com',
      color: 'hover:text-[#181717] hover:border-[#181717]',
    },
    {
      name: 'LinkedIn',
      icon: 'fa-brands fa-linkedin',
      url: 'https://linkedin.com',
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]',
    },
    {
      name: 'Naukri',
      icon: 'fa-solid fa-briefcase',
      url: 'https://www.naukri.com',
      color: 'hover:text-[#FF9E20] hover:border-[#FF9E20]',
    },
    {
      name: 'Email',
      icon: 'fa-solid fa-envelope',
      url: `mailto:${email}`,
      color: 'hover:text-[#EA4335] hover:border-[#EA4335]',
    },
  ];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socials.map((s, idx) => (
        <a
          key={idx}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          title={s.name}
          className={`w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-slate-600 flex items-center justify-center text-sm shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md ${s.color}`}
        >
          <i className={s.icon}></i>
        </a>
      ))}
    </div>
  );
}