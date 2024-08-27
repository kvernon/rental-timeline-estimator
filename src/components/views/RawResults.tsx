import { Stack } from '../core/Stack';
import React from 'react';
import { IRuleValues } from '../rules/IRuleValues';
import { IEventResult } from '../validators/IEventResult';
import { ISelectOption } from '../core/ISelectOption';
import { generate } from '../../data/generate';
import styled from '@emotion/styled';

const Regular = styled(Stack)`
  color: white;
`;

const Err = styled(Stack)`
  padding-top: 30px;
  color: pink;
  text-align: center;
`;

export const RawResults = (props: {
  userInfo: {
    purchaseRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    holdRules: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[];
    savedAtStart: IEventResult<number | undefined>;
    moSavings: IEventResult<number | undefined>;
    goal: IEventResult<number | undefined>;
  };
}) => {
  try {
    return <Regular role="raw-results">{JSON.stringify(generate(props.userInfo), null, ' ')}</Regular>;
  } catch (e) {
    return <Err role="raw-results-failed">{(e as Error).message}</Err>;
  }
};
