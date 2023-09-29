import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ValidatorStackTypes } from './components/validators/ValidatorStackTypes';
import { options } from './theming/theme';
import { ValidationPanel } from './components/panels/ValidationPanel';
import { RangeFieldValidator } from './components/validators/RangeFieldValidator';
import { RangeFieldValidatorName } from './components/naming/RangeFieldValidatorName';
import { IRangeFieldValidatorProps } from './components/validators/IRangeFieldValidatorProps';
import { RulesCollection } from './components/rules/RulesCollection';
import { DevTool } from '@hookform/devtools';
import { Stack } from './components/core/Stack';
import { Page } from './components/core/Page';
import { ValidatorTypes } from './components/validators/ValidatorTypes';
import styled from '@emotion/styled';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { getFields } from './rules/getFields';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';

export const App = function () {
  const goalProps: IRangeFieldValidatorProps = {
    id: 'monthToMonthGoal',
    min: 1000,
    max: 100000,
    prefix: '$',
    validationType: ValidatorStackTypes.Required,
    title: 'Goal',
    defaultValue: 3000,
  };

  const savingsAtStartProps: IRangeFieldValidatorProps = {
    id: 'savedAtStart',
    min: 0,
    max: 9999999,
    prefix: '$',
    validationType: ValidatorStackTypes.Optional,
    title: 'Amount Saved at Start',
  };

  const savedMonthly: IRangeFieldValidatorProps = {
    id: 'savedMonthly',
    min: 0,
    max: 9999999,
    prefix: '$',
    validationType: ValidatorStackTypes.Optional,
    title: 'Amount Saved Per Month',
  };

  const methods = useForm({
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
  });

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

  return (
    <ThemeProvider theme={options}>
      <FormProvider {...methods}>
        <Page />
        <DevTool control={methods.control} placement="bottom-right" />
        <ValidationPanel id={'goal'} panelType={ValidatorStackTypes.Required} title={'Goal'}>
          <RangeFieldValidator {...goalProps} />
        </ValidationPanel>
        <ValidationPanel id={'savings'} panelType={ValidatorStackTypes.Optional} title={'Savings Plan'}>
          <RangeFieldValidator {...savingsAtStartProps} />
          <RangeFieldValidator {...savedMonthly} />
        </ValidationPanel>
        <RulesStack direction={'row'} flexGrow={2}>
          <RulesCollectionWidth
            id={'purchaseRules'}
            title={purchaseConfig.panelTitle}
            validationType={ValidatorStackTypes.Optional}
            possibleChoices={getRuleChoices(purchaseConfig.collection)}
          />
          <RulesCollectionWidth
            id={'holdRules'}
            title={holdConfig.panelTitle}
            validationType={ValidatorStackTypes.Optional}
            possibleChoices={getRuleChoices(holdConfig.collection)}
          />
        </RulesStack>
      </FormProvider>
    </ThemeProvider>
  );
};
