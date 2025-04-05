"use client";
import { useId, useState } from "react";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";
import { Picker } from "../../../../components/ui/forms/selects/Picker/Picker";
import { LanguageNames } from "@/modules/language/utils/languagesName";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Modal } from "../../../../components/ui/overlay/Modal";
import { IconButton } from "../../../../components/ui/buttons/IconButton";
import { Tooltip } from "../../../../components/ui/overlay/Tooltip";
import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { CodeEditor } from "../../../../components/ui/forms/inputs/CodeEditor";

interface IdeProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function IDE({ value, onChange }: IdeProps) {
  const { languageMode, changeLanguageMode } = useLanguage();
  const [showScriptCodeExample, setShowScriptCodeExample] = useState(false);
  const currentSelectLanguage = languagesConfig[languageMode];

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
              value={languageMode}
              onChange={changeLanguageMode}
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
        <CodeEditor
          mode={currentSelectLanguage.editorName}
          value={value}
          onChange={onChange}
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
            <CodeEditor
              mode={currentSelectLanguage.editorName}
              readOnly
              defaultValue={currentSelectLanguage?.example}
              focus={false}
            />
          </div>
        </Modal.Body>
      </Modal.Root>
    </>
  );
}
