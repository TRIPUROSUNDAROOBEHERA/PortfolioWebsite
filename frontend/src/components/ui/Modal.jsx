import React, { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  headerAction = null,
}) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div
        className={`relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full ${maxWidth} p-6 z-10 font-['Plus_Jakarta_Sans',sans-serif] space-y-4`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="min-w-0 pr-2">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">{title}</h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {headerAction}
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-600">{children}</div>
      </div>
    </div>
  );
}