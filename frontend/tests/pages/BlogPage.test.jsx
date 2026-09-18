import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogPage from '../../src/pages/public/BlogPage';
import blogApi from '../../src/api/blogApi';

vi.mock('../../src/api/blogApi', () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve([])),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('BlogPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders blog heading and initial articles', () => {
    render(
      <BrowserRouter>
        <BlogPage setActiveTab={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Blog & Articles/i })).toBeInTheDocument();
  });
});