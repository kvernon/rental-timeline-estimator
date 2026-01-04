import styled from '@emotion/styled';
import { Stack } from '../components/core/Stack';

export const ItemOnOff = styled(Stack)<{ visible: boolean }>`
  width: unset;
  color: ${({ visible }) => `#332211${visible ? '' : '11'}`};
  transition: all 0.6s ease;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
