import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { IRuleCollectionProps, RulesCollection } from '../components/rules/RulesCollection';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { IFormRuleStackEntityDataValueResultEntity } from '../FormRuleStackEntityDataValueResult';

export default {
  title: 'Example/RulesCollection',
  component: RulesCollection,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof RulesCollection>;

const Builder = (arg: IRuleCollectionProps) => {
  const defaultIdx = 0;
  const id = `${arg.title}_${defaultIdx}`;
  console.log('id', id);
  const methods = useForm<{
    defaultValues: { [x: string]: { [y: string]: IFormRuleStackEntityDataValueResultEntity<number> }[] };
  }>({
    defaultValues: {
      [arg.title]: [],
    },
  });

  const onSubmit = (data: unknown) => console.log(data);
  return (
    <FormProvider {...methods}>
      <DevTool control={methods.control} placement="top-left" />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RulesCollection {...arg} />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

const Template: ComponentStory<typeof Builder> = (args) => <Builder {...args} />;

export const Basics = Template.bind({});
Basics.args = {
  id: 'example',
  title: 'A Rule',
  possibleChoices: [
    {
      ruleTitle: 'ruleTitle',
      suffix: 'suffix',
      prefix: 'prefix',
      min: 0,
      max: 10,
    },
    {
      ruleTitle: 'some other rule title',
      suffix: 'suffix',
      prefix: 'prefix',
      min: 0,
      max: 10,
    },
    {
      ruleTitle: 'one more rule title',
      suffix: 'suffix',
      prefix: 'prefix',
      min: 0,
      max: 10,
    },
  ],
};
