import { IRuleStackEntity } from '../IRuleStackEntity';

export const getTitleChoicesFormatted = (
  ruleStackValues: IRuleStackEntity[],
  filterProperty?: number,
): { title: string; isDisabled: boolean | undefined; property: number }[] => {
  const duped = [...ruleStackValues];
  const mapFormat = (x: IRuleStackEntity) => ({ title: x.ruleTitle, isDisabled: x.isDisabled, property: x.property });

  if (filterProperty !== undefined) {
    return duped.filter((x) => x.property === filterProperty).map(mapFormat);
  }

  return duped.map(mapFormat);
};
