# router-lazy-loading

## Por que importa

Importar páginas diretamente (sem `lazy`) inclui todo o código delas no bundle inicial,
aumentando o tempo de carregamento da primeira tela. Com `React.lazy()`, cada página é
carregada apenas quando o usuário navega até ela.

## Regra

**Toda página** declarada em `AppRouter.tsx` deve ser importada com `React.lazy()`.
O elemento lazy deve ser sempre envolvido por `<SuspenseWrapper>` — nunca por `<Suspense>`
manual.

## `SuspenseWrapper` — componente obrigatório

O `SuspenseWrapper` centraliza o fallback visual (spinner centrado com `min-h-[60vh]`),
garantindo consistência em toda a aplicação.

```tsx
function SuspenseWrapper({ element }: { element: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}
```

## ❌ Errado

```tsx
// Import direto — aumenta o bundle inicial
import SinistrosDashboardPage from '../domains/sinistros/pages/SinistrosDashboardPage';

// Suspense manual — spinner inconsistente, código duplicado
{ path: ROUTE_PATTERNS.SINISTROS, element: (
    <Suspense fallback={<div>Carregando...</div>}>
      <SinistrosDashboardPage />
    </Suspense>
  )
}
```

## ✅ Correto

```tsx
// Import lazy — agrupado por domínio com comentário de seção
// ── Sinistros ─────────────────────────────────────────────────────────────
const SinistrosDashboardPage = lazy(
  () => import('../domains/sinistros/pages/SinistrosDashboardPage')
);
const AberturaProtocoloPage = lazy(
  () => import('../domains/sinistros/pages/AberturaProtocoloPage')
);
// ...

// Uso no router — sempre SuspenseWrapper
{ path: ROUTE_PATTERNS.SINISTROS, element: <SuspenseWrapper element={<SinistrosDashboardPage />} /> }
```

## Organização dos imports lazy em `AppRouter.tsx`

Agrupe os imports lazy por domínio com comentários de seção:

```tsx
// ── Sinistros — módulo PR21A ───────────────────────────────────────────────
const SinistrosDashboardPage = lazy(...);
const AberturaProtocoloPage  = lazy(...);
// ...

// ── Sinistros — módulo SI05A (Aviso de Sinistro) ──────────────────────────
const AvisoChavePage      = lazy(...);
const AvisosDadosPage     = lazy(...);
// ...
```

## Referência no codebase

- [`src/router/AppRouter.tsx`](../../../src/router/AppRouter.tsx) — linhas 36–67
- [`src/components/common/LoadingSpinner/LoadingSpinner.tsx`](../../../src/components/common/LoadingSpinner/LoadingSpinner.tsx)
