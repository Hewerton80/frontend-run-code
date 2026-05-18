# arch-no-tanstack-in-components: Never Import TanStack Query Directly in Components or Pages

## Priority: CRITICAL

## Explanation

Components and pages (`.tsx`/`.jsx`) must never import anything from `@tanstack/react-query` directly. They should not know which library is being used for data fetching, caching or server state. All TanStack Query logic (`useQuery`, `useMutation`, `useQueryClient`, etc.) must live inside dedicated custom hooks within `hooks/`, and components import only those hooks.

This enforces a clean separation between UI and data-fetching concerns, makes components easier to test (you mock one hook, not the whole library), and allows swapping the underlying data-fetching strategy without touching any component.

## Bad Example

```tsx
// ❌ CouponsPage.tsx — component importing directly from the library
import { useQuery } from "@tanstack/react-query";
import { CoupomQueryKeys } from "@/modules/coupon/types/CouponQueryKeys";

export function CouponsPage() {
  const { data, isFetching } = useQuery({
    queryKey: [CoupomQueryKeys.Coupons],
    queryFn: fetchCoupons,
  });

  return <CouponList data={data} />;
}
```

```tsx
// ❌ CouponRow.tsx — component using useQueryClient directly
import { useQueryClient } from "@tanstack/react-query";

export function CouponRow({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const coupon = queryClient.getQueryData([...]);
  // ...
}
```

## Good Example

```tsx
// ✅ hooks/useFetchCoupons.ts — all TanStack Query logic stays here
import { useQuery } from "@tanstack/react-query";

export function useFetchCoupons(params: IFetchCouponQueryParams) {
  const { data: couponsRecords, isFetching: isFetchingCoupons } = useQuery({
    queryKey: [CoupomQueryKeys.Coupons, params],
    queryFn: () => fetchCoupons(params),
  });
  return { couponsRecords, isFetchingCoupons };
}

// ✅ CouponsPage.tsx — imports only the custom hook
import { useFetchCoupons } from "@/modules/coupon/hooks/useFetchCoupons";

export function CouponsPage() {
  const { couponsRecords, isFetchingCoupons } = useFetchCoupons(params);
  return <CouponList data={couponsRecords} />;
}
```

```tsx
// ✅ hooks/useGetCouponFromCache.ts — cache reads encapsulated in a hook
import { useQuery } from "@tanstack/react-query";

export const useGetCouponFromCache = (id: string) => {
  const { data: coupon } = useQuery({
    queryKey: [CoupomQueryKeys.Coupon, id],
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return { coupon: coupon as ICoupon };
};

// ✅ CouponRow.tsx — imports only the custom hook
import { useGetCouponFromCache } from "../../hooks/useGetCouponFromCache";

export const CouponRow = memo(({ id }: CouponRowProps) => {
  const { coupon } = useGetCouponFromCache(id);
  return <Table.Row>...</Table.Row>;
});
```

## Context

- Apply everywhere: every component, page, and layout file.
- The **only** files that may import from `@tanstack/react-query` are files inside `hooks/` directories and pure utility functions inside `utils/tanstakQueryHelpers/`.
- If you find yourself needing `useQueryClient` in a component to imperatively do something, extract that logic into a custom hook first.
