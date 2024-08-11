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
import { RuleStack } from './RuleStack';

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

export function RulesCollection(componentProps: IRulesCollectionProps) {
  const [showButton, setShowButton] = useState(false);

  const coreTheme = useTheme() as IThemeOptions;

  useEffect(() => {
    setShowButton(
      getRemainingValues(
        componentProps.possibleChoices,
        componentProps.values.map((x) => x.title),
      ).length > 0,
    );
  }, [componentProps]);

  return (
    <CardListLayout title={componentProps.title}>
      <List
        renderList={({ children, props }) => (
          <div aria-label={'render-list'} {...props}>
            {children}
          </div>
        )}
        renderItem={({ value, props, index }) => {
          return (
            <RuleStack
              ruleStackValues={[]}
              index={index as number}
              value={value}
              {...props}
              onUpdate={(evt) => {
                if (index !== undefined && componentProps.onChange) {
                  const newed = [...componentProps.values];
                  newed[index] = evt;
                  componentProps.onChange(newed);
                }
              }}
            />
          );
        }}
        values={componentProps.values}
        onChange={({ oldIndex, newIndex }) => {
          if (componentProps.onChange) {
            componentProps.onChange(onChangeArray(componentProps.values, oldIndex, newIndex));
          }
        }}
      />
      {showButton && (
        <AddListButton
          role={`Add button for ${componentProps.title}`}
          label="Add"
          theme={coreTheme}
          onClick={function (): void {
            if (componentProps.onChange) {
              const remaining = getRemainingValues(
                componentProps.possibleChoices,
                componentProps.values.map((x) => x.title),
              );

              componentProps.onChange([
                ...componentProps.values,
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
                  range: { validationResult: componentProps.required ? ValidatorTypes.Invalid : ValidatorTypes.Valid },
                },
              ]);
            }
          }}
        />
      )}
    </CardListLayout>
  );
}
