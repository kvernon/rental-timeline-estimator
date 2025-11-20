import React, { ReactNode, useState } from 'react';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { Header6 } from '../core/Header6';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { FontGroups } from '../../theming/fontGroups';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import NumberFlow from '@number-flow/react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const BackGroundNode = styled(Stack)<{
  themeOptions: IThemeOptions;
  validatorType: string;
}>`
  padding-left: 0;
  background-color: ${(coreTheme) => coreTheme.themeOptions.palette.validation[coreTheme.validatorType].goalBackground};
  align-items: stretch;

  transition: background-color 0.2s ease-out;
`;

const TitleNode = styled(Header6)`
  text-align: center;
  padding-bottom: 15px;
`;

const DataNode = styled(Stack)<{
  themeOptions: IThemeOptions;
  validatorType: string;
}>`
  font-family: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.font};
  font-size: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.size};
  font-weight: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.weight};
  color: ${(coreTheme) => coreTheme.themeOptions.typography.get(FontGroups.inputGoal)?.color};
  text-shadow: ${(coreTheme) => coreTheme.themeOptions.palette.validation[coreTheme.validatorType].validationColor} 0 0 5px;
  text-align: center;
  transition: text-shadow 0.4s ease-out;
`;

const StackContainer = styled(Stack)`
  padding-top: 80px;
  padding-bottom: 0;
  padding-left: 0;
  margin: 0;
  align-items: stretch;
`;

export function GoalPanelDataSummary(props: { data: number; validationType: ValidatorTypes }): ReactNode {
  const coreTheme = useTheme() as IThemeOptions;
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [validationType, setValidationType] = useState<ValidatorTypes>(ValidatorTypes.Optional);
  const validatedType: ValidatorTypes = props.validationType;

  return (
    <BackGroundNode
      theme={coreTheme}
      direction="column"
      paddingRight="0"
      paddingBottom="0"
      themeOptions={coreTheme}
      validatorType={ValidatorTypes[validationType]}
    >
      <Confetti width={width} height={height} run={showConfetti} recycle={false} numberOfPieces={350} />
      <StackContainer theme={coreTheme} direction="column">
        <TitleNode theme={coreTheme}>Estimated monthly cash flow</TitleNode>
        <DataNode themeOptions={coreTheme} validatorType={ValidatorTypes[validationType]}>
          <NumberFlow
            value={props.data}
            transformTiming={{ duration: 750, easing: 'ease-in-out' }}
            format={{
              currency: 'USD',
              style: 'currency',
              signDisplay: 'auto',
              minimumFractionDigits: 0,
              minimumIntegerDigits: props.data.toString().length,
              unitDisplay: 'long',
            }}
            onAnimationsFinish={() => {
              setValidationType(validatedType);
              if (validatedType === ValidatorTypes.Valid) {
                setShowConfetti(true);
              }
            }}
          />
        </DataNode>
      </StackContainer>
    </BackGroundNode>
  );
}
