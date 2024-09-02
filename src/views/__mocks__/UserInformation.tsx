import { IUserInformationProps } from '../IUserInformationProps';
import React from 'react';

export const UserInformation = jest.fn((p: IUserInformationProps) => {
  return <div aria-label="User Information" />;
});
