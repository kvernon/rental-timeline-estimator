import React from 'react';
import { App } from '../src/app';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('App unit tests', () => {
  describe('and App', () => {
    describe('and success', () => {
      test('should create', async () => {
        render(<App />);

        expect(screen.getByText('Hi', {})).toBeInTheDocument();
      });
    });
  });
});
