import { IRuleStackEntity } from '../components/rules/IRuleStackEntity';
import { getPrettyName } from './getPrettyName';
import { IRuleConfigEntity } from './IRuleConfigEntity';

export const getRuleChoices = (choices: IRuleConfigEntity[]): IRuleStackEntity[] =>
  choices.map((c) => ({
    ruleTitle: getPrettyName(c.ruleType, 'percent'),
    property: 0,
    max: c.max,
    suffix: c.suffix,
    min: c.min,
    prefix: c.prefix,
  }));
