import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ComponentProps, useId } from "react";
import AceEditor from "react-ace";
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
import { cn } from "@/utils/cn";

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

export function CodeEditor({
  className,
  style,
  setOptions,
  readOnly,
  ...props
}: CodeEditorProps) {
  const UNIQUE_ID_OF_DIV = useId();

  return (
    <AceEditor
      name={UNIQUE_ID_OF_DIV}
      fontSize="1rem"
      className={cn("rounded-2xl", className)}
      theme="monokai"
      readOnly={readOnly}
      style={{
        // height: "100%",
        // minHeight: 400,
        width: "100%",
        zIndex: 0,
        ...(style || {}),
      }}
      showPrintMargin={false}
      highlightActiveLine={readOnly ? false : true}
      showGutter={true}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableSnippets: true,
        enableMobileMenu: true,
        showLineNumbers: true,
        enableBasicAutocompletion: true,
        displayIndentGuides: true,
        enableEmmet: true,
        spellcheck: true,
        tooltipFollowsMouse: true,
        tabSize: 2,
        wrap: true,
        showFoldWidgets: true,
        ...(setOptions || {}),
      }}
      {...props}
    />
  );
}
