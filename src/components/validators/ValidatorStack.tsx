import React, { useEffect, useState } from 'react';
import { ValidationBar } from './ValidationBar';
import { IValidatorPanelProps } from './IValidatorPanelProps';
import { Stack } from '../core/Stack';
import { useFormContext } from 'react-hook-form';
import { ValidatorTypes } from './ValidatorTypes';
import { ValidatorStackName } from './ValidatorStackName';
import { ValidatorStackTypes } from './ValidatorStackTypes';
import { RangeFieldValidatorName } from './RangeFieldValidatorName';

export const ValidatorStack = function (props: IValidatorPanelProps) {
  const methods = useFormContext();
  const [isValid, setIsValid] = useState(
    props.panelValidatorStackType === ValidatorStackTypes.Optional ? ValidatorTypes.Valid : ValidatorTypes.Invalid,
  );

  const id = ValidatorStackName(props.id);

  const watchChildren = (Array.isArray(props.children) ? props.children : [props.children]).map(
    (c) => `${RangeFieldValidatorName(c.props.id)}.validationResult`,
  );

  const [isValidCollection, setIsValidCollection] = useState(
    watchChildren.map((x) => ({
      name: x,
      result: isValid,
    })),
  );

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      const findIndex = watchChildren.findIndex((x) => x === name);
      if (findIndex >= 0) {
        const split = isValidCollection[findIndex].name.split('.');
        isValidCollection[findIndex].result = value[split[0]][split[1]];
        setIsValidCollection(isValidCollection);
        setIsValid(isValidCollection.some((x) => x.result === ValidatorTypes.Invalid) ? ValidatorTypes.Invalid : ValidatorTypes.Valid);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return (
    <Stack id={id} direction="row">
      <Stack spacing={2} id={props.id} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
        {props.children}
      </Stack>
      <ValidationBar isValid={isValid} />
    </Stack>
  );
};
