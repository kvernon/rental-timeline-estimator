import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ValidationBar } from '../components/validators/ValidationBar';
import React from 'react';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';

export default {
  title: 'Example/ValidationBar',
  component: ValidationBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ValidationBar>;

const Template: ComponentStory<typeof ValidationBar> = (args) => <ValidationBar {...args} />;

export const Optional = Template.bind({});
Optional.args = {
  isValid: ValidatorTypes.Optional,
};

export const Invalid = Template.bind({});
Invalid.args = {
  isValid: ValidatorTypes.Invalid,
};

export const Valid = Template.bind({});
Valid.args = {
  isValid: ValidatorTypes.Valid,
};
