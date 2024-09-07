import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { NavList } from './NavList';
import { INavListProps } from './INavListProps';

jest.mock('./NavButton');

describe('NavList unit tests', () => {
  let props: INavListProps;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    props = {
      title: 'Navigation',
      navList: [
        { title: 'one', isSelected: true, isDisabled: false },
        { title: 'two', isSelected: true, isDisabled: false },
      ],
      onClick: jest.fn(),
    };

    render(<NavList {...props} />);
  });

  test('should render nav', () => {
    const entity = screen.getByLabelText<HTMLUListElement>('Navigation');

    const expectedStyle = `
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        list-style-type: none;
      `;

    expect(entity).toHaveStyle(expectedStyle);
  });

  test('should render nav button one', () => {
    const entity = screen.getByText<HTMLLIElement>('one');

    expect(entity).toBeInTheDocument();
  });

  test('should render nav button two', () => {
    const entity = screen.getByText<HTMLLIElement>('two');

    expect(entity).toBeInTheDocument();
  });

  describe('and interaction', () => {
    describe('and one Click', () => {
      test('should pass title', () => {
        const entity = screen.getByText<HTMLLIElement>('one');

        fireEvent.click(entity);

        expect(props.onClick).toHaveBeenCalledWith(
          'one',
          [...props.navList].map((x, i) => {
            x.isSelected = i === 0;
            return x;
          }),
        );
      });
    });

    describe('and button two', () => {
      test('should pass title', () => {
        const entity = screen.getByText<HTMLLIElement>('two');

        fireEvent.click(entity);

        expect(props.onClick).toHaveBeenCalledWith(
          'two',
          [...props.navList].map((x, i) => {
            x.isSelected = i === 1;
            return x;
          }),
        );
      });
    });
  });
});
