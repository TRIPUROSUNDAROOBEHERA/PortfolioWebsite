import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from './routeConfig';

// Pages
import LandingPage from '../pages/LandingPage';
import ProjectDetails from '../pages/ProjectDetails';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ─── 1. Main Public Single-Page Routes ─── */}
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route path={ROUTES.ABOUT} element={<LandingPage />} />
      <Route path={ROUTES.EDUCATION} element={<LandingPage />} />
      <Route path={ROUTES.SKILLS} element={<LandingPage />} />
      <Route path={ROUTES.PROJECTS} element={<LandingPage />} />
      <Route path={ROUTES.CERTIFICATES} element={<LandingPage />} />
      <Route path={ROUTES.CONTACT} element={<LandingPage />} />
      <Route path={ROUTES.FUTURE_PLANS} element={<LandingPage />} />
      <Route path={ROUTES.RESOURCES} element={<LandingPage />} />

      {/* ─── 2. Public Item Details Views ─── */}
      <Route path={ROUTES.PROJECT_DETAILS} element={<ProjectDetails />} />

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