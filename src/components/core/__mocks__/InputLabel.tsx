import React from 'react';

export const InputLabel = jest.fn((props: { id: string; children: React.ReactElement | React.ReactElement[] }) => {
  return <label htmlFor={props.id}>{props.children}</label>;
});
