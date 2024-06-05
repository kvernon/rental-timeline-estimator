import { getPrettyName } from './getPrettyName';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IRuleConfigEntity } from './IRuleConfigEntity';
import { propertyOptions } from '../components/validators/PropertyDropDownValidator';
import { IFieldType } from '../components/rules/IFieldType';

export const getFields = (collection: IRuleConfigEntity[]): IFieldType[] => {
  return collection
    .filter((x) => x.ruleType !== 'none')
    .map((choice: IRuleConfigEntity, index: number) => {
      return {
        titleDropDown: {
          value: {
            value: index + 1,
            label: getPrettyName(choice.ruleType, 'percent'),
          },
          validationResult: ValidatorTypes.Optional,
        },
        propertyDropDown: {
          value: propertyOptions
            .map((option, index) => ({
              label: option,
              value: index,
            }))
            .find((o) => o.label === 'house'),
          validationResult: ValidatorTypes.Optional,
        },
        rangeFieldValidator: {
          value: choice.min,
          validationResult: ValidatorTypes.Optional,
        },
      };
    });
};
