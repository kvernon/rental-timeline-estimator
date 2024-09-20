import { IRuleStackEntity } from '../components/rules/IRuleStackEntity';
import { IUserInfo } from '../data/IUserInfo';

export interface IUserInformationProps {
  values: IUserInfo;
  choices: {
    purchaseRules: IRuleStackEntity[];
    holdRules: IRuleStackEntity[];
  };
  title: string;
  onChange?: (updated: IUserInfo) => void;
}
