import { QueryKey } from '@tanstack/react-query';
import { queryClient } from '@/utils/tanstackQueryHelpers/queryClient';

interface AddItemInQueryCacheOptions<T> {
  queryKeyPrefix: QueryKey;
  newItem: T;
  position?: 'start' | 'end';
}

export function addItemInQueryCache<T extends Record<string, any>>({
  queryKeyPrefix,
  newItem,
  position = 'start',
}: AddItemInQueryCacheOptions<T>) {
  queryClient.setQueriesData<T[]>({ queryKey: queryKeyPrefix, exact: false }, (oldData) => {
    if (!oldData) return oldData;

    // 1. Handle Infinite Query (structure with 'pages')
    if (oldData && typeof oldData === 'object' && 'pages' in oldData) {
      const pages: any[] = (oldData as any).pages;

      const addToPage = (page: any) => {
        const isArrayPage = Array.isArray(page);
        const items: T[] = isArrayPage ? page : page?.data;

        if (!Array.isArray(items)) return page;

        const updatedItems = position === 'start' ? [newItem, ...items] : [...items, newItem];

        return isArrayPage ? updatedItems : { ...page, data: updatedItems };
      };

      // Add to the start of the first page or end of the last page
      const updatedPages =
        position === 'start'
          ? [addToPage(pages[0]), ...pages.slice(1)]
          : [...pages.slice(0, -1), addToPage(pages[pages.length - 1])];

      return { ...oldData, pages: updatedPages } as any;
    }

    // 2. Handle Array (lists)
    if (Array.isArray(oldData)) {
      return position === 'start' ? [newItem, ...oldData] : [...oldData, newItem];
    }

    return oldData;
  });
}
