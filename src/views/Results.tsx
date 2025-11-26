import { Stack } from '../components/core/Stack';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { TimelineProperties } from '../components/timeline/TimelineProperties';
import { UserLedgerPage } from '../components/ledger/UserLedgerPage';
import { NavListSub } from '../components/navigation/NavListSub';
import { UserSummary } from './UserSummary';
import { Raw } from './Raw';
import { useTimeline } from './useTimeline';
import { useFormSelector } from '../redux/hooks';

const Err = styled(Stack)`
  padding-top: 30px;
  color: pink;
  text-align: center;
`;

export function Results() {
  const [nav, setNav] = useState<
    {
      title: string;
      isSelected?: boolean | undefined;
      isDisabled?: boolean | undefined;
    }[]
  >([{ title: 'Ledger', isSelected: true }, { title: 'Properties' }, { title: 'Raw' }]);
  const [location, setLocation] = React.useState<string>('Ledger');

  const coreTheme = useTheme() as IThemeOptions;

  const formData = useFormSelector((state) => {
    return state.form;
  });
  const { errorMessage } = useTimeline(formData);

  return (
    <>
      {errorMessage && <Err role="raw-results-failed">{errorMessage}</Err>}
      {!errorMessage && (
        <Stack direction={'column'} role={'raw-results'}>
          <NavListSub
            title="Timeline Navigation"
            navList={nav}
            onClick={(title, navList) => {
              setLocation(title);
              setNav(navList);
            }}
          />

          <UserSummary />

          <Stack theme={coreTheme} direction="column">
            {location === 'Ledger' && <UserLedgerPage />}
            {location === 'Properties' && <TimelineProperties />}
            {location === 'Raw' && <Raw />}
          </Stack>
        </Stack>
      )}
    </>
  );
}
