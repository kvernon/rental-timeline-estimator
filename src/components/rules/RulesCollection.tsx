import React from 'react';
import { CardListLayout } from '../core/CardListLayout';

export interface IRulesCollectionProps {
  title: string;
}

export function RulesCollection(props: IRulesCollectionProps) {
  return (
    <CardListLayout title={props.title}>
      <div />
    </CardListLayout>
  );
}
