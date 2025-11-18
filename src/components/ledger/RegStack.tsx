import styled from '@emotion/styled';
import { Stack } from '../core/Stack';

export const RegStack = styled(Stack)`
  border-bottom: rgba(0, 0, 0, 0.19) solid 2px;
  background-color: rgba(0, 0, 0, 0.19);
  transition: border-color 0.4s ease-out;

  &:hover {
    background-color: #3a2663;
    transition:
      border-color 0.4s ease-out,
      background-color 0.4s ease-out;
    border-color: rgba(0, 0, 0, 0);
  }
`;
