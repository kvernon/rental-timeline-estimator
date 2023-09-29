import ReactSelect, { GroupBase, Props } from 'react-select';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { FontGroups } from '../theming/fontGroups';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { ValidatorTypes } from './validators/ValidatorTypes';

interface IOption {
  label: string;
  value: number;
  image: string;
}

const Img = styled.img`
  padding: 0;
`;

export function PropertyDropDown<Option extends IOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: Props<Option, IsMulti, Group>,
) {
  const optionsMap = ['apartment', 'house'].map((title: string, idx: number) => {
    return { value: idx, label: title, image: `/images/${title}.jpg` };
  }) as (Option | Group)[];

  const formatOptionLabel = (data: Option): ReactNode => {
    return <Img src={data.image} alt={data.label} title={data.label} />;
  };

  const coreTheme = useTheme() as IThemeOptions;

  const SelectStyled = styled(ReactSelect<Option, IsMulti, Group>)`
    appearance: none;
    white-space: pre-wrap;
    width: 100%;
    padding-left: 10px;
  `;

  return (
    <SelectStyled
      {...props}
      options={optionsMap}
      defaultValue={optionsMap[1] as Option}
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
