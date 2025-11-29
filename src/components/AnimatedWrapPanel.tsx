import React, { useEffect, useRef, useState } from 'react';
import { Stack } from './core/Stack';
import { DEFAULT_DURATION, DEFAULT_START_DELAY, IAnimatedProps } from './IAnimatedProps';
import { MotionStack } from './MotionStack';

/**
 * animation will last for 0.3 seconds and do a 0.15 second transition delay from end of height to width
 * @param children
 * @param delay
 * @constructor
 */
export function AnimatedWrapPanel({ children, delay }: IAnimatedProps) {
  const [startDelayWithWait] = React.useState(delay === undefined ? 0 : delay + DEFAULT_START_DELAY);
  const [continueDelayWithWait] = React.useState(startDelayWithWait + DEFAULT_START_DELAY);
  const [maxSizeDuration, setMaxSizeDuration] = useState<{ width: number; height: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Let children lay out naturally
    const rect = containerRef.current.getBoundingClientRect();
    setMaxSizeDuration({
      width: Math.floor(rect.width / DEFAULT_DURATION),
      height: Math.floor(rect.height / DEFAULT_DURATION),
    });
  }, [children]);

  return (
    <MotionStack
      initial={{ scaleY: 0.1 }}
      animate={{ scaleY: 1 }}
      transition={{
        duration: maxSizeDuration ? maxSizeDuration.height : DEFAULT_DURATION,
        type: 'spring',
        stiffness: 900, // higher stiffness = snappier
        damping: 70, // lower damping = more bounce
        delay: startDelayWithWait,
      }}
      style={{ transformOrigin: 'top left' }}
    >
      <MotionStack
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: maxSizeDuration ? maxSizeDuration.width : DEFAULT_DURATION,
          type: 'spring',
          stiffness: 900, // higher stiffness = snappier
          damping: 70, // lower damping = more bounce

          delay: continueDelayWithWait,
        }}
        style={{ transformOrigin: 'top left' }}
      >
        <Stack ref={containerRef}>{children}</Stack>
      </MotionStack>
    </MotionStack>
  );
}
