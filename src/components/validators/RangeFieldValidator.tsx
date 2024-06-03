import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import React, { useEffect, useState } from 'react';
import { ValidatorTypes } from './ValidatorTypes';
import { evaluateValidation } from './evaluatateValidation';
import { FontGroups } from '../../theming/fontGroups';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { InputLocal } from '../core/InputLocal';
import { InputSpanPaddingLeft } from '../core/InputSpanPaddingLeft';
import { InputLabel } from '../core/InputLabel';
import { FormControl } from '../core/FormControl';
import { InputBox } from '../core/InputBox';
import { toValidatorType } from './ToValidatorType';
import { isInRange } from './IsInRange';
import { formatName } from '../naming/FormatName';
import { FormatNames } from '../naming/FormatNames';

export const RangeFieldValidator = (props: IRangeFieldValidatorProps) => {
  const coreTheme = useTheme() as IThemeOptions;

  const [isFormValid, setIsFormValid] = useState<ValidatorTypes>(toValidatorType(props.validationType));
  const [inputValue, setInputValue] = useState<number | undefined>(props.defaultValue);
  const rangeFieldId = formatName(props.id, FormatNames.RangeFieldValidatorId);

  const message = `Range between ${props.min || 0} and ${props.max || 100}`;

  const onUpdate = (newValue: number | undefined): void => {
    if (newValue !== inputValue) {
      setInputValue(newValue);

      const eventResult = evaluateValidation(props.validationType, isInRange, newValue, {
        min: props.min,
        max: props.max,
      });

      setIsFormValid(eventResult.validationResult);

      if (props.onChange) {
        props.onChange({
          id: rangeFieldId,
          value: newValue,
          ...eventResult,
        });
      }
    }
  };

  useEffect(() => {
    const isValidNew = evaluateValidation(props.validationType, isInRange, inputValue, {
      min: props.min,
      max: props.max,
    });

    if (isValidNew.validationResult !== isFormValid) {
      setIsFormValid(isValidNew.validationResult);
    }
  }, [inputValue, props.max, props.min, props.validationType, isFormValid]);

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
          <InputSpanPaddingLeft
            themeOptions={coreTheme}
            className="prefix"
            fontGroup={props.inputFontGroup ?? props.inputLabelFontGroup ?? FontGroups.inputLabel}
            title={props.title}
          >
            {props.prefix}
          </InputSpanPaddingLeft>
        )}
        <InputLocal
          hasSpinner={props.hasSpinner}
          useUnderlineOnly={props.useUnderlineOnly}
          useTransparent={!!props.useTransparent}
          onBlur={(evt) => onUpdate(parseInt(evt.target.value))}
          onChange={(evt) => onUpdate(parseInt(evt.target.value))}
          validationType={isFormValid}
          themeOptions={coreTheme}
          fontGroup={props.inputFontGroup}
          id={rangeFieldId}
          type="number"
          value={inputValue}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
          title={message}
        />
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
