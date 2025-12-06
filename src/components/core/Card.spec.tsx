import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { Card } from './Card';
import { themeMock } from '../../../__tests__/ThemeMock';

expect.extend(matchers);

describe('Card style checks', () => {
  test('applies gradient background, color, border and shadow', () => {
    render(<Card theme={themeMock as any} aria-label="card" />);
    const card = screen.getByLabelText('card');

    expect(card).toHaveStyleRule('background', 'linear-gradient(#7950C5, panelBackground 3px)');
    expect(card).toHaveStyleRule('color', 'rgba(200, 0, 255, 0.247)');
    expect(card).toHaveStyleRule('box-shadow', '0 10px 15px rgba(16, 27, 30, 0.4)');
    expect(card).toHaveStyleRule('border', '0.3rem solid black');
    expect(card).toHaveStyleRule('border-radius', '0.3rem');
  });
});
