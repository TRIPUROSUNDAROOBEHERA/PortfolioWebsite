import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectDetails from '../../src/pages/public/ProjectDetails';

describe('ProjectDetails Page Component', () => {
  it('renders project detail view for given route param', () => {
    const mockProject = {
      title: 'Portfolio Website & Content Management Suite',
      category: 'Full Stack Web App',
      tags: ['React', 'Django REST Framework'],
      desc: 'An end-to-end customizable portfolio architecture.',
      features: ['Authentication system', 'Dynamic CRUD tables'],
    };

    render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <Routes>
          <Route
            path="/projects/:id"
            element={<ProjectDetails project={mockProject} setActiveTab={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Portfolio Website & Content Management Suite/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Features/i)).toBeInTheDocument();
  });
});