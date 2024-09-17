import { IEventResult } from '../components/validators/IEventResult';
import { IRuleValues } from '../components/rules/IRuleValues';
import { ISelectOption } from '../components/core/ISelectOption';
import { ConditionalNumber, ConditionEventResult } from '../components/validators/IRangeFieldValidatorEvent';

export interface IUserInfo {
  goal: ConditionEventResult<true, ConditionalNumber<true>>;
  savedAtStart: ConditionEventResult<true, ConditionalNumber<true>>;
  moSavings: ConditionEventResult<true, ConditionalNumber<true>>;
  purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
}
