import styled from '@emotion/styled';
import { Span } from '../core/Span';
import React, { ReactNode } from 'react';
import { currencyFormatter } from '../../data/data-number';

export const MoneyCellStyle = styled(Span)`
  white-space: nowrap;
  border: black solid;
  width: 96px;
  text-align: right;
`;

export const MoneyCell = (props: { currency?: number }): ReactNode => {
  return <MoneyCellStyle>{currencyFormatter(props.currency || 0)}</MoneyCellStyle>;
};
