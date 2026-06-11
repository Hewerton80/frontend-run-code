import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { ComboboxPrimitive } from "../ComboboxPrimitive";
import { FormLabel } from "../../FormLabel";
import { FormHelperText } from "../../FormHelperText";

export interface AsyncSelectProps<TItem> {
  /** Função assíncrona que recebe o texto digitado e um AbortSignal. Deve retornar os itens filtrados. */
  fetchItems: (query: string, signal: AbortSignal) => Promise<TItem[]>;
  /** Item atualmente selecionado (objeto completo) ou null. */
  value?: TItem | null;
  /** Disparado quando o usuário seleciona ou limpa um item. */
  onChangeValue: (item: TItem | null) => void;
  /** Retorna o texto exibido no input quando o item está selecionado. */
  displayItem: (item: TItem) => string;
  /** Renderiza o conteúdo de cada linha no dropdown. */
  renderItem: (item: TItem) => ReactNode;
  /** Retorna um identificador único de string para o item (usado como key e para comparação). */
  valueExtractor: (item: TItem) => string;
  /** Key alternativa para o React. Usa valueExtractor quando omitido. */
  keyExtractor?: (item: TItem) => string;

  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  /** Itens exibidos antes de qualquer busca (ex.: item pré-selecionado ao editar). */
  defaultItems?: TItem[];
  emptyText?: string;
  /** Texto exibido quando o input está vazio. */
  hintText?: string;
  /** Texto exibido enquanto a busca está em andamento. */
  searchingText?: string;
}

function AsyncSelectComponent<TItem>({
  fetchItems,
  value,
  onChangeValue,
  displayItem,
  renderItem,
  valueExtractor,
  keyExtractor,
  label,
  error,
  required,
  id,
  name,
  disabled = false,
  placeholder = "Selecione...",
  defaultItems = [],
  emptyText = "Nenhum item encontrado",
  hintText = "Digite para buscar...",
  searchingText = "Buscando...",
}: AsyncSelectProps<TItem>) {
  const reactId = useId();
  const htmlFor = useMemo(() => id || name || reactId, [id, name, reactId]);
  const errorId = useMemo(() => (id ? `${id}-error` : undefined), [id]);

  const [searchResults, setSearchResults] = useState<TItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const abortControllerRef = useRef<AbortController | null>(null);
  // Stores the selected item so async callbacks always see the latest value
  // without needing it as a dependency. Updated via useEffect to avoid
  // mutating a ref during render (which React 19 flags as an error).
  const selectedItemRef = useRef<TItem | null>(value ?? null);
  useEffect(() => {
    selectedItemRef.current = value ?? null;
  });

  const mergedItems = useMemo(() => {
    const merged = [...defaultItems];
    searchResults.forEach((item) => {
      const itemId = valueExtractor(item);
      if (!merged.some((d) => valueExtractor(d) === itemId)) {
        merged.push(item);
      }
    });
    return merged;
  }, [defaultItems, searchResults, valueExtractor]);

  const statusText = useMemo(() => {
    if (isPending) return searchingText;
    if (!searchValue.trim()) return hintText;
    return null;
  }, [isPending, searchValue, hintText, searchingText]);

  const handleInputValueChange = useCallback(
    (keyword: string, event?: { reason: string }) => {
      if (event?.reason === "item-press") return;

      setSearchValue(keyword);
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (!keyword.trim()) {
        const selected = selectedItemRef.current;
        setSearchResults(selected ? [selected] : []);
        return;
      }

      startTransition(async () => {
        try {
          const results = await fetchItems(keyword, controller.signal);
          if (controller.signal.aborted) return;
          startTransition(() => setSearchResults(results));
        } catch (err) {
          if ((err as { name?: string })?.name !== "AbortError") {
            console.error("[AsyncSelect] fetchItems error:", err);
          }
        }
      });
    },
    [fetchItems],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      const selected = selectedItemRef.current;
      setSearchResults(selected ? [selected] : []);
      setSearchValue("");
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      {label && (
        <FormLabel htmlFor={htmlFor} required={required}>
          {label}
        </FormLabel>
      )}

      <ComboboxPrimitive.Root
        value={value}
        onValueChange={onChangeValue}
        disabled={disabled}
        items={mergedItems}
        name={name}
        itemToStringLabel={displayItem}
        filter={null}
        onInputValueChange={handleInputValueChange}
        onOpenChange={handleOpenChange}
      >
        <ComboboxPrimitive.InputGroup>
          <ComboboxPrimitive.Input
            isDisabled={disabled}
            isError={!!error}
            id={htmlFor}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          />
          <ComboboxPrimitive.Icon />
        </ComboboxPrimitive.InputGroup>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner>
            <ComboboxPrimitive.Popup aria-busy={isPending || undefined}>
              <ComboboxPrimitive.Status>
                {statusText ? (
                  <div className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                    {isPending && (
                      <span
                        aria-hidden
                        className="inline-block size-3 animate-spin rounded-full border border-current border-r-transparent"
                      />
                    )}
                    {statusText}
                  </div>
                ) : null}
              </ComboboxPrimitive.Status>

              <ComboboxPrimitive.List>
                {(item: TItem) => {
                  const itemId = valueExtractor(item);
                  const isSelected =
                    value != null && valueExtractor(value) === itemId;
                  return (
                    <ComboboxPrimitive.Item
                      key={keyExtractor ? keyExtractor(item) : itemId}
                      value={item}
                      isActive={isSelected}
                    >
                      {renderItem(item)}
                    </ComboboxPrimitive.Item>
                  );
                }}
              </ComboboxPrimitive.List>

              <ComboboxPrimitive.Empty>
                {!isPending && searchValue.trim() ? emptyText : null}
              </ComboboxPrimitive.Empty>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>

      <FormHelperText>{error}</FormHelperText>
    </div>
  );
}

export const AsyncSelect = memo(
  AsyncSelectComponent,
) as typeof AsyncSelectComponent;
(AsyncSelect as { displayName?: string }).displayName = "AsyncSelect";
