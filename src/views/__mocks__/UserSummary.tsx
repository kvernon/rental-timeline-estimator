import React from 'react';

export const UserSummary = jest.fn(
  (p: {
    ownedProperties: number;
    allOwnedProperties: number;
    startDate: Date;
    endDate: Date;
    metMonthlyGoal: boolean;
    balance: number;
    minSavings: number;
    equity: number;
    estimatedCashFlow: number;
  }) => {
    return <div aria-label="User Summary" />;
  },
);
