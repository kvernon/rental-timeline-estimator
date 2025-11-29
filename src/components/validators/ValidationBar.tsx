import React from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { IThemeOptions } from '../../theming/IThemeOptions';

export interface IValidationBarProps {
  isValid: ValidatorTypes;

  /**
   * If true, the bar will be curved on the right side
   */
  curveRight?: boolean;
}

const Box = styled.div<{ validationColor: string; curveRight?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 10px;
  background-color: ${(props) => props.validationColor};
  mask-image: linear-gradient(to bottom, black, rgba(0, 0, 0, 0.2));
  border-top-right-radius: ${(props) => (props.curveRight ? '0.3rem' : '0')};
  border-bottom-right-radius: ${(props) => (props.curveRight ? '0.3rem' : '0')};
  transition: background-color 0.4s ease-out;
`;

export const ValidationBar = function (props: IValidationBarProps) {
  const option = useTheme() as IThemeOptions;
  const validatorType = ValidatorTypes[props.isValid];
  return (
    <Box
      title={validatorType}
      curveRight={Object.hasOwn(props, 'curveRight') ? props.curveRight : true}
      validationColor={option.palette.validation[validatorType].validationColor}
    />
  );
};
