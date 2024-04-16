import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PropertyDropDownValidator } from '../components/validators/PropertyDropDownValidator2';
import React from 'react';

export default {
  title: 'Example/PropertyDropDown',
  component: PropertyDropDownValidator,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PropertyDropDownValidator>;

const Template: ComponentStory<typeof PropertyDropDownValidator> = (args) => <PropertyDropDownValidator {...args} />;

export const Basics = Template.bind({});
Basics.args = {};
