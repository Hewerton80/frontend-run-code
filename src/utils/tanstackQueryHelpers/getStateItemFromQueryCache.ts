import { QueryKey, QueryState } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

export function getStateItemFromQueryCache<T>(queryKey: QueryKey): QueryState<T> | undefined {
  return queryClient.getQueryState<T>(queryKey);
}
