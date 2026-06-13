import { BoldIcon } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const BoldToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleBold().run()}
      isActive={editorState.isBold}
      disabled={!editorState.canBold}
      icon={<BoldIcon className="size-4" />}
      tooltipTextContent={
        <>
          <span>Bold</span>
          <span className="ml-1 text-xs text-accent-foreground">(cmd + b)</span>
        </>
      }
    />
  );
});

BoldToolBar.displayName = "BoldToolBar";
