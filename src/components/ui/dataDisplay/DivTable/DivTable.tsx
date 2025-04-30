"use client";
import { ComponentPropsWithRef, ReactNode, useId } from "react";
import { twMerge } from "tailwind-merge";
import { PrimitiveAccordion } from "../PrimitiveAccordion";

interface TableContainerProps extends ComponentPropsWithRef<"div"> {}
interface RowProps extends ComponentPropsWithRef<"div"> {
  header?: boolean;
  disabled?: boolean;
  onAccordionChange?: (value: string) => void;
}
interface TdProps extends ComponentPropsWithRef<"div"> {}

function Container({ className, children, ...restProps }: TableContainerProps) {
  return (
    <div
      role="table"
      className={twMerge(
        "[&_[role=row]]:border-t",
        "flex flex-col rounded-md overflow-x-auto border w-full text-sm",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

function Row({
  children,
  header,
  className,
  disabled,
  onAccordionChange,
  ...restProps
}: RowProps) {
  const id = useId();
  return (
    <PrimitiveAccordion.Root
      // value={openAccordion}
      onValueChange={onAccordionChange}
      disabled={disabled}
      type="single"
      collapsible
      asChild
    >
      <PrimitiveAccordion.Item value={id}>
        <div
          role="row"
          className={twMerge(
            "flex flex-col md:flex-row gap-0 md:gap-2",
            header &&
              "hidden md:flex text-xs font-medium h-10 text-muted-foreground border-t-transparent",
            !disabled && "hover:bg-muted/50",
            "duration-[.15s] ease-in-out transition-colors",
            className
          )}
          {...restProps}
        >
          {children}
        </div>
      </PrimitiveAccordion.Item>
      {/* <PrimitiveAccordion.Content>
                {errorExercises && <FeedBackError onTryAgain={refetchExercises} />}
                <div className="grid grid-cols-3 gap-4 w-full border-none p-2">
                  {isLoadingExercises &&
                    getRange(0, 5).map((index) => (
                      <Skeleton
                        key={`exercise-skeleton-${index}`}
                        className="w-full h-26 rounded-lg"
                      />
                    ))}
      
                  {exercises?.map((exercise, index) => (
                    <ExerciseCard
                      key={`${exercise?.uuid}-${index}`}
                      data={{
                        ...exercise,
                        listExercise: list,
                        classroom: list?.classroom,
                      }}
                    />
                  ))}
                </div>
              </PrimitiveAccordion.Content> */}
    </PrimitiveAccordion.Root>
  );
}

function Data({ children, className, ...restProps }: TdProps) {
  return (
    <div
      className={twMerge("flex flex-1 items-center p-2 font-normal", className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

const DivTable = {
  Container,
  Row,
  Data,
  // Body,
  AccordionContent: PrimitiveAccordion.Content,
};

export { DivTable };
