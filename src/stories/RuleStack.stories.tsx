import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { IRuleStackProps, RuleStack } from '../components/rules/RuleStack';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { RangeFieldValidatorName } from '../components/validators/RangeFieldValidatorName';
import { TitleDropDownValidatorName } from '../components/validators/TitleDropDownValidatorName';

const meta: ComponentMeta<typeof RuleStack> = {
  title: 'Example/RuleStack',
  component: RuleStack,
};

export default meta;

const Builder = (arg: IRuleStackProps) => {
  const defaultIdx = arg.defaultIndex || 0;
  const methods = useForm({
    defaultValues: {
      [`${TitleDropDownValidatorName(arg.id)}`]: {
        value: { value: defaultIdx, label: arg.ruleStackValues[defaultIdx].ruleTitle },
        validationResult: arg.validationType,
      },
      [`${RangeFieldValidatorName(arg.id)}`]: {
        value: undefined,
        validationResult: arg.validationType,
      },
    },
  });

  // eslint-disable-next-line no-undef
  const onSubmit = (data: unknown) => console.log(data);
  return (
    <FormProvider {...methods}>
      <DevTool control={methods.control} placement="top-left" />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RuleStack id={arg.id} ruleStackValues={arg.ruleStackValues} validationType={arg.validationType} />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
const Template: ComponentStory<typeof Builder> = (args) => <Builder {...args} />;

const commonArguments: IRuleStackProps = {
  id: 'ruleId',
  defaultIndex: 0,
  ruleStackValues: [
    {
      prefix: '$',
      suffix: '%',
      ruleTitle: 'None',
      max: 1,
      min: 0,
    },
    {
      prefix: '$',
      suffix: '%',
      ruleTitle: 'Example Rule For Money',
      min: 10,
      max: 20,
    },
    {
      prefix: '$',
      suffix: '%',
      ruleTitle: 'Example Rule For Percent',
      min: 0,
      max: 100,
    },
  ],
  validationType: ValidatorStackTypes.Required,
};

export const Required = Template.bind({});

Required.args = commonArguments;
