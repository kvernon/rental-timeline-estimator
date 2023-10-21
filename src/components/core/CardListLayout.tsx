import { TypographyDiv } from './TypographyDiv';
import { Header5 } from './Header5';
import React, { ReactNode } from 'react';
import { Stack } from './Stack';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import styled from '@emotion/styled';
import { Card } from './Card';

export interface ICardListLayoutProps {
  title: string;
  id: string;
  children: ReactNode | ReactNode[];
}

const CardPadding = styled(Card)`
  padding: 40px 40px 35px;
`;

export const CardListLayout = (props: ICardListLayoutProps) => {
  const coreTheme = useTheme() as IThemeOptions;
  return (
    <Stack flexGrow={1} direction={'column'}>
      <TypographyDiv>
        <Header5 theme={coreTheme}>{props.title}</Header5>
      </TypographyDiv>
      <CardPadding id={`panel-${props.id}`} theme={coreTheme}>
        {props.children}
      </CardPadding>
    </Stack>
  );
};
