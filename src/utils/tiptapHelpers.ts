import { type Editor } from "@tiptap/core";
import katex from "katex";

export type EditorLevel = 1 | 2 | 3 | 4;
export type Alignment = "left" | "center" | "right" | "justify";

export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME =
  "node-handles-selected-style";

export function isValidUrl(url: string) {
  return /^https?:\/\/\S+$/.test(url);
}

export const HEADING_LEVELS = [1, 2, 3, 4] as EditorLevel[];

export const duplicateContent = (editor: Editor) => {
  const { view } = editor;
  const { state } = view;
  const { selection } = state;

  editor
    .chain()
    .insertContentAt(
      selection.to,
      /* eslint-disable */
      // @ts-nocheck
      selection.content().content.firstChild?.toJSON(),
      {
        updateSelection: true,
      },
    )
    .focus(selection.to)
    .run();
};

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) {
    return str;
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}

/**
 * Pós-processa o HTML serializado pelo Tiptap, substituindo os placeholders
 * de fórmulas matemáticas (`[data-type="inline-math"]`) pelo HTML renderizado
 * do KaTeX. Necessário para exibir fórmulas fora do editor via dangerouslySetInnerHTML.
 *
 * O banco continua armazenando o HTML "limpo" com `data-latex` — o editor
 * consegue re-hidratar normalmente. Apenas a exibição usa o HTML expandido.
 */
export function renderTiptapHtml(html: string): string {
  if (!html) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc
    .querySelectorAll<HTMLElement>('[data-type="inline-math"]')
    .forEach((el) => {
      const latex = el.getAttribute("data-latex") ?? "";
      if (!latex) return;
      try {
        el.innerHTML = katex.renderToString(latex, {
          throwOnError: false,
          displayMode: false,
        });
      } catch {
        // mantém o elemento original em caso de erro
      }
    });

  return doc.body.innerHTML;
}
