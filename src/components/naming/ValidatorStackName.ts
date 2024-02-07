import { formatName } from './FormatName';
import { FormatNames } from './FormatNames';

export const ValidatorStackName = (id: string) => formatName(id, FormatNames.ValidatorStackId);
