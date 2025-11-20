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

const BackGroundNode = styled(Stack)`
  padding-left: 0;
  background-color: rgba(16, 27, 30, 0.49);
  align-items: stretch;
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
`;

const StackContainer = styled(Stack)`
  padding-top: 80px;
  padding-bottom: 0;
  padding-left: 0;
  margin: 0;
  align-items: stretch;
`;

export function GoalPanelDataSummary(props: { data: number; isValid: () => boolean }): ReactNode {
  const coreTheme = useTheme() as IThemeOptions;
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <BackGroundNode theme={coreTheme} direction="column" paddingRight="0" paddingBottom="0">
      <Confetti width={width} height={height} run={showConfetti} recycle={false} numberOfPieces={350} />
      <StackContainer theme={coreTheme} direction="column">
        <TitleNode theme={coreTheme}>Estimated monthly cash flow</TitleNode>
        <DataNode themeOptions={coreTheme} validatorType={ValidatorTypes[props.isValid() ? ValidatorTypes.Valid : ValidatorTypes.Invalid]}>
          <NumberFlow
            value={props.data}
            transformTiming={{ duration: 1000, easing: 'linear' }}
            format={{
              currency: 'USD',
              style: 'currency',
              signDisplay: 'auto',
              minimumFractionDigits: 0,
              minimumIntegerDigits: props.data.toString().length,
              unitDisplay: 'long',
            }}
            onAnimationsFinish={() => {
              setShowConfetti(true);
            }}
          />
        </DataNode>
      </StackContainer>
    </BackGroundNode>
  );
}
