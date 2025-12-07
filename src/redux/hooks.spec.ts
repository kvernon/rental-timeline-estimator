import { useDispatch, useSelector } from 'react-redux';
import { useFormDispatch, useFormSelector } from './hooks';

jest.mock('react-redux');

describe('redux hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // set default mock return values
    const mockedUseDispatch = jest.mocked(useDispatch);
    const mockedUseSelector = jest.mocked(useSelector);
    mockedUseDispatch.mockReturnValue('mock-dispatch' as unknown as never);
    mockedUseSelector.mockImplementation(() => 'mock-selector' as unknown as never);
  });

  test('useFormDispatch proxies to react-redux useDispatch', () => {
    expect(useFormDispatch()).toBe('mock-dispatch');
  });

  test('useFormSelector proxies to react-redux useSelector', () => {
    const result = useFormSelector(() => ({}));
    expect(result).toBe('mock-selector');
  });
});
