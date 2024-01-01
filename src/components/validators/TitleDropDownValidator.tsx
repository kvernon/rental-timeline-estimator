import React, { useEffect, useState } from 'react';
import { TitleDropDownValidatorName } from '../naming/TitleDropDownValidatorName';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { SingleValue } from 'react-select';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { evaluateValidation, RuleEval } from './evaluatateValidation';
import { ValidatorTypes } from './ValidatorTypes';
import { useWatcher } from '../hooks/useWatcher';
import { FontGroups } from '../../theming/fontGroups';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import styled from '@emotion/styled';

export interface ITitleDropDownParams {
  titles: string[];
  defaultIndex?: number;
  id?: string;
  validationType: ValidatorStackTypes;
  onChange?: (value: ITitleDropDownOption) => void;
}

export interface ITitleDropDownOption {
  label: string;
  value: number;
}

const rule: RuleEval = (v: number, options: { min?: number; max?: number }) =>
  v > (options?.min || 0) ? ValidatorTypes.Valid : ValidatorTypes.Invalid;

export const TitleDropDownValidator = function (props: ITitleDropDownParams) {
  const { control, setValue, getValues } = useFormContext();
  const coreTheme = useTheme() as IThemeOptions;

  const selectUuid = props.id || window.crypto.randomUUID();
  const inputValidationValue = `${TitleDropDownValidatorName(selectUuid)}.value`;
  const inputValidationResult = `${TitleDropDownValidatorName(selectUuid)}.validationResult`;

  const [optionsMap, setOptionsMap] = useState<ITitleDropDownOption[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(props.defaultIndex || 0);
  const [evaluated, setEvaluated] = useState(evaluateValidation(props.validationType, rule, selectedIndex));

  const [watcherResult] = useWatcher<ITitleDropDownOption>([inputValidationValue]);

  useEffect(() => {
    setValue(inputValidationValue, selectedIndex, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
    setValue(inputValidationResult, evaluateValidation(props.validationType, rule, selectedIndex).validationResult);
  }, []);

  useEffect(() => {
    const map = props.titles.map((title: string, idx: number): ITitleDropDownOption => {
      return { value: idx, label: title };
    });

    if (JSON.stringify(optionsMap) !== JSON.stringify(map)) {
      setOptionsMap(map);
    }
  }, [props.titles, optionsMap]);

  useEffect(() => {
    console.log('useEffect::[watcherResult, ...]', inputValidationValue);
    const eventResult = evaluateValidation(props.validationType, rule, selectedIndex);

    if (evaluated.validationResult !== eventResult.validationResult) {
      setEvaluated(eventResult);
      setValue(inputValidationResult, evaluated.validationResult);
    }

    const storedResult = getValues(inputValidationResult);
    console.log('useEffect::[watcherResult, ...]', inputValidationResult, storedResult);
  }, [watcherResult, evaluated, inputValidationResult, props.validationType, setValue, selectedIndex]);

  const handleChange = (option: SingleValue<ITitleDropDownOption | unknown>): void => {
    const value = (option as ITitleDropDownOption).value;
    if (value !== selectedIndex) {
      setValue(inputValidationValue, option);
      setSelectedIndex(value);
    }
  };

  const Select = styled(ReactSelect)<{
    themeOptions: IThemeOptions;
  }>`
    appearance: none;
    white-space: pre-wrap;
    font-size: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.size};
    font-family: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.font};
    font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.weight};
    width: 100%;
    padding-left: 10px;
    color: ${(props) => props.themeOptions.typography.get(FontGroups.input)?.color};
    overflow: visible;
  `;

  return (
    <Controller
      name={inputValidationValue}
      control={control}
      render={({ field }) => {
        return (
          <Select
            {...field}
            isMulti={false}
            defaultValue={optionsMap[selectedIndex]}
            themeOptions={coreTheme}
            options={optionsMap}
            onChange={handleChange}
            styles={{
              singleValue: (base) => ({
                ...base,
                color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                zIndex: baseStyles.isSelected ? 9999 : baseStyles.zIndex,
              }),
              control: (baseStyles) => {
                return {
                  ...baseStyles,
                  overflow: 'visible',
                  transition: 'background-color 0.4s ease-out',
                  backgroundColor: `${coreTheme.palette.validation[evaluated.validationResultName].background}41`,
                  height: '59px',
                  borderColor: `${coreTheme.palette.inputBackground}`,
                  border: `1px solid ${coreTheme.palette.panelBackground}`,
                  borderRadius: '0.3rem',
                  color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
                  ':hover': {
                    backgroundColor: `${coreTheme.palette.validation[evaluated.validationResultName].background}81`,
                    borderColor: `${coreTheme.palette.inputBackgroundFocus}`,
                    color: `${coreTheme.palette.inputBackgroundFocus}`,
                  },
                };
              },
            }}
          />
        );
      }}
    />
  );
};
