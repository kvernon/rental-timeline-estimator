import React from 'react';
import { IDeleteProps } from '../DeleteButton';

export const DeleteButton = jest.fn((props: IDeleteProps) => {
  return (
    <div
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      role={'delete-button'}
    >
      This is the delete button
    </div>
  );
});
