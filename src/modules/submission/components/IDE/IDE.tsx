"use client";
import { useId, useMemo, useState } from "react";
import {
  LanguageConfig,
  languagesConfig,
} from "@/modules/language/utils/languagesConfig";
import { Picker } from "../../../../components/ui/forms/selects/Picker/Picker";
import { LanguageNames } from "@/modules/language/utils/languagesName";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Modal } from "../../../../components/ui/overlay/Modal";
import { IconButton } from "../../../../components/ui/buttons/IconButton";
import { Tooltip } from "../../../../components/ui/overlay/Tooltip";
import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { CodeEditor } from "../../../../components/ui/forms/inputs/CodeEditor";
import Image from "next/image";

interface IdeProps {
  value?: string;
  onChange?: (value: string) => void;
  avaliableLanguages?: LanguageNames[];
}

export function IDE({ value, avaliableLanguages, onChange }: IdeProps) {
  const { languageMode, changeLanguageMode } = useLanguage(
    Array.isArray(avaliableLanguages) && avaliableLanguages?.length > 0
      ? avaliableLanguages[0]
      : "javascript"
  );
  const [showScriptCodeExample, setShowScriptCodeExample] = useState(false);

  const avaliablesLanguagesConfig = useMemo<LanguageConfig>(() => {
    if (Array.isArray(avaliableLanguages) && avaliableLanguages?.length > 0) {
      return avaliableLanguages.reduce((acc, key) => {
        if (languagesConfig?.[key]) {
          acc[key] = languagesConfig[key];
        }
        return acc;
      }, {} as LanguageConfig);
    }

    return languagesConfig;
  }, [avaliableLanguages]);

  const currentSelectLanguage = useMemo(
    () => avaliablesLanguagesConfig[languageMode],
    [avaliablesLanguagesConfig, languageMode]
  );

  const modeOptions = useMemo(() => {
    return Object.keys(avaliablesLanguagesConfig).map((key) => ({
      label: (
        <span className="flex items-center gap-2">
          <Image
            src={avaliablesLanguagesConfig[key as LanguageNames].url}
            alt={key}
            width={14}
            height={14}
          />
          {key}
        </span>
      ),
      value: key,
    }));
  }, [avaliablesLanguagesConfig]);

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
