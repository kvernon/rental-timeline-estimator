import React, { useEffect, useState } from 'react';
import { GoalPanel } from '../panels/GoalPanel';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';
import { RulesCollection } from '../rules/RulesCollection';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { IUserInformationProps } from './IUserInformationProps';
import { IRuleValues } from '../rules/IRuleValues';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { FontGroups } from '../../theming/fontGroups';

const RulesStack = styled(Stack)`
  width: unset;

  > div:first-of-type {
    padding-right: 13px;
  }

  > div:nth-of-type(2) {
    padding-left: 13px;
  }
`;

const RulesCollectionWidth = styled(RulesCollection)`
  width: 80%;
`;

export function UserInformation(props: IUserInformationProps) {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [value, setValue] = useState<{
    goal: IEventResult<number>;
    savedAtStart: IEventResult<number>;
    moSavings: IEventResult<number>;
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
  }>(props.values);

  useEffect(() => {
    if (isDataLoaded && props.onChange) {
      props.onChange(value);
    }
  }, [value, isDataLoaded, props]);

  return (
    <form aria-label={props.title}>
      <GoalPanel
        inputFontGroup={FontGroups.inputGoal}
        inputLabelFontGroup={FontGroups.inputGoalLabel}
        min={1000}
        max={100000}
        prefix={'$'}
        required={true}
        title="Your Monthly Goal"
        showTitle={true}
        value={value.goal}
        hasSpinner={false}
        useUnderlineOnly={true}
        id="goal-panel"
        onChange={(e) => {
          const n = { ...value };
          n.goal.value = e.value?.value;
          setValue(n);
          setIsDataLoaded(true);
        }}
      />

      <RangeValidationPanel title="Savings">
        <RangeFieldValidator
          min={0}
          max={9999999}
          prefix="$"
          required={false}
          title="Amount Saved at Start"
          hasSpinner={true}
          useUnderlineOnly={false}
          showTitle={true}
          value={value.savedAtStart}
          id="amount-saved-at-start"
          onChange={(e) => {
            const n = { ...value };
            n.savedAtStart.value = e.value?.value;
            setValue(n);
            setIsDataLoaded(true);
          }}
        />
        <RangeFieldValidator
          min={0}
          max={9999999}
          prefix="$"
          required={false}
          title="Amount Saved Per Month"
          hasSpinner={true}
          showTitle={true}
          useUnderlineOnly={false}
          value={value.moSavings}
          id="amount-saved-per-month"
          onChange={(e) => {
            const n = { ...value };
            n.moSavings.value = e.value?.value;
            setValue(n);
            setIsDataLoaded(true);
          }}
        />
      </RangeValidationPanel>

      <RulesStack direction={'row'} flexGrow={2}>
        <RulesCollection
          title="Purchase Rules"
          values={value.purchaseRules}
          possibleChoices={props.choices.purchaseRules}
          onChange={(e) => {
            const n: {
              goal: IEventResult<number>;
              savedAtStart: IEventResult<number>;
              moSavings: IEventResult<number>;
              purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
              holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
            } = { ...value };
            n.purchaseRules = e.map((x) => {
              const wResult: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>> = {
                ...x,
                title: { value: x.title.value, validationResult: ValidatorTypes.Valid },
                property: { value: x.property.value, validationResult: ValidatorTypes.Valid },
                range: { value: x.range.value, validationResult: ValidatorTypes.Valid },
              };

              return wResult;
            });
            setValue(n);
            setIsDataLoaded(true);
          }}
        />

        <RulesCollectionWidth
          title="Hold Rules"
          values={value.holdRules}
          possibleChoices={props.choices.holdRules}
          onChange={(e) => {
            const n: {
              goal: IEventResult<number>;
              savedAtStart: IEventResult<number>;
              moSavings: IEventResult<number>;
              purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
              holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
            } = { ...value };
            n.holdRules = e.map((x) => {
              const wResult: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>> = {
                ...x,
                title: { value: x.title.value, validationResult: ValidatorTypes.Valid },
                property: { value: x.property.value, validationResult: ValidatorTypes.Valid },
                range: { value: x.range.value, validationResult: ValidatorTypes.Valid },
              };

              return wResult;
            });
            setValue(n);
            setIsDataLoaded(true);
          }}
        />
      </RulesStack>
    </form>
  );
}
