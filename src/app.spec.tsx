import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';

describe('App unit tests', () => {
  describe('and App', () => {
    describe('and success', () => {
      test('should create', () => {
        render(<App />);
        expect(screen.getByText('hi')).toBeInTheDocument();
      });
    });
  });
});
