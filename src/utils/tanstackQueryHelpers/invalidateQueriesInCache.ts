import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

/**
 * Invalidates queries in the TanStack Query cache by the given queryKey.
 *
 * Centralizes the use of `queryClient.invalidateQueries` outside components/hooks,
 * following the `arch-use-query-helpers` pattern — never use `queryClient` directly
 * outside `tanstackQueryHelpers/`.
 *
 * @param queryKey - The query key to invalidate (array or string)
 *
 * @example
 * ```ts
 * import { invalidateQueriesInCache } from '@/utils/tanstackQueryHelpers/invalidateQueriesInCache';
 *
 * invalidateQueriesInCache([ClaimsQueryKeys.All]);
 * ```
 */
export function invalidateQueriesInCache(queryKey: QueryKey): Promise<void> {
  return queryClient.invalidateQueries({ queryKey });
}
