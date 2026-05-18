# router-protected-route

## Por que importa

O `ProtectedRoute` é o guard de autenticação da aplicação. Sem tratar corretamente o
estado `isLoading`, o usuário vê um flash de redirect para o login antes mesmo da sessão
ser restaurada do localStorage. Sem preservar a URL original, o usuário perde o contexto
de onde estava tentando acessar.

## Comportamento esperado

1. **`isLoading = true`** → exibe spinner full-page (sessão ainda sendo restaurada)
2. **`isAuthenticated = false`** → redireciona para `/login` preservando a URL em `state.from`
3. **`isAuthenticated = true`** → renderiza `<Outlet />` (rotas filhas)

## ❌ Errado

```tsx
function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // ← ignora isLoading

  if (!isAuthenticated) {
    // Flash de redirect antes da sessão ser restaurada
    return <Navigate to="/login" />; // ← string inline + sem state.from + sem replace
  }

  return <Outlet />;
}
```

## ✅ Correto

```tsx
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Aguarda restauração da sessão antes de decidir o redirect
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserva a URL tentada em state.from para redirect pós-login
    // replace evita poluir o histórico com entradas de redirect
    return <Navigate to={ROUTE_PATTERNS.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
```

## Regras

| ✅ Boas práticas                                                | ❌ Más práticas                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------- |
| Tratar `isLoading` antes de qualquer decisão de redirect        | Redirecionar imediatamente sem aguardar restauração da sessão |
| Passar `state={{ from: location }}` no redirect de autenticação | Perder a URL original e sempre redirecionar para `/`          |
| Usar `replace` no `<Navigate>` de autenticação                  | Omitir `replace` e poluir o histórico do browser              |
| Usar `ROUTE_PATTERNS.LOGIN` em vez de string inline             | `<Navigate to="/login" />` — string inline                    |
| Renderizar `<Outlet />` para as rotas filhas                    | Renderizar componentes filhos diretamente                     |

## Como usar `state.from` na página de login

```tsx
// LoginPage.tsx
const location = useLocation();
const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.HOME;

// Após login bem-sucedido:
navigate(from, { replace: true });
```

## Referência no codebase

- [`src/router/ProtectedRoute.tsx`](../../../src/router/ProtectedRoute.tsx)
- [`src/hooks/useAuth.ts`](../../../src/hooks/useAuth.ts)
