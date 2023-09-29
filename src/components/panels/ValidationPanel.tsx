import React from 'react';
import { ValidatorStack } from '../validators/ValidatorStack';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRangeFieldValidatorProps } from '../validators/IRangeFieldValidatorProps';
import { useTheme } from '@emotion/react';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { Header5 } from '../core/Header5';
import { TypographyDiv } from '../core/TypographyDiv';
import { Card } from '../core/Card';
import { CardContent } from '../core/CardContent';
import { Stack } from '../core/Stack';

export interface IValidationPanelProps {
  id: string;
  panelType: ValidatorStackTypes;
  children: React.ReactElement<IRangeFieldValidatorProps>[] | React.ReactElement<IRangeFieldValidatorProps>;
  title: string;
}

export const ValidationPanel = function (props: IValidationPanelProps) {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <Stack direction={'column'} paddingTop={'15px'} paddingBottom={'15px'}>
      <TypographyDiv>
        <Header5 theme={coreTheme}>{props.title}</Header5>
      </TypographyDiv>
      <Card id={`panel-${props.id}`} theme={coreTheme}>
        <CardContent>
          <ValidatorStack panelValidatorStackType={props.panelType} id={props.id}>
            {props.children}
          </ValidatorStack>
        </CardContent>
      </Card>
    </Stack>
  );
};
