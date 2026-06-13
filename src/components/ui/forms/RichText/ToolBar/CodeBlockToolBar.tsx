import { Code } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const CodeBlockToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      isActive={editorState.isCodeBlock}
      disabled={!editorState.canCodeBlock}
      icon={<Code className="size-4" />}
      tooltipTextContent="Code Block"
    />
  );
});

CodeBlockToolBar.displayName = "CodeBlockToolBar";
