import styled from '@emotion/styled';
import { Span } from '../core/Span';
import { getDate } from '../../data/getDate';
import React, { ReactNode } from 'react';

export const DateCellStyle = styled(Span)`
  white-space: nowrap;
  border: none;
  width: 100px;
  min-width: 100px;
`;

export const DateCell = (props: { date?: Date }): ReactNode => {
  return <DateCellStyle>{props.date ? getDate(props.date) : ''}</DateCellStyle>;
};
