import { cn } from "@/utils/cn";
import { memo } from "react";

interface CodeProps {
  className?: string;
  htmlContent?: string;
}
export const Code = memo(({ className, htmlContent = "" }: CodeProps) => {
  return (
    <code
      className={cn("font-[monospace] whitespace-pre", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
});

Code.displayName = "Code";
