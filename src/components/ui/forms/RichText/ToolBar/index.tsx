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
import { LinkToolbar } from "./LinkTollBar";

interface ToolBarProps {
  editor: Editor;
}

export const ToolBar = memo(({ editor }: ToolBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full items-center p-2 justify-between border-b sticky top-0 left-0 bg-background z-20">
      <div className="flex items-center gap-2">
        <ToolbarProvider editor={editor}>
          <UndoToolBar />
          <RedoToolBar />
          <Separator orientation="vertical" className="h-7" />
          <BoldToolBar />
          <ItalicToolBar />
          <StrikeToolBar />
          <UnderlineToolBar />
          <LinkToolbar />
          <Separator orientation="vertical" className="h-7" />
          <BulletListToolBar />
          <OrderedListToolBar />
          <Separator orientation="vertical" className="h-7" />
          <CodeToolBar />
          <CodeBlockToolBar />
          <Separator orientation="vertical" className="h-7" />
          <HorizontalRuleToolBar />
          <BlockquoteToolBar />
          <HardBreakToolBar />
          <Separator orientation="vertical" className="h-7" />
        </ToolbarProvider>
      </div>
    </div>
  );
});

ToolBar.displayName = "ToolBar";
