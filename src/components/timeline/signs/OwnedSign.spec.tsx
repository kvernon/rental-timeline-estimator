import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../../theming/IThemeOptions';
import { OwnedSign } from './OwnedSign';

describe('OwnedSign', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render', () => {
    render(<OwnedSign />);
    expect(screen.getByText('OWNED')).toBeInTheDocument();
  });

  test('should have style', () => {
    render(<OwnedSign />);

    const expectedStyle = `
      width: fit-content;
      font-family: font;
      font-size: 10px;
      font-weight: bold;
      background-color: rgb(0, 128, 0);
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

    expect(screen.getByText('OWNED')).toHaveStyle(expectedStyle);
  });
});
