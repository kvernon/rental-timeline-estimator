import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TitleDropDown } from '../components/rules/TitleDropDown';
import React from 'react';

export default {
  title: 'Example/TitleDropDown',
  component: TitleDropDown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TitleDropDown>;

const Template: ComponentStory<typeof TitleDropDown> = (args) =>   <TitleDropDown {...args} />;

export const TitleOfOne = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TitleOfOne.args = {
  titles: ['Some Drop Down'],
};

export const TitleOfTwoChoiceZero = Template.bind({});
TitleOfTwoChoiceZero.args = {
  titles: ['None', 'Something'],
  defaultIndex: 0,
};

export const TitleOfTwoChoiceOne = Template.bind({});
TitleOfTwoChoiceOne.args = {
  titles: ['None', 'Second Choice'],
  defaultIndex: 1,
};
