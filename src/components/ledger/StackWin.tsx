import styled from '@emotion/styled';
import { Stack } from '../core/Stack';

export const StackWin = styled(Stack)`
  transition: background-color 0.4s ease-out;
  background-color: rgba(0, 100, 0, 0.37);
  border-bottom: rgba(0, 0, 0, 0.19) solid 2px;

  &:hover {
    transition:
      border-color 0.4s ease-out,
      background-color 0.4s ease-out;
    background-color: rgba(0, 100, 0, 0.61);
  }
`;
