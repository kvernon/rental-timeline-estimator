import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { InputBox } from './InputBox';

expect.extend(matchers);

describe('InputBox style checks', () => {
  test('has flex row layout and sizing styles', () => {
    render(<InputBox role="input-box" />);
    const box = screen.getByRole('input-box');
    expect(box).toHaveStyleRule('display', 'flex');
    expect(box).toHaveStyleRule('flex-direction', 'row');
    expect(box).toHaveStyleRule('align-content', 'space-evenly');
    expect(box).toHaveStyleRule('align-items', 'center');
    expect(box).toHaveStyleRule('width', '100%');
    expect(box).toHaveStyleRule('flex-grow', '1');
  });
});
