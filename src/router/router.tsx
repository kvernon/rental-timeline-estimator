import React from 'react';
import { UserInformation } from '../views/UserInformation';
import { Settings } from '../views/Settings';
import { PropertiesInformation } from '../views/PropertiesInformation';
import { Results } from '../views/Results';
import { createHashRouter } from 'react-router';
import { RootLayout } from '../views/RootLayout';
import { getRuleChoices } from '../rules/getRuleChoices';
import { holdConfig } from '../rules/holdRuleConfig';
import { purchaseConfig } from '../rules/purchaseRuleConfig';

const choices = {
  holdRules: getRuleChoices(holdConfig.collection),
  purchaseRules: getRuleChoices(purchaseConfig.collection),
};

export const Router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserInformation choices={choices} title="User Information" />,
      },
      {
        path: 'system',
        element: <Settings />,
      },
      {
        path: 'properties',
        element: <PropertiesInformation />,
      },
      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
]);
