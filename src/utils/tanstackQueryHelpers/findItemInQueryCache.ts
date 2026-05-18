import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

interface FindItemInQueryCacheOptions<T> {
  queryKeyPrefix: QueryKey;
  idKey: keyof T;
  idValue: any;
}

export function findItemInQueryCache<T extends Record<string, any>>({
  queryKeyPrefix,
  idKey,
  idValue,
}: FindItemInQueryCacheOptions<T>): T | undefined {
  // Returns an array of [queryKey, data]
  const allQueries = queryClient.getQueriesData<T[] | T>({
    queryKey: queryKeyPrefix,
  });

  for (const [_, data] of allQueries) {
    if (!data) continue;

    // Case: Infinite Query (structure with 'pages')
    if (data && typeof data === 'object' && 'pages' in data) {
      for (const page of data.pages) {
        const items = Array.isArray(page) ? page : page?.data;
        if (Array.isArray(items)) {
          const found = items.find((item) => item[idKey] === idValue);
          if (found) return found;
        }
      }
    }
    // Case: query data is an array (e.g. list of users)
    else if (Array.isArray(data)) {
      const found = data.find((item) => item[idKey] === idValue);
      if (found) return found;
    }
    // Case: data is a single object (e.g. user profile)
    else if (data[idKey] === idValue) {
      return data;
    }
  }

  return undefined;
}
