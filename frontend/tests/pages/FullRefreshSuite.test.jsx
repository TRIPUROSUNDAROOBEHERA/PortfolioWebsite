import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../src/pages/LandingPage';
import axiosClient from '../../src/api/axiosClient';
import projectsApi from '../../src/api/projectsApi';
import skillApi from '../../src/api/skillApi';
import certificatesApi from '../../src/api/certificatesApi';
import educationApi from '../../src/api/educationApi';

vi.mock('../../src/api/axiosClient', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        id: 1,
        full_name: 'Tripurosundaro Behera',
        first_name: 'Tripurosundaro',
        last_name: 'Behera',
        role: 'Python Full-Stack Developer',
      },
    }),
  },
}));

vi.mock('../../src/api/projectsApi', () => ({
  default: {
    getAll: vi.fn().mockResolvedValue({ results: [] }),
  },
}));

vi.mock('../../src/api/skillApi', () => ({
  default: {
    getAll: vi.fn().mockResolvedValue({ results: [] }),
  },
}));

vi.mock('../../src/api/certificatesApi', () => ({
  default: {
    getAll: vi.fn().mockResolvedValue({ results: [] }),
  },
}));

vi.mock('../../src/api/educationApi', () => ({
  default: {
    getAll: vi.fn().mockResolvedValue({ results: [] }),
  },
}));

describe('Complete Multi-Section Rendering and Navbar Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const sections = ['home', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'];

  sections.forEach((sectionId) => {
    it(`renders correctly when route is "${sectionId}"`, async () => {
      const initialPath = sectionId === 'home' ? '/' : `/${sectionId}`;
      const { container } = render(
        <MemoryRouter initialEntries={[initialPath]}>
          <LandingPage />
        </MemoryRouter>
      );

      // Verify target section element is rendered
      const sectionEl = container.querySelector(`#${sectionId}`);
      expect(sectionEl).toBeInTheDocument();

      // Verify View Resume button is present and aligned
      expect(screen.getByRole('button', { name: /view resume/i })).toBeInTheDocument();
    });
  });

  it('verifies that animation classes matching Education exist across all sections', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <LandingPage />
      </MemoryRouter>
    );

    // Education reference classes
    const eduHeader = container.querySelector('#education .animate-heading-fade-slide-up');
    expect(eduHeader).toBeInTheDocument();

    // Home heading animation
    const homeHeader = container.querySelector('#home .animate-heading-fade-slide-up');
    expect(homeHeader).toBeInTheDocument();

    // About heading animation
    const aboutHeader = container.querySelector('#about .animate-heading-fade-slide-up');
    expect(aboutHeader).toBeInTheDocument();

    // Skills heading animation
    const skillsHeader = container.querySelector('#skills .animate-heading-fade-slide-up');
    expect(skillsHeader).toBeInTheDocument();

    // Projects heading animation
    const projectsHeader = container.querySelector('#projects .animate-heading-fade-slide-up');
    expect(projectsHeader).toBeInTheDocument();

    // Certificates heading animation
    const certsHeader = container.querySelector('#certificates .animate-heading-fade-slide-up');
    expect(certsHeader).toBeInTheDocument();

    // Contact heading animation
    const contactHeader = container.querySelector('#contact .animate-heading-fade-slide-up');
    expect(contactHeader).toBeInTheDocument();

    // Card slide animations present across sections
    expect(container.querySelectorAll('.animate-card-slide-fade').length).toBeGreaterThan(10);
  });
});
