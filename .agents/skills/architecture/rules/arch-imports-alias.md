# arch-imports-alias: Sempre Use o Alias `@/` para Importações Absolutas

## Prioridade: MEDIUM

## Explicação

Use sempre o alias `@/` para referenciar arquivos a partir de `src/`.
Nunca use caminhos relativos que sobem mais de um nível (`../../`).

Isso torna os imports legíveis, refactoráveis e independentes de onde o arquivo está
na hierarquia de pastas.

## Correto

```ts
// ✅ Alias @/ — sempre absoluto a partir de src/
import { useBaseApi } from '@/hooks/useBaseApi';
import { ICoupon } from '@/domains/coupon/types/Coupon';
import { setItemInCache } from '@/utils/tanstakQueryHelpers/setItemInCache';
import { CONSTANTS } from '@/utils/constants';
import { Button } from '@/components/ui/buttons/Button';
```

## Incorreto

```ts
// ❌ Caminho relativo longo — quebrável ao mover arquivos
import { useBaseApi } from '../../../hooks/utils/useBaseApi';
import { ICoupon } from '../../types/Coupon';
```

## Exceção

Imports **dentro da mesma pasta** ou de um arquivo imediatamente adjacente podem usar
caminhos relativos curtos (`./` ou `../`):

```ts
// ✅ Relativo curto — aceitável dentro do mesmo componente
import { useCouponForm } from './useCouponForm';
import { CouponAvailableSchedules } from '../CouponAvailableSchedules';
```

## Contexto

- O alias `@` aponta para `src/` e está configurado em `tsconfig.json` e `vite.config.mts`.
- A regra prática: se o import sobe 2+ níveis (`../../`), use `@/` no lugar.
