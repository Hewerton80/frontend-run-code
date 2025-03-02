"use client";

import dynamic from "next/dynamic";
import { ComponentProps, useId, useState } from "react";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { languagesConfig } from "@/utils/languagesConfig";
import { Picker } from "../../forms/selects/Picker/Picker";
import { LanguageNames } from "@/types/languagesName";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Modal } from "../../overlay/Modal";
import { IconButton } from "../../buttons/IconButton";
import { Tooltip } from "../../overlay/Tooltip";

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
  const [showScriptCodeExample, setShowScriptCodeExample] = useState(false);

  const currentSelectLanguage = languagesConfig[mode as LanguageNames];

  const defautulAceEditorProps: ComponentProps<typeof AceEditor> = {
    mode: currentSelectLanguage.editorName,
    fontSize: 18,
    className: "rounded-2xl",
    theme: "github_dark",
    style: { height: "100%", width: "100%" },
    showPrintMargin: false,
    highlightActiveLine: false,
    editorProps: { $blockScrolling: true },
    setOptions: {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      enableMobileMenu: true,
      showLineNumbers: true,
    },
  };

  const modeOptions = Object.keys(languagesConfig).map((key) => ({
    label: (
      <span className="flex items-center gap-2">
        {languagesConfig[key as LanguageNames].icon}
        {key}
      </span>
    ),
    value: key,
  }));

  return (
    <>
      <div className="flex flex-col h-full w-full gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex max-w-[13.625rem] w-full">
            <Picker
              showLabelInner
              full
              label="Language"
              value={mode}
              onChange={setMode}
              options={modeOptions}
            />
          </div>
          <div className="flex items-center gap-2">
            <Tooltip textContent="See script example" side="top">
              <IconButton
                onClick={() => setShowScriptCodeExample(true)}
                variantStyle="dark-ghost"
                icon={<FaRegCircleQuestion />}
              />
            </Tooltip>
          </div>
        </div>
        <AceEditor
          {...defautulAceEditorProps}
          value={value}
          onChange={onChange}
          name={UNIQUE_ID_OF_DIV}
          placeholder="Type your code here..."
        />
      </div>
      <Modal.Root
        show={showScriptCodeExample}
        onClose={() => setShowScriptCodeExample(false)}
        size="md"
      >
        <Modal.Title>Script Example</Modal.Title>
        <Modal.Body>
          <div className="h-[524px]">
            <AceEditor
              {...defautulAceEditorProps}
              readOnly
              defaultValue={currentSelectLanguage?.example}
              name={`${UNIQUE_ID_OF_DIV}-example`}
            />
          </div>
        </Modal.Body>
      </Modal.Root>
    </>
  );
}
