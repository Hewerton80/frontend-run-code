import { useEditorState, type Editor } from "@tiptap/react";
import React, { useContext } from "react";
import { menuBarStateSelector, MenuBarState } from "./menuBarStateSelector";

export interface ToolbarContextProps {
  editor: Editor;
  editorState: MenuBarState;
}

const ToolbarContext = React.createContext<ToolbarContextProps | null>(null);

interface ToolbarProviderProps {
  editor: Editor;
  children: React.ReactNode;
}

const ToolbarProvider = ({ editor, children }: ToolbarProviderProps) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  return (
    <ToolbarContext.Provider value={{ editor, editorState }}>
      {children}
    </ToolbarContext.Provider>
  );
};

const useToolbar = () => {
  const context = useContext(ToolbarContext);

  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }

  return context;
};

export { ToolbarProvider, useToolbar };
