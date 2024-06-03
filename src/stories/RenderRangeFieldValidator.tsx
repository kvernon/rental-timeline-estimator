import { IRangeFieldValidatorProps } from '../components/validators/IRangeFieldValidatorProps';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { DevTool } from '@hookform/devtools';
import { RangeFieldValidatorName } from '../components/naming/RangeFieldValidatorName';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';
import { IFormRuleStackEntityDataValueResult } from '../FormRuleStackEntityDataValueResult';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';

export interface IRenderRangeFieldValidatorProps extends IRangeFieldValidatorProps {
  overrideValidationType?: ValidatorStackTypes;
}

export const RenderRangeFieldValidator = (arg: IRenderRangeFieldValidatorProps): React.ReactElement => {
  const validatorStackTypes = arg.overrideValidationType || arg.validationType;
  const methods = useForm<IFormRuleStackEntityDataValueResult<number>>({
    mode: 'onBlur',
    defaultValues: {
      [RangeFieldValidatorName(arg.id)]: {
        value: undefined,
        validationResult: validatorStackTypes === ValidatorStackTypes.Optional ? ValidatorTypes.Optional : ValidatorTypes.Invalid,
      },
    },
  });
  const onSubmit = (data: unknown) => console.log(data);
  return (
    <FormProvider {...methods}>
      <DevTool control={methods.control} placement="top-left" />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RangeFieldValidator
          id={arg.id}
          min={arg.min}
          max={arg.max}
          suffix={arg.suffix}
          title={arg.title}
          prefix={arg.prefix}
          onChange={arg.onChange}
          validationType={arg.validationType}
        />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
