# arch-components-layer: Padrão da Camada `components/` de um Módulo

## Prioridade: HIGH

## Explicação

Componentes de módulo seguem convenções estritas de estrutura de arquivo, tipagem de props,
uso de `memo`/`forwardRef` e separação de lógica.

---

## Estrutura de Arquivos

Cada componente é uma pasta com dois arquivos:

```
components/<NomeComponente>/
├── index.tsx            # Só JSX — sem lógica de negócio
└── use<NomeComponente>.ts  # Hook local — toda lógica aqui
```

Sub-componentes ficam dentro da mesma pasta do componente pai se forem usados apenas por ele.

---

## Props

- Defina uma `interface` local com sufixo `Props`.
- Não use `type` — use `interface`.

```tsx
// ✅
interface CouponRowProps {
  id: string;
  isAdmin: boolean;
  className?: string;
}
```

---

## `memo` + `forwardRef`

Use em componentes de linha de lista/tabela que podem receber `ref` de fora.
Sempre adicione `displayName`.

```tsx
// ✅ components/CouponRow/index.tsx
export const CouponRow = memo(
  forwardRef<HTMLTableRowElement, CouponRowProps>(
    ({ id, isAdmin, className }, ref) => {
      const { coupon } = useGetCouponFromCache(id);

      return (
        <Table.Row ref={ref} className={className}>
          <Table.Data>{coupon?.name}</Table.Data>
        </Table.Row>
      );
    },
  ),
);
CouponRow.displayName = "CouponRow";
```

---

## Hook Local com Zustand para Estado Compartilhado

Quando o estado de um componente (ex: abrir/fechar modal) precisa ser controlado por
outro componente no mesmo módulo, use **Zustand** com `useShallow`.

Nunca eleve esse estado para um contexto global — mantenha-o no nível do módulo.

```ts
// ✅ use<NomeComponente>.ts — padrão Zustand para modal local
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface State {
  show: boolean;
}
interface Action {
  setShow: (value: boolean) => void;
}

const useShowModalStore = create<State & Action>((set) => ({
  show: false,
  setShow: (value) => set(() => ({ show: value })),
}));

export const useMyModal = () => {
  const { show } = useShowModalStore(useShallow((s) => ({ show: s.show })));
  const { setShow } = useShowModalStore(
    useShallow((s) => ({ setShow: s.setShow })),
  );
  return { show, setShow };
};
```

**Por que `useShallow` em selects separados?**
Selecionar `state` e `actions` com `useShallow` em chamadas distintas evita que a
mudança de uma action re-renderize componentes que só leem state (e vice-versa).

---

## Componentes que Leem do Cache

Componentes de linha de lista recebem apenas `id` como prop e leem seus dados do cache
via `useGet<Entidade>FromCache` — nunca fazem HTTP diretamente.
Ver regra `perf-id-only-list-items` na skill `tanstack-query-best-practices`.

## Contexto

- `memo` sozinho (sem `forwardRef`) é suficiente para componentes que não precisam de `ref`.
- Não use `memo` em componentes que sempre re-renderizam com props diferentes — o custo
  de comparação supera o ganho.
