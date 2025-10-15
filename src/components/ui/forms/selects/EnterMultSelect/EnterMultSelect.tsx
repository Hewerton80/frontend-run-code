import { KeyboardEvent, useCallback, useState } from "react";
import { MultSelect, MultSelectSelectProps } from "..";
import style from "./EnterMultSelect.module.css";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

interface EnterMultSelectProps
  extends Omit<MultSelectSelectProps, "value" | "onChange"> {
  value?: string[];
  onChange?: (value: string[]) => void;
}

export function EnterMultSelect({
  value,
  disabled,
  onKeyDown,
  onChange,
  ...restprops
}: EnterMultSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      const currentValue = value || [];
      if (e.key === "Enter" && inputValue?.trim()) {
        onChange?.([...currentValue, inputValue]);
        setInputValue("");
      }
    },
    [inputValue, onChange, onKeyDown, value]
  );

  return (
    <Tooltip
      open={showTooltip}
      disableHoverableContent={disabled || !inputValue?.trim()}
      textContent={
        <em>
          Pressione <b>Enter</b> para adicionar o valor
        </em>
      }
      side="bottom"
      align="end"
    >
      <div
        className={style.root}
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <MultSelect
          value={(value || []).map((v, i) => ({
            label: v,
            value: `${v}-${i}`,
          }))}
          inputValue={inputValue}
          isSearchable={true}
          onInputChange={setInputValue}
          onKeyDown={handleKeyDown}
          onChange={(options) => {
            onChange?.(
              (options || []).map((option) => (option?.label as string) || "")
            );
          }}
          disabled={disabled}
          {...restprops}
          autoFocus={false}
        />
      </div>
    </Tooltip>
  );
}
