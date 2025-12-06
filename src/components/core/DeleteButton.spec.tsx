import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { DeleteButton } from './DeleteButton';

expect.extend(matchers);

describe('DeleteButton', () => {
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<DeleteButton onClick={handleClick} />);

    const btn = screen.getByRole<HTMLDivElement>('delete-button');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies base and hover styles', () => {
    render(<DeleteButton />);

    const btn = screen.getByRole('delete-button');
    expect(btn).toHaveStyleRule('width', '45px');
    expect(btn).toHaveStyleRule('background', 'rgb(82, 6, 6)');
    expect(btn).toHaveStyleRule('cursor', 'pointer');
    expect(btn).toHaveStyleRule('border-top-right-radius', '0.3rem');
    expect(btn).toHaveStyleRule('border-bottom-right-radius', '0.3rem');
    // hover background changes
    expect(btn).toHaveStyleRule('background', 'rgb(126, 10, 10)', {
      target: ':hover',
    });
  });

  test('renders trash icon with expected styles', () => {
    render(<DeleteButton />);
    const icon = screen.getByTestId('trash-can-icon');
    expect(icon).toHaveStyleRule('color', 'red');
    expect(icon).toHaveStyleRule('transform', 'scale(1, 1.25)');
    expect(icon).toHaveStyleRule('box-shadow', '0 0 5px #2d0404');
  });
});
