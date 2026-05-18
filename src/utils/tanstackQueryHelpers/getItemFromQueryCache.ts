import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

export function getItemFromQueryCache<T>(queryKey: QueryKey): T | undefined {
  return queryClient.getQueryData<T>(queryKey);
}
