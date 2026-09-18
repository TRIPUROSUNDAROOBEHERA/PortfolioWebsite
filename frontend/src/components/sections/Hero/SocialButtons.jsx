import React from 'react';

export default function SocialButtons({ profile }) {
  const socials = [
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com', color: 'text-[#0077b5] hover:border-[#0077b5]' },
    { name: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com', color: 'text-slate-900 hover:border-slate-900' },
    { name: 'Twitter', icon: 'fa-brands fa-x-twitter', url: 'https://twitter.com', color: 'text-sky-500 hover:border-sky-500' },
    { name: 'Email', icon: 'fa-solid fa-envelope', url: `mailto:${profile?.email || 'sramkumar0101@gmail.com'}`, color: 'text-rose-500 hover:border-rose-500' },
    { name: 'Download CV', icon: 'fa-solid fa-download', url: '/resume.pdf', color: 'text-purple-600 hover:border-purple-600', download: true }
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {socials.map((s, idx) => (
        <a
          key={idx}
          href={s.url}
          target={s.download ? '_self' : '_blank'}
          rel="noreferrer"
          download={s.download || undefined}
          title={s.name}
          className={`w-7 h-7 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-[11px] shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md ${s.color}`}
        >
          <i className={s.icon}></i>
        </a>
      ))}
    </div>
  );
}