import React, { ChangeEventHandler, useEffect } from 'react';
import { Box, FormControl, Input, InputLabel, styled } from '@mui/material';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { ValidatorTypes } from './ValidatorTypes';
import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { IEventResult } from './IEventResult';
import { IRangeFieldValidatorEntity } from './IRangeFieldValidatorEntity';
import { useStackProviderStore } from './ValidatorStackProvider';

const SpanPaddingLeft = styled('span')`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: #a19fa8;
  margin: 0;
  padding: ${(props) => (props.title ? '5.5px 7px' : '7px')};
  display: inline-flex;
`;

export function RangeFieldValidator(props: IRangeFieldValidatorProps): React.ReactElement {
  const context = useStackProviderStore();

  const evaluate = (evt: { targetValue?: number }): IEventResult => {
    const validation: IEventResult = {
      validationResult: ValidatorTypes.Invalid,
      validationResultName: ValidatorTypes[ValidatorTypes.Invalid],
      value: evt.targetValue,
    };

    const isInRange = (value: number): ValidatorTypes => {
      return (props.min || 0) <= value && (props.max || 100) >= value ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
    };

    if (props.validationType === ValidatorStackTypes.Required) {
      validation.validationResult = evt.targetValue === undefined ? ValidatorTypes.Invalid : isInRange(evt.targetValue);
    } else {
      validation.validationResult = evt.targetValue === undefined ? ValidatorTypes.Optional : isInRange(evt.targetValue);
    }

    validation.validationResultName = ValidatorTypes[validation.validationResult];

    return validation;
  };

  const inputValue: IRangeFieldValidatorEntity = context.getEntityByKeys(props.stackId, props.id) || {
    data: { ...props },
    results: {
      value: props.defaultValue || undefined,
      validationResult: evaluate({ targetValue: props.defaultValue || undefined }).validationResult,
      validationResultName: evaluate({ targetValue: props.defaultValue || undefined }).validationResultName,
    },
  };

  const evaluateAndDispatch = (evt: { target?: number }): void => {
    const validation = evaluate({ targetValue: evt.target });

    const valueUpdate = { data: { ...props }, results: validation };
    valueUpdate.data.defaultValue = validation.value || undefined;

    context.updateCollectionEntity(valueUpdate);
    if (props.onChange) props.onChange(validation);
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement> = (evt): void => {
    if (evt.key !== 'Enter') return;

    evaluateAndDispatch({ target: evt.currentTarget.value === '' ? undefined : parseInt(evt.currentTarget.value) });
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt): void => {
    evaluateAndDispatch({
      target: typeof evt.target.value === 'undefined' || evt.target.value === '' ? undefined : parseInt(evt.target.value),
    });
  };

  useEffect(() => {
    evaluateAndDispatch({
      target: props.defaultValue,
    });
  }, []);

  const prefixDom = inputValue.data.prefix ? inputValue.data.prefix : undefined;
  const suffixDom = inputValue.data.suffix ? inputValue.data.suffix : undefined;
  return (
    <FormControl
      variant="standard"
      sx={{
        display: 'flex',
        color: '#FFFFFFFF',
        flexDirection: inputValue.data.direction || 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '43px',
      }}
    >
      {props.title && (
        <InputLabel
          htmlFor={`TextFieldValidator${inputValue.data.id}`}
          sx={{
            display: 'flex',
            color: '#FFFFFFFF',
            position: 'static',
            whiteSpace: 'nowrap',
            padding: '5px',
            transform: 'none',
            overflow: 'visible',
            alignSelf: inputValue.data.direction === 'column' ? 'flex-start' : 'center',
            flexGrow: 2,
            '&.Mui-focused': {
              color: '#6ad8fd',
            },
          }}
        >
          {inputValue.data.title ? `${inputValue.data.title}:` : inputValue.data.title}
        </InputLabel>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'space-evenly',
          alignItems: 'baseline',
          width: '100%',
          flexGrow: 1,
          height: '43px',
        }}
      >
        {prefixDom && (
          <SpanPaddingLeft className="prefix" title={inputValue.data.title}>
            {prefixDom}
          </SpanPaddingLeft>
        )}
        <Input
          id={`TextFieldValidator${inputValue.data.id}`}
          type="number"
          inputProps={{
            sx: {
              textAlign: 'right',
            },
          }}
          sx={{
            ...inputValue.data.sx,
            color: '#0a0a0a',
            backgroundColor: '#9EE5FF',
            borderColor: '#6ad8fd',
            borderRadius: '6px',
            borderWidth: '1px 1px 5px 1px',
            flexGrow: 1,
            width: '100%',
            height: '43px',
          }}
          onChange={onChange}
          onKeyUp={onKeyUp}
          defaultValue={inputValue.data.defaultValue ? inputValue.data.defaultValue : inputValue.data.min}
          value={inputValue.data.defaultValue}
          title={`Range between ${inputValue.data.min || 0} and ${inputValue.data.max || 100}`}
        />
        {suffixDom && (
          <SpanPaddingLeft className="suffix" title={inputValue.data.title}>
            {suffixDom}
          </SpanPaddingLeft>
        )}
      </Box>
    </FormControl>
  );
}
