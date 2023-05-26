import { TitleDropDownValidatorId } from '../components/naming/TitleDropDownValidatorName';
import { getPrettyName } from './getPrettyName';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { RangeFieldValidatorId } from '../components/naming/RangeFieldValidatorName';
import { IRuleConfigEntity } from './IRuleConfigEntity';

export const getFields = (collection: IRuleConfigEntity[]) => {
  return collection
    .filter((x) => x.ruleType !== 'none')
    .map((choice: IRuleConfigEntity, index: number) => {
      return {
        [TitleDropDownValidatorId]: {
          value: {
            value: index + 1,
            label: getPrettyName(choice.ruleType, 'percent'),
          },
          validationResult: ValidatorTypes.Optional,
        },
        [`${RangeFieldValidatorId}`]: {
          value: choice.min,
          validationResult: ValidatorTypes.Optional,
        },
      };
    });
};
