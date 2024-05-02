import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useState } from 'react';
import { FontGroups } from '../../theming/fontGroups';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from './ValidatorTypes';
import { Controller, useFormContext } from 'react-hook-form';
import { formatName } from '../naming/FormatName';
import { FormatNames } from '../naming/FormatNames';
import { ITitleDropDownOption } from './TitleDropDownValidator';

export const propertyOptions = ['apartment', 'house'];

export interface IPropertyDropDownParams {
  id?: string;
  defaultIndex?: number;
  onChange?: (value: IPropertyDropDownOption) => void;
}

export interface IPropertyDropDownOption extends ITitleDropDownOption {
  image: string;
}

const Img = styled.img`
  padding: 0;
`;

export function PropertyDropDownValidator<
  Option extends IPropertyDropDownOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: IPropertyDropDownParams) {
  const formatOptionLabel = (data: IPropertyDropDownOption): ReactNode => {
    return <Img src={data.image} alt={data.label} title={data.label} />;
  };

  const { control, setValue } = useFormContext();
  const coreTheme = useTheme() as IThemeOptions;

  const selectUuid = props.id || window.crypto.randomUUID();
  const inputValidationValue = `${formatName(selectUuid, FormatNames.PropertyDropDownValidatorId)}.value`;
  const inputValidationResult = `${formatName(selectUuid, FormatNames.PropertyDropDownValidatorId)}.validationResult`;

  const optionsMap = propertyOptions.map((title: string, idx: number) => {
    return { value: idx, label: title, image: `/images/${title}.jpg` };
  }) as (Option | Group)[];

  const [selectedIndex, setSelectedIndex] = useState<number>(props.defaultIndex || 1);

  useEffect(() => {
    setValue(inputValidationValue, selectedIndex, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
    setValue(inputValidationResult, ValidatorTypes.Valid);
  }, []);

  const handleChange = (option: SingleValue<IPropertyDropDownOption | unknown>): void => {
    const value = (option as IPropertyDropDownOption).value;
    if (value !== selectedIndex) {
      setValue(inputValidationValue, option);
      setSelectedIndex(value);
    }
  };

  const SelectStyled = styled(ReactSelect<Option, IsMulti, Group>)<{
    themeOptions: IThemeOptions;
  }>`
    appearance: none;
    white-space: pre-wrap;
    width: 100%;
    padding-left: 10px;
    font-size: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.size};
    font-family: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.font};
    font-weight: ${(props) => props.themeOptions.typography.get(FontGroups.inputLabel)?.weight};
    color: ${(props) => props.themeOptions.typography.get(FontGroups.input)?.color};
  `;

  return (
    <Controller
      name={inputValidationValue}
      control={control}
      render={({ field }) => {
        return (
          <SelectStyled
            {...field}
            options={optionsMap}
            value={optionsMap[selectedIndex] as Option}
            formatOptionLabel={formatOptionLabel}
            themeOptions={coreTheme}
            onChange={handleChange}
            styles={{
              singleValue: (base) => ({
                ...base,
                color: `${coreTheme.typography.get(FontGroups.input)?.color}`,
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
              }),
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
      }}
    />
  );
}
