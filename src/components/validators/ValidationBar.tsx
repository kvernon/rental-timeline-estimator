import React from 'react';
import { Box } from '@mui/material';
import { ValidatorTypes } from './ValidatorTypes';
import { IsValid } from './IsValid';

const transition = 'background-color .4s ease-out';

export interface IValidationBarProps {
  isValid: ValidatorTypes;
}

export const ValidationBar = (props: IValidationBarProps) => {
  return (
    <Box
      title={IsValid(props.isValid).title}
      sx={{
        transition,
        flexDirection: 'column',
        width: '10px',
        background: IsValid(props.isValid).color,
      }}
    />
  );
};
