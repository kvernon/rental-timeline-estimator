import styled from '@emotion/styled';

export const DragPlaceholder = styled.div`
  transition: background 0.4s ease-out;
  width: 20px;
  background-color: rgb(56, 56, 56);
  opacity: 1;
  background-image: radial-gradient(ellipse farthest-corner at 4px 4px, rgb(32, 32, 48), rgb(32, 32, 48) 50%, transparent 50%);
  background-size: 4px 4px;
  cursor: pointer;

  :hover {
    background-color: #6e6e6e;
    cursor: move;
  }
`;
