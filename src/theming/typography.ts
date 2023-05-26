import { IFontInformation } from './IFontInformation';
import { ITypography } from './ITypography';
import { FontGroups } from './fontGroups';
import { FontInformation } from './fontInformation';

export class Typography extends Map<string, IFontInformation> implements ITypography {
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
