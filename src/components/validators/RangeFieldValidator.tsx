import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FormControl } from '../core/FormControl';
import { InputLabel } from '../core/InputLabel';
import { ValidatorTypes } from './ValidatorTypes';
import React from 'react';
import { InputSpanPaddingLeft } from '../core/InputSpanPaddingLeft';
import { InputBox } from '../core/InputBox';
import { InputLocal } from '../core/InputLocal';
import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { FontGroups } from '../../theming/fontGroups';

export function RangeFieldValidator(props: IRangeFieldValidatorProps) {
  const coreTheme = useTheme() as IThemeOptions;
  const showTitle = props.showTitle ?? true;
  const validatorResult = props.value?.validationResult || (props.required ? ValidatorTypes.Invalid : ValidatorTypes.Optional);

  return (
    <FormControl id={`${props.id}-form-control`} aria-controls={props.id} role={'input-control'}>
      {showTitle && (
        <InputLabel
          themeOptions={coreTheme}
          direction={props.direction}
          fontGroup={props.inputLabelFontGroup ?? FontGroups.inputLabel}
          htmlFor={props.id}
        >
          {props.title}
        </InputLabel>
      )}
      <InputBox id={`${props.id}-box`}>
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
          onChange={(evt) => {
            if (props.onChange) {
              const inputData = {
                ...props,
                value: {
                  value: parseInt(evt.target.value),
                  validationResult: ValidatorTypes.Valid,
                },
              };
              delete inputData.onChange;
              props.onChange(inputData);
            }
          }}
          aria-label={props.title}
          validationType={validatorResult}
          required={props.required}
          themeOptions={coreTheme}
          fontGroup={props.inputFontGroup}
          id={props.id}
          type="number"
          value={props.value?.value}
          min={props.min}
          max={props.max}
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
}
