import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult, IEventValue } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';

export function formDefault(
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
