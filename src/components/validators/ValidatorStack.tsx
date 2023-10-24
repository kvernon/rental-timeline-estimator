import React, { useEffect } from 'react';
import { ValidationBar } from './ValidationBar';
import { IValidatorPanelProps } from './IValidatorPanelProps';
import { Stack } from '../core/Stack';
import { ValidatorStackName } from '../naming/ValidatorStackName';
import { useStackValidationChildren } from '../hooks/useStackValidationChildren';

export const ValidatorStack = function (props: IValidatorPanelProps) {
  const { isValid } = useStackValidationChildren(props.panelValidatorStackType, props.children);

  useEffect(() => {
    console.log('ValidatorStack', isValid);
  }, [isValid]);

  return (
    <Stack id={ValidatorStackName(props.id)} direction="row">
      <Stack spacing={2} id={props.id} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
        {props.children}
      </Stack>
      <ValidationBar isValid={isValid} />
    </Stack>
  );
};
