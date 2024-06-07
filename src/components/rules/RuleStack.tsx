import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import React, { useEffect, useState } from 'react';
import { ValidationBar } from '../validators/ValidationBar';
import { TitleDropDownValidator, ITitleDropDownOption } from '../validators/TitleDropDownValidator';
import { IPropertyDropDownOption, PropertyDropDownValidator } from '../validators/PropertyDropDownValidator';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { DeleteButton } from '../core/DeleteButton';
import { DragPlaceholder } from '../core/DragPlaceHolder';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { onChangeType } from '../validators/IRangeFieldValidatorChange';
import { IEventResult } from '../validators/IEventResult';
import { ValidatorTypes } from '../validators/ValidatorTypes';

export interface IRuleStackProps {
  id: string;

  index?: number;

  ruleStackValues: IRuleStackEntity[];

  validationType: ValidatorStackTypes;

  defaultIndex?: number;

  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  style?: React.CSSProperties;

  onUpdate?: (evt: IRuleStackEntity) => void;
}

// https://stackoverflow.com/a/69830024 (example on making drop down w/ image)
const PropertyPicker = styled(PropertyDropDownValidator)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
`;

/*
 TODO: need to update with:
  all items going to some value collection save (property, title, input)
  need to validate, the isValid item
 */

export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const [selectedRuleStackValue, setSelectedRuleStackValue] = useState<number>(props.defaultIndex || 0);
  const [selectedStack, setSelectedStack] = useState<IRuleStackEntity | null>(null);

  useEffect(() => {
    const newVar = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleStackValue];
    //console.log('[props.ruleStackValues, selectedRuleStackValue]', JSON.stringify(newVar), selectedRuleStackValue);
    setSelectedStack(newVar);
  }, [props.ruleStackValues, selectedRuleStackValue]);

  useEffect(() => {
    const newValue = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleStackValue];
    if (JSON.stringify(newValue) !== JSON.stringify(selectedStack)) {
      //console.log('[selectedRuleStackValue, selectedStack, ruleStackValues]', JSON.stringify(newValue));
      setSelectedStack(newValue);
    }
  }, [selectedRuleStackValue, selectedStack, props.ruleStackValues]);

  const titleDropDownOnChange = (valueOption: ITitleDropDownOption) => {
    console.log('titleDropDownOnChange');
    setSelectedRuleStackValue(valueOption.value);
  };
  const propertyDropDownOnChange = (valueOption: IPropertyDropDownOption) => {
    console.log('propertyDropDownOnChange', valueOption);
  };

  const titleDropDownValidator = (
    <TitleDropDownValidator
      onChange={(evt) => titleDropDownOnChange(evt)}
      defaultIndex={selectedRuleStackValue}
      id={props.id}
      titles={props.ruleStackValues.map((x) => x.ruleTitle)}
      validationType={props.validationType}
    />
  );

  const rangeFieldValidatorOnChange: onChangeType = (evt: IEventResult<number>): void => {
    console.log('rangeFieldValidatorOnChange', evt);
  };

  const rangeFieldValidator = (
    <RangeFieldValidator
      id={`${props.id}`}
      min={selectedStack?.min}
      max={selectedStack?.max}
      prefix={selectedStack?.prefix}
      suffix={selectedStack?.suffix}
      validationType={props.validationType}
      onChange={rangeFieldValidatorOnChange}
    />
  );

  //const { isValid } = useStackValidationChildren(props.validationType, [titleDropDownValidator, rangeFieldValidator]);
  const isValid = ValidatorTypes.Valid;

  const injectProps = { ...props };

  delete injectProps.onUpdate;

  return (
    <StackBase
      {...injectProps}
      ref={ref}
      direction="row"
      marginBottom={'20px'}
      spacing={2}
      flexGrow={1}
      style={{
        ...props.style,
        zIndex: props.index,
      }}
    >
      <DragPlaceholder role={'drag-handle'} data-movable-handle />
      <Stack id={`${props.id}-sub`} direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        {titleDropDownValidator}
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <PropertyPicker id={props.id} defaultIndex={props.ruleStackValues[selectedRuleStackValue]?.property} onChange={propertyDropDownOnChange} />
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
