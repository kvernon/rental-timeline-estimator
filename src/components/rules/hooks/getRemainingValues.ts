import { IRuleStackEntity } from '../IRuleStackEntity';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';
import { IRuleValues } from '../IRuleValues';

export function getRemainingValues(
  choices: IRuleStackEntity[],
  values: Omit<IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>, 'range'>[],
): IRuleStackEntity[] {
  if (!choices || !choices.length) {
    return choices;
  }

  const filteredValues: { title: string; property: number }[] = [];
  values
    .map((x) => ({ title: x.title.value.label, property: x.property.value.value }))
    .forEach((x) => {
      if (x !== undefined) {
        filteredValues.push(x);
      }
    });

  return choices.map((entity) => {
    const e = { ...entity };
    e.isDisabled = filteredValues.some((x) => x.title === entity.ruleTitle && x.property === entity.property);
    return e;
  });
}
