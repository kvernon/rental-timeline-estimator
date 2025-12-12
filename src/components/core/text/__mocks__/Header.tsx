import { IThemeOptions } from '../../../../theming/IThemeOptions';
import { FontGroups } from '../../../../theming/fontGroups';
import React from 'react';

/**
 * will return h1
 */
export const Header = jest.fn((props: { theme: IThemeOptions; fontGroup?: FontGroups; children: React.ReactNode | React.ReactNode[] }) => {
  return <h1>{props.children}</h1>;
});
