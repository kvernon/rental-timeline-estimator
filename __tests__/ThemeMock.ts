import { IThemeOptions } from '../src/theming/IThemeOptions';

export const validationColorOptionalRight = '#0000FF';
export const validationColorValidMiddle = '#00FF00';
export const validationColorInvalidLeft = '#FF0000';

const themeMock: IThemeOptions = {
  palette: {
    pageBackground: 'pageBackground',
    panelBackground: 'panelBackground',
    panelShadow: 'panelShadow',

    inputBackgroundBadFocus: 'inputBackgroundBadFocus',
    inputBackgroundBad: 'inputBackgroundBad',
    inputBackground: 'inputBackground',
    inputBackgroundFocus: 'inputBackgroundFocus',
    streetBackground: 'green',
    streetBorder: '0.3rem solid white',
    streetBorderRadius: '0.3rem',
    propertyStatusOwnedBackground: 'green',
    propertyStatusSoldBackground: 'red',
    propertyStatusBorder: '0.15rem solid purple',
    propertyStatusRadius: '0.2rem',
    propertyStatusForSaleBackground: 'lavender',
    propertyStatusForSaleBorder: '0.15rem solid gold',

    validation: {
      Invalid: {
        validationColor: validationColorInvalidLeft,
        background: validationColorInvalidLeft,
        goalBackground: validationColorInvalidLeft,
        backgroundFocus: validationColorInvalidLeft,
      },
      Valid: {
        validationColor: validationColorValidMiddle,
        background: validationColorValidMiddle,
        goalBackground: validationColorValidMiddle,
        backgroundFocus: validationColorValidMiddle,
      },
      Optional: {
        validationColor: validationColorOptionalRight,
        background: validationColorOptionalRight,
        goalBackground: validationColorOptionalRight,
        backgroundFocus: validationColorOptionalRight,
      },
    },
  },
  typography: {
    parent: {
      allPopulated: jest.fn(),
      font: 'parent',
      color: '#0000FF3F',
      size: '20px',
      weight: 'bold',
      lineHeight: '1.4375em',
      letterSpacing: '0.00938em',
    },
    get: jest.fn().mockReturnValue({
      font: 'font',
      color: 'rgba(200, 0, 255, 0.247)',
      size: '10px',
      lineHeight: '1.4375em',
      weight: 'normal',
      letterSpacing: '0.00938em',
    }),
  },
};

export { themeMock };
