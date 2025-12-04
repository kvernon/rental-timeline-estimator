import React from 'react';
import { UserInformation } from '../views/UserInformation';
import { Settings } from '../views/Settings';
import { PropertiesInformation } from '../views/PropertiesInformation';
import { Results } from '../views/Results';
import { createHashRouter } from 'react-router';
import { RootLayout } from '../views/RootLayout';

export const Router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserInformation title="User Information" />,
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
