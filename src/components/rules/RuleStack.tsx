import { Stack } from '../core/Stack';
import React, { useState, useEffect } from 'react';
import { IOption, TitleDropDownValidator } from '../validators/TitleDropDownValidator';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { ValidationBar } from '../validators/ValidationBar';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import styled from '@emotion/styled';
import { RangeFieldValidatorName } from '../naming/RangeFieldValidatorName';
import { TitleDropDownValidatorName } from '../naming/TitleDropDownValidatorName';
import { useFormContext } from 'react-hook-form';
import { TrashAlt } from '@emotion-icons/fa-solid';
import { PropertyDropDown } from '../PropertyDropDown';
import { IRuleStackEntity } from './IRuleStackEntity';

export interface IRuleStackProps {
  id: string;

  ruleStackValues: IRuleStackEntity[];

  validationType: ValidatorStackTypes;

  defaultIndex?: number;

  removeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// https://stackoverflow.com/a/69830024 (example on making drop down w/ image)
const SForMFPlaceholder = styled(PropertyDropDown)`
  width: 147px;
`;

const StackBase = styled(Stack)`
  padding-left: 0;
  background-color: #4f41b9;
`;

const DragPlaceholder = styled.div`
  transition: background 0.4s ease-out;
  width: 20px;
  background-color: #383838;
  opacity: 1;
  background-image: radial-gradient(ellipse farthest-corner at 4px 4px, #202030, #202030 50%, transparent 50%);
  background-size: 4px 4px;
  cursor: pointer;

  :hover {
    background-color: #6e6e6e;
    cursor: move;
`;

const TrashColored = styled(TrashAlt)`
  color: red;
  width: 50%;
  transform: scale(1, 1.25);
  box-shadow: 0 0 5px #2d0404;
`;

const DeletePlaceholder = styled.div`
  transition: background 0.4s ease-out;
  width: 45px;
  background: #520606;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background: #7e0a0a;
  }
`;

export const RuleStack = React.forwardRef(function (props: IRuleStackProps, ref: React.Ref<HTMLDivElement>) {
  const methods = useFormContext();
  const [selectedRuleStackValue, setRuleStackValue] = useState<number>(props.defaultIndex || 0);
  const [isValid, setIsValid] = useState(props.validationType === ValidatorStackTypes.Optional ? ValidatorTypes.Valid : ValidatorTypes.Invalid);
  const id = `${props.id}`;

  const [ruleStackValues] = useState(props.ruleStackValues);
  const selectedStack: IRuleStackEntity = ruleStackValues[selectedRuleStackValue];

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
        const nameSplitOfFieldIndexInputProperty = isValidCollection[findIndex].name.split('.');
        setIsValidCollection((old) => {
          const newed = [...old];
          newed[findIndex].result = value[nameSplitOfFieldIndexInputProperty[0]][nameSplitOfFieldIndexInputProperty[1]];
          return newed;
        });
        setIsValid(isValidCollection.some((x) => x.result === ValidatorTypes.Invalid) ? ValidatorTypes.Invalid : ValidatorTypes.Valid);
        methods.setValue(id, {
          ...methods.getValues(id),
          ruleTitle: ruleStackValues[parseInt(nameSplitOfFieldIndexInputProperty[1])].ruleTitle,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, id, isValidCollection, ruleStackValues, watchChildren]);

  const onChange = (value: IOption) => {
    //console.log('RuleStack::onChange', JSON.stringify(value, null, ' '));

    setRuleStackValue(value.value);
  };

  return (
    <StackBase {...props} ref={ref} direction="row" spacing={2} flexGrow={1} marginBottom={'20px'}>
      <DragPlaceholder data-movable-handle />
      <Stack id={`${id}-sub`} direction="column" paddingTop={'10px'} paddingLeft={'17px'} paddingBottom={'20px'} paddingRight={'17px'}>
        <TitleDropDownValidator
          id={id}
          titles={ruleStackValues.map((x) => x.ruleTitle)}
          defaultIndex={selectedRuleStackValue}
          onChange={onChange}
          validationType={props.validationType}
        />
        <Stack direction="row" spacing={2} paddingTop={'10px'}>
          <SForMFPlaceholder />
          <RangeFieldValidator
            id={`${id}`}
            min={selectedStack?.min}
            max={selectedStack?.max}
            prefix={selectedStack?.prefix}
            suffix={selectedStack?.suffix}
            validationType={props.validationType}
          />
        </Stack>
      </Stack>
      <ValidationBar isValid={isValid} />
      <DeletePlaceholder
        onClick={(evt) => {
          if (props.removeClick) {
            props.removeClick(evt);
          }
        }}
      >
        <TrashColored />
      </DeletePlaceholder>
    </StackBase>
  );
});
