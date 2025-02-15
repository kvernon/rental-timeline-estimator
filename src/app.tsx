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
import { Results } from './views/Results';
import { NavList } from './components/navigation/NavList';
import { Stack } from './components/core/Stack';
import { validateUserInfo } from './data/validateUserInfo';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import { PropertiesInformation } from './views/PropertiesInformation';
import { IUserInfo } from './data/IUserInfo';
import { IPropertiesInformationPropsEvent } from './views/IPropertiesInformationProps';
import { validatePropertiesInfo } from './data/validatePropertiesInfo';
import { propertyOptions } from './components/validators/PropertyDropDownValidator';

export const App = function () {
  const [choices] = React.useState<{
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  }>({
    holdRules: getRuleChoices(holdConfig.collection),
    purchaseRules: getRuleChoices(purchaseConfig.collection),
  });

  const [userInfo, setUserInfo] = React.useState<IUserInfo>({
    goal: { value: 5000, validationResult: ValidatorTypes.Valid },
    savedAtStart: { value: 70000, validationResult: ValidatorTypes.Valid },
    moSavings: { value: 3000, validationResult: ValidatorTypes.Valid },
    purchaseRules: [
      {
        title: {
          value: { value: 0, label: choices.purchaseRules[0].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 3600,
          validationResult: ValidatorTypes.Valid,
        },
      },
      {
        title: {
          value: { value: 3, label: choices.purchaseRules[3].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 60000,
          validationResult: ValidatorTypes.Valid,
        },
      },
    ],
    holdRules: [
      {
        title: {
          value: { value: 2, label: choices.holdRules[2].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 1,
          validationResult: ValidatorTypes.Valid,
        },
      },
      {
        title: {
          value: { value: 3, label: choices.holdRules[3].ruleTitle },
          validationResult: ValidatorTypes.Valid,
        },
        property: {
          value: { value: 1, label: propertyOptions[1] },
          validationResult: ValidatorTypes.Valid,
        },
        range: {
          value: 25,
          validationResult: ValidatorTypes.Valid,
        },
      },
    ],
  });

  const [propertiesInfo, setPropertiesInfo] = React.useState<IPropertiesInformationPropsEvent>({
    house: {
      title: 'Home',
      propertyType: PropertyType.SingleFamily,
      lowestPurchasePrice: { value: 150000, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 200000, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 40, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 85, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 1, validationResult: ValidatorTypes.Valid },
      highestGenerationAmount: { value: 6, validationResult: ValidatorTypes.Valid },
      lowestMinSellInYears: { value: 1, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 5, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 10, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 30, validationResult: ValidatorTypes.Valid },
    },
    apartment: {
      title: 'Apartment',
      propertyType: PropertyType.PassiveApartment,
      lowestPurchasePrice: { value: 25000, validationResult: ValidatorTypes.Valid },
      highestPurchasePrice: { value: 500000, validationResult: ValidatorTypes.Valid },
      lowestCashFlow: { value: 200, validationResult: ValidatorTypes.Valid },
      highestCashFlow: { value: 500, validationResult: ValidatorTypes.Valid },
      lowestEquityCapturePercent: { value: 5, validationResult: ValidatorTypes.Valid },
      highestEquityCapturePercent: { value: 7, validationResult: ValidatorTypes.Valid },
      lowestGenerationAmount: { value: 0, validationResult: ValidatorTypes.Valid },
      highestGenerationAmount: { value: 7, validationResult: ValidatorTypes.Valid },
      lowestMinSellInYears: { value: 5, validationResult: ValidatorTypes.Valid },
      highestMinSellInYears: { value: 8, validationResult: ValidatorTypes.Valid },
      lowestAppreciationValue: { value: 50, validationResult: ValidatorTypes.Valid },
      highestAppreciationValue: { value: 100, validationResult: ValidatorTypes.Valid },
    },
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
      isDisabled:
        validateUserInfo(true, userInfo) === ValidatorTypes.Invalid && validatePropertiesInfo(true, propertiesInfo) === ValidatorTypes.Invalid,
    },
  ]);

  useEffect(() => {
    const navListUpdated = [...navList];
    const i = navListUpdated.findIndex((n) => n.title === 'Results');

    navListUpdated[i].isDisabled =
      validateUserInfo(true, userInfo) === ValidatorTypes.Invalid && validatePropertiesInfo(true, propertiesInfo) === ValidatorTypes.Invalid;

    if (navListUpdated[i].isDisabled !== navList[i].isDisabled) {
      setNavList(navListUpdated);
    }
  }, [userInfo, navList, propertiesInfo]);

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
          {...propertiesInfo}
          onChange={(e) => {
            setPropertiesInfo(e);
          }}
        ></PropertiesInformation>
      )}
      {location === 'Results' && <Results userInfo={userInfo} propertiesInfo={propertiesInfo} />}
    </ThemeProvider>
  );
};
