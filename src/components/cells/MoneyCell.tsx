import styled from '@emotion/styled';
import { Span } from '../core/text/Span';
import React, { ReactNode, useState } from 'react';

import { currencyFormatter } from '../../data/currency-formatter';

export const MoneyCellBaseStyle = styled(Span)`
  white-space: nowrap;
  border: none;
  max-width: 120px;
  min-width: 96px;
`;

export const MoneyCellStyle = styled(MoneyCellBaseStyle)<{ isNegative?: boolean }>`
  text-align: right;
  color: ${(props) => {
    const whiteColor = 'white';

    if (!Object.hasOwn(props, 'isNegative')) {
      return whiteColor;
    }

    return props.isNegative ? 'pink' : whiteColor;
  }};
`;

export const MoneyCellLabel = styled(Span)`
  margin-left: 10px;
  white-space: nowrap;
`;

export const MoneyCell = (props: { currency?: number }): ReactNode => {
  const [currency] = useState(props.currency || 0);
  const isNegative: boolean = currency < 0;
  const s = currencyFormatter(props.currency || 0);

  return (
    <MoneyCellBaseStyle direction="row">
      <MoneyCellLabel>$</MoneyCellLabel>
      <MoneyCellStyle isNegative={isNegative}>{s}</MoneyCellStyle>
    </MoneyCellBaseStyle>
  );
};
