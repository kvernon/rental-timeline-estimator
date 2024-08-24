import React from 'react';
import { ICardListLayoutProps } from '../ICardListLayoutProps';

export const CardListLayout = jest.fn((props: ICardListLayoutProps) => {
  return (
    <div aria-label={props.title}>
      <span>{props.title}</span>
      {props.children}
    </div>
  );
});
