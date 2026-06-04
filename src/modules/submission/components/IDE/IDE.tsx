import { useEffect, useId, useMemo, useState } from "react";
import {
  LanguagesConfigMap,
  LANGUAGES_CONFIG_MAP,
  LIST_OF_LANGUAGES,
} from "@/modules/language/utils/languagesConfig";
import { Picker } from "../../../../components/ui/forms/selects/Picker/Picker";
import { LanguageNames } from "@/modules/language/utils/languagesName";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Modal } from "../../../../components/ui/overlay/Modal";
import { IconButton } from "../../../../components/ui/buttons/IconButton";
import { Tooltip } from "../../../../components/ui/overlay/Tooltip";
import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { CodeEditor } from "../../../../components/ui/forms/inputs/CodeEditor";
import { Select } from "@/components/ui/forms/selects";
import { CustomSelect } from "@/components/ui/forms/selects/CustomSelect";

interface IdeProps {
  value?: string;
  onChange?: (value: string) => void;
  avaliableLanguages?: LanguageNames[];
}

export function IDE({ value, avaliableLanguages, onChange }: IdeProps) {
  const { languageMode, changeLanguageMode } = useLanguage();
  // Array.isArray(avaliableLanguages) && avaliableLanguages?.length > 0
  //   ? avaliableLanguages[0]
  //   : "javascript"
  const [showScriptCodeExample, setShowScriptCodeExample] = useState(false);

  const avaliablesLanguagesConfig = useMemo<LanguagesConfigMap>(() => {
    if (Array.isArray(avaliableLanguages) && avaliableLanguages?.length > 0) {
      return avaliableLanguages.reduce((acc, key) => {
        if (LANGUAGES_CONFIG_MAP?.[key]) {
          acc[key] = LANGUAGES_CONFIG_MAP[key];
        }
        return acc;
      }, {} as LanguagesConfigMap);
    }

    return LANGUAGES_CONFIG_MAP;
  }, [avaliableLanguages]);

  const currentSelectLanguage = useMemo(
    () => avaliablesLanguagesConfig[languageMode.value],
    [avaliablesLanguagesConfig, languageMode],
  );

  // useEffect(() => {
  //   if (!Array.isArray(avaliableLanguages) || !avaliableLanguages?.length)
  //     return;
  //   changeLanguageMode(avaliableLanguages[0]);
  // }, [changeLanguageMode, avaliableLanguages]);

  // const modeOptions = useMemo(() => {
  //   return Object.keys(avaliablesLanguagesConfig).map((key) => ({
  //     label: (
  //       <span className="flex items-center gap-2">
  //         <img
  //           src={avaliablesLanguagesConfig[key as LanguageNames].url}
  //           alt={key}
  //           width={14}
  //           height={14}
  //         />
  //         {key}
  //       </span>
  //     ),
  //     value: key,
  //   }));
  // }, [avaliablesLanguagesConfig]);

  return (
    <>
      <div className="flex flex-col h-full w-full gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex max-w-[13.625rem] w-full">
            {/* <Picker
              defaultValue={languageMode}
              showLabelInner
              full
              label="Language"
              value={languageMode}
              onChange={changeLanguageMode}
              options={modeOptions}
              disabled={modeOptions?.length <= 1}
            /> */}
            {/* <Select
              value={languageMode}
              onChange={(option) =>
                changeLanguageMode(option)
              }
              options={LIST_OF_LANGUAGES}
              placeholder="Select language"
              disabled={modeOptions?.length <= 1}
            /> */}
            <CustomSelect
              items={LIST_OF_LANGUAGES}
              value={languageMode}
              onChangeValue={(item) => item && changeLanguageMode(item)}
              placeholder="Select language"
              disabled={LIST_OF_LANGUAGES?.length <= 1}
              displayItem={(item) => (
                <span className="flex items-center gap-2">
                  <img src={item.url} alt={item.label} width={14} height={14} />
                  {item.label}
                </span>
              )}
              renderItem={(item) => (
                <span className="flex items-center gap-2">
                  <img src={item.url} alt={item.label} width={14} height={14} />
                  {item.label}
                </span>
              )}
              // displayItem={(item) => (
              //   <span className="flex items-center gap-2">
              //     <img src={item.url} alt={item.label} width={14} height={14} />
              //     {item.label}
              //   </span>
              // )}
              valueExtractor={(item) => item.value}
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
          mode={currentSelectLanguage?.editorName}
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
              mode={currentSelectLanguage?.editorName}
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
