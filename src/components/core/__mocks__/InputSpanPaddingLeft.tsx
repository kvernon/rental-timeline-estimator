import React from 'react';
import { IThemeOptions } from '../../../theming/IThemeOptions';

export const InputSpanPaddingLeft = jest.fn((props: { themeOptions: IThemeOptions; children: string }) => {
  return <span>{props.children}</span>;
});
