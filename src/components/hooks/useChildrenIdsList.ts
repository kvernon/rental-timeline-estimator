import React, { isValidElement, useEffect, useState } from 'react';
import { IIdentifier } from '../validators/IIdentifier';
import { IIdentifierType } from '../validators/IIdentifierType';

export const useChildrenIdsList = (children: React.ReactElement<IIdentifier>[] | React.ReactElement<IIdentifier> = []): [IIdentifierType[]] => {
  const [theChildrenIds, setTheChildrenIds] = useState<IIdentifierType[]>([]);

  useEffect(() => {
    const identifiers = (Array.isArray(children) ? children : [children]).map((x) => {
      return {
        id: x.props.id,
        type: isValidElement(x) && typeof x.type === 'function' ? x.type?.name : '',
      };
    });

    const newIn = JSON.stringify(identifiers);
    const current = JSON.stringify(theChildrenIds);
    if (newIn !== current) {
      // console.log('useChildrenIdsList::useEffect [children, theChildrenIds]');
      setTheChildrenIds(() => identifiers);
    }
  }, [children, theChildrenIds]);

  return [theChildrenIds];
};
