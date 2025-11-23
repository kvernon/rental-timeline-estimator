import { Page } from '../components/core/Page';

import React from 'react';
import { Stack } from '../components/core/Stack';
import { TitleImage } from '../components/core/TitleImage';
import { NavListMain } from '../components/navigation/NavListMain';
import { Outlet } from 'react-router';

export const RootLayout = () => (
  <>
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
    <Outlet />
  </>
);
