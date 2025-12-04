import { IUserInfo } from '../data/IUserInfo';

export interface IUserInformationProps {
  title: string;
  onChange?: (updated: IUserInfo) => void;
}
