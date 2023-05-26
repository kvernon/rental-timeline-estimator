import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import React, { useState } from 'react';
import { Header5 } from '../core/Header5';
import { TypographyDiv } from '../core/TypographyDiv';
import { Card } from '../core/Card';
import { CardContent } from '../core/CardContent';
import { RuleStack } from './RuleStack';
import { IRuleStackEntity } from './IRuleStackEntity';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { FontGroups } from '../../theming/fontGroups';
import { List, arrayMove, arrayRemove } from 'react-movable';
import { IEntityDataValueResult } from '../../FormRuleStackEntityDataValueResult';
import { IOption } from '../validators/TitleDropDownValidator';
import { ValidatorTypes } from '../validators/ValidatorTypes';

export interface IRuleCollectionProps {
  id: string;
  title: string;
  validationType: ValidatorStackTypes;
  possibleChoices: IRuleStackEntity[];
}

const Button = styled.button<{
  theme: IThemeOptions;
}>`
  padding-top: 10px;
  padding-left: 3px;
  padding-right: 3px;
  height: 70px;
  width: 100%;
  font-family: ${(props) => props.theme.typography.get(FontGroups.inputLabel)?.font};
  font-size: ${(props) => props.theme.typography.get(FontGroups.inputLabel)?.size};
  font-weight: ${(props) => props.theme.typography.get(FontGroups.input)?.weight};
  background-color: ${(props) => props.theme.palette.inputBackground};
  border-radius: 0.3rem;
  border-width: 0;
  border-bottom: 5px solid #021c26;
  box-shadow: 0 10px 1px #05465e;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.4s ease-out;

  :hover {
    background-color: ${(props) => props.theme.palette.inputBackgroundFocus};
  }
`;

interface IFieldType {
  titleDropDown: IEntityDataValueResult<IOption>;
  rangeFieldValidator: IEntityDataValueResult<number>;
}

type IAry<Name extends string> = {
  [key in Name]: IFieldType[];
};

export const RulesCollection = (collectionProps: IRuleCollectionProps) => {
  const coreTheme = useTheme() as IThemeOptions;

  const methods = useFormContext<IAry<string>>();

  const fieldMethods = useFieldArray({
    name: `${collectionProps.title}`,
    control: methods.control,
  });

  const [fieldItems, setFieldItems] = React.useState<IFieldType[]>(fieldMethods.fields);
  const [possibleChoices, setPossibleChoices] = useState(collectionProps.possibleChoices || []);

  const remainingChoices = possibleChoices.filter((y) => {
    return !fieldMethods.fields.some((li) => li?.titleDropDown?.value?.label === y.ruleTitle.replace(' Percent', ''));
  });

  const CardPadding = styled(Card)`
    padding: 40px 40px 35px;
  `;

  const CardContentForList = styled(CardContent)`
    padding: 0;
  `;

  return (
    <Stack flexGrow={1} direction={'column'}>
      <TypographyDiv>
        <Header5 theme={coreTheme}>{collectionProps.title}</Header5>
      </TypographyDiv>
      <CardPadding id={`panel-${collectionProps.id}`} theme={coreTheme}>
        <List
          onChange={({ oldIndex, newIndex }) => {
            console.log('List::onChange', { oldIndex, newIndex });
            fieldMethods.swap(oldIndex, newIndex);
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
          renderItem={({ value, props, index }) => {
            return (
              <RuleStack
                {...props}
                key={value?.titleDropDown?.value?.label}
                id={`${collectionProps.title}.${index}`}
                ruleStackValues={possibleChoices}
                validationType={collectionProps.validationType}
                removeClick={() => {
                  setFieldItems(typeof index !== 'undefined' ? arrayRemove(fieldItems, index) : fieldItems);
                  fieldMethods.remove(index);
                }}
              />
            );
          }}
        />

        {(fieldItems.length === 0 || remainingChoices.length > 1) && (
          <Button
            type={'button'}
            theme={coreTheme}
            onClick={() => {
              const fieldItem: IFieldType = {
                titleDropDown: {
                  value: {
                    value: 0,
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
              fieldMethods.append(fieldItem);
            }}
          >
            Add
          </Button>
        )}
      </CardPadding>
    </Stack>
  );
};
