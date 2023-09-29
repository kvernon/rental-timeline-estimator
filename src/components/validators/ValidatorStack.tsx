import React from 'react';
import { ValidationBar } from './ValidationBar';
import { IValidatorPanelProps } from './IValidatorPanelProps';
import { Stack } from '../core/Stack';
import { ValidatorStackName } from '../naming/ValidatorStackName';
import { useValidationChildren } from '../hooks/useValidationChildren';

export const ValidatorStack = function (props: IValidatorPanelProps) {
  const id = ValidatorStackName(props.id);

  const { isValid } = useValidationChildren(props.panelValidatorStackType, props.children);

  return (
    <Stack id={id} direction="row">
      <Stack spacing={2} id={props.id} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
        {props.children}
      </Stack>
      <ValidationBar isValid={isValid} />
    </Stack>
  );
};
