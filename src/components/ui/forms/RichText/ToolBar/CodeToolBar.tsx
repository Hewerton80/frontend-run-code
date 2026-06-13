import { Code2 } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const CodeToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleCode().run()}
      isActive={editorState.isCode}
      disabled={!editorState.canCode}
      icon={<Code2 className="size-4" />}
      tooltipTextContent="Code"
    />
  );
});

CodeToolBar.displayName = "CodeToolBar";
