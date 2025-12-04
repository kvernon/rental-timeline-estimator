import { formDefault } from './formDefault';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';
import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventValue } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';

describe('formDefault', () => {
  it('should return values with ValidatorTypes.Invalid for range when isRequired is true', () => {
    const values: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[] = [
      {
        title: { value: { value: 0, label: 'Title' } },
        property: { value: { value: 1, label: 'Property' } },
        range: { value: 100 },
      },
    ];
    const result = formDefault(true, values);
    expect(result).toEqual([
      {
        title: { value: { value: 0, label: 'Title' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: 1, label: 'Property' }, validationResult: ValidatorTypes.Valid },
        range: { value: 100, validationResult: ValidatorTypes.Invalid },
      },
    ]);
  });

  it('should return values with ValidatorTypes.Optional for range when isRequired is false', () => {
    const values: IRuleValues<IEventValue<ISelectOption>, IEventValue<number | undefined>>[] = [
      {
        title: { value: { value: 0, label: 'Title' } },
        property: { value: { value: 1, label: 'Property' } },
        range: { value: 100 },
      },
    ];
    const result = formDefault(false, values);
    expect(result).toEqual([
      {
        title: { value: { value: 0, label: 'Title' }, validationResult: ValidatorTypes.Valid },
        property: { value: { value: 1, label: 'Property' }, validationResult: ValidatorTypes.Valid },
        range: { value: 100, validationResult: ValidatorTypes.Optional },
      },
    ]);
  });
});
