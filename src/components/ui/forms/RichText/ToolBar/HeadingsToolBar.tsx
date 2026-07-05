import { memo, useCallback, useMemo } from "react";
import { useToolbar } from "./ToolBarProvider";
import { cn } from "@/utils/cn";
import { EditorLevel, HEADING_LEVELS } from "@/utils/tiptapHelpers";
import { CustomSelect } from "../../selects/CustomSelect";

const PARAGRAPH = "Normal";

export const HeadingsToolBar = memo(() => {
  const { editor, editorState } = useToolbar();

  const activeLevel = useMemo(() => {
    if (editorState?.isParagraph) return PARAGRAPH;
    return (
      HEADING_LEVELS.find((level) => editorState?.isHeading(level)) || null
    );
  }, [editorState]);

  const options = useMemo(() => [PARAGRAPH, ...HEADING_LEVELS], []);

  const displayItem = useCallback((level: string | EditorLevel) => {
    return (
      <span className="text-xs pr-4">
        {level === PARAGRAPH ? PARAGRAPH : `H${level}`}
      </span>
    );
  }, []);

  const renderItem = useCallback(
    (level: string | EditorLevel) => {
      return (
        <span
          key={`heading-${level}`}
          className="text-xs"
          role="option"
          onClick={() => {
            if (level === PARAGRAPH) {
              editor?.chain().focus().setParagraph().run();
            } else if (typeof level === "number") {
              editor?.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          {level === PARAGRAPH ? PARAGRAPH : `H${level}`}
        </span>
      );
    },
    [editor],
  );

  const handleChangeValue = useCallback(
    (level: string | EditorLevel | null) => {
      console.log("handleChangeValue", level);
      if (level === PARAGRAPH) {
        editor?.chain().focus().setParagraph().run();
      } else if (typeof level === "number") {
        editor?.chain().focus().toggleHeading({ level }).run();
      }
    },
    [editor],
  );

  return (
    <div
      className={cn(
        '**:[[role="combobox"]]:text-xs! **:[[role="combobox"]]:min-h-8',
        '**:[[role="combobox"]]:max-h-8 **:[[role="combobox"]]:min-w-fit',
        '**:[[role="combobox"]]:px-2! **:[[role="combobox"]]:border-0',
        '**:[[role="combobox"]]:bg-transparent **:[[role="combobox"]]:text-accent-foreground',
        '**:[[role="combobox"]]:hover:bg-accent **:[[role="combobox"]]:hover:text-accent-foreground',
        '**:[[role="chevron"]]:right-2 **:[[role="chevron"]]:text-accent-foreground',
      )}
    >
      <CustomSelect
        value={activeLevel || PARAGRAPH}
        valueExtractor={(level) => level.toString()}
        items={options}
        placeholder={PARAGRAPH}
        displayItem={displayItem}
        onChangeValue={handleChangeValue}
        renderItem={renderItem}
      />
    </div>
  );
});

HeadingsToolBar.displayName = "HeadingsToolBar";
