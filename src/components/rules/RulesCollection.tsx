import React, { useEffect, useState } from 'react';
import { CardListLayout } from '../core/CardListLayout';
import { List } from 'react-movable';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { onChangeArray } from './onChangeArray';
import { AddListButton } from '../core/AddListButton';
import { IRuleStackEntity } from './IRuleStackEntity';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { getRemainingValues } from './getRemainingValues';
import { ValidatorTypes } from '../validators/ValidatorTypes';

export interface IRulesCollectionProps {
  required?: boolean;
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
  possibleChoices: IRuleStackEntity[];
}

export function RulesCollection(props: IRulesCollectionProps) {
  const [showButton, setShowButton] = useState(false);

  const coreTheme = useTheme() as IThemeOptions;

  useEffect(() => {
    setShowButton(
      getRemainingValues(
        props.possibleChoices,
        props.values.map((x) => x.title),
      ).length > 0,
    );
  }, [props]);

  return (
    <CardListLayout title={props.title}>
      <List
        renderList={({ children, props }) => (
          <div aria-label={'render-list'} {...props}>
            {children}
          </div>
        )}
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
      {showButton && (
        <AddListButton
          role={`Add button for ${props.title}`}
          label="Add"
          theme={coreTheme}
          onClick={function (): void {
            if (props.onChange) {
              const remaining = getRemainingValues(
                props.possibleChoices,
                props.values.map((x) => x.title),
              );

              props.onChange([
                ...props.values,
                {
                  title: {
                    value: {
                      value: remaining[0].index,
                      label: remaining[0].entity.ruleTitle,
                    },
                    validationResult: ValidatorTypes.Valid,
                  },
                  property: {
                    value: {
                      value: remaining[0].entity.property,
                      label: 'house',
                    },
                    validationResult: ValidatorTypes.Valid,
                  },
                  range: { validationResult: props.required ? ValidatorTypes.Invalid : ValidatorTypes.Valid },
                },
              ]);
            }
          }}
        />
      )}
    </CardListLayout>
  );
}
