import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { ValidationPanel } from './ValidationPanel';
import { ValidatorTypes } from '../validators/ValidatorTypes';

describe('ValidationPanel unit tests', () => {
  const props: {
    title: string;
    validationType: ValidatorTypes;
    padRight?: boolean;
  } = {
    title: 'hello',
    validationType: ValidatorTypes.Valid,
    padRight: true,
  };

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    render(
      <ValidationPanel {...props}>
        <div></div>
      </ValidationPanel>,
    );
  });

  test('should render title', () => {
    const validationPanel = screen.getByText<HTMLDivElement>(props.title);

    expect(validationPanel).toBeInTheDocument();
  });
});
