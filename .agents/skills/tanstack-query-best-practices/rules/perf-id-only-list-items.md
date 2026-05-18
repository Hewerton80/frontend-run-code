# perf-id-only-list-items: Pass Only ID to List Row Components

## Priority: MEDIUM

## Explanation

When rendering a list, pass only the item's `id` to each row component. The row component reads its own data directly from the TanStack Query cache via a dedicated hook. This way, updating a single item in the cache only re-renders that row — not the entire list — because each row subscribes only to its own query key.

If you pass the full object as a prop, the parent list holds the data and must re-render all rows whenever the list query data reference changes (e.g., after a mutation refetch), even if the individual item didn't change.

## Bad Example

```tsx
// ❌ List passes the full object — any cache update re-renders all rows
function CouponsList() {
  const { couponsRecords } = useFetchCoupons(params);

  return (
    <Table>
      {couponsRecords?.data.map((coupon) => (
        <CouponRow key={coupon.id} coupon={coupon} />
      ))}
    </Table>
  );
}

// ❌ Row receives the full object as prop
function CouponRow({ coupon }: { coupon: ICoupon }) {
  return <Table.Row>{coupon.name}</Table.Row>;
}
```

When `couponsRecords` changes (e.g., after any mutation), all `CouponRow` instances re-render even if their individual coupon data is identical.

## Good Example

```tsx
// ✅ Step 1: seed individual item caches while fetching the list
// hooks/useFetchCoupons.ts
import { useQuery } from "@tanstack/react-query";
import { setItemInCache } from "@/utils/tanstackQueryHelpers";

export function useFetchCoupons(params: IFetchCouponQueryParams) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [CoupomQueryKeys.Coupons, params],
    queryFn: async () => {
      const { data: response } = await apiBase.get<ICouponResponse>(
        "/coupon/params",
        { params: { ...params, limit: 25 } },
      );
      // seed each coupon into its own cache entry
      response?.data.forEach((coupon) => {
        setItemInCache<ICoupon>([CoupomQueryKeys.Coupon, coupon.id], coupon);
      });
      return (
        response ?? { data: [], total: 0, limit: 25, page: 1, totalPages: 0 }
      );
    },
    retry: 0,
  });
  return {
    couponsRecords: data,
    isFetchingCoupons: isFetching,
    fetchCouponsError: error,
    refetchCoupons: refetch,
  };
}
```

```tsx
// ✅ Step 2: hook that reads a single item from the cache
// hooks/useGetCouponFromCache.ts
import { useQuery } from "@tanstack/react-query";

export function useGetCouponFromCache(id: string) {
  const { data: coupon } = useQuery<ICoupon>({
    queryKey: [CoupomQueryKeys.Coupon, id],
    queryFn: () => null as unknown as ICoupon, // data is seeded externally — never fetched here
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return { coupon };
}
```

```tsx
// ✅ Step 3: list passes only the id
function CouponsList() {
  const { couponsRecords } = useFetchCoupons(params);

  return (
    <Table>
      {couponsRecords?.data.map((coupon) => (
        <CouponRow key={coupon.id} id={coupon.id} />
      ))}
    </Table>
  );
}
```

```tsx
// ✅ Step 4: row subscribes only to its own cache entry
export const CouponRow = memo(({ id }: { id: string }) => {
  const { coupon } = useGetCouponFromCache(id);

  return (
    <Table.Row>
      <Table.Data>{coupon?.name}</Table.Data>
      <Table.Data>{coupon?.status}</Table.Data>
    </Table.Row>
  );
});
```

Now when a single coupon is updated in the cache (e.g., via `setItemInCache` after a mutation), only the `CouponRow` with the matching `id` re-renders. The parent list and all other rows stay unaffected.

## Context

- Use `setItemInCache` (a `queryClient.setQueryData` wrapper) in the list's `queryFn` to pre-populate each item's individual cache entry.
- The per-item hook uses `staleTime: Infinity` and `gcTime: Infinity` so the data is never automatically refetched or garbage-collected — it lives as long as the list keeps it seeded.
- To update a single item after a mutation, call `setItemInCache([CoupomQueryKeys.Coupon, id], updatedCoupon)` instead of invalidating the whole list. See `mut-prefer-optimistic-over-refetch`.
- Combine with `memo()` on the row component to guard against parent re-renders caused by reference changes in other props (e.g., `isAdmin`).
