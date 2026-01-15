import { ILedgerCollection, ILedgerDetailSummary } from '@cubedelement.com/realty-investor-timeline';
import React, { useState } from 'react';
import { Stack } from '../core/Stack';
import { UserLedgerItems } from './UserLedgerItems';
import { RegularStack } from './RegularStack';
import { WinningStack } from './WinningStack';
import styled from '@emotion/styled';

const Expanded = styled.span<{ metGoal: boolean }>`
  width: 20px;
  text-align: center;
  vertical-align: middle;
  background-color: ${(props) => (props.metGoal ? 'rgba(0, 100, 0, 0.37)' : 'rgba(0, 0, 0, 0.12)')};
`;

/**
 * will display the rollup month ledger summary
 * @param props
 * @constructor
 */
export function UserLedgerSummaryForMonth(props: {
  ledgerCollection: ILedgerCollection;
  ledgerDetailSummary: ILedgerDetailSummary;
  year: number;
  goal: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack direction={'column'}>
      <Stack direction={'row'}>
        <Expanded metGoal={props.ledgerDetailSummary.averageQuarterlyCashFlow >= props.goal}>{isExpanded ? '-' : '+'}</Expanded>
        {props.ledgerDetailSummary.averageQuarterlyCashFlow < props.goal && (
          <RegularStack ledgerDetailSummary={props.ledgerDetailSummary} onClick={onClick} />
        )}
        {props.ledgerDetailSummary.averageQuarterlyCashFlow >= props.goal && (
          <WinningStack ledgerDetailSummary={props.ledgerDetailSummary} onClick={onClick} />
        )}
      </Stack>

      {isExpanded && (
        <UserLedgerItems
          goalMet={props.ledgerDetailSummary.averageQuarterlyCashFlow >= props.goal}
          ledgerCollection={props.ledgerCollection}
          date={props.ledgerDetailSummary.date}
        />
      )}
    </Stack>
  );
}
