import { FC } from 'react';

export const withHydrationBoundary = <T extends object>(Component: FC<T>) => {
  return function _(props: T) {
    return <Component {...props} />;
  };
};
