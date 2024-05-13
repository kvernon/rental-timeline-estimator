import { getPrettyName } from './getPrettyName';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IRuleConfigEntity } from './IRuleConfigEntity';
import { FormatNames } from '../components/naming/FormatNames';
import { propertyOptions } from '../components/validators/PropertyDropDownValidator';

export const getFields = (collection: IRuleConfigEntity[]) => {
  return collection
    .filter((x) => x.ruleType !== 'none')
    .map((choice: IRuleConfigEntity, index: number) => {
      return {
        [FormatNames.TitleDropDownValidatorId]: {
          value: {
            value: index + 1,
            label: getPrettyName(choice.ruleType, 'percent'),
          },
          validationResult: ValidatorTypes.Optional,
        },
        [FormatNames.PropertyDropDownValidatorId]: {
          value: propertyOptions
            .map((option, index) => ({
              label: option,
              value: index,
            }))
            .find((o) => o.label === 'house'),
          validationResult: ValidatorTypes.Optional,
        },
        [`${FormatNames.RangeFieldValidatorId}`]: {
          value: choice.min,
          validationResult: ValidatorTypes.Optional,
        },
      };
    });
};
