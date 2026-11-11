import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../src/pages/LandingPage';

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

describe('Certificates Section Visual Limit Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('initially displays only 3 certificates while scrolling, and reveals all on clicking View All', async () => {
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

    // Verify exactly 3 certificates are rendered on the page initially
    const cardsGrid = certsSection.querySelector('.grid');
    expect(cardsGrid).toBeInTheDocument();
    let cards = cardsGrid.querySelectorAll(':scope > div');
    expect(cards.length).toBe(3);

    // Verify View All button is present on the right side
    const viewAllBtn = screen.getByTestId('view-all-certificates-btn');
    expect(viewAllBtn).toBeInTheDocument();
    expect(viewAllBtn).toHaveTextContent(/View All/i);

    // Click "View All" button
    await act(async () => {
      fireEvent.click(viewAllBtn);
    });

    // Verify all 5 certificates are now rendered in exact serial order 1 -> 2 -> 3 -> 4 -> 5
    cards = cardsGrid.querySelectorAll(':scope > div');
    expect(cards.length).toBe(5);
    expect(viewAllBtn).toHaveTextContent(/Show Less/i);

    const renderedTitles = Array.from(cards).map((card) =>
      card.querySelector('h4')?.textContent?.trim()
    );
    expect(renderedTitles).toEqual([
      'Python Full Stack Developer Virtual Internship',
      'Programming with Python 3.X',
      'Introduction to Prompt Engineering',
      'Fortinet Certified Associate in Cybersecurity',
      'Fortinet Certified Fundamentals in Cybersecurity',
    ]);

    // Click "Show Less" to collapse back
    await act(async () => {
      fireEvent.click(viewAllBtn);
    });

    // Verify collapsed back to exactly 3 certificates
    cards = cardsGrid.querySelectorAll(':scope > div');
    expect(cards.length).toBe(3);
    expect(viewAllBtn).toHaveTextContent(/View All/i);
  });

  it('mobile view initially displays only 3 certificates visual and shows all on clicking mobile view all button', async () => {
    let renderResult;
    await act(async () => {
      renderResult = render(
        <MemoryRouter initialEntries={['/']}>
          <LandingPage />
        </MemoryRouter>
      );
    });

    const { container } = renderResult;
    const certsSection = container.querySelector('#certificates');
    expect(certsSection).toBeInTheDocument();

    // Mobile container
    const mobileContainer = certsSection.querySelector('.block.sm\\:hidden');
    expect(mobileContainer).toBeInTheDocument();

    // Mobile cards list
    const mobileCardsList = mobileContainer.querySelector('.flex.flex-col.gap-3');
    expect(mobileCardsList).toBeInTheDocument();

    // Verify real certificates count in stats card (5 Certifications, matching real certificates count)
    expect(mobileContainer).toHaveTextContent('5');
    expect(mobileContainer).toHaveTextContent(/Certifications/i);

    // Verify real platforms count in stats card (3 Platforms, matching unique issuers)
    expect(mobileContainer).toHaveTextContent('3');
    expect(mobileContainer).toHaveTextContent(/Platforms/i);

    // Initially exactly 3 certificates visually shown
    let mobileCards = mobileCardsList.querySelectorAll(':scope > div');
    expect(mobileCards.length).toBe(3);

    // Verify mobile View All button is present
    const mobileViewBtn = mobileContainer.querySelector('#mobile-view-all-certificates-btn');
    expect(mobileViewBtn).toBeInTheDocument();
    expect(mobileViewBtn).toHaveTextContent(/View All Certifications/i);

    // Click "View All Certifications"
    await act(async () => {
      fireEvent.click(mobileViewBtn);
    });

    // All certificates now visible in mobile view
    mobileCards = mobileCardsList.querySelectorAll(':scope > div');
    expect(mobileCards.length).toBeGreaterThan(3);
    expect(mobileViewBtn).toHaveTextContent(/Show Less Certifications/i);

    // Click "Show Less Certifications"
    await act(async () => {
      fireEvent.click(mobileViewBtn);
    });

    // Collapsed back to 3 certificates
    mobileCards = mobileCardsList.querySelectorAll(':scope > div');
    expect(mobileCards.length).toBe(3);
    expect(mobileViewBtn).toHaveTextContent(/View All Certifications/i);

    // Open first certificate modal
    const firstCertCard = mobileCards[0];
    await act(async () => {
      fireEvent.click(firstCertCard);
    });

    // Verify modal opened with right-aligned View PDF button on mobile
    const viewPdfBtn = screen.getByRole('link', { name: /view pdf/i });
    expect(viewPdfBtn).toBeInTheDocument();
    const pdfContainer = viewPdfBtn.closest('.w-full');
    expect(pdfContainer).toBeInTheDocument();
    expect(pdfContainer).toHaveClass('justify-end');
  });
});
