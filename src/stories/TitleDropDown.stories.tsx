import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IOption, TitleDropDownValidator } from '../components/validators/TitleDropDownValidator';
import React from 'react';
import { DevTool } from '@hookform/devtools';
import { FormProvider, useForm } from 'react-hook-form';
import { TitleDropDownValidatorName } from '../components/naming/TitleDropDownValidatorName';
import { IFormRuleStackEntityDataValueResult } from '../FormRuleStackEntityDataValueResult';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';

export default {
  title: 'Example/TitleDropDown',
  component: TitleDropDownValidator,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof TitleDropDownValidator>;

const Template: ComponentStory<typeof TitleDropDownValidator> = (args) => {
  const methods = useForm<IFormRuleStackEntityDataValueResult<IOption>>({
    defaultValues: {
      [`${TitleDropDownValidatorName(args.id as string)}`]: {
        value: { value: args.defaultIndex || 0, label: args.titles[args.defaultIndex || 0] },
        validationResult: args.validationType === ValidatorStackTypes.Optional ? ValidatorTypes.Optional : ValidatorTypes.Invalid,
      },
    },
  });
  const onSubmit = (data: unknown) => console.log(data);
  return (
    <FormProvider {...methods}>
      <DevTool control={methods.control} placement="top-left" />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleDropDownValidator {...args} />
      </form>
    </FormProvider>
  );
};

export const TitleOfOne = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TitleOfOne.args = {
  id: 'TitleOfOne',
  titles: ['Some Drop Down'],
  onChange: (e) => console.log('TitleOfOne', e),
};

export const TitleOfTwoChoiceZero = Template.bind({});
TitleOfTwoChoiceZero.args = {
  id: 'TitleOfTwoChoiceZero',
  titles: ['None', 'Something'],
  defaultIndex: 0,
  onChange: (e) => console.log('TitleOfTwoChoiceZero', e),
};

export const TitleOfTwoChoiceOne = Template.bind({});
TitleOfTwoChoiceOne.args = {
  id: 'TitleOfTwoChoiceOne',
  titles: ['None', 'Second Choice With a Fairly Long Title That Goes On and On and On', 'Third Choice with an Average Long Title'],
  defaultIndex: 1,
  onChange: (e) => console.log('TitleOfTwoChoiceOne', e),
};
