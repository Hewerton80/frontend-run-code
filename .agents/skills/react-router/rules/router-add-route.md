# router-add-route

## Por que importa

Adicionar uma rota envolve sempre 3 arquivos em sequência. Pular qualquer passo resulta
em erros em runtime (rota sem path declarado), navegação quebrada (constante ausente) ou
bundle inflado (import direto sem lazy).

## Checklist — sequência obrigatória

### 1. `routes.ts` — adicione as constantes

Adicione em **ambos** os objetos, mantendo-os sincronizados:

```ts
// ROUTES — para navegação
export const ROUTES = {
  // ...
  MINHA_ENTIDADE: '/minha-entidade',
  MINHA_ENTIDADE_DETAIL: (id: string | number) => `/minha-entidade/${id}`,
} as const;

// ROUTE_PATTERNS — para declaração no router
export const ROUTE_PATTERNS = {
  // ...
  MINHA_ENTIDADE: '/minha-entidade',
  MINHA_ENTIDADE_DETAIL: '/minha-entidade/:id',
};
```

### 2. `AppRouter.tsx` — import lazy + rota

**2a.** Adicione o import lazy agrupado por domínio:

```tsx
// ── MinhaEntidade ──────────────────────────────────────────────────────────
const MinhaEntidadeListPage = lazy(
  () => import('../domains/minha-entidade/pages/MinhaEntidadeListPage')
);
const MinhaEntidadeDetailPage = lazy(
  () => import('../domains/minha-entidade/pages/MinhaEntidadeDetailPage')
);
```

**2b.** Adicione a rota no nível correto da hierarquia:

```tsx
// Dentro de MainLayout > children:
{ path: ROUTE_PATTERNS.MINHA_ENTIDADE,        element: <SuspenseWrapper element={<MinhaEntidadeListPage />} /> },
{ path: ROUTE_PATTERNS.MINHA_ENTIDADE_DETAIL, element: <SuspenseWrapper element={<MinhaEntidadeDetailPage />} /> },
```

### 3. Arquivo da página — crie o componente

```
src/domains/minha-entidade/pages/MinhaEntidadeListPage.tsx
src/domains/minha-entidade/pages/MinhaEntidadeDetailPage.tsx
```

Exporte como `default`:

```tsx
export default function MinhaEntidadeListPage() {
  return <div>...</div>;
}
```

## Verificação final

- [ ] A rota está dentro de `<ProtectedRoute>` se exigir autenticação?
- [ ] A rota está fora de `<ProtectedRoute>` se for pública (ex: login)?
- [ ] O import usa `React.lazy()` e o elemento usa `<SuspenseWrapper>`?
- [ ] `ROUTES` e `ROUTE_PATTERNS` estão sincronizados?
- [ ] A página exporta `default`?

## Rota pública (sem autenticação)

Declare fora do bloco `<ProtectedRoute>`, diretamente como filho de `RootProviders`:

```tsx
// ✅ Rota pública
{
  path: ROUTE_PATTERNS.LOGIN,
  element: <SuspenseWrapper element={<LoginPage />} />,
  errorElement: <SuspenseWrapper element={<ErrorPage />} />,
},

// ✅ Rotas protegidas
{
  element: <ProtectedRoute />,
  children: [
    { element: <MainLayout />, children: [ /* ... */ ] },
  ],
},
```

## Rota dentro de um fluxo escopado

Se a nova rota faz parte de um fluxo multi-step com Provider local, adicione-a dentro
do Feature Layout correspondente (ver `router-feature-layout.md`).

## Referência no codebase

- [`src/router/routes.ts`](../../../src/router/routes.ts)
- [`src/router/AppRouter.tsx`](../../../src/router/AppRouter.tsx)
