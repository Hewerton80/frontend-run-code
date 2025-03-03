import { LanguageNames } from "@/types/languagesName";
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
}

export const languagesConfig: Record<LanguageNames, LanguageOptions> = {
  javascript: {
    editorName: "javascript",
    icon: <FaJs />,
    example: JSplaceholder,
  },
  python: {
    editorName: "python",
    icon: <FaPython />,
    example: PYplaceholder,
  },
  cpp: {
    editorName: "c_cpp",
    icon: <PiFileCppBold />,
    example: CPPplaceholder,
  },
};
