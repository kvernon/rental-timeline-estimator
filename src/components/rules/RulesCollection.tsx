import React from 'react';
import { CardListLayout } from '../core/CardListLayout';
import { List } from 'react-movable';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { onChangeArray } from './onChangeArray';

export interface IRulesCollectionProps {
  title: string;
  values: {
    title: IEventResult<ISelectOption>;
    property: IEventResult<ISelectOption>;
    range: IEventResult<number>;
  }[];
  onChange?: (
    inputData: {
      title: IEventResult<ISelectOption>;
      property: IEventResult<ISelectOption>;
      range: IEventResult<number>;
    }[],
  ) => void;
}

export function RulesCollection(props: IRulesCollectionProps) {
  return (
    <CardListLayout title={props.title}>
      <List
        renderList={({ children, props }) => <div {...props}>{children}</div>}
        renderItem={({ value, props, index }) => (
          <div aria-label={value.title.value?.label || index?.toString()} {...props} key={`${props.key}`}>
            {JSON.stringify(value)}
          </div>
        )}
        values={props.values}
        onChange={({ oldIndex, newIndex }) => {
          if (props.onChange) {
            props.onChange(onChangeArray(props.values, oldIndex, newIndex));
          }
        }}
      />
    </CardListLayout>
  );
}
