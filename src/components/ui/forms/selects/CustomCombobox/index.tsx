import { memo, ReactNode, useId, useMemo, KeyboardEvent } from "react";
import { cn } from "@/utils/cn";
import { ComboboxPrimitive } from "../ComboboxPrimitive";
import { Combobox } from "@base-ui/react/combobox";
import { FormHelperText } from "../../FormHelperText";
import { FormLabel } from "../../FormLabel";
import { FaTimes } from "react-icons/fa";

export interface CustomComboboxProps<TItem> {
  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  /** The currently selected items (full objects), or null/undefined for no selection. */
  value?: TItem[] | null;
  onOpen?: () => void;
  onClose?: () => void;
  onChangeValue: (values: TItem[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isLoadingText?: string;
  placeholder?: string;
  items: TItem[];
  emptyText?: string;
  hiddenPopup?: boolean;
  displayItem: (item: TItem) => ReactNode;
  renderItem: (item: TItem) => ReactNode;
  valueExtractor: (item: TItem) => string;
  keyExtractor?: (item: TItem) => string;
  inputValue?: string;
  onInputValueChange?: (value: string, event?: { reason: string }) => void;
  onInputKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  itemToStringLabel?: (item: TItem) => string;
}

function CustomComboboxComponent<TItem>({
  label,
  error,
  required,
  id,
  name,
  value,
  onOpen,
  onClose,
  onChangeValue,
  disabled = false,
  isLoading = false,
  isLoadingText = "Carregando...",
  placeholder = "Selecione...",
  items = [],
  emptyText = "Nenhum item encontrado",
  hiddenPopup = false,
  displayItem,
  renderItem,
  valueExtractor,
  keyExtractor,
  inputValue,
  onInputValueChange,
  onInputKeyDown,
  itemToStringLabel,
}: CustomComboboxProps<TItem>) {
  const reactId = useId();
  const htmlFor = useMemo(() => id || name || reactId, [id, name, reactId]);

  const errorId = useMemo(() => (id ? `${id}-error` : undefined), [id]);

  // Selected items are now passed as full objects — no ID lookup needed.
  const selectedItems = useMemo(() => value || [], [value]);

  // Items not yet selected — shown in the dropdown.
  // Uses valueExtractor for deduplication so identity mismatches don't matter.
  const unselectedItems = useMemo(() => {
    const selectedIds = new Set(selectedItems.map(valueExtractor));
    return items.filter((item) => !selectedIds.has(valueExtractor(item)));
  }, [items, selectedItems, valueExtractor]);

  const handleOpenChange = (open: boolean) => {
    if (open) onOpen?.();
    else onClose?.();
  };

  // Base UI now returns TItem[] directly (objects, not label strings).
  const handleValueChange = (newItems: TItem[]) => {
    onChangeValue(newItems);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <FormLabel htmlFor={htmlFor} required={required}>
          {label}
        </FormLabel>
      )}
      <ComboboxPrimitive.Root
        value={selectedItems}
        onValueChange={handleValueChange}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        items={items}
        name={name}
        itemToStringLabel={itemToStringLabel}
        filteredItems={unselectedItems}
        inputValue={inputValue}
        onInputValueChange={onInputValueChange}
        multiple
      >
        <Combobox.InputGroup
          className={cn(
            "group relative flex flex-wrap items-center gap-1",
            "min-h-9 h-auto pl-2.5 pr-8 py-1 duration-200",
            "border border-input rounded-lg bg-transparent",
            "focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary",
            disabled && "border-foreground-subtle opacity-80",
            !!error &&
              "border-destructive focus-within:ring-destructive/30 focus-within:border-destructive",
          )}
        >
          <Combobox.Chips className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
            <Combobox.Value>
              {(currentItems: TItem[]) => (
                <>
                  {currentItems.map((item) => {
                    const key = keyExtractor
                      ? keyExtractor(item)
                      : valueExtractor(item);
                    const label = displayItem(item);
                    return (
                      <Combobox.Chip
                        key={key}
                        className="flex items-center gap-1 rounded-md bg-primary/80 text-primary-foreground px-1.5 py-0.5 text-xs font-medium"
                      >
                        {label}
                        <Combobox.ChipRemove className="rounded-sm p-0.5 hover:bg-primary/20 transition-colors cursor-pointer">
                          <FaTimes className="size-2.5" />
                        </Combobox.ChipRemove>
                      </Combobox.Chip>
                    );
                  })}
                  <Combobox.Input
                    id={htmlFor}
                    placeholder={currentItems.length > 0 ? "" : placeholder}
                    className={cn(
                      "min-w-20 flex-1 bg-transparent outline-none text-sm",
                      "text-foreground placeholder:text-muted-foreground h-7",
                      disabled && "cursor-not-allowed",
                    )}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    onKeyDown={onInputKeyDown}
                  />
                </>
              )}
            </Combobox.Value>
          </Combobox.Chips>

          <ComboboxPrimitive.Icon />
        </Combobox.InputGroup>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner>
            <ComboboxPrimitive.Popup
              className={hiddenPopup ? "hidden" : undefined}
            >
              {isLoading && (
                <ComboboxPrimitive.Loading isLoadingText={isLoadingText} />
              )}
              <ComboboxPrimitive.List
                className={
                  isLoading ? "hidden data-empty:[&+*]:hidden" : undefined
                }
              >
                {(item: TItem) => {
                  const itemId = valueExtractor(item);
                  const isSelected = new Set(
                    selectedItems.map(valueExtractor),
                  ).has(itemId);

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

              <ComboboxPrimitive.Empty>{emptyText}</ComboboxPrimitive.Empty>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>

      <FormHelperText>{error}</FormHelperText>
    </div>
  );
}

export const CustomCombobox = memo(
  CustomComboboxComponent,
) as typeof CustomComboboxComponent;
(CustomCombobox as { displayName?: string }).displayName = "CustomCombobox";
