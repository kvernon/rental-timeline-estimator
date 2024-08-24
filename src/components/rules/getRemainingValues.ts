import { IRuleStackEntity } from './IRuleStackEntity';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';

export function getRemainingValues(choices: IRuleStackEntity[], values: IEventResult<ISelectOption>[]): IRuleStackEntity[] {
  if (!choices || !choices.length) {
    return choices;
  }

  const filteredValues: string[] = [];
  values
    .map((x) => x.value?.label)
    .forEach((x) => {
      if (x !== undefined) {
        filteredValues.push(x);
      }
    });

  return choices.map((entity) => {
    const e = { ...entity };
    e.isDisabled = filteredValues.includes(entity.ruleTitle);
    return e;
  });
}
