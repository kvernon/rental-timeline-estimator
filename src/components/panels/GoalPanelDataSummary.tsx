import React, { ReactNode, useEffect, useState } from 'react';
import { Stack } from '../core/Stack';
import styled from '@emotion/styled';
import { Header6 } from '../core/text/Header6';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { FontGroups } from '../../theming/fontGroups';
import { ValidatorTypes } from '../validators/ValidatorTypes';
import NumberFlow from '@number-flow/react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useFormDispatch, useFormSelector } from '../../redux/hooks';
import { setAnimationCompleted } from '../../redux/timelineSlice';
import { getEstimatedCashFlow, getGoalMetForUser } from '../../redux/timelineSelectors';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';

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

export function GoalPanelDataSummary(): ReactNode {
  const coreTheme = useTheme() as IThemeOptions;
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [validationType, setValidationType] = useState<ValidatorTypes>(ValidatorTypes.Optional);

  const dispatch = useFormDispatch();
  const estimatedCashFlow = useFormSelector(getEstimatedCashFlow);
  const [animatedCashFlow, setAnimatedCashFlow] = useState(0);
  const metGoal = useFormSelector(getGoalMetForUser);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCashFlow(estimatedCashFlow);
    }, DEFAULT_START_DELAY * 61);

    return () => clearTimeout(timer);
  }, [estimatedCashFlow]);

  return (
    <BackGroundNode
      theme={coreTheme}
      direction="column"
      paddingRight="0"
      paddingBottom="0"
      themeOptions={coreTheme}
      validatorType={ValidatorTypes[validationType]}
    >
      <Confetti
        width={width}
        height={height}
        run={showConfetti}
        recycle={false}
        numberOfPieces={150}
        tweenDuration={300}
        friction={1}
        confettiSource={{
          x: 0, // left edge
          y: height - height / 3, // near bottom
          w: 100,
          h: height / 3,
        }}
        onConfettiComplete={() => {
          setShowConfetti(false);
        }}
      />
      <Confetti
        width={width}
        height={height}
        run={showConfetti}
        recycle={false}
        numberOfPieces={150}
        tweenDuration={300}
        friction={1}
        confettiSource={{
          x: width - 100, // right edge
          y: height - height / 3, // near bottom
          w: 100,
          h: height / 3,
        }}
        onConfettiComplete={() => {
          setShowConfetti(false);
        }}
      />
      <StackContainer theme={coreTheme} direction="column">
        <TitleNode theme={coreTheme}>Estimated monthly cash flow</TitleNode>
        <DataNode themeOptions={coreTheme} validatorType={ValidatorTypes[validationType]}>
          <NumberFlow
            value={animatedCashFlow}
            transformTiming={{ duration: 850, easing: 'ease-in-out' }}
            format={{
              currency: 'USD',
              style: 'currency',
              signDisplay: 'auto',
              minimumFractionDigits: 0,
              minimumIntegerDigits: estimatedCashFlow.toString().length,
              unitDisplay: 'long',
            }}
            onAnimationsFinish={() => {
              const valid = metGoal ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
              setValidationType(valid);
              setShowConfetti(valid === ValidatorTypes.Valid);
              dispatch(setAnimationCompleted(true));
            }}
          />
        </DataNode>
      </StackContainer>
    </BackGroundNode>
  );
}
