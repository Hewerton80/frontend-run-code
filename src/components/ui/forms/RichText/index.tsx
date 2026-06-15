import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { ToolBar } from "./ToolBar";
import style from "./style.module.css";
import { HEADING_LEVELS } from "@/utils/tiptapHelpers";
import { ResizableImageExtension } from "./CustomExtensions/ResizableImageExtension";

const extensions = [
  StarterKit.configure({
    orderedList: { HTMLAttributes: { class: "list-decimal" } },
    bulletList: { HTMLAttributes: { class: "list-disc" } },
    code: { HTMLAttributes: { class: "bg-accent rounded-md p-1" } },
    horizontalRule: { HTMLAttributes: { class: "my-2" } },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-muted p-3 text-sm rounded-lg",
      },
    },
    heading: {
      levels: HEADING_LEVELS,
      HTMLAttributes: { class: "tiptap-heading" },
    },
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight.configure({ multicolor: true }),
  TextStyle,
  Color,
  Underline,
  Link,
  ResizableImageExtension,
];

const content = `
<h2 class="tiptap-heading" style="text-align: center">Hello world 🌍</h2>
`;

const RichText = () => {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="border w-full relative rounded-md overflow-hidden pb-3">
      <ToolBar editor={editor} />
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={style.editor}
      >
        <EditorContent className="outline-none" editor={editor} />
      </div>
    </div>
  );
};

export { RichText };
