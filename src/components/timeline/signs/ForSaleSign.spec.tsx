import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { ForSaleSign } from './ForSaleSign';

describe('ForSaleSign', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', () => {
    render(<ForSaleSign />);
    expect(screen.getByText('FOR SALE')).toBeInTheDocument();
  });

  test('should have style', () => {
    render(<ForSaleSign />);

    const expectedStyle = `
      width: fit-content;
      font-family: font;
      font-size: 10px;
      font-weight: bold;
      background-color: rgb(230, 230, 250);
      rotate: -10deg;
      position: relative;
      top: 125px;
      left: 125px;
      white-space: nowrap;
      min-width: auto;
      padding-left: 5px;
      padding-right: 5px;
      margin-top: 0;
    `;

    expect(screen.getByText('FOR SALE')).toHaveStyle(expectedStyle);
  });
});
