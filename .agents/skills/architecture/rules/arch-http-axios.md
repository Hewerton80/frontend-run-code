# arch-http-axios: Comunicação HTTP com `useBaseApi`

## Prioridade: HIGH

## Explicação

Nunca instancie o Axios diretamente nos módulos. Use sempre o hook `useBaseApi()` para
obter a instância `apiBase`, que já injeta o Bearer token automaticamente em cada requisição.

## Uso Correto

```ts
// ✅ Dentro de um hook de dados do módulo
import { useBaseApi } from '@/hooks/useBaseApi';

export function useFetchCoupons(params: IFetchCouponQueryParams) {
  const { apiBase } = useBaseApi();

  return useQuery({
    queryKey: [CoupomQueryKeys.Coupons, params],
    queryFn: async () => {
      const { data } = await apiBase.get<ICouponResponse>('/coupon/params', {
        params,
      });
      return data;
    },
  });
}
```

## Uso Incorreto

```ts
// ❌ Instância direta — sem token, sem interceptors do projeto
import axios from 'axios';

const response = await axios.get('/coupon/params');

// ❌ Importar apiBase de outro lugar que não seja useBaseApi
import { apiBase } from '@/lib/axios';
```

## Contexto

- `useBaseApi` está em `src/hooks/utils/useBaseApi.ts`.
- O hook injeta o token do Zustand store de autenticação via interceptor — sem ele,
  as requisições autenticadas falham.
- Para funções em `utils/` (que são puras, sem hooks), use o `queryClient` de
  `src/utils/tanstakQueryHelpers/queryClient` — não instancie axios.
