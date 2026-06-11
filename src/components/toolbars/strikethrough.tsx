import { Strikethrough } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/buttons/Button";
import { cn } from "@/utils/cn";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Tooltip } from "../ui/overlay/Tooltip";

const StrikeThroughToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <Tooltip
        textContent={
          <>
            <span>Strikethrough</span>
            <span className="ml-1 text-xs text-gray-11">(cmd + shift + x)</span>
          </>
        }
      >
        <Button
          variantStyle="dark-ghost"
          // size="icon"
          className={cn(
            "size-8 min-h-8 min-w-8 max-w-8 max-h-8 px-0! py-0! p-0.5! ",
            editor?.isActive("strike") && "bg-accent",
            className,
          )}
          onClick={(e) => {
            editor?.chain().focus().toggleStrike().run();
            onClick?.(e);
          }}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          ref={ref}
          {...props}
        >
          {children || <Strikethrough className="h-4 w-4" />}
        </Button>
      </Tooltip>
    );
  },
);

StrikeThroughToolbar.displayName = "StrikeThroughToolbar";

export { StrikeThroughToolbar };
