import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { themeMock } from '../../../../__tests__/ThemeMock';
import { Header4 } from './Header4';

describe('Header4 unit tests', () => {
  describe('and with defaults', () => {
    beforeEach(() => {
      render(<Header4 theme={themeMock}>bacon</Header4>);
    });
    test('should render', () => {
      const entity = screen.getByText<HTMLHeadingElement>('bacon');

      const expectedStyle = `
        font-size: 10px;
        font-weight: normal;
        color: rgba(200, 0, 255, 0.247);
        margin: 0
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
