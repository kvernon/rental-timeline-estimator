import { IRuleStackEntity } from '../IRuleStackEntity';
import { IRuleValues } from '../IRuleValues';
import { IEventResult } from '../../validators/IEventResult';
import { ISelectOption } from '../../core/ISelectOption';
import { getTitleChoicesFormatted } from './getTitleChoicesFormatted';

export const getPropertyShouldBeDisabled = (
  ruleStackValues: IRuleStackEntity[],
  value: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>,
) => {
  const titles = getTitleChoicesFormatted(ruleStackValues).filter((x) => x.title === value.title.value.label);

  if (titles.length === 0) {
    return true;
  }

  if (titles.filter((x) => x.isDisabled).length === 2) {
    return false;
  }
  return titles.filter((x) => !x.isDisabled).length > 0;
};
