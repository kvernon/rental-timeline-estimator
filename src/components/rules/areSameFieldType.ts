import isEqual from 'lodash.isequal';
import { IFieldTypeProperties } from './IFieldTypeProperties';

export function areSameFieldType(a: IFieldTypeProperties, b: IFieldTypeProperties): boolean {
  return isEqual(a, b);
}
