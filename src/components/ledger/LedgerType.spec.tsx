import '@testing-library/jest-dom';
import { LedgerType } from './LedgerType';
import { render, screen } from '@testing-library/react';

describe('LedgerType', () => {
  it('has the correct enum values', () => {
    render(<LedgerType>hi</LedgerType>);

    const expectedStyle = `
        padding: 0px 0px 0px 2px;
      `;

    const el = screen.getByText('hi');
    expect(el).toHaveStyle(expectedStyle);
  });
});
