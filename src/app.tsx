import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { Page } from './components/core/Page';
import { UserInformation } from './components/views/UserInformation';
import { IEventResult } from './components/validators/IEventResult';
import { IRuleValues } from './components/rules/IRuleValues';
import { ISelectOption } from './components/core/ISelectOption';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';
import { ValidatorTypes } from './components/validators/ValidatorTypes';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { purchaseConfig } from './rules/purchaseRuleConfig';

export const App = function () {
  const [userInfo] = React.useState<{
    goal: IEventResult<number>;
    savedAtStart: IEventResult<number>;
    moSavings: IEventResult<number>;
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
  }>({
    goal: { value: 3000, validationResult: ValidatorTypes.Valid },
    savedAtStart: { validationResult: ValidatorTypes.Optional },
    moSavings: { validationResult: ValidatorTypes.Optional },
    purchaseRules: [],
    holdRules: [],
  });

  const [choices] = React.useState<{
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  }>({ holdRules: getRuleChoices(holdConfig.collection), purchaseRules: getRuleChoices(purchaseConfig.collection) });

  return (
    <ThemeProvider theme={options}>
      <Page />
      <UserInformation values={userInfo} choices={choices} title="User Information" onChange={(e) => console.log(e)} />
    </ThemeProvider>
  );
};
