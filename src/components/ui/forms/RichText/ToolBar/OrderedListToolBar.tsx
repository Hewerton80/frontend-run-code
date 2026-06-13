import { ListOrdered } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const OrderedListToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      isActive={editorState.isOrderedList}
      icon={<ListOrdered className="size-4" />}
      tooltipTextContent="Ordered List"
    />
  );
});

OrderedListToolBar.displayName = "OrderedListToolBar";
