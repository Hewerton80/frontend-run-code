import { TextQuote } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const BlockquoteToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      isActive={editorState.isBlockquote}
      disabled={!editorState.canBlockquote}
      icon={<TextQuote className="size-4" />}
      tooltipTextContent="Blockquote"
    />
  );
});

BlockquoteToolBar.displayName = "BlockquoteToolBar";
