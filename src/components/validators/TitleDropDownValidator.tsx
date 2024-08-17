import React from 'react';
import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult, IEventValue } from './IEventResult';
import styled from '@emotion/styled';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { FontGroups } from '../../theming/fontGroups';
import { useTheme } from '@emotion/react';

export interface ITitleDropDownParams {
  title: string;
  optionTitles: string[];
  value: IEventResult<ISelectOption>;
  onChange?: (inputData: IEventValue<ISelectOption>) => void;
}

function getDataValue(optionTitle: string[], label: string): ISelectOption {
  const foundIndex = optionTitle.findIndex((x) => x === label);

  return { value: foundIndex, label };
}

const Select = styled(ReactSelect<ISelectOption, false, GroupBase<ISelectOption>>)<{
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

export function TitleDropDownValidator(props: ITitleDropDownParams) {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Select
      themeOptions={coreTheme}
      aria-label={props.title}
      options={(props.optionTitles || []).map(
        (option: string, index: number): ISelectOption => ({
          value: index,
          label: option,
        }),
      )}
      defaultValue={getDataValue(props.optionTitles, props.value.value.label)}
      onChange={(a: SingleValue<ISelectOption>) => {
        if (a && props.onChange && a.value !== props.value.value.value) props?.onChange({ value: a });
      }}
    />
  );
}
