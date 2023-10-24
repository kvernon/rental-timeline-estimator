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
import { Input } from '../core/input';

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

const InputLocal = styled(Input)<{
  themeOptions: IThemeOptions;
  validationType: ValidatorTypes;
  id: string;
  fontGroup?: FontGroups;
  useTransparent: boolean;
}>`
  font-family: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.font};
  font-size: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.size};
  font-weight: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.weight};
  color: ${(coreTheme) => coreTheme.themeOptions.typography.get(coreTheme.fontGroup ?? FontGroups.input)?.color};

  ${(coreTheme) =>
    !coreTheme.useTransparent &&
    `
     background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background}41;

     &:hover {
        background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
     }

     &:focus {
        background-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus}81;
     }
  `}

  ${(coreTheme) =>
    coreTheme.useTransparent &&
    `
     background-color: transparent;
     border-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].background};

     &:hover {
        border-color: ${coreTheme.themeOptions.palette.validation[ValidatorTypes[coreTheme.validationType]].backgroundFocus};
     }
   `}
`;

const SpanPaddingLeft = styled.span<{
  themeOptions: IThemeOptions;
  fontGroup?: FontGroups;
}>`
  font-family: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.weight};
  line-height: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.lineHeight};
  letter-spacing: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.letterSpacing};
  color: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.color};
  margin: 0;
  padding: ${(props) => (props.title ? '5.5px 7px' : '7px')};
  display: inline-flex;
`;

const InputLabel = styled.label<{
  themeOptions: IThemeOptions;
  direction?: 'row' | 'column';
  fontGroup?: FontGroups;
}>`
  font-family: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.weight};
  line-height: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.lineHeight};
  letter-spacing: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.letterSpacing};
  text-shadow: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.textShadow};
  display: flex;
  color: ${(props) => props.themeOptions.typography.get(props.fontGroup ?? FontGroups.inputLabel)?.color};
  white-space: ${(props) => (props.fontGroup === FontGroups.inputLabel ? 'nowrap' : 'normal')};
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
        <InputLabel
          themeOptions={coreTheme}
          direction={props.direction}
          fontGroup={props.inputLabelFontGroup ?? FontGroups.inputLabel}
          htmlFor={`TextFieldValidator${props.id}`}
        >
          {props.title}
        </InputLabel>
      )}
      <Box id={`${rangeFieldId}-box`}>
        {props.prefix && (
          <SpanPaddingLeft themeOptions={coreTheme} className="prefix" fontGroup={props.inputFontGroup ?? FontGroups.input} title={props.title}>
            {props.prefix}
          </SpanPaddingLeft>
        )}
        <InputLocal
          hasSpinner={props.hasSpinner}
          useUnderlineOnly={props.useUnderlineOnly}
          useTransparent={!!props.useTransparent}
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
          fontGroup={props.inputFontGroup}
          id={inputValueName}
          type="number"
          min={props.min}
          max={props.max}
          title={message}
        />
        <input type={'hidden'} {...register(inputValidationResultName)} />
        {props.suffix && (
          <SpanPaddingLeft
            themeOptions={coreTheme}
            fontGroup={props.inputFontGroup ?? props.inputLabelFontGroup ?? FontGroups.inputLabel}
            className="suffix"
            title={props.title}
          >
            {props.suffix}
          </SpanPaddingLeft>
        )}
      </Box>
    </FormControl>
  );
};
