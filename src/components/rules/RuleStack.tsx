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

  useEffect(() => {
    const newVar = props.ruleStackValues.length === 0 ? null : props.ruleStackValues[selectedRuleTitleIndex];
    setSelectedValueOptions(newVar);
  }, [props.ruleStackValues, selectedRuleTitleIndex]);

  const injectProps = { ...props };

  const titleDropDownValidator = (
    <TitleDropDownValidator
      /*onChange={(evt) => titleDropDownOnChange(evt)}*/
      title="Rule Title"
      value={props.value.title}
      optionTitles={props.ruleStackValues.map((x) => x.ruleTitle)}
    />
  );

  const rangeFieldValidator = (
    <RangeFieldValidator
      id={`rule-range`}
      title={'Rule Range'}
      showTitle={false}
      min={selectedValueOptions?.min}
      max={selectedValueOptions?.max}
      prefix={selectedValueOptions?.prefix}
      suffix={selectedValueOptions?.suffix}
      required={false}
    />
  );

  //delete injectProps.onUpdate;
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
      aria-label="Rule"
    >
      <DragPlaceholder role={'drag-handle'} data-movable-handle />
      <Stack direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        {titleDropDownValidator}
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <PropertyPicker title="Property Picker" value={props.value.property} />
          {rangeFieldValidator}
        </Stack>
      </Stack>
      <ValidationBar
        isValid={getValidationResult(
          Object.values(props.value).map((x) => x.validationResult),
          props.required || false,
        )}
      />
      <DeleteButton />
    </StackBase>
  );
});
