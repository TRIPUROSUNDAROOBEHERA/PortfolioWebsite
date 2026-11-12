/*  */import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ResumeModal({ isOpen, onClose, profile }) {
  const [zoom, setZoom] = useState(100);
  const printRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      const isOtherModalOpen =
        document.querySelector('.fixed.inset-0.z-50') ||
        Boolean(sessionStorage.getItem('open_project_id'));
      if (!isOtherModalOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoom(100);

  const handlePrint = () => {
    window.print();
  };

  const fullName = 'Tripurosundaro Behera';
  const headline = 'Python Full-Stack Developer';
  const email = '24jnf00084@svcn.ac.in';
  const phone = '+91- 9014239763';
  const location = 'Bengaluru, Karnataka, India';
  const linkedinUrl = 'https://www.linkedin.com/in/btripurosundaro/';
  const githubUrl = 'https://github.com/TRIPUROSUNDAROOBEHERA';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-fade-in font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ─── Backdrop ─── */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* ─── Dialog Container ─── */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col z-10 overflow-hidden">
        {/* Scoped Gray Scrollbar Styles for Resume Modal */}
        <style>{`
          .resume-gray-scrollbar::-webkit-scrollbar {
            width: 7px;
            height: 7px;
          }
          .resume-gray-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .resume-gray-scrollbar::-webkit-scrollbar-thumb {
            background: #94a3b8;
            background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 50%, #64748b 100%);
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.4);
          }
          .resume-gray-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #64748b;
            background: linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%);
          }
          .resume-gray-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #94a3b8 transparent;
          }
        `}</style>
        
        {/* ─── Top Control Bar (Exact Match to Reference Image) ─── */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-200/90 bg-white flex items-center justify-between gap-3 flex-shrink-0">
          
          {/* Left: Document Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-indigo-600 flex items-center justify-center border border-purple-100/90 shadow-2xs flex-shrink-0">
              <i className="fa-regular fa-file-lines text-base sm:text-lg"></i>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-[15px] font-extrabold text-slate-900 tracking-tight truncate">
                  {fullName} — Official Resume
                </h3>
                <span className="text-[9.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded tracking-wider uppercase inline-flex items-center gap-1 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  VERIFIED PDF
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                {headline}
              </p>
            </div>
          </div>

          {/* Right: Actions (Zoom, Print, Download, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Zoom Controls Pill */}
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-600 text-xs">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:text-blue-600 cursor-pointer transition-colors"
                title="Zoom Out"
              >
                <i className="fa-solid fa-magnifying-glass-minus text-[11px]"></i>
              </button>
              <span className="font-bold text-[11px] min-w-[36px] text-center select-none">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:text-blue-600 cursor-pointer transition-colors"
                title="Zoom In"
              >
                <i className="fa-solid fa-magnifying-glass-plus text-[11px]"></i>
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 hover:text-blue-600 cursor-pointer transition-colors border-l border-slate-200 pl-1.5 ml-0.5"
                title="Reset Zoom"
              >
                <i className="fa-solid fa-rotate-right text-[10px]"></i>
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Print Resume Document"
            >
              <i className="fa-solid fa-print text-slate-500 text-xs"></i>
              <span>Print</span>
            </button>

            {/* Download PDF Button */}
            <a
              href={profile?.resume || '/resume.pdf'}
              download="Tripurosundaro_Behera_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Download PDF File"
            >
              <i className="fa-solid fa-download text-[11px]"></i>
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Resume Viewer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

        </div>

        {/* ─── Center: Scrollable Resume Canvas ─── */}
        <div className="flex-1 overflow-y-auto bg-slate-100/70 p-3 sm:p-6 md:p-8 flex justify-center items-start resume-gray-scrollbar custom-slim-scrollbar">
          
          {/* Printable White Document Sheet (A4 Sheet Paper) */}
          <div
            ref={printRef}
            id="printable-resume"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="bg-white shadow-xl border border-slate-200/90 rounded-sm w-full max-w-[820px] p-6 sm:p-10 md:p-12 text-slate-800 transition-transform duration-150 select-text font-sans mb-8"
          >
            {/* Header: Name & Contact Details */}
            <div className="border-b border-slate-300 pb-3 mb-4 text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                {fullName}
              </h1>
              <p className="text-sm sm:text-base font-bold text-slate-900 tracking-wide mt-0.5">
                {headline}
              </p>
              <div className="text-[11px] sm:text-[11.5px] text-slate-700 mt-2 font-normal space-y-0.5">
                <p>
                  {location} | {phone} | {email}
                </p>
                <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group text-slate-700 hover:text-blue-600 cursor-pointer"
                    title="Open LinkedIn Profile in new tab"
                  >
                    <span>LinkedIn:</span>
                    <span className="text-blue-600 group-hover:underline font-medium">
                      linkedin.com/in/btripurosundaro/
                    </span>
                  </a>
                  <span className="text-slate-400">|</span>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group text-slate-700 hover:text-blue-600 cursor-pointer"
                    title="Open GitHub Profile in new tab"
                  >
                    <span>GitHub:</span>
                    <span className="text-blue-600 group-hover:underline font-medium">
                      github.com/TRIPUROSUNDAROOBEHERA
                    </span>
                  </a>
                  <span className="text-slate-400">|</span>
                  <a
                    href="https://tripurosundaro.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group text-slate-700 hover:text-blue-600 cursor-pointer"
                    title="Open Portfolio Website in new tab"
                  >
                    <span>Portfolio:</span>
                    <span className="text-blue-600 group-hover:underline font-medium">
                      tripurosundaro.me
                    </span>
                  </a>
                </p>
              </div>
            </div>

            {/* Section: Professional Summary */}
            <div className="mb-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-slate-800 text-justify font-normal">
                I am an MCA postgraduate with a (CGPA of 8.47/10) and an aspiring Python Full-Stack Developer. I have practical experience through academic and personal projects using Python, Django, REST APIs, React.js, JavaScript, and SQL. I enjoy developing responsive web applications, solving problems, and learning new technologies. I am looking for an entry-level opportunity to improve my skills and contribute to real-world software development.
              </p>
            </div>

            {/* Section: Technical Skills */}
            <div className="mb-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                TECHNICAL SKILLS
              </h2>
              <div className="text-[12px] sm:text-[12.5px] space-y-1 text-slate-800">
                <p>
                  <strong className="text-slate-900 font-bold">Programming:</strong> Python, JavaScript, SQL
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Frontend:</strong> HTML, CSS, React.js, Tailwind CSS
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Backend:</strong> Django, Django REST Framework
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Database:</strong> MySQL, SQLite
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Mobile Development:</strong> Flutter, Dart
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Tools:</strong> Git, GitHub, VS Code, Android Studio, Docker
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Core Skills:</strong> OOP, REST APIs, CRUD Operations, Problem Solving
                </p>
              </div>
            </div>

            {/* Section: Projects (Exact match to resume0101.pdf) */}
            <div className="mb-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                PROJECTS
              </h2>
              <div className="space-y-1.5 text-[12px] sm:text-[12.5px] text-slate-900">
                <p className="font-bold">
                  TripGen – Travel Planning Web Application
                </p>
                <p className="font-bold">
                  Intrusion Detection System (IDS) – Machine Learning-based Cyber Attack Detection Web Application.
                </p>
                <p className="font-bold">
                  English Master Pro – Flutter Mobile Application
                </p>
              </div>
            </div>

            {/* Section: Education (Exact match to resume0101.pdf) */}
            <div className="mb-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="space-y-3 text-[12px] sm:text-[12.5px]">
                <div>
                  <p className="font-bold text-slate-900">
                    Master of Computer Applications (MCA)
                  </p>
                  <p className="text-slate-800">
                    Sree Venkateswara College of Engineering, Nellore, Andhra Pradesh
                  </p>
                  <p className="text-slate-600">
                    Jawaharlal Nehru Technological University, Anantapur (JNTUA) | 2024–2026 | CGPA: 8.47/10
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    Bachelor of Science (B.Sc.) – MPE
                  </p>
                  <p className="text-slate-800">
                    Government Degree College for Men, Srikakulam, Andhra Pradesh
                  </p>
                  <p className="text-slate-600">
                    Dr. B. R. Ambedkar University | 2018–2021 | CGPA: 7.08/10
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Certifications (Exact match to resume0101.pdf) */}
            <div>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
                CERTIFICATIONS
              </h2>
              <div className="space-y-1 text-[12px] sm:text-[12.5px] text-slate-800">
                <p>
                  <strong className="font-bold text-slate-900">Python Full Stack Developer Virtual Internship</strong> — EduSkills Academy / AICTE | Oct–Dec 2025
                </p>
                <p>
                  <strong className="font-bold text-slate-900">Programming with Python 3.X</strong> — Simplilearn | 19 Dec 2025
                </p>
                <p>
                  <strong className="font-bold text-slate-900">Introduction to Prompt Engineering</strong> — Simplilearn | 19 Dec 2025
                </p>
                <p>
                  <strong className="font-bold text-slate-900">Fortinet Certified Associate in Cybersecurity</strong> — Fortinet | 14 Sep 2025 (Valid until Sep 2027)
                </p>
                <p>
                  <strong className="font-bold text-slate-900">Fortinet Certified Fundamentals in Cybersecurity</strong> — Fortinet | 14 Sep 2025 (Valid until Sep 2027)
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ─── Bottom Footer Bar (Exact Match to Reference Image) ─── */}
        <div className="px-4 sm:px-6 py-2.5 bg-white border-t border-slate-200/90 flex items-center justify-between text-xs text-slate-600 flex-shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
            <span>Document: <strong className="font-mono text-slate-800">Tripurosundaro_Behera_Resume.pdf</strong></span>
          </div>
          <a
            href={profile?.resume || '/resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Vector PDF</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

      </div>
    </div>,
    document.body
  );
}
