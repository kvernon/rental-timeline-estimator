import React from 'react';

export const InputBox = jest.fn((props: { children: React.ReactElement | React.ReactElement[] }) => {
  return <div>{props.children}</div>;
});
