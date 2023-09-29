import React, { useEffect, useState } from 'react';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';

export const useChildrenPropsList = (
  children: React.ReactElement<IRangeFieldValidatorProps>[] | React.ReactElement<IRangeFieldValidatorProps> = [],
) => {
  const [theChildrenProps, setTheChildrenProps] = useState<IRangeFieldValidatorProps[]>([]);

  useEffect(() => {
    const iRangeFieldValidatorProps = Array.isArray(children) ? children.map((x) => x.props) : [children.props];

    const newIn = JSON.stringify(iRangeFieldValidatorProps);
    const current = JSON.stringify(theChildrenProps);
    if (newIn !== current) {
      // console.log('useChildrenPropsList::useEffect [children, theChildrenProps]');
      setTheChildrenProps(iRangeFieldValidatorProps);
    }
  }, [children, theChildrenProps]);

  return {
    theChildrenProps,
  };
};
