import React from 'react';
import ReactSelect, { GroupBase, SingleValue } from 'react-select';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult } from './IEventResult';
import { ValidatorTypes } from './ValidatorTypes';

export interface ITitleDropDownParams {
  title: string;
  optionTitles: string[];
  value?: IEventResult<ISelectOption>;
  onChange?: (inputData: IEventResult<ISelectOption>) => void;
}

function getDataValue(optionTitle: string[], label?: string): ISelectOption | undefined {
  if (!label || !optionTitle) {
    return undefined;
  }

  const foundIndex = optionTitle.findIndex((x) => x === label);

  return { value: foundIndex, label };
}

export function TitleDropDownValidator(props: ITitleDropDownParams) {
  return (
    <ReactSelect<ISelectOption, false, GroupBase<ISelectOption>>
      aria-label={props.title}
      options={(props.optionTitles || []).map(
        (option: string, index: number): ISelectOption => ({
          value: index,
          label: option,
        }),
      )}
      defaultValue={getDataValue(props.optionTitles, props.value?.value?.label)}
      onChange={(a: SingleValue<ISelectOption>) => {
        if (a && props.onChange) props?.onChange({ value: a, validationResult: ValidatorTypes.Valid });
      }}
    />
  );
}
