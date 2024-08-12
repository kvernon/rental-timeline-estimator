import { IEventResult, IEventValue } from '../validators/IEventResult';
import { IRuleValues } from '../rules/IRuleValues';
import { ISelectOption } from '../core/ISelectOption';
import { IRuleStackEntity } from '../rules/IRuleStackEntity';

export interface IUserInformationProps {
  values: {
    goal: IEventResult<number>;
    savedAtStart: IEventResult<number>;
    moSavings: IEventResult<number>;
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number>>[];
  };
  choices: {
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  };
  title: string;
  onChange?: (updated: {
    goal: IEventValue<number>;
    savedAtStart: IEventValue<number>;
    moSavings: IEventValue<number>;
    purchaseRules: IRuleValues<IEventValue<ISelectOption>, IEventValue<number>>[];
    holdRules: IRuleValues<IEventValue<ISelectOption>, IEventValue<number>>[];
  }) => void;
}
