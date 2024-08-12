export const validationColorOptionalRight = '#0000FF';
export const validationColorValidMiddle = '#00FF00';
export const validationColorInvalidLeft = '#FF0000';

export const themeMock = {
  palette: {
    pageBackground: 'pageBackground',
    panelBackground: 'panelBackground',
    panelShadow: 'panelShadow',

    inputBackgroundBadFocus: 'inputBackgroundBadFocus',
    inputBackgroundBad: 'inputBackgroundBad',
    inputBackground: 'inputBackground',
    inputBackgroundFocus: 'inputBackgroundFocus',

    validation: {
      Invalid: {
        validationColor: validationColorInvalidLeft,
        background: validationColorInvalidLeft,
        backgroundFocus: validationColorInvalidLeft,
      },
      Valid: {
        validationColor: validationColorValidMiddle,
        background: validationColorValidMiddle,
        backgroundFocus: validationColorValidMiddle,
      },
      Optional: {
        validationColor: validationColorOptionalRight,
        background: validationColorOptionalRight,
        backgroundFocus: validationColorOptionalRight,
      },
    },
  },
  typography: {
    parent: {
      allPopulated: jest.fn(),
      font: 'p',
      color: 'p',
      size: 'p',
    },
    get: jest.fn().mockReturnValue({
      font: 'font',
      color: 'color',
      size: 'size',
    }),
  },
};
