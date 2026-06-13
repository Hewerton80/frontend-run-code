import { Underline } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const UnderlineToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      isActive={editorState.isUnderline}
      disabled={!editorState.canUnderline}
      icon={<Underline className="size-4" />}
      tooltipTextContent={
        <>
          <span>Underline</span>
          <span className="ml-1 text-xs text-accent-foreground">(cmd + u)</span>
        </>
      }
    />
  );
});

UnderlineToolBar.displayName = "UnderlineToolBar";
