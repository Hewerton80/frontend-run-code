# util-datetime: Use `DateTime` para Toda Manipulação de Datas

## Prioridade: HIGH

## Explicação

O projeto exporta um objeto utilitário `DateTime` em `src/utils/dateTime.ts` que encapsula
o `date-fns` com locale `ptBR` aplicado por padrão. Toda manipulação de datas no projeto
deve usar este objeto — nunca instancie `new Date()` para formatação, nunca importe funções
do `date-fns` diretamente nos módulos.

## API disponível

```ts
import { DateTime } from "@/utils/dateTime";

// Formata uma data para exibição
DateTime.format(date, "dd/MM/yyyy"); // "31/03/2026"
DateTime.format(date, "dd/MM/yyyy - HH:mm"); // "31/03/2026 - 14:30"
DateTime.format(date, "dd MMM, yyyy"); // "31 mar., 2026"
DateTime.format(date, "MMM yyyy"); // "mar. 2026"

// Formatos aceitos pelo tipo DateFormatsType:
// 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss'
// 'dd/MM/yyyy - HH:mm' | 'HH:mm:ss' | 'dd MMM, yyyy'
// 'MMM' | 'MMM yyyy' | 'MMMM yyyy'

// Verifica se uma data está entre duas outras
DateTime.isBetween(start, end, date); // boolean

// Diferença em dias entre duas datas
DateTime.differenceInDays(dateLeft, dateRight); // number

// Comparações
DateTime.isAfter(date, dateToCompare); // boolean
DateTime.isBefore(date, dateToCompare); // boolean
DateTime.isSameDay(dateLeft, dateRight); // boolean
DateTime.isPast(date); // boolean

// Adição e subtração
DateTime.addDays(date, amount); // Date
DateTime.subDays(date, amount); // Date

// Início e fim do dia
DateTime.startOfDay(date); // Date
DateTime.endOfDay(date); // Date

// Validação
DateTime.isValid(value); // boolean — retorna false para null/undefined/NaN

// Converte "dd/MM/yyyy" → "yyyy-MM-dd" (para envio à API)
DateTime.humanDateToIso("31/03/2026"); // "2026-03-31"
// Retorna undefined se o formato for inválido
```

## Exemplo Incorreto

```ts
// ❌ Importação direta do date-fns — duplica configuração de locale
import { format, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";

const label = format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
const expired = isAfter(new Date(), new Date(expiryDate));

// ❌ Manipulação manual de string de data
const [dd, mm, yyyy] = dateStr.split("/");
const iso = `${yyyy}-${mm}-${dd}`;
```

## Exemplo Correto

```ts
// ✅ Sempre via DateTime
import { DateTime } from "@/utils/dateTime";

const label = DateTime.format(date, "dd/MM/yyyy");
const expired = DateTime.isAfter(new Date(), expiryDate);
const iso = DateTime.humanDateToIso(dateStr); // "yyyy-MM-dd" ou undefined
const valid = DateTime.isValid(someValue);
```

## Contexto

- `DateTime.format` já aplica `locale: ptBR` — não passe o locale manualmente.
- `DateType` aceita `string | number | Date` — não é necessário fazer `new Date()` antes.
- Para datas recebidas da API (ISO string), passe diretamente: `DateTime.format(coupon.createdAt, 'dd/MM/yyyy')`.
- Referência: `src/utils/dateTime.ts`
