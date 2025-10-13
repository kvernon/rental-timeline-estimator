import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { options } from './theming/theme';
import { Page } from './components/core/Page';
import { UserInformation } from './views/UserInformation';
import { IRuleStackEntity } from './components/rules/IRuleStackEntity';
import { getRuleChoices } from './rules/getRuleChoices';
import { holdConfig } from './rules/holdRuleConfig';
import { purchaseConfig } from './rules/purchaseRuleConfig';
import { HashRouter, Route, Routes } from 'react-router';
import { Results } from './views/Results';
import { PropertiesInformation } from './views/PropertiesInformation';
import { Provider } from 'react-redux';
import { store } from './store';
import { Stack } from './components/core/Stack';
import { TitleImage } from './components/core/TitleImage';
import { NavListMain } from './components/navigation/NavListMain';
import { Settings } from './views/Settings';

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
      <HashRouter>
        <Provider store={store}>
          <Page />
          <Stack direction={'row'}>
            <TitleImage />
          </Stack>
          <Stack>
            <NavListMain
              title={'Navigation'}
              navList={[
                { title: 'Basics', path: '/' },
                { title: 'System', path: '/system' },
                { title: 'Properties', path: '/properties' },
                { title: 'Results', path: '/results' },
              ]}
            />
          </Stack>
          <Routes>
            <Route path="/" element={<UserInformation choices={choices} title="User Information" />} />
            <Route path="/system" element={<Settings />} />
            <Route path="/properties" element={<PropertiesInformation />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Provider>
      </HashRouter>
    </ThemeProvider>
  );
};
