import { Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { ValidatorStack } from '../validators/ValidatorStack';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRangeFieldValidatorChange } from '../validators/IRangeFieldValidatorProps';
import { Label } from '@mui/icons-material';

export interface IValidationPanelProps {
  id: string;
  panelType: ValidatorStackTypes;
  children: React.ReactElement<IRangeFieldValidatorChange>[] | React.ReactElement<IRangeFieldValidatorChange>;
  title: string;
}

export const ValidationPanel = (props: IValidationPanelProps) => {
  return (
    <Container>
      <Typography
        variant="h5"
        component="div"
        sx={{
          position: 'relative',
          top: '9px',
          color: '#A19FA8',
        }}
      >
        {props.title}
      </Typography>
      <Card id={`panel-${props.id}`} sx={{ backgroundColor: '#321F59', color: '#A19FA8' }}>
        <CardContent
          sx={{
            padding: 0,
            marginTop: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <ValidatorStack panelValidatorStackType={props.panelType} id={props.id}>
            {props.children}
          </ValidatorStack>
        </CardContent>
      </Card>
    </Container>
    /*  <Stack id={`panel-${props.id}`} sx={{backgroundColor: '#321F59', }}>
        <CardHeader sx={{color:'#A19FA8'}}>{props.title}</CardHeader>
        <ValidatorStack panelValidatorStackType={props.panelType} id={props.id}>{props.children}</ValidatorStack>
      </Stack>*/
  );
};
