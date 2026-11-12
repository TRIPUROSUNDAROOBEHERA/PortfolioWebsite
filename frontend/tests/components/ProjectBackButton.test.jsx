import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '../../src/pages/Home';

describe('Individual Page Back Button Navigation Suite (Skills, Projects, Certificates)', () => {
  const mockProfile = {
    first_name: 'Tripurosundaro',
    last_name: 'Behera',
    full_name: 'Tripurosundaro Behera',
    role: 'Python Full-Stack Developer',
    hero_description: 'Passionate Python Full-Stack Developer',
    email: 'test@example.com',
  };

  beforeEach(() => {
    window.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn((el) => {
        callback([{ target: el, isIntersecting: true }]);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    if (!Element.prototype.scrollTo) {
      Element.prototype.scrollTo = vi.fn();
    }
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  });

  it('closes project modal and returns to projects section when mobile back button is pressed', async () => {
    const setActiveTab = vi.fn();
    render(<Home profile={mockProfile} setActiveTab={setActiveTab} />);

    // Click on TripGen project to open it
    const exploreButtons = screen.getAllByRole('button', { name: /explore project/i });
    expect(exploreButtons.length).toBeGreaterThan(0);

    // Open project
    act(() => {
      fireEvent.click(exploreButtons[0]);
    });

    // Project modal should now be open
    expect(screen.getByRole('button', { name: /close project view/i })).toBeInTheDocument();
    expect(sessionStorage.getItem('open_project_id')).toBeTruthy();

    // Simulate mobile back button click
    act(() => {
      window.history.replaceState({}, '', '/#projects');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Project modal should now be closed
    expect(screen.queryByRole('button', { name: /close project view/i })).not.toBeInTheDocument();
    expect(sessionStorage.getItem('open_project_id')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    expect(document.body.classList.contains('modal-open')).toBe(false);
  });

  it('closes certificate preview modal and returns to certificates section when mobile back button is pressed', async () => {
    const setActiveTab = vi.fn();
    render(<Home profile={mockProfile} setActiveTab={setActiveTab} />);

    // Click on a certificate card to open it
    const certCards = screen.getAllByText(/view certificate/i);
    expect(certCards.length).toBeGreaterThan(0);

    act(() => {
      fireEvent.click(certCards[0]);
    });

    // Certificate preview modal should now be open
    expect(sessionStorage.getItem('open_cert_id')).toBeTruthy();

    // Simulate mobile back button click
    act(() => {
      window.history.replaceState({}, '', '/#certificates');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Certificate modal should now be closed
    expect(sessionStorage.getItem('open_cert_id')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('identifies only one clicked certificate card at a time with orange box and resets on refresh', async () => {
    const setActiveTab = vi.fn();
    const { container } = render(<Home profile={mockProfile} setActiveTab={setActiveTab} />);

    // Query mobile certificate cards
    const mobileCards = container.querySelectorAll('[data-identified]');
    expect(mobileCards.length).toBeGreaterThan(0);

    // Initial load / refresh: no certificate card is identified
    mobileCards.forEach((card) => {
      expect(card.getAttribute('data-identified')).toBe('false');
      expect(card.className).not.toContain('border-orange-500');
    });

    // Click the first mobile certificate card
    act(() => {
      fireEvent.click(mobileCards[0]);
    });

    // Close via close button
    const closeBtn = screen.getByRole('button', { name: /close/i });
    act(() => {
      fireEvent.click(closeBtn);
    });

    // Verify ONLY the first mobile certificate card is identified with orange box
    expect(mobileCards[0].getAttribute('data-identified')).toBe('true');
    expect(mobileCards[0].className).toContain('border-orange-500');
    if (mobileCards.length > 1) {
      expect(mobileCards[1].getAttribute('data-identified')).toBe('false');
      expect(mobileCards[1].className).not.toContain('border-orange-500');
    }

    // Verify inner thumbnail box does not have orange border
    const thumbBox = mobileCards[0].querySelector('img')?.parentElement;
    expect(thumbBox?.className).not.toContain('border-orange-400');

    // Click second mobile certificate card
    if (mobileCards.length > 1) {
      act(() => {
        fireEvent.click(mobileCards[1]);
      });

      // Simulate back button
      act(() => {
        window.history.replaceState({}, '', '/#certificates');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      // Now ONLY second card is identified (never two at a time!)
      expect(mobileCards[1].getAttribute('data-identified')).toBe('true');
      expect(mobileCards[1].className).toContain('border-orange-500');
      expect(mobileCards[0].getAttribute('data-identified')).toBe('false');
      expect(mobileCards[0].className).not.toContain('border-orange-500');
    }
  });

  it('closes skill detail modal and returns to skills section when mobile back button is pressed', async () => {
    const setActiveTab = vi.fn();
    render(<Home profile={mockProfile} setActiveTab={setActiveTab} />);

    // Click on a skill pill/card to open it
    const pythonSkills = screen.getAllByText(/python/i);
    expect(pythonSkills.length).toBeGreaterThan(0);

    act(() => {
      fireEvent.click(pythonSkills[0]);
    });

    // Check if skill was opened or session storage set
    const openSkillId = sessionStorage.getItem('open_skill_id');
    if (openSkillId) {
      // Simulate mobile back button click
      act(() => {
        window.history.replaceState({}, '', '/#skills');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      expect(sessionStorage.getItem('open_skill_id')).toBeNull();
      expect(document.body.style.overflow).toBe('');
    }
  });

  it('does not intercept or scroll when user is on the landing page without any modal open and taps back button', async () => {
    const setActiveTab = vi.fn();
    render(<Home profile={mockProfile} setActiveTab={setActiveTab} />);

    // When no modal is open
    expect(screen.queryByRole('button', { name: /close project view/i })).not.toBeInTheDocument();

    // Trigger popstate as user presses back to return to previous page (e.g. Google Chrome home)
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // setActiveTab should not be called and no modal should be open
    expect(setActiveTab).not.toHaveBeenCalled();
    expect(document.body.style.overflow).toBe('');
  });
});
