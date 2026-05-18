# arch-utils-layer: Convenções da Camada `utils/` de um Módulo

## Prioridade: HIGH

## Explicação

A pasta `utils/` de um módulo contém funções **puras** (não hooks) específicas do domínio.
Três tipos são recorrentes em todos os módulos com listagem.

---

## 1. `handle<Entidade>Params.ts` — Normalização de Parâmetros

Função pura que transforma os parâmetros brutos vindos da URL (Nuqs) para o formato
aceito pela API. Responsabilidades:

- Remover chaves vazias com `removeEmptyKeys`
- Fazer casts necessários (string → number, etc.)
- Tratar o valor "Todos" de enums de filtro (converter para `undefined`)

```ts
// ✅ utils/handleCouponsParams.ts
import { removeEmptyKeys } from "@/utils/removeEmptyKeys";
import { IFetchCouponQueryParams } from "../hooks/useFetchCoupons";
import { CoupomStatus } from "../types/Coupon";

export function handleCouponsParams(params: IFetchCouponQueryParams) {
  return removeEmptyKeys({
    ...params,
    // "Todos" não é um filtro real — remove da requisição
    status: params.status === CoupomStatus.Todos ? undefined : params.status,
    page: params.page ? Number(params.page) : undefined,
  });
}
```

---

## 2. `forceRefetchCached<Entidade>.ts` — Invalidação da Lista

Função pura que invalida a query da lista inteira. Usada **apenas no `onSuccess` de criação**
de uma entidade nova, quando a lista precisa ser recarregada do servidor.

```ts
// ✅ utils/forceRefetchCachedCoupons.ts
import { queryClient } from "@/utils/tanstakQueryHelpers/queryClient";
import { CoupomQueryKeys } from "../types/CouponQueryKeys";

export function forceRefetchCachedCoupons() {
  queryClient.invalidateQueries({
    queryKey: [CoupomQueryKeys.Coupons],
    exact: false, // invalida todas as variações de params da lista
  });
}
```

---

## 3. `update<Entidade>InCache.ts` — Atualização Otimista

Atualiza um item individual no cache sem refetch. Usado no `onSuccess` de edição.

```ts
// ✅ utils/updateCouponInCache.ts
import { setItemInCache } from "@/utils/tanstakQueryHelpers/setItemInCache";
import { ICoupon } from "../types/Coupon";
import { CoupomQueryKeys } from "../types/CouponQueryKeys";

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

## Quando Usar Cada Um

| Operação         | Função chamada no `onSuccess`              |
| ---------------- | ------------------------------------------ |
| Criar entidade   | `forceRefetchCached<Entidade>()`           |
| Editar entidade  | `update<Entidade>InCache(id, dirtyFields)` |
| Deletar entidade | `forceRefetchCached<Entidade>()`           |

## Contexto

- `removeEmptyKeys` está em `src/utils/removeEmptyKeys.ts`.
- `setItemInCache` e `queryClient` estão em `src/utils/tanstakQueryHelpers/`.
- Funções em `utils/` são puras — sem hooks, sem estado. Se precisar de `useQueryClient`,
  o código pertence a `hooks/`, não a `utils/`.
