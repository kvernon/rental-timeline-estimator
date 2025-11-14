import { Stack } from '../components/core/Stack';
import React, { useEffect, useState } from 'react';
import { generate } from '../data/generate';
import styled from '@emotion/styled';
import { ILedgerCollection, ITimeline } from '@cubedelement.com/realty-investor-timeline';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../theming/IThemeOptions';
import { TimelineProperties } from '../components/timeline/TimelineProperties';
import { UserLedger } from '../components/timeline/UserLedger';
import { NavListSub } from '../components/navigation/NavListSub';
import { UserSummary } from './UserSummary';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Regular = styled(Stack)`
  color: white;
`;

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

  const [results, setResults] = React.useState<ITimeline>();

  const formData = useSelector((state: RootState) => state.form);

  const [estimatedCashFlow, setEstimatedCashFlow] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [metMonthlyGoal, setMetMonthlyGoal] = useState<boolean>(false);
  const [equity, setEquity] = useState<number>(0);
  const [ownedProperties, setOwnedProperties] = useState<number>(0);
  const [allOwnedProperties, setAllOwnedProperties] = useState<number>(0);
  const [ledgerCollection, setLedgerCollection] = useState<ILedgerCollection | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ownedProperties = results?.rentals.filter((p) => p.property.isOwned).map((x) => x.property) || [];
    setEstimatedCashFlow(() =>
      !results ? 0 : ownedProperties.reduce((previousValue, currentValue) => previousValue + currentValue.getCashFlowByDate(results.endDate), 0),
    );
    setBalance(() => results?.getBalance(results.endDate) || 0);
    setOwnedProperties(() => ownedProperties?.length || 0);
    setAllOwnedProperties(() => results?.rentals.filter((p) => p.property.isOwned).map((x) => x.property)?.length || 0);
    setEquity(
      results
        ? ownedProperties.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.getEstimatedEquityFromSell(results.endDate);
          }, 0)
        : 0,
    );

    setMetMonthlyGoal(() => {
      if (!results) {
        return false;
      }

      const reduced = ownedProperties.reduce((previousValue, currentValue) => previousValue + currentValue.getCashFlowByDate(results.endDate), 0);
      return reduced >= results.user.monthlyIncomeAmountGoal;
    });
    setLedgerCollection(() => results?.user.ledgerCollection || null);
  }, [results]);

  useEffect(() => {
    try {
      const generatedResult = generate(formData.userInfo, formData.propertiesInfo, formData.settings);
      setResults(() => generatedResult);
      setError(null);
    } catch (e) {
      setError(e as Error);
    }
  }, [formData]);

  const coreTheme = useTheme() as IThemeOptions;

  return (
    <>
      {error && <Err role="raw-results-failed">{error.message}</Err>}
      {!error && (
        <Stack direction={'column'} role={'raw-results'}>
          <NavListSub
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
            {location === 'Raw' && results && (
              <Regular role="raw-results">
                <pre>{JSON.stringify(results, null, ' ')}</pre>
              </Regular>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
