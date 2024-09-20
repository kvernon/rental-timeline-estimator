import React, { useEffect, useState } from 'react';
import { GoalPanel } from '../components/panels/GoalPanel';
import { RangeValidationPanel } from '../components/panels/RangeValidationPanel';
import { RulesCollection } from '../components/rules/RulesCollection';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { Stack } from '../components/core/Stack';
import styled from '@emotion/styled';
import { IUserInformationProps } from './IUserInformationProps';
import { FontGroups } from '../theming/fontGroups';
import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';
import { IUserInfo } from '../data/IUserInfo';

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
  const [value, setValue] = useState<IUserInfo>(props.values);
  useEffect(() => {
    setIsDataLoaded(false);
  }, [props]);

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
          if (n.goal.value !== e.value) {
            n.goal = e;
            setValue(n);
            setIsDataLoaded(true);
          }
        }}
      />

      <RangeValidationPanel title="Savings" required={true}>
        <RangeFieldValidator<true>
          min={0}
          max={9999999}
          prefix="$"
          required={true}
          title="Amount Saved at Start"
          hasSpinner={true}
          useUnderlineOnly={false}
          showTitle={true}
          value={value.savedAtStart}
          id="amount-saved-at-start"
          onChange={(e) => {
            const n = { ...value };
            if (n.savedAtStart.value !== e.value) {
              n.savedAtStart = e;
              setValue(n);
              setIsDataLoaded(true);
            }
          }}
        />
        <RangeFieldValidator<true>
          min={0}
          max={9999999}
          prefix="$"
          required={true}
          title="Amount Saved Per Month"
          hasSpinner={true}
          showTitle={true}
          useUnderlineOnly={false}
          value={value.moSavings}
          id="amount-saved-per-month"
          onChange={(e) => {
            const n = { ...value };
            if (n.moSavings.value !== e.value) {
              n.moSavings = e;
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
            const n: IUserInfo = { ...value };
            n.purchaseRules = getRulesValuesToRulesValuesResults(false, e, props.choices.purchaseRules);
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
            const n: IUserInfo = { ...value };
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
