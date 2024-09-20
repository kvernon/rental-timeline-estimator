import React from 'react';
import { INavListProps } from '../INavListProps';

export const NavList = jest.fn((props: INavListProps) => {
  return (
    <ul
      aria-label={props.title}
      onClick={() => {
        props.onClick('', props.navList);
      }}
    ></ul>
  );
});
