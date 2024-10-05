import { Stack } from '../components/core/Stack';
import React, { useEffect, useState } from 'react';
import { generate } from '../data/generate';
import styled from '@emotion/styled';
import { IUserInfo } from '../data/IUserInfo';
import { IPropertiesInformationPropsEvent } from './IPropertiesInformationProps';
import { ILedgerCollection, ITimeline } from '@cubedelement.com/realty-investor-timeline';
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

  const [estimatedCashFlow, setEstimatedCashFlow] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [metMonthlyGoal, setMetMonthlyGoal] = useState<boolean>(false);
  const [equity, setEquity] = useState<number>(0);
  const [ownedProperties, setOwnedProperties] = useState<number>(0);
  const [allOwnedProperties, setAllOwnedProperties] = useState<number>(0);
  const [ledgerCollection, setLedgerCollection] = useState<ILedgerCollection | null>(null);

  useEffect(() => {
    setEstimatedCashFlow(results?.getEstimatedMonthlyCashFlow() || 0);
    setBalance(results?.getBalance(results.endDate) || 0);
    setOwnedProperties(results?.rentals.filter((p) => p.property.isOwned).length || 0);
    setAllOwnedProperties(results?.rentals.filter((p) => p.property.isOwned || !!p.property.soldDate).length || 0);
    setEquity(
      results?.rentals
        .filter((p) => p.property.isOwned)
        .reduce((previousValue, currentValue) => {
          currentValue.property.soldDate = results.endDate;
          return previousValue + currentValue.property.getEquityFromSell(results.endDate);
        }, 0) || 0,
    );
    setMetMonthlyGoal(
      results?.user.metMonthlyGoal(
        results.endDate,
        results.rentals.map((x) => x.property),
      ) || false,
    );
    setLedgerCollection(results?.user.ledgerCollection || null);
  }, [results]);

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

        {results && (
          <UserSummary
            endDate={results.endDate}
            ownedProperties={ownedProperties}
            allOwnedProperties={allOwnedProperties}
            startDate={results.startDate}
            metMonthlyGoal={metMonthlyGoal}
            balance={balance}
            equity={equity}
            estimatedCashFlow={estimatedCashFlow}
          />
        )}

        <Stack theme={coreTheme} direction="column">
          {location === 'Ledger' && results && ledgerCollection && (
            <UserLedger
              ledgerCollection={ledgerCollection}
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
