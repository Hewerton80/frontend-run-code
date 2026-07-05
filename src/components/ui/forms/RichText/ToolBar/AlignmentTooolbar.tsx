import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { memo, ReactNode, useCallback, useMemo } from "react";
import { useToolbar } from "./ToolBarProvider";
import { Alignment } from "@/utils/tiptapHelpers";
import { cn } from "@/utils/cn";
import { CustomSelect } from "../../selects/CustomSelect";

type AlignmentOption = {
  value: Alignment;
  icon: ReactNode;
  label: string;
};

const ALIGNMENT_OPTIONS: AlignmentOption[] = [
  {
    value: "left",
    icon: <AlignLeft className="size-4" />,
    label: "Align Left",
  },
  {
    value: "center",
    icon: <AlignCenter className="size-4" />,
    label: "Align Center",
  },
  {
    value: "right",
    icon: <AlignRight className="size-4" />,
    label: "Align Right",
  },
  {
    value: "justify",
    icon: <AlignJustify className="size-4" />,
    label: "Justify",
  },
];

export const AlignmentToolbar = memo(() => {
  const { editor, editorState } = useToolbar();

  const currentTextAlign = useMemo<Alignment>(() => {
    if (editorState?.isTextAlign("center")) return "center";
    if (editorState?.isTextAlign("right")) return "right";
    if (editorState?.isTextAlign("justify")) return "justify";
    return "left";
  }, [editorState]);

  const currentAlignmentOption = useMemo(
    () =>
      ALIGNMENT_OPTIONS.find((opt) => opt.value === currentTextAlign) ??
      ALIGNMENT_OPTIONS[0],
    [currentTextAlign],
  );

  const displayItem = useCallback((item: AlignmentOption) => {
    return (
      <span className="flex items-center gap-1 text-xs pr-4">
        {item.icon}
        {item.label}
      </span>
    );
  }, []);

  const renderItem = useCallback(
    (item: AlignmentOption) => {
      return (
        <span
          key={item.value}
          className="flex items-center gap-2 text-xs"
          role="option"
          onClick={() => {
            editor?.chain().focus().setTextAlign(item.value).run();
          }}
        >
          {item.icon}
          {item.label}
        </span>
      );
    },
    [editor],
  );

  const handleChangeValue = useCallback(
    (item: AlignmentOption | null) => {
      if (item) {
        editor?.chain().focus().setTextAlign(item.value).run();
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
        value={currentAlignmentOption}
        valueExtractor={(item) => item.value}
        items={ALIGNMENT_OPTIONS}
        placeholder="Align Left"
        displayItem={displayItem}
        onChangeValue={handleChangeValue}
        renderItem={renderItem}
      />
    </div>
  );
});

AlignmentToolbar.displayName = "AlignmentToolbar";
