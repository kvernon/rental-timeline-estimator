import React, { useEffect, useState } from 'react';

import { RangeFieldValidator } from '../validators/RangeFieldValidator';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';
import { ValidatorStackName } from '../naming/ValidatorStackName';
import styled from '@emotion/styled';
import { Spinner } from '../core/Spinner';
import { RangeFieldValidatorName } from '../naming/RangeFieldValidatorName';
import { Stack } from '../core/Stack';

const TopStack = styled.div`
  height: 275px;
  display: block;
  width: 100%;
  overflow: visible;
  float: left;
  position: relative;
`;

const StackPosition = styled(Stack)`
  position: relative;
  width: auto;
  min-height: 0;
  z-index: 2;
`;

const ZRangeFieldValidator = styled(RangeFieldValidator)`
  z-index: 4;
`;

export const GoalPanel = (props: IRangeFieldValidatorProps) => {
  const [x, setX] = useState<number | undefined>();
  const [y, setY] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  useEffect(() => {
    const getPosition = () => {
      const ele = document.getElementById(`${RangeFieldValidatorName(props.id)}-box`);

      const x = ele?.getBoundingClientRect().x;
      setX(() => x);

      const y = ele?.getBoundingClientRect().y;
      setY(() => y);

      const width = ele?.getBoundingClientRect()?.width;
      setWidth(() => width);

      const height = ele?.getBoundingClientRect()?.height;
      setHeight(() => height);
    };

    getPosition();
    window.addEventListener('resize', getPosition);

    return () => {
      window.removeEventListener('resize', getPosition);
    };
  }, [props.id]);

  return (
    <TopStack id={ValidatorStackName(props.id)}>
      <Spinner shape={{ x, width, y, height }} />
      <StackPosition spacing={2} id={props.id} paddingLeft={'20%'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'20%'}>
        <ZRangeFieldValidator {...props} id={props.id} direction={'row'} useUnderlineOnly hasSpinner={false} useTransparent={true} />
      </StackPosition>
    </TopStack>
  );
};
