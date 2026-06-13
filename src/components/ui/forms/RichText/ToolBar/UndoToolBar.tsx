import { CornerUpLeft } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const UndoToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().undo().run()}
      disabled={!editorState.canUndo}
      icon={<CornerUpLeft className="size-4" />}
      tooltipTextContent="Undo"
    />
  );
});

UndoToolBar.displayName = "UndoToolBar";
