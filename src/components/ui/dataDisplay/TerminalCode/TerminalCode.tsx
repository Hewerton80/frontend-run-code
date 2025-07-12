import { twMerge } from "tailwind-merge";
import { TypeWriterText } from "../../typography/TypeWriterText";
import { useMemo, Children } from "react";
import { useTypeWriterText } from "@/hooks/useTypeWriterText";

interface TerminalCodeProps {
  className?: string;
  content?: string;
}

export function TerminalCode({ className, content = "" }: TerminalCodeProps) {
  const { typeWriterText } = useTypeWriterText({
    text: content,
    parseTextToHtmlFormat: true,
  });

  return (
    <code
      className={twMerge(
        "bg-muted text-sm p-3 rounded-lg min-h-11 overflow-auto",
        className
      )}
      dangerouslySetInnerHTML={{
        __html: typeWriterText,
      }}
    />
  );
}
