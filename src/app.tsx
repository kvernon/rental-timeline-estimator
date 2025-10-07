import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { Page } from './components/core/Page';
import { UserInformation } from './views/UserInformation';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  return (
    <ThemeProvider theme={options}>
      <BrowserRouter>
        <Provider store={store}>
          <Page />
          <Stack>
            <NavListGeneric
              title={'Navigation'}
              navList={[
                { title: 'User Information', path: '/' },
                { title: 'Properties Information', path: '/properties' },
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
