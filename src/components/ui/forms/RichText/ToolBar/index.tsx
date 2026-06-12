import { Editor } from "@tiptap/core";
import { memo } from "react";
import { ToolBarButton } from "./ToolBarButton";
import {
  BoldIcon,
  Code,
  Code2,
  CornerUpLeft,
  CornerUpRight,
  ItalicIcon,
  List,
  ListOrdered,
  SeparatorHorizontal,
  StrikethroughIcon,
  TextQuote,
  WrapText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { EditorStateSnapshot, useEditorState } from "@tiptap/react";

function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // Text formatting
    isBold: ctx.editor.isActive("bold") ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive("italic") ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
    isStrike: ctx.editor.isActive("strike") ?? false,
    canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
    isCode: ctx.editor.isActive("code") ?? false,
    canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

    // Block types
    isParagraph: ctx.editor.isActive("paragraph") ?? false,
    isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
    isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
    isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
    isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
    isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
    isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,

    // Lists and blocks
    isBulletList: ctx.editor.isActive("bulletList") ?? false,
    canBulletList: ctx.editor.can().chain().toggleBulletList().run() ?? false,
    isOrderedList: ctx.editor.isActive("orderedList") ?? false,
    canOrderedList: ctx.editor.can().chain().toggleOrderedList().run() ?? false,
    isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
    canCodeBlock: ctx.editor.can().chain().toggleCodeBlock().run() ?? false,
    isBlockquote: ctx.editor.isActive("blockquote") ?? false,
    canBlockquote: ctx.editor.can().chain().toggleBlockquote().run() ?? false,
    isHardBreak: ctx.editor.isActive("hardBreak") ?? false,
    canHardBreak: ctx.editor.can().chain().setHardBreak().run() ?? false,

    // History
    canUndo: ctx.editor.can().chain().undo().run() ?? false,
    canRedo: ctx.editor.can().chain().redo().run() ?? false,
  };
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>;

interface ToolBarProps {
  editor: Editor;
}

export const ToolBar = memo(({ editor }: ToolBarProps) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="flex w-full items-center p-2 justify-between border-b sticky top-0 left-0 bg-background z-20">
      <div className="flex items-center gap-2">
        <ToolBarButton
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          icon={<CornerUpLeft className="size-4" />}
          tooltipTextContent="Undo"
        />
        <ToolBarButton
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          icon={<CornerUpRight className="size-4" />}
          tooltipTextContent="Redo"
        />
        <Separator orientation="vertical" className="h-7" />
        <ToolBarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editorState.isBold}
          disabled={!editorState.canBold}
          icon={<BoldIcon className="size-4" />}
          tooltipTextContent={
            <>
              <span>Bold</span>
              <span className="ml-1 text-xs text-accent-foreground">
                (cmd + b)
              </span>
            </>
          }
        />
        <ToolBarButton
          isActive={editorState.isItalic}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          icon={<ItalicIcon className="size-4" />}
          tooltipTextContent={
            <>
              <span>Italic</span>
              <span className="ml-1 text-xs text-accent-foreground">
                (cmd + i)
              </span>
            </>
          }
        />
        <ToolBarButton
          isActive={editorState.isStrike}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          icon={<StrikethroughIcon className="size-4" />}
          tooltipTextContent={
            <>
              <span>Strike Through</span>
              <span className="ml-1 text-xs text-accent-foreground">
                (cmd + shift + x)
              </span>
            </>
          }
        />
        <Separator orientation="vertical" className="h-7" />

        <ToolBarButton
          isActive={editorState.isBulletList}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          icon={<List className="size-4" />}
          tooltipTextContent="Bullet List"
        />
        <ToolBarButton
          isActive={editorState.isOrderedList}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          icon={<ListOrdered className="size-4" />}
          tooltipTextContent="Ordered List"
        />
        <Separator orientation="vertical" className="h-7" />

        <ToolBarButton
          isActive={editorState.isCode}
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          icon={<Code2 className="size-4" />}
          tooltipTextContent="Code"
        />
        <ToolBarButton
          isActive={editorState.isCodeBlock}
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editorState.canCodeBlock}
          icon={<Code className="size-4" />}
          tooltipTextContent="Code Block"
        />
        <Separator orientation="vertical" className="h-7" />

        <ToolBarButton
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          icon={<SeparatorHorizontal className="size-4" />}
          tooltipTextContent="Horizontal Rule"
        />
        <ToolBarButton
          isActive={editorState.isBlockquote}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={!editorState.canBlockquote}
          icon={<TextQuote className="size-4" />}
          tooltipTextContent="Blockquote"
        />
        <ToolBarButton
          isActive={editorState.isHardBreak}
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          disabled={!editorState.canHardBreak}
          icon={<WrapText className="size-4" />}
          tooltipTextContent="Hard Break"
        />
        <Separator orientation="vertical" className="h-7" />
      </div>
    </div>
  );
});

ToolBar.displayName = "ToolBar";
