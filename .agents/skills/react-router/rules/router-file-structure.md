# router-file-structure

## Por que importa

Toda a configuração de roteamento do projeto vive em `src/router/`. Dispersar arquivos
de rota por outros diretórios fragmenta a configuração e dificulta rastrear quais URLs
existem na aplicação.

## Estrutura canônica

```
src/router/
├── AppRouter.tsx      # createBrowserRouter + todos os layouts internos
├── ProtectedRoute.tsx # Guard de autenticação (Outlet pattern)
└── routes.ts          # Constantes de path — ÚNICA fonte de verdade de URLs
```

### Responsabilidade de cada arquivo

| Arquivo              | Responsabilidade                                                                  |
| -------------------- | --------------------------------------------------------------------------------- |
| `AppRouter.tsx`      | Declara o router com `createBrowserRouter`, define layouts e importa páginas lazy |
| `ProtectedRoute.tsx` | Componente guard: redireciona não-autenticados, exibe spinner durante `isLoading` |
| `routes.ts`          | Exporta `ROUTES` e `ROUTE_PATTERNS` — nenhuma string de path fora daqui           |

## Hierarquia de layouts em `AppRouter.tsx`

O router usa 4 níveis de aninhamento:

```
RootProviders          ← providers que precisam de hooks do router
  └── ProtectedRoute   ← guard de autenticação
        └── MainLayout ← shell visual compartilhado (Header + Footer)
              └── [FeatureLayout?] ← provider escopado a um fluxo (opcional)
                    └── Page       ← página lazy-loaded
```

## ❌ Errado

```
src/
├── router/
│   └── AppRouter.tsx
├── domains/sinistros/
│   └── routes.tsx   ← rotas declaradas dentro do domínio
└── pages/
    └── authRoutes.ts ← constantes de path espalhadas
```

## ✅ Correto

```
src/
├── router/
│   ├── AppRouter.tsx      ← única declaração de rotas
│   ├── ProtectedRoute.tsx
│   └── routes.ts          ← únicas constantes de path
└── domains/sinistros/
    └── pages/             ← apenas os componentes de página
```

## Referência no codebase

- [`src/router/AppRouter.tsx`](../../../src/router/AppRouter.tsx)
- [`src/router/ProtectedRoute.tsx`](../../../src/router/ProtectedRoute.tsx)
- [`src/router/routes.ts`](../../../src/router/routes.ts)
