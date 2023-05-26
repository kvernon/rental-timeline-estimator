import { formatName } from './FormatName';

export const TitleDropDownValidatorId = 'titleDropDown';
export const TitleDropDownValidatorName = (id: string) => formatName(id, TitleDropDownValidatorId);
