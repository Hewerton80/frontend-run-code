import { SeparatorHorizontal } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const HorizontalRuleToolBar = memo(() => {
  const { editor } = useToolbar();

  return (
    <ToolBarButton
      onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      icon={<SeparatorHorizontal className="size-4" />}
      tooltipTextContent="Horizontal Rule"
    />
  );
});

HorizontalRuleToolBar.displayName = "HorizontalRuleToolBar";
