import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IRulesCollectionProps, RulesCollection } from './RulesCollection';
import { useTheme } from '@emotion/react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from '../validators/ValidatorTypes';

jest.mock('../core/CardListLayout');

describe('RulesCollection unit tests', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('should be setup with the basics', () => {
    let props: IRulesCollectionProps;

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
        values: [],
      };

      render(<RulesCollection {...props} />);
    });

    test('should render correctly', () => {
      expect(screen.getByRole('log')).toBeInTheDocument();
      expect(screen.getByLabelText(props.title)).toBeInTheDocument();
    });
  });

  describe('and values populated', () => {
    let props: IRulesCollectionProps;

    beforeEach(() => {
      props = {
        title: 'Rules Collection',
        values: [
          {
            title: { value: { value: 0, label: 'one' }, validationResult: ValidatorTypes.Valid },
            property: { value: { value: 0, label: 'apartment' }, validationResult: ValidatorTypes.Valid },
            range: { value: 0, validationResult: ValidatorTypes.Valid },
          },
        ],
      };

      render(<RulesCollection {...props} />);
    });

    test('should render correctly', () => {
      const ruleItemEntity = screen.getByLabelText(props.values[0].title?.value?.label as string);
      expect(ruleItemEntity).toBeInTheDocument();
    });
  });
});
