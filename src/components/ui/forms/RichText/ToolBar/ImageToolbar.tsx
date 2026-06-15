import { Image } from "lucide-react";
import { ToolBarButton } from "./ToolBarButton";
import { useToolbar } from "./ToolBarProvider";
import { memo, useState } from "react";
import { Dialog } from "@/components/ui/overlay/Dialog/Dialog";
import { Input } from "@/components/ui/forms/inputs/Input/Input";
import { Button } from "@/components/ui/buttons/Button/Button";
import {
  useImageToolBarFormSchema,
  IImageToolBarFormSchema,
} from "./imageToolBarFormSchema";

export const ImageToolBar = memo(() => {
  const { editor } = useToolbar();
  const [open, setOpen] = useState(false);

  const { imageToolBarFormSchemaMethods } = useImageToolBarFormSchema();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = imageToolBarFormSchemaMethods;

  const urlValue = watch("url");

  const onSubmit = (data: IImageToolBarFormSchema) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: data.url, alt: data.altText ?? "" })
      .run();
    setOpen(false);
    reset();
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <ToolBarButton
        onClick={() => setOpen(true)}
        icon={<Image className="size-4" />}
        tooltipTextContent="Image"
      />
      <Dialog.Content size="xs">
        <Dialog.Header>
          <Dialog.Title>Inserir Imagem</Dialog.Title>
        </Dialog.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-2">
            <Input
              id="image-url"
              label="URL da Imagem"
              required
              placeholder="https://exemplo.com/imagem.png"
              error={errors.url?.message}
              {...register("url")}
            />
            <Input
              id="image-alt"
              label="Texto alternativo (alt)"
              placeholder="Descrição da imagem"
              {...register("altText")}
            />
          </div>
          <Dialog.Footer className="mt-4">
            <Dialog.Close asChild>
              <Button variantStyle="outline" type="button">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={!urlValue?.trim()}>
              Inserir
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
});

ImageToolBar.displayName = "ImageToolBar";
