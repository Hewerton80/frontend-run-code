import { useTypeWriterText } from "@/hooks/useTypeWriterText";
import { cn } from "@/utils/cn";
import { isString } from "@tiptap/core";
import { memo, ReactNode } from "react";

interface TerminalCodeProps {
  content?: ReactNode;
  animation?: boolean;
  className?: string;
}

export const TerminalCode = memo(
  ({ content = "", animation = true, className }: TerminalCodeProps) => {
    const { typeWriterText } = useTypeWriterText({
      text: isString(content) ? content : "",
      animation,
    });
    const handledContent = isString(content) ? typeWriterText : content;

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
