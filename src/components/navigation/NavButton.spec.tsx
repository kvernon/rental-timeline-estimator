import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { NavButton } from './NavButton';
import { INavButtonProps } from './INavButtonProps';

describe('NavButton unit tests', () => {
  let props: INavButtonProps;

  beforeEach(() => {
    props = {
      title: 'title',
      onClick: jest.fn(),
    };

    render(<NavButton {...props} />);
  });

  describe('NavButton unit tests', () => {
    test('should render', () => {
      const entity = screen.getByText<HTMLDivElement>('title');

      const expectedStyle = `
        padding: 0;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });

  describe('and click', () => {
    test('should return title', () => {
      const entity = screen.getByText<HTMLDivElement>('title');

      fireEvent.click(entity);

      expect(props.onClick).toHaveBeenCalledWith('title');
    });
  });
});
