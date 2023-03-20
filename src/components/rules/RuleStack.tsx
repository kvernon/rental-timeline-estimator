import { Stack } from '../core/Stack';
import React, { useEffect, useState } from 'react';
import { TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { ValidationBar } from '../validators/ValidationBar';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import styled from '@emotion/styled';
import { RangeFieldValidatorName } from '../validators/RangeFieldValidatorName';
import { TitleDropDownValidatorName } from '../validators/TitleDropDownValidatorName';
import { useFormContext } from 'react-hook-form';

interface IRuleStackEntity {
  ruleTitle: string;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

export interface IRuleStackProps {
  id: string;

  ruleStackValues: IRuleStackEntity[];

  validationType: ValidatorStackTypes;

  defaultIndex?: number;
}

const SForMFPlaceholder = styled.div`
  width: 83px;
  height: 60px;
  padding: 0 20px 0 0;
  background: #66bf3c;
`;

const DragPlaceholder = styled.div`
  width: 20px;
  background: #004444;
`;

const DeletePlaceholder = styled.div`
  width: 45px;
  background: #8f130f;
`;

export const RuleStack = function (props: IRuleStackProps) {
  const methods = useFormContext();
  const [selectedRuleStackValue, setRuleStackValue] = useState<number>(props.defaultIndex || 0);
  const [isValid, setIsValid] = useState(props.validationType === ValidatorStackTypes.Optional ? ValidatorTypes.Valid : ValidatorTypes.Invalid);
  const id = `${props.id}`;

  const selectedStack: IRuleStackEntity = props.ruleStackValues[selectedRuleStackValue];

  const watchChildren = [TitleDropDownValidatorName(id), RangeFieldValidatorName(id)].map((c) => `${c}.validationResult`);

  const [isValidCollection, setIsValidCollection] = useState(
    watchChildren.map((x) => ({
      name: x,
      result: isValid,
    })),
  );

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      const findIndex = watchChildren.findIndex((x) => x === name);
      if (findIndex >= 0) {
        const split = isValidCollection[findIndex].name.split('.');
        isValidCollection[findIndex].result = value[split[0]][split[1]];
        setIsValidCollection(isValidCollection);
        setIsValid(isValidCollection.some((x) => x.result === ValidatorTypes.Invalid) ? ValidatorTypes.Invalid : ValidatorTypes.Valid);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const onChange = (value: string) => {
    const index = props.ruleStackValues.findIndex((x) => x.ruleTitle === value);
    setRuleStackValue(index);
  };

  return (
    <Stack id={id} direction="row" spacing={2} flexGrow={1} paddingBottom={'20px'}>
      <DragPlaceholder className={'drag'}></DragPlaceholder>
      <Stack id={`${id}-sub`} direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        <TitleDropDownValidator
          id={id}
          titles={props.ruleStackValues.map((x) => x.ruleTitle)}
          defaultIndex={selectedRuleStackValue}
          onChange={onChange}
          validationType={props.validationType}
        />
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <SForMFPlaceholder />
          {/*--- Range might need 2 types of stores. 1 for values, and the other for constraints */}
          <RangeFieldValidator
            id={`${id}`}
            min={selectedStack.min}
            max={selectedStack.max}
            prefix={selectedStack.prefix}
            suffix={selectedStack.suffix}
            validationType={props.validationType}
          />
        </Stack>
      </Stack>
      <ValidationBar isValid={isValid} />
      <DeletePlaceholder />
    </Stack>
  );
};
