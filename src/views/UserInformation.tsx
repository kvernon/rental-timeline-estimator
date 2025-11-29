import React, { useEffect, useState } from 'react';
import { RangeValidationPanel } from '../components/panels/RangeValidationPanel';
import { RulesCollection } from '../components/rules/RulesCollection';
import { Stack } from '../components/core/Stack';
import styled from '@emotion/styled';
import { IUserInformationProps } from './IUserInformationProps';
import { FontGroups } from '../theming/fontGroups';
import { Spinner } from '../components/core/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { updateRangeUserInfo, updateRuleUserInfo } from '../redux/formSlice';
import { ConditionalNumber, ConditionEventResult } from '../components/validators/IRangeFieldValidatorEvent';
import { IRuleValues } from '../components/rules/IRuleValues';
import { IEventResult } from '../components/validators/IEventResult';
import { ISelectOption } from '../components/core/ISelectOption';
import { IUserInfo } from '../data/IUserInfo';
import { getRulesValuesToRulesValuesResults } from './getRulesValuesToRulesValuesResults';
import { AnimatedWrapPanel } from '../components/AnimatedWrapPanel';
import { AnimatedRangeFieldValidator } from '../components/validators/AnimatedRangeFieldValidator';

const RulesStack = styled(Stack)`
  width: unset;

  > div:first-of-type {
    padding-right: 13px;
  }

  > div:nth-of-type(2) {
    padding-left: 13px;
  }
`;

const RulesCollectionWidth = styled(RulesCollection)`
  width: 80%;
`;

const TopStack = styled.div`
  height: 275px;
  display: block;
  width: 100%;
  overflow: visible;
  float: left;
  position: relative;
`;

const StackPosition = styled(Stack)`
  position: relative;
  width: auto;
  min-height: 0;
  z-index: 2;
`;

const FormStyled = styled.form`
  margin-right: 0;
`;

export function UserInformation(props: IUserInformationProps) {
  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.form.userInfo);

  const [x, setX] = useState<number | undefined>();
  const [y, setY] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    const getPosition = () => {
      const ele = document.getElementById(`goal-panel-box`);

      const x = ele?.getBoundingClientRect().x;
      setX(() => x);

      const y = ele?.getBoundingClientRect().y;
      setY(() => y);

      const width = ele?.getBoundingClientRect()?.width;
      setWidth(() => width);
    };

    getPosition();
    window.addEventListener('resize', getPosition);

    return () => {
      window.removeEventListener('resize', getPosition);
    };
  });

  const handleRangeChange =
    (key: Exclude<keyof IUserInfo, 'purchaseRules' | 'holdRules'>) => (e: ConditionEventResult<true, ConditionalNumber<true>>) => {
      dispatch(updateRangeUserInfo({ key, value: e }));
    };

  const handleRuleChange = (
    key: Exclude<keyof IUserInfo, 'goal' | 'savedAtStart' | 'moSavings'>,
    e: IRuleValues<IEventResult<ISelectOption>, IEventResult<number | undefined>>[],
  ) => {
    dispatch(updateRuleUserInfo({ key, value: e }));
  };

  return (
    <FormStyled aria-label={props.title}>
      <TopStack aria-label={'Goal Panel'}>
        <Spinner id="goal-spin" shape={{ x, width, y }} />
        <StackPosition spacing={2} paddingLeft={'20%'} paddingTop={'25px'} paddingBottom={'25px'} paddingRight={'20%'}>
          <AnimatedRangeFieldValidator<true>
            inputFontGroup={FontGroups.inputGoal}
            inputLabelFontGroup={FontGroups.inputGoalLabel}
            min={1000}
            max={100000}
            prefix={'$'}
            required={true}
            title="Your Monthly Goal"
            showTitle={true}
            value={value.goal}
            useUnderlineOnly
            hasSpinner={false}
            useTransparent={true}
            id="goal-panel"
            onChange={handleRangeChange('goal')}
          />
        </StackPosition>
      </TopStack>

      <AnimatedWrapPanel delay={0}>
        <RangeValidationPanel title="Savings" required={true}>
          <AnimatedRangeFieldValidator<true>
            delay={0.3}
            min={0}
            max={9999999}
            prefix="$"
            required={true}
            title="Amount Saved at Start"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={value.savedAtStart}
            id="amount-saved-at-start"
            onChange={handleRangeChange('savedAtStart')}
          />

          <AnimatedRangeFieldValidator<true>
            delay={0.5}
            min={0}
            max={9999999}
            prefix="$"
            required={true}
            title="Amount Saved Per Month"
            hasSpinner={true}
            showTitle={true}
            useUnderlineOnly={false}
            value={value.moSavings}
            id="amount-saved-per-month"
            onChange={handleRangeChange('moSavings')}
          />
        </RangeValidationPanel>
      </AnimatedWrapPanel>

      <RulesStack direction={'row'} flexGrow={2}>
        <AnimatedWrapPanel delay={0.5}>
          <RulesCollection
            title="Purchase Rules"
            values={value.purchaseRules}
            possibleChoices={props.choices.purchaseRules}
            onChange={(e) => {
              handleRuleChange('purchaseRules', getRulesValuesToRulesValuesResults(false, e, props.choices.purchaseRules));
            }}
          />
        </AnimatedWrapPanel>
        <AnimatedWrapPanel delay={1}>
          <RulesCollectionWidth
            title="Hold Rules"
            values={value.holdRules}
            possibleChoices={props.choices.holdRules}
            onChange={(e) => {
              handleRuleChange('holdRules', getRulesValuesToRulesValuesResults(false, e, props.choices.holdRules));
            }}
          />
        </AnimatedWrapPanel>
      </RulesStack>
    </FormStyled>
  );
}
