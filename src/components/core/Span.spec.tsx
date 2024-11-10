import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ISpanProps, Span } from './Span';

describe('Span unit tests', () => {
  describe('and with defaults', () => {
    beforeEach(() => {
      render(<Span>bacon</Span>);
    });

    test('should render', () => {
      const entity = screen.getByText<HTMLHeadingElement>('bacon');

      const expectedStyle = `
        display: flex;
        width: 100%;
        padding: 0px 0px 0px 2px;
        margin-bottom: 0;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
  describe('and with values', () => {
    let props: ISpanProps;
    beforeEach(() => {
      props = {
        flexGrow: 2,
        marginBottom: '30px',
        spacing: 10,
        paddingBottom: '1px',
        paddingRight: '2px',
        paddingLeft: '3px',
        paddingTop: '4px',
        direction: 'row',
      };
      render(<Span {...props}>bacon</Span>);
    });

    test('should render', () => {
      const entity = screen.getByText<HTMLHeadingElement>('bacon');

      const expectedStyle = `
        display: flex;
        width: 100%;
        padding: ${props.paddingTop} ${props.paddingRight} ${props.paddingBottom} ${props.paddingLeft} ;
        margin-bottom: ${props.marginBottom} ;
      `;

      expect(entity).toHaveStyle(expectedStyle);
    });
  });
});
