import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { APITokenList } from '@/widgets/api-token-list/ui';

import { getAPITokensList } from '../api';

export const ApiSettingsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['api-tokens-list'],
    queryFn: getAPITokensList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="px-4">
        <APITokenList />
      </section>
    </HydrationBoundary>
  );
};
