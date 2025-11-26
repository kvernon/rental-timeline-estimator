import React from 'react';

interface NumberFlowProps {
  value: number;
  [key: string]: unknown;
}

const NumberFlow = jest.fn((props: NumberFlowProps) => {
  return <div>{props.value}</div>;
});

export { NumberFlow };
export default NumberFlow;
