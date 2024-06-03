import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { IRangeFieldValidatorProps } from '../components/validators/IRangeFieldValidatorProps';
import { FormProvider, useForm } from 'react-hook-form';
import { ValidatorStackName } from '../components/naming/ValidatorStackName';
import { DevTool } from '@hookform/devtools';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { IFormRuleStackEntityDataValueResult } from '../FormRuleStackEntityDataValueResult';

interface ITheseProps extends IRangeFieldValidatorProps {
  panelType: ValidatorStackTypes;
}

export default {
  title: 'Example/ValidationPanel',
  component: ValidationPanel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ValidationPanel>;

const Builder = (arg: ITheseProps) => {
  const methods = useForm<IFormRuleStackEntityDataValueResult<number>>({
    defaultValues: {
      [ValidatorStackName(arg.id)]: {
        [`rangeFieldValidator${arg.id}`]: {
          value: undefined,
          validationResult: arg.validationType,
        },
      },
    },
  });

  const onSubmit = (data: unknown) => console.log(data);
  return (
    <FormProvider {...methods}>
      <DevTool control={methods.control} placement="top-left" />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ValidationPanel panelType={arg.panelType} title={arg.title as string} id={arg.id}>
          <RangeFieldValidator
            id={arg.id}
            min={arg.min}
            max={arg.max}
            suffix={arg.suffix}
            title={arg.title}
            prefix={arg.prefix}
            onChange={arg.onChange}
            validationType={arg.validationType}
          />
        </ValidationPanel>
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

const Template: ComponentStory<typeof Builder> = (args) => {
  return <Builder {...args} />;
};

export const Optional = Template.bind({});
Optional.args = {
  title: 'Optional',
  panelType: ValidatorStackTypes.Optional,
  id: 'id',
  max: 10,
  min: 5,
};

export const Required = Template.bind({});
Required.args = {
  title: 'Required',
  panelType: ValidatorStackTypes.Required,
  id: 'id',
  max: 10,
  min: 5,
};
