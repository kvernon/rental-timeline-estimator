import React from 'react';
import { IAddListButtonProps } from '../AddListButton';

export const AddListButton = jest.fn((p: IAddListButtonProps) => {
  return <button type="button" onClick={p.onClick} role="button" aria-label={p.role} title={p.label} />;
});
