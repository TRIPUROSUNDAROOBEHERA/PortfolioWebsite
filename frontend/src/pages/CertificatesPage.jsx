import React, { useState, useEffect } from 'react';
import certificatesApi from '../api/certificatesApi';
import Modal from '../components/ui/Modal';
import CertificatePreviewModal from '../components/ui/CertificatePreviewModal';

const CORE_CERTIFICATES = [
  {
    id: 1,
    title: 'Python Full Stack Developer Virtual Internship',
    issuer: 'EduSkills Academy & AICTE',
    issue_date: 'Dec 2025',
    credential_id: 'c85f1f38b6e67487a6e5e2667c7179b8',
    image: '/cert-python-fullstack.jpg',
    pdf: '/certificates/Python_Full_Stack_Developer_Certificate.pdf',
    desc: 'Completed 10-week intensive Python full-stack engineering virtual internship supported by AICTE, Ministry of Education, and EduSkills with Grade O (Outstanding).',
  },
  {
    id: 2,
    title: 'Fortinet Certified Associate in Cybersecurity',
    issuer: 'Fortinet Training Institute',
    issue_date: 'Sept 2025',
    credential_id: '3451334320TB',
    image: '/cert-fortinet-associate.jpg',
    pdf: '/certificates/Fortinet_Certified_Associate_in_Cybersecurity.pdf',
    desc: 'Certified technical cybersecurity competence validating real-world operations in network security architecture, threat intelligence, and enterprise defense workflows.',
  },
  {
    id: 3,
    title: 'Fortinet Certified Fundamentals in Cybersecurity',
    issuer: 'Fortinet Training Institute',
    issue_date: 'Sept 2025',
    credential_id: '5435469190TB',
    image: '/cert-fortinet-fundamentals.jpg',
    pdf: '/certificates/Fortinet_Certified_Fundamentals_in_Cybersecurity.pdf',
    desc: 'Comprehensive mastery of the foundational cybersecurity threat landscape, core security principles, attack vectors, and enterprise data protection strategies.',
  },
  {
    id: 4,
    title: 'Programming with Python 3.X',
    issuer: 'Simplilearn SkillUp',
    issue_date: 'Dec 2025',
    credential_id: '9609807',
    image: '/cert-simplilearn-python.jpg',
    pdf: '/certificates/Programming_with_Python_3.x.pdf',
    desc: 'Validated core proficiency in Python 3.x programming, data structures, object-oriented design, exception handling, and backend automation scripting.',
  },
  {
    id: 5,
    title: 'Introduction to Prompt Engineering',
    issuer: 'Simplilearn SkillUp',
    issue_date: 'Dec 2025',
    credential_id: '9610480',
    image: '/cert-prompt-engineering.jpg',
    pdf: '/certificates/Introduction_to_Prompt_Engineering.pdf',
    desc: 'Mastered generative AI prompt architecture, LLM context structuring, few-shot prompting patterns, and efficient AI-driven developer productivity workflows.',
  },
];

export default function CertificatesPage({ setActiveTab, initialData = [] }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [certificates, setCertificates] = useState(CORE_CERTIFICATES);

  useEffect(() => {
    let isMounted = true;
    certificatesApi
      .getAll()
      .then((res) => {
        const data = res?.data?.results || res?.results || res?.data || res;
        if (isMounted && Array.isArray(data) && data.length) {
          const merged = CORE_CERTIFICATES.map((core) => {
            const match = data.find((c) => {
              if (!c.title) return false;
              const cTitle = c.title.toLowerCase().trim();
              const coreTitle = core.title.toLowerCase().trim();
              if (cTitle === coreTitle) return true;
              if (coreTitle.includes('associate') && cTitle.includes('associate')) return true;
              if (coreTitle.includes('fundamentals') && cTitle.includes('fundamentals')) return true;
              if (coreTitle.includes('virtual internship') && cTitle.includes('virtual internship')) return true;
              if (coreTitle.includes('python 3') && cTitle.includes('python 3')) return true;
              if (coreTitle.includes('prompt') && cTitle.includes('prompt')) return true;
              return false;
            });
            return {
              ...core,
              ...(match || {}),
              id: core.id,
              title: core.title,
              issuer: core.issuer,
              issue_date: core.issue_date,
              credential_id: core.credential_id,
              image: core.image,
              pdf: core.pdf,
              desc: core.desc,
            };
          });
          setCertificates(merged);
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
            <i className="fa-solid fa-award text-lg"></i>
          </div>
          <span>Verified Certifications & Credentials</span>
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          <span
            className="cursor-pointer hover:underline text-blue-600 font-semibold"
            onClick={() => setActiveTab('home')}
          >
            Home
          </span>{' '}
          / Certificates
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => {
          const cardDelay = `${(idx % 3) * 0.18 + 0.08}s`;
          const textDelay = `${(idx % 3) * 0.18 + 0.18}s`;
          return (
            <div
              key={cert.id || idx}
              style={{ animationDelay: cardDelay }}
              onClick={() => setSelectedCert(cert)}
              className="cert-card-hover animate-cert-card-up animate-card-slide-fade bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-200 flex flex-col justify-between overflow-hidden group/card cursor-pointer edu-text-clarity"
            >
              <div>
                {/* Certificate Image (Total Image) */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-slate-50 relative border-b border-slate-200/80 flex items-center justify-center p-2">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = cert.image;
                    }}
                  />
                </div>

                {/* Under the total image: All Text Content */}
                <div
                  style={{ animationDelay: textDelay }}
                  className="p-6 pb-2 animate-cert-text-in edu-text-clarity"
                >
                  <h4 className="text-[16.5px] xs:text-[17.5px] sm:text-base font-extrabold text-slate-900 group-hover/card:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h4>

                  {/* Two Lines Paragraph Content */}
                  <p className="text-[13px] xs:text-[13.5px] sm:text-xs text-slate-600 leading-relaxed mt-2.5 line-clamp-2">
                    {cert.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs xs:text-[12.5px] sm:text-[11px] font-semibold text-slate-400 truncate max-w-[150px]">
                    {cert.issuer}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] xs:text-[13.5px] sm:text-xs font-bold text-amber-600 group-hover/card:text-amber-700">
                    <span>View Certificate</span>
                    <span className="transition-transform duration-200 group-hover/card:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Preview Modal with Rounded Zoom In/Out Controller */}
      <CertificatePreviewModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </div>
  );
}