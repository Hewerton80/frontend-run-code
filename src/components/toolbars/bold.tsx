import { BoldIcon } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/buttons/Button";
import { cn } from "@/utils/cn";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import type { Extension } from "@tiptap/core";
import type { StarterKitOptions } from "@tiptap/starter-kit";
import { Tooltip } from "../ui/overlay/Tooltip";

type StarterKitExtensions = Extension<StarterKitOptions, any>;

const BoldToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <Tooltip
        textContent={
          <>
            <span>Bold</span>
            <span className="ml-1 text-xs text-gray-11">(cmd + b)</span>
          </>
        }
      >
        <Button
          variantStyle="dark-ghost"
          // size="icon"
          className={cn(
            "size-8 min-h-8 min-w-8 max-w-8 max-h-8 px-0! py-0! p-0.5! ",
            editor?.isActive("bold") && "bg-accent",
            className,
          )}
          onClick={(e) => {
            editor?.chain().focus().toggleBold().run();
            onClick?.(e);
          }}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          ref={ref}
          {...props}
        >
          {children || <BoldIcon className="h-4 w-4" />}
        </Button>
      </Tooltip>
    );
  },
);

BoldToolbar.displayName = "BoldToolbar";

export { BoldToolbar };
