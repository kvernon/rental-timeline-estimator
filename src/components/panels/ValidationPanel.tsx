import React from 'react';
import { ValidatorStack } from '../validators/ValidatorStack';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRangeFieldValidatorChange } from '../validators/IRangeFieldValidatorProps';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { FontGroups, IThemeOptions } from '../../theme';

export interface IValidationPanelProps {
  id: string;
  panelType: ValidatorStackTypes;
  children: React.ReactElement<IRangeFieldValidatorChange>[] | React.ReactElement<IRangeFieldValidatorChange>;
  title: string;
}

const H5 = styled.h5<{ theme: IThemeOptions }>`
  color: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.color};
  font-family: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.font};
  font-size: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.size};
  margin: 0;
`;

const Typography = styled.div`
  position: relative;
  top: 6px;
`;

const Card = styled.div<{ theme: IThemeOptions }>`
  background-color: ${(props) => props.theme.palette.panelBackground};
  color: ${(props) => props.theme.typography.get(FontGroups.panelTitle)?.color};
  /*drop-shadow(20px 505px 1 #101B1E);*/
  box-shadow: 0px 10px 15px rgba(16, 27, 30, 0.4);
`;

const CardContent = styled.div`
  padding: 0;
  margin-top: 0;
  &:last-child {
    padding-bottom: 0;
  },
`;

export const ValidationPanel = function (props: IValidationPanelProps) {
  const coreTheme = useTheme() as IThemeOptions;

  return (
    <div>
      <Typography>
        <H5 theme={coreTheme}>{props.title}</H5>
      </Typography>
      <Card id={`panel-${props.id}`} theme={coreTheme}>
        <CardContent>
          <ValidatorStack panelValidatorStackType={props.panelType} id={props.id}>
            {props.children}
          </ValidatorStack>
        </CardContent>
      </Card>
    </div>
  );
};
