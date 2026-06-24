import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
} from "lucide-react";
import { memo, ReactNode, useCallback, useMemo } from "react";
import { useToolbar } from "./ToolBarProvider";
import { Alignment } from "@/utils/tiptapHelpers";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/buttons/Button";

export const AlignmentToolbar = memo(() => {
  const { editor, editorState } = useToolbar();

  const handleAlign = useCallback(
    (value: Alignment) => {
      editor?.chain().focus().setTextAlign(value).run();
    },
    [editor],
  );

  const currentTextAlign = useMemo<Alignment | null>(() => {
    if (editorState?.isTextAlign("left")) return "left";
    if (editorState?.isTextAlign("center")) return "center";
    if (editorState?.isTextAlign("right")) return "right";
    if (editorState?.isTextAlign("justify")) return "justify";

    return "left";
  }, [editorState]);

  const alignmentOptionsMap = useMemo<
    Record<Alignment, { icon: ReactNode; label: string }>
  >(
    () => ({
      left: { icon: <AlignLeft className="size-4" />, label: "Align Left" },
      center: {
        icon: <AlignCenter className="size-4" />,
        label: "Align Center",
      },
      right: { icon: <AlignRight className="size-4" />, label: "Align Right" },
      justify: { icon: <AlignJustify className="size-4" />, label: "Justify" },
    }),
    [],
  );

  const currentAlignmentOption = useMemo(
    () => alignmentOptionsMap[currentTextAlign!],
    [currentTextAlign, alignmentOptionsMap],
  );

  return (
    //TODO Mudar para Select
    <Dropdown.Root modal={true}>
      <Dropdown.Trigger asChild>
        <Button
          className={cn("text-xs! min-h-8 max-h-8 min-w-fit max-w-fit px-2!")}
          variantStyle="dark-ghost"
          leftIcon={currentAlignmentOption.icon}
          rightIcon={<ChevronDown className="size-4" />}
        >
          {currentAlignmentOption.label}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {Object.entries(alignmentOptionsMap).map(([key, { icon, label }]) => {
          const alignmentKey = key as Alignment;
          return (
            <Dropdown.Item
              key={alignmentKey}
              role="option"
              onClick={() => handleAlign(alignmentKey)}
              className={cn(
                currentTextAlign === alignmentKey &&
                  "text-xs bg-accent text-accent-foreground",
              )}
            >
              {icon}
              <span className="ml-2">{label}</span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
});

AlignmentToolbar.displayName = "AlignmentToolbar";
