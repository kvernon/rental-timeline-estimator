import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import React, { useEffect, useState } from 'react';
import { ValidationBar } from '../validators/ValidationBar';
import { TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { PropertyDropDownValidator } from '../validators/PropertyDropDownValidator';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { DeleteButton } from '../core/DeleteButton';
import { IRuleStackProps } from './IRuleStackProps';
import { DragPlaceholder } from '../core/DragPlaceHolder';
import { IRuleStackEntity } from './IRuleStackEntity';
import { getValidationResult } from './getValidationResult';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult, IEventValue } from '../validators/IEventResult';
import { IRangeFieldValidatorEvent } from '../validators/IRangeFieldValidatorEvent';
import { IRuleValues } from './IRuleValues';

const PropertyPicker = styled(PropertyDropDownValidator)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
`;

export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const [selectedRuleTitleIndex] = useState<number>(props.value.title?.value?.value || 0);
  const [selectedValueOptions, setSelectedValueOptions] = useState<IRuleStackEntity | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [value, setValue] = useState<IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>>(props.value);

  useEffect(() => {
    const newVar = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleTitleIndex];
    setSelectedValueOptions(newVar);
  }, [props.ruleStackValues, selectedRuleTitleIndex]);

  useEffect(() => {
    if (isDataLoaded && props.onUpdate) {
      props.onUpdate({
        range: { value: value.range.value },
        property: { value: value.property.value },
        title: { value: value.title.value },
      });
    }
  }, [value, isDataLoaded, props]);

  const injectProps = { ...props };

  const titleDropDownOnChange = (valueOption: IEventValue<ISelectOption>) => {
    if (valueOption.value && value.title?.value !== valueOption.value) {
      setValue({
        ...props.value,
        title: {
          value: { value: valueOption.value?.value, label: valueOption.value?.label },
          validationResult: value.title.validationResult,
        },
      });
      setIsDataLoaded(true);
    }
  };

  const propertyDropDownOnChange = (valueOption: IEventValue<ISelectOption>) => {
    if (valueOption.value && value.property?.value !== valueOption.value) {
      setValue({
        ...props.value,
        property: {
          value: { value: valueOption.value.value, label: valueOption.value.label },
          validationResult: value.property.validationResult,
        },
      });
      setIsDataLoaded(true);
    }
  };

  const titleDropDownValidator = (
    <TitleDropDownValidator
      onChange={(evt) => titleDropDownOnChange(evt)}
      title="Rule Title"
      value={props.value.title}
      optionTitles={props.ruleStackValues.map((x) => x.ruleTitle)}
    />
  );

  const rangeFieldValidatorOnChange = (evt: IRangeFieldValidatorEvent<IEventValue<number | undefined>>): void => {
    if (evt.value && value.range?.value !== evt.value.value) {
      setValue({
        ...props.value,
        range: {
          value: evt.value.value,
          validationResult: value.range.validationResult,
        },
      });
      setIsDataLoaded(true);
    }
  };

  const rangeFieldValidator = (
    <RangeFieldValidator
      id={`rule-range`}
      title={'Rule Range'}
      showTitle={false}
      min={selectedValueOptions?.min}
      max={selectedValueOptions?.max}
      prefix={selectedValueOptions?.prefix}
      suffix={selectedValueOptions?.suffix}
      onChange={(evt) => rangeFieldValidatorOnChange(evt)}
      required={false}
    />
  );

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
      }}
      aria-label={`Rule Number ${props.index}`}
    >
      <DragPlaceholder role={'drag-handle'} data-movable-handle />
      <Stack direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        {titleDropDownValidator}
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <PropertyPicker title="Property Picker" value={props.value.property} onChange={(evt) => propertyDropDownOnChange(evt)} />
          {rangeFieldValidator}
        </Stack>
      </Stack>
      <ValidationBar
        isValid={getValidationResult(
          Object.values(props.value).map((x) => x.validationResult),
          props.required || false,
        )}
      />
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
