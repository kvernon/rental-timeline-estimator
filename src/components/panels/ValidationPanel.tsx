import React from 'react';
import { ValidatorStack } from '../validators/ValidatorStack';
import { ValidatorStackTypes } from '../validators/ValidatorStackTypes';
import { IRangeFieldValidatorChange } from '../validators/IRangeFieldValidatorProps';
import styled from '@emotion/styled';

export interface IValidationPanelProps {
  id: string;
  panelType: ValidatorStackTypes;
  children: React.ReactElement<IRangeFieldValidatorChange>[] | React.ReactElement<IRangeFieldValidatorChange>;
  title: string;
}

const Typography = styled.div`
  position: relative;
  top: 9px;
  color: #a19fa8;
`;

const Card = styled.div`
  background-color: #321f59;
  color: #a19fa8;
`;

const CardContent = styled.div`
  padding: 0;
  margin-top: 0;
'&:last-child': {
  padding-bottom: 0;
},
`;

export const ValidationPanel = function (props: IValidationPanelProps) {
  return (
    <div>
      <Typography>
        <h5>{props.title}</h5>
      </Typography>
      <Card id={`panel-${props.id}`}>
        <CardContent>
          <ValidatorStack panelValidatorStackType={props.panelType} id={props.id}>
            {props.children}
          </ValidatorStack>
        </CardContent>
      </Card>
    </div>
  );
};
