import { FontGroups } from './fontGroups';
import { IThemeOptions } from './IThemeOptions';
import { FontInformation } from './fontInformation';
import { Typography } from './typography';

export const options: IThemeOptions = {
  palette: {
    pageBackground: '#262040',
    panelBackground: '#321f59',
    panelShadow: '#201F37',
    inputBackground: '#6ad8fd',
    inputBackgroundFocus: '#9EE5FF',
    inputBackgroundBadFocus: '#ffa5a5',
    inputBackgroundBad: '#ff3c3c',
    validation: {
      Invalid: {
        validationColor: '#ff0000',
        background: '#ff3c3c',
        backgroundFocus: '#ff6464',
      },
      Valid: {
        validationColor: '#00ff00',
        background: '#6ad8fd',
        backgroundFocus: '#9EE5FF',
      },
      Optional: {
        validationColor: '#858585',
        background: '#6ad8fd',
        backgroundFocus: '#9EE5FF',
      },
    },
  },
  typography: new Typography()
    .set(
      FontGroups.panelTitle,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '14pt',
        color: '#ffffff',
        weight: 'bold',
      }),
    )
    .set(FontGroups.inputLabel, new FontInformation({ color: '#a19fa8', size: '12pt', weight: 'bold' }))
    .set(FontGroups.input, new FontInformation({ color: '#0a0a0a', size: '12pt', weight: 'normal' })),
};
