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

export function ValidationPanel(props: {
  children: React.ReactElement[] | React.ReactElement;
  title: string;
  validationType: ValidatorTypes;
  padRight?: boolean;
  forceIsValid?: boolean;
}) {
  const coreTheme = useTheme() as IThemeOptions;

  const padding = props.padRight === undefined || props.padRight;
  const mainRightPadding = padding ? '4px' : '0';
  const containerRightPadding = padding ? '25px' : '0';

  let isValidForced = true;

  if (Object.hasOwn(props, 'forceIsValid') && props.forceIsValid !== undefined) {
    isValidForced = props.forceIsValid;
  }

  return (
    <Stack direction={'column'} paddingTop={'15px'} paddingBottom={'15px'} paddingRight={mainRightPadding} aria-label={props.title}>
      <TypographyDiv>
        <Header5 theme={coreTheme}>{props.title}</Header5>
      </TypographyDiv>
      <Card theme={coreTheme}>
        <CardContent>
          <Stack direction="row">
            <Stack spacing={2} flexGrow={1} paddingLeft="25px" paddingTop="25px" paddingBottom="25px" paddingRight={containerRightPadding}>
              {props.children}
            </Stack>
            <ValidationBar
              isValid={
                !isValidForced
                  ? props.validationType
                  : props.validationType === ValidatorTypes.Valid || props.validationType === ValidatorTypes.Optional
                    ? ValidatorTypes.Valid
                    : ValidatorTypes.Invalid
              }
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
