import { IValidatorStackContextEntity } from './IValidatorStackContextEntity';
import { IRangeFieldValidatorEntity } from './IRangeFieldValidatorEntity';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { ValidatorTypes } from './ValidatorTypes';

export interface IValidatorStackProvider {
  entities: IValidatorStackContextEntity[];
  pushOrUpdateEntity: (value: IValidatorStackContextEntity) => void;
  updateCollectionEntity: (item: IRangeFieldValidatorEntity) => void;
  areValidateResults: (stackKey: string, panelValidatorStackType: ValidatorStackTypes) => ValidatorTypes;
  getEntityByKeys: (stackKey: string, collectionKey: string) => IRangeFieldValidatorEntity | null;
}
