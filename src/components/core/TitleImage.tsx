import styled from '@emotion/styled';
import React from 'react';

export const Title = styled.img`
  width: 593px;
  height: 160px;
  margin: 25px 0 -25px;
`;

export function TitleImage() {
  return <Title src="./images/rg3-title.png" alt="Rental Gen 3" />;
}
