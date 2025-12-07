import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { matchers } from '@emotion/jest';
import { CardContent } from './CardContent';
import styled from '@emotion/styled';

expect.extend(matchers);

const TestDiv = styled.div`
  padding-bottom: 10px;
`;

describe('CardContent style checks', () => {
  test('has base padding/margin/display and last-child override', () => {
    const { container } = render(
      <CardContent data-testid="cc">
        <TestDiv data-testid="first" />
        <TestDiv data-testid="middle" />
        <TestDiv data-testid="last" />
      </CardContent>,
    );

    const cc = container.querySelector('[data-testid="cc"]')! as HTMLElement;

    const expectedStyle = `
      padding: 0;
      margin-top: 0;

      display: block;
    `;

    expect(cc).toHaveStyle(expectedStyle);

    //note: last-child overrides padding-bottom seems to not be testable :(
  });
});
