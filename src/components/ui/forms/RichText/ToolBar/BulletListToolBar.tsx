import { List } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const BulletListToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      isActive={editorState.isBulletList}
      icon={<List className="size-4" />}
      tooltipTextContent="Bullet List"
    />
  );
});

BulletListToolBar.displayName = "BulletListToolBar";
