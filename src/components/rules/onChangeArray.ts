import { IRuleValuesResult } from './IRuleValuesResult';

export function onChangeArray(values: IRuleValuesResult[], oldIndex: number, newIndex: number): IRuleValuesResult[] {
  if (values.length === 0) {
    return [];
  }

  if (oldIndex >= values.length || oldIndex < 0) {
    return values;
  }

  if (newIndex >= values.length || newIndex < 0) {
    return values;
  }

  const newArray = [...values];
  const temp = newArray[oldIndex];

  newArray[oldIndex] = newArray[newIndex];
  newArray[newIndex] = temp;

  return newArray;
}
