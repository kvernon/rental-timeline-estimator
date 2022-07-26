import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ValidationPanel } from '../components/panels/ValidationPanel';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';

export default {
  title: 'Example/ValidationPanel',
  component: ValidationPanel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ValidationPanel>;

const Template: ComponentStory<typeof ValidationPanel> = (args) => <ValidationPanel {...args} />;

export const Required = Template.bind({});
Required.args = {
  title: 'Required',
  id: 'id',
  children: [
    <RangeFieldValidator
      validationType={ValidatorStackTypes.Optional}
      title={'input'}
      min={1}
      max={10}
      sx={{ color: '#FFFFFFFF' }}
      defaultValue={7}
      id={'id'}
      stackId={'id'}
    />,
    <RangeFieldValidator
      validationType={ValidatorStackTypes.Optional}
      title={'input2'}
      min={1}
      max={10}
      sx={{ color: '#FFFFFFFF' }}
      defaultValue={1}
      id={'id2'}
      stackId={'id'}
    />,
  ],
};
