import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

export function hasQueryCache(queryKeyPrefix: QueryKey): boolean {
  const queries = queryClient.getQueriesData({
    queryKey: queryKeyPrefix,
    exact: false,
  });

  return queries.some(([, data]) => data !== undefined && data !== null);
}
