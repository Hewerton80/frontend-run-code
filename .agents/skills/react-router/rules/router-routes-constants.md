# router-routes-constants

## Por que importa

Strings de path espalhadas pelo código são frágeis: um typo silencioso quebra a
navegação, e renomear uma rota exige busca global. O arquivo `routes.ts` é a **única
fonte de verdade** de todas as URLs da aplicação.

## Dois objetos, dois propósitos

### `ROUTES` — para navegação e links

Use em `navigate()`, `<Link to>`, `<Navigate to>`. Rotas com parâmetro dinâmico são
**funções** que recebem o id e retornam a URL completa.

```ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',

  SINISTROS: '/sinistros',
  SINISTRO_NEW: '/sinistros/novo',
  SINISTRO_DETAIL: (id: string | number) => `/sinistros/${id}`,
  SINISTRO_EDIT: (id: string | number) => `/sinistros/${id}/editar`,
  // ...
} as const;
```

### `ROUTE_PATTERNS` — para declaração de rotas no router

Use em `path:` dentro de `createBrowserRouter`. Parâmetros dinâmicos usam a sintaxe
`:param` do React Router.

```ts
export const ROUTE_PATTERNS = {
  HOME: '/',
  LOGIN: '/login',

  SINISTROS: '/sinistros',
  SINISTRO_NEW: '/sinistros/novo',
  SINISTRO_DETAIL: '/sinistros/:id',
  SINISTRO_EDIT: '/sinistros/:id/editar',
  // ...
};
```

## Regras

| ✅ Boas práticas                                                   | ❌ Más práticas                                             |
| ------------------------------------------------------------------ | ----------------------------------------------------------- |
| `navigate(ROUTES.SINISTROS)`                                       | `navigate('/sinistros')` — string inline                    |
| `ROUTES.SINISTRO_DETAIL(id)` para rotas com parâmetro              | `` `/sinistros/${id}` `` — concatenação manual              |
| `path: ROUTE_PATTERNS.SINISTRO_DETAIL` no router                   | `path: ROUTES.SINISTRO_DETAIL` — função não é string válida |
| Manter `ROUTES` e `ROUTE_PATTERNS` sincronizados ao adicionar rota | Criar um terceiro objeto de rotas em outro arquivo          |
| Comentário de seção para cada grupo de domínio                     | Misturar rotas de domínios sem separadores visuais          |

## ❌ Errado

```tsx
// Strings inline — frágil e difícil de refatorar
navigate('/sinistros');
<Link to={`/sinistros/${id}`}>Detalhe</Link>

// ROUTES com função usada em path: — erro em runtime
{ path: ROUTES.SINISTRO_DETAIL, element: <...> }
```

## ✅ Correto

```tsx
import { ROUTES, ROUTE_PATTERNS } from '@/router/routes';

// Navegação
navigate(ROUTES.SINISTROS);
navigate(ROUTES.SINISTRO_DETAIL(id));

// Link
<Link to={ROUTES.SINISTRO_DETAIL(id)}>Detalhe</Link>

// Declaração de rota
{ path: ROUTE_PATTERNS.SINISTRO_DETAIL, element: <SuspenseWrapper element={<SinistroDetailPage />} /> }
```

## Referência no codebase

- [`src/router/routes.ts`](../../../src/router/routes.ts)
