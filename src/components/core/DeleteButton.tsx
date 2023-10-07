import styled from '@emotion/styled';
import { TrashAlt } from '@emotion-icons/fa-solid';
import React from 'react';

const DeleteButtonArea = styled.div`
  transition: background 0.4s ease-out;
  width: 45px;
  background: #520606;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    background: #7e0a0a;
  }
`;

const TrashColored = styled(TrashAlt)`
  color: red;
  width: 50%;
  transform: scale(1, 1.25);
  box-shadow: 0 0 5px #2d0404;
`;

export interface IDeleteProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const DeleteButton = (props: IDeleteProps) => {
  return (
    <DeleteButtonArea
      role={'delete-button'}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      <TrashColored role={'trash-can-icon'} />
    </DeleteButtonArea>
  );
};
