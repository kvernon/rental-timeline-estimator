import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ValidatorStack } from '../components/validators/ValidatorStack';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { FormProvider, useForm } from 'react-hook-form';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { DevTool } from '@hookform/devtools';
import { IValidatorPanelProps } from '../components/validators/IValidatorPanelProps';
import { RangeFieldValidatorName } from '../components/validators/RangeFieldValidatorName';

const meta: ComponentMeta<typeof ValidatorStack> = {
  title: 'Example/ValidatorStack',
  component: ValidatorStack,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;

const Builder = (arg: IValidatorPanelProps) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      [`${RangeFieldValidatorName(arg.id)}`]: {
        value: undefined,
        validationResult: arg.panelValidatorStackType,
      },
    },
  });

  const onSubmit = (data: unknown) => console.log(data);
  return (
    <FormProvider {...methods}>
      <DevTool control={methods.control} placement="top-left" />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ValidatorStack panelValidatorStackType={arg.panelValidatorStackType} id={arg.id}>
          {arg.children}
        </ValidatorStack>
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

const Template: ComponentStory<typeof Builder> = (args) => {
  return (
    <Builder {...args}>
      <RangeFieldValidator
        id={args.id + '_1'}
        min={1}
        max={7}
        suffix={'suffix'}
        title={'title'}
        prefix={'prefix'}
        validationType={args.panelValidatorStackType}
      />
      <RangeFieldValidator
        id={args.id + '_2'}
        min={1}
        max={7}
        suffix={'suffix'}
        title={'title'}
        prefix={'prefix'}
        validationType={args.panelValidatorStackType}
      />
    </Builder>
  );
};

export const Optional = Template.bind({});
Optional.args = {
  id: 'optional',
  panelValidatorStackType: ValidatorStackTypes.Optional,
};

export const Required = Template.bind({});
Required.args = {
  id: 'required',
  panelValidatorStackType: ValidatorStackTypes.Required,
};
