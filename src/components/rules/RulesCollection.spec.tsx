import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IRulesCollectionProps, RulesCollection } from './RulesCollection';
import { Theme } from '@emotion/react';

jest.mock('../core/CardListLayout');
jest.mock('@emotion/react', () => {
  const requireActual = jest.requireActual('@emotion/react');
  const useTheme: jest.MockedFn<() => Theme> = jest.fn();
  return {
    ...requireActual,
    useTheme,
  };
});

describe('RulesCollection unit tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRulesCollectionProps;

    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
      };

      render(<RulesCollection {...props} />);
    });

    test('should render correctly', () => {
      expect(screen.getByLabelText(props.title)).toBeInTheDocument();
    });
  });
});
