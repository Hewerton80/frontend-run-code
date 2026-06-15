import { Image } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo } from "react";

export const ImagePlaceholderToolbar = memo(() => {
  const { editor, editorState } = useToolbar();

  return (
    <ToolBarButton
      // onClick={() => editor?.chain().focus().insertImagePlaceholder().run()}
      disabled={!editorState.isImagePlaceholder}
      icon={<Image className="size-4" />}
      tooltipTextContent="Image"
    />
  );
});

ImagePlaceholderToolbar.displayName = "ImagePlaceholderToolbar ";
