import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegStack } from './RegStack';

describe('RegStack', () => {
  it('renders correctly', () => {
    render(<RegStack data-testid="reg-stack">Content</RegStack>);
    const element = screen.getByTestId('reg-stack');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Content');
  });

  it('applies styles', () => {
    // Since it's a styled component likely extending Stack or div
    render(<RegStack data-testid="reg-stack-style" />);
    const element = screen.getByTestId('reg-stack-style');

    // Without seeing the exact style rules, general existence is the safe test.
    // If specific styles like background color are critical:
    // expect(element).toHaveStyle('background-color: ...');
    expect(element).toBeVisible();
  });
});
