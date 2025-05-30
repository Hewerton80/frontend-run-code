import { JSX, ReactNode } from "react";
import { ActionMeta, SingleValue } from "react-select";

export interface SelectOption {
  value?: string;
  label: string | JSX.Element;
  options?: SelectOption[];
}

export type OnchangeSigleValue = (newValue: SingleValue<SelectOption>) => void;

export type OnchangeMultValue = (
  newValue: SelectOption[],
  actionMeta: ActionMeta<SelectOption>
) => void;
