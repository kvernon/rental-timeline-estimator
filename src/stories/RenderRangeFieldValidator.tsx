import { IRangeFieldValidatorProps } from '../components/validators/IRangeFieldValidatorProps';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { DevTool } from '@hookform/devtools';
import { RangeFieldValidatorName } from '../components/validators/RangeFieldValidatorName';
import { ValidatorStackTypes } from '../components/validators/ValidatorStackTypes';

export interface IRenderRangeFieldValidatorProps extends IRangeFieldValidatorProps {
  overrideValidationType?: ValidatorStackTypes;
}

export const RenderRangeFieldValidator = (arg: IRenderRangeFieldValidatorProps): React.ReactElement => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      [RangeFieldValidatorName(arg.id)]: {
        value: undefined,
        validationResult: arg.overrideValidationType || arg.validationType,
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
          onBlur={arg.onBlur}
          validationType={arg.validationType}
        />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
