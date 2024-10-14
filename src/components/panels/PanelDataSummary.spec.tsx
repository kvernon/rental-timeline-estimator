import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { PanelDataSummary } from './PanelDataSummary';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';

describe('PanelDataSummary unit tests', () => {
  const props: {
    title: string;
    data: string;
  } = {
    title: 'hello',
    data: '1',
  };

  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    render(<PanelDataSummary {...props} />);
  });

  test('should render title', () => {
    const panelDataSummary = screen.getByText<HTMLDivElement>(props.title);

    expect(panelDataSummary).toBeInTheDocument();
  });

  test('should render data', () => {
    const panelDataSummary = screen.getByText<HTMLDivElement>(props.data);

    expect(panelDataSummary).toBeInTheDocument();
  });
});
