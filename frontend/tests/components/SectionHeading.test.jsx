import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from '../../src/components/common/SectionHeading';

describe('SectionHeading Component', () => {
  it('renders title, badge, and subtitle correctly', () => {
    render(
      <SectionHeading
        badge="ACADEMICS"
        title="Educational Background"
        subtitle="Qualifications Overview"
      />
    );

    expect(screen.getByText(/ACADEMICS/i)).toBeInTheDocument();
    expect(screen.getByText(/Educational Background/i)).toBeInTheDocument();
    expect(screen.getByText(/Qualifications Overview/i)).toBeInTheDocument();
  });
});