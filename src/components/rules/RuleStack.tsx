import styled from '@emotion/styled';
import { Stack } from '../core/Stack';
import React, { useMemo } from 'react';
import { ValidationBar } from '../validators/ValidationBar';
import { TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { PropertyDropDownValidator } from '../validators/PropertyDropDownValidator';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { DeleteButton } from '../core/DeleteButton';
import { IRuleStackProps } from './IRuleStackProps';
import { DragPlaceholder } from '../core/DragPlaceHolder';
import { getValidationResult } from './hooks/getValidationResult';
import { ISelectOption } from '../core/ISelectOption';
import { IEventValue } from '../validators/IEventResult';
import { ConditionalNumber, ConditionEventResult } from '../validators/IRangeFieldValidatorEvent';
import { getTitleChoicesFormatted } from './hooks/getTitleChoicesFormatted';

const PropertyPicker = styled(PropertyDropDownValidator)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
  border: 0.3rem solid black;
  border-radius: 0.5rem;
`;

export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const selectedRuleTitleIndex = props.value.title?.value?.value ?? null;

  const selectedValueOptions = useMemo(() => {
    return props.ruleStackValues.length === 0 || selectedRuleTitleIndex === null ? null : props.ruleStackValues[selectedRuleTitleIndex];
  }, [props.ruleStackValues, selectedRuleTitleIndex]);

  const formattedTitles = useMemo(() => {
    return getTitleChoicesFormatted(props.ruleStackValues, props.value.property.value.value);
  }, [props.ruleStackValues, props.value.property.value.value]);

  const injectProps = { ...props };

  const titleDropDownOnChange = (valueOption: IEventValue<ISelectOption>) => {
    if (valueOption.value && props.value.title?.value.label !== valueOption.value.label) {
      if (props.onUpdate) {
        props.onUpdate({
          range: { value: props.value.range.value },
          property: { value: props.value.property.value },
          title: { value: { value: valueOption.value.value, label: valueOption.value.label } },
        });
      }
    }
  };

  const propertyDropDownOnChange = (valueOption: IEventValue<ISelectOption>) => {
    if (valueOption.value && props.value.property?.value !== valueOption.value) {
      if (props.onUpdate) {
        props.onUpdate({
          range: { value: props.value.range.value },
          property: { value: { value: valueOption.value.value, label: valueOption.value.label } },
          title: { value: props.value.title.value },
        });
      }
    }
  };

  const rangeFieldValidatorOnChange = (evt: ConditionEventResult<false, ConditionalNumber<false>>): void => {
    if (evt?.value && props.value.range?.value !== evt?.value) {
      if (props.onUpdate) {
        props.onUpdate({
          range: { value: evt.value },
          property: { value: props.value.property.value },
          title: { value: props.value.title.value },
        });
      }
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
      <Stack direction="column" paddingTop="10px" paddingLeft="17px" paddingBottom="20px" paddingRight="17px">
        <TitleDropDownValidator
          onChange={(evt) => titleDropDownOnChange(evt)}
          title="Rule Title"
          value={props.value.title}
          optionTitles={formattedTitles}
        />
        <Stack direction="row" spacing={2} paddingTop="10px">
          <PropertyPicker title="Property Picker" value={props.value.property} onChange={(evt) => propertyDropDownOnChange(evt)} />
          <RangeFieldValidator<false>
            id="rule-range"
            title="Rule Range"
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
        curveRight={false}
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
