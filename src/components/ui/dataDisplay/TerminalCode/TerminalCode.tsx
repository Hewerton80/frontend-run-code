import { useTypeWriterText } from "@/hooks/useTypeWriterText";
import { cn } from "@/utils/cn";
import { Code } from "../Code";
import { CodeEditor } from "../../forms/inputs/CodeEditor";
import { memo } from "react";

interface TerminalCodeProps {
  content?: string;
}

export const TerminalCode = memo(({ content = "" }: TerminalCodeProps) => {
  const { typeWriterText } = useTypeWriterText({ text: content });

  return (
    <CodeEditor
      // className="[&_.ace\_text-layer]:mx-3!"
      value={typeWriterText}
      readOnly
      theme="terminal"
      fontSize="0.875rem"
      style={{ minHeight: "auto" }}
      minLines={5}
      maxLines={Infinity}
      showGutter={false}
      setOptions={{ displayIndentGuides: false }}
      scrollMargin={[16, 16, 16, 16]}
    />
  );
});
TerminalCode.displayName = "TerminalCode";
