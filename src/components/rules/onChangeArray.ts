import { IRuleValues } from './IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IEventResult } from '../validators/IEventResult';

export function onChangeArray(
  values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[],
  oldIndex: number,
  newIndex: number,
): IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[] {
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
