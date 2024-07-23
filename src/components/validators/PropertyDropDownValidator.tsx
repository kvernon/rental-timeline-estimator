import React from 'react';
import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import { IPropertyDropDownOption } from '../core/IPropertyDropDownOption';
import { formatOptionLabel } from '../core/formatOptionLabel';
import { IEventResult } from './IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { ValidatorTypes } from './ValidatorTypes';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';

const getDataValue = (title: string, value: number): IPropertyDropDownOption => {
  return { value, label: title, image: `/images/${title}.jpg` };
};

export interface IPropertyDropDownParams {
  title: string;
  value?: IEventResult<ISelectOption>;
  onChange?: (inputData: IEventResult<ISelectOption>) => void;
}

export const propertyOptions = ['apartment', 'house'];

export function PropertyDropDownValidator(props: IPropertyDropDownParams) {
  const optionsMap = propertyOptions.map(getDataValue) as IPropertyDropDownOption[];

  const coreTheme = useTheme() as IThemeOptions;

  const defaultValue = 1;

  return (
    <ReactSelect<IPropertyDropDownOption, false, GroupBase<IPropertyDropDownOption>>
      aria-label={props.title}
      onChange={(a: SingleValue<IPropertyDropDownOption>) => {
        console.log(a, props.onChange);
        if (a && props.onChange) {
          props.onChange({ value: a, validationResult: ValidatorTypes.Valid });
        }
      }}
      value={getDataValue(props.value?.value?.label || propertyOptions[defaultValue], props.value?.value?.value || defaultValue)}
      options={optionsMap}
      formatOptionLabel={formatOptionLabel}
      styles={{
        control: (baseStyles) => {
          return {
            ...baseStyles,
            backgroundColor: `${coreTheme.palette.validation[ValidatorTypes[ValidatorTypes.Valid]].background}41`,
            marginLeft: '0',
            padding: '0',
            transition: 'background-color 0.4s ease-out',
            height: '59px',
            borderColor: `${coreTheme.palette.inputBackground}`,
            border: `1px solid ${coreTheme.palette.panelBackground}`,
            borderRadius: '0.3rem',
            color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
            ':hover': {
              backgroundColor: `${coreTheme.palette.validation[ValidatorTypes[ValidatorTypes.Valid]].background}81`,
              borderColor: `${coreTheme.palette.inputBackgroundFocus}`,
              color: `${coreTheme.palette.inputBackgroundFocus}`,
            },
          };
        },
        valueContainer: (baseStyles) => {
          return {
            ...baseStyles,
            marginLeft: '0',
            marginTop: '0',
            padding: '0',
          };
        },
      }}
    />
  );
}
