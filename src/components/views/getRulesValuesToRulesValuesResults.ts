import { IRuleValues } from '../rules/IRuleValues';
import { IEventResult, IEventValue } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleStackEntity } from '../rules/IRuleStackEntity';

export function getRulesValuesToRulesValuesResults(
  values: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[],
  rules: IRuleStackEntity[],
): IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] {
  const map = new Map<string, IRuleStackEntity>();

  rules.forEach((x) => {
    map.set(x.ruleTitle, x);
  });

  values.map((x) => {
    const rule = map.get(x.title.value.label);
  });
  return [];
}
