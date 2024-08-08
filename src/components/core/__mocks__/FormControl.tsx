import React from 'react';

export const FormControl = jest.fn((props: { children: React.ReactElement | React.ReactElement[] }) => {
  return <div>{props.children}</div>;
});
