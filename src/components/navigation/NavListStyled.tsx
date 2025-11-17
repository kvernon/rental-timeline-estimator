import styled from '@emotion/styled';

export const NavListStyled = styled.menu`
  display: -webkit-flex;
  display: flex;
  list-style-type: none;
  flex-flow: row wrap;
  padding: 0;
  justify-content: space-around;

  & > li:first-child > button {
    border-left: 0.5rem solid black;
    border-top-left-radius: 0.7rem;
    border-bottom-left-radius: 0.7rem;
  }

  & > li:last-child > button {
    border-right: 0.5rem solid black;
    border-top-right-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
  }
`;
