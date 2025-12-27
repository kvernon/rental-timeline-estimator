import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FormControl } from '../core/FormControl';
import { InputLabel } from '../core/InputLabel';
import { ValidatorTypes } from './ValidatorTypes';
import React, { useState } from 'react';
import { InputSpanPaddingLeft } from '../core/InputSpanPaddingLeft';
import { InputBox } from '../core/InputBox';
import { InputLocal } from '../core/InputLocal';
import { IRangeFieldValidatorProps } from './IRangeFieldValidatorProps';
import { FontGroups } from '../../theming/fontGroups';
import { evaluateValidation } from './evaluateValidation';
import { isInRange } from './isInRange';
import styled from '@emotion/styled';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';
import { MotionStackNoWidth } from '../MotionStack';

const FormControlFull = styled(FormControl)`
  margin: 0 0 0 20px;
  width: 100%;
`;

export interface IAnimatedRangeFieldValidatorProps<Required extends boolean = false> extends IRangeFieldValidatorProps<Required> {
  delay?: number;
}

export const DEFAULT_DURATION = 0.2;

export function AnimatedRangeFieldValidator<Required extends boolean = false>(props: IAnimatedRangeFieldValidatorProps<Required>) {
  const coreTheme = useTheme() as IThemeOptions;
  const showTitle = props.showTitle ?? true;
  const validatorResult = props.value?.validationResult || (props.required ? ValidatorTypes.Invalid : ValidatorTypes.Optional);
  const message = `The${showTitle ? ` ${props.title}` : ''} range is between ${props.prefix || ''}${props.min || 0} and ${props.prefix || ''}${props.max || 100}${props.suffix ? ' ' + props.suffix : ''}`;
  const [startDelayWithWait] = useState(props.delay === undefined ? 0 : props.delay + DEFAULT_START_DELAY);

  return (
    <MotionStackNoWidth
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: DEFAULT_DURATION,
        ease: 'easeIn',
        delay: startDelayWithWait,
      }}
      style={{ transformOrigin: 'top left' }}
    >
      <FormControlFull id={`${props.id}-form-control`} aria-controls={props.id} role={'input-control'}>
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
                const value = parseInt(evt.target.value);

                if (value !== props.value?.value) {
                  props.onChange(
                    evaluateValidation<Required>(value, isInRange, {
                      min: props.min,
                      max: props.max,
                      isRequired: props.required,
                    }),
                  );
                }
              }
            }}
            alt={message}
            title={message}
            aria-description={message}
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
      </FormControlFull>
    </MotionStackNoWidth>
  );
}
