import { Global, css, useTheme } from '@emotion/react';
import React from 'react';
import { IThemeOptions } from '../../theming/IThemeOptions';

export const Page = () => {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Global
      styles={css`
        body {
          background-color: ${coreTheme.palette.pageBackground};
        }
      `}
    />
  );
};
