import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/public/Home';

describe('Home Page Full Render', () => {
  it('renders primary branding and sections without crashing', () => {
    const mockProfile = {
      full_name: 'S. Ram Kumar',
      role: 'MCA Graduate | Software Developer',
      bio: 'Passionate full stack developer.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    };

    render(
      <BrowserRouter>
        <Home profile={mockProfile} setActiveTab={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/S\. Ram/i);
    expect(screen.getByRole('button', { name: /View My Work/i })).toBeInTheDocument();
  });
});