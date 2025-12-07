import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ValidatorTypes } from '../components/validators/ValidatorTypes';

export const getTimeline = (state: RootState) => {
  return state.result.timeline;
};

export const getErrorMessage = (state: RootState) => state.result.errorMessage;

export const getRentals = createSelector([getTimeline], (timeline) => {
  if (!timeline) {
    return [];
  }

  return timeline.rentals;
});

export const getActivelyOwnedProperties = createSelector([getTimeline], (timeline) => {
  if (!timeline) {
    return [];
  }
  return timeline.rentals.filter((p) => p.property.isOwned || p.property.soldDate).map((x) => x.property);
});

export const getActivelyOwnedPropertiesCount = createSelector([getActivelyOwnedProperties], (properties) => properties.length);

export const getOwnedOrSoldProperties = createSelector([getTimeline], (timeline) => {
  if (!timeline) {
    return [];
  }
  return timeline.rentals.filter((p) => p.property.isOwned).map((x) => x.property);
});

export const getOwnedOrSoldPropertiesCount = createSelector([getOwnedOrSoldProperties], (properties) => properties.length);

export const getEndDateBalanceForUser = createSelector([getTimeline], (timeline) => {
  if (!timeline) {
    return 0;
  }

  return timeline.getBalance(timeline.endDate) || 0;
});

export const getStartAndEndDate = createSelector([getTimeline], (timeline) => {
  if (!timeline) {
    return [null, null];
  }

  return [timeline.startDate, timeline.endDate];
});

export const getEstimatedCashFlow = createSelector([getStartAndEndDate, getActivelyOwnedProperties], (dates, properties) => {
  const [, endDate] = dates;

  if (endDate === null) {
    return 0;
  }

  return properties.reduce((previousValue, currentValue) => previousValue + currentValue.getCashFlowByDate(endDate), 0);
});

export const getUser = createSelector([getTimeline], (timeline) => timeline?.user);

export const getGoalMetForUser = createSelector([getStartAndEndDate, getUser], (dates, user) => {
  const [, endDate] = dates;

  if (endDate === null) {
    return false;
  }

  return user?.metMonthlyGoal(endDate) || false;
});

export const getEquity = createSelector([getStartAndEndDate, getActivelyOwnedProperties], (dates, properties) => {
  const [, endDate] = dates;

  if (endDate === null) {
    return 0;
  }

  return properties.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.getEstimatedEquityFromSell(endDate);
  }, 0);
});

export const getLedgerCollection = createSelector([getTimeline], (timeline) => timeline?.user.ledgerCollection || null);

export const getAnimationCompleted = (state: RootState) => state.result.animationCompleted;

export const getCompletedValidation = createSelector([getAnimationCompleted, getGoalMetForUser], (completed, goalMet) => {
  if (!completed) {
    return ValidatorTypes.Optional;
  }
  return goalMet ? ValidatorTypes.Valid : ValidatorTypes.Invalid;
});
