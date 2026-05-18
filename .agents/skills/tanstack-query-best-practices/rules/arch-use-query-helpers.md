# arch-use-query-helpers: Never Use queryClient Directly Outside tanstakQueryHelpers

## Priority: CRITICAL

## Explanation

`queryClient` must never be imported or used directly outside of `src/utils/tanstakQueryHelpers/`. All cache interactions go through the helper functions in that folder. If none of them cover a new use case, **create a new helper there** instead of reaching for `queryClient` elsewhere.

This keeps all cache manipulation in one place, makes it easy to audit, test, and change the underlying implementation without touching module or component code.

## Available Helpers

| Helper                       | queryClient method wrapped | When to use                                     |
| ---------------------------- | -------------------------- | ----------------------------------------------- |
| `setItemInCache`             | `setQueryData`             | Update or set a single cached item              |
| `addItemInQueryCache`        | `setQueriesData`           | Add an item to a list/infinite cache            |
| `deleteItemInQueryCache`     | `setQueriesData`           | Remove an item from a list/infinite cache       |
| `getItemFromQueryCache`      | `getQueryData`             | Read a single cached item by exact key          |
| `getItemsFromQueryCache`     | `getQueriesData`           | Read a list from cache by key prefix            |
| `findItemInQueryCache`       | `getQueriesData`           | Find one item inside a cached list              |
| `getStateItemFromQueryCache` | `getQueryState`            | Read the full query state (status, error, etc.) |
| `hasQueryCache`              | `getQueriesData`           | Check if any cache exists for a key prefix      |

> `forceRefetchCached<Entidade>` functions in `modules/*/utils/` also wrap `queryClient.invalidateQueries` — use them for list invalidation instead of calling `invalidateQueries` directly.

## Bad Example

```ts
// ❌ Importing queryClient directly in a module hook
import { queryClient } from "@/utils/tanstakQueryHelpers/queryClient";

export const useUpdateStatusCoupon = (id: string) => {
  const update = () => {
    // Direct usage outside of the helpers folder
    queryClient.setQueryData([CoupomQueryKeys.Coupon, id], (old) => ({
      ...old,
      status: "Inativo",
    }));
    queryClient.invalidateQueries({ queryKey: [CoupomQueryKeys.Coupons] });
  };
};
```

## Good Example

```ts
// ✅ Use existing helpers — no direct queryClient import needed
import { setItemInCache } from "@/utils/tanstakQueryHelpers/setItemInCache";
import { forceRefetchCachedCoupons } from "../utils/forceRefetchCachedCoupons";

export const updateCouponInCache = (id: string, newData: Partial<ICoupon>) => {
  setItemInCache<ICoupon>([CoupomQueryKeys.Coupon, id], (old) => {
    if (!old) return old;
    return { ...old, ...newData };
  });
};

// And in the hook:
updateCouponInCache(id, { status: "Inativo" });
forceRefetchCachedCoupons(); // only if the list needs refresh
```

## When you need something not covered by existing helpers

Create a new file in `src/utils/tanstakQueryHelpers/` following the same pattern:

```ts
// src/utils/tanstakQueryHelpers/invalidateQueriesByPrefix.ts
import { QueryKey } from "@tanstack/react-query";
import { queryClient } from "@/utils/tanstakQueryHelpers/queryClient";

export function invalidateQueriesByPrefix(queryKeyPrefix: QueryKey) {
  queryClient.invalidateQueries({ queryKey: queryKeyPrefix, exact: false });
}
```

Then import that helper wherever needed — never `queryClient` itself.

## Context

- The only file allowed to export `queryClient` is `queryClient.ts` itself.
- All other files in `tanstakQueryHelpers/` import `queryClient` internally and expose a focused, typed API.
- Module-level `forceRefetchCached<Entidade>.ts` files are the correct abstraction for invalidation — they call `queryClient.invalidateQueries` through their own wrapper and should not be bypassed.
