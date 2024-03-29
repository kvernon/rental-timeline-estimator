import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import React, { useEffect, useState } from 'react';
import { ValidationBar } from '../validators/ValidationBar';
import { IOption, TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { PropertyDropDown } from '../PropertyDropDown';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { DeleteButton } from '../core/DeleteButton';
import { DragPlaceholder } from '../core/DragPlaceHolder';
import { useStackValidationChildren } from '../hooks/useStackValidationChildren';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';

export interface IRuleStackProps {
  id: string;

  ruleStackValues: IRuleStackEntity[];

  validationType: ValidatorStackTypes;

  defaultIndex?: number;

  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// https://stackoverflow.com/a/69830024 (example on making drop down w/ image)
const PropertyPicker = styled(PropertyDropDown)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
`;

export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const [selectedRuleStackValue, setSelectedRuleStackValue] = useState<number>(props.defaultIndex || 0);
  const [selectedStack, setSelectedStack] = useState<IRuleStackEntity | null>(null);

  useEffect(() => {
    const newVar = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleStackValue];
    setSelectedStack(newVar);
  }, [props.ruleStackValues, selectedRuleStackValue]);

  useEffect(() => {
    const newValue = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleStackValue];
    if (JSON.stringify(newValue) !== JSON.stringify(selectedStack)) {
      // console.log('[selectedRuleStackValue, selectedStack, ruleStackValues]', JSON.stringify(newValue));
      setSelectedStack(newValue);
    }
  }, [selectedRuleStackValue, selectedStack, props.ruleStackValues]);

  const onChange = (valueOption: IOption) => {
    setSelectedRuleStackValue(valueOption.value);
  };

  const titleDropDownValidator = (
    <TitleDropDownValidator
      onChange={(evt) => onChange(evt)}
      defaultIndex={selectedRuleStackValue}
      id={props.id}
      titles={props.ruleStackValues.map((x) => x.ruleTitle)}
      validationType={props.validationType}
    />
  );

  const rangeFieldValidator = (
    <RangeFieldValidator
      id={`${props.id}`}
      min={selectedStack?.min}
      max={selectedStack?.max}
      prefix={selectedStack?.prefix}
      suffix={selectedStack?.suffix}
      validationType={props.validationType}
    />
  );

  const { isValid } = useStackValidationChildren(props.validationType, [titleDropDownValidator, rangeFieldValidator]);

  return (
    <StackBase {...props} ref={ref} direction="row" spacing={2} flexGrow={1} marginBottom={'20px'}>
      <DragPlaceholder role={'drag-handle'} data-movable-handle />
      <Stack id={`${props.id}-sub`} direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        {titleDropDownValidator}
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <PropertyPicker id={props.id} />
          {rangeFieldValidator}
        </Stack>
      </Stack>
      <ValidationBar isValid={isValid} />
      <DeleteButton
        onClick={(evt) => {
          if (props.removeClick) {
            props.removeClick(evt);
          }
        }}
      />
    </StackBase>
  );
});
