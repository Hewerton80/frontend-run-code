import { useTypeWriterText } from "@/hooks/useTypeWriterText";
import { CodeEditor } from "../../forms/inputs/CodeEditor";
import { memo } from "react";

interface TerminalCodeProps {
  content?: string;
  animation?: boolean;
}

export const TerminalCode = memo(
  ({ content = "", animation = true }: TerminalCodeProps) => {
    const { typeWriterText } = useTypeWriterText({ text: content, animation });

    return (
      <CodeEditor
        className="rounded-lg"
        value={typeWriterText}
        readOnly
        theme="terminal"
        fontSize="0.875rem"
        style={{ minHeight: "auto" }}
        minLines={1}
        maxLines={Infinity}
        setOptions={{ displayIndentGuides: false }}
        scrollMargin={[8, 8]}
      />
    );
  },
);
TerminalCode.displayName = "TerminalCode";
