import React, { useEffect, useState } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { evaluateValidation, RuleEval } from './evaluatateValidation';
import { ValidatorTypes } from './ValidatorTypes';
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
  const coreTheme = useTheme() as IThemeOptions;

  const selectUuid = props.id || window.crypto.randomUUID();

  const [optionsMap, setOptionsMap] = useState<ITitleDropDownOption[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(props.defaultIndex || 0);
  const [evaluated, setEvaluated] = useState(evaluateValidation(props.validationType, rule, selectedIndex));

  useEffect(() => {
    const map = props.titles.map((title: string, idx: number): ITitleDropDownOption => {
      return { value: idx, label: title };
    });

    if (JSON.stringify(optionsMap) !== JSON.stringify(map)) {
      setOptionsMap(map);
      //console.log('here', map);
    }
  }, [props.titles, optionsMap]);

  useEffect(() => {
    const eventResult = evaluateValidation(props.validationType, rule, selectedIndex);

    if (evaluated.validationResult !== eventResult.validationResult) {
      setEvaluated(eventResult);
    }
  }, [evaluated, props.validationType, selectedIndex]);

  const handleChange = (option: SingleValue<ITitleDropDownOption | unknown>): void => {
    const value = (option as ITitleDropDownOption).value;
    if (value !== selectedIndex) {
      setSelectedIndex(value);
      if (props.onChange) {
        props.onChange({ value, label: optionsMap[value].label });
      }
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
    <Select
      {...props}
      name={selectUuid}
      isMulti={false}
      value={optionsMap[selectedIndex]}
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
};
