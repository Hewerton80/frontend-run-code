import {
  forwardRef,
  ComponentPropsWithRef,
  useCallback,
  useState,
  Fragment,
  JSX,
} from "react";
import { MultiValue, PropsValue, SingleValue, components } from "react-select";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@/components/ui/feedback/Spinner";
import styled from "./PrimitiveSelect.module.css";
import { FormLabel } from "@/components/ui/forms/FormLabel";
import { FormHelperText } from "@/components/ui/forms/FormHelperText";
import { OnchangeMultValue, OnchangeSigleValue, SelectOption } from "../type";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { CloseButton } from "@/components/ui/buttons/CloseButton";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { isString } from "@/utils/isType";
import ReactSelect from "react-select";

type MapedSelectProps = Pick<
  ComponentPropsWithRef<typeof ReactSelect>,
  | "isMulti"
  | "isClearable"
  | "controlShouldRenderValue"
  | "hideSelectedOptions"
  | "tabSelectsValue"
  | "backspaceRemovesValue"
  | "autoFocus"
  | "id"
  | "required"
  | "isSearchable"
  | "isLoading"
  | "placeholder"
  | "onKeyDown"
>;

export interface PrimitiveSelectProps extends MapedSelectProps {
  selectClassName?: string;
  error?: string;
  label?: string;
  formControlClassName?: string;
  menuIsOpen?: boolean;
  options?: SelectOption[];
  value?: PropsValue<SelectOption> | null;
  // onChange: (newValue: MultiValue<SelectOption>, actionMeta: any) => void;
  disabled?: boolean;
  inputValue?: string;
  subtitle?: string | JSX.Element;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeSingleOption?: OnchangeSigleValue;
  onChangeMultValue?: OnchangeMultValue;
  onInputChange?: (newValue: string) => void;
}

export const PrimitiveSelect = forwardRef(
  (
    {
      formControlClassName,
      error,
      label,
      disabled,
      selectClassName,
      options = [],
      isLoading,
      required,
      placeholder = "Search...",
      isMulti,
      isSearchable = false,
      subtitle,
      onChangeSingleOption,
      onChangeMultValue,
      ...restProps
    }: PrimitiveSelectProps,
    ref?: any
  ) => {
    const [_menuIsOpen, _setMenuIsOpen] = useState(false);

    const handleChange = useCallback(
      (
        newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
        actionMeta: any
      ) => {
        if (isMulti) {
          onChangeMultValue?.(newValue as SelectOption[], actionMeta);
        } else {
          onChangeSingleOption?.(newValue as SingleValue<SelectOption>);
        }
      },
      [isMulti, onChangeSingleOption, onChangeMultValue]
    );

    return (
      <div className={twMerge("flex flex-col w-full", formControlClassName)}>
        {label && (
          <FormLabel required={required} htmlFor={restProps?.id}>
            {label}
          </FormLabel>
        )}
        <ReactSelect
          ref={ref}
          onMenuOpen={() => _setMenuIsOpen(true)}
          menuIsOpen={_menuIsOpen}
          onMenuClose={() => _setMenuIsOpen(false)}
          required={required}
          placeholder={placeholder}
          classNamePrefix="select"
          isDisabled={disabled}
          closeMenuOnSelect={!isMulti}
          className={twMerge(
            styled.root,
            error && styled.error,
            selectClassName
          )}
          components={{
            IndicatorSeparator: () => null,
            // CrossIcon: () => <FaChevronDown className="text-red-500" />,
            // DownChevron: () => <FaChevronDown className="text-red-500" />,
            ClearIndicator: () => null,
            // Control: ({ children, ...restProps }) => (
            //   <components.Control
            //     className={
            //       twMerge(
            //         "w-full rounded-md min-h-9 shadow-sm bg-transparent",
            //         "border-border hover:border-border ring-primary/40"
            //       )
            //       // styled.control,
            //       // error && styled["control--error"],
            //       // disabled && styled["control--disabled"]
            //     }
            //     {...restProps}
            //   >
            //     {children}
            //   </components.Control>
            // ),
            Menu: ({ children, ...restProps }) => (
              <components.Menu
                className={
                  twMerge()
                  // menuStyle.root
                  // "max-h-96 min-w-[8rem] rounded-md border bg-popover text-popover-foreground",
                  // "shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out",
                  // "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
                  // "data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
                  // "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2,",
                  // "data-[side=top]:slide-in-from-bottom-2"
                }
                {...restProps}
              >
                {children}
              </components.Menu>
            ),
            MenuList: ({ children, ...restProps }) => (
              <components.MenuList
                className={twMerge(
                  "flex flex-col space-y-1 max-h-64 overflow-y-auto custom-scroll"
                )}
                {...restProps}
              >
                {children}
              </components.MenuList>
            ),

            Option: ({ children, isFocused, isSelected, ...restProps }) => (
              <components.Option
                {...restProps}
                className={
                  twMerge()
                  // menuStyle.item,
                  // (isSelected || isFocused) && menuStyle["is-active"]
                }
                isFocused={isFocused}
                isSelected={isSelected}
                getStyles={() => ({ fontSize: 14, padding: "6px 8px", gap: 0 })}
              >
                {children}
              </components.Option>
            ),
            GroupHeading: ({ children }) => (
              <div
                className={twMerge(
                  "text-muted-foreground px-2 text-xs mb-1 font-bold"
                )}
              >
                {children}
              </div>
            ),
            MultiValueContainer: ({ children }) => (
              <Badge variant="primary">{children}</Badge>
            ),
            MultiValueLabel: ({ children }) => <Fragment>{children}</Fragment>,
            MultiValueRemove: ({ innerProps }) => (
              <CloseButton
                {...innerProps}
                className={twMerge("ml-1", innerProps?.className)}
              />
            ),
            DropdownIndicator: () => (
              <span className="text-sm text-foreground hover:text-primary -translate-x-2">
                {isSearchable ? (
                  <FaSearch />
                ) : (
                  <FaChevronDown
                    className={twMerge(_menuIsOpen && "rotate-180")}
                  />
                )}
              </span>
            ),
            // NoOptionsMessage: () => (
            //   <div className="flex w-full justify-center ">
            //     <span className="text-sm text-muted dark:text-border">
            //       No options available
            //     </span>
            //   </div>
            // ),
          }}
          onChange={(
            newValue: MultiValue<any> | SingleValue<any>,
            actionMeta: any
          ) => handleChange(newValue, actionMeta)}
          // formatOptionLabel={(option) => (
          //   <Badge variant="info">{option.label}</Badge>
          // )}
          // formatGroupLabel={(options) => (
          //   <>
          //     <span>{options.label}</span>
          //     <span> ({options?.options?.length})</span>
          //   </>
          // )}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isLoading={isLoading}
          options={isLoading ? ([] as SelectOption[]) : options}
          // options={[
          //   {
          //     label: (
          //       <div className="flex">
          //         <span className="size-2 bg-red-500 rounded-full"></span>
          //         <h1 className="text-blue-500">dsadsd</h1>
          //       </div>
          //     ),
          //     value: "dsad",
          //   },
          // ]}
          noOptionsMessage={() => <span>Nenhuma opção disponível</span>}
          loadingMessage={() => (
            <div className="flex w-full justify-center">
              <Spinner size={18} />
            </div>
          )}
          {...restProps}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
        {subtitle && (
          <div className="mt-2 ">
            {isString(subtitle) ? (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            ) : (
              subtitle
            )}
          </div>
        )}
      </div>
    );
  }
);
