import { LanguageNames } from "@/types/languagesName";

interface LanguageOptions {
  editorName: string;
}

export const languagesConfig: Record<LanguageNames, LanguageOptions> = {
  javascript: {
    editorName: "javascript",
  },
  python: {
    editorName: "python",
  },
  cpp:{
    editorName: "c_cpp",
  }
};
