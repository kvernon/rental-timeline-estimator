import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { IEventResult } from '../components/validators/IEventResult';
import { RenderRangeFieldValidator } from './RenderRangeFieldValidator';

const meta: ComponentMeta<typeof RenderRangeFieldValidator> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/RangeFieldValidator',
  component: RenderRangeFieldValidator,
};

export default meta;

const Template: ComponentStory<typeof RenderRangeFieldValidator> = (args) => {
  return <RenderRangeFieldValidator {...args} />;
};

export const Optional = Template.bind({});
Optional.args = {
  id: 'Optional',
  onChange: (evt: IEventResult<number>) => console.log(evt),
  validationType: ValidatorStackTypes.Optional,
  prefix: '$',
  suffix: 'Optional',
  title: 'Example Title',
  max: 7,
  min: 3,
};

export const OptionalNoTitle = Template.bind({});
OptionalNoTitle.args = {
  id: 'OptionalNoTitle',
  prefix: '$',
  suffix: 'Optional',
  validationType: ValidatorStackTypes.Optional,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};

export const OptionalNoSuffix = Template.bind({});
OptionalNoSuffix.args = {
  id: 'OptionalNoSuffix',
  prefix: '$',
  validationType: ValidatorStackTypes.Optional,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};

export const OptionalNothing = Template.bind({});
OptionalNothing.args = {
  id: 'OptionalNothing',
  validationType: ValidatorStackTypes.Optional,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};
export const Required = Template.bind({});
Required.args = {
  id: 'Required',
  title: 'Example Title 50px',
  prefix: 'Required',
  suffix: '%',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};

export const RequiredNoTitle = Template.bind({});
RequiredNoTitle.args = {
  id: 'RequiredNoTitle',
  prefix: 'Required',
  suffix: '%',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};
export const RequiredNoSuffix = Template.bind({});
RequiredNoSuffix.args = {
  id: 'RequiredNoSuffix',
  prefix: 'Required',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};

export const RequiredNothing = Template.bind({});
RequiredNothing.args = {
  id: 'RequiredNothing',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
};

export const RequiredMixed = Template.bind({});
RequiredMixed.args = {
  id: 'RequiredMixed',
  validationType: ValidatorStackTypes.Required,
  onChange: (evt: IEventResult<number>) => console.log(evt),
  max: 7,
  min: 3,
  overrideValidationType: ValidatorStackTypes.Optional,
};
