import styled from '@emotion/styled';
import { Span } from '../core/Span';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import React, { useEffect, useState } from 'react';
import { TypeSpan } from './TypeSpan';

export const AddressSpan = styled(Span)`
  white-space: nowrap;
  min-width: 169px;
`;

export const AddressNote = styled(TypeSpan)`
  width: unset;
`;
export const AddressPropertyImage = styled.img`
  width: ${88 / 4}px;
  height: ${58 / 4}px;
  padding-left: 10px;
`;

export const AddressFormatted = (props: { note?: string }) => {
  const [note, setNote] = useState<string>(props.note || '');
  const [propertyOption, setPropertyOption] = useState<PropertyType>(PropertyType.None);

  useEffect(() => {
    if (note === '') {
      setPropertyOption(PropertyType.None);
    } else if (note.includes('(SingleFamily)')) {
      setPropertyOption(PropertyType.SingleFamily);
      setNote(note.replace('(SingleFamily)', ''));
    } else if (note.includes('(PassiveApartment)')) {
      setPropertyOption(PropertyType.PassiveApartment);
      setNote(note.replace('(PassiveApartment)', ''));
    }
  }, [note]);

  return (
    <AddressSpan direction="row">
      <AddressNote>{note}</AddressNote>
      {propertyOption !== PropertyType.None && (
        <AddressPropertyImage title={note} alt={note} src={`./images/${propertyOption === PropertyType.SingleFamily ? 'house' : 'apartment'}.gif`} />
      )}
    </AddressSpan>
  );
};
