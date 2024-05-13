import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import { RangeFieldValidatorName } from '../naming/RangeFieldValidatorName';
import { evaluateValidation } from './evaluatateValidation';
import { useWatcher } from '../hooks/useWatcher';
import { FontGroups } from '../../theming/fontGroups';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { FormControl } from '../core/FormControl';
import { InputBox } from '../core/InputBox';
import { InputSpanPaddingLeft } from '../core/InputSpanPaddingLeft';
import { InputLocal } from '../core/InputLocal';
import { InputLabel } from '../core/InputLabel';
import { toValidatorType } from './ToValidatorType';
import { isInRange } from './IsInRange';

export const RangeFieldValidatorState = (props: IRangeFieldValidatorProps) => {
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
      <InputBox id={`${rangeFieldId}-box`}>
        {props.prefix && (
          <InputSpanPaddingLeft themeOptions={coreTheme} className="prefix" fontGroup={props.inputFontGroup ?? FontGroups.input} title={props.title}>
            {props.prefix}
          </InputSpanPaddingLeft>
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
          <InputSpanPaddingLeft
            themeOptions={coreTheme}
            fontGroup={props.inputFontGroup ?? props.inputLabelFontGroup ?? FontGroups.inputLabel}
            className="suffix"
            title={props.title}
          >
            {props.suffix}
          </InputSpanPaddingLeft>
        )}
      </InputBox>
    </FormControl>
  );
};
