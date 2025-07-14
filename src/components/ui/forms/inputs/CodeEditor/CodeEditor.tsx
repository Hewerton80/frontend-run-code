import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ComponentProps, useId } from "react";
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-scrypt";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export type CodeEditorMode =
  | "java"
  | "javascript"
  | "python"
  | "c_cpp"
  | "scrypt"
  | (string & {});

type CodeEditorProps = Omit<
  ComponentProps<typeof AceEditor>,
  "mode" | "theme"
> & {
  mode?: CodeEditorMode;
  theme?: "monokai" | "github_dark" | "terminal" | (string & {});
};

export function CodeEditor({ ...props }: CodeEditorProps) {
  const UNIQUE_ID_OF_DIV = useId();

  return (
    <AceEditor
      name={UNIQUE_ID_OF_DIV}
      fontSize={16}
      className="rounded-2xl"
      theme="monokai"
      style={{ height: "100%", minHeight: 400, width: "100%" }}
      showPrintMargin={false}
      highlightActiveLine={true}
      showGutter={true}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableSnippets: true,
        enableMobileMenu: true,
        showLineNumbers: true,
        displayIndentGuides: true,
        enableEmmet: true,
        spellcheck: true,
        tooltipFollowsMouse: true,
        tabSize: 2,
        showFoldWidgets: true,
      }}
      {...props}
    />
  );
}
