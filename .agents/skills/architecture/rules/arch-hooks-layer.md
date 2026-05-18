# arch-hooks-layer: Convenções da Camada `hooks/` de um Módulo

## Prioridade: CRITICAL

## Explicação

Os hooks de dados de um módulo seguem padrões distintos por responsabilidade.
Cada tipo de hook tem um nome, uma estrutura e comportamentos esperados.

---

## 1. Hook de Lista Paginada — `useFetch<Entidade>s`

- Recebe `params` tipados como argumento.
- Normaliza os params com `useMemo` (ver `arch-url-params`).
- No `queryFn`, após buscar, itera sobre `response.data` e chama `setItemInCache`
  para semear o cache individual de cada item (padrão `perf-id-only-list-items`).
- Retorna dados renomeados descritivamente (`data` → `couponsRecords`).
- `retry: 0`.

```ts
// ✅ hooks/useFetchCoupons.ts
export function useFetchCoupons(params: IFetchCouponQueryParams) {
  const handledParams = useMemo(() => handleCouponsParams(params), [params]);

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [CoupomQueryKeys.Coupons, handledParams],
    queryFn: async () => {
      const { data: response } = await apiBase.get<ICouponResponse>(
        "/coupon/params",
        {
          params: { ...handledParams, limit: 25 },
        },
      );
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

---

## 2. Hook de Item por ID — `useFetch<Entidade>ById`

- `enabled: !!id` — não executa sem ID.
- Aplica **cache-first**: usa `getItemFromQueryCache` como `initialData` para exibir
  o dado instantaneamente enquanto o fetch ocorre em background.
- `staleTime: Infinity` e `gcTime: Infinity` no item individual.

```ts
// ✅ hooks/useFetchCouponById.ts
export function useFetchCouponById(id?: string) {
  const {
    data: coupon,
    isFetching,
    error,
  } = useQuery({
    queryKey: [CoupomQueryKeys.Coupon, id],
    queryFn: () => apiBase.get<ICoupon>(`/coupon/${id}`).then((r) => r.data),
    initialData: () =>
      getItemFromQueryCache<ICoupon>([CoupomQueryKeys.Coupon, id]),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return { coupon, isFetchingCoupon: isFetching, couponError: error };
}
```

---

## 3. Hook de Leitura de Cache — `useGet<Entidade>FromCache`

- Não faz HTTP: `queryFn: () => null`.
- `staleTime: Infinity` e `gcTime: Infinity` — o dado é semeado externamente.
- Usado em componentes de linha de lista que recebem apenas o `id` como prop.

```ts
// ✅ hooks/useGetCouponFromCache.ts
export function useGetCouponFromCache(id: string) {
  const { data: coupon } = useQuery<ICoupon>({
    queryKey: [CoupomQueryKeys.Coupon, id],
    queryFn: () => null as unknown as ICoupon,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return { coupon };
}
```

---

## 4. Hooks de Mutação — `useCreate<Entidade>` / `useUpdate<Entidade>`

- Cada arquivo exporta **uma** mutation.
- Usam `retry: 0`.
- Não invalidam queries: a invalidação/atualização de cache é responsabilidade
  do `onSuccess` no hook local do componente (ver `submit-handler-pattern`).

```ts
// ✅ hooks/useUpdateCoupon.ts
export function useUpdateCoupon() {
  const { mutate: updateCoupon, isPending } = useMutation({
    mutationFn: ({ id, ...body }: Partial<ICoupomBody> & { id?: string }) =>
      apiBase.put(`/coupon/${id}`, body),
    retry: 0,
  });
  return { updateCoupon, isUpdatingCoupon: isPending };
}
```

---

## 5. Função de Atualização de Cache — `update<Entidade>InCache`

- É uma **função pura**, não um hook.
- Fica em `utils/update<Entidade>InCache.ts`, não em `hooks/`.
- Chama `setItemInCache` com updater function para atualização otimista.

```ts
// ✅ utils/updateCouponInCache.ts
export function updateCouponInCache(
  id: string,
  updatedFields: Partial<ICoupon>,
) {
  setItemInCache<ICoupon>([CoupomQueryKeys.Coupon, id], (old) => ({
    ...old!,
    ...updatedFields,
  }));
}
```

## Contexto

- `setItemInCache` e `getItemFromQueryCache` estão em `src/utils/tanstakQueryHelpers/`.
- Componentes nunca importam de `@tanstack/react-query` diretamente — sempre via hook
  personalizado (ver regra `arch-no-tanstack-in-components` da skill `tanstack-query-best-practices`).
