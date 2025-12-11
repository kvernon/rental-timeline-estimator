import { IThemeOptions } from '../../../../theming/IThemeOptions';
import { FontGroups } from '../../../../theming/fontGroups';
import React from 'react';

export const Header3 = jest.fn((props: { theme: IThemeOptions; fontGroup?: FontGroups; children: React.ReactNode | React.ReactNode[] }) => {
  return <h3>{props.children}</h3>;
});
