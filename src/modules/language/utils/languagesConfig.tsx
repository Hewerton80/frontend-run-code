import { LanguageNames } from "@/modules/language/utils/languagesName";
import { JSX } from "react";
import { FaJs, FaPython } from "react-icons/fa";
import { PiFileCppBold } from "react-icons/pi";
import {
  JSplaceholder,
  CPPplaceholder,
  PYplaceholder,
} from "./placeholderScriptLanguages";
import { CodeEditorMode } from "@/components/ui/forms/inputs/CodeEditor";

export interface LanguageConfig {
  value: LanguageNames;
  label: string;
  editorName: CodeEditorMode;
  icon: JSX.Element;
  example: string;
  url: string;
}

export type LanguagesConfigMap = Record<LanguageNames, LanguageConfig>;

const LANGUAGES_CONFIG_MAP: LanguagesConfigMap = {
  javascript: {
    value: "javascript",
    label: "JavaScript",
    editorName: "javascript",
    url: "/images/js.webp",
    icon: <FaJs />,
    example: JSplaceholder,
  },
  python: {
    value: "python",
    label: "Python",
    editorName: "python",
    url: "/images/py.webp",
    icon: <FaPython />,
    example: PYplaceholder,
  },
  cpp: {
    value: "cpp",
    label: "C++",
    editorName: "c_cpp",
    url: "/images/cpp.webp",
    icon: <PiFileCppBold />,
    example: CPPplaceholder,
  },
};

const LIST_OF_LANGUAGES = Object.values(LANGUAGES_CONFIG_MAP);

export { LANGUAGES_CONFIG_MAP, LIST_OF_LANGUAGES };
