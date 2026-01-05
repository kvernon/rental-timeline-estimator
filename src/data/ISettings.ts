import { ConditionalNumber, ConditionEventResult } from '../components/validators/IRangeFieldValidatorEvent';

export interface ISettings {
  singleFamilyMinimumMonthlyReservesForRental: ConditionEventResult<true, ConditionalNumber<true>>;
  maxYears: ConditionEventResult<true, ConditionalNumber<true>>;
  singleFamilyLoanRatePercent: ConditionEventResult<true, ConditionalNumber<true>>;
  singleFamilyLoanTermInYears: ConditionEventResult<true, ConditionalNumber<true>>;
  passiveApartmentsMinimumMonthlyReservesForRental: ConditionEventResult<true, ConditionalNumber<true>>;
}
