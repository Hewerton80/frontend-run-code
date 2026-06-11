import { forwardRef, KeyboardEvent, useState } from "react";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { CustomCombobox } from "../CustomCombobox";

export type SelectOption = { label: string; value: string };

export interface EnterMultSelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value?: SelectOption[] | null;
  onChange?: (options: SelectOption[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const EnterMultSelect = forwardRef<HTMLDivElement, EnterMultSelectProps>(
  ({ value, onChange, ...restProps }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    const selectedOptions = value ?? [];

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();

        const newOption: SelectOption = {
          label: inputValue.trim(),
          value: `${inputValue.trim()}-${Math.random()}`,
        };
        onChange?.([...selectedOptions, newOption]);

        setInputValue("");
      }
    };

    return (
      <Tooltip
        open={showTooltip}
        textContent={
          <em>
            Pressione <b>Enter</b> para adicionar um novo valor
          </em>
        }
        side="bottom"
        align="end"
      >
        <div
          ref={ref}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <CustomCombobox<SelectOption>
            {...restProps}
            items={selectedOptions}
            value={selectedOptions}
            displayItem={(o) => o.label}
            renderItem={(o) => o.label}
            valueExtractor={(o) => o.value}
            onChangeValue={(selected) => onChange?.(selected)}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
            onInputKeyDown={handleInputKeyDown}
            hiddenPopup
          />
        </div>
      </Tooltip>
    );
  },
);

EnterMultSelect.displayName = "EnterMultSelect";
