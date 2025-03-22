"use client";
import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import dynamic from "next/dynamic";
import { ComponentProps, useId } from "react";

import "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-scrypt";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-terminal";

import "ace-builds/src-noconflict/ext-language_tools";

const AceEditor = dynamic(() => import("react-ace"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-2xl" />,
});

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
      fontSize={18}
      className="rounded-2xl"
      theme="monokai"
      style={{ height: "100%", minHeight: 400, width: "100%" }}
      showPrintMargin={false}
      highlightActiveLine={false}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        enableMobileMenu: true,
        showLineNumbers: true,
      }}
      {...props}
    />
  );
}
