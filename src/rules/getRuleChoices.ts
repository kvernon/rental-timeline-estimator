import { IRuleStackEntity } from '../components/rules/IRuleStackEntity';
import { IRuleConfigWithPropertyType } from './IRuleConfigEntity';
import { getPrettyName } from './getPrettyName';

export const getRuleChoices = (choices: IRuleConfigWithPropertyType[]): IRuleStackEntity[] => {
  return choices.map((c) => ({
    ruleTitle: getPrettyName(c.ruleType, 'percent'),
    property: c.propertyType,
    description: c.description,
    max: c.max,
    suffix: c.suffix,
    min: c.min,
    prefix: c.prefix,
    rule: c.rule,
  }));
};
