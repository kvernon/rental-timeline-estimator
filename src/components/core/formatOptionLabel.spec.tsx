import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { formatOptionLabel } from './formatOptionLabel';
import { IPropertyDropDownOption } from './IPropertyDropDownOption';

expect.extend(matchers);

describe('formatOptionLabel layout and style checks', () => {
  test('returns PropertyImage with expected src/alt/title', () => {
    const opt: IPropertyDropDownOption = {
      label: 'Duplex',
      value: 2,
      image: '/path/duplex.png',
    };

    const node = formatOptionLabel(opt) as React.ReactElement;
    const { container } = render(<>{node}</>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/path/duplex.png');
    expect(img).toHaveAttribute('alt', 'Duplex');
    expect(img).toHaveAttribute('title', 'Duplex');

    // PropertyImage style assertions
    expect(img).toHaveStyleRule('padding', '0');
  });
});
