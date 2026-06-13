import { StrikethroughIcon } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const StrikeToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      isActive={editorState.isStrike}
      disabled={!editorState.canStrike}
      icon={<StrikethroughIcon className="size-4" />}
      tooltipTextContent={
        <>
          <span>Strike Through</span>
          <span className="ml-1 text-xs text-accent-foreground">
            (cmd + shift + x)
          </span>
        </>
      }
    />
  );
});

StrikeToolBar.displayName = "StrikeToolBar";
