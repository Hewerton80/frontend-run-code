import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { ToolBarButton } from "../ToolBar/ToolBarButton";

const MIN_WIDTH = 50;

type AlignValue = "left" | "center" | "right";
type CornerDirection = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNERS: CornerDirection[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const CORNER_CURSORS: Record<CornerDirection, string> = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
};

const ALIGN_MARGIN: Record<AlignValue, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export function ResizableImageView({
  node,
  editor,
  updateAttributes,
}: NodeViewProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [resizing, setResizing] = useState(false);
  const [activeCorner, setActiveCorner] = useState<CornerDirection>("bottom-right");
  const [resizeInitialWidth, setResizeInitialWidth] = useState(0);
  const [resizeInitialMouseX, setResizeInitialMouseX] = useState(0);

  const align: AlignValue = (node.attrs.align as AlignValue) ?? "center";

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth && img.naturalHeight) {
        updateAttributes({
          aspectRatio: img.naturalWidth / img.naturalHeight,
        });
      }
    },
    [updateAttributes],
  );

  const startResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, corner: CornerDirection) => {
      e.preventDefault();
      e.stopPropagation();
      setResizing(true);
      setActiveCorner(corner);
      setResizeInitialMouseX(e.clientX);
      if (imageRef.current) {
        setResizeInitialWidth(imageRef.current.offsetWidth);
      }
    },
    [],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>, corner: CornerDirection) => {
      e.preventDefault();
      setResizing(true);
      setActiveCorner(corner);
      setResizeInitialMouseX(e.touches[0]?.clientX ?? 0);
      if (imageRef.current) {
        setResizeInitialWidth(imageRef.current.offsetWidth);
      }
    },
    [],
  );

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;

      const dx = e.clientX - resizeInitialMouseX;
      const isLeftCorner = activeCorner.includes("left");
      const delta = isLeftCorner ? -dx : dx;

      const newWidth = Math.max(MIN_WIDTH, resizeInitialWidth + delta);
      const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? Infinity;

      if (newWidth <= parentWidth) {
        updateAttributes({ width: newWidth });
      }
    },
    [resizing, resizeInitialMouseX, activeCorner, resizeInitialWidth, updateAttributes],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!resizing) return;

      const clientX = e.touches[0]?.clientX ?? resizeInitialMouseX;
      const dx = clientX - resizeInitialMouseX;
      const isLeftCorner = activeCorner.includes("left");
      const delta = isLeftCorner ? -dx : dx;

      const newWidth = Math.max(MIN_WIDTH, resizeInitialWidth + delta);
      const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? Infinity;

      if (newWidth <= parentWidth) {
        updateAttributes({ width: newWidth });
      }
    },
    [resizing, resizeInitialMouseX, activeCorner, resizeInitialWidth, updateAttributes],
  );

  const endResize = useCallback(() => {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", endResize);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", endResize);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", endResize);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", endResize);
    };
  }, [resize, endResize, handleTouchMove]);

  const isEditable = editor?.isEditable ?? false;

  return (
    <NodeViewWrapper
      ref={nodeRef}
      style={{ width: node.attrs.width ?? "100%" }}
      className={cn("relative block", ALIGN_MARGIN[align])}
    >
      <div className={`group relative${resizing ? " select-none" : ""}`}>
        <img
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt ?? ""}
          title={node.attrs.title ?? undefined}
          style={{ width: "100%", height: "auto", display: "block" }}
          onLoad={handleImageLoad}
          draggable={false}
        />

        {isEditable && (
          <>
            {/* Alignment toolbar */}
            <div
              className={cn(
                "absolute left-1/2 top-2 -translate-x-1/2",
                "flex items-center gap-0.5 rounded-md border bg-background/90 p-0.5",
                "opacity-0 backdrop-blur transition-opacity",
                !resizing && "group-hover:opacity-100",
              )}
            >
              <ToolBarButton
                icon={<AlignLeft className="size-4" />}
                tooltipTextContent="Align left"
                isActive={align === "left"}
                onClick={() => updateAttributes({ align: "left" })}
              />
              <ToolBarButton
                icon={<AlignCenter className="size-4" />}
                tooltipTextContent="Align center"
                isActive={align === "center"}
                onClick={() => updateAttributes({ align: "center" })}
              />
              <ToolBarButton
                icon={<AlignRight className="size-4" />}
                tooltipTextContent="Align right"
                isActive={align === "right"}
                onClick={() => updateAttributes({ align: "right" })}
              />
            </div>

            {/* Corner resize handles */}
            {CORNERS.map((corner) => (
              <div
                key={corner}
                className={`image-resize-handle image-resize-handle-${corner}`}
                style={{ cursor: CORNER_CURSORS[corner] }}
                onMouseDown={(e) => startResize(e, corner)}
                onTouchStart={(e) => handleTouchStart(e, corner)}
              />
            ))}
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}
