# util-regex: Use `regex` para Todos os Padrões de Validação

## Prioridade: HIGH

## Explicação

O projeto centraliza todas as expressões regulares no objeto `regex` em `src/utils/regex.ts`.
**Nunca** crie uma `RegExp` literal inline no código — sempre use este objeto.

Isso garante que o mesmo padrão seja usado consistentemente em toda a aplicação
(schemas Zod, validações manuais, formatações de input).

## Padrões Disponíveis

```ts
import { regex } from '@/utils/regex';

regex.phone; // /^\(\d{2}\) \d{4,5}-\d{4}$/
// ex: "(11) 99999-9999" ou "(11) 9999-9999"

regex.dateFormat; // /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4})$/
// ex: "31/03/2026" — formato de exibição (dd/MM/yyyy)

regex.dateIsoFormat; // /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/
// ex: "2026-03-31" — formato ISO da API (yyyy-MM-dd)

regex.timeHHMM; // /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
// ex: "14:30"

regex.alphanumeric; // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
// ao menos 1 letra + 1 número, mín. 6 caracteres

regex.email; // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,64}$/i

regex.onlyNumbersMask; // /^-?\d*\.?\d*$/
// para inputs que aceitam apenas dígitos (com ponto decimal)

regex.url; // /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i

regex.base64; // /^data:image\/[a-z]+;base64,[A-Za-z0-9+/]+={0,2}$/
// valida string de imagem em base64
```

## Exemplo Incorreto

```ts
// ❌ RegExp literal inline — duplica lógica, fácil de errar
const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(value)
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

// ❌ Instanciar new RegExp inline
if (new RegExp('^\\d{2}/\\d{2}/\\d{4}$').test(dateStr)) { ... }
```

## Exemplo Correto

```ts
// ✅ Sempre via regex
import { regex } from '@/utils/regex';

// Em schemas Zod (refine)
z.string().refine((date) => (date ? date.match(regex.dateFormat) : true), {
  message: CONSTANTS.ERROR_MESSAGES.INVALID_DATE,
});

// Em validações manuais
if (!dateStr.match(regex.dateFormat)) return undefined;

// Em inputs controlados
const handleChange = (value: string) => {
  if (!regex.onlyNumbersMask.test(value)) return;
  setFieldValue(value);
};
```

## Contexto

- Se um padrão que você precisa ainda não existe em `regex`, **adicione-o ao arquivo**
  `src/utils/regex.ts` em vez de criar um inline. Nunca há dois lugares para o mesmo padrão.
- `regex.dateFormat` valida o formato `dd/MM/yyyy` (exibição ao usuário).
  `regex.dateIsoFormat` valida `yyyy-MM-dd` (formato da API).
- Referência: `src/utils/regex.ts`
