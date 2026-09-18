import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../src/components/common/Card';

describe('Card Component', () => {
  it('renders children content inside wrapper', () => {
    render(
      <Card>
        <p>Academic Project Details</p>
      </Card>
    );
    expect(screen.getByText('Academic Project Details')).toBeInTheDocument();
  });
});