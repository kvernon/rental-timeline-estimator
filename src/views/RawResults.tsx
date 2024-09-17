import { Stack } from '../components/core/Stack';
import React from 'react';
import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { generate } from '../data/generate';
import styled from '@emotion/styled';
import { IUserInfo } from '../data/IUserInfo';

const Regular = styled(Stack)`
  color: white;
`;

const Err = styled(Stack)`
  padding-top: 30px;
  color: pink;
  text-align: center;
`;

export const RawResults = (props: { userInfo: IUserInfo }) => {
  try {
    return <Regular role="raw-results">{JSON.stringify(generate(props.userInfo), null, ' ')}</Regular>;
  } catch (e) {
    return <Err role="raw-results-failed">{(e as Error).message}</Err>;
  }
};
