import React, { cloneElement, useEffect, useMemo, useState } from 'react';
import { ValidationBar } from './ValidationBar';
import { IValidatorPanelProps } from './IValidatorPanelProps';
import { Stack } from '../core/Stack';
import { ValidatorStackName } from '../naming/ValidatorStackName';
import { ValidatorTypes } from './ValidatorTypes';
import { toValidatorType } from './ToValidatorType';
import { onChangeType } from './IRangeFieldValidatorChange';
import { IEventResult } from './IEventResult';
import { formatName } from '../naming/FormatName';
import { FormatNames } from '../naming/FormatNames';

export const ValidatorStack = function (props: IValidatorPanelProps) {
  const [isValidDefault] = useState<ValidatorTypes>(toValidatorType(props.panelValidatorStackType));
  const [isValid, setIsValid] = useState<ValidatorTypes>(isValidDefault);
  const [isValidCollection, setIsValidCollection] = useState<{ id: string; isValid: ValidatorTypes }[]>([]);

  const chg: onChangeType = (evt: IEventResult<number>) => {
    const index = isValidCollection.findIndex((x) => formatName(x.id, FormatNames.RangeFieldValidatorId) === evt.id);

    if (index !== -1) {
      const entity = isValidCollection[index];
      if (entity && entity.isValid !== evt.validationResult) {
        // get all
        const newed = [...isValidCollection];
        // update at index
        newed[index] = { id: entity.id, isValid: evt.validationResult };
        // save
        setIsValidCollection(newed);
      }
    }
  };

  useEffect(() => {
    const children = Array.isArray(props.children) ? props.children : [props.children];
    setIsValidCollection(
      children.map((x) => ({
        isValid: isValidDefault,
        id: x.props.id,
      })),
    );
  }, [isValidDefault]);

  useMemo(() => {
    setIsValid(() => {
      if (isValidCollection.some((x) => x.isValid === ValidatorTypes.Invalid)) {
        return ValidatorTypes.Invalid;
      }

      if (isValidCollection.some((x) => x.isValid === ValidatorTypes.Valid)) {
        return ValidatorTypes.Valid;
      }

      return ValidatorTypes.Optional;
    });
  }, [isValidCollection]);

  const children = Array.isArray(props.children) ? props.children : [props.children];

  return (
    <Stack id={ValidatorStackName(props.id)} direction="row">
      <Stack spacing={2} id={props.id} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
        {children.map((child, idx) => cloneElement(child, { ...child.props, onChange: chg, key: child.key || idx }))}
      </Stack>
      <ValidationBar isValid={isValid} />
    </Stack>
  );
};
