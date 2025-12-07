import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserLedgerSummariesForYearByMonth } from './UserLedgerSummariesForYearByMonth';
import { ILedgerCollection } from '@cubedelement.com/realty-investor-timeline';
import { UserLedgerSummaryForMonth } from './UserLedgerSummaryForMonth';

// Mock the child component
jest.mock('./UserLedgerSummaryForMonth');

describe('UserLedgerSummariesForYearByMonth', () => {
  const mockGetSummariesAnnual = jest.fn();
  // Cast to unknown first to avoid mocking the entire interface
  const mockLedgerCollection = {
    getSummariesAnnual: mockGetSummariesAnnual,
  } as unknown as ILedgerCollection;

  const defaultProps = {
    ledgerCollection: mockLedgerCollection,
    year: 2024,
    goal: 50000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of UserLedgerSummaryForMonth components based on annual summaries', () => {
    const mockSummaries = [
      { id: 'summary-1', val: 100 },
      { id: 'summary-2', val: 200 },
      { id: 'summary-3', val: 300 },
    ];

    mockGetSummariesAnnual.mockReturnValue(mockSummaries);

    render(<UserLedgerSummariesForYearByMonth {...defaultProps} />);

    // Verify it retrieves data for the correct year
    expect(mockGetSummariesAnnual).toHaveBeenCalledWith(2024);

    // Verify the correct number of children are rendered
    const items = screen.getAllByText('UserLedgerSummaryForMonth');
    expect(items).toHaveLength(3);

    // Verify props passed to the first child
    expect(UserLedgerSummaryForMonth).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        ledgerCollection: mockLedgerCollection,
        ledgerSummary: mockSummaries[0],
        year: 0, // The component maps index to the 'year' prop
        goal: 50000,
      }),
      undefined,
    );

    // Verify props passed to the last child
    expect(UserLedgerSummaryForMonth).toHaveBeenLastCalledWith(
      expect.objectContaining({
        ledgerCollection: mockLedgerCollection,
        ledgerSummary: mockSummaries[2],
        year: 2,
        goal: 50000,
      }),
      undefined,
    );
  });

  it('renders nothing if getSummariesAnnual returns an empty array', () => {
    mockGetSummariesAnnual.mockReturnValue([]);

    render(<UserLedgerSummariesForYearByMonth {...defaultProps} />);

    expect(mockGetSummariesAnnual).toHaveBeenCalledWith(2024);
    const items = screen.queryAllByTestId('mock-summary-month');
    expect(items).toHaveLength(0);
  });
});
