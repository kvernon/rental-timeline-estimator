import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { Page } from './components/core/Page';
import { UserInformation } from './views/UserInformation';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Results } from './views/Results';
import { PropertiesInformation } from './views/PropertiesInformation';
import { Provider } from 'react-redux';
import { store } from './store';
import { Stack } from './components/core/Stack';
import { NavListGeneric } from './components/navigation/NavList';

export const App = function () {
  const [choices] = React.useState<{
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  }>({
    holdRules: getRuleChoices(holdConfig.collection),
    purchaseRules: getRuleChoices(purchaseConfig.collection),
  });

  console.log('app process.env.BASE_PATH', process.env.BASE_PATH);

  return (
    <ThemeProvider theme={options}>
      <BrowserRouter basename={process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '/'}>
        <Provider store={store}>
          <Page />
          <Stack>
            <NavListGeneric
              title={'Navigation'}
              navList={[
                { title: 'Basics', path: '/' },
                { title: 'Properties', path: '/properties' },
                { title: 'Results', path: '/results' },
              ]}
            />
          </Stack>
          <Routes>
            <Route path="/" element={<UserInformation choices={choices} title="User Information" />} />
            <Route path="/properties" element={<PropertiesInformation />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
