import { IOption, ITitleDropDownParams } from './TitleDropDownValidator';
import React, { useCallback, useEffect, useState } from 'react';
import { TitleDropDownValidatorName } from '../naming/TitleDropDownValidatorName';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { SingleValue } from 'react-select';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { evaluateValidation, RuleEval } from './evaluatateValidation';
import { ValidatorTypes } from './ValidatorTypes';
import styled from '@emotion/styled';
import { useWatcher } from '../hooks/useWatcher';
import { FontGroups } from '../../theming/fontGroups';

const rule: RuleEval = (v: number, options: { min?: number; max?: number }) =>
  v > (options?.min || 0) ? ValidatorTypes.Valid : ValidatorTypes.Invalid;

export const TitleDropDownValidator2 = function (props: ITitleDropDownParams) {
  const { control, setValue } = useFormContext();
  const coreTheme = useTheme() as IThemeOptions;

  const selectUuid = props.id || window.crypto.randomUUID();
  const id = `${TitleDropDownValidatorName(selectUuid)}.value`;
  const inputValidationResult = `${TitleDropDownValidatorName(selectUuid)}.validationResult`;

  const [optionsMap, setOptionsMap] = useState<IOption[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(props.defaultIndex || 0);
  const [evaluated, setEvaluated] = useState(evaluateValidation(props.validationType, rule, selectedIndex));

  const [watcherResult] = useWatcher<IOption>([id]);

  useEffect(() => {
    const map = props.titles.map((title: string, idx: number): IOption => {
      return { value: idx, label: title };
    });

    if (JSON.stringify(optionsMap) !== JSON.stringify(map)) {
      setOptionsMap(map);
    }
  }, [props.titles, optionsMap]);

  useEffect(() => {
    const eventResult = evaluateValidation(props.validationType, rule, selectedIndex);

    if (evaluated.validationResult !== eventResult.validationResult) {
      setEvaluated(eventResult);
      setValue(inputValidationResult, evaluated.validationResult);
    }
  }, [watcherResult, evaluated, inputValidationResult, props.validationType, setValue, selectedIndex]);

  const Select = styled(ReactSelect)<{ themeOptions: IThemeOptions }>`
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

  const handleChange = useCallback(
    (option: SingleValue<IOption | unknown>): void => {
      const value = (option as IOption).value;
      if (value !== selectedIndex) {
        setSelectedIndex(value);
      }
    },
    [selectedIndex, id, setSelectedIndex],
  );

  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => {
        return <Select {...field} isMulti={false} themeOptions={coreTheme} options={optionsMap} onChange={handleChange} />;
      }}
    />
  );
};
