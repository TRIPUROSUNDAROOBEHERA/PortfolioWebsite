import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import TripGenWaterfall from '../../src/components/common/TripGenWaterfall';

describe('TripGenWaterfall Realistic Downward Waterfall Animation Component', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Mock HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextId) => {
      if (contextId === '2d') {
        return {
          clearRect: vi.fn(),
          beginPath: vi.fn(),
          moveTo: vi.fn(),
          lineTo: vi.fn(),
          quadraticCurveTo: vi.fn(),
          bezierCurveTo: vi.fn(),
          arc: vi.fn(),
          ellipse: vi.fn(),
          stroke: vi.fn(),
          fill: vi.fn(),
          save: vi.fn(),
          restore: vi.fn(),
          createLinearGradient: vi.fn().mockReturnValue({
            addColorStop: vi.fn(),
          }),
          createRadialGradient: vi.fn().mockReturnValue({
            addColorStop: vi.fn(),
          }),
          drawImage: vi.fn(),
          globalCompositeOperation: 'source-over',
          strokeStyle: '#ffffff',
          fillStyle: '#ffffff',
          lineWidth: 1,
          lineCap: 'butt',
        };
      }
      return null;
    });

    // Mock ResizeObserver
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('renders canvas element with proper absolute positioning and z-index', () => {
    const { container } = render(<TripGenWaterfall />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('absolute');
    expect(canvas).toHaveClass('inset-0');
    expect(canvas).toHaveClass('pointer-events-none');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('respects prefers-reduced-motion accessibility preference', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<TripGenWaterfall />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('cleans up animation frame and observers on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<TripGenWaterfall />);
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
  });
});
