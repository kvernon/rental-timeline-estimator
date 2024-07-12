import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { ValidatorStackTypes } from './components/validators/ValidatorStackTypes';
import { options } from './theming/theme';
import { ValidationPanel } from './components/panels/ValidationPanel';
import { RangeFieldValidator } from './components/validators/RangeFieldValidator';
import { RangeFieldValidatorName } from './components/naming/RangeFieldValidatorName';
import { IRangeFieldValidatorProps } from './components/validators/IRangeFieldValidatorProps';
import { RulesCollection } from './components/rules/RulesCollection';
import { Stack } from './components/core/Stack';
import { Page } from './components/core/Page';
import { ValidatorTypes } from './components/validators/ValidatorTypes';
import styled from '@emotion/styled';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { getFields } from './rules/getFields';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { GoalPanel } from './components/panels/GoalPanel';
import { FontGroups } from './theming/fontGroups';
import { IFieldTypeProperties } from './components/rules/IFieldTypeProperties';
import { IEventResult } from './components/validators/IEventResult';

export const App = function () {
  const goalProps: IRangeFieldValidatorProps = {
    inputFontGroup: FontGroups.inputGoal,
    inputLabelFontGroup: FontGroups.inputGoalLabel,
    id: 'monthToMonthGoal',
    min: 1000,
    max: 100000,
    prefix: '$',
    validationType: ValidatorStackTypes.Required,
    title: 'Your Monthly Goal',
    defaultValue: 3000,
  };

  const savingsAtStartProps: IRangeFieldValidatorProps = {
    id: 'savedAtStart',
    min: 0,
    max: 9999999,
    prefix: '$',
    validationType: ValidatorStackTypes.Optional,
    title: 'Amount Saved at Start',
    hasSpinner: true,
    useUnderlineOnly: false,
  };

  const savedMonthly: IRangeFieldValidatorProps = {
    id: 'savedMonthly',
    min: 0,
    max: 9999999,
    prefix: '$',
    validationType: ValidatorStackTypes.Optional,
    title: 'Amount Saved Per Month',
    hasSpinner: true,
    useUnderlineOnly: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const methods = {
    mode: 'all',
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      [`${RangeFieldValidatorName(goalProps.id)}`]: {
        value: goalProps.defaultValue,
        validationResult: ValidatorTypes.Valid,
      },
      [`${RangeFieldValidatorName(savingsAtStartProps.id)}`]: {
        value: savingsAtStartProps.min,
        validationResult: ValidatorTypes.Valid,
      },
      [`${RangeFieldValidatorName(savedMonthly.id)}`]: {
        value: savedMonthly.min,
        validationResult: ValidatorTypes.Valid,
      },
      [purchaseConfig.panelTitle]: getFields(purchaseConfig.collection),
      [holdConfig.panelTitle]: [],
    },
  };

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

  const [goal, setGoal] = React.useState<IEventResult<number>>({
    value: goalProps?.defaultValue,
    validationResult: ValidatorTypes.Valid,
    validationResultName: ValidatorTypes[ValidatorTypes.Valid],
  });
  const [moSavings, setMoSavings] = React.useState<IEventResult<number>>({
    value: savedMonthly?.defaultValue,
    validationResult: ValidatorTypes.Optional,
    validationResultName: ValidatorTypes[ValidatorTypes.Optional],
  });
  const [savedAtStart, setSavedAtStart] = React.useState<IEventResult<number>>({
    value: savingsAtStartProps?.defaultValue,
    validationResult: ValidatorTypes.Optional,
    validationResultName: ValidatorTypes[ValidatorTypes.Optional],
  });

  const [purchaseRules, setPurchaseRules] = React.useState<IFieldTypeProperties[]>(getFields(purchaseConfig.collection));
  const [holdRules, setHoldRules] = React.useState<IFieldTypeProperties[]>([]);

  return (
    <ThemeProvider theme={options}>
      <form
        name="sim"
        onSubmit={(evt) => {
          evt.preventDefault();
          //console.log('submit', evt);
          console.log('submit goal', goal);
          console.log('submit moSavings', moSavings);
          console.log('submit savedAtStart', savedAtStart);
          console.log('submit purchaseRules:', purchaseRules);
          console.log('submit holdRules', holdRules);
        }}
      >
        <Page />
        <GoalPanel
          hasSpinner={false}
          useUnderlineOnly={true}
          {...goalProps}
          defaultValue={goal.value}
          onChange={(e) => {
            if (e.value !== goal.value) {
              setGoal(e);
            }
          }}
        />
        <ValidationPanel id={'savings'} panelType={ValidatorStackTypes.Optional} title={'Savings Plan'}>
          <RangeFieldValidator
            {...savingsAtStartProps}
            defaultValue={savedAtStart.value}
            onChange={(e) => {
              console.log('savings', e);
              if (e.value !== moSavings.value) {
                setMoSavings(e);
              }
            }}
          />
          <RangeFieldValidator
            {...savedMonthly}
            defaultValue={moSavings.value}
            onChange={(e) => {
              console.log('moSaving', e);
              if (e.value !== savedAtStart.value) {
                setSavedAtStart(e);
              }
            }}
          />
        </ValidationPanel>
        <RulesStack direction={'row'} flexGrow={2}>
          <RulesCollectionWidth
            id={'purchaseRules'}
            title={purchaseConfig.panelTitle}
            validationType={ValidatorStackTypes.Optional}
            possibleChoices={getRuleChoices(purchaseConfig.collection)}
            activeChoices={purchaseRules}
            onChange={(evt) => {
              setPurchaseRules(evt);
            }}
          />
          <RulesCollectionWidth
            id={'holdRules'}
            title={holdConfig.panelTitle}
            validationType={ValidatorStackTypes.Optional}
            possibleChoices={getRuleChoices(holdConfig.collection)}
            activeChoices={holdRules}
            onChange={(evt) => {
              setHoldRules(evt);
            }}
          />
        </RulesStack>
        <button type="submit">Save</button>
      </form>
    </ThemeProvider>
  );
};
