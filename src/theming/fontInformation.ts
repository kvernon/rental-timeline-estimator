import { IFontInformation } from './IFontInformation';

export class FontInformation implements IFontInformation {
  font?: string;
  size?: string;
  color?: string;
  weight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textShadow?: string;

  constructor(args?: {
    font?: string;
    size?: string;
    color?: string;
    weight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textShadow?: string;
  }) {
    if (args) {
      this.font = args?.font;
      this.size = args?.size;
      this.color = args?.color;
      this.weight = args?.weight;
      this.lineHeight = args?.lineHeight;
      this.letterSpacing = args?.letterSpacing;
      this.textShadow = args?.textShadow;
    }
  }

  allPopulated(): boolean {
    return !!this.font && !!this.color && !!this.size && !!this.lineHeight && !!this.letterSpacing && !!this.textShadow;
  }
}
