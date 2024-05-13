import styled from '@emotion/styled';

export const FormControl = styled.div`
  display: flex;
  color: #ffffffff;
  flex-direction: ${(props: { direction?: 'row' | 'column' }) => {
    return props.direction ?? 'row';
  }};
  margin: 5px 5px 24px 5px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &:last-child {
    margin: 5px;
  }
`;
