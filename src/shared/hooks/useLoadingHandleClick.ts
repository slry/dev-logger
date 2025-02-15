import { useState } from 'react';

export const useLoadingHandleClick = <T extends unknown[]>(
  fn: (...args: T) => Promise<void>,
) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (...args: T) => {
    setLoading(true);
    await fn(...args);
    setLoading(false);
  };

  return { loading, handleClick };
};
