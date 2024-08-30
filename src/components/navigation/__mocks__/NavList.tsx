import React from 'react';
import { INavListProps } from '../INavListProps';

export const NavList = jest.fn((props: INavListProps) => {
  return (
    <ul
      aria-label="navigation"
      onClick={() => {
        props.onClick('', props.navList);
      }}
    ></ul>
  );
});
