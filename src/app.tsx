import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { Page } from './components/core/Page';
import { UserInformation } from './views/UserInformation';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';
import { ValidatorTypes } from './components/validators/ValidatorTypes';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { RawResults } from './views/RawResults';
import { NavList } from './components/navigation/NavList';
import { Stack } from './components/core/Stack';
import { validateUserInfo } from './data/validateUserInfo';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { PropertiesInformation } from './views/PropertiesInformation';
import { IUserInfo } from './data/IUserInfo';

export const App = function () {
  const [userInfo, setUserInfo] = React.useState<IUserInfo>({
    goal: { value: 3000, validationResult: ValidatorTypes.Valid },
    savedAtStart: { value: 1000, validationResult: ValidatorTypes.Valid },
    moSavings: { value: 200, validationResult: ValidatorTypes.Valid },
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
    { title: 'Properties' },
    {
      title: 'Results',
      isDisabled: true,
    },
  ]);

  useEffect(() => {
    const navListUpdated = [...navList];
    const i = navListUpdated.findIndex((n) => n.title === 'Results');

    navListUpdated[i].isDisabled = validateUserInfo(true, userInfo) === ValidatorTypes.Invalid;

    if (navListUpdated[i].isDisabled !== navList[i].isDisabled) {
      setNavList(navListUpdated);
    }
  }, [userInfo, navList]);

  return (
    <ThemeProvider theme={options}>
      <Page />
      <Stack>
        <NavList
          title="Navigation"
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
      {location === 'Properties' && (
        <PropertiesInformation
          {...{
            house: {
              title: 'Home',
              propertyType: PropertyType.SingleFamily,
              lowestPurchasePrice: { value: 150000, validationResult: ValidatorTypes.Valid },
              highestPurchasePrice: { value: 200000, validationResult: ValidatorTypes.Valid },
              lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
              highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
              lowestEquityCapturePercent: { value: 5, validationResult: ValidatorTypes.Valid },
              highestEquityCapturePercent: { value: 7, validationResult: ValidatorTypes.Valid },
              lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
              highestGenerationAmount: { value: 6, validationResult: ValidatorTypes.Valid },
            },
            apartment: {
              title: 'Apartment',
              propertyType: PropertyType.PassiveApartment,
              lowestPurchasePrice: { value: 150000, validationResult: ValidatorTypes.Valid },
              highestPurchasePrice: { value: 200000, validationResult: ValidatorTypes.Valid },
              lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
              highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
              lowestEquityCapturePercent: { value: 5, validationResult: ValidatorTypes.Valid },
              highestEquityCapturePercent: { value: 7, validationResult: ValidatorTypes.Valid },
              lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
              highestGenerationAmount: { value: 6, validationResult: ValidatorTypes.Valid },
            },
          }}
          onChange={() => {}}
        ></PropertiesInformation>
      )}
      {location === 'Results' && <RawResults userInfo={userInfo} />}
    </ThemeProvider>
  );
};
