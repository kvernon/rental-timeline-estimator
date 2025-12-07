import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { themeMock } from '../../../__tests__/ThemeMock';
import { IThemeOptions } from '../../theming/IThemeOptions';
import { useTheme } from '@emotion/react';
import { GoalPanelDataSummary } from './GoalPanelDataSummary';
import { useFormDispatch, useFormSelector } from '../../redux/hooks';
import { when } from 'jest-when';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';
import { getEstimatedCashFlow, getGoalMetForUser } from '../../redux/timelineSelectors';
import { DEFAULT_START_DELAY } from '../IAnimatedProps';
import { setAnimationCompleted } from '../../redux/timelineSlice';

// Mocks
jest.mock('react-confetti', () => ({
  __esModule: true,
  default: jest.fn((props: any) => (
    <div data-testid="confetti" data-run={props.run} onClick={() => props.onConfettiComplete && props.onConfettiComplete()} />
  )),
}));

jest.mock('@number-flow/react', () => ({
  __esModule: true,
  default: jest.fn((props: any) => (
    <div data-testid="number-flow" onClick={() => props.onAnimationsFinish && props.onAnimationsFinish()}>
      {props.value}
    </div>
  )),
}));

jest.mock('../../data/currency-formatter', () => ({
  currencyFormatter: jest.fn(),
}));

jest.mock('react-redux');

jest.mock('../../redux/timelineSlice', () => ({
  setAnimationCompleted: jest.fn((payload) => ({ type: 'timeline/setAnimationCompleted', payload })),
}));

jest.mock('react-use', () => ({
  useWindowSize: jest.fn(() => ({ width: 1000, height: 800 })),
}));

describe('GoalPanelDataSummary unit tests', () => {
  let useFormSelectorMock: jest.MockWithArgs<TypedUseSelectorHook<RootState>> & TypedUseSelectorHook<RootState> & {};
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    useFormSelectorMock = jest.mocked(useFormSelector).mockImplementation(() => {});
    dispatchMock = jest.fn();
    jest.mocked(useFormDispatch).mockReturnValue(dispatchMock);

    // Default selector values
    when(useFormSelectorMock).calledWith(getEstimatedCashFlow).mockReturnValue(10);
    when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(true);

    jest.mocked(useTheme).mockReturnValue(themeMock as jest.Mocked<IThemeOptions>);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('and defaults', () => {
    test('should render title', () => {
      jest.useFakeTimers();
      render(<GoalPanelDataSummary />);
      const panelDataSummary = screen.getByText<HTMLDivElement>('Estimated monthly cash flow');

      expect(panelDataSummary).toBeInTheDocument();
    });

    test('should render data after delay', () => {
      jest.useFakeTimers();
      render(<GoalPanelDataSummary />);

      act(() => {
        jest.advanceTimersByTime(DEFAULT_START_DELAY * 61);
      });

      // Based on getEstimatedCashFlow return value
      const panelDataSummary = screen.getByText('10');
      expect(panelDataSummary).toBeInTheDocument();
    });
  });

  describe('interactions and animations', () => {
    test('should trigger validation, show confetti, and dispatch completion when animation finishes and goal is met', () => {
      // Arrange
      when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(true);
      jest.useFakeTimers();

      render(<GoalPanelDataSummary />);

      // Fast-forward to ensure value is set
      act(() => {
        jest.advanceTimersByTime(DEFAULT_START_DELAY * 61);
      });

      const numberFlow = screen.getByTestId('number-flow');

      // Act - Trigger animation finish
      fireEvent.click(numberFlow);

      // Assert
      // Confetti should be running (2 instances are rendered)
      const confettis = screen.getAllByTestId('confetti');
      expect(confettis.length).toBeGreaterThan(0);
      confettis.forEach((c) => expect(c).toHaveAttribute('data-run', 'true'));

      // Dispatch called
      expect(setAnimationCompleted).toHaveBeenCalledWith(true);
      expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'timeline/setAnimationCompleted', payload: true }));
    });

    test('should trigger validation but NOT show confetti when animation finishes and goal is NOT met', () => {
      // Arrange
      when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(false);
      jest.useFakeTimers();

      render(<GoalPanelDataSummary />);

      // Fast-forward
      act(() => {
        jest.advanceTimersByTime(DEFAULT_START_DELAY * 61);
      });

      const numberFlow = screen.getByTestId('number-flow');

      // Act
      fireEvent.click(numberFlow);

      // Assert
      const confettis = screen.getAllByTestId('confetti');
      // Confetti should NOT be running
      confettis.forEach((c) => expect(c).toHaveAttribute('data-run', 'false'));

      // Dispatch should still be called
      expect(setAnimationCompleted).toHaveBeenCalledWith(true);
    });

    test('should stop confetti when confetti completes', () => {
      // Arrange
      when(useFormSelectorMock).calledWith(getGoalMetForUser).mockReturnValue(true);
      jest.useFakeTimers();

      render(<GoalPanelDataSummary />);

      act(() => {
        jest.advanceTimersByTime(DEFAULT_START_DELAY * 61);
      });

      const numberFlow = screen.getByTestId('number-flow');

      // Start confetti
      fireEvent.click(numberFlow);

      const confettis = screen.getAllByTestId('confetti');
      expect(confettis[0]).toHaveAttribute('data-run', 'true');

      // Act - Trigger confetti completion
      fireEvent.click(confettis[0]);

      // Assert - Confetti should stop running
      expect(confettis[0]).toHaveAttribute('data-run', 'false');
    });
  });
});
