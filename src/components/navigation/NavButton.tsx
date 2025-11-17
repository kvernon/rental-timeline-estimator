import React from 'react';
import styled from '@emotion/styled';
import { INavButtonProps } from './INavButtonProps';

const NavLi = styled.li`
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding-left: 0.05em;
  padding-right: 0.05em;
`;

const CoreNavButton = styled.button<{ disabled?: boolean; selected?: boolean }>`
  cursor: default;
  flex-grow: 1;
  background-color: ${(props) => {
    if (props.disabled) {
      return '#4b6171';
    }

    if (!props.selected) {
      return '#3fa9f5';
    }

    return '#007ae6';
  }};
  display: block;
  height: 58px;
  padding: 0;
  border: none;
  border-top: 0.3rem solid black;
  border-bottom: 0.3rem solid black;

  &:hover:enabled {
    cursor: pointer;
    background-color: #007ae6;
  }
`;

const Span = styled.span`
  /* font-variant-caps: all-small-caps; */
  font-weight: 600;
  font-size: large;
  position: relative;
  bottom: -6px;
  padding: 0;
  /* line-height: 58px; */
  margin: 0;
`;

export function NavButton(props: INavButtonProps) {
  return (
    <CoreNavButton
      type="button"
      selected={props.selected}
      disabled={props.disabled}
      onClick={() => {
        if (!props.selected) {
          props.onClick(props.title);
        }
      }}
    >
      <Span>{props.title}</Span>
    </CoreNavButton>
  );
}

export const ListNavButton = (props: INavButtonProps) => {
  return (
    <NavLi>
      <NavButton {...props} />
    </NavLi>
  );
};
