import { List } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/buttons/Button";

import { cn } from "@/utils/cn";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Tooltip } from "../ui/overlay/Tooltip";

const BulletListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    return (
      <Tooltip textContent={<span>Bullet list</span>}>
        <Button
          variantStyle="dark-ghost"
          // size="icon"
          className={cn(
            "size-8 min-h-8 min-w-8 max-w-8 max-h-8 px-0! py-0! p-0.5! ",
            editor?.isActive("bulletList") && "bg-accent",
            className,
          )}
          onClick={(e) => {
            editor?.chain().focus().toggleBulletList().run();
            onClick?.(e);
          }}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          ref={ref}
          {...props}
        >
          {children || <List className="h-4 w-4" />}
        </Button>
      </Tooltip>
    );
  },
);

BulletListToolbar.displayName = "BulletListToolbar";

export { BulletListToolbar };
