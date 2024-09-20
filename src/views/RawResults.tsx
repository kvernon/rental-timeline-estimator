import { Stack } from '../components/core/Stack';
import React from 'react';
import { generate } from '../data/generate';
import styled from '@emotion/styled';
import { IUserInfo } from '../data/IUserInfo';
import { IPropertiesInformationPropsEvent } from './IPropertiesInformationProps';

const Regular = styled(Stack)`
  color: white;
`;

const Err = styled(Stack)`
  padding-top: 30px;
  color: pink;
  text-align: center;
`;

export const RawResults = (props: { userInfo: IUserInfo; propertiesInfo: IPropertiesInformationPropsEvent }) => {
  try {
    return <Regular role="raw-results">{JSON.stringify(generate(props.userInfo, props.propertiesInfo), null, ' ')}</Regular>;
  } catch (e) {
    return <Err role="raw-results-failed">{(e as Error).message}</Err>;
  }
};
