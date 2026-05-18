# arch-granular-hook-files: One TanStack Query Hook Per File

## Priority: CRITICAL

## Explanation

Each TanStack Query hook (`useQuery`, `useInfiniteQuery`, `useMutation`) must live in its **own dedicated file**. Grouping multiple hooks in a single file (e.g. `useReclamante.ts` containing `useGetReclamante`, `useCreateReclamante` and `useUpdateReclamante`) creates several problems:

- **Coupling** — unrelated concerns (fetch, create, update, delete) share a module boundary with no reason to
- **Bundle size** — importing any one hook pulls in all others, even if unused
- **Discoverability** — developers must open the file and scan it to know what hooks exist
- **Merge conflicts** — multiple developers touching different hooks in the same file collide

One hook per file makes the dependency graph explicit, keeps files small and focused, and lets tree-shaking eliminate unused hooks.

## Naming Convention

| Operation         | File name                      | Hook name                   |
| ----------------- | ------------------------------ | --------------------------- |
| Fetch (query)     | `useFetch<Entity>.ts`          | `useFetch<Entity>`          |
| Fetch infinite    | `useFetchInfinite<Entity>.ts`  | `useFetchInfinite<Entity>`  |
| Fetch by param    | `useFetch<Entity>By<Param>.ts` | `useFetch<Entity>By<Param>` |
| Create (mutation) | `useCreate<Entity>.ts`         | `useCreate<Entity>`         |
| Update (mutation) | `useUpdate<Entity>.ts`         | `useUpdate<Entity>`         |
| Delete (mutation) | `useDelete<Entity>.ts`         | `useDelete<Entity>`         |

> Query hooks use the `useFetch` prefix (not `useGet`) to distinguish them from plain getters and make the TanStack Query dependency explicit in the name.

## Bad Example

```ts
// ❌ useReclamante.ts — three unrelated hooks in one file
export function useGetReclamante(params: GetReclamanteParams) {
  return useQuery({ ... });
}

export function useCreateReclamante() {
  return useMutation({ ... });
}

export function useUpdateReclamante() {
  return useMutation({ ... });
}
```

## Good Example

```
hooks/
  useFetchReclamante.ts      ← useQuery
  useCreateReclamante.ts     ← useMutation (create)
  useUpdateReclamante.ts     ← useMutation (update)
```

```ts
// ✅ useFetchReclamante.ts — single focused hook
export function useFetchReclamante(params: GetReclamanteParams) {
  return useQuery({
    queryKey: reclamanteQueryKeys.byProtocolo(params),
    queryFn: () => getReclamante(params),
    enabled: params.codFonte > 0 && params.numProtocolo > 0,
    select: (response) => response.data,
  });
}
```

```ts
// ✅ useCreateReclamante.ts — single focused hook
export function useCreateReclamante() {
  return useMutation({
    mutationFn: (payload: CreateReclamanteRequestDto) => createReclamante(payload),
    onSuccess: () => invalidateQueriesInCache(reclamanteQueryKeys.all),
  });
}
```

```ts
// ✅ useUpdateReclamante.ts — single focused hook
export function useUpdateReclamante() {
  return useMutation({
    mutationFn: (payload: UpdateReclamanteRequestDto) => updateReclamante(payload),
    onSuccess: () => invalidateQueriesInCache(reclamanteQueryKeys.all),
  });
}
```

## Query Key Factory Placement

The query key factory object (`<entity>QueryKeys`) is shared across the fetch hook and any mutation that invalidates it. Place it in the **fetch hook file** (`useFetch<Entity>.ts`) and import it in the mutation files:

```ts
// useFetchReclamante.ts — owns the key factory
export const reclamanteQueryKeys = {
  all: [ReclamanteQueryKeys.All] as const,
  byProtocolo: (params: GetReclamanteParams) =>
    [ReclamanteQueryKeys.All, ReclamanteQueryKeys.ByProtocolo, params] as const,
};

// useCreateReclamante.ts — imports from the fetch hook
import { reclamanteQueryKeys } from './useFetchReclamante';
```

## Context

- The `hooks/index.ts` barrel file must export all hooks so consumers never import from individual files directly.
- This rule applies to every domain in the project, not only `sinistros`.
- When refactoring an existing multi-hook file, move the query key factory to the fetch hook file and update all imports.
- A hook file may contain **one** exported hook function plus its private helpers (e.g. a `select` transformer). It must not export a second hook.
