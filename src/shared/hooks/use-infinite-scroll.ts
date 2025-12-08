import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  enabled: boolean;
  threshold?: number;
}

/**
 * 무한 스크롤을 위한 IntersectionObserver 훅
 */
export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions
) {
  const { enabled, threshold = 0.1 } = options;
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [enabled, threshold, callback]);

  return observerTarget;
}
