import React from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theme';

export interface IValidationBarProps {
  isValid: ValidatorTypes;
}

const Box = styled.div<{ validationColor: string }>`
  display: flex;
  transition: background-color 0.4s ease-out;
  flex-direction: column;
  width: 10px;
  background-color: ${(props) => props.validationColor};
`;

export const ValidationBar = function (props: IValidationBarProps) {
  const option = useTheme() as IThemeOptions;
  const validatorType = ValidatorTypes[props.isValid];
  return <Box title={validatorType} validationColor={option.palette.validation[validatorType].validationColor} />;
};
