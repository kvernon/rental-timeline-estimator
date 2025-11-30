import React from 'react';
import { CardListLayout } from '../core/CardListLayout';
import { arrayMove, List } from 'react-movable';
import { onChangeArray } from './hooks/onChangeArray';
import { AddListButton } from '../core/AddListButton';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { getRemainingValues } from './hooks/getRemainingValues';
import { RuleStack } from './RuleStack';
import { IRulesCollectionProps } from './IRulesCollectionProps';
import { IRuleValues } from './IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IEventValue } from '../validators/IEventResult';
import { propertyOptions } from '../validators/PropertyOptions';
import { useEnableButton } from './hooks/useEnableButton';
import { useShowButton } from './hooks/useShowButton';

export function RulesCollection(componentProps: IRulesCollectionProps) {
  const coreTheme = useTheme() as IThemeOptions;
  const enableButton = useEnableButton(componentProps.values);

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
              ruleStackValues={getRemainingValues(
                componentProps.possibleChoices,
                componentProps.values.map((x) => ({ title: x.title, property: x.property })),
              )}
              index={index ? componentProps.values.length - index : componentProps.values.length}
              value={value}
              {...props}
              key={props.key}
              onUpdate={(evt) => {
                if (index !== undefined && componentProps.onChange) {
                  const newed = [
                    ...componentProps.values.map((x) => {
                      const y: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>> = {
                        title: x.title,
                        property: x.property,
                        range: x.range,
                      };
                      return y;
                    }),
                  ];
                  newed[index] = evt;
                  componentProps.onChange(newed);
                }
              }}
              removeClick={() => {
                if (index !== undefined && componentProps.onChange) {
                  const newed = [
                    ...componentProps.values.map((x) => {
                      const y: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>> = {
                        title: x.title,
                        property: x.property,
                        range: x.range,
                      };
                      return y;
                    }),
                  ];
                  newed.splice(index, 1);
                  componentProps.onChange(newed);
                }
              }}
            />
          );
        }}
        values={componentProps.values}
        onChange={({ oldIndex, newIndex }) => {
          if (componentProps.onChange) {
            arrayMove(componentProps.values, oldIndex, newIndex);
            componentProps.onChange(onChangeArray(componentProps.values, oldIndex, newIndex));
          }
        }}
      />
      {useShowButton(componentProps.possibleChoices, componentProps.values) && (
        <AddListButton
          role={`Add button for ${componentProps.title}`}
          label="Add"
          theme={coreTheme}
          isDisabled={!enableButton}
          onClick={function (): void {
            if (componentProps.onChange) {
              const remaining = getRemainingValues(
                componentProps.possibleChoices,
                componentProps.values.map((x) => ({ title: x.title, property: x.property })),
              ).filter((x) => !x.isDisabled);

              const findIndex = remaining.findIndex((x) => !x.isDisabled);
              const updatedArray = [
                ...componentProps.values,
                {
                  title: {
                    value: {
                      value: findIndex,
                      label: remaining[findIndex].ruleTitle,
                    },
                  },
                  property: {
                    value: {
                      value: remaining[findIndex].property,
                      label: propertyOptions[remaining[findIndex].property],
                    },
                  },
                  range: { value: undefined },
                },
              ];

              componentProps.onChange(updatedArray);
            }
          }}
        />
      )}
    </CardListLayout>
  );
}
