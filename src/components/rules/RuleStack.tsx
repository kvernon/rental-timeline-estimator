import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import React, { useEffect, useState } from 'react';
import { ValidationBar } from '../validators/ValidationBar';
import { TitleDropDownValidator, ITitleDropDownOptionChange } from '../validators/TitleDropDownValidator';
import { IPropertyDropDownOptionChange, PropertyDropDownValidator } from '../validators/PropertyDropDownValidator';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { DeleteButton } from '../core/DeleteButton';
import { DragPlaceholder } from '../core/DragPlaceHolder';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { onChangeType } from '../validators/IRangeFieldValidatorChange';
import { IEventResult } from '../validators/IEventResult';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { IFieldType } from './IFieldType';
import { useValid } from '../hooks/useValid';

export interface IRuleStackProps {
  id: string;

  index?: number;

  ruleStackValues: IRuleStackEntity[];

  validationType: ValidatorStackTypes;

  defaultIndex?: number;

  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  style?: React.CSSProperties;

  onUpdate?: (evt: IFieldType) => void;
}

// https://stackoverflow.com/a/69830024 (example on making drop down w/ image)
const PropertyPicker = styled(PropertyDropDownValidator)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
`;

/**
 * RuleStack is used to help show the rule and it's options. The user will decide what those values will be.
 * All options are supplied using {@link IRuleStackProps.ruleStackValues}. They'll get sprinkled in between all titles
 * and the range input. If there is a supplied index, it'll be {@link IRuleStackProps.defaultIndex}, otherwise it's 0.
 */
export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const [selectedRuleTitleIndex, setSelectedRuleTitleIndex] = useState<number>(props.defaultIndex || 0);
  const [isValidDefault] = useValid(props.validationType);
  const [isValid, setIsValid] = useState<ValidatorTypes>(isValidDefault);

  const [selectedValueOptions, setSelectedValueOptions] = useState<IRuleStackEntity | null>(null);
  const [data, setData] = useState<IFieldType>({ titleDropDown: {}, rangeFieldValidator: {}, propertyDropDown: {} });

  useEffect(() => {
    const newVar = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleTitleIndex];
    setSelectedValueOptions(newVar);
  }, [props.ruleStackValues, selectedRuleTitleIndex]);

  useEffect(() => {
    const checkOptions: (ValidatorTypes | undefined)[] = [
      data.rangeFieldValidator?.validationResult,
      data.titleDropDown?.validationResult,
      data.propertyDropDown?.validationResult,
    ];

    const predicate = (value: ValidatorTypes | undefined): value is ValidatorTypes => value !== undefined;
    const verified: ValidatorTypes[] = checkOptions.filter(predicate);

    let possibleValue = isValidDefault;

    if (verified.some((x) => x === ValidatorTypes.Invalid)) {
      possibleValue = ValidatorTypes.Invalid;
    } else if (verified.filter((x) => x === ValidatorTypes.Valid).length > 0) {
      possibleValue = ValidatorTypes.Valid;
    }

    if (isValid !== possibleValue) {
      setIsValid(possibleValue);
    }
  }, [data, isValid]);

  useEffect(() => {
    const newValue = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleTitleIndex];
    if (JSON.stringify(newValue) !== JSON.stringify(selectedValueOptions)) {
      setSelectedValueOptions(newValue);
    }
  }, [selectedRuleTitleIndex, selectedValueOptions, props.ruleStackValues]);

  const titleDropDownOnChange = (valueOption: ITitleDropDownOptionChange) => {
    if (data.titleDropDown?.value?.value !== valueOption.value) {
      // update the index
      setSelectedRuleTitleIndex(valueOption.value);
      const f: IFieldType = { ...data };
      f.titleDropDown = {
        value: { value: valueOption.value, label: valueOption.label },
        validationResult: valueOption.validationResult,
      };

      setData(f);
    }
  };

  const propertyDropDownOnChange = (valueOption: IPropertyDropDownOptionChange) => {
    if (data.propertyDropDown?.value?.value !== valueOption.value) {
      const f: IFieldType = { ...data };
      f.propertyDropDown = {
        value: { value: valueOption.value, label: valueOption.label },
        validationResult: valueOption.validationResult,
      };

      setData(f);
    }
  };

  const titleDropDownValidator = (
    <TitleDropDownValidator
      onChange={(evt) => titleDropDownOnChange(evt)}
      defaultIndex={selectedRuleTitleIndex}
      id={props.id}
      titles={props.ruleStackValues.map((x) => x.ruleTitle)}
      validationType={props.validationType}
    />
  );

  const rangeFieldValidatorOnChange: onChangeType = (evt: IEventResult<number>): void => {
    if (data.rangeFieldValidator?.value !== evt.value) {
      const f: IFieldType = { ...data };
      f.rangeFieldValidator = {
        value: evt.value,
        validationResult: evt.validationResult,
      };

      setData(f);
    }
  };

  const rangeFieldValidator = (
    <RangeFieldValidator
      id={`${props.id}`}
      min={selectedValueOptions?.min}
      max={selectedValueOptions?.max}
      prefix={selectedValueOptions?.prefix}
      suffix={selectedValueOptions?.suffix}
      validationType={props.validationType}
      onChange={rangeFieldValidatorOnChange}
    />
  );

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
          <PropertyPicker id={props.id} defaultIndex={props.ruleStackValues[selectedRuleTitleIndex]?.property} onChange={propertyDropDownOnChange} />
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
