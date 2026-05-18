# util-array: Use `sortObjectsByProperty` para Ordenação de Arrays de Objetos

## Prioridade: MEDIUM

## Explicação

O projeto disponibiliza `sortObjectsByProperty` em `src/utils/array.ts` para ordenar
arrays de objetos por uma propriedade de forma case-insensitive. Use esta função sempre
que precisar ordenar uma lista de objetos — não reimplemente o `.sort()` com `localeCompare`
ou `toLocaleLowerCase` inline.

## API Disponível

```ts
import { sortObjectsByProperty } from "@/utils/array";

sortObjectsByProperty({ array, sortBy: "propertyName" });
// Retorna um novo array (não muta o original) ordenado pela propriedade em ordem crescente
```

## Exemplo Incorreto

```ts
// ❌ .sort() inline — reimplementa lógica já existente
const sorted = coupons
  .slice()
  .sort((a, b) =>
    a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1,
  );

// ❌ Muta o array original
coupons.sort((a, b) => a.name.localeCompare(b.name));
```

## Exemplo Correto

```ts
// ✅
import { sortObjectsByProperty } from "@/utils/array";

const sortedCoupons = sortObjectsByProperty({ array: coupons, sortBy: "name" });
const sortedCategories = sortObjectsByProperty({
  array: categories,
  sortBy: "label",
});
```

## Contexto

- A função usa `.slice()` internamente — nunca muta o array original.
- A ordenação é crescente (A → Z) e case-insensitive via `toLocaleLowerCase()`.
- O parâmetro `sortBy` é tipado como `keyof T`, garantindo autocomplete e type safety.
- Para outras operações em arrays (filter, map, reduce, find), use os métodos nativos
  do JavaScript — só use este utilitário para ordenação de objetos por propriedade.
- Referência: `src/utils/array.ts`
