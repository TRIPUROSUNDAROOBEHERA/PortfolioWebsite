import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import ProjectDetails from '../pages/public/ProjectDetails';
import BlogDetailsPage from '../pages/public/BlogDetailsPage';
import NotFound from '../pages/public/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ─── 1. Main Public Single-Page Route ─── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<LandingPage />} />
      <Route path="/experience" element={<LandingPage />} />
      <Route path="/education" element={<LandingPage />} />
      <Route path="/skills" element={<LandingPage />} />
      <Route path="/projects" element={<LandingPage />} />
      <Route path="/certificates" element={<LandingPage />} />
      <Route path="/achievements" element={<LandingPage />} />
      <Route path="/courses" element={<LandingPage />} />
      <Route path="/blog" element={<LandingPage />} />
      <Route path="/contact" element={<LandingPage />} />

      {/* ─── 2. Public Item Details Views ─── */}
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />

      {/* ─── 3. Fallback: Direct Any /admin Access to Django ─── */}
      <Route path="/admin/*" element={<RedirectToDjangoBackend />} />

      {/* ─── 4. Error Pages ─── */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

// Helper: Redirects legacy frontend admin URLs to Django
function RedirectToDjangoBackend() {
  useEffect(() => {
    window.location.href = 'http://127.0.0.1:8000/admin/';
  }, []);
  return null;
}