import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { IEventResult } from '../components/validators/IEventResult';

export default {
  title: 'Example/RangeFieldValidator',
  component: RangeFieldValidator,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof RangeFieldValidator>;

const Template: ComponentStory<typeof RangeFieldValidator> = (args) => <RangeFieldValidator {...args} id={'range'} />;

export const Optional = Template.bind({});
Optional.args = {
  title: 'Example Title',
  prefix: '$',
  suffix: 'Optional',
  validationType: ValidatorStackTypes.Optional,
  defaultValue: 1,
  onChange: (evt: IEventResult) => console.log(evt),
};

export const OptionalNoTitle = Template.bind({});
OptionalNoTitle.args = {
  prefix: '$',
  suffix: 'Optional',
  validationType: ValidatorStackTypes.Optional,
  defaultValue: 1,
  onChange: (evt: IEventResult) => console.log(evt),
};
export const OptionalNoSuffix = Template.bind({});
OptionalNoSuffix.args = {
  prefix: '$',
  validationType: ValidatorStackTypes.Optional,
  defaultValue: 1,
  onChange: (evt: IEventResult) => console.log(evt),
};

export const OptionalNothing = Template.bind({});
OptionalNothing.args = {
  validationType: ValidatorStackTypes.Optional,
  defaultValue: 1,
  onChange: (evt: IEventResult) => console.log(evt),
};

export const Required = Template.bind({});
Required.args = {
  title: 'Example Title 50px',
  prefix: 'Required',
  suffix: '%',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult) => console.log(evt),
};

export const RequiredNoTitle = Template.bind({});
RequiredNoTitle.args = {
  prefix: 'Required',
  suffix: '%',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult) => console.log(evt),
};

export const RequiredNoSuffix = Template.bind({});
RequiredNoSuffix.args = {
  prefix: 'Required',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult) => console.log(evt),
};

export const RequiredNothing = Template.bind({});
RequiredNothing.args = {
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult) => console.log(evt),
};
