import { IRuleValues } from '../rules/IRuleValues';
import { IEventResult, IEventValue } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleStackEntity } from '../rules/IRuleStackEntity';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import { evaluateValidation } from '../validators/evaluateValidation';
import { isInRange } from '../validators/isInRange';

function formDefault(
  isRequired: boolean,
  values: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[],
): IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] {
  const validationResultDefault = isRequired ? ValidatorTypes.Invalid : ValidatorTypes.Optional;
  return values.map((x: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>) => {
    const y: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>> = {
      range: {
        value: x.range.value,
        validationResult: validationResultDefault,
      },
      property: { value: x.property.value, validationResult: ValidatorTypes.Valid },
      title: { value: x.title.value, validationResult: ValidatorTypes.Valid },
    };
    return y;
  });
}

export function getRulesValuesToRulesValuesResults(
  isRequired: boolean,
  values: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[],
  rules: IRuleStackEntity[],
): IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] {
  if (!rules || !rules.length) {
    return formDefault(isRequired, values);
  }

  const map = new Map<string, { index: number; entity: IRuleStackEntity }>();
  rules.forEach((x) => {
    map.set(x.ruleTitle, { index: -1, entity: x });
  });

  values.map((x, i) => {
    const rule = map.get(x.title.value.label);

    if (rule && rule?.entity) {
      map.set(x.title.value.label, { index: i, entity: rule.entity });
    }
  });

  let hasMatches = false;

  for (const mapElement of map.values()) {
    if (mapElement.index > -1) {
      hasMatches = true;
      break;
    }
  }

  if (!hasMatches) {
    return formDefault(isRequired, values);
  }

  const result: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[] = [];
  for (const x of map.values()) {
    const y: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>> = {
      range: evaluateValidation(isRequired, isInRange, values[x.index].range.value, {
        min: x.entity.min,
        max: x.entity.max,
      }),
      property: { value: values[x.index].property.value, validationResult: ValidatorTypes.Valid },
      title: { value: values[x.index].title.value, validationResult: ValidatorTypes.Valid },
    };

    result.push(y);
  }

  return result;
}
