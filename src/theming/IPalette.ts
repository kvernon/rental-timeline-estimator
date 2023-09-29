export interface IPalette {
  pageBackground: string;
  panelBackground: string;
  panelShadow: string;

  inputBackgroundBadFocus: string;
  inputBackgroundBad: string;
  inputBackground: string;
  inputBackgroundFocus: string;

  validation: {
    [key: string]: {
      validationColor: string;
      background: string;
      backgroundFocus: string;
    };
  };
}
