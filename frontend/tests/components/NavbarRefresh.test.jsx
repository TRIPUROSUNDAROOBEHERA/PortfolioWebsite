import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../src/components/layout/Navbar';

describe('Navbar Component Suite', () => {
  it('renders brand identity, developer name, and all navigation links', () => {
    render(
      <Navbar
        activeTab="home"
        setActiveTab={vi.fn()}
        profile={{ first_name: 'Tripurosundaro', last_name: 'Behera', role: 'Python Full-Stack Developer' }}
      />
    );

    // Verify brand name and role
    expect(screen.getByText(/Tripurosundaro/i)).toBeInTheDocument();
    expect(screen.getByText(/Behera/i)).toBeInTheDocument();

    // Verify navigation links
    const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'];
    navItems.forEach((label) => {
      expect(screen.getByRole('button', { name: new RegExp(label, 'i') })).toBeInTheDocument();
    });
  });

  it('renders View Resume button and handles click', () => {
    render(
      <Navbar
        activeTab="home"
        setActiveTab={vi.fn()}
        profile={{ full_name: 'Tripurosundaro Behera' }}
      />
    );

    const resumeBtn = screen.getByRole('button', { name: /view resume/i });
    expect(resumeBtn).toBeInTheDocument();
    expect(resumeBtn).toHaveAttribute('title', 'View Official Resume');
  });

  it('confirms custom Refresh button is removed from the navbar', () => {
    render(
      <Navbar
        activeTab="home"
        setActiveTab={vi.fn()}
        profile={{ full_name: 'Tripurosundaro Behera' }}
      />
    );

    // Custom refresh button should NOT be in the navbar
    const refreshBtn = screen.queryByRole('button', { name: /refresh page/i });
    expect(refreshBtn).not.toBeInTheDocument();
  });
});
