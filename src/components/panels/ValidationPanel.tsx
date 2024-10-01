import React from 'react';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { Header5 } from '../core/Header5';
import { TypographyDiv } from '../core/TypographyDiv';
import { Card } from '../core/Card';
import { CardContent } from '../core/CardContent';
import { Stack } from '../core/Stack';
import { ValidationBar } from '../validators/ValidationBar';
import { ValidatorTypes } from '../validators/ValidatorTypes';

export function ValidationPanel(props: { children: React.ReactElement[] | React.ReactElement; title: string; isValid: () => boolean }) {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Stack direction={'column'} paddingTop={'15px'} paddingBottom={'15px'} paddingRight={'4px'} aria-label={props.title}>
      <TypographyDiv>
        <Header5 theme={coreTheme}>{props.title}</Header5>
      </TypographyDiv>
      <Card theme={coreTheme}>
        <CardContent>
          <Stack direction="row">
            <Stack spacing={2} flexGrow={1} paddingLeft={'25px'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'25px'}>
              {props.children}
            </Stack>
            <ValidationBar isValid={props.isValid() ? ValidatorTypes.Valid : ValidatorTypes.Invalid} />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}