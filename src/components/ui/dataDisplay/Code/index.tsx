import { cn } from "@/utils/cn";
import { memo } from "react";

interface CodeProps {
  className?: string;
  htmlContent?: string;
}
export const Code = memo(({ className, htmlContent = "" }: CodeProps) => {
  return (
    <pre className={className}>
      <code
        className={cn("font-code text-sm whitespace-pre")}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </pre>
  );
});

Code.displayName = "Code";
