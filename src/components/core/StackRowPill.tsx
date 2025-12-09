import styled from '@emotion/styled';
import { Stack } from './Stack';

export const StackRowPill = styled(Stack)`
  margin-top: 0;
  margin-bottom: 6px;
  background-color: #4f41b9;
  border-radius: 0.25rem;
  border: 0.1rem solid #2e266a;
  padding-bottom: 4px;
  padding-right: 10px;
  align-items: center;

  > :first-child {
    padding-top: 4px;
    margin-top: 6px;
  }
`;
