import { IIdentifierType } from '../validators/IIdentifierType';

export type NameTranslateType = (entity: IIdentifierType, property: 'value' | 'validationResult') => string;
