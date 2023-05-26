import { IFontInformation } from './IFontInformation';

export class FontInformation implements IFontInformation {
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
