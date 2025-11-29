import React, { useState } from 'react';
import { Stack } from './core/Stack';
import { DEFAULT_DURATION, DEFAULT_START_DELAY, IAnimatedProps } from './IAnimatedProps';
import { MotionStack } from './MotionStack';

/**
 * animation will last for 0.3 seconds and do a 0.15 second transition delay from end of height to width
 * @param children
 * @param delay
 * @constructor
 */
export function AnimatedWrapFormItem({ children, delay }: IAnimatedProps) {
  const [startDelayWithWait] = useState(delay === undefined ? 0 : delay + DEFAULT_START_DELAY);
  return (
    <MotionStack
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: DEFAULT_DURATION,
        ease: 'easeIn',
        delay: startDelayWithWait,
      }}
      style={{ transformOrigin: 'top left' }}
    >
      <Stack>{children}</Stack>
    </MotionStack>
  );
}
