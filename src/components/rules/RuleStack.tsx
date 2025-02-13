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
import { ConditionalNumber, ConditionEventResult } from '../validators/IRangeFieldValidatorEvent';
import { IRuleValues } from './IRuleValues';

const PropertyPicker = styled(PropertyDropDownValidator)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
`;

export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const [selectedRuleTitleIndex, setSelectedRuleTitleIndex] = useState<number | null>(props.value.title?.value?.value || null);
  const [selectedValueOptions, setSelectedValueOptions] = useState<IRuleStackEntity | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [value, setValue] = useState<IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>>(props.value);

  useEffect(() => {
    setIsDataLoaded(false);
  }, [props]);

  useEffect(() => {
    const newVar = props.ruleStackValues.length === 0 || !selectedRuleTitleIndex ? null : props.ruleStackValues[selectedRuleTitleIndex];
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
    if (valueOption.value && value.title?.value.label !== valueOption.value.label) {
      const newVar = {
        ...props.value,
        title: {
          value: { value: valueOption.value?.value, label: valueOption.value?.label },
          validationResult: value.title.validationResult,
        },
      };
      setSelectedRuleTitleIndex(valueOption.value?.value);
      setValue(newVar);
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

  const rangeFieldValidatorOnChange = (evt: ConditionEventResult<false, ConditionalNumber<false>>): void => {
    if (evt?.value && value.range?.value !== evt?.value) {
      setValue({
        ...props.value,
        range: {
          value: evt.value,
          validationResult: value.range.validationResult,
        },
      });
      setIsDataLoaded(true);
    }
  };

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
      aria-label={`Rule Number ${props.index}`}
    >
      <DragPlaceholder role={'drag-handle'} data-movable-handle />
      <Stack direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        <TitleDropDownValidator
          onChange={(evt) => titleDropDownOnChange(evt)}
          title={`Rule Title`}
          value={props.value.title}
          optionTitles={props.ruleStackValues.map((x) => ({ title: x.ruleTitle, isDisabled: x.isDisabled }))}
        />
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <PropertyPicker title="Property Picker" value={props.value.property} onChange={(evt) => propertyDropDownOnChange(evt)} />
          <RangeFieldValidator<false>
            id={`rule-range`}
            title={'Rule Range'}
            showTitle={false}
            min={selectedValueOptions?.min}
            max={selectedValueOptions?.max}
            prefix={selectedValueOptions?.prefix}
            suffix={selectedValueOptions?.suffix}
            useUnderlineOnly={false}
            onChange={(evt) => rangeFieldValidatorOnChange(evt)}
            value={props.value.range}
          />
        </Stack>
      </Stack>
      <ValidationBar
        isValid={getValidationResult(
          Object.values(props.value).map((x) => x.validationResult),
          true,
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
