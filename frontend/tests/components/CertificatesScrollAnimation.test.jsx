import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../src/pages/LandingPage';
import Home from '../../src/pages/Home';

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

describe('Certificates 3-Card Scroll Animation & Staggered Vertical Entrance Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders 3 horizontal certificate cards with slow vertical entrance animation classes', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <MemoryRouter initialEntries={['/']}>
          <LandingPage />
        </MemoryRouter>
      );
    });

    const { container } = renderResult;

    // Certificates section container
    const certsSection = container.querySelector('#certificates');
    expect(certsSection).toBeInTheDocument();

    // Verify 3 cards in the desktop or mobile grid
    const cards = certsSection.querySelectorAll('.grid > div');
    expect(cards.length).toBeGreaterThanOrEqual(3);

    // Verify animate-cert-card-up and animate-card-slide-fade classes are present
    const animatedCards = certsSection.querySelectorAll('.animate-cert-card-up');
    expect(animatedCards.length).toBeGreaterThanOrEqual(3);
    animatedCards.forEach((card) => {
      expect(card).toHaveClass('animate-cert-card-up');
      expect(card).toHaveClass('animate-card-slide-fade');
      expect(card).toHaveClass('edu-text-clarity');
    });

    // Verify staggered animation delays on the first 3 cards
    expect(animatedCards[0].style.animationDelay).toBe('0.08s');
    expect(animatedCards[1].style.animationDelay).toBe('0.26s');
    expect(animatedCards[2].style.animationDelay).toBe('0.44s');
  });

  it('verifies image and text content under the total image have slow entrance animation', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <MemoryRouter initialEntries={['/']}>
          <Home sectionRefreshKeys={{ certificates: 1 }} />
        </MemoryRouter>
      );
    });

    const { container } = renderResult;
    const certsSection = container.querySelector('#certificates');
    expect(certsSection).toBeInTheDocument();

    // Verify text blocks under image have animate-cert-text-in and staggered delays
    const textBlocks = certsSection.querySelectorAll('.animate-cert-text-in');
    expect(textBlocks.length).toBeGreaterThanOrEqual(3);

    expect(textBlocks[0].style.animationDelay).toBe('0.18s');
    expect(textBlocks[1].style.animationDelay).toBe('0.36s');
    expect(textBlocks[2].style.animationDelay).toBe('0.54s');

    // Verify certificate titles render clearly
    expect(screen.getAllByText('Python Full Stack Developer Virtual Internship')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Fortinet Certified Associate in Cybersecurity')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Fortinet Certified Fundamentals in Cybersecurity')[0]).toBeInTheDocument();
  });
});

