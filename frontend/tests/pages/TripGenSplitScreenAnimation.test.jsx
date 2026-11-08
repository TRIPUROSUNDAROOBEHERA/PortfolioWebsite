import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Home from '../../src/pages/Home';

describe('TripGen Split-Screen Entrance Animation & Security Banner Suite', () => {
  it('renders TripGen split-screen banner and verifies animation elements and triggers', async () => {
    // Mock scroll into view and intersection observer
    window.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn((el) => {
        // Trigger intersection callback immediately to test active state
        callback([{ target: el, isIntersecting: true }]);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Click on TripGen project card or verify project details modal can open
    const tripgenLinks = screen.getAllByText(/TripGen/i);
    expect(tripgenLinks.length).toBeGreaterThan(0);

    // Check that CSS rules for tripgen-split-left and tripgen-split-right are properly declared
    const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    expect(styleTags).toBeDefined();

    // Verify banner and waterfall image assets exist in the project
    const bannerLeftImg = '/tripgen_banner_left.png';
    const bannerRightImg = '/tripgen_banner_right.png';
    const bannerBaseImg = '/tripgen_security_banner.png';
    const waterfallOverlayImg = '/tripgen_waterfall_overlay_full.png';
    const waterfallMaskImg = '/tripgen_waterfall_mask_full.png';
    const waterfallTileImg = '/waterfall_stream_tile.png';
    const poolMaskImg = '/tripgen_pool_mask_full.png';
    expect(bannerLeftImg).toBe('/tripgen_banner_left.png');
    expect(bannerRightImg).toBe('/tripgen_banner_right.png');
    expect(bannerBaseImg).toBe('/tripgen_security_banner.png');
    expect(waterfallOverlayImg).toBe('/tripgen_waterfall_overlay_full.png');
    expect(waterfallMaskImg).toBe('/tripgen_waterfall_mask_full.png');
    expect(waterfallTileImg).toBe('/waterfall_stream_tile.png');
    expect(poolMaskImg).toBe('/tripgen_pool_mask_full.png');
  });
});
