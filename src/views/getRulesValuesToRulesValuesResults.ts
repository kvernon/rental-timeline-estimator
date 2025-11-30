import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult, IEventValue } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { IRuleStackEntity } from '../components/rules/IRuleStackEntity';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { evaluateValidation } from '../components/validators/evaluateValidation';
import { isInRange } from '../components/validators/isInRange';
import { formDefault } from './formDefault';

export function getRulesValuesToRulesValuesResults(
  isRequired: boolean,
  values: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[],
  rules: IRuleStackEntity[],
): IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] {
  if (!rules || !rules.length) {
    return formDefault(isRequired, values);
  }

  const rulesMap = new Map<string, IRuleStackEntity>();
  rules.forEach((rule) => {
    const key = `${rule.ruleTitle}-${rule.property}`;
    rulesMap.set(key, rule);
  });

  const valueCounts = new Map<string, number>();
  values.forEach((value) => {
    const key = `${value.title.value.label}-${value.property.value.value}`;
    valueCounts.set(key, (valueCounts.get(key) || 0) + 1);
  });

  const result: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] = [];
  let hasMatches = false;

  values.forEach((value) => {
    const key = `${value.title.value.label}-${value.property.value.value}`;
    const rule = rulesMap.get(key);
    const isDuplicate = (valueCounts.get(key) || 0) > 1;

    if (rule) {
      hasMatches = true;
      result.push({
        range: evaluateValidation(value.range.value, isInRange, {
          min: rule.min,
          max: rule.max,
          isRequired,
        }),
        property: { value: value.property.value, validationResult: isDuplicate ? ValidatorTypes.Invalid : ValidatorTypes.Valid },
        title: { value: value.title.value, validationResult: isDuplicate ? ValidatorTypes.Invalid : ValidatorTypes.Valid },
      });
    }
  });

  if (!hasMatches) {
    return formDefault(isRequired, values);
  }

  return result;
}
