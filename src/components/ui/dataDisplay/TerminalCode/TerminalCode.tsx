import { twMerge } from "tailwind-merge";
import { TypeWriterText } from "../../typography/TypeWriterText";

interface TerminalCodeProps {
  className?: string;
  content?: string;
}

export function TerminalCode({ className, content = "" }: TerminalCodeProps) {
  return (
    <code
      className={twMerge("bg-muted text-sm p-3 rounded-lg min-h-11 overflow-auto", className)}
    >
      <TypeWriterText text={content} />
    </code>
  );
}
