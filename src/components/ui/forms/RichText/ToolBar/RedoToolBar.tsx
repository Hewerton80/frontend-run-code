import { CornerUpRight } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const RedoToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().redo().run()}
      disabled={!editorState.canRedo}
      icon={<CornerUpRight className="size-4" />}
      tooltipTextContent="Redo"
    />
  );
});

RedoToolBar.displayName = "RedoToolBar";
