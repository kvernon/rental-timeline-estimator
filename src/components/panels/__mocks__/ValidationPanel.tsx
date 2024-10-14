import React from 'react';

export const ValidationPanel = jest.fn(
  (props: { children: React.ReactElement[] | React.ReactElement; title: string; isValid: () => boolean; padRight?: boolean }) => {
    return <div aria-label={props.title}>{props.children}</div>;
  },
);
