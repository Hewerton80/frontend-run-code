# mut-prefer-optimistic-over-refetch: Prefer Optimistic Cache Updates Over Forced Refetches

## Priority: HIGH

## Explanation

After a mutation, the instinct is often to call `forceRefetch*` or `invalidateQueries` to sync the UI. But this fires an extra HTTP round-trip that is usually unnecessary — the server already confirmed the change, and you already have the new data in hand.

Prefer updating the cache directly (`updateEntityInCache` / `setItemInCache`) inside `onSuccess`. Only resort to `invalidateQueries` / forced refetch when:

- The server response contains derived or computed fields you can't reconstruct client-side.
- The mutation affects a list with server-side sorting/filtering that you cannot replicate locally.
- You genuinely need a fresh copy of the whole collection (e.g. after a bulk operation).

This keeps the UI instant, avoids loading spinners for data the client already knows, and reduces unnecessary server load.

## Bad Example

```ts
// ❌ Invalidating everything after a simple status update
const { mutate: updateStatus } = useMutation({
  mutationFn: ({ id, status }) => apiBase.put(`/coupon/${id}`, { status }),
  onSuccess: () => {
    // Forces a full list refetch even though only one field changed
    forceRefetchCachedCoupons();
  },
});
```

## Good Example

```ts
// ✅ Update only the affected item in cache — no extra HTTP call
const { mutate: updateStatus } = useMutation({
  mutationFn: ({ id, status }) => apiBase.put(`/coupon/${id}`, { status }),
  onSuccess: (_, { id, status }) => {
    updateCouponInCache(id, { status });
    toast.success("Status atualizado com sucesso!");
  },
  onError: (error) => {
    // Show error; cache was never touched, so UI is still consistent
    showAlert({ variant: "danger", description: error.message });
  },
});
```

```ts
// ✅ After an edit, reconstruct the updated object from dirty fields
updateCoupon(
  { id: couponId, ...dirtedFields, status },
  {
    onSuccess: () => {
      updateCouponInCache(couponId!, { ...updatedCoupon, status });
      onSuccess();
    },
    onError,
  },
);

// ✅ Forced refetch only when the list order/filter may have changed server-side
createCoupon(body, {
  onSuccess: () => {
    forceRefetchCachedCoupons(); // new item → server determines position in the list
  },
});
```

## Context

- `updateEntityInCache` (a pure function calling `setItemInCache`) is the standard pattern for single-item updates in this project.
- `forceRefetchCached<Entidade>` calls `queryClient.invalidateQueries` and should be reserved for list-level changes (create, delete, bulk ops).
- Never call both — updating the cache and invalidating the list for the same single-item mutation is redundant.
