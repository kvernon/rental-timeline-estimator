import { renderHook } from '@testing-library/react';
import { useYears } from './useYears';
import { useFormSelector } from '../../redux/hooks';

jest.mock('../../redux/hooks');

describe('useYear', () => {
  afterEach(jest.resetAllMocks);

  test('should be empty array', () => {
    jest
      .mocked(useFormSelector)
      .mockImplementation(() => {})
      .mockReturnValueOnce([]);

    const { result } = renderHook(() => useYears());

    expect(result.current).toEqual([]);
  });

  test('should be populated array', () => {
    jest
      .mocked(useFormSelector)
      .mockImplementation(() => {})
      .mockReturnValueOnce([new Date(2025, 1), new Date(2026, 1)]);

    const { result } = renderHook(() => useYears());

    expect(result.current).toEqual([2025, 2026]);
  });
});
