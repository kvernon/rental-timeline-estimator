import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { IEventResult } from './IEventResult';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { FontGroups, IThemeOptions } from '../../theme';
import { useFormContext } from 'react-hook-form';
import { evaluateValidation } from './evaluatateValidation';
import { RangeFieldValidatorName } from './RangeFieldValidatorName';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-evenly;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  height: 43px;
`;

const FormControl = styled.div`
  display: flex;
  color: #ffffffff;
  flex-direction: ${(props: { direction?: 'row' | 'column' }) => props.direction || 'row'};
  margin: 5px 5px 24px 5px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &:last-child {
    margin: 5px;
  }
`;

export function RangeFieldValidator(props: IRangeFieldValidatorProps): React.ReactElement {
  const coreTheme = useTheme() as IThemeOptions;
  const { register, getValues, setValue } = useFormContext();

  const rangFieldId = RangeFieldValidatorName(props.id);
  const inputValue = `${rangFieldId}.value`;
  const inputValidationResult = `${rangFieldId}.validationResult`;

  const SpanPaddingLeft = styled.span`
    font-family: ${coreTheme.typography.get(FontGroups.inputLabel)?.font};
    font-size: ${coreTheme.typography.get(FontGroups.inputLabel)?.size};
    font-weight: ${coreTheme.typography.get(FontGroups.inputLabel)?.weight};
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    color: #a19fa8;
    margin: 0;
    padding: ${(props) => (props.title ? '5.5px 7px' : '7px')};
    display: inline-flex;
  `;

  const InputLabel = styled.label<{ direction?: 'row' | 'column' }>`
    font-family: ${coreTheme.typography.get(FontGroups.inputLabel)?.font};
    font-size: ${coreTheme.typography.get(FontGroups.inputLabel)?.size};
    font-weight: ${coreTheme.typography.get(FontGroups.inputLabel)?.weight};
    display: flex;
    color: #56afcc;
    white-space: nowrap;
    padding: 5px;
    transform: none;
    overflow: visible;
    align-self: ${(props) => (props.direction === 'column' ? 'flex-start' : 'center')};
    flex-grow: 2;

    &:focus {
      color: #9ee5ff;
    }
  `;

  const Input = styled.input<{ result: IEventResult<number> }>`
    display: flex;
    font-family: ${coreTheme.typography.get(FontGroups.input)?.font};
    font-size: ${coreTheme.typography.get(FontGroups.input)?.size};
    font-weight: ${coreTheme.typography.get(FontGroups.input)?.weight};
    text-align: right;
    color: ${coreTheme.typography.get(FontGroups.input)?.color};
    background-color: ${(props) => coreTheme.palette.validation[props.result.validationResultName].background}41;
    transition: background-color 0.4s ease-out;
    border-radius: 6px;
    border-width: 1px;
    flex-grow: 1;
    width: 100%;
    height: 59px;

    &:hover {
      background-color: ${(props) => coreTheme.palette.validation[props.result.validationResultName].backgroundFocus}81;
    }

    &:focus {
      background-color: ${(props) => coreTheme.palette.validation[props.result.validationResultName].backgroundFocus}81;
    }
  `;

  const isInRange = (value: number): ValidatorTypes => {
    return (props.min || 0) <= value && (props.max || 100) >= value ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
  };

  const [evaluated, setEvaluated] = useState(evaluateValidation(props.defaultValue as number, props.validationType, isInRange));

  const evaluateAndDispatch = (evt: { target?: number }): void => {
    const validation = evaluateValidation(evt.target as number, props.validationType, isInRange);

    const valueUpdate = { data: { ...props }, results: validation };
    valueUpdate.data.defaultValue = validation.value || undefined;

    if (props.onBlur) props.onBlur(validation);
  };

  const onBlur: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt): void => {
    const target = typeof evt.target.value === 'undefined' || evt.target.value === '' ? undefined : parseInt(evt.target.value);
    setValue(inputValue, target);
    const eventResult = evaluateValidation(target as number, props.validationType, isInRange);
    setValue(inputValidationResult, eventResult.validationResult);
    setEvaluated(eventResult);
    evaluateAndDispatch({
      target,
    });
  };

  useEffect(() => {
    const values = getValues(inputValue);
    const validationResult = evaluateValidation(values, props.validationType, isInRange);

    setEvaluated(validationResult);
    setValue(inputValidationResult, validationResult.validationResult);
  }, [props.max, props.validationType, props.id, props.min, props.title, props.prefix, props.suffix]);

  const message = `Range between ${props.min || 0} and ${props.max || 100}`;

  return (
    <FormControl>
      {props.title && (
        <InputLabel direction={props.direction} htmlFor={`TextFieldValidator${props.id}`}>
          {props.title ? `${props.title}:` : props.title}
        </InputLabel>
      )}
      <Box>
        {props.prefix && (
          <SpanPaddingLeft className="prefix" title={props.title}>
            {props.prefix}
          </SpanPaddingLeft>
        )}
        <Input
          {...register(inputValue, {
            required: true,
            valueAsNumber: true,
            onBlur: (event) => onBlur(event),
            validate: (value) => {
              return evaluateValidation(value, props.validationType, isInRange).validationResult > 0;
            },
            min: {
              value: props.min || 0,
              message,
            },
            max: {
              value: props.max || 100,
              message,
            },
          })}
          result={evaluated}
          id={inputValue}
          name={inputValue}
          type="number"
          min={props.min}
          max={props.max}
          title={message}
        />
        {props.suffix && (
          <SpanPaddingLeft className="suffix" title={props.title}>
            {props.suffix}
          </SpanPaddingLeft>
        )}
      </Box>
    </FormControl>
  );
}
