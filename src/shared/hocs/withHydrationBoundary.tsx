import {
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ComponentProps, FC } from 'react';

export const withHydrationBoundary = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends FetchQueryOptions<any>,
  P extends object,
>(
  Component: FC<P>,
  queryOptions: T[],
) => {
  const queryClient = new QueryClient();

  const WithHydrationBoundary: FC<ComponentProps<typeof Component>> = async (props) => {
    const promises = queryOptions.map((qo) => queryClient.prefetchQuery(qo));

    await Promise.all(promises);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };

  WithHydrationBoundary.displayName = `WithHydrationBoundary(${Component.displayName || Component.name})`;

  return WithHydrationBoundary;
};
