import { ILedgerCollection, ILedgerSummary } from '@cubedelement.com/realty-investor-timeline';
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
export function UserLedgerSummaryForMonth(props: { ledgerCollection: ILedgerCollection; ledgerSummary: ILedgerSummary; year: number; goal: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Stack direction={'column'}>
      <Stack direction={'row'}>
        <Expanded metGoal={props.ledgerSummary.cashFlow >= props.goal}>{isExpanded ? '-' : '+'}</Expanded>
        {props.ledgerSummary.cashFlow < props.goal && <RegularStack ledgerSummary={props.ledgerSummary} onClick={onClick} />}
        {props.ledgerSummary.cashFlow >= props.goal && <WinningStack ledgerSummary={props.ledgerSummary} onClick={onClick} />}
      </Stack>

      {isExpanded && (
        <UserLedgerItems
          goalMet={props.ledgerSummary.cashFlow >= props.goal}
          ledgerCollection={props.ledgerCollection}
          date={props.ledgerSummary.date}
        />
      )}
    </Stack>
  );
}
