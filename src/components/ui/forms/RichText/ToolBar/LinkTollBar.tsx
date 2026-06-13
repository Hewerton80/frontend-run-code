import { Trash2, Link } from "lucide-react";
import { memo, useCallback, useEffect, useState, type FormEvent } from "react";
import { Popover } from "@/components/ui/overlay/Popover/Popover";
import { useToolbar } from "./ToolBarProvider";
import { getUrlFromString } from "@/utils/tiptapHelpers";
import { ToolBarButton } from "./ToolBarButton";
import { Button } from "@/components/ui/buttons/Button";
import { Input } from "../../inputs/Input";

const LinkToolbar = memo(() => {
  const { editor, editorState } = useToolbar();
  const [link, setLink] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const url = getUrlFromString(link);
      if (!url) return;
      editor?.chain().focus().setLink({ href: url }).run();
    },
    [editor, link],
  );

  useEffect(() => {
    setLink(editor?.getAttributes("link").href ?? "");
  }, [editor]);

  return (
    <Popover.Root>
      <Popover.Trigger disabled={!editorState.canLink} asChild>
        <ToolBarButton
          className="min-w-fit max-w-fit p-2!"
          tooltipTextContent="Link"
          isActive={editorState?.isLink}
          icon={<Link className="h-4 w-4" />}
          disabled={!editorState.canLink}
        />
      </Popover.Trigger>

      <Popover.Content
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
        asChild
        className="relative px-3 py-2.5"
      >
        <div className="relative">
          <Popover.Close />
          <form onSubmit={handleSubmit}>
            {/* <Label>Link</Label>
              <p className="text-sm text-gray-11">
                Attach a link to the selected text
              </p> */}
            <div className="mt-3 flex flex-col items-end justify-end gap-3">
              <Input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                label="Anexe um link ao texto selecionado."
                placeholder="https://example.com"
              />
              <div className="flex items-center gap-3">
                {editor?.getAttributes("link").href && (
                  <Button
                    type="reset"
                    variantStyle="dark-ghost"
                    onClick={() => {
                      editor?.chain().focus().unsetLink().run();
                      setLink("");
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
                <Button type="submit">
                  {editor?.getAttributes("link").href ? "Update" : "Confirm"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
});

LinkToolbar.displayName = "LinkToolbar";

export { LinkToolbar };
