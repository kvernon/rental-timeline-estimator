import { IRuleCollectionProps } from './IRuleCollectionProps';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { CardListLayout } from '../core/CardListLayout';
import { arrayMove, arrayRemove, List } from 'react-movable';
import styled from '@emotion/styled';
import { CardContent } from '../core/CardContent';
import { RuleStack } from './RuleStack';
import { defaultFieldItem, IFieldTypeProperties } from './IFieldTypeProperties';
import { AddListButton } from '../core/AddListButton';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { areSameFieldType } from './areSameFieldType';
import isEqual from 'lodash.isequal';

/**
 * Notes: rules collections should be the item that deals with the smart controls, not the items above
 */
export const RulesCollection = function (collectionProps: IRuleCollectionProps): ReactNode {
  const coreTheme = useTheme() as IThemeOptions;

  const hiddenElement = useRef<HTMLInputElement>(null);

  const [fieldItems, setFieldItems] = React.useState<IFieldTypeProperties[]>(collectionProps.activeChoices || []);

  const [possibleChoices, setPossibleChoices] = useState(collectionProps.possibleChoices || []);

  const CardContentForList = styled(CardContent)`
    padding: 0;
  `;

  useEffect(() => {
    if (collectionProps.onChange) {
      collectionProps.onChange(fieldItems);
    }
    hiddenElement.current?.dispatchEvent(
      new CustomEvent<IFieldTypeProperties[]>('change', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: fieldItems,
      }),
    );
  }, [collectionProps, fieldItems]);

  const [showButton, setShowButton] = useState(false);

  const [remainingChoices, setRemainingChoices] = useState<IRuleStackEntity[]>([]);

  useEffect(() => {
    const possibleRemainingChoices = possibleChoices.filter((y) => {
      return !fieldItems.some((li) => li?.titleDropDown?.value?.label === y.ruleTitle.replace(' Percent', ''));
    });

    setShowButton(fieldItems.length === 0 || possibleRemainingChoices.filter((x) => x.ruleTitle.toLowerCase() !== 'none').length > 0);
    if (!isEqual(possibleRemainingChoices, remainingChoices)) {
      setRemainingChoices(possibleRemainingChoices);
    }

    //console.log('possibleChoices', possibleChoices);
  }, [fieldItems, possibleChoices, remainingChoices]);

  const addEntityOnClick = () => {
    const index = possibleChoices.findIndex((F) => F.ruleTitle === remainingChoices[0].ruleTitle);
    const fieldItem: IFieldTypeProperties = {
      propertyDropDown: {
        value: {
          value: index === -1 ? 1 : index,
          label: 'house',
        },
        validationResult: ValidatorTypes.Valid,
      },
      titleDropDown: {
        value: {
          value: index === -1 ? 0 : index,
          label: remainingChoices[0].ruleTitle,
        },
        validationResult: ValidatorTypes.Valid,
      },
      rangeFieldValidator: {
        value: 0,
        validationResult: ValidatorTypes.Valid,
      },
    };
    console.log('addEntityOnClick');
    setFieldItems((old) => [...old, fieldItem]);
  };

  return (
    <CardListLayout id={collectionProps.id} title={collectionProps.title}>
      <List
        onChange={({ oldIndex, newIndex }) => {
          console.log('List::onChange', { oldIndex, newIndex });
          setPossibleChoices((choices) => {
            const newChoices = [...choices];
            const oldEntity = newChoices[oldIndex + 1];
            newChoices[oldIndex + 1] = newChoices[newIndex + 1];
            newChoices[newIndex + 1] = oldEntity;
            console.log('List::onChange:setPossibleChoices', newChoices);
            return newChoices;
          });
          setFieldItems(arrayMove(fieldItems, oldIndex, newIndex));
        }}
        values={fieldItems}
        renderList={({ children, props }) => {
          return <CardContentForList {...props}>{children}</CardContentForList>;
        }}
        renderItem={({ value, props, index }) => (
          <RuleStack
            {...props}
            index={index ? fieldItems.length - index : fieldItems.length}
            key={index + (value?.titleDropDown?.value?.label || '-key')}
            id={`${collectionProps.title}.${index}`}
            defaultIndex={possibleChoices.findIndex((x) => x.ruleTitle === value.titleDropDown.value?.label) || 0}
            ruleStackValues={possibleChoices}
            validationType={collectionProps.validationType}
            onUpdate={(evt: IFieldTypeProperties) => {
              console.log('RulesCollection::RuleStack::onUpdate index:', index, evt);
              console.log(
                'are different',
                index !== undefined && !areSameFieldType(fieldItems[index], evt),
                !areSameFieldType(evt, defaultFieldItem),
              );
              if (index !== undefined && !areSameFieldType(fieldItems[index], evt) && !areSameFieldType(evt, defaultFieldItem)) {
                const updated = [...fieldItems];
                updated[index] = evt;
                console.log('I am updating', updated);
                setFieldItems(updated);
              }
            }}
            removeClick={() => {
              setFieldItems(typeof index !== 'undefined' ? arrayRemove(fieldItems, index) : fieldItems);
            }}
          />
        )}
      />

      {showButton && <AddListButton role={`add button for ${collectionProps.title}`} theme={coreTheme} onClick={addEntityOnClick} label="Add" />}
    </CardListLayout>
  );
};
