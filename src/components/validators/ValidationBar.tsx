import React from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import { IsValid } from './IsValid';
import styled from '@emotion/styled';

export interface IValidationBarProps {
  isValid: ValidatorTypes;
}

const Box = styled.div`
  display: flex;
  transition: background-color 0.4s ease-out;
  flex-direction: column;
  width: 10px;
  background: ${(props: IValidationBarProps) => IsValid(props.isValid).color};
`;

export const ValidationBar = function (props: IValidationBarProps) {
  return <Box title={IsValid(props.isValid).title} isValid={props.isValid} />;
};
