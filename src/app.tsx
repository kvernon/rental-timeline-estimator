import React, { useEffect } from 'react';
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
import { RawResults } from './components/views/RawResults';
import { NavList } from './components/navigation/NavList';
import { Stack } from './components/core/Stack';
import { getValidationResult } from './components/rules/getValidationResult';

export const App = function () {
  const [userInfo, setUserInfo] = React.useState<{
    goal: IEventResult<number | undefined>;
    savedAtStart: IEventResult<number | undefined>;
    moSavings: IEventResult<number | undefined>;
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  }>({
    goal: { value: 3000, validationResult: ValidatorTypes.Valid },
    savedAtStart: { value: undefined, validationResult: ValidatorTypes.Optional },
    moSavings: { value: undefined, validationResult: ValidatorTypes.Optional },
    purchaseRules: [],
    holdRules: [],
  });

  const [choices] = React.useState<{
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  }>({
    holdRules: getRuleChoices(holdConfig.collection),
    purchaseRules: getRuleChoices(purchaseConfig.collection),
  });

  const [location, setLocation] = React.useState<string>('Basics');

  const [navList, setNavList] = React.useState<
    {
      title: string;
      isSelected?: boolean | undefined;
      isDisabled?: boolean | undefined;
    }[]
  >([
    { title: 'Basics', isSelected: true },
    {
      title: 'Results',
      isDisabled: true,
    },
  ]);

  useEffect(() => {
    const navListUpdated = [...navList];
    const i = navListUpdated.findIndex((n) => n.title === 'Results');

    navListUpdated[i].isDisabled =
      getValidationResult([userInfo.moSavings.validationResult, userInfo.goal.validationResult, userInfo.savedAtStart.validationResult], true) ===
      ValidatorTypes.Invalid;

    if (navListUpdated[i].isDisabled !== navList[i].isDisabled) {
      setNavList(navListUpdated);
    }
  }, [userInfo, navList]);

  return (
    <ThemeProvider theme={options}>
      <Page />
      <Stack>
        <NavList
          navList={navList}
          onClick={(title, navList) => {
            setLocation(title);
            setNavList(navList);
          }}
        />
      </Stack>
      {location === 'Basics' && (
        <UserInformation
          values={userInfo}
          choices={choices}
          title="User Information"
          onChange={(e) => {
            setUserInfo(e);
          }}
        />
      )}

      {location === 'Results' && <RawResults userInfo={userInfo} />}
    </ThemeProvider>
  );
};
