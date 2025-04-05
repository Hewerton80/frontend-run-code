"use client";
/* eslint-disable @typescript-eslint/no-require-imports */
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import dynamic from "next/dynamic";
import { ComponentProps, useId } from "react";

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("ace-builds/src-noconflict/ace");
    require("ace-builds/src-noconflict/mode-java");
    require("ace-builds/src-noconflict/mode-javascript");
    require("ace-builds/src-noconflict/mode-python");
    require("ace-builds/src-noconflict/mode-c_cpp");
    require("ace-builds/src-noconflict/mode-scrypt");
    require("ace-builds/src-noconflict/theme-github_dark");
    require("ace-builds/src-noconflict/theme-terminal");
    require("ace-builds/src-noconflict/theme-monokai");
    require("ace-builds/src-noconflict/ext-language_tools");
    return ace;
  },
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full rounded-2xl" />,
  }
);

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
