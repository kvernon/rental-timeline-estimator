import React, { ChangeEventHandler, useEffect } from 'react';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { ValidatorTypes } from './ValidatorTypes';
import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { IEventResult } from './IEventResult';
import { IRangeFieldValidatorEntity } from './IRangeFieldValidatorEntity';
import { useStackProviderStore } from './ValidatorStackProvider';
import styled from '@emotion/styled';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-evenly;
  align-items: baseline;
  width: 100%;
  flex-grow: 1;
  height: 43px;
`;

const FormControl = styled.div`
  display: flex;
  color: #ffffffff;
  flex-direction: ${(props: { direction?: 'row' | 'column' }) => props.direction || 'row'};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 43px;
`;

const InputLabel = styled.label((props: { direction?: 'row' | 'column' }) => ({
  display: 'flex',
  color: '#56afcc',
  position: 'static',
  whiteSpace: 'nowrap',
  padding: '5px',
  transform: 'none',
  overflow: 'visible',
  alignSelf: props.direction === 'column' ? 'flex-start' : 'center',
  flexGrow: 2,
  '&:focus': {
    color: '#9EE5FF',
  },
}));

const SpanPaddingLeft = styled.span`
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

const Input = styled.input`
  text-align: right;
  color: #0a0a0a;
  background-color: #56afcc;
  border-color: #6ad8fd;
  border-radius: 6px;
  border-width: 1px 1px 5px 1px;
  flex-grow: 1;
  width: 100%;
  height: 43px;
'&:focus': {
  background-color: #9EE5FF;
},
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
    <FormControl>
      {props.title && (
        <InputLabel direction={inputValue.data.direction} htmlFor={`TextFieldValidator${inputValue.data.id}`}>
          {inputValue.data.title ? `${inputValue.data.title}:` : inputValue.data.title}
        </InputLabel>
      )}
      <Box>
        {prefixDom && (
          <SpanPaddingLeft className="prefix" title={inputValue.data.title}>
            {prefixDom}
          </SpanPaddingLeft>
        )}
        <Input
          id={`TextFieldValidator${inputValue.data.id}`}
          type="number"
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
