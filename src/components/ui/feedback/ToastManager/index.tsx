import { ToastArgs, useToast } from "@/hooks/useToast";
import { memo, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import style from "./style.module.css";
import {
  LuInfo,
  LuTriangleAlert,
  LuBan,
  LuBadgeCheck,
  LuX,
} from "react-icons/lu";

// ---------------------------------------------------------------------------
// Variant styles — uses the project's CSS variables for all four types.
// The `[&_.progress]` selector targets the progress bar child element.
// ---------------------------------------------------------------------------
const toastVariants: Record<ToastArgs["type"], string> = {
  success: cn("bg-success text-success-foreground", "[&_.progress]:bg-white"),
  error: cn(
    "border-danger bg-danger text-danger-foreground",
    "[&_.progress]:bg-white",
  ),
  warning: cn("bg-warning text-warning-foreground", "[&_.progress]:bg-white"),
  info: cn("bg-info text-info-foreground", "[&_.progress]:bg-white"),
};

// ---------------------------------------------------------------------------
// ToastProgress — translateX-based progress bar.
// Starts at translateX(0%) and transitions to translateX(-100%) over
// `duration` ms, giving a left-to-right shrink effect.
// ---------------------------------------------------------------------------
const ToastProgress = ({ duration = 5000 }: { duration?: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 100 ms delay ensures the CSS transition has a defined start state
    // before animating (mirrors the original Toaster behaviour).
    const timer = setTimeout(() => setProgress(100), 100);
    return () => {
      setProgress(0);
      clearTimeout(timer);
    };
  }, []);

  return (
    <span
      // "progress" class is the selector target for [&_.progress]:bg-white
      // in the variant map above.
      className="progress absolute bottom-0 left-0 h-1 w-full transition-transform ease-linear"
      style={{
        transform: `translateX(-${progress}%)`,
        transitionDuration: `${duration}ms`,
      }}
    />
  );
};

// ---------------------------------------------------------------------------
// ToastInner — single toast item.
// Entrada: tailwindcss-animate (data-state="open" → slide-in-from-top-full).
// Saída:   CSS module com animation-fill-mode: forwards (elimina o flash de
//          reapresentação causado pela race condition do setTimeout).
//          onAnimationEnd chama onFinalizeRemove para remover o nó do DOM
//          somente após a animação de saída ter concluído de verdade.
// ---------------------------------------------------------------------------
const ToastInner = memo(
  ({
    toast,
    onRemove,
    onFinalizeRemove,
  }: {
    toast: ToastArgs;
    onRemove: (id: string) => void;
    onFinalizeRemove: (id: string) => void;
  }) => {
    return (
      <div
        // data-state="open" ativa as classes tailwindcss-animate de entrada.
        // Quando isExiting=true a classe CSS module de saída é aplicada diretamente,
        // sem depender de data-state="closed" (que causava o flash).
        data-state={toast.isExiting ? "closed" : "open"}
        role={
          toast.type === "error" || toast.type === "warning"
            ? "alert"
            : "status"
        }
        aria-live={
          toast.type === "error" || toast.type === "warning"
            ? "assertive"
            : "polite"
        }
        aria-atomic="true"
        onAnimationEnd={() => {
          // Só finaliza a remoção quando a animação de SAÍDA terminar.
          // A animação de entrada também dispara onAnimationEnd — ignoramos ela.
          if (toast.isExiting) {
            onFinalizeRemove(toast.id);
          }
        }}
        className={cn(
          // Base layout
          "group pointer-events-auto relative flex w-full items-center justify-between",
          "space-x-2 overflow-hidden rounded-md p-4 pr-6 shadow-lg transition-all",
          // tailwindcss-animate — apenas entrada (data-state="open")
          "data-[state=open]:animate-in",
          "data-[state=open]:slide-in-from-top-full",
          "duration-300",
          // CSS module — saída com fill-mode: forwards (sem flash)
          toast.isExiting && style.toastExit,
          // Colour variant
          toastVariants[toast.type],
        )}
      >
        {/* Type icon */}
        <span className="shrink-0" aria-hidden="true">
          {toast.type === "success" && <LuBadgeCheck className="size-4" />}
          {toast.type === "error" && <LuBan className="size-4" />}
          {toast.type === "warning" && <LuTriangleAlert className="size-4" />}
          {toast.type === "info" && <LuInfo className="size-4" />}
        </span>

        {/* Message */}
        <div className="flex-1 text-sm font-semibold">{toast.message}</div>

        {/* Close button — hidden until group hover or focus */}
        <button
          type="button"
          onClick={() => onRemove(toast.id)}
          aria-label="Dispensar notificação"
          className={cn(
            "absolute right-1 top-1 cursor-pointer rounded-md p-1",
            "opacity-100 text-foreground/50 transition-opacity",
            "text-foreground focus:outline-none focus:ring-1",
            // "group-hover:opacity-100",
          )}
        >
          <LuX className="size-4" aria-hidden="true" />
        </button>

        {/* Progress bar */}
        <ToastProgress duration={toast.duration} />
      </div>
    );
  },
);

ToastInner.displayName = "ToastInner";

// ---------------------------------------------------------------------------
// ToastManager — viewport container.
// Fixed top-right, z-[100], max-w-[420px] on md+,
// flex-col-reverse on mobile so newest toasts appear on top.
// ---------------------------------------------------------------------------
export function ToastManager() {
  const { toasts, removeToast, finalizeRemove } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notificações"
      aria-atomic="false"
      className={cn(
        "fixed top-0 right-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 gap-4",
        "sm:flex-col md:max-w-105",
      )}
    >
      {toasts.map((n: ToastArgs) => (
        <ToastInner
          key={n.id}
          toast={n}
          onRemove={removeToast}
          onFinalizeRemove={finalizeRemove}
        />
      ))}
    </div>
  );
}
