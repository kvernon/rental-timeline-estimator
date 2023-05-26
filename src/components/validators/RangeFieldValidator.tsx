import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import { RangeFieldValidatorName } from '../naming/RangeFieldValidatorName';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { evaluateValidation, RuleEval } from './evaluatateValidation';
import styled from '@emotion/styled';
import { useWatcher } from '../hooks/useWatcher';
import { FontGroups } from '../../theming/fontGroups';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';

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
  flex-direction: ${(props: { direction?: 'row' | 'column' }) => {
    return props.direction ?? 'row';
  }};
  margin: 5px 5px 24px 5px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &:last-child {
    margin: 5px;
  }
`;

const toValidatorType = (stackType: ValidatorStackTypes): ValidatorTypes => {
  if (stackType === ValidatorStackTypes.Optional) {
    return ValidatorTypes.Optional;
  }

  return ValidatorTypes.Invalid;
};

const isInRange: RuleEval = (
  value: number,
  options: {
    min?: number;
    max?: number;
  },
): ValidatorTypes => {
  return (options?.min || 0) <= value && (options?.max || 100) >= value ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
};

const Input = styled.input<{
  themeOptions: IThemeOptions;
  validationType: ValidatorTypes;
  id: string;
}>`
  display: flex;
  font-family: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.input)?.font};
  font-size: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.input)?.size};
  font-weight: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.input)?.weight};
  text-align: right;
  color: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.input)?.color};
  background-color: ${(coreTheme) => coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background}41;
  transition: background-color 0.4s ease-out;
  border-radius: 0.3rem;
  border-width: 1px;
  flex-grow: 1;
  width: 100%;
  height: 59px;

  &:hover {
    background-color: ${(coreTheme) => coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
  }

  &:focus {
    background-color: ${(coreTheme) => coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
  }
`;

const SpanPaddingLeft = styled.span<{
  themeOptions: IThemeOptions;
}>`
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.weight};
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: #a19fa8;
  margin: 0;
  padding: ${(props) => (props.title ? '5.5px 7px' : '7px')};
  display: inline-flex;
`;

const InputLabel = styled.label<{
  themeOptions: IThemeOptions;
  direction?: 'row' | 'column';
}>`
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.weight};
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

export const RangeFieldValidator = (props: IRangeFieldValidatorProps) => {
  const coreTheme = useTheme() as IThemeOptions;

  const { register, setValue, formState, setFocus } = useFormContext();
  const [isFormValid, setIsFormValid] = useState<ValidatorTypes>(toValidatorType(props.validationType));
  const [inputValue, setInputValue] = useState<number | undefined>(props.defaultValue);
  const rangeFieldId = RangeFieldValidatorName(props.id);
  const inputValueName = `${rangeFieldId}.value`;
  const inputValidationResultName = `${rangeFieldId}.validationResult`;

  const [watcherResultsValues] = useWatcher<number>([inputValueName]);

  const message = `Range between ${props.min || 0} and ${props.max || 100}`;

  useEffect(() => {
    setValue(inputValueName, inputValue, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
    setValue(
      inputValidationResultName,
      evaluateValidation(props.validationType, isInRange, watcherResultsValues[0], {
        min: props.min,
        max: props.max,
      }).validationResult,
    );
    if (props.defaultValue) {
      setFocus(inputValueName);
    }
  }, []);

  useEffect(() => {
    const validation = evaluateValidation(props.validationType, isInRange, watcherResultsValues[0], {
      min: props.min,
      max: props.max,
    });

    if (validation.validationResult !== isFormValid) {
      setIsFormValid(validation.validationResult);
    }
    setValue(inputValidationResultName, validation.validationResult, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }, [watcherResultsValues, isFormValid, inputValidationResultName, rangeFieldId, props.max, props.min, props.validationType, setValue, formState]);

  const onUpdate = (newValue: number | undefined): void => {
    setValue(inputValueName, newValue);
    setInputValue(newValue);
    const eventResult = evaluateValidation(props.validationType, isInRange, newValue, {
      min: props.min,
      max: props.max,
    });
    setValue(inputValidationResultName, eventResult.validationResult);
    setIsFormValid(eventResult.validationResult);
  };

  return (
    <FormControl>
      {props.title && (
        <InputLabel themeOptions={coreTheme} direction={props.direction} htmlFor={`TextFieldValidator${props.id}`}>
          {props.title}
        </InputLabel>
      )}
      <Box>
        {props.prefix && (
          <SpanPaddingLeft themeOptions={coreTheme} className="prefix" title={props.title}>
            {props.prefix}
          </SpanPaddingLeft>
        )}
        <Input
          {...register(inputValueName, {
            value: props.defaultValue,
            required: false,
            valueAsNumber: true,
            onBlur: (evt) => onUpdate(parseInt(evt.target.value)),
            onChange: (evt) => onUpdate(parseInt(evt.target.value)),
            validate: (value) => {
              return (
                evaluateValidation(props.validationType, isInRange, value, {
                  min: props.min,
                  max: props.max,
                }).validationResult > 0
              );
            },
            min: {
              value: props.min ?? 0,
              message,
            },
            max: {
              value: props.max ?? 100,
              message,
            },
          })}
          validationType={isFormValid}
          themeOptions={coreTheme}
          id={inputValueName}
          type="number"
          min={props.min}
          max={props.max}
          title={message}
        />
        <input type={'hidden'} {...register(inputValidationResultName)} />
        {props.suffix && (
          <SpanPaddingLeft themeOptions={coreTheme} className="suffix" title={props.title}>
            {props.suffix}
          </SpanPaddingLeft>
        )}
      </Box>
    </FormControl>
  );
};
