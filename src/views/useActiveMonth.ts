import React, { useEffect, useRef } from 'react';

export function useActiveMonth(
  year: number,
  month: number,
  setActiveMonth: React.Dispatch<React.SetStateAction<{ year: number; month: number } | null>>,
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the top of the section hits the top of the viewport
        if (entry.isIntersecting) {
          setActiveMonth({ year, month });
        } else if (entry.boundingClientRect.top > 0) {
          // If the section's top edge moves down below the viewport top (user scrolled up past it)
          setActiveMonth((current) => (current?.year === year && current?.month === month ? null : current));
        }
      },
      // Trigger when the element crosses the line at the very top of the screen
      { rootMargin: '-1px 0px -100% 0px' },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [year, month, setActiveMonth]);

  return ref;
}
