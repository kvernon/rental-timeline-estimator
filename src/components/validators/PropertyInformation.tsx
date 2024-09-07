import React from 'react';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';
import { RangeFieldValidator } from './RangeFieldValidator';
import { Stack } from '../core/Stack';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import styled from '@emotion/styled';
import { propertyOptions } from './PropertyDropDownValidator';
import { IPropertyInformationParams } from './IPropertyInformationParams';

const Img = styled.img`
  padding-top: 20px;
`;

export const PropertyInformation = (props: IPropertyInformationParams) => {
  const propertyOption = propertyOptions[props.propertyType === PropertyType.PassiveApartment ? 0 : 1];
  return (
    <Stack aria-label={props.title} direction="row">
      <Img width={`${498 / 2}px`} height={`${426 / 2}px`} title={propertyOption} alt={propertyOption} src={`/images/${propertyOption}-lg.jpg`} />
      <Stack direction="column" paddingLeft="15px">
        <RangeValidationPanel title="Life Span">
          <RangeFieldValidator
            min={1}
            max={5}
            required={false}
            title="Minimum Generated Rental Opportunities"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestGenerationAmount}
            id="lowest-generation-amount"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
          <RangeFieldValidator
            min={props.lowestPurchasePrice.value + 1}
            max={10}
            required={false}
            title="Maximum Generated Rental Opportunities"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestGenerationAmount}
            id="highest-generation-amount"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Market Value">
          <RangeFieldValidator
            min={1}
            max={5}
            prefix="$"
            required={false}
            title="Lowest Market Value"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestPurchasePrice}
            id="lowest-purchase-price"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
          <RangeFieldValidator
            min={props.lowestPurchasePrice.value + 1}
            max={10}
            prefix="$"
            required={false}
            title="Highest Market Value"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestPurchasePrice}
            id="highest-purchase-price"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Cash Flow Range">
          <RangeFieldValidator
            min={100}
            max={200}
            prefix="$"
            required={false}
            title="Lowest Amount"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestCashFlow}
            id="lowest-cash-flow"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
          <RangeFieldValidator
            min={props.highestCashFlow.value + 1}
            max={10}
            prefix="$"
            required={false}
            title="Highest Amount"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestCashFlow}
            id="lowest-cash-flow"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
        </RangeValidationPanel>

        <RangeValidationPanel title="Equity Capture Range">
          <RangeFieldValidator
            min={1}
            max={100}
            suffix="%"
            required={false}
            title="Lowest Equity"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.lowestEquityCapturePercent}
            id="lowest-equity-capture"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
          <RangeFieldValidator
            min={props.lowestEquityCapturePercent.value + 1}
            max={100}
            suffix="%"
            required={false}
            title="Highest Equity"
            hasSpinner={true}
            useUnderlineOnly={false}
            showTitle={true}
            value={props.highestEquityCapturePercent}
            id="lowest-equity-capture"
            onChange={(e) => {
              console.log('e', e);
            }}
          />
        </RangeValidationPanel>
      </Stack>
    </Stack>
  );
};
