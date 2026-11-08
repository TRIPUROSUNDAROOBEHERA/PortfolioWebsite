import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import EducationSection from '../../src/components/sections/EducationSection';

// Mock educationApi
vi.mock('../../src/api/educationApi', () => ({
  default: {
    getAll: vi.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          degree: 'MCA (Post Graduate)',
          institution: 'Sree Venkateswara College of Engineering, Nellore',
          university: 'Jawaharlal Nehru Technological University Anantapur (JNTUA)',
          score_display: 'CGPA: 8.47 / 10.0',
          duration: '2024 – 2026',
        },
        {
          id: 2,
          degree: 'B.Sc. Science - MPE',
          institution: 'Government Degree College for (Men), Srikakulam',
          university: 'Dr. B.R. Ambedkar University, Srikakulam (BRAU)',
          score_display: 'Percentage: 70.80%',
          duration: '2018 – 2021',
        },
        {
          id: 3,
          degree: 'Intermediate (12th) - MPC',
          institution: 'Gayatri Junior College, Srikakulam',
          university: 'Board of Intermediate Education, Andhra Pradesh (BIEAP)',
          score_display: 'Percentage: 74.40%',
          duration: '2016 – 2017',
        },
        {
          id: 4,
          degree: '10th (Secondary School)',
          institution: 'Z.P. High School',
          university: 'Board of Secondary Education, Andhra Pradesh (BSEAP)',
          score_display: 'Percentage: 60.00%',
          duration: '2015',
        },
      ],
    }),
  },
}));

describe('EducationSection Scroll Animation & One-by-One Staggered Entrance', () => {
  it('renders all 4 educational journey items', async () => {
    render(<EducationSection isStandalonePage={true} />);

    expect(screen.getByText(/My Academic/i)).toBeInTheDocument();
    expect(screen.getByText(/Journey/i)).toBeInTheDocument();

    expect(screen.getByText('MCA (Post Graduate)')).toBeInTheDocument();
    expect(screen.getByText('B.Sc. Science - MPE')).toBeInTheDocument();
    expect(screen.getByText('Intermediate (12th) - MPC')).toBeInTheDocument();
    expect(screen.getByText('10th (Secondary School)')).toBeInTheDocument();
  });

  it('applies staggered animation delays so content and text are added one by one', () => {
    const { container } = render(<EducationSection isStandalonePage={true} />);

    // 1. Timeline vertical connecting line draw animation
    const timelineLine = container.querySelector('.animate-edu-line-draw');
    expect(timelineLine).toBeInTheDocument();

    // 2. Timeline node icons pop animation with staggered delays
    const nodeIcons = container.querySelectorAll('.animate-edu-node-pop');
    expect(nodeIcons.length).toBe(4);
    expect(nodeIcons[0].style.animationDelay).toBe('0.06s');
    expect(nodeIcons[1].style.animationDelay).toBe('0.22s');
    expect(nodeIcons[2].style.animationDelay).toBe('0.38s');
    expect(nodeIcons[3].style.animationDelay).toBe('0.54s');

    // 3. Educational cards slide in with staggered one-by-one delays (Round only)
    const cards = container.querySelectorAll('.animate-edu-card-in');
    expect(cards.length).toBe(4);
    expect(cards[0].style.animationDelay).toBe('0.1s');
    expect(cards[1].style.animationDelay).toBe('0.26s');
    expect(cards[2].style.animationDelay).toBe('0.42s');
    expect(cards[3].style.animationDelay).toBe('0.58s');

    // 4. Educational text content with full clarity classes and staggered delays
    const textBlocks = container.querySelectorAll('.animate-edu-text-in');
    expect(textBlocks.length).toBe(4);
    expect(textBlocks[0].style.animationDelay).toBe('0.14s');
    expect(textBlocks[1].style.animationDelay).toBe('0.3s');
    expect(textBlocks[2].style.animationDelay).toBe('0.46s');
    expect(textBlocks[3].style.animationDelay).toBe('0.62s');

    // 5. Right badges enter with one-by-one delays
    const badgeBlocks = container.querySelectorAll('.animate-edu-badge-in');
    expect(badgeBlocks.length).toBe(4);
    expect(badgeBlocks[0].style.animationDelay).toBe('0.18s');
    expect(badgeBlocks[1].style.animationDelay).toBe('0.34s');
    expect(badgeBlocks[2].style.animationDelay).toBe('0.5s');
    expect(badgeBlocks[3].style.animationDelay).toBe('0.66s');
  });

  it('re-triggers animation on refreshKey increment', () => {
    const { container, rerender } = render(<EducationSection refreshKey={0} />);

    // Initially active in test environment
    expect(container.querySelectorAll('.animate-edu-card-in').length).toBeGreaterThan(0);

    // Trigger refresh
    act(() => {
      rerender(<EducationSection refreshKey={1} />);
    });

    // Check that elements retain / re-render with animation classes
    expect(container.querySelectorAll('.animate-card-slide-fade').length).toBe(4);
  });
});

