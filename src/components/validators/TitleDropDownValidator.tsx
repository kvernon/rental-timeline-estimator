import React from 'react';
import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult, IEventValue } from './IEventResult';
import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';
import { useTheme } from '@emotion/react';
import { ValidatorTypes } from './ValidatorTypes';
import { ISelectOptionDisabled } from '../core/ISelectOptionDisabled';
import { FormControl } from '../core/FormControl';

export interface IOptionTitle {
  title: string;
  isDisabled?: boolean;
}

export interface ITitleDropDownParams {
  title: string;
  optionTitles: IOptionTitle[];
  value: IEventResult<ISelectOptionDisabled>;
  onChange?: (inputData: IEventValue<ISelectOptionDisabled>) => void;
}

function getDataValue(optionTitle: IOptionTitle[], label: string): ISelectOptionDisabled {
  const foundIndex = optionTitle.findIndex((x) => x.title === label);

  if (foundIndex === -1) {
    return { value: -1, label: 'None' };
  }

  return { value: foundIndex, label, isDisabled: optionTitle ? optionTitle[foundIndex].isDisabled : false };
}

const Select = styled(ReactSelect<ISelectOptionDisabled, false, GroupBase<ISelectOptionDisabled>>)<{
  themeOptions: IThemeOptions;
}>`
  appearance: none;
  white-space: pre-wrap;
  font-size: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.size};
  font-family: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.font};
  font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.weight};
  width: 100%;
  padding-left: 4px;
  color: ${(props) => props.themeOptions.typography.get(FontGroups.input)?.color};
  overflow: visible;
`;

export function TitleDropDownValidator(props: ITitleDropDownParams) {
  const coreTheme = useTheme() as IThemeOptions;
  return (
    <FormControl>
      <Select
        themeOptions={coreTheme}
        aria-label={props.title}
        options={(props.optionTitles || []).map(
          (option: IOptionTitle, index: number): ISelectOptionDisabled => ({
            value: index,
            label: option.title,
            isDisabled: option.isDisabled || false,
          }),
        )}
        value={getDataValue(props.optionTitles, props.value.value.label)}
        onChange={(a: SingleValue<ISelectOption>) => {
          if (a && props.onChange && a.value !== props.value.value.value) props?.onChange({ value: a });
        }}
        styles={{
          singleValue: (base) => ({
            ...base,
            color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
          }),
          control: (baseStyles) => {
            const validatorTypeName = ValidatorTypes[props.value.validationResult];
            return {
              ...baseStyles,
              transition: ['border-color 0.4s ease-out', 'background-color 0.4s ease-out'],
              backgroundColor: `${coreTheme.palette.validation[validatorTypeName].background}41`,
              height: '60px',
              borderColor: `${coreTheme.palette.inputBackground}`,
              border: `3px solid ${coreTheme.palette.validation[validatorTypeName].background}41`,
              borderRadius: '0.3rem',
              color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
              ':hover': {
                backgroundColor: `${coreTheme.palette.validation[validatorTypeName].background}81`,
                border: `3px solid ${coreTheme.palette.validation[validatorTypeName].backgroundFocus}`,
                transition: ['border-color 0.4s ease-out', 'background-color 0.4s ease-out'],
                color: `${coreTheme.palette.inputBackgroundFocus}`,
              },
            };
          },
        }}
      />
    </FormControl>
  );
}
