# arch-pages-layer: Padrão da Camada `pages/`

## Prioridade: MEDIUM

## Explicação

Páginas são finas. Elas apenas compõem componentes de módulo e definem a estrutura da rota —
nunca contêm lógica de negócio, chamadas de API ou estado derivado.

## Nomenclatura

| Tipo         | Nome                                        |
| ------------ | ------------------------------------------- |
| Listagem     | `<Entidades>Page` (`CouponsPage`)           |
| Criação      | `Create<Entidade>Page` (`CreateCouponPage`) |
| Edição       | `Edit<Entidade>Page` (`EditCouponPage`)     |
| Visualização | `View<Entidade>Page` (`ViewCouponPage`)     |

## Estrutura de uma Página

```tsx
// ✅ pages/CreateCouponPage.tsx — só composição
import { InLayoutPage } from './InLayoutPage';
import { CouponsForm } from '@/domains/coupon/components/CoupomForm';

export function CreateCouponPage() {
  return (
    <InLayoutPage>
      <CouponsForm actionForm="create" />
    </InLayoutPage>
  );
}
```

```tsx
// ✅ pages/CouponsPage.tsx — filtros via Nuqs, lista via componente de módulo
import { CouponsList } from '@/domains/coupon/components/CouponsList';
import { CouponFilterModal } from '@/domains/coupon/components/CouponFilterModal';

export function CouponsPage() {
  return (
    <InLayoutPage>
      <CouponFilterModal />
      <CouponsList />
    </InLayoutPage>
  );
}
```

## Incorreto

```tsx
// ❌ Lógica de dados diretamente na página
export function CouponsPage() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('/api/coupons')
      .then((r) => r.json())
      .then(setCoupons);
  }, []);

  return (
    <div>
      {coupons.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}
```

## Registro de Rotas

Todas as rotas são declaradas centralmente em `src/Routes.tsx`. Ao criar uma nova página,
registre a rota neste arquivo.

## Contexto

- Páginas vivem diretamente em `src/pages/` — não dentro de módulos.
- `InLayoutPage` é o wrapper de layout autenticado (sidebar + header).
- O prop `actionForm` passado ao componente de formulário determina o modo
  (`"create"` | `"edit"` | `"view"`).
