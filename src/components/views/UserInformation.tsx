import React from 'react';
import { GoalPanel } from '../panels/GoalPanel';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';
import { RulesCollection } from '../rules/RulesCollection';
import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { IUserInformationProps } from './IUserInformationProps';

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
  return (
    <form aria-label={props.title}>
      <GoalPanel
        min={1000}
        max={100000}
        prefix={'$'}
        required={true}
        title="Your Monthly Goal"
        showTitle={false}
        value={props.values.goal}
        hasSpinner={false}
        useUnderlineOnly={true}
        id="goal-panel"
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
          value={props.values.savedAtStart}
          id="amount-saved-at-start"
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
          value={props.values.moSavings}
          id="amount-saved-per-month"
        />
      </RangeValidationPanel>

      <RulesStack direction={'row'} flexGrow={2}>
        <RulesCollection title="Purchase Rules" values={props.values.purchaseRules} possibleChoices={props.choices.purchaseRules} />
        <RulesCollectionWidth title="Hold Rules" values={props.values.holdRules} possibleChoices={props.choices.holdRules} />
      </RulesStack>
    </form>
  );
}
