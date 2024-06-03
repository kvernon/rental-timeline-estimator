import { IRangeFieldValidatorProps } from '../IRangeFieldValidatorProps';
import React from 'react';
import { ValidatorTypes } from '../ValidatorTypes';
import { formatName } from '../../naming/FormatName';
import { FormatNames } from '../../naming/FormatNames';

export const RangeFieldValidator = jest.fn((props: IRangeFieldValidatorProps) => {
  const handle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      const result = parseInt(evt.target.value);
      const validationResult = result > 0 ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
      props.onChange({
        id: formatName(props.id, FormatNames.RangeFieldValidatorId),
        validationResult: validationResult,
        validationResultName: ValidatorTypes[validationResult],
        value: result,
      });
    }
  };

  return (
    <div>
      <input id={props.id} value={props.defaultValue} max={props.max} min={props.min} onChange={handle} />
    </div>
  );
});
