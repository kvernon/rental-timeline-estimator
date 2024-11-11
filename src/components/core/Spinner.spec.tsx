import React from 'react';
import { configure, render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner unit tests', () => {
  beforeEach(() => {
    configure({ testIdAttribute: 'id' });
  });
  test('should render with shape', () => {
    render(<Spinner role="spinner" shape={{ x: 1, width: 30, y: 2 }} />);

    const entity = screen.getByRole<HTMLDivElement>('spinner');

    expect(entity).toMatchSnapshot();
  });
  test('should render without shape', () => {
    render(<Spinner role="spinner" shape={{ x: undefined, width: undefined, y: undefined }} />);

    const entity = screen.getByRole<HTMLDivElement>('spinner');

    expect(entity).toMatchSnapshot();
  });
});
