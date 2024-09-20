import React from 'react';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';
import { RangeFieldValidator } from './RangeFieldValidator';
import { Stack } from '../core/Stack';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import styled from '@emotion/styled';
import { propertyOptions } from './PropertyDropDownValidator';
import { IPropertyInformationOnChangeParams, IPropertyInformationParams } from './IPropertyInformationParams';

const Img = styled.img`
  padding-top: 20px;
`;

export const PropertyInformation = (props: IPropertyInformationOnChangeParams) => {
  const propertyOption = propertyOptions[props.propertyType === PropertyType.PassiveApartment ? 0 : 1];

  return (
    <Stack aria-label={props.title} direction="row">
      <Img width={`${498 / 2}px`} height={`${426 / 2}px`} title={propertyOption} alt={propertyOption} src={`/images/${propertyOption}-lg.jpg`} />
      <Stack direction="column" paddingLeft="15px">
        <RangeValidationPanel title="Life Span" required={true}>
          <RangeFieldValidator<true>
            min={1}
            max={5}
            required={true}
            title="Minimum Generated Rental Opportunities"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestGenerationAmount}
            id="lowest-generation-amount"
            onChange={(e) => {
              props.onChange({
                ...(props as IPropertyInformationParams),
                lowestGenerationAmount: e,
              });
            }}
          />

          <RangeFieldValidator<true>
            min={props.lowestPurchasePrice.value + 1}
            max={10}
            required={true}
            title="Maximum Generated Rental Opportunities"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestGenerationAmount}
            id="highest-generation-amount"
            onChange={(e) => {
              props.onChange({
                ...props,
                highestGenerationAmount: e,
              });
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Market Value" required={true}>
          <RangeFieldValidator<true>
            min={1}
            max={5}
            prefix="$"
            required={true}
            title="Lowest Market Value"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestPurchasePrice}
            id="lowest-purchase-price"
            onChange={(e) => {
              props.onChange({
                ...props,
                lowestPurchasePrice: e,
              });
            }}
          />
          <RangeFieldValidator<true>
            min={props.lowestPurchasePrice.value + 1}
            max={10}
            prefix="$"
            required={true}
            title="Highest Market Value"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestPurchasePrice}
            id="highest-purchase-price"
            onChange={(e) => {
              props.onChange({
                ...props,
                highestPurchasePrice: e,
              });
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Sell Price" required={true}>
          <RangeFieldValidator<true>
            min={5}
            max={20}
            suffix="Years"
            required={true}
            title="Lowest Sell Time"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestMinSellInYears}
            id="lowest-minimum-sell-in-years"
            onChange={(e) => {
              props.onChange({
                ...props,
                lowestMinSellInYears: e,
              });
            }}
          />

          <RangeFieldValidator<true>
            min={props.highestMinSellInYears.value + 1}
            max={20}
            suffix="Years"
            required={true}
            title="Highest Sell Time"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestMinSellInYears}
            id="highest-minimum-sell-in-years"
            onChange={(e) => {
              props.onChange({
                ...props,
                highestMinSellInYears: e,
              });
            }}
          />

          <RangeFieldValidator<true>
            min={1}
            max={20}
            suffix="%"
            required={true}
            title="Lowest Appreciation Percent"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestAppreciationValue}
            id="lowest-appreciation-value"
            onChange={(e) => {
              props.onChange({
                ...props,
                lowestAppreciationValue: e,
              });
            }}
          />
          <RangeFieldValidator<true>
            min={props.lowestAppreciationValue.value + 1}
            max={20}
            suffix="%"
            required={true}
            title="Highest Appreciation Percent"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestAppreciationValue}
            id="highest-appreciation-value"
            onChange={(e) => {
              props.onChange({
                ...props,
                highestAppreciationValue: e,
              });
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Cash Flow Range" required={true}>
          <RangeFieldValidator<true>
            min={100}
            max={200}
            prefix="$"
            required={true}
            title="Lowest Amount"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestCashFlow}
            id="lowest-cash-flow"
            onChange={(e) => {
              props.onChange({
                ...props,
                lowestCashFlow: e,
              });
            }}
          />
          <RangeFieldValidator<true>
            min={props.highestCashFlow.value + 1}
            max={10}
            prefix="$"
            required={true}
            title="Highest Amount"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestCashFlow}
            id="lowest-cash-flow"
            onChange={(e) => {
              props.onChange({
                ...props,
                highestCashFlow: e,
              });
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Equity Capture Range" required={true}>
          <RangeFieldValidator<true>
            min={1}
            max={100}
            suffix="%"
            required={true}
            title="Lowest Equity"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestEquityCapturePercent}
            id="lowest-equity-capture"
            onChange={(e) => {
              props.onChange({
                ...props,
                lowestEquityCapturePercent: e,
              });
            }}
          />
          <RangeFieldValidator<true>
            min={props.lowestEquityCapturePercent.value + 1}
            max={100}
            suffix="%"
            required={true}
            title="Highest Equity"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestEquityCapturePercent}
            id="lowest-equity-capture"
            onChange={(e) => {
              props.onChange({
                ...props,
                highestEquityCapturePercent: e,
              });
            }}
          />
        </RangeValidationPanel>
      </Stack>
    </Stack>
  );
};
