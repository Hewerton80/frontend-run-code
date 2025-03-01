"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { languagesConfig } from "@/utils/languagesConfig";
import { Picker } from "../../forms/selects/Picker/Picker";
import { LanguageNames } from "@/types/languagesName";

const AceEditor = dynamic(() => import("react-ace"), {
  ssr: false,
});

interface IdeProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function IDE({ value, onChange }: IdeProps) {
  const UNIQUE_ID_OF_DIV = useId();

  const [mode, setMode] = useState(languagesConfig["javascript"].editorName);

  const modeOptions = Object.keys(languagesConfig).map((key) => ({
    label: key,
    value: languagesConfig[key as LanguageNames].editorName,
  }));

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <div className="flex justify-end gap-2">
        <Picker showLabelInner label="Language" value={mode} onChange={setMode} options={modeOptions} />
      </div>
      <AceEditor
      className="rounded-r-2xl"
        value={value}
        onChange={onChange}
        style={{ height: "100%", width: "100%" }}
        fontSize={16}
        mode={mode}
        theme="monokai"
        name={UNIQUE_ID_OF_DIV}
        // name={UNIQUE_ID_OF_DIV}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          enableMobileMenu: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
