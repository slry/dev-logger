import {
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ComponentProps, FC } from 'react';

export const withHydrationBoundary = <T, P extends object>(
  Component: FC<P>,
  queryOptions: FetchQueryOptions<T>,
) => {
  const queryClient = new QueryClient();

  const WithHydrationBoundary: FC<ComponentProps<typeof Component>> = async (props) => {
    await queryClient.prefetchQuery(queryOptions);
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };

  WithHydrationBoundary.displayName = `WithHydrationBoundary(${Component.displayName || Component.name})`;

  return WithHydrationBoundary;
};
