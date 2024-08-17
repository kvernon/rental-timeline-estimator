import { IEventResult, IEventValue } from '../validators/IEventResult';
import { IRuleValues } from '../rules/IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleStackEntity } from '../rules/IRuleStackEntity';

export interface IUserInformationProps {
  values: {
    goal: IEventResult<number | undefined>;
    savedAtStart: IEventResult<number | undefined>;
    moSavings: IEventResult<number | undefined>;
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
  };
  choices: {
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  };
  title: string;
  onChange?: (updated: {
    goal: IEventValue<number | undefined>;
    savedAtStart: IEventValue<number | undefined>;
    moSavings: IEventValue<number | undefined>;
    purchaseRules: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[];
    holdRules: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[];
  }) => void;
}