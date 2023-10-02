import { RangeFieldValidatorName } from '../naming/RangeFieldValidatorName';
import { TitleDropDownValidatorName } from '../naming/TitleDropDownValidatorName';
import { NameTranslateType } from './nameTranslate';

import { IIdentifierType } from '../validators/IIdentifierType';

const map = new Map<string, (id: string) => string>();
map.set('RangeFieldValidator', RangeFieldValidatorName);
map.set('TitleDropDownValidator', TitleDropDownValidatorName);

export const translateClassToNameWithProperty: NameTranslateType = (entity: IIdentifierType, property: 'value' | 'validationResult') => {
  const found = map.get(entity.type);
  if (found) {
    return `${found(entity.id)}.${property}`;
  }
  return `${entity.id}.${property}`;
};
