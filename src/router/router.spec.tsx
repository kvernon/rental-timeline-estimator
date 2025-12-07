import React from 'react';
import { createHashRouter } from 'react-router';
import { Router } from './router';

jest.mock('../views/UserInformation', () => ({
  UserInformation: () => <div data-testid="user-information" />,
}));
jest.mock('../views/Settings', () => ({
  Settings: () => <div data-testid="settings" />,
}));
jest.mock('../views/PropertiesInformation', () => ({
  PropertiesInformation: () => <div data-testid="properties-information" />,
}));
jest.mock('../views/Results', () => ({
  Results: () => <div data-testid="results" />,
}));
jest.mock('../views/RootLayout', () => ({
  RootLayout: () => <div data-testid="root-layout" />,
}));

jest.mock('react-router', () => ({
  createHashRouter: jest.fn().mockReturnValue({ id: 'mock-router-instance' }),
}));

describe('Router Configuration', () => {
  it('should create a hash router with the correct route structure', () => {
    // Check if createHashRouter was called
    expect(createHashRouter).toHaveBeenCalledTimes(1);

    // Verify that the exported Router is the result of the factory function
    expect(Router).toEqual({ id: 'mock-router-instance' });

    // Get the configuration array passed to createHashRouter
    const routes = (createHashRouter as jest.Mock).mock.calls[0][0];

    // Assert the root route
    expect(routes).toHaveLength(1);
    const rootRoute = routes[0];
    expect(rootRoute.path).toBe('/');

    // Verify RootLayout element is used
    expect(rootRoute.element.type.name).toBe('RootLayout');

    // Assert children routes
    expect(rootRoute.children).toHaveLength(4);

    // 1. UserInformation (Index route)
    const indexRoute = rootRoute.children.find((r: { index: number }) => r.index);
    expect(indexRoute).toBeDefined();
    expect(indexRoute.element.type.name).toBe('UserInformation');
    expect(indexRoute.element.props.title).toBe('User Information');

    // 2. Settings
    const settingsRoute = rootRoute.children.find((r: { path: string }) => r.path === 'system');
    expect(settingsRoute).toBeDefined();
    expect(settingsRoute.element.type.name).toBe('Settings');

    // 3. PropertiesInformation
    const propertiesRoute = rootRoute.children.find((r: { path: string }) => r.path === 'properties');
    expect(propertiesRoute).toBeDefined();
    expect(propertiesRoute.element.type.name).toBe('PropertiesInformation');

    // 4. Results
    const resultsRoute = rootRoute.children.find((r: { path: string }) => r.path === 'results');
    expect(resultsRoute).toBeDefined();
    expect(resultsRoute.element.type.name).toBe('Results');
  });
});
