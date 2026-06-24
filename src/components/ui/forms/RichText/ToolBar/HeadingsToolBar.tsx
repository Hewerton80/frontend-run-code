import { memo, useMemo } from "react";
import { useToolbar } from "./ToolBarProvider";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { Button } from "@/components/ui/buttons/Button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { HEADING_LEVELS } from "@/utils/tiptapHelpers";

const activeHeadingClass = "bg-accent text-accent-foreground";

export const HeadingsToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  const activeLevel = useMemo(() => {
    if (editorState?.isParagraph) return null;
    return (
      HEADING_LEVELS.find((level) => editorState?.isHeading(level)) || null
    );
  }, [editorState]);

  return (
    //TODO Mudar para Select

    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button
          className={cn(
            "text-xs! min-h-8 max-h-8 min-w-fit max-w-fit px-2!",
            '**:[[role="img"]]:ml-1',
          )}
          variantStyle="dark-ghost"
          rightIcon={<ChevronDown className="size-4" />}
        >
          {activeLevel ? `H${activeLevel}` : "Normal"}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item
          role="option"
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className={cn(editorState?.isParagraph && activeHeadingClass)}
        >
          Normal
        </Dropdown.Item>
        {HEADING_LEVELS.map((level) => (
          <Dropdown.Item
            key={`heading-${level}`}
            role="option"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level }).run()
            }
            className={cn(
              "text-xs",
              editorState?.isHeading(level) && activeHeadingClass,
            )}
          >
            H{level}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
});

HeadingsToolBar.displayName = "HeadingsToolBar";
