import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';
import { QueryKey, Updater } from '@tanstack/react-query';

export function setItemInCache<T>(
  queryKey: QueryKey,
  updater: Updater<NoInfer<T> | undefined, NoInfer<T> | undefined>
) {
  queryClient.setQueryData<T>(queryKey, updater);
}
