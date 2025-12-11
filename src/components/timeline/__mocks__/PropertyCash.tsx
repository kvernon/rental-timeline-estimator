import React from 'react';

export const PropertyCash = jest.fn((props: { value: number; title: string }): React.ReactNode => {
  return (
    <div data-testid="property-cash">
      {props.value} - {props.title}
    </div>
  );
});
