import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { ValidationBar } from './ValidationBar';
import { IValidatorPanelProps } from './IValidatorPanelProps';
import { useStackProviderStore } from './ValidatorStackProvider';
import { ValidatorTypes } from './ValidatorTypes';

export const ValidatorStack = (props: IValidatorPanelProps) => {
  const ctx = useStackProviderStore();
  let isValid: ValidatorTypes = ctx.areValidateResults(props.id, props.panelValidatorStackType);

  useEffect(
    () => useStackProviderStore.subscribe((provider) => (isValid = provider.areValidateResults(props.id, props.panelValidatorStackType))),
    [ctx.entities],
  );

  return (
    <Stack id={'validation-panel-stack'} direction="row">
      <Stack
        spacing={2}
        id={props.id}
        flexGrow={1}
        sx={{
          paddingLeft: '25px',
          paddingTop: '25px',
          paddingBottom: '25px',
          paddingRight: '25px',
        }}
      >
        {props.children}
      </Stack>
      <ValidationBar isValid={isValid} />
    </Stack>
  );
};
