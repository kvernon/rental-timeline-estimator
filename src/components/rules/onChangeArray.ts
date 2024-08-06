import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export function onChangeArray(
  values: {
    title: IEventResult<ISelectOption>;
    property: IEventResult<ISelectOption>;
    range: IEventResult<number>;
  }[],
  oldIndex: number,
  newIndex: number,
): {
  title: IEventResult<ISelectOption>;
  property: IEventResult<ISelectOption>;
  range: IEventResult<number>;
}[] {
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
