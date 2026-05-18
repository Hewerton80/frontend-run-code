# qk-enum-or-factory: Always Use Enums or Factory Functions for Query Keys, Never Plain Strings

## Priority: CRITICAL

## Explanation

Query key values must never be written as raw/magic strings inline. Plain strings scattered across the codebase are impossible to refactor safely — a typo or rename in one place silently breaks cache invalidation in another. Instead, always use:

- **Enums** — for simple, static keys (preferred in this project)
- **Factory functions** — for keys that derive from parameters (e.g. `entityKeys.detail(id)`)

This guarantees a single source of truth for every key, catches mismatches at compile time via TypeScript, and makes global invalidations or refactors trivially safe.

## Bad Example

```ts
// ❌ Raw strings — fragile, no compile-time safety, easy to typo
const { data } = useQuery({
  queryKey: ["todos", "list"],
  queryFn: fetchTodos,
});

queryClient.invalidateQueries({ queryKey: ["todo", id] }); // "todo" vs "todos"?
```

## Good Example — Enum (used in this project)

```ts
// ✅ Enum defined once in types/<Entidade>QueryKeys.ts
export enum CoupomQueryKeys {
  Coupons = "coupons",
  Coupon = "coupon",
}

// ✅ Used everywhere via the enum
const { data } = useQuery({
  queryKey: [CoupomQueryKeys.Coupons, handledParams],
  queryFn: () => fetchCoupons(handledParams),
});

queryClient.invalidateQueries({ queryKey: [CoupomQueryKeys.Coupons] });
```

## Good Example — Factory Function (alternative for complex modules)

```ts
// ✅ Factory defined once
export const todoKeys = {
  all: () => ["todos"] as const,
  lists: () => [...todoKeys.all(), "list"] as const,
  detail: (id: string) => [...todoKeys.all(), "detail", id] as const,
};

// ✅ Used via factory
const { data } = useQuery({
  queryKey: todoKeys.detail(id),
  queryFn: () => fetchTodo(id),
});
```

## Context

- In this project the **enum pattern** (`<Entidade>QueryKeys.ts`) is the standard; factory functions are acceptable for modules with deeply nested / parameterized keys.
- Enum files live at `modules/<nome>/types/<Entidade>QueryKeys.ts`.
- Never mix: if a module already has an enum, don't introduce raw strings alongside it.
