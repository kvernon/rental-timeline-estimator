import React, { ReactNode, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { ValidatorTypes } from './ValidatorTypes';
import { FontGroups } from '../../theming/fontGroups';
import styled from '@emotion/styled';
import { formatName } from '../naming/FormatName';
import { FormatNames } from '../naming/FormatNames';

export interface IPropertyDropDownParams {
  id?: string;
  onChange?: (value: IPropertyDropDownOption) => void;
}

export interface IPropertyDropDownOption {
  label: string;
  value: number;
  image: string;
}

const Img = styled.img`
  padding: 0;
`;

export function PropertyDropDownValidator2<
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

  const optionsMap = ['apartment', 'house'].map((title: string, idx: number) => {
    return { value: idx, label: title, image: `/images/${title}.jpg` };
  }) as (Option | Group)[];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

  const Select = styled(ReactSelect<Option, IsMulti, Group>)<{
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
            defaultValue={optionsMap[selectedIndex] as Option}
            formatOptionLabel={formatOptionLabel}
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
                  backgroundColor: `${coreTheme.palette.validation[ValidatorTypes[ValidatorTypes.Valid]].background}41`,
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
            }}
          />
        );
      }}
    />
  );
}
