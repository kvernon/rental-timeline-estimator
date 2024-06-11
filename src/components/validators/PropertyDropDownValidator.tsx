import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { FontGroups } from '../../theming/fontGroups';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from './ValidatorTypes';
import { ITitleDropDownOption } from './TitleDropDownValidator';

export const propertyOptions = ['apartment', 'house'];

export interface IPropertyDropDownOption extends ITitleDropDownOption {
  image: string;
}

export interface IPropertyDropDownOptionChange extends IPropertyDropDownOption {
  validationResult: ValidatorTypes;
}

export interface IPropertyDropDownParams {
  id?: string;
  defaultIndex?: number;
  onChange?: (value: IPropertyDropDownOptionChange) => void;
}

const Img = styled.img`
  padding: 0;
`;

/**
 * not a react-form-hook component. The heavy should not take place here
 * @param props
 * @constructor
 */
export function PropertyDropDownValidator(props: IPropertyDropDownParams) {
  const optionsMap = propertyOptions.map((title: string, idx: number) => {
    return { value: idx, label: title, image: `/images/${title}.jpg` };
  }) as IPropertyDropDownOption[];

  const formatOptionLabel = (data: IPropertyDropDownOption): ReactNode => {
    return <Img src={data.image} alt={data.label} title={data.label} />;
  };

  const coreTheme = useTheme() as IThemeOptions;

  const SelectStyled = styled(ReactSelect<IPropertyDropDownOption, false, GroupBase<IPropertyDropDownOption>>)`
    appearance: none;
    white-space: pre-wrap;
    width: 100%;
    padding-left: 10px;
  `;

  return (
    <SelectStyled
      {...props}
      name={props.id}
      onChange={(a: SingleValue<IPropertyDropDownOption>) => {
        if (a && props.onChange) props?.onChange({ ...a, validationResult: ValidatorTypes.Valid });
      }}
      options={optionsMap}
      defaultValue={optionsMap[1]}
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
