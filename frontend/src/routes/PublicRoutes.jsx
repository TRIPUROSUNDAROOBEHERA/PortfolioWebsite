import React from 'react';
import { Route } from 'react-router-dom';
import ROUTES from './routeConfig';

import Home from '../pages/public/Home';
import AboutPage from '../pages/public/AboutPage';
import ExperiencePage from '../pages/public/ExperiencePage';
import EducationPage from '../pages/public/EducationPage';
import SkillsPage from '../pages/public/SkillsPage';
import ProjectsPage from '../pages/public/ProjectsPage';
import ProjectDetails from '../pages/public/ProjectDetails';
import CertificatesPage from '../pages/public/CertificatesPage';
import AchievementsPage from '../pages/public/AchievementsPage';
import CoursesPage from '../pages/public/CoursesPage';
import BlogPage from '../pages/public/BlogPage';
import BlogDetailsPage from '../pages/public/BlogDetailsPage';
import FuturePlanPage from '../pages/public/FuturePlanPage';
import PublicationsPage from '../pages/public/PublicationsPage';
import ResearchPage from '../pages/public/ResearchPage';
import ResourcesPage from '../pages/public/ResourcesPage';
import ContactPage from '../pages/public/ContactPage';

export const publicRouteElements = (
  <>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.ABOUT} element={<AboutPage />} />
    <Route path={ROUTES.EXPERIENCE} element={<ExperiencePage />} />
    <Route path={ROUTES.EDUCATION} element={<EducationPage />} />
    <Route path={ROUTES.SKILLS} element={<SkillsPage />} />
    <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
    <Route path={ROUTES.PROJECT_DETAILS} element={<ProjectDetails />} />
    <Route path={ROUTES.CERTIFICATES} element={<CertificatesPage />} />
    <Route path={ROUTES.ACHIEVEMENTS} element={<AchievementsPage />} />
    <Route path={ROUTES.COURSES} element={<CoursesPage />} />
    <Route path={ROUTES.BLOG} element={<BlogPage />} />
    <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetailsPage />} />
    <Route path={ROUTES.FUTURE_PLANS} element={<FuturePlanPage />} />
    <Route path={ROUTES.PUBLICATIONS} element={<PublicationsPage />} />
    <Route path={ROUTES.RESEARCH} element={<ResearchPage />} />
    <Route path={ROUTES.RESOURCES} element={<ResourcesPage />} />
    <Route path={ROUTES.CONTACT} element={<ContactPage />} />
  </>
);

export default publicRouteElements;