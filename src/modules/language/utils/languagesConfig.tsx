import { LanguageNames } from "@/modules/language/types/languagesName";
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
  icon: JSX.Element | string;
  example: string;
  url: string;
  bgColor: string;
  fgColor: string;
}

export type LanguagesConfigMap = Record<LanguageNames, LanguageConfig>;

const LANGUAGES_CONFIG_MAP: LanguagesConfigMap = {
  javascript: {
    value: "javascript",
    label: "JavaScript",
    editorName: "javascript",
    url: "/images/js.webp",
    icon: "JS",
    example: JSplaceholder,
    bgColor: "var(--lang-js-background)",
    fgColor: "var(--lang-js-foreground)",
  },
  python: {
    value: "python",
    label: "Python",
    editorName: "python",
    url: "/images/py.webp",
    icon: "PY",
    example: PYplaceholder,
    bgColor: "var(--lang-py-background)",
    fgColor: "var(--lang-py-foreground)",
  },
  cpp: {
    value: "cpp",
    label: "C++",
    editorName: "c_cpp",
    url: "/images/cpp.webp",
    icon: "C++",
    example: CPPplaceholder,
    bgColor: "var(--lang-cpp-background)",
    fgColor: "var(--lang-cpp-foreground)",
  },
};
// js: { label: "JavaScript", icon: "JS", color: "var(--lang-js-background)" },
// py: { label: "Python", icon: "PY", color: "var(--lang-py-background)" },
// c: { label: "C", icon: "C", color: "var(--lang-c)" },
// ts: { label: "TypeScript", icon: "TS", color: "var(--lang-ts)" },
// html: { label: "HTML", icon: "HT", color: "var(--lang-html)" },
const LIST_OF_LANGUAGES = Object.values(LANGUAGES_CONFIG_MAP);

export { LANGUAGES_CONFIG_MAP, LIST_OF_LANGUAGES };
