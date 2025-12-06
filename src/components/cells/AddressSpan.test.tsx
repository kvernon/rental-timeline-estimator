import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddressFormatted } from './AddressSpan';

describe('AddressFormatted', () => {
  it('renders with empty note and no image', () => {
    const { container } = render(<AddressFormatted />);

    expect(container.textContent?.trim()).toBe('');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders note without property image when no type tag present', () => {
    render(<AddressFormatted note="123 Main St" />);

    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders house image and cleans (SingleFamily) from note', async () => {
    render(<AddressFormatted note="123 Main St (SingleFamily)" />);

    const img = await screen.findByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src') || '').toContain('house.gif');

    // title/alt are set to the cleaned note (effect runs post-mount)
    expect(img.getAttribute('title') || '').toContain('123 Main St');
    expect(img.getAttribute('alt') || '').toContain('123 Main St');
  });

  it('renders apartment image and cleans (PassiveApartment) from note', async () => {
    render(<AddressFormatted note="456 Oak Ave (PassiveApartment)" />);

    const img = await screen.findByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src') || '').toContain('apartment.gif');
    expect(img.getAttribute('title') || '').toContain('456 Oak Ave');
    expect(img.getAttribute('alt') || '').toContain('456 Oak Ave');
  });
});
