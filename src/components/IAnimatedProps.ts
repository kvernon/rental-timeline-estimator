import React from 'react';

export const DEFAULT_START_DELAY = 0.15;
export const DEFAULT_DURATION = 0.3;

export interface IAnimatedProps {
  children: React.ReactNode;
  delay?: number;
}
