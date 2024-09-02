import React from 'react';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';
import { RangeFieldValidator } from './RangeFieldValidator';
import { IEventResult } from './IEventResult';
import { Stack } from '../core/Stack';

export interface IPropertiesInformationParams {
  title: string;
  lowestPurchasePrice: IEventResult<number>;
  highestPurchasePrice: IEventResult<number>;
  lowestCashFlow: IEventResult<number>;
  highestCashFlow: IEventResult<number>;
  lowestEquityCapturePercent: IEventResult<number>;
  highestEquityCapturePercent: IEventResult<number>;
  lowestGenerationAmount: IEventResult<number>;
  highestGenerationAmount: IEventResult<number>;
}

export const PropertyInformation = (props: IPropertiesInformationParams) => {
  return (
    <Stack aria-label={props.title}>
      <RangeValidationPanel title="Generator Amount">
        <RangeFieldValidator
          min={1}
          max={5}
          required={false}
          title="Minimum"
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
          prefix="$"
          required={false}
          title="Minimum"
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

      <RangeValidationPanel title="Purchase Price Range">
        <RangeFieldValidator
          min={1}
          max={5}
          prefix="$"
          required={false}
          title="Lowest Price"
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
          title="Highest Price"
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
  );
};
