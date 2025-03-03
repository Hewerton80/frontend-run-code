"use client";
import { KeyboardEvent, useState } from "react";
import { MultSelect, MultSelectSelectProps } from "../../selects";
import style from "./EnterMultSelect.module.css";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

interface EnterMultSelectProps extends MultSelectSelectProps {}

export function EnterMultSelect({
  value,
  onKeyDown,
  onChange,
  ...restprops
}: EnterMultSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const currentValue = value || [];
    if (e.key === "Enter" && inputValue?.trim()) {
      onChange?.(
        [
          ...currentValue,
          { label: inputValue, value: `${inputValue}-${Math.random()}` },
        ],
        "input-change" as any
      );
      setInputValue("");
    }
  };

  return (
    <Tooltip
      open={showTooltip}
      textContent={
        <em>
          Press <b>Enter</b> to add a new value
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
          value={value}
          inputValue={inputValue}
          isSearchable={true}
          onInputChange={setInputValue}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          {...restprops}
        />
      </div>
    </Tooltip>
  );
}
