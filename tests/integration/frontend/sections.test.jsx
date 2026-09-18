import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectsSection from '../../../frontend/src/components/ProjectsSection';

describe('Frontend Sections Integration', () => {
  const mockProjects = [
    {
      id: 1,
      title: 'Distributed Cloud Architecture',
      slug: 'distributed-cloud',
      description: 'High throughput data pipeline',
      tech_stack: ['Django', 'PostgreSQL', 'Docker'],
    },
  ];

  it('renders project list data accurately onto card components', () => {
    render(
      <MemoryRouter>
        <ProjectsSection projects={mockProjects} />
      </MemoryRouter>
    );

    expect(screen.getByText('Distributed Cloud Architecture')).toBeInTheDocument();
    expect(screen.getByText('High throughput data pipeline')).toBeInTheDocument();
  });
});