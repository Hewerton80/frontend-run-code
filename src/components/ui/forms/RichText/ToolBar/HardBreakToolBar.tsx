import { WrapText } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const HardBreakToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().setHardBreak().run()}
      isActive={editorState.isHardBreak}
      disabled={!editorState.canHardBreak}
      icon={<WrapText className="size-4" />}
      tooltipTextContent="Hard Break"
    />
  );
});

HardBreakToolBar.displayName = "HardBreakToolBar";
