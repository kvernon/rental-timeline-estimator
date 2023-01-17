import React, { useEffect } from 'react';
import { ValidationBar } from './ValidationBar';
import { IValidatorPanelProps } from './IValidatorPanelProps';
import { useStackProviderStore } from './ValidatorStackProvider';
import { ValidatorTypes } from './ValidatorTypes';
import styled from '@emotion/styled';

interface IStackProps {
  paddingBottom?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  direction?: 'column' | 'row';
  spacing?: number;
  flexGrow?: number;
}

const Stack = styled.div((props: IStackProps) => ({
  display: 'flex',
  flexDirection: props.direction || 'column',
  flexGrow: props.flexGrow,
  flex: props.spacing,
  paddingBottom: props.paddingBottom || '2px',
  paddingTop: props.paddingTop || '2px',
  paddingLeft: props.paddingLeft || '2px',
  paddingRight: props.paddingRight || '2px',
}));

export const ValidatorStack = function (props: IValidatorPanelProps) {
  const ctx = useStackProviderStore();
  let isValid: ValidatorTypes = ctx.areValidateResults(props.id, props.panelValidatorStackType);

  useEffect(
    () => useStackProviderStore.subscribe((provider) => (isValid = provider.areValidateResults(props.id, props.panelValidatorStackType))),
    [ctx.entities],
  );

  return (
    <Stack id={'validation-panel-stack'} direction="row">
      <Stack spacing={2} id={props.id} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
        {props.children}
      </Stack>
      <ValidationBar isValid={isValid} />
    </Stack>
  );
};
