import { ExternalLink, Sigma } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo, useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import katex from "katex";
// Import Mathematics to ensure command type augmentation is in scope
import "@tiptap/extension-mathematics";
import { Dialog } from "@/components/ui/overlay/Dialog/Dialog";
import { Button } from "@/components/ui/buttons/Button/Button";
import { Textarea } from "@/components/ui/forms/Textarea";
import {
  useMathToolBarFormSchema,
  IMathToolBarFormSchema,
} from "./mathToolBarFormSchema";

// ─── KaTeX preview ────────────────────────────────────────────────────────────

function KatexPreview({
  latex,
  displayMode,
}: {
  latex: string;
  displayMode: boolean;
}) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latex.trim()) {
      setHtml("");
      setError(null);
      return;
    }
    try {
      const rendered = katex.renderToString(latex, {
        throwOnError: true,
        displayMode,
      });
      setHtml(rendered);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Expressão LaTeX inválida");
      setHtml("");
    }
  }, [latex, displayMode]);

  if (!latex.trim()) {
    return (
      <p className="text-sm text-muted-foreground italic">
        O preview aparecerá aqui…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-danger wrap-break-word">
        <span className="font-semibold">Erro: </span>
        {error}
      </p>
    );
  }

  return (
    <div
      // className="overflow-x-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX output is safe
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── MathToolBar ──────────────────────────────────────────────────────────────

export const MathToolBar = memo(() => {
  const { editor } = useToolbar();
  const [open, setOpen] = useState(false);
  const [editingPos, setEditingPos] = useState<number | null>(null);

  const { mathToolBarFormSchemaMethods } = useMathToolBarFormSchema();
  const { handleSubmit, watch, reset, control } = mathToolBarFormSchemaMethods;

  const latexValue = watch("latex");

  // ── Detecta clique em nó inlineMath já renderizado ──────────────────────────
  const handleMathNodeClick = useCallback(
    (event: MouseEvent) => {
      if (!editor) return;
      const target = event.target as HTMLElement;
      const mathEl = target.closest(".tiptap-mathematics-render");
      if (!mathEl) return;

      // Impede que o Tiptap abra o prompt nativo
      event.preventDefault();
      event.stopPropagation();

      try {
        const pos = editor.view.posAtDOM(mathEl, 0);
        const node = editor.state.doc.nodeAt(pos);
        if (node?.type.name === "inlineMath") {
          const currentLatex = (node.attrs.latex as string) ?? "";
          setEditingPos(pos);
          reset({ latex: currentLatex });
          setOpen(true);
        }
      } catch {
        // posAtDOM pode lançar se o elemento não pertencer ao doc
      }
    },
    [editor, reset],
  );

  useEffect(() => {
    const dom = editor?.view.dom;
    if (!dom) return;
    dom.addEventListener("click", handleMathNodeClick);
    return () => dom.removeEventListener("click", handleMathNodeClick);
  }, [editor, handleMathNodeClick]);

  // ── Submit ───────────────────────────────────────────────────────────────────
  const onSubmit = useCallback(
    (data: IMathToolBarFormSchema) => {
      if (!editor) return;

      if (editingPos !== null) {
        // Modo edição: atualiza o nó existente via ProseMirror
        const { tr, doc } = editor.state;
        const node = doc.nodeAt(editingPos);
        if (node) {
          tr.setNodeMarkup(editingPos, undefined, {
            ...node.attrs,
            latex: data.latex,
          });
          editor.view.dispatch(tr);
        }
        setEditingPos(null);
      } else {
        // Modo inserção
        editor.chain().focus().insertInlineMath({ latex: data.latex }).run();
      }

      setOpen(false);
      reset();
    },
    [editor, editingPos, reset],
  );

  const isEditing = editingPos !== null;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingPos(null);
      reset();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <ToolBarButton
        onClick={() => setOpen(true)}
        icon={<Sigma className="size-4" />}
        tooltipTextContent="Inserir fórmula matemática"
      />

      <Dialog.Content size="sm">
        <Dialog.Header>
          <div className="flex items-center justify-between gap-2">
            <Dialog.Title>
              {isEditing
                ? "Editar Fórmula Matemática"
                : "Inserir Fórmula Matemática"}
            </Dialog.Title>
          </div>
        </Dialog.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-2">
            {/* Textarea LaTeX */}
            <div className="flex flex-col gap-1">
              <Controller
                name="latex"
                control={control}
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    id="math-latex"
                    label="Expressão LaTeX"
                    required
                    rows={3}
                    placeholder="\frac{a}{b} + \sqrt{x^2 + y^2}"
                    error={fieldState.error?.message}
                    textareaClassName="font-mono resize-none"
                  />
                )}
              />
              <a
                href="https://katex.org/docs/supported.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex ml-auto items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                <ExternalLink className="size-3" />
                Referência KaTeX
              </a>
            </div>
            {/* Preview KaTeX */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Preview</span>
              <div className="min-h-12 rounded-md border bg-muted/40 px-3 py-2 flex items-center justify-center">
                <KatexPreview latex={latexValue ?? ""} displayMode={false} />
              </div>
            </div>
          </div>

          <Dialog.Footer className="mt-4">
            <Dialog.Close asChild>
              <Button variantStyle="outline" type="button">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={!latexValue?.trim()}>
              {isEditing ? "Salvar" : "Inserir"}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
});

MathToolBar.displayName = "MathToolBar";
