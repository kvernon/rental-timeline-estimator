import React from 'react';
import { RangeValidationPanel } from '../components/panels/RangeValidationPanel';
import { AnimatedRangeFieldValidator } from '../components/validators/AnimatedRangeFieldValidator';
import { ConditionalNumber, ConditionEventResult } from '../components/validators/IRangeFieldValidatorEvent';
import { updateSettings } from '../redux/formSlice';
import { ISettings } from '../data/ISettings';
import { Stack } from '../components/core/Stack';
import { useFormDispatch, useFormSelector } from '../redux/hooks';
import { AnimatedWrapPanel } from '../components/AnimatedWrapPanel';
import { DEFAULT_START_DELAY } from '../components/IAnimatedProps';

export function Settings() {
  const dispatch = useFormDispatch();
  const value = useFormSelector((state) => state.form.settings);

  const handleRangeChange = (key: keyof ISettings) => (e: ConditionEventResult<true, ConditionalNumber<true>>) => {
    dispatch(updateSettings({ key, value: e }));
  };

  return (
    <Stack aria-label={'Money'} direction="column">
      <AnimatedWrapPanel>
        <RangeValidationPanel title="Time" required={true}>
          <AnimatedRangeFieldValidator<true>
            delay={DEFAULT_START_DELAY * 2}
            min={1}
            max={20}
            required={true}
            title="Maximum Length"
            suffix="Years"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={value.maxYears}
            id="max-years-of-life"
            onChange={handleRangeChange('maxYears')}
          />
        </RangeValidationPanel>
      </AnimatedWrapPanel>
      <AnimatedWrapPanel delay={DEFAULT_START_DELAY}>
        <RangeValidationPanel title="Single Family Loans" required={true}>
          <AnimatedRangeFieldValidator<true>
            delay={DEFAULT_START_DELAY * 3}
            min={0}
            max={20}
            required={true}
            title="Loan Interest Rate"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            suffix={'%'}
            value={value.singleFamilyLoanRatePercent}
            id="sf-mort-interest-rate"
            onChange={handleRangeChange('singleFamilyLoanRatePercent')}
          />
          <AnimatedRangeFieldValidator<true>
            delay={DEFAULT_START_DELAY * 4}
            min={15}
            max={30}
            required={true}
            title="Loan Mortgage Term"
            suffix={'Years'}
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={value.singleFamilyLoanTermInYears}
            id="sf-mort-term-years"
            onChange={handleRangeChange('singleFamilyLoanRatePercent')}
          />
        </RangeValidationPanel>
      </AnimatedWrapPanel>
      <AnimatedWrapPanel delay={DEFAULT_START_DELAY * 2}>
        <RangeValidationPanel title="Reserves" required={true}>
          <AnimatedRangeFieldValidator<true>
            delay={DEFAULT_START_DELAY * 4}
            min={4}
            max={10}
            required={true}
            title="Single Family Minimum Mortgage Reserves"
            suffix={'Months'}
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={value.singleFamilyMinimumMonthlyReservesForRental}
            id="sf-monthly-reserves"
            onChange={handleRangeChange('singleFamilyMinimumMonthlyReservesForRental')}
          />
          <AnimatedRangeFieldValidator<true>
            delay={DEFAULT_START_DELAY * 5}
            min={6}
            max={100000}
            required={true}
            title="Multi Family Minimum Monthly Reserves"
            prefix={'$'}
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={value.passiveApartmentsMinimumMonthlyReservesForRental}
            id="mf-monthly-reserves"
            onChange={handleRangeChange('passiveApartmentsMinimumMonthlyReservesForRental')}
          />
        </RangeValidationPanel>
      </AnimatedWrapPanel>
    </Stack>
  );
}
