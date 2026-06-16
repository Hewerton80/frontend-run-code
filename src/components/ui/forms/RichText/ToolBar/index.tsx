import { Editor } from "@tiptap/core";
import { memo } from "react";
import { Separator } from "@/components/ui/separator";
import { ToolbarProvider } from "./ToolBarProvider";
import { UndoToolBar } from "./UndoToolBar";
import { RedoToolBar } from "./RedoToolBar";
import { BoldToolBar } from "./BoldToolBar";
import { ItalicToolBar } from "./ItalicToolBar";
import { StrikeToolBar } from "./StrikeToolBar";
import { UnderlineToolBar } from "./UnderlineToolBar";
import { BulletListToolBar } from "./BulletListToolBar";
import { OrderedListToolBar } from "./OrderedListToolBar";
import { CodeToolBar } from "./CodeToolBar";
import { CodeBlockToolBar } from "./CodeBlockToolBar";
import { HorizontalRuleToolBar } from "./HorizontalRuleToolBar";
import { BlockquoteToolBar } from "./BlockquoteToolBar";
import { HardBreakToolBar } from "./HardBreakToolBar";
import { ImageToolBar } from "./ImageToolbar";
import { LinkToolbar } from "./LinkTollBar";
import { HeadingsToolBar } from "./HeadingsToolBar";
import { AlignmentToolbar } from "./AlignmentTooolbar";
import { MathToolBar } from "./MathToolbar";

interface ToolBarProps {
  editor: Editor;
}

// TODO adicionar images, tables, etc
// https://tiptap.dev/docs/editor/extensions/nodes/mathematics
export const ToolBar = memo(({ editor }: ToolBarProps) => {
  if (!editor) {
    return null;
  }
  const separator = <Separator orientation="vertical" className="h-7" />;

  return (
    <div className="flex w-full items-center p-2 justify-between border-b sticky top-0 left-0 bg-background z-20">
      <div className="flex items-center gap-2">
        <ToolbarProvider editor={editor}>
          <UndoToolBar />
          <RedoToolBar />
          {separator}
          <BoldToolBar />
          <ItalicToolBar />
          <StrikeToolBar />
          <UnderlineToolBar />
          <LinkToolbar />
          {separator}
          <HeadingsToolBar />
          {separator}
          <AlignmentToolbar />
          {separator}
          <BulletListToolBar />
          <OrderedListToolBar />
          {separator}
          <CodeToolBar />
          <CodeBlockToolBar />
          {separator}
          <HorizontalRuleToolBar />
          <BlockquoteToolBar />
          <HardBreakToolBar />
          {separator}
          <ImageToolBar />
          {separator}
          <MathToolBar />
        </ToolbarProvider>
      </div>
    </div>
  );
});

ToolBar.displayName = "ToolBar";
