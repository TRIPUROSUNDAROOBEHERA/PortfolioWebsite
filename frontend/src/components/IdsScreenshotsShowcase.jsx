import React, { useState, useEffect, useRef } from 'react';
import {
  IDS_GALLERY_CATEGORIES,
  IDS_SCREENSHOTS
} from '../data/idsGalleryData';

export default function IdsScreenshotsShowcase({ selectedModuleFilter = 'all', onFilterChange }) {
  const [activeCategory, setActiveCategory] = useState(selectedModuleFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null); // index in filtered list
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'cards' | 'hero'
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const imageContainerRef = useRef(null);
  const thumbsNavRef = useRef(null);

  // Sync external filter changes
  useEffect(() => {
    if (selectedModuleFilter) {
      setActiveCategory(selectedModuleFilter);
    }
  }, [selectedModuleFilter]);

  // Filter screenshots based on active category & search query
  const filteredScreenshots = IDS_SCREENSHOTS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' ||
      item.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.features && item.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  // Keep featured index within bounds
  useEffect(() => {
    if (featuredIndex >= filteredScreenshots.length) {
      setFeaturedIndex(0);
    }
  }, [filteredScreenshots.length, featuredIndex]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleZoomReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredScreenshots.length]);

  // Auto scroll thumbnail into view in lightbox
  useEffect(() => {
    if (lightboxIndex !== null && thumbsNavRef.current) {
      const activeThumb = thumbsNavRef.current.children[lightboxIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    const isModalOpen = document.body.classList.contains('modal-open') || Boolean(sessionStorage.getItem('open_project_id'));
    if (!isModalOpen) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredScreenshots.length);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 3.0));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoom100Percent = () => {
    setZoomLevel(1.5);
    setPanOffset({ x: 0, y: 0 });
  };

  // Drag & Pan handlers for zoomed image
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredScreenshots[lightboxIndex] : null;

  return (
    <div id="ids-live-screenshots-section" className="space-y-6 pt-2 select-none">
      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/90 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200/90 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            19 Full-Clarity Live Screenshots
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <i className="fa-solid fa-images text-cyan-600"></i> 05. Live System Screenshots & Application Walkthrough
          </h3>
          <p className="text-xs sm:text-[13px] sm:text-sm text-slate-600 leading-relaxed font-normal max-w-3xl">
            Complete high-resolution visual evidence of the Intrusion Detection System running in Django with real-time NSL-KDD machine learning inference. Click any screenshot to open in <strong className="text-slate-800 font-semibold">100% Full-Clarity HD Lightbox Viewer</strong> with interactive zoom and detail inspection.
          </p>
        </div>

        {/* View Layout Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setViewLayout('grid')}
            title="Grid View"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewLayout === 'grid'
                ? 'bg-white text-cyan-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-grip"></i>
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewLayout('hero')}
            title="Featured Walkthrough View"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewLayout === 'hero'
                ? 'bg-white text-cyan-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-display"></i>
            <span className="hidden sm:inline">Featured</span>
          </button>
        </div>
      </div>

      {/* ─── CATEGORY FILTER TABS & SEARCH BAR ─── */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search screenshots (e.g. Probe attack, Random Forest, login)..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 self-end sm:self-auto">
            <span>Showing:</span>
            <strong className="text-slate-800 font-bold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
              {filteredScreenshots.length} of {IDS_SCREENSHOTS.length}
            </strong>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {IDS_GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (onFilterChange) onFilterChange(cat.id);
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-transparent shadow-md shadow-cyan-600/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/40 hover:text-cyan-800'
                }`}
              >
                <i className={`${cat.icon} text-xs ${isActive ? 'text-white' : cat.color}`}></i>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── FEATURED WALKTHROUGH VIEW ─── */}
      {viewLayout === 'hero' && filteredScreenshots.length > 0 && (
        <div className="space-y-4">
          {(() => {
            const featured = filteredScreenshots[featuredIndex] || filteredScreenshots[0];
            return (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all">
                {/* Hero Top Bar */}
                <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                      Module {featured.moduleNum}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                      {featured.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300 bg-white/10 px-2.5 py-1 rounded-lg font-mono">
                      {featured.resolution}
                    </span>
                    <button
                      onClick={() => openLightbox(featuredIndex)}
                      className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <i className="fa-solid fa-up-right-and-down-left-from-center text-[11px]"></i>
                      <span>Full Clarity Zoom</span>
                    </button>
                  </div>
                </div>

                {/* Hero Big Image Display */}
                <div
                  onClick={() => openLightbox(featuredIndex)}
                  className="relative group/hero cursor-zoom-in bg-slate-950 flex items-center justify-center min-h-[380px] max-h-[580px] overflow-hidden"
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="max-h-[560px] w-auto max-w-full object-contain transition-transform duration-300 group-hover/hero:scale-[1.015]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white space-y-1">
                      <p className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <i className="fa-solid fa-magnifying-glass-plus"></i> Click to inspect 100% crystal-clear original resolution
                      </p>
                      <p className="text-sm font-medium text-slate-200">{featured.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Hero Bottom Meta */}
                <div className="p-5 bg-slate-50/80 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Description</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {featured.desc}
                    </p>
                    {featured.techInfo && (
                      <p className="text-[11px] font-mono text-cyan-800 bg-cyan-100/70 inline-block px-2 py-0.5 rounded mt-1">
                        {featured.techInfo}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setFeaturedIndex((prev) => (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-chevron-left"></i> Previous
                    </button>
                    <span className="text-xs font-bold text-slate-500 px-2">
                      {featuredIndex + 1} / {filteredScreenshots.length}
                    </span>
                    <button
                      onClick={() => setFeaturedIndex((prev) => (prev + 1) % filteredScreenshots.length)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                    >
                      Next <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Thumbnail Filmstrip for Hero */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scroll-smooth">
            {filteredScreenshots.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setFeaturedIndex(idx)}
                className={`relative flex-shrink-0 w-28 sm:w-36 h-20 rounded-xl overflow-hidden border-2 transition-all group ${
                  featuredIndex === idx
                    ? 'border-cyan-500 shadow-md shadow-cyan-500/20 scale-105 ring-2 ring-cyan-400/40'
                    : 'border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[10px] text-white px-1.5 py-0.5 truncate font-medium text-left">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── GRID VIEW (DEFAULT & COMPREHENSIVE) ─── */}
      {viewLayout === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredScreenshots.map((item, idx) => (
            <div
              key={item.id}
              className="group/card bg-white rounded-3xl border border-slate-200/90 hover:border-cyan-400 shadow-xs hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-gradient-to-r from-slate-50/80 to-transparent">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-700 font-extrabold text-[11px] flex items-center justify-center flex-shrink-0">
                    {item.moduleNum}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border truncate ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.resolution}
                  </span>
                </div>
              </div>

              {/* Screenshot Image Container with Zoom Click */}
              <div
                onClick={() => openLightbox(idx)}
                className="relative bg-slate-950/90 aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden cursor-zoom-in group/img flex items-center justify-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover/card:scale-[1.03]"
                  loading="lazy"
                />

                {/* Subtle Hover Gradient & Full Clarity Action Button */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-cyan-500/95 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/30 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                    <i className="fa-solid fa-magnifying-glass-plus text-sm"></i>
                    <span>View Full Clarity</span>
                  </span>
                </div>

                {/* Bottom Bar Indicator on Image */}
                <div className="absolute bottom-2.5 right-3 bg-slate-900/80 backdrop-blur-xs text-[10px] text-cyan-300 font-semibold px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5 opacity-90 group-hover/card:opacity-100">
                  <i className="fa-solid fa-expand text-[9px]"></i>
                  <span>100% Zoom Available</span>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover/card:text-cyan-700 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* Key Features Chips */}
                {item.features && item.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] sm:text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/80 flex items-center gap-1"
                      >
                        <i className="fa-solid fa-check text-[9px] text-emerald-600"></i>
                        {feat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[220px]" title={item.techInfo}>
                    {item.techInfo}
                  </span>
                  <button
                    onClick={() => openLightbox(idx)}
                    className="font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group-hover/card:translate-x-0.5 transition-transform flex-shrink-0"
                  >
                    <span>Full Clarity</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredScreenshots.length === 0 && (
        <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto text-lg">
            <i className="fa-solid fa-image"></i>
          </div>
          <h4 className="font-extrabold text-slate-800 text-sm">No screenshots match your search</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for a different keyword or select &quot;All Screenshots&quot; to see all 19 high-resolution images.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ─── FULL-CLARITY LIGHTBOX MODAL VIEWER ─── */}
      {currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between text-white animate-in fade-in duration-200 select-none"
        >
          {/* Top Bar Controls */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between gap-3 flex-shrink-0 z-20">
            {/* Title & Metadata */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                {currentLightboxItem.moduleNum}
              </span>
              <div className="min-w-0">
                <h4 className="font-extrabold text-xs sm:text-sm text-white truncate max-w-sm sm:max-w-md">
                  {currentLightboxItem.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-semibold">{currentLightboxItem.badge}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-300">{currentLightboxItem.resolution}</span>
                  <span>•</span>
                  <span>Image {lightboxIndex + 1} of {filteredScreenshots.length}</span>
                </div>
              </div>
            </div>

            {/* Center Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/90 px-2 py-1 rounded-xl border border-white/10">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                title="Zoom Out (-)"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <button
                onClick={handleZoomReset}
                title="Fit to Screen (0)"
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold text-cyan-300 hover:bg-white/10 transition-colors"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3.0}
                title="Zoom In (+)"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <button
                onClick={handleZoom100Percent}
                title="100% Original Clarity"
                className="px-2 py-1 rounded-md text-[11px] font-extrabold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
              >
                1:1 HD
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={currentLightboxItem.image}
                target="_blank"
                rel="noreferrer"
                title="Open Original Raw HD Image in New Tab"
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                <span className="hidden md:inline">Raw File</span>
              </a>
              <button
                onClick={closeLightbox}
                title="Close Viewer (Esc)"
                className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors text-sm"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          {/* Main Viewport for Full Clarity Inspection */}
          <div
            ref={imageContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 ${
              zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
          >
            {/* Left Nav Arrow */}
            <button
              onClick={prevLightbox}
              title="Previous Screenshot (ArrowLeft)"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/20 hover:border-cyan-400 flex items-center justify-center text-sm shadow-xl transition-all"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* High-Resolution Screenshot Image with Transform */}
            <div
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              className="max-h-full max-w-full flex items-center justify-center select-none"
            >
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                draggable={false}
                style={{ imageRendering: 'auto' }}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl shadow-black/80 ring-1 ring-white/10"
              />
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={nextLightbox}
              title="Next Screenshot (ArrowRight)"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/20 hover:border-cyan-400 flex items-center justify-center text-sm shadow-xl transition-all"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            {/* Zoom helper hint on screen */}
            {zoomLevel > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/30 shadow-lg pointer-events-none">
                <i className="fa-solid fa-arrows-up-down-left-right mr-1.5"></i>
                Drag to pan • Click &quot;0%&quot; or Fit to reset
              </div>
            )}
          </div>

          {/* Bottom Bar: Caption & Filmstrip Thumbnails */}
          <div className="bg-slate-900/95 border-t border-white/10 px-4 sm:px-6 py-3 space-y-2.5 flex-shrink-0 z-20">
            {/* Caption & Tech Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <p className="text-slate-300 text-xs sm:text-[13px] leading-snug line-clamp-2 max-w-4xl">
                <strong className="text-cyan-400 font-bold mr-1">Live Module Walkthrough:</strong>
                {currentLightboxItem.desc}
              </p>
              {currentLightboxItem.techInfo && (
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/80 px-2.5 py-1 rounded-lg flex-shrink-0 self-start sm:self-auto">
                  {currentLightboxItem.techInfo}
                </span>
              )}
            </div>

            {/* Bottom Filmstrip Thumbnails */}
            <div
              ref={thumbsNavRef}
              className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
            >
              {filteredScreenshots.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className={`relative flex-shrink-0 w-16 sm:w-20 h-11 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    lightboxIndex === idx
                      ? 'border-cyan-400 ring-2 ring-cyan-500/50 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-cyan-300 px-1 truncate font-mono">
                    #{item.moduleNum}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
