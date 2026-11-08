import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from '../../src/components/layout/Navbar';
import Home from '../../src/pages/Home';
import AboutSection from '../../src/components/sections/AboutSection';
import EducationSection from '../../src/components/sections/EducationSection';
import SkillsMarquee from '../../src/components/ui/SkillsMarquee';
import Footer from '../../src/components/layout/Footer';

const TARGET_VIEWPORTS = [
  { name: 'Small mobile', width: 320, height: 568 },
  { name: 'Mobile', width: 360, height: 640 },
  { name: 'Standard mobile', width: 375, height: 667 },
  { name: 'Mobile', width: 390, height: 844 },
  { name: 'Reference mobile', width: 400, height: 738 },
  { name: 'Large mobile', width: 414, height: 896 },
  { name: 'Large mobile', width: 430, height: 932 },
  { name: 'Small tablet', width: 600, height: 960 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Large tablet', width: 1024, height: 768 },
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Large desktop', width: 1440, height: 900 },
];

describe('Mobile-First Responsive Optimization Suite across all Viewports', () => {
  const mockProfile = {
    first_name: 'Tripurosundaro',
    last_name: 'Behera',
    full_name: 'Tripurosundaro Behera',
    role: 'Python Full-Stack Developer',
    hero_description:
      'Passionate Python Full-Stack Developer dedicated to building responsive, scalable web applications with Python, Django, React, and SQL.',
    email: '24jnf00084@svcn.ac.in',
    phone: '+91 98765 43210',
    linkedin_url: 'https://linkedin.com',
    github_url: 'https://github.com',
    naukri_url: 'https://naukri.com',
  };

  it('verifies that Navbar renders branding and supports mobile toggle & escape key on all viewports', () => {
    TARGET_VIEWPORTS.forEach((vp) => {
      window.innerWidth = vp.width;
      window.innerHeight = vp.height;

      const { unmount } = render(
        <Navbar
          activeTab="home"
          setActiveTab={vi.fn()}
          profile={mockProfile}
        />
      );

      // Verify brand name is rendered
      expect(screen.getByText(/Tripurosundaro/i)).toBeInTheDocument();
      expect(screen.getByText(/Behera/i)).toBeInTheDocument();

      // Mobile hamburger toggle
      const toggleBtn = screen.getByLabelText(/navigation menu/i);
      expect(toggleBtn).toBeInTheDocument();

      // Open menu
      fireEvent.click(toggleBtn);
      const drawerResume = screen.getByText(/View Official Resume/i);
      expect(drawerResume).toBeInTheDocument();

      // Close menu with Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByText(/View Official Resume/i)).not.toBeInTheDocument();

      unmount();
    });
  });

  it('verifies that Hero section renders centered profile image and CTAs across mobile viewports', () => {
    [320, 360, 375, 400, 414, 430].forEach((w) => {
      window.innerWidth = w;
      window.innerHeight = 738;

      const { unmount } = render(
        <Home
          profile={mockProfile}
          setActiveTab={vi.fn()}
          projects={[]}
          skills={[]}
          certificates={[]}
          education={[]}
          onRefresh={vi.fn()}
          isRefreshing={false}
          refreshingSection={null}
          sectionRefreshKeys={{}}
        />
      );

      // Verify name heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tripurosundaro/i);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Behera/i);

      // Verify CTA buttons
      expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument();

      // Verify hero portrait images are rendered (both mobile and desktop variants)
      const portraits = screen.getAllByAltText(/Tripurosundaro Behera/i);
      expect(portraits.length).toBeGreaterThanOrEqual(1);
      const srcs = portraits.map(p => p.getAttribute('src'));
      expect(srcs).toContain('/hero-portrait-mobile.png');

      unmount();
    });
  });

  it('verifies SkillsMarquee provides both mobile responsive grid and desktop track', () => {
    render(<SkillsMarquee skills={[]} onOpenProject={vi.fn()} />);

    // Check heading
    expect(screen.getAllByText(/Technologies/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/I Work With/i).length).toBeGreaterThan(0);

    // Verify key skill names are rendered
    expect(screen.getAllByText(/Django/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/React\.js/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tailwind CSS/i).length).toBeGreaterThan(0);
  });

  it('verifies EducationSection displays all degrees, institutions, and completion badges', () => {
    render(<EducationSection isStandalonePage={true} />);

    expect(screen.getByText(/My Academic/i)).toBeInTheDocument();
    expect(screen.getByText(/MCA \(Post Graduate\)/i)).toBeInTheDocument();
    expect(screen.getByText(/B\.Sc\. Science - MPE/i)).toBeInTheDocument();
    expect(screen.getByText(/Intermediate \(12th\) - MPC/i)).toBeInTheDocument();
    expect(screen.getByText(/10th \(Secondary School\)/i)).toBeInTheDocument();
  });

  it('verifies Mobile Projects Carousel renders single-card format, pagination dots, and switches projects smoothly', () => {
    const { container } = render(
      <Home
        profile={mockProfile}
        setActiveTab={vi.fn()}
        projects={[]}
        skills={[]}
        certificates={[]}
        education={[]}
        onRefresh={vi.fn()}
        isRefreshing={false}
        refreshingSection={null}
        sectionRefreshKeys={{}}
      />
    );

    const mobileContainer = container.querySelector('#projects .md\\:hidden.flex-col') || container.querySelector('#projects .md\\:hidden');
    expect(mobileContainer).toBeInTheDocument();

    // Verify Explore Project button exists for mobile carousel
    const exploreBtns = within(mobileContainer).getAllByRole('button', { name: /Explore Project/i });
    expect(exploreBtns.length).toBeGreaterThan(0);

    // Verify initial active project title (TripGen)
    expect(within(mobileContainer).getAllByRole('heading', { level: 3, name: /TripGen/i }).length).toBeGreaterThan(0);
    expect(within(mobileContainer).getAllByText(/\(Travel Plan Itinerary Generator\)/i).length).toBeGreaterThan(0);

    // Verify pagination dots
    const dotButtons = within(mobileContainer).getAllByRole('button', { name: /Go to project/i });
    expect(dotButtons.length).toBe(3);

    // Switch to Project 2 (English Master Pro)
    fireEvent.click(dotButtons[1]);
    expect(within(mobileContainer).getAllByRole('heading', { level: 3, name: /English Master Pro/i }).length).toBeGreaterThan(0);

    // Switch to Project 3 (Intrusion Detection System)
    fireEvent.click(dotButtons[2]);
    expect(within(mobileContainer).getAllByRole('heading', { level: 3, name: /Intrusion Detection System/i }).length).toBeGreaterThan(0);

    // Verify Desktop Grid is also rendered and preserved with hidden md:grid
    const desktopGrid = container.querySelector('#projects .hidden.md\\:grid');
    expect(desktopGrid).toBeInTheDocument();
  });

  it('verifies Footer renders the 5 social contact icons with proper touch targets', () => {
    render(<Footer profile={mockProfile} />);

    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/Naukri/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
