import { useState, useEffect } from 'react';

const useMountTransition = (isMounted, duration) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
};

export default useMountTransition;
