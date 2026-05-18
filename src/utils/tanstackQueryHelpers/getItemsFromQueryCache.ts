import { InfiniteData, QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

export function getItemsFromQueryCache<T>(
  queryKeyPrefix: QueryKey
): InfiniteData<T[]> | T[] | undefined {
  const allQueries = queryClient.getQueriesData<InfiniteData<T[]> | T[]>({
    queryKey: queryKeyPrefix,
    exact: false,
  });

  const [, data] = allQueries[0] ?? [];

  return data ?? undefined;
}
