import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import ReactSelect, { SingleValue } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { evaluateValidation, RuleEval } from './evaluatateValidation';
import { ValidatorTypes } from './ValidatorTypes';
import { TitleDropDownValidatorName } from '../naming/TitleDropDownValidatorName';
import { FontGroups } from '../../theming/fontGroups';
import { IThemeOptions } from '../../theming/IThemeOptions';

export interface ITitleDropDownParams {
  titles: string[];
  defaultIndex?: number;
  id?: string;
  validationType: ValidatorStackTypes;
  onChange?: (value: IOption) => void;
}

export interface IOption {
  label: string;
  value: number;
}

export const TitleDropDownValidator = function (props: ITitleDropDownParams) {
  const propOnChange = props.onChange;

  const coreTheme = useTheme() as IThemeOptions;
  const methods = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(props.defaultIndex || 0);
  const rule: RuleEval = (v: number, options: { min?: number; max?: number }) =>
    v > (options?.min || 0) ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
  const [evaluated, setEvaluated] = useState(evaluateValidation(props.validationType, rule, selectedIndex));
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

  const selectUuid = props.id || window.crypto.randomUUID();
  const id = `${TitleDropDownValidatorName(selectUuid)}.value`;
  const inputValidationResult = `${TitleDropDownValidatorName(selectUuid)}.validationResult`;

  /**
   * https://github.com/react-hook-form/react-hook-form/blob/edc4cec517eaf51fbaef1d173b9d57cd448ba554/examples/V7/customInput.tsx#LL38C1-L41C5
   * @param option
   */
  const handleChange = useCallback(
    (option: SingleValue<IOption | unknown>): void => {
      //console.log('TitleDropDownValidator::handleChange', JSON.stringify(option, null, ' '));
      methods.setValue(id, option);
      setSelectedIndex((option as IOption).value);
      if (propOnChange) {
        propOnChange(option as IOption);
      }
    },
    [propOnChange, id, methods],
  );

  useEffect(() => {
    const valueOption = methods.getValues(id);
    const validationResult = evaluateValidation(props.validationType, rule, valueOption.value, {
      min: 0,
    });
    setEvaluated(validationResult);
    methods.setValue(inputValidationResult, validationResult.validationResult);
    handleChange(valueOption);
  }, [selectedIndex, id, inputValidationResult, props.validationType, methods, handleChange]);

  const optionsMap = props.titles.map((title: string, idx: number): IOption => {
    return { value: idx, label: title };
  });

  useEffect(() => {
    const subscription = methods.watch((data, { name }) => {
      if (name === id) {
        const valueOption = methods.getValues(id);
        const validationResult = evaluateValidation(props.validationType, rule, valueOption.value);
        setEvaluated(validationResult);
        methods.setValue(inputValidationResult, validationResult.validationResult);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods, id, inputValidationResult, props.validationType]);

  return (
    <Controller
      name={id}
      control={methods.control}
      render={({ field }) => (
        <Select
          {...field}
          isMulti={false}
          onChange={handleChange}
          defaultValue={
            props.titles.map(
              (titleEntity, idx) =>
                ({
                  value: idx,
                  label: titleEntity,
                }) as IOption,
            )[props.defaultIndex || 0]
          }
          themeOptions={coreTheme}
          options={optionsMap}
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
      )}
    />
  );
};
