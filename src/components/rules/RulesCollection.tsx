import { IRuleCollectionProps } from './IRuleCollectionProps';
import React, { ReactNode, useEffect, useState } from 'react';
import { CardListLayout } from '../core/CardListLayout';
import { arrayMove, arrayRemove, List } from 'react-movable';
import styled from '@emotion/styled';
import { CardContent } from '../core/CardContent';
import { RuleStack } from './RuleStack';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IAry, IFieldType } from './FormInterfaces';
import { AddListButton } from '../core/AddListButton';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorTypes } from '../validators/ValidatorTypes';

export const RulesCollection = function (collectionProps: IRuleCollectionProps): ReactNode {
  const coreTheme = useTheme() as IThemeOptions;

  const methods = useFormContext<IAry<string>>();

  const { fields, swap, append, remove } = useFieldArray({
    name: `${collectionProps.title}`,
    control: methods.control,
  });

  const [fieldItems, setFieldItems] = React.useState<IFieldType[]>(fields);

  const [possibleChoices, setPossibleChoices] = useState(collectionProps.possibleChoices || []);

  const CardContentForList = styled(CardContent)`
    padding: 0;
  `;

  const [showButton, setShowButton] = useState(false);

  const [remainingChoices, setRemainingChoices] = useState<IRuleStackEntity[]>([]);

  useEffect(() => {
    const possibleRemainingChoices = possibleChoices.filter((y) => {
      return !fieldItems.some((li) => li?.titleDropDown?.value?.label === y.ruleTitle.replace(' Percent', ''));
    });

    setShowButton(fieldItems.length === 0 || possibleRemainingChoices.filter((x) => x.ruleTitle.toLowerCase() !== 'none').length > 0);
    if (JSON.stringify(possibleRemainingChoices) !== JSON.stringify(remainingChoices)) {
      setRemainingChoices(possibleRemainingChoices);
    }
  }, [fieldItems, possibleChoices, remainingChoices]);

  const onClick = () => {
    const index = possibleChoices.findIndex((F) => F.ruleTitle === remainingChoices[0].ruleTitle);
    const fieldItem: IFieldType = {
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

    setFieldItems((old) => [...old, fieldItem]);
    append(fieldItem);
  };

  return (
    <CardListLayout id={collectionProps.id} title={collectionProps.title}>
      <List
        onChange={({ oldIndex, newIndex }) => {
          console.log('List::onChange', { oldIndex, newIndex });
          swap(oldIndex, newIndex);
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
            key={value?.titleDropDown?.value?.label}
            id={`${collectionProps.title}.${index}`}
            ruleStackValues={possibleChoices}
            validationType={collectionProps.validationType}
            removeClick={() => {
              setFieldItems(typeof index !== 'undefined' ? arrayRemove(fieldItems, index) : fieldItems);
              remove(index);
            }}
          />
        )}
      />

      {showButton && <AddListButton role={`add button for ${collectionProps.title}`} theme={coreTheme} onClick={onClick} label="Add" />}
    </CardListLayout>
  );
};
