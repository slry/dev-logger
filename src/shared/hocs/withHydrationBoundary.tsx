/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { FC } from 'react';

type WithHydrationBoundaryComponentProps<Props extends object> = {
  queryClient: QueryClient;
} & Props;

/**
 * A higher-order component that wraps a given component with a hydration boundary
 * and prefetches the provided query options.
 *
 * @param Component - The component to wrap.
 * @param queryOptions - An array of query options to prefetch.
 * @returns A new component that prefetches the queries and wraps the original component.
 */
export const withHydrationBoundary = <
  Props extends {},
  QueryOptions extends
    | FetchQueryOptions<any>
    | ((props: Props) => FetchQueryOptions<any>) =
    | FetchQueryOptions<any>
    | ((props: Props) => FetchQueryOptions<any>),
>(
  Component: FC<WithHydrationBoundaryComponentProps<Props>>,
  queryOptions: QueryOptions[],
) => {
  const queryClient = new QueryClient();

  const WithHydrationBoundary: FC<Props> = async (props) => {
    const promises = queryOptions.map((qo) => {
      const queryOption = typeof qo === 'function' ? qo(props) : qo;
      const typedQueryOption = queryOption as FetchQueryOptions<any>;
      // check if query is already in cache
      if (queryClient.getQueryData(typedQueryOption.queryKey)) {
        return Promise.resolve();
      }

      return queryClient.prefetchQuery(typedQueryOption);
    });

    await Promise.all(promises);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Component {...props} queryClient={queryClient} />
      </HydrationBoundary>
    );
  };

  WithHydrationBoundary.displayName = `WithHydrationBoundary(${Component.displayName ?? Component.name})`;

  return WithHydrationBoundary;
};
