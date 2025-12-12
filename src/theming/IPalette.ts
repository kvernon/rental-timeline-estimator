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
      goalBackground: string;
      backgroundFocus: string;
    };
  };

  streetBackground: string;
  streetBorder: string;
  streetBorderRadius: string;
  propertyStatusOwnedBackground: string;
  propertyStatusSoldBackground: string;
  propertyStatusForSaleBackground: string;
  propertyStatusBorder: string;
  propertyStatusForSaleBorder: string;
  propertyStatusRadius: string;
}
