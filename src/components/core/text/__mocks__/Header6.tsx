import { IThemeOptions } from '../../../../theming/IThemeOptions';
import { FontGroups } from '../../../../theming/fontGroups';
import React from 'react';

export const Header6 = jest.fn((props: { theme: IThemeOptions; fontGroup?: FontGroups; children: React.ReactNode | React.ReactNode[] }) => {
  return <h6>{props.children}</h6>;
});
