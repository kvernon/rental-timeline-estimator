export interface IFontInformation {
  font?: string;
  size?: string;
  color?: string;
  weight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textShadow?: string;

  allPopulated(): boolean;
}
