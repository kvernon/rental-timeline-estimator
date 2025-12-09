import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Street } from './Street';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';

describe('Street', () => {
  let addy: string;

  beforeEach(() => {
    addy = '123 main';
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  test('should render', () => {
    render(<Street address={addy} />);

    expect(screen.getByText(addy)).toBeInTheDocument();
  });

  test('should render with style', () => {
    render(<Street address={addy} />);

    const expectedStyle = `
      background-color: rgb(0, 128, 0);
      font-family: font;
      font-size: 10px;
      font-weight: normal;
      line-height: 1.4375em;
      border: 0.3rem solid white;
      border-radius: 0.3rem;
      white-space: nowrap;
      min-width: auto;
      padding-left: 10px;
      padding-right: 15px;
      width: fit-content;
    `;

    expect(screen.getByText(addy)).toHaveStyle(expectedStyle);
  });
});
