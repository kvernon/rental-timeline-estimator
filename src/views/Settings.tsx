import React from 'react';
import { RangeValidationPanel } from '../components/panels/RangeValidationPanel';
import { RangeFieldValidator } from '../components/validators/RangeFieldValidator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ConditionalNumber, ConditionEventResult } from '../components/validators/IRangeFieldValidatorEvent';
import { updateSettings } from '../redux/formSlice';
import { ISettings } from '../data/ISettings';
import { Stack } from '../components/core/Stack';

export function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.form.settings);

  const handleRangeChange = (key: keyof ISettings) => (e: ConditionEventResult<true, ConditionalNumber<true>>) => {
    dispatch(updateSettings({ key, value: e }));
  };

  return (
    <Stack aria-label={'Money'} direction="column">
      <RangeValidationPanel title="Time" required={true}>
        <RangeFieldValidator<true>
          min={1}
          max={20}
          required={true}
          title="Maximum Amount of Years"
          hasSpinner={true}
          useUnderlineOnly={false}
          showTitle={true}
          value={value.maxYears}
          id="max-years-of-life"
          onChange={handleRangeChange('maxYears')}
        />
      </RangeValidationPanel>
      <RangeValidationPanel title="Single Family Loans" required={true}>
        <RangeFieldValidator<true>
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
        <RangeFieldValidator<true>
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
      <RangeValidationPanel title="Passive Apartments" required={true}>
        <RangeFieldValidator<true>
          min={25000}
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
    </Stack>
  );
}
