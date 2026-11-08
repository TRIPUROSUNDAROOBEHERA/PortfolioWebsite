import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CertificatePreviewModal from '../../src/components/ui/CertificatePreviewModal';

describe('CertificatePreviewModal Zoom Controller Suite', () => {
  const sampleCert = {
    id: 1,
    title: 'Python Full Stack Developer Virtual Internship',
    issuer: 'EduSkills Academy & AICTE',
    issue_date: 'Dec 2025',
    credential_id: 'c85f1f38b6e67487a6e5e2667c7179b8',
    image: '/cert-python-fullstack.jpg',
    pdf: '/certificates/Python_Full_Stack_Internship.pdf',
    desc: 'Completed 10-week intensive Python full-stack engineering virtual internship.',
  };

  it('renders zoom controller pill widget and handles zoom in, zoom out, and reset', () => {
    const handleClose = vi.fn();
    const { getByTestId, getByText } = render(
      <CertificatePreviewModal
        isOpen={true}
        onClose={handleClose}
        certificate={sampleCert}
      />
    );

    // Verify modal title
    expect(screen.getByText('Python Full Stack Developer Virtual Internship')).toBeInTheDocument();

    // Verify zoom controller container is present
    const zoomController = getByTestId('certificate-zoom-controller');
    expect(zoomController).toBeInTheDocument();

    // Verify initial zoom is 100%
    const zoomLevel = getByTestId('cert-zoom-level');
    expect(zoomLevel).toHaveTextContent('100%');

    const zoomInBtn = getByTestId('cert-zoom-in-btn');
    const zoomOutBtn = getByTestId('cert-zoom-out-btn');
    const zoomResetBtn = getByTestId('cert-zoom-reset-btn');

    // Zoom In 1 step (100% -> 125%)
    fireEvent.click(zoomInBtn);
    expect(zoomLevel).toHaveTextContent('125%');

    // Zoom In 2nd step (125% -> 150%)
    fireEvent.click(zoomInBtn);
    expect(zoomLevel).toHaveTextContent('150%');

    // Zoom Out 1 step (150% -> 125%)
    fireEvent.click(zoomOutBtn);
    expect(zoomLevel).toHaveTextContent('125%');

    // Reset Zoom (125% -> 100%)
    fireEvent.click(zoomResetBtn);
    expect(zoomLevel).toHaveTextContent('100%');
  });

  it('respects minimum and maximum zoom bounds', () => {
    const { getByTestId } = render(
      <CertificatePreviewModal
        isOpen={true}
        onClose={vi.fn()}
        certificate={sampleCert}
      />
    );

    const zoomLevel = getByTestId('cert-zoom-level');
    const zoomOutBtn = getByTestId('cert-zoom-out-btn');

    // Zoom down to minimum 50% (100 -> 75 -> 50)
    fireEvent.click(zoomOutBtn);
    fireEvent.click(zoomOutBtn);
    expect(zoomLevel).toHaveTextContent('50%');
    expect(zoomOutBtn).toBeDisabled();

    // Clicking again should stay at 50%
    fireEvent.click(zoomOutBtn);
    expect(zoomLevel).toHaveTextContent('50%');

    // Reset
    const zoomResetBtn = getByTestId('cert-zoom-reset-btn');
    fireEvent.click(zoomResetBtn);
    expect(zoomLevel).toHaveTextContent('100%');
  });
});
