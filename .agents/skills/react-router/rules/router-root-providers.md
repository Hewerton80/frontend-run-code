# router-root-providers

## Por que importa

Providers que chamam hooks do React Router (`useNavigate`, `useLocation`, `useParams`)
precisam estar **dentro** do contexto do router. Se montados fora de `<RouterProvider>`,
o React lança um erro em runtime:

> `useNavigate() may be used only in the context of a <Router> component.`

## Solução: `RootProviders` como layout raiz

Crie um componente de layout sem `path` que monta os providers e renderiza `<Outlet />`.
Declare-o como o elemento raiz do `createBrowserRouter`:

```tsx
function RootProviders() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <SinistroModalProvider>
          <Outlet />
        </SinistroModalProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootProviders />, // ← providers dentro do router
    errorElement: <SuspenseWrapper element={<ErrorPage />} />,
    children: [
      // ... todas as rotas
    ],
  },
]);
```

## ❌ Errado

```tsx
// App.tsx — AuthProvider fora do router, sem acesso a useNavigate
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
```

## ✅ Correto

```tsx
// App.tsx — apenas RouterProvider; providers ficam dentro do router
function App() {
  return <RouterProvider router={router} />;
}

// AppRouter.tsx — providers montados como layout raiz
function RootProviders() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </AuthProvider>
  );
}
```

## Regras

| ✅ Boas práticas                                                    | ❌ Más práticas                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Montar providers que usam hooks do router dentro de `RootProviders` | Montar esses providers em `App.tsx`, fora de `<RouterProvider>`     |
| `RootProviders` sem `path` — é um layout, não uma rota              | Adicionar `path: '/'` ao `RootProviders` (conflita com a rota home) |
| `errorElement` no nível raiz para capturar erros em qualquer rota   | Omitir `errorElement` e deixar erros sem tratamento visual          |

## Nota sobre `createPortal`

Providers que renderizam modais via `createPortal` (ex: `SinistroModalProvider`) também
devem ficar dentro do `RootProviders`. O portal altera apenas onde o DOM é inserido,
não a árvore de contexto do React — portanto `useNavigate` continua funcionando.

## Referência no codebase

- [`src/router/AppRouter.tsx`](../../../src/router/AppRouter.tsx) — `RootProviders` (linhas 93–109)
- [`src/context/AuthContext.tsx`](../../../src/context/AuthContext.tsx)
