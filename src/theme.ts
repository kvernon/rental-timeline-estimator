export interface IFontInformation {
  font?: string;
  size?: string;
  color?: string;
  weight?: string;

  allPopulated(): boolean;
}

class FontInformation implements IFontInformation {
  font?: string;
  size?: string;
  color?: string;
  weight?: string;

  constructor(args?: { font?: string; size?: string; color?: string; weight?: string }) {
    if (args) {
      this.font = args?.font;
      this.size = args?.size;
      this.color = args?.color;
      this.weight = args?.weight;
    }
  }

  allPopulated(): boolean {
    return !!this.font && !!this.color && !!this.size;
  }
}

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

export interface IThemeOptions {
  palette: IPalette;
  typography: ITypography;
}

export interface ITypography {
  parent: IFontInformation;

  get(key: FontGroups): IFontInformation | undefined;
}

class Typography extends Map<string, IFontInformation> implements ITypography {
  get(key: FontGroups): IFontInformation | undefined {
    const information = super.get(key);

    if (!information) {
      return this.parent;
    }

    if (information.allPopulated()) {
      return information;
    }

    information.color = information.color || this.parent.color;
    information.size = information.size || this.parent.size;
    information.font = information.font || this.parent.font;
    information.weight = information.weight || this.parent.weight;

    return information;
  }

  parent = new FontInformation({
    size: '80pt',
    font: 'Arial',
    color: '#FFFFFF',
    weight: 'normal',
  });
}

export enum FontGroups {
  panelTitle = 'panelTitle',
  inputLabel = 'inputLabel',
  input = 'input',
}

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
