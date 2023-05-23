import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { IRangeFieldValidatorProps } from '../components/validators/IRangeFieldValidatorProps';
import { FormProvider, useForm } from 'react-hook-form';
import { ValidatorStackName } from '../components/validators/ValidatorStackName';
import { DevTool } from '@hookform/devtools';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';

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
  const methods = useForm({
    defaultValues: {
      [ValidatorStackName(arg.stackId)]: {
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
        <ValidationPanel panelType={arg.panelType} id={arg.stackId} title={arg.title as string}>
          <RangeFieldValidator
            id={arg.id}
            stackId={arg.stackId}
            min={arg.min}
            max={arg.max}
            suffix={arg.suffix}
            title={arg.title}
            prefix={arg.prefix}
            onBlur={arg.onBlur}
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
  stackId: 'Optional',
  panelType: ValidatorStackTypes.Optional,
  id: 'id',
  max: 10,
  min: 5,
};

export const Required = Template.bind({});
Required.args = {
  title: 'Required',
  stackId: 'Required',
  panelType: ValidatorStackTypes.Required,
  id: 'id',
  max: 10,
  min: 5,
};
