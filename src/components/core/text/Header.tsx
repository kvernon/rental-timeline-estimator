import { IThemeOptions } from '../../../theming/IThemeOptions';
import { FontGroups } from '../../../theming/fontGroups';
import { Header3 } from './Header3';
import React from 'react';
import { Header4 } from './Header4';
import { Header5 } from './Header5';
import { Header6 } from './Header6';

/**
 * defaults to h3
 * @param props
 * @constructor
 */
export function Header(props: { theme: IThemeOptions; fontGroup?: FontGroups; children: React.ReactNode | React.ReactNode[] }) {
  switch (props.fontGroup) {
    case FontGroups.h4:
      return (
        <Header4 theme={props.theme} fontGroup={props.fontGroup} style={{ lineHeight: '1.1em' }}>
          {props.children}
        </Header4>
      );
    case FontGroups.h5:
      return (
        <Header5 theme={props.theme} fontGroup={props.fontGroup} style={{ lineHeight: '1.1em' }}>
          {props.children}
        </Header5>
      );
    case FontGroups.h6:
      return (
        <Header6 theme={props.theme} fontGroup={props.fontGroup} style={{ lineHeight: '1.1em' }}>
          {props.children}
        </Header6>
      );
    default:
      return (
        <Header3 theme={props.theme} fontGroup={props.fontGroup} style={{ lineHeight: '1.1em' }}>
          {props.children}
        </Header3>
      );
  }
}
