import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

export default function CertificatePreviewModal({
  isOpen,
  onClose,
  certificate,
}) {
  const [zoom, setZoom] = useState(100);
  const [isPanning, setIsPanning] = useState(false);
  const scrollContainerRef = useRef(null);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  // Reset zoom back to 100% whenever a new certificate is opened or modal toggles
  useEffect(() => {
    setZoom(100);
    setIsPanning(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [certificate, isOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleReset = () => {
    setZoom(100);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Mouse pan handlers when zoomed in (> 100%)
  const handleMouseDown = (e) => {
    if (zoom <= 100 || !scrollContainerRef.current) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollContainerRef.current.scrollLeft,
      scrollTop: scrollContainerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!isPanning || !scrollContainerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    scrollContainerRef.current.scrollLeft = panStartRef.current.scrollLeft - dx;
    scrollContainerRef.current.scrollTop = panStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => setIsPanning(false);

  if (!certificate) return null;

  // Header Action: Exact 3rd image type rounded pill widget
  const zoomControls = (
    <div
      className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/90 bg-[#f8fafc] text-slate-700 shadow-xs select-none"
      data-testid="certificate-zoom-controller"
    >
      {/* Zoom Out Button */}
      <button
        type="button"
        onClick={handleZoomOut}
        disabled={zoom <= 50}
        className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-slate-200/60"
        title="Zoom Out (50% min)"
        aria-label="Zoom Out"
        data-testid="cert-zoom-out-btn"
      >
        <i className="fa-solid fa-magnifying-glass-minus text-xs sm:text-[13px]"></i>
      </button>

      {/* Current Zoom Percentage */}
      <span
        data-testid="cert-zoom-level"
        className="font-bold text-xs sm:text-[13px] text-slate-700 tracking-tight min-w-[38px] text-center"
      >
        {zoom}%
      </span>

      {/* Zoom In Button */}
      <button
        type="button"
        onClick={handleZoomIn}
        disabled={zoom >= 250}
        className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-slate-200/60"
        title="Zoom In (250% max)"
        aria-label="Zoom In"
        data-testid="cert-zoom-in-btn"
      >
        <i className="fa-solid fa-magnifying-glass-plus text-xs sm:text-[13px]"></i>
      </button>

      {/* Divider */}
      <span className="w-px h-4 bg-slate-200/90 inline-block mx-0.5"></span>

      {/* Reset Button */}
      <button
        type="button"
        onClick={handleReset}
        className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-slate-200/60"
        title="Reset Zoom to 100%"
        aria-label="Reset Zoom"
        data-testid="cert-zoom-reset-btn"
      >
        <i className="fa-solid fa-rotate-right text-xs sm:text-[13px]"></i>
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={certificate.title || 'Certificate Preview'}
      maxWidth="max-w-4xl"
      headerAction={zoomControls}
    >
      <div className="space-y-4">
        {/* Certificate Zoomable Viewer Box */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`overflow-auto bg-transparent sm:bg-slate-950 border-0 sm:border sm:border-slate-800 shadow-none sm:shadow-inner p-0 sm:p-5 flex items-center justify-center max-h-[70vh] sm:max-h-[74vh] min-h-0 sm:min-h-[380px] custom-slim-scrollbar select-none relative rounded-xl sm:rounded-2xl ${
            zoom > 100 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
          }`}
        >
          <div
            className="transition-all duration-200 ease-out flex items-center justify-center mx-auto shrink-0 w-full sm:w-auto"
            style={{
              width: `${zoom}%`,
              maxWidth: zoom <= 100 ? '100%' : 'none',
            }}
          >
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-auto h-auto object-contain mx-auto rounded-xl sm:rounded-lg border border-slate-200/90 sm:border-0 shadow-sm sm:shadow-2xl transition-all duration-200 pointer-events-none"
              style={{
                maxHeight: `${68 * (zoom / 100)}vh`,
                maxWidth: `${100 * (zoom / 100)}%`,
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = certificate.image;
              }}
            />
          </div>
        </div>

        {/* Certificate Metadata & Actions Footer */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-800">
              {certificate.issuer} • {certificate.issue_date}
              {certificate.credential_id && (
                <span className="ml-2 text-slate-500 font-mono text-[11px]">
                  (ID: {certificate.credential_id})
                </span>
              )}
            </p>
            <p className="text-xs text-slate-600 mt-2 font-medium">{certificate.desc}</p>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-end sm:justify-start gap-2 flex-shrink-0">
            {certificate.pdf && (
              <a
                href={certificate.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>View PDF</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
