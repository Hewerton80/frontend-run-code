import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

interface DeleteItemInQueryCacheOptions<T> {
  queryKeyPrefix: QueryKey;
  key: keyof T;
  value: any;
}

export function deleteItemInQueryCache<T extends Record<string, any>>({
  queryKeyPrefix,
  key,
  value,
}: DeleteItemInQueryCacheOptions<T>) {
  queryClient.setQueriesData<T[] | T>({ queryKey: queryKeyPrefix, exact: false }, (oldData) => {
    if (!oldData) return oldData;

    // 1. Handle Infinite Query (structure with 'pages')
    if (oldData && typeof oldData === 'object' && 'pages' in oldData) {
      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => {
          // Check if the page is an array or an object (with a 'data' prop)
          const isArrayPage = Array.isArray(page);
          const items = isArrayPage ? page : page?.data;

          if (!Array.isArray(items)) return page;

          const filteredItems = items.filter((item: any) => item[key] !== value);

          // Return the page in its original format (preserving total, page, etc.)
          return isArrayPage ? filteredItems : { ...page, data: filteredItems };
        }),
      };
    }

    // 2. Handle Array (lists)
    if (Array.isArray(oldData)) {
      return oldData.filter((item) => item[key] !== value);
    }

    // 3. Handle Single Object (entity)
    const dataAsObject = oldData as T;
    if (dataAsObject[key] === value) {
      return undefined; // Remove the data from the query
    }

    return oldData;
  });
}
