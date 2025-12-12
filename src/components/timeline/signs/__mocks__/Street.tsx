import React from 'react';

interface IStreetProps {
  address?: string;
}

export const Street = jest.fn(({ address }: IStreetProps): React.ReactNode => {
  return <div>{address}</div>;
});
