import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { getValidationResult } from '../components/rules/getValidationResult';

export function validateUserInfo(
  required: boolean,
  userInfo: {
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    savedAtStart: IEventResult<number | undefined>;
    moSavings: IEventResult<number | undefined>;
    goal: IEventResult<number | undefined>;
  },
): ValidatorTypes {
  const mapRules = (x: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>) => {
    const keys = Object.keys(x).sort() as Array<keyof IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>>;
    return keys.map((k) => x[k].validationResult);
  };
  const results = [
    userInfo.purchaseRules.map(mapRules).flat(),
    userInfo.holdRules.map(mapRules).flat(),
    userInfo.moSavings.validationResult,
    userInfo.goal.validationResult,
    userInfo.savedAtStart.validationResult,
  ].flat();

  return getValidationResult(results, required);
}
