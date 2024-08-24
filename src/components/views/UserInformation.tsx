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
import { FontGroups } from '../../theming/fontGroups';
import { evaluateValidation } from '../validators/evaluateValidation';
import { isInRange } from '../validators/isInRange';
import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';

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
    goal: IEventResult<number | undefined>;
    savedAtStart: IEventResult<number | undefined>;
    moSavings: IEventResult<number | undefined>;
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  }>(props.values);
  useEffect(() => {
    setIsDataLoaded(false);
  }, [props]);

  useEffect(() => {
    if (isDataLoaded && props.onChange) {
      //console.log('UserInformation::useEffect', value)
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
          if (n.goal.value !== e.value?.value) {
            n.goal = evaluateValidation(true, isInRange, e.value?.value, { min: 1000, max: 100000 });
            setValue(n);
            setIsDataLoaded(true);
          }
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
            if (n.savedAtStart.value !== e.value?.value) {
              n.savedAtStart = evaluateValidation(true, isInRange, e.value?.value, { min: 0, max: 9999999 });
              setValue(n);
              setIsDataLoaded(true);
            }
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
            if (n.moSavings.value !== e.value?.value) {
              n.moSavings = evaluateValidation(true, isInRange, e.value?.value, { min: 0, max: 9999999 });
              setValue(n);
              setIsDataLoaded(true);
            }
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
              goal: IEventResult<number | undefined>;
              savedAtStart: IEventResult<number | undefined>;
              moSavings: IEventResult<number | undefined>;
              purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
              holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
            } = { ...value };
            n.purchaseRules = getRulesValuesToRulesValuesResults(false, e, props.choices.purchaseRules);
            //console.log("RulesCollection.onChange:: value.purchaseRules\n", value.purchaseRules);
            //console.log("RulesCollection.onChange:: n.purchaseRules\n", n.purchaseRules);
            if (JSON.stringify(value.purchaseRules) !== JSON.stringify(n.purchaseRules)) {
              setValue(n);
              setIsDataLoaded(true);
            }
          }}
        />

        <RulesCollectionWidth
          title="Hold Rules"
          values={value.holdRules}
          possibleChoices={props.choices.holdRules}
          onChange={(e) => {
            const n: {
              goal: IEventResult<number | undefined>;
              savedAtStart: IEventResult<number | undefined>;
              moSavings: IEventResult<number | undefined>;
              purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
              holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
            } = { ...value };
            n.holdRules = getRulesValuesToRulesValuesResults(false, e, props.choices.holdRules);
            if (JSON.stringify(value.holdRules) !== JSON.stringify(n.holdRules)) {
              setValue(n);
              setIsDataLoaded(true);
            }
          }}
        />
      </RulesStack>
    </form>
  );
}
