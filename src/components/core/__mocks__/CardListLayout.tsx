import React from 'react';
import { ICardListLayoutProps } from '../ICardListLayoutProps';

export const CardListLayout = jest.fn((props: ICardListLayoutProps) => {
  return <span aria-label={props.title}>{props.children}</span>;
});
