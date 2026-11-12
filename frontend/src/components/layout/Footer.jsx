import React from 'react';

export default function Footer({ profile, refreshingSection, refreshKey = 0 }) {
  // WhatsApp Link Resolver:
  // Desktop: Directs to WhatsApp Web login / chat (https://web.whatsapp.com/send?phone=...)
  // Mobile: Directs to WhatsApp app directly (https://wa.me/...)
  const rawWhatsApp = profile?.whatsapp_url || profile?.whatsapp_number || profile?.phone || '+91 98765 43210';
  const isDirectUrl = typeof rawWhatsApp === 'string' && (rawWhatsApp.startsWith('http://') || rawWhatsApp.startsWith('https://'));
  const cleanPhone = !isDirectUrl ? String(rawWhatsApp).replace(/[^0-9]/g, '') : '';
  const isMobileDevice = typeof window !== 'undefined' && typeof navigator !== 'undefined'
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    : false;
  const whatsappUrl = isDirectUrl
    ? rawWhatsApp
    : cleanPhone
      ? (isMobileDevice ? `https://wa.me/${cleanPhone}` : `https://web.whatsapp.com/send?phone=${cleanPhone}`)
      : 'https://web.whatsapp.com/';

  const targetEmail = profile?.email || '24jnf00084@svcn.ac.in';
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent('Portfolio Inquiry - Tripurosundaro Behera')}`;

  const resolveGitHubUrl = () => {
    const raw = profile?.github_url;
    if (!raw || raw === 'https://github.com' || raw.includes('tripurosundarobehera')) {
      return 'https://github.com/TRIPUROSUNDAROOBEHERA';
    }
    return raw;
  };

  const socialLinks = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: profile?.linkedin_url || 'https://linkedin.com',
      hoverBg: 'group-hover:bg-[#005e93]',
      iconClass: 'text-[#0077b5] group-hover:text-white',
      renderIcon: () => <i className="fa-brands fa-linkedin-in text-base sm:text-lg transition-colors"></i>,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: resolveGitHubUrl(),
      hoverBg: 'group-hover:bg-[#24292f]',
      iconClass: 'text-slate-800 group-hover:text-white',
      renderIcon: () => <i className="fa-brands fa-github text-base sm:text-lg transition-colors"></i>,
    },
    {
      id: 'naukri',
      label: 'Naukri',
      href: profile?.naukri_url || 'https://www.naukri.com',
      hoverBg: 'group-hover:bg-[#0284c7]',
      iconClass: 'text-[#00a2e8] group-hover:text-white',
      renderIcon: () => (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-[2.5] transition-colors" viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M8 7c3-3 8-1 9 4s-3 8-7 8" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: whatsappUrl,
      hoverBg: 'group-hover:bg-[#15803d]',
      iconClass: 'text-[#25D366] group-hover:text-white',
      renderIcon: () => <i className="fa-brands fa-whatsapp text-base sm:text-lg transition-colors"></i>,
    },
    {
      id: 'email',
      label: 'Email',
      href: gmailComposeUrl,
      hoverBg: 'group-hover:bg-[#be123c]',
      iconClass: 'text-[#ea4335] group-hover:text-white',
      renderIcon: () => <i className="fa-regular fa-envelope text-base sm:text-lg transition-colors"></i>,
    },
  ];

  const currentYear = new Date().getFullYear();
  const fullName = profile?.full_name || 'Tripurosundaro Behera';

  return (
    <footer
      id="contact"
      className="w-full relative font-['Plus_Jakarta_Sans',sans-serif] select-none py-8 sm:py-10 px-4 overflow-hidden scroll-mt-20 transition-opacity duration-200"
      style={{
        background:
          'linear-gradient(135deg, #0b3bca 0%, #1738c8 25%, #2524a8 50%, #351a8e 75%, #431282 100%)',
        boxShadow: '0 -10px 40px rgba(19, 68, 223, 0.25)',
      }}
    >
      <div
        key={`footer-content-${refreshKey}`}
        className={`max-w-4xl mx-auto flex flex-col items-center justify-center text-center transition-opacity duration-200 ${
          refreshingSection === 'contact' ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {/* ─── Social Media Icons Row: Direct External Links ─── */}
        <div className="flex items-center justify-center gap-3.5 xs:gap-4 sm:gap-7 md:gap-9 flex-wrap animate-heading-fade-slide-up">
          {socialLinks.map((item, idx) => (
            <a
              key={item.id}
              style={{ animationDelay: `${idx * 0.1 + 0.1}s` }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-item animate-card-slide-fade flex flex-col items-center group cursor-pointer select-none"
              title={item.id === 'email' ? `Send Direct Message to ${targetEmail} via Gmail` : item.label}
              aria-label={item.label}
            >
              <div
                className={`contact-social-icon w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white ${item.hoverBg} ${item.iconClass} shadow-md border-2 border-white/85 group-hover:border-transparent flex items-center justify-center transition-colors duration-200`}
              >
                {item.renderIcon()}
              </div>
              <span className="text-[13px] xs:text-[13.5px] sm:text-[13px] font-semibold text-white tracking-wide mt-2 group-hover:text-cyan-200 transition-colors">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* ─── Subtle Horizontal Divider Line ─── */}
        <div className="w-full max-w-md sm:max-w-xl border-t border-white/20 my-4 sm:my-5"></div>

        {/* ─── Centered Copyright Statement ─── */}
        <p className="text-[13px] xs:text-[13.5px] sm:text-[13px] font-normal text-white/90 tracking-normal">
          © {currentYear} {fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
