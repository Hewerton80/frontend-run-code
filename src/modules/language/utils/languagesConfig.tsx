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

interface LanguageOptions {
  editorName: CodeEditorMode;
  icon: JSX.Element;
  example: string;
  url: string;
}

export type LanguageConfig = Record<LanguageNames, LanguageOptions>;
export const languagesConfig: LanguageConfig = {
  javascript: {
    editorName: "javascript",
    url: "/images/js.webp",
    icon: <FaJs />,
    example: JSplaceholder,
  },
  python: {
    editorName: "python",
    url: "/images/py.webp",
    icon: <FaPython />,
    example: PYplaceholder,
  },
  cpp: {
    editorName: "c_cpp",
    url: "/images/cpp.webp",
    icon: <PiFileCppBold />,
    example: CPPplaceholder,
  },
};
