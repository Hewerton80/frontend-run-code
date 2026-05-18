# util-istype: Use `isType` para Verificar Tipos de Variáveis

## Prioridade: HIGH

## Explicação

O projeto exporta type guards em `src/utils/isType.ts` para verificação de tipo de variáveis.
Use sempre estas funções — nunca use `typeof value === 'string'` ou checagens manuais
espalhadas no código.

## Funções Disponíveis

```ts
import {
  isString,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isObject,
  isFile,
  isNumberable,
} from "@/utils/isType";

isString(value); // typeof value === 'string'
isNumber(value); // typeof value === 'number'
isBoolean(value); // typeof value === 'boolean'
isNull(value); // value === null
isUndefined(value); // typeof value === 'undefined'
isObject(value); // typeof value === 'object'

// Verifica se é um File (name: string + lastModified: number)
isFile(value); // true para File e objetos com duck-type de File

// Verifica se o valor pode ser convertido em número (não é NaN)
isNumberable(value); // value && !isNaN(Number(value))
```

## Exemplo Incorreto

```ts
// ❌ Checagens manuais espalhadas — sem consistência
if (typeof value === 'string') { ... }
if (value !== null && typeof value !== 'undefined') { ... }
if (value instanceof File) { ... }  // falha com objetos que imitam File
if (!isNaN(Number(value)) && value) { ... }
```

## Exemplo Correto

```ts
// ✅ Sempre via isType
import { isString, isFile, isNumber, isNumberable } from "@/utils/isType";

// No submit handler — verificar antes de converter para base64
if (isFile(formValues.banner1)) {
  payload.banner1 = await toBase64(formValues.banner1 as File);
} else if (isString(formValues.banner1)) {
  payload.banner1 = formValues.banner1;
}

// Em validações condicionais
if (isNumber(coupon.limit_of_guests)) {
  handledValue = Number(coupon.limit_of_guests);
}

// Antes de converter input string para número
if (isNumberable(rawInput)) {
  setPrice(Number(rawInput));
}
```

## Contexto

- `isFile` usa duck-typing (`value?.name` e `value?.lastModified`) — funciona corretamente
  com objetos Mock em testes, ao contrário de `instanceof File`.
- `isNumberable` difere de `isNumber`: `isNumber('3')` → `false`; `isNumberable('3')` → `true`.
  Use `isNumberable` para validar inputs de texto antes de converter com `Number()`.
- Referência: `src/utils/isType.ts`
