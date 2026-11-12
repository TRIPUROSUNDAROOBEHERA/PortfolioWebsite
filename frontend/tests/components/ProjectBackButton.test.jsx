import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '../../src/pages/Home';

describe('Project Modal Mobile and Browser Back Button popstate behavior', () => {
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

  it('closes project modal and clears sessionStorage when browser/mobile back button (popstate) is triggered for any project', async () => {
    const setActiveTab = vi.fn();
    render(<Home profile={mockProfile} setActiveTab={setActiveTab} />);

    // Click on TripGen project to open it
    const exploreButtons = screen.getAllByRole('button', { name: /explore project/i });
    expect(exploreButtons.length).toBeGreaterThan(0);

    // Open first project (TripGen)
    act(() => {
      fireEvent.click(exploreButtons[0]);
    });

    // Project modal should now be open
    expect(screen.getByRole('button', { name: /close project view/i })).toBeInTheDocument();
    expect(sessionStorage.getItem('open_project_id')).toBeTruthy();

    // Simulate mobile / browser back button click (popstate without ?project in URL)
    act(() => {
      window.history.replaceState({}, '', '/#projects');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Project modal should now be closed
    expect(screen.queryByRole('button', { name: /close project view/i })).not.toBeInTheDocument();
    expect(sessionStorage.getItem('open_project_id')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    expect(document.body.classList.contains('modal-open')).toBe(false);

    // Now test opening another project (IDS / English Master)
    if (exploreButtons.length > 1) {
      act(() => {
        fireEvent.click(exploreButtons[1]);
      });

      expect(screen.getByRole('button', { name: /close project view/i })).toBeInTheDocument();
      expect(sessionStorage.getItem('open_project_id')).toBeTruthy();

      // Tap Android system back button again
      act(() => {
        window.history.replaceState({}, '', '/#projects');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      expect(screen.queryByRole('button', { name: /close project view/i })).not.toBeInTheDocument();
      expect(sessionStorage.getItem('open_project_id')).toBeNull();
      expect(document.body.style.overflow).toBe('');
    }
  });
});
