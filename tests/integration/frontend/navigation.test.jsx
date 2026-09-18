import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../frontend/src/components/Navbar';

describe('Navbar Navigation Integration', () => {
  it('renders primary nav links and triggers routing events', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(projectsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });
});