import { Stack } from '../components/core/Stack';
import { getDate } from '../data/getDate';
import React, { useEffect, useState } from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';
import { GoalPanelDataSummary } from '../components/panels/GoalPanelDataSummary';
import { PanelDataSummary } from '../components/panels/PanelDataSummary';
import styled from '@emotion/styled';
import { currencyFormatter } from '../data/currency-formatter';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { useFormDispatch, useFormSelector } from '../redux/hooks';
import {
  getActivelyOwnedPropertiesCount,
  getCompletedValidation,
  getEndDateBalanceForUser,
  getEquity,
  getGoalMetForUser,
  getOwnedOrSoldPropertiesCount,
  getStartAndEndDate,
} from '../redux/timeilneSelectors';
import { setAnimationCompleted } from '../redux/timelineSlice';

const StackContainer = styled(Stack)`
  align-items: stretch;
`;

const StackContainColumn = styled(Stack)`
  > div {
    margin-bottom: 10px;
  }

  > div:last-of-type {
    margin-bottom: 0;
  }
`;

export function UserSummary() {
  const metMonthlyGoal = useFormSelector(getGoalMetForUser);
  const [startDate, endDate] = useFormSelector(getStartAndEndDate);
  const equity = useFormSelector(getEquity);
  const allOwnedProperties = useFormSelector(getOwnedOrSoldPropertiesCount);
  const ownedProperties = useFormSelector(getActivelyOwnedPropertiesCount);
  const balance = useFormSelector(getEndDateBalanceForUser);
  const [validationType, setValidationType] = useState<ValidatorTypes>(ValidatorTypes.Optional);
  const isValid = useFormSelector(getCompletedValidation);
  const dispatch = useFormDispatch();

  useEffect(() => {
    console.log('UserSummary useEffect isValid:', ValidatorTypes[isValid]);
    if (isValid !== ValidatorTypes.Optional) {
      setValidationType(isValid);
      dispatch(setAnimationCompleted(false));
    }
  }, [isValid]);

  if (!startDate || !endDate) {
    return null;
  }

  return (
    <div>
      <ValidationPanel
        title={`Results: ${getDate(startDate)} - ${getDate(endDate)}`}
        padRight={false}
        validationType={validationType}
        forceIsValid={false}
      >
        <StackContainer direction="row" paddingLeft="0" paddingRight="0" paddingBottom="0">
          <Stack direction="row" paddingLeft="0" paddingRight="0" paddingBottom="0" marginBottom="0">
            <StackContainColumn direction="column" paddingLeft="0" paddingBottom="0">
              <PanelDataSummary title="Years to goal" data={(endDate.getFullYear() - startDate.getFullYear()).toString()} />
              <PanelDataSummary title="Properties equity" data={`$${currencyFormatter(equity)}`} />
              <PanelDataSummary title="End balance" data={`$${currencyFormatter(balance)}`} />
            </StackContainColumn>
            <StackContainColumn direction="column" paddingLeft="10px" paddingBottom="0">
              <PanelDataSummary title="Goal acheived" data={metMonthlyGoal ? 'Yes' : 'No'} />
              <PanelDataSummary title="Properties owned" data={allOwnedProperties.toString()} />
              <PanelDataSummary title="Current properties" data={ownedProperties.toString()} />
            </StackContainColumn>
          </Stack>
          {/** TODO: link the validation type updated from here to this ValidationPanel */}
          <GoalPanelDataSummary />
        </StackContainer>
      </ValidationPanel>
    </div>
  );
}
