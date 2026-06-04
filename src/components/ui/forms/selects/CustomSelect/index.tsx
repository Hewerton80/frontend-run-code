import { memo, ReactNode, useId, useMemo } from "react";
import { ComboboxPrimitive } from "../ComboboxPrimitive";
import { FormLabel } from "../../FormLabel";
import { FormHelperText } from "../../FormHelperText";

export interface CustomSelectProps<TItem> {
  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value?: TItem | null;
  isAutoComplete?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onChangeValue: (value: TItem | null) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isLoadingText?: string;
  placeholder?: string;
  items: TItem[];
  emptyText?: string;
  statusText?: string | null;
  displayItem: (item: TItem) => ReactNode;
  itemToStringLabel?: ((itemValue: TItem) => string) | undefined;
  renderItem: (item: TItem) => ReactNode;
  valueExtractor: (item: TItem) => string;
  keyExtractor?: (item: TItem) => string;
  onInputValueChange?: (value: string, event?: { reason: string }) => void;
}

function CustomSelectComponent<TItem>({
  label,
  error,
  required,
  id,
  name,
  value,
  isAutoComplete = false,
  onOpen,
  onClose,
  onChangeValue,
  itemToStringLabel,
  disabled = false,
  isLoading = false,
  isLoadingText = "Carregando...",
  placeholder = "Selecione...",
  items = [],
  emptyText = "Nenhum item encontrado",
  statusText,
  displayItem,
  renderItem,
  valueExtractor,
  keyExtractor,
  onInputValueChange,
}: CustomSelectProps<TItem>) {
  const reactId = useId();

  const htmlFor = useMemo(() => id || name || reactId, [id, name, reactId]);

  const errorId = useMemo(() => (id ? `${id}-error` : undefined), [id]);

  const handleOpenChange = (open: boolean) => {
    if (open) onOpen?.();
    else onClose?.();
  };

  // Base UI now returns TItem | null directly (objects, not label strings).
  const handleValueChange = (item: TItem | null) => {
    onChangeValue(item);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <FormLabel htmlFor={htmlFor} required={required}>
          {label}
        </FormLabel>
      )}
      <ComboboxPrimitive.Root
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        items={items}
        name={name}
        itemToStringLabel={itemToStringLabel}
        filteredItems={!isAutoComplete ? items : undefined}
        filter={isAutoComplete && onInputValueChange ? null : undefined}
        onInputValueChange={onInputValueChange}
      >
        <ComboboxPrimitive.InputGroup>
          {isAutoComplete ? (
            <>
              <ComboboxPrimitive.Input
                isDisabled={disabled}
                isError={!!error}
                id={htmlFor}
                placeholder={placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
              />
              <ComboboxPrimitive.Icon />
            </>
          ) : (
            <ComboboxPrimitive.Trigger
              id={htmlFor}
              isDisabled={disabled}
              isError={!!error}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            >
              <ComboboxPrimitive.Value
                placeholder={placeholder}
                value={value ? displayItem(value) : ""}
              />
              <ComboboxPrimitive.Icon />
            </ComboboxPrimitive.Trigger>
          )}
        </ComboboxPrimitive.InputGroup>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner>
            <ComboboxPrimitive.Popup>
              {/* Always rendered so live-region announcements work correctly. */}
              <ComboboxPrimitive.Status>
                {statusText ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {statusText}
                  </div>
                ) : null}
              </ComboboxPrimitive.Status>
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
              <ComboboxPrimitive.Empty>{emptyText}</ComboboxPrimitive.Empty>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
      <FormHelperText>{error}</FormHelperText>
    </div>
  );
}

export const CustomSelect = memo(
  CustomSelectComponent,
) as typeof CustomSelectComponent;
(CustomSelect as { displayName?: string }).displayName = "CustomSelect";
