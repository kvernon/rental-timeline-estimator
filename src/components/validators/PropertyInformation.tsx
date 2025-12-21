import React from 'react';
import { RangeValidationPanel } from '../panels/RangeValidationPanel';
import { Stack } from '../core/Stack';
import { PropertyType } from '@cubedelement.com/realty-investor-timeline';
import styled from '@emotion/styled';
import { IPropertyInformationOnChangeParams, IPropertyInformationParams } from './IPropertyInformationParams';
import { propertyOptions } from './PropertyOptions';
import { AnimatedWrapPanel } from '../AnimatedWrapPanel';
import { AnimatedRangeFieldValidator } from './AnimatedRangeFieldValidator';
import { motion } from 'motion/react';
import { DEFAULT_DURATION, DEFAULT_START_DELAY } from '../IAnimatedProps';

const Img = styled.img`
  padding-top: 20px;
`;

const StackColumn = styled(Stack)`
  padding-left: 15px;
`;

const PropertyRangeValidationPanel = styled(RangeValidationPanel)`
  padding-left: 0;
  width: unset;
`;

export const PropertyInformation = (props: IPropertyInformationOnChangeParams) => {
  const propertyOption = propertyOptions[props.propertyType === PropertyType.PassiveApartment ? 0 : 1];

  return (
    <Stack aria-label={props.title} direction="row">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: DEFAULT_DURATION,
          ease: 'easeIn',
        }}
      >
        <Img width={`${629 / 2}px`} height={`${467 / 2}px`} title={propertyOption} alt={propertyOption} src={`./images/${propertyOption}-lg.gif`} />
      </motion.div>
      <StackColumn direction="column">
        <AnimatedWrapPanel>
          <PropertyRangeValidationPanel title="Life Span" required={true}>
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 2}
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

            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 3}
              min={props.lowestGenerationAmount.value + 1}
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

            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 4}
              min={1}
              max={6}
              required={true}
              title="Maximum Time Listed"
              hasSpinner={true}
              useUnderlineOnly={false}
              showTitle={true}
              value={props.maxMonthsToCache}
              id="highest-cache-amount"
              onChange={(e) => {
                props.onChange({
                  ...props,
                  maxMonthsToCache: e,
                });
              }}
            />
          </PropertyRangeValidationPanel>
        </AnimatedWrapPanel>
        <AnimatedWrapPanel delay={DEFAULT_START_DELAY}>
          <PropertyRangeValidationPanel title="Market Value" required={true}>
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 3}
              min={1}
              max={5000000}
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
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 4}
              min={props.lowestPurchasePrice.value + 1}
              max={10000000}
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
          </PropertyRangeValidationPanel>
        </AnimatedWrapPanel>
        <AnimatedWrapPanel delay={DEFAULT_START_DELAY * 2}>
          <PropertyRangeValidationPanel title="Sell Info" required={true}>
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 4}
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

            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 5}
              min={props.lowestMinSellInYears.value + 1}
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

            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 6}
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
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 7}
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
          </PropertyRangeValidationPanel>
        </AnimatedWrapPanel>
        <AnimatedWrapPanel delay={DEFAULT_START_DELAY * 3}>
          <PropertyRangeValidationPanel title="Cash Flow Range" required={true}>
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 5}
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
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 6}
              min={props.lowestCashFlow.value + 1}
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
          </PropertyRangeValidationPanel>
        </AnimatedWrapPanel>
        <AnimatedWrapPanel delay={DEFAULT_START_DELAY * 4}>
          <PropertyRangeValidationPanel title="Equity Capture Range" required={true}>
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 6}
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
            <AnimatedRangeFieldValidator<true>
              delay={DEFAULT_START_DELAY * 7}
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
          </PropertyRangeValidationPanel>
        </AnimatedWrapPanel>
      </StackColumn>
    </Stack>
  );
};
