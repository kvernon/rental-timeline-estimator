import { FontGroups } from './fontGroups';
import { IThemeOptions } from './IThemeOptions';
import { FontInformation } from './fontInformation';
import { Typography } from './Typography';

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
        goalBackground: '#320000',
        backgroundFocus: '#ff6464',
      },
      Valid: {
        validationColor: '#00ff00',
        background: '#6ad8fd',
        goalBackground: '#003200FF',
        backgroundFocus: '#9EE5FF',
      },
      Optional: {
        validationColor: '#858585',
        background: '#6ad8fd',
        goalBackground: '#101B1E7C',
        backgroundFocus: '#9EE5FF',
      },
    },
    streetBackground: 'linear-gradient(to bottom, black, #17400b 15%, #1a6c45 89%, black 97%)',
    streetBorder: '0.15rem  solid #bfbfbf',
    streetBorderRadius: '0.2rem',
    propertyStatusOwnedBackground: '#33701e',
    propertyStatusSoldBackground: '#ca1616',
    propertyStatusBorder: '0.15rem  solid #bfbfbf',
    propertyStatusRadius: '0.2rem',
    propertyStatusForSaleBackground: '#dcdcdc',
    propertyStatusForSaleBorder: '0.15rem  solid #ca1616',
  },
  typography: new Typography()
    .set(
      FontGroups.h3,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '30pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      }),
    )
    .set(
      FontGroups.h4,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '26pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      }),
    )
    .set(
      FontGroups.h5,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '24pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      }),
    )
    .set(
      FontGroups.h6,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '22pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      }),
    )
    .set(
      FontGroups.panelTitle,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '30pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      }),
    )
    .set(
      FontGroups.panelTitle,
      new FontInformation({
        font: 'Arial, Helvetica, sans-serif',
        size: '30pt',
        color: '#ffffff',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '1em',
      }),
    )
    .set(
      FontGroups.inputLabel,
      new FontInformation({
        color: '#56afcc',
        size: '12pt',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '0.00938em',
      }),
    )
    .set(
      FontGroups.input,
      new FontInformation({
        color: '#0a0a0a',
        size: '12pt',
        weight: 'normal',
        lineHeight: '1.4375em',
        letterSpacing: '0.00938em',
      }),
    )
    .set(
      FontGroups.inputGoalLabel,
      new FontInformation({
        font: 'Corbel',
        color: '#ffffff',
        size: '53pt',
        weight: 'bold',
        lineHeight: '1em',
        letterSpacing: 'normal',
        textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
      }),
    )
    .set(
      FontGroups.inputGoal,
      new FontInformation({
        color: '#ffffff',
        size: '52pt',
        weight: 'bold',
        lineHeight: '1.4375em',
        letterSpacing: '0.00938em',
      }),
    )
    .set(
      FontGroups.street,
      new FontInformation({
        color: '#bfbfbf',
        size: '12pt',
        weight: 'normal',
        lineHeight: '1.95em',
        letterSpacing: '0.01em',
      }),
    )
    .set(
      FontGroups.propertySign,
      new FontInformation({
        color: '#bfbfbf',
        size: '12pt',
        weight: 'normal',
        lineHeight: '1.95em',
        letterSpacing: '0.01em',
      }),
    )
    .set(
      FontGroups.propertySignForSale,
      new FontInformation({
        color: '#ca1616',
        size: '12pt',
        weight: 'normal',
        lineHeight: '1.95em',
        letterSpacing: '0.01em',
      }),
    ),
};
