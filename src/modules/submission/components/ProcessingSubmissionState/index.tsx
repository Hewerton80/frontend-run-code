import { RocketFlying } from "@/components/illustrations/RocktFlyng";
import { cn } from "@/utils/cn";
import { memo, useMemo } from "react";
import styles from "./styles.module.css";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";

interface ProcessingSubmissionStateProps {
  state?: "waiting" | "active";
}

export const ProcessingSubmissionState = memo(
  ({ state }: ProcessingSubmissionStateProps) => {
    const disyplayInfo = useMemo(() => {
      if (state === "waiting") {
        return {
          title: "Aguardando submissão",
          description: "Sua submissão está na fila para ser processada...",
          gradientColorClass: cn(
            "border-primary/40 bg-linear-to-r",
            "from-primary/25 via-primary/10 to-background/60",
          ),
        };
      }
      if (state === "active") {
        return {
          title: "Processando submissão",
          description:
            "Enviando seu código para o servidor e rodando os testes...",
          gradientColorClass: cn(
            "border-info/40 bg-linear-to-r",
            "from-info/25 via-info/10 to-background/60",
          ),
        };
      }
    }, [state]);

    if (!state) return null;

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border p-4 duration-1000 ease-in-out",
          disyplayInfo?.gradientColorClass,
        )}
      >
        {/* drifting stars */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "absolute h-0.5 w-0.5 rounded-full bg-white/80",
                styles["animate-star-drift"],
              )}
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 6) * 0.3}s`,
                animationDuration: `${2.4 + (i % 4) * 0.4}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <RocketFlying />
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2">
              <p className="text-shimmer text-lg font-black uppercase tracking-[0.14em]">
                {disyplayInfo?.title}
              </p>{" "}
              <ThreeDotsLoading />
            </div>
            <p className="text-shimmer text-sm">{disyplayInfo?.description}</p>
          </div>
        </div>
      </div>
    );
  },
);

ProcessingSubmissionState.displayName = "ProcessingSubmissionState";
