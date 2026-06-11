import { ListOrdered } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/buttons/Button";
import { cn } from "@/utils/cn";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Tooltip } from "../ui/overlay/Tooltip";

const OrderedListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <Tooltip textContent={<span>Ordered list</span>}>
        <Button
          variantStyle="dark-ghost"
          className={cn(
            "size-8 min-h-8 min-w-8 max-w-8 max-h-8 px-0! py-0! p-0.5! ",
            editor?.isActive("orderedList") && "bg-accent",
            className,
          )}
          onClick={(e) => {
            editor?.chain().focus().toggleOrderedList().run();
            onClick?.(e);
          }}
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          ref={ref}
          {...props}
        >
          {children || <ListOrdered className="h-4 w-4" />}
        </Button>
      </Tooltip>
    );
  },
);

OrderedListToolbar.displayName = "OrderedListToolbar";

export { OrderedListToolbar };
