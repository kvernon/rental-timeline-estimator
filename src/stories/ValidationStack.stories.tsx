import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ValidatorStack } from '../components/validators/ValidatorStack';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';

export default {
  title: 'Example/ValidatorStack',
  component: ValidatorStack,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ValidatorStack>;

const Template: ComponentStory<typeof ValidatorStack> = (args) => <ValidatorStack {...args} />;

export const Optional = Template.bind({});
Optional.args = {
  id: 'optional',
  panelValidatorStackType: ValidatorStackTypes.Optional,
  children: [<RangeFieldValidator validationType={ValidatorStackTypes.Optional} title={'input'} min={1} max={10} id={'id'} stackId={'optional'} />],
};

export const Required = Template.bind({});
Required.args = {
  id: 'required',
  panelValidatorStackType: ValidatorStackTypes.Required,
  children: [<RangeFieldValidator validationType={ValidatorStackTypes.Required} title={'input'} min={1} max={10} id={'id'} stackId={'required'} />],
};
