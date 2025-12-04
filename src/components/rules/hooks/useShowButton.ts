import { IRuleStackEntity } from '../IRuleStackEntity';
import { IRuleValues } from '../IRuleValues';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';
import { getRemainingValues } from './getRemainingValues';

export function useShowButton(
  possibleChoices: IRuleStackEntity[],
  values: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[],
): boolean {
  return (
    getRemainingValues(
      possibleChoices,
      values.map((x) => ({ title: x.title, property: x.property })),
    ).filter((x) => !x.isDisabled).length > 0
  );
}
