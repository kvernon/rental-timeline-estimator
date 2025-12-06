import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { CardListLayout } from './CardListLayout';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { themeMock } from '../../../__tests__/ThemeMock';

expect.extend(matchers);

describe('CardListLayout layout and style checks', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  test('renders title and wraps children in padded Card with aria-label', () => {
    render(
      <CardListLayout title="My Title">
        <div data-testid="child">child</div>
      </CardListLayout>,
    );

    // header text
    expect(screen.getByText('My Title')).toBeInTheDocument();

    // inner card area labelled by title with padding override
    const card = screen.getByLabelText('My Title');
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyleRule('padding', '40px 40px 35px');

    // children rendered
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
