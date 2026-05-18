# router-navigation

## Por que importa

Usar `<a href>` para navegação interna causa um full page reload, perdendo todo o estado
do SPA. Strings de path inline são frágeis e difíceis de refatorar. Toda navegação
interna deve passar pelos hooks e componentes do React Router, usando as constantes de
`ROUTES`.

## Navegação programática

```tsx
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';

const navigate = useNavigate();

// Rota estática
navigate(ROUTES.SINISTROS);

// Rota com parâmetro dinâmico
navigate(ROUTES.SINISTRO_DETAIL(id));

// Redirect sem histórico (ex: pós-login, pós-logout)
navigate(ROUTES.HOME, { replace: true });

// Voltar para a página anterior
navigate(-1);
```

## Links

```tsx
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/routes';

// Rota estática
<Link to={ROUTES.SINISTROS}>Ver sinistros</Link>

// Rota com parâmetro
<Link to={ROUTES.SINISTRO_DETAIL(item.id)}>Detalhe</Link>
```

## ❌ Errado

```tsx
// String inline — frágil
navigate('/sinistros');
<Link to="/sinistros">Ver sinistros</Link>

// Concatenação manual
navigate(`/sinistros/${id}`);
<Link to={`/sinistros/${id}`}>Detalhe</Link>

// <a href> — causa full page reload
<a href="/sinistros">Ver sinistros</a>

// window.location — perde estado do SPA
window.location.href = '/sinistros';
window.location.replace('/login');
```

## ✅ Correto

```tsx
// Sempre ROUTES + hooks/componentes do React Router
navigate(ROUTES.SINISTROS);
navigate(ROUTES.SINISTRO_DETAIL(id));
<Link to={ROUTES.SINISTROS}>Ver sinistros</Link>
<Link to={ROUTES.SINISTRO_DETAIL(item.id)}>Detalhe</Link>
```

## Regras

| ✅ Boas práticas                                               | ❌ Más práticas                                     |
| -------------------------------------------------------------- | --------------------------------------------------- |
| `navigate(ROUTES.X)` para navegação programática               | `navigate('/path')` — string inline                 |
| `<Link to={ROUTES.X}>` para links                              | `<a href="/path">` — causa full page reload         |
| `navigate(-1)` para voltar                                     | `window.history.back()` — bypassa o router          |
| `navigate(ROUTES.X, { replace: true })` em redirects pós-ação  | `window.location.href` ou `window.location.replace` |
| `<Navigate to={ROUTES.X} replace />` em redirects declarativos | `<Navigate to="/path" />` — string inline           |

## Referência no codebase

- [`src/router/routes.ts`](../../../src/router/routes.ts) — objeto `ROUTES`
- [`src/router/ProtectedRoute.tsx`](../../../src/router/ProtectedRoute.tsx) — exemplo de `<Navigate>`
