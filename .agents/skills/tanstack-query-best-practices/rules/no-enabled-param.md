# no-enabled-param: Never Accept a Generic `enabled` Parameter in TanStack Query Hooks

## Priority: CRITICAL

## Explanation

TanStack Query hooks must **never** accept a generic `enabled: boolean` parameter. Accepting `enabled` as an argument leaks the activation decision to the caller, which means the hook has no control over when it fires — and callers end up duplicating the same guard logic everywhere they use the hook.

Instead, the hook itself must **derive** its own `enabled` condition from its domain-specific arguments. The natural values of those arguments (e.g. `0`, `null`, an empty object) already express "not ready yet" — no extra boolean is needed.

This keeps the activation logic in one place (inside the hook), makes call sites simpler, and prevents callers from accidentally enabling a query before its required data is available.

## Bad Example

```ts
// ❌ Hook accepts a generic enabled flag — caller controls activation
export function useCausasByRamo(ramo: number, enabled = true) {
  return useQuery({
    queryKey: causasQueryKeys.byRamo(ramo),
    queryFn: () => getCausasByRamo(ramo),
    enabled: enabled && ramo > 0, // mixed responsibility
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

// ❌ Caller must know and repeat the guard condition
const { data } = useCausasByRamo(codRamo, codRamo > 0);
```

## Good Example

```ts
// ✅ Hook derives enabled from its own argument — no boolean param
export function useCausasByRamo(ramo: number) {
  return useQuery({
    queryKey: causasQueryKeys.byRamo(ramo),
    queryFn: () => getCausasByRamo(ramo),
    enabled: ramo > 0, // derived internally
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

// ✅ Caller just passes the value — hook decides when to fire
const { data } = useCausasByRamo(codRamo);
```

## Derivation Patterns by Argument Type

| Argument type          | Derived `enabled` condition                                |
| ---------------------- | ---------------------------------------------------------- |
| `number`               | `arg > 0`                                                  |
| `number \| null`       | `arg !== null && arg > 0`                                  |
| `string`               | `arg.length > 0` or `!!arg`                                |
| `string \| null`       | `arg !== null && arg.length > 0`                           |
| `object` (params)      | check every required field: `params.a > 0 && params.b > 0` |
| No meaningful argument | omit `enabled` entirely (always enabled)                   |

## Context

- When an argument is `number | null` and `enabled` guards against `null`, it is safe to use the non-null assertion (`arg!`) inside `queryFn` — the function will never execute when `arg` is `null`.
- Hooks that take no data-dependent arguments (e.g. `useInfiniteFontes()`) should simply omit the `enabled` option — they are always enabled.
- This rule applies to `useQuery`, `useInfiniteQuery`, and any other TanStack Query hook wrapper in this project.
- All existing hooks in `src/domains/sinistros/hooks/` follow this pattern and serve as canonical references.
