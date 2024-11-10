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
      font: 'parent',
      color: '#0000FF3F',
      size: '20px',
    },
    get: jest.fn().mockReturnValue({
      font: 'font',
      color: 'rgba(200, 0, 255, 0.247)',
      size: '10px',
    }),
  },
};
