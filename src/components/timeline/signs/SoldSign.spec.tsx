import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { SoldSign } from './SoldSign';

describe('SoldSign', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', () => {
    render(<SoldSign />);
    expect(screen.getByText('SOLD')).toBeInTheDocument();
  });

  test('should have style', () => {
    render(<SoldSign />);

    const expectedStyle = `
      width: fit-content;
      font-family: font;
      font-size: 10px;
      font-weight: bold;
      white-space: nowrap;
      min-width: auto;
      margin-top: 0;
      background-color: rgb(255, 0, 0);
    `;

    expect(screen.getByText('SOLD')).toHaveStyle(expectedStyle);
  });
});
