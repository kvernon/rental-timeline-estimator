import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ValidationBar } from '../components/validators/ValidationBar';
import React from 'react';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import styled from '@emotion/styled';

export default {
  title: 'Example/ValidationBar',
  component: ValidationBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ValidationBar>;

const DivStyled = styled.div`
  display: flex;
  align-content: normal;
  align-items: stretch;
  flex-grow: 1;
  height: 200px;
  width: 200px;
`;

const Template: ComponentStory<typeof ValidationBar> = (args) => (
  <DivStyled>
    <ValidationBar {...args} />
  </DivStyled>
);

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
