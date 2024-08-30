import React from 'react';
import { INavButtonProps } from '../INavButtonProps';

export const NavButton = jest.fn((props: INavButtonProps) => {
  return (
    <li
      onClick={() => {
        props.onClick(props.title);
      }}
    >
      {props.title}
    </li>
  );
});
