import { IRuleStackEntity } from './IRuleStackEntity';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export function getRemainingValues(
  choices: IRuleStackEntity[],
  values: IEventResult<ISelectOption>[],
): {
  index: number;
  entity: IRuleStackEntity;
}[] {
  if (!choices || !choices.length) {
    return choices.map((entity, index) => ({ index, entity }));
  }

  const filteredValues: string[] = [];
  values
    .map((x) => x.value?.label)
    .forEach((x) => {
      if (x !== undefined) {
        filteredValues.push(x);
      }
    });

  return choices
    .map((entity, index) => ({
      index,
      entity,
    }))
    .filter((choice) => !filteredValues.includes(choice.entity.ruleTitle));
}
