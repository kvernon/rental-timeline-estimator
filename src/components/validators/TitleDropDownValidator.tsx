import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FontGroups, IThemeOptions } from '../../theme';
import ReactSelect, { SingleValue } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { evaluateValidation } from './evaluatateValidation';
import { ValidatorTypes } from './ValidatorTypes';
import { TitleDropDownValidatorName } from './TitleDropDownValidatorName';

export interface ITitleDropDownParams {
  titles: string[];
  defaultIndex?: number;
  id?: string;
  validationType: ValidatorStackTypes;
  onChange?: (value: string) => void;
}

interface IOption {
  label: string;
  value: number;
}

export const TitleDropDownValidator = function (props: ITitleDropDownParams) {
  const coreTheme = useTheme() as IThemeOptions;
  const methods = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(props.defaultIndex || 0);
  const rule = (v: number) => (v > 0 ? ValidatorTypes.Valid : ValidatorTypes.Invalid);
  const [evaluated, setEvaluated] = useState(evaluateValidation(selectedIndex, props.validationType, rule));
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

  // eslint-disable-next-line no-undef
  const selectUuid = props.id || window.crypto.randomUUID();
  const id = `${TitleDropDownValidatorName(selectUuid)}.value`;
  const inputValidationResult = `${TitleDropDownValidatorName(selectUuid)}.validationResult`;

  /**
   * https://github.com/react-hook-form/react-hook-form/blob/edc4cec517eaf51fbaef1d173b9d57cd448ba554/examples/V7/customInput.tsx#LL38C1-L41C5
   * @param option
   */
  function handleChange(option: SingleValue<IOption | unknown>): void {
    methods.setValue(id, option);
    setSelectedIndex((option as IOption).value);
    if (props.onChange) {
      props.onChange((option as IOption)?.label || '');
    }
  }

  useEffect(() => {
    const values = methods.getValues(id);
    const validationResult = evaluateValidation(values.value, props.validationType, rule);

    setEvaluated(validationResult);
    methods.setValue(inputValidationResult, validationResult.validationResult);
  }, [selectedIndex]);

  const optionsMap = props.titles.map((title: string, idx: number): IOption => {
    return { value: idx, label: title };
  });

  useEffect(() => {
    const subscription = methods.watch((data, { name }) => {
      if (name === id) {
        const values = methods.getValues(id);

        const validationResult = evaluateValidation(values.value, props.validationType, rule);
        setEvaluated(validationResult);
        methods.setValue(inputValidationResult, validationResult.validationResult);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods.formState]);

  return (
    <Controller
      name={id}
      control={methods.control}
      render={({ field }) => (
        <Select
          {...field}
          isMulti={false}
          onChange={handleChange}
          defaultValue={props.titles.map((titleEntity, idx) => ({ value: idx, label: titleEntity } as IOption))[props.defaultIndex || 0]}
          themeOptions={coreTheme}
          options={optionsMap}
          styles={{
            control: (baseStyles) => {
              return {
                ...baseStyles,
                transition: 'background-color 0.4s ease-out',
                backgroundColor: `${coreTheme.palette.validation[evaluated.validationResultName].background}41`,
                height: '59px',
                borderColor: `${coreTheme.palette.inputBackground}`,
                border: `2px solid ${coreTheme.palette.panelBackground}`,
                borderRadius: '0.5rem',
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
      )}
    />
  );
};
