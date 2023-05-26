import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PropertyDropDown } from '../components/PropertyDropDown';
import React from 'react';

export default {
  title: 'Example/PropertyDropDown',
  component: PropertyDropDown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PropertyDropDown>;

const Template: ComponentStory<typeof PropertyDropDown> = (args) => <PropertyDropDown {...args} />;

export const Basics = Template.bind({});
Basics.args = {};
