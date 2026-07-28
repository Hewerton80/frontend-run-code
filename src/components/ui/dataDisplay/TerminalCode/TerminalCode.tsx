import { useTypeWriterText } from "@/hooks/useTypeWriterText";
import { cn } from "@/utils/cn";
import { isString } from "@tiptap/core";
import { memo, ReactNode } from "react";

interface TerminalCodeProps {
  children?: ReactNode;
  animation?: boolean;
  className?: string;
}

export const TerminalCode = memo(
  ({ children, animation = true, className }: TerminalCodeProps) => {
    const { typeWriterText } = useTypeWriterText({
      text: isString(children) ? children : "",
      animation,
    });
    const handledContent = isString(children) ? typeWriterText : children;

    return (
      <pre
        className={cn(
          "whitespace-pre-wrap border border-white/10 border-l-4 border-l-white/10",
          "p-3 bg-muted rounded-xl",
          className,
        )}
      >
        <code className="text-sm font-code">{handledContent}</code>
      </pre>
    );
  },
);
TerminalCode.displayName = "TerminalCode";
