import React from 'react';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { Header5 } from '../core/Header5';
import { TypographyDiv } from '../core/TypographyDiv';
import { Card } from '../core/Card';
import { CardContent } from '../core/CardContent';
import { Stack } from '../core/Stack';

export function Panel(props: { children: React.ReactElement[] | React.ReactElement; title: string }) {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Stack direction={'column'} paddingTop={'15px'} paddingBottom={'15px'} aria-label={props.title}>
      <TypographyDiv>
        <Header5 theme={coreTheme}>{props.title}</Header5>
      </TypographyDiv>
      <Card theme={coreTheme}>
        <CardContent>
          <Stack direction="row">
            <Stack spacing={2} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
              {props.children}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
