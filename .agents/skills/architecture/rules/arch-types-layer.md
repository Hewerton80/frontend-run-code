# arch-types-layer: Padrão da Camada `types/` de um Módulo

## Prioridade: CRITICAL

## Explicação

Cada módulo tem dois arquivos de tipos obrigatórios: a interface principal da entidade
(com seus enums) e o arquivo de query keys. Seguir esse padrão garante que tipos e
constantes de cache nunca fiquem espalhados no código.

## `types/<Entidade>.ts`

- Prefixo `I` para interfaces: `ICoupon`, `IBanner`, `IEvent`.
- **Enums** para status, tipos e categorias — nunca strings avulsas no código.
- Exporte tipos auxiliares que derivam da entidade.

```ts
// ✅ domains/coupon/types/Coupon.ts
export enum CoupomStatus {
  Todos = 'Todos',
  Ativo = 'Ativo',
  Inativo = 'Inativo',
}

export enum CoupomSalesType {
  Almoco = 'Almoço',
  Jantar = 'Jantar',
}

export interface ICoupon {
  id: string;
  status: CoupomStatus;
  type_of_sale: CoupomSalesType | null;
  isSuperPromo: boolean;
  superPromoInitDate: string | null;
  superPromoFinalDate: string | null;
  // ...
}

// Tipo auxiliar derivado
export type ICoupomBody = Omit<ICoupon, 'id' | 'userStore'> & {
  user_store_id: string;
};
```

## `types/<Entidade>QueryKeys.ts`

- **Sempre** use um enum dedicado — nunca strings avulsas como `['coupons']`.
- Se o módulo tiver múltiplas entidades relacionadas, todas as query keys ficam
  neste mesmo arquivo (ex: `CoupomQueryKeys` e `CheckinQueryKeys` juntos em `coupon`).

```ts
// ✅ domains/coupon/types/CouponQueryKeys.ts
export enum CoupomQueryKeys {
  Coupons = 'coupons', // chave da lista paginada
  Coupon = 'coupon', // chave do item individual
}

export enum CheckinQueryKeys {
  Checkins = 'checkins',
}
```

## Exemplo Incorreto

```ts
// ❌ String avulsa no queryKey — difícil de rastrear e refatorar
useQuery({ queryKey: ['coupons', params], queryFn: fetchCoupons })

// ❌ Status como string literal — sem autocomplete, sem type safety
if (coupon.status === 'ativo') { ... }
```

## Contexto

- Tipos globais compartilhados por 2+ módulos vão em `src/types/`, não dentro de um módulo.
- Enums de status devem incluir uma opção "Todos" quando usados em filtros de listagem.
