import { IFontInformation } from './IFontInformation';
import { FontGroups } from './fontGroups';

export interface ITypography {
  parent: IFontInformation;

  get(key: FontGroups): IFontInformation | undefined;
}
