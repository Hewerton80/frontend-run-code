import { CornerUpRight } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/buttons/Button";
import { cn } from "@/utils/cn";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Tooltip } from "../ui/overlay/Tooltip";

const RedoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    return (
      <Tooltip textContent={<span>Redo</span>}>
        <Button
          variantStyle="dark-ghost"
          // size="icon"
          className={cn(
            "size-8 min-h-8 min-w-8 max-w-8 max-h-8 px-0! py-0! p-0.5! ",
            className,
          )}
          onClick={(e) => {
            editor?.chain().focus().redo().run();
            onClick?.(e);
          }}
          disabled={!editor?.can().chain().focus().redo().run()}
          ref={ref}
          {...props}
        >
          {children || <CornerUpRight className="h-4 w-4" />}
        </Button>
      </Tooltip>
    );
  },
);

RedoToolbar.displayName = "RedoToolbar";

export { RedoToolbar };
