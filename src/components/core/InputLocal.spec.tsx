import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { InputLocal } from './InputLocal';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { themeMock, validationColorValidMiddle } from '../../../__tests__/ThemeMock';

expect.extend(matchers);

describe('InputLocal style checks', () => {
  test('applies typography styles from theme', () => {
    render(<InputLocal role="input-local" themeOptions={themeMock as any} validationType={ValidatorTypes.Valid} useTransparent={false} />);
    const el = screen.getByRole('input-local');
    expect(el).toHaveStyleRule('font-family', 'font');
    expect(el).toHaveStyleRule('font-size', '10px');
    expect(el).toHaveStyleRule('color', 'rgba(200, 0, 255, 0.247)');
  });

  test('non-transparent mode uses validation background and border colors including hover/focus', () => {
    render(<InputLocal role="input-local-nt" themeOptions={themeMock as any} validationType={ValidatorTypes.Valid} useTransparent={false} />);
    const el = screen.getByRole('input-local-nt');
    // default
    expect(el).toHaveStyleRule('background-color', `${validationColorValidMiddle}41`);
    expect(el).toHaveStyleRule('border', `3px solid ${validationColorValidMiddle}41`);

    // hover
    expect(el).toHaveStyleRule('border', `3px solid ${validationColorValidMiddle}`, { target: ':hover' });
    expect(el).toHaveStyleRule('background-color', `${validationColorValidMiddle}81`, { target: ':hover' });

    // focus
    expect(el).toHaveStyleRule('border', `3px solid ${validationColorValidMiddle}`, { target: ':focus' });
    expect(el).toHaveStyleRule('background-color', `${validationColorValidMiddle}81`, { target: ':focus' });
  });

  test('transparent mode uses transparent background and only border-color change on hover', () => {
    render(<InputLocal role="input-local-t" themeOptions={themeMock as any} validationType={ValidatorTypes.Invalid} useTransparent={true} />);
    const el = screen.getByRole('input-local-t');

    expect(el).toHaveStyleRule('background-color', 'transparent');
    expect(el).toHaveStyleRule('border-color', '#FF0000');
    expect(el).toHaveStyleRule('border-color', '#FF0000', { target: ':hover' });
  });
});
