import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { getValidationResult } from '../components/rules/getValidationResult';
import { IUserInfo } from './IUserInfo';

export function validateUserInfo(required: boolean, userInfo: IUserInfo): ValidatorTypes {
  const mapRules = (x: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>) => {
    const keys = Object.keys(x).sort() as Array<keyof IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>>;
    return keys.map((k) => x[k].validationResult);
  };
  const results = [
    userInfo.purchaseRules.map(mapRules).flat(),
    userInfo.holdRules.map(mapRules).flat(),
    userInfo.goal.validationResult,
    userInfo.moSavings.validationResult,
    userInfo.savedAtStart.validationResult,
  ]
    .flat()
    .sort();

  return getValidationResult(results, required);
}
