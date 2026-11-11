import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutSection from '../../src/components/sections/AboutSection';

describe('AboutSection Card Navigation', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls setActiveTab with education, skills, and contact when section elements are absent', () => {
    const setActiveTab = vi.fn();
    render(<AboutSection setActiveTab={setActiveTab} />);

    fireEvent.click(screen.getByText('My Education').closest('[role="button"]'));
    expect(setActiveTab).toHaveBeenCalledWith('education');

    fireEvent.click(screen.getByText("What I'm Learning").closest('[role="button"]'));
    expect(setActiveTab).toHaveBeenCalledWith('skills');

    fireEvent.click(screen.getByText('My Approach').closest('[role="button"]'));
    expect(setActiveTab).toHaveBeenCalledWith('contact');
  });

  it('smoothly scrolls to target section elements when rendered in full page layout', () => {
    render(
      <div>
        <AboutSection setActiveTab={vi.fn()} />
        <section id="education" />
        <section id="skills" />
        <section id="contact" />
      </div>
    );

    const targets = [
      { label: 'My Education', id: 'education', top: 1200 },
      { label: "What I'm Learning", id: 'skills', top: 600 },
      { label: 'My Approach', id: 'contact', top: 2400 },
    ];

    targets.forEach(({ label, id, top }) => {
      const el = document.getElementById(id);
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        top,
        bottom: top + 100,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
      });

      fireEvent.click(screen.getByText(label).closest('[role="button"]'));
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: top - 70,
        behavior: 'smooth',
      });
    });
  });

  it('supports keyboard Enter navigation on the three pillar cards', () => {
    const setActiveTab = vi.fn();
    render(<AboutSection setActiveTab={setActiveTab} />);

    fireEvent.keyDown(screen.getByText('My Education').closest('[role="button"]'), { key: 'Enter' });
    expect(setActiveTab).toHaveBeenCalledWith('education');
  });
});
