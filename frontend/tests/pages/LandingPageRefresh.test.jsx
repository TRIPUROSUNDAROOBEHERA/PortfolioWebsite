import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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

describe('LandingPage Navigation and Section Rendering Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders LandingPage with main container and all portfolio sections', async () => {
    const { container } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const mainElement = container.querySelector('#main-content');
    expect(mainElement).toBeInTheDocument();
    expect(container.querySelector('#home')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#skills')).toBeInTheDocument();
    expect(container.querySelector('#projects')).toBeInTheDocument();
    expect(container.querySelector('#education')).toBeInTheDocument();
    expect(container.querySelector('#certificates')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders View Resume button in Navbar and allows opening the modal', async () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const resumeBtn = screen.getByRole('button', { name: /view resume/i });
    expect(resumeBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(resumeBtn);
    });

    // Verify modal appears
    await waitFor(() => {
      expect(screen.getByText(/Official Resume/i)).toBeInTheDocument();
    });
  });

  it('confirms that custom Refresh button is removed from Navbar while data fetch works', async () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Initial mount calls profile get once
    expect(axiosClient.get).toHaveBeenCalledTimes(1);

    // Custom refresh button should not be present
    expect(screen.queryByRole('button', { name: /refresh page/i })).not.toBeInTheDocument();
  });
});
