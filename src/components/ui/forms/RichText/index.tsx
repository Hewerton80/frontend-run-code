import {
  EditorContent,
  EditorOptions,
  type Extension,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Mathematics } from "@tiptap/extension-mathematics";
import { ToolBar } from "./ToolBar";
import { HEADING_LEVELS } from "@/utils/tiptapHelpers";
import { ResizableImageExtension } from "./CustomExtensions/ResizableImageExtension";
import { forwardRef, memo, useId } from "react";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { cn } from "@/utils/cn";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: { class: "tiptap-list tiptap-list-decimal" },
    },
    bulletList: { HTMLAttributes: { class: "tiptap-list tiptap-list-disc" } },
    code: { HTMLAttributes: { class: "tiptap-code" } },
    horizontalRule: { HTMLAttributes: { class: "my-2" } },
    codeBlock: { HTMLAttributes: { class: "tiptap-code-block " } },
    heading: {
      levels: HEADING_LEVELS,
      HTMLAttributes: { class: "tiptap-heading" },
    },
    paragraph: { HTMLAttributes: { class: "tiptap-paragraph" } },
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight.configure({ multicolor: true }),
  TextStyle,
  Color,
  Underline,
  Link.configure({ HTMLAttributes: { class: "tiptap-link" } }),
  ResizableImageExtension,
  Mathematics.configure({ katexOptions: { throwOnError: false } }),
];

interface RichTextValue {
  html: string;
  text: string;
  json: any;
}
interface RichTextProps extends Omit<
  Partial<EditorOptions>,
  "extensions" | "content" | "onUpdate" | "immediatelyRender"
> {
  id?: string;
  label?: string;
  error?: string;
  html?: string;
  required?: boolean;
  onChange?: (value: RichTextValue) => void;
}
const RichText = memo(
  forwardRef(
    (
      { html, label, error, id, required, onChange, ...props }: RichTextProps,
      ref?: any,
    ) => {
      const reactId = useId();
      const htmlFor = id || reactId;

      const editor = useEditor({
        extensions: extensions as Extension[],
        content: html,
        onUpdate: ({ editor }) => {
          const html = editor.getHTML();
          const text = editor.getText();
          const json = editor.getJSON();
          onChange?.({ html, text, json });
          console.log({ html, text, json });
        },
        immediatelyRender: false,
        ...props,
      });

      if (!editor) {
        return null;
      }
      return (
        <div className="flex flex-col">
          {label && (
            <FormLabel required={required} htmlFor={htmlFor}>
              {label}
            </FormLabel>
          )}
          <a className="tiptap-link" href="http://">
            apenas um teste
          </a>
          <div
            className={cn(
              "border w-full relative rounded-md overflow-hidden pb-3",
              error && "border-danger",
            )}
          >
            <ToolBar editor={editor} />
            <div
              onClick={() => editor?.chain().focus().run()}
              className="cursor-text min-h-72 w-full bg-transparent"
            >
              <EditorContent
                ref={ref}
                className="outline-none"
                editor={editor}
              />
            </div>
          </div>
          {error && <FormHelperText>{error}</FormHelperText>}
        </div>
      );
    },
  ),
);

export { RichText };
