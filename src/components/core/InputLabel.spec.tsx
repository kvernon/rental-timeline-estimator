import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { InputLabel } from './InputLabel';
import { themeMock } from '../../../__tests__/ThemeMock';
import { FontGroups } from '../../theming/fontGroups';

expect.extend(matchers);

describe('InputLabel style checks', () => {
  test('applies theme-driven typography and default layout styles', () => {
    render(
      <InputLabel themeOptions={themeMock} role="input-label">
        Label
      </InputLabel>,
    );
    const el = screen.getByRole('input-label');

    expect(el).toHaveStyleRule('display', 'flex');
    expect(el).toHaveStyleRule('padding', '5px');

    // Typography from theme mock
    expect(el).toHaveStyleRule('font-family', 'font');
    expect(el).toHaveStyleRule('font-size', '10px');
    expect(el).toHaveStyleRule('color', 'rgba(200, 0, 255, 0.247)');

    // Default direction is row -> align-self center
    expect(el).toHaveStyleRule('align-self', 'center');

    // Default white-space when fontGroup not inputLabel is normal
    expect(el).toHaveStyleRule('white-space', 'normal');

    // Focus style
    expect(el).toHaveStyleRule('color', '#9ee5ff', { target: ':focus' });
  });

  test('align-self switches to flex-start when direction is column', () => {
    render(
      <InputLabel themeOptions={themeMock} direction="column" role="input-label-col">
        Label
      </InputLabel>,
    );
    const el = screen.getByRole('input-label-col');
    expect(el).toHaveStyleRule('align-self', 'flex-start');
  });

  test('white-space is nowrap when fontGroup is inputLabel', () => {
    render(
      <InputLabel themeOptions={themeMock} fontGroup={FontGroups.inputLabel} role="input-label-nowrap">
        Label
      </InputLabel>,
    );
    const el = screen.getByRole('input-label-nowrap');
    expect(el).toHaveStyleRule('white-space', 'nowrap');
  });
});
