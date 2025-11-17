import styled from '@emotion/styled';

export const NavListStyled = styled.menu`
  display: -webkit-flex;
  display: flex;
  list-style-type: none;
  flex-flow: row wrap;
  padding: 0;
  justify-content: space-around;

  & > li:first-child,
  & > li:first-child > button {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }

  & > li:last-child,
  & > li:last-child > button {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
`;
