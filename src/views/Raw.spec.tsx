import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Raw } from './Raw';
import { useFormSelector } from '../redux/hooks';
import { getTimeline } from '../redux/timelineSelectors';

jest.mock('../redux/hooks');
jest.mock('../redux/timelineSelectors');
jest.mock('../components/AnimatedWrapFormItem', () => ({
  AnimatedWrapFormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Raw', () => {
  const mockTimeline = {
    someData: 'test',
    otherData: 123,
    nested: { val: true },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormSelector as jest.Mock).mockReturnValue(mockTimeline);
  });

  it('should render the timeline data as a JSON string', () => {
    render(<Raw />);

    const preElement = screen.getByText((content) => content.includes('"someData": "test"'));
    expect(preElement).toBeInTheDocument();
    expect(preElement.tagName).toBe('PRE');

    // Verify JSON formatting
    const content = preElement.textContent;
    expect(content).toContain('"someData": "test"');
    expect(content).toContain('"otherData": 123');
    expect(content).toContain('"nested": {');
    expect(content).toContain('"val": true');
  });

  it('should select timeline data from store', () => {
    render(<Raw />);
    expect(useFormSelector).toHaveBeenCalledWith(getTimeline);
  });

  it('should have the correct role on the container', () => {
    render(<Raw />);
    const container = screen.getByRole('raw-results');
    expect(container).toBeInTheDocument();
  });
});
