import styled from '@emotion/styled';

export const FormControl = styled.div`
  display: flex;
  color: #ffffffff;
  flex-direction: ${(props: { direction?: 'row' | 'column' }) => {
    return props.direction ?? 'row';
  }};
  justify-content: flex-start;
  padding-bottom: 10px;
  align-items: center;
`;
