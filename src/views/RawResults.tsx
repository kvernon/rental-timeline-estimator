import { Stack } from '../components/core/Stack';
import React, { useEffect, useState } from 'react';
import { generate } from '../data/generate';
import styled from '@emotion/styled';
import { IUserInfo } from '../data/IUserInfo';
import { IPropertiesInformationPropsEvent } from './IPropertiesInformationProps';
import { ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { TimelineProperties } from '../components/timeline/TimelineProperties';
import { UserLedger } from '../components/timeline/UserLedger';
import { NavList } from '../components/navigation/NavList';
import { UserSummary } from './UserSummary';

const Err = styled(Stack)`
  padding-top: 30px;
  color: pink;
  text-align: center;
`;

export function RawResults(props: { userInfo: IUserInfo; propertiesInfo: IPropertiesInformationPropsEvent }) {
  const [nav, setNav] = useState<
    {
      title: string;
      isSelected?: boolean | undefined;
      isDisabled?: boolean | undefined;
    }[]
  >([{ title: 'Ledger', isSelected: true }, { title: 'Properties' }]);
  const [location, setLocation] = React.useState<string>('Ledger');

  const [results, setResults] = React.useState<ITimeline>();

  const [userInfo] = useState<IUserInfo>(props.userInfo);
  const [propertiesInfo] = useState<IPropertiesInformationPropsEvent>(props.propertiesInfo);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isDataLoaded || JSON.stringify(props.userInfo) !== JSON.stringify(userInfo)) {
      setIsDataLoaded(true);
      setResults(generate(props.userInfo, props.propertiesInfo));
    }
  }, [props, isDataLoaded, userInfo, propertiesInfo]);

  try {
    const coreTheme = useTheme() as IThemeOptions;

    return (
      <Stack direction={'column'}>
        <NavList
          title="Timeline Navigation"
          navList={nav}
          onClick={(title, navList) => {
            setLocation(title);
            setNav(navList);
          }}
        />

        {results && <UserSummary results={results} />}

        <Stack theme={coreTheme} direction="column">
          {location === 'Ledger' && results && (
            <UserLedger
              ledgerCollection={results.user.ledgerCollection}
              startDate={results.startDate}
              endDate={results.endDate}
              monthlyIncomeAmountGoal={results.user.monthlyIncomeAmountGoal}
            />
          )}

          {location === 'Properties' && results && <TimelineProperties rentals={results.rentals} />}
        </Stack>
      </Stack>
    );
  } catch (e) {
    return <Err role="raw-results-failed">{(e as Error).message}</Err>;
  }
}
