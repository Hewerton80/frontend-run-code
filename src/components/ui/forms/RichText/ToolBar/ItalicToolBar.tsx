import { ItalicIcon } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const ItalicToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      isActive={editorState.isItalic}
      disabled={!editorState.canItalic}
      icon={<ItalicIcon className="size-4" />}
      tooltipTextContent={
        <>
          <span>Italic</span>
          <span className="ml-1 text-xs text-accent-foreground">(cmd + i)</span>
        </>
      }
    />
  );
});

ItalicToolBar.displayName = "ItalicToolBar";
