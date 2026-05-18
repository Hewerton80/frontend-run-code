# arch-no-barrel-index — Proibição de Barrel `index.ts` de Re-exportação

**Prioridade:** CRITICAL  
**Categoria:** Estrutura Global

---

## Regra

**Nunca crie arquivos `index.ts` / `index.tsx` cujo único propósito seja re-exportar
símbolos de outros arquivos (barrel exports).**

Esses arquivos não adicionam lógica, aumentam a complexidade de resolução de módulos,
dificultam tree-shaking e ocultam a origem real dos símbolos.

---

## ❌ Proibido

```ts
// src/domains/sinistros/hooks/index.ts  ← NÃO FAÇA ISSO
export { useFetchProtocolo } from './useFetchProtocolo';
export { useAbrirProtocolo } from './useAbrirProtocolo';
export { useCreateReclamante } from './useCreateReclamante';
// ...
```

```ts
// src/domains/sinistros/components/index.ts  ← NÃO FAÇA ISSO
export { CausaSelect } from './CausaSelect';
export { FonteSelect } from './FonteSelect';
// ...
```

```ts
// src/domains/sinistros/pages/index.ts  ← NÃO FAÇA ISSO
export { AberturaProtocoloPage } from './AberturaProtocoloPage';
export { BuscaProtocoloPage } from './BuscaProtocoloPage';
// ...
```

---

## ✅ Correto

Importe diretamente do arquivo que define o símbolo:

```ts
// ✅ Importação direta — origem clara, tree-shaking eficiente
import { useFetchProtocolo } from '@/domains/sinistros/hooks/useFetchProtocolo';
import { useAbrirProtocolo } from '@/domains/sinistros/hooks/useAbrirProtocolo';
import { CausaSelect } from '@/domains/sinistros/components/CausaSelect';
```

---

## Exceção: `index.tsx` como componente real

Um arquivo `index.tsx` **é permitido** quando ele **define** um componente React
(contém JSX e lógica própria), seguindo o padrão de pasta de componente:

```
components/<NomeComponente>/
├── index.tsx          ← ✅ Define o componente (memo, forwardRef, JSX)
└── use<NomeComponente>.ts
```

A proibição se aplica **exclusivamente** a arquivos que só contêm `export { ... } from`.

---

## Motivação

| Problema                 | Barrel index                           | Importação direta                    |
| ------------------------ | -------------------------------------- | ------------------------------------ |
| Origem do símbolo        | Oculta (passa pelo barrel)             | Explícita no caminho do import       |
| Tree-shaking             | Pode falhar em bundlers menos espertos | Sempre eficiente                     |
| Circular dependencies    | Risco elevado                          | Risco mínimo                         |
| Refatoração / renomeação | Requer atualizar barrel + consumidores | Requer atualizar apenas consumidores |
| Resolução de módulos     | Mais lenta (resolve barrel primeiro)   | Direta                               |

---

## Checklist ao criar ou revisar arquivos

- [ ] O arquivo `index.ts` / `index.tsx` que estou criando **define** algo (componente, hook, classe)?
  - **Sim** → permitido.
  - **Não, só re-exporta** → **delete-o** e atualize os imports para apontar diretamente ao arquivo de origem.
