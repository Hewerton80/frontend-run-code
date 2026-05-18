# router-feature-layout

## Por que importa

Fluxos multi-step (wizards) frequentemente compartilham estado via Context entre 2 ou
mais páginas. Se esse Provider for montado globalmente (em `RootProviders`), o estado
persiste mesmo após o usuário sair do fluxo — causando dados stale e potencial memory
leak. A solução é um **Feature Layout**: um componente sem `path` que monta o Provider
apenas para as rotas do fluxo.

## Quando criar um Feature Layout

- O fluxo tem **2 ou mais páginas** que compartilham estado via Context
- O estado **não deve persistir** ao sair do fluxo (ex: wizard de aviso de sinistro)
- O Provider usa `useNavigate` ou `useLocation` internamente

## Padrão

```tsx
// AppRouter.tsx

function AvisoLayout() {
  return (
    <AvisoProvider>
      <Outlet />
    </AvisoProvider>
  );
}

// No router — AvisoLayout envolve apenas as rotas do fluxo
{
  element: <AvisoLayout />,
  children: [
    { path: ROUTE_PATTERNS.SINISTRO_AVISO_NOVO,      element: <SuspenseWrapper element={<AvisoChavePage />} /> },
    { path: ROUTE_PATTERNS.SINISTRO_AVISO_DADOS,     element: <SuspenseWrapper element={<AvisosDadosPage />} /> },
    { path: ROUTE_PATTERNS.SINISTRO_AVISO_CONFIRMAR, element: <SuspenseWrapper element={<AvisoConfirmacaoPage />} /> },
  ],
}
```

O `AvisoProvider` é **criado** quando o usuário entra em qualquer rota do fluxo e
**destruído** automaticamente ao sair — sem necessidade de reset manual.

## ❌ Errado

```tsx
// Provider global — estado persiste fora do fluxo
function RootProviders() {
  return (
    <AuthProvider>
      <AvisoProvider>
        {' '}
        {/* ← não deve ficar aqui */}
        <Outlet />
      </AvisoProvider>
    </AuthProvider>
  );
}
```

## ✅ Correto

```tsx
// Provider escopado ao fluxo via Feature Layout
function AvisoLayout() {
  return (
    <AvisoProvider>
      <Outlet />
    </AvisoProvider>
  );
}
```

## Regras

| ✅ Boas práticas                                                     | ❌ Más práticas                                                  |
| -------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Feature Layout sem `path` — é um layout, não uma rota                | Adicionar `path` ao Feature Layout                               |
| Provider escopado apenas às rotas do fluxo                           | Provider de fluxo montado em `RootProviders`                     |
| Páginas do fluxo redirecionam para o início se acessadas diretamente | Confiar que o usuário sempre entra pelo início do fluxo          |
| Feature Layout declarado dentro de `MainLayout` (nível 3)            | Feature Layout declarado no nível raiz, fora de `ProtectedRoute` |

## Proteção de acesso direto às etapas intermediárias

Como o Provider é destruído ao sair do fluxo, páginas intermediárias (ex: `/aviso/dados`)
devem verificar se o estado necessário existe e redirecionar para o início caso contrário.
Essa proteção é implementada **nas páginas**, não no layout.

```tsx
// AvisosDadosPage.tsx
const { chave } = useAviso(); // contexto do AvisoProvider

useEffect(() => {
  if (!chave) navigate(ROUTES.SINISTRO_AVISO_NOVO, { replace: true });
}, [chave]);
```

## Referência no codebase

- [`src/router/AppRouter.tsx`](../../../src/router/AppRouter.tsx) — `AvisoLayout` (linhas 121–127)
- [`src/context/AvisoContext.tsx`](../../../src/context/AvisoContext.tsx)
