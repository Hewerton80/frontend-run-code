import { useTypeWriterText } from "@/hooks/useTypeWriterText";
import { cn } from "@/utils/cn";

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
      className={cn(
        "bg-muted text-sm p-3 rounded-lg min-h-11 overflow-auto",
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: typeWriterText,
      }}
    />
  );
}
