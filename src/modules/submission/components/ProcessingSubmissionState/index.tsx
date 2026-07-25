import { RocketFlying } from "@/components/illustrations/RocktFlyng";
import { cn } from "@/utils/cn";
import { memo } from "react";
import styles from "./styles.module.css";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";

export const ProcessingSubmissionState = memo(() => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/40 bg-linear-to-r",
        "from-primary/25 via-primary/10 to-background/60 p-4",
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
            {/* TODO adicionar efeito de onda pelo texto, igual no chat gpt */}
            <p className="text-lg font-black uppercase tracking-[0.14em] text-white">
              Processando submissão
            </p>{" "}
            <ThreeDotsLoading />
          </div>
          <p className="text-sm text-white/80">
            Enviando seu código para o servidor e rodando os testes...
          </p>
        </div>
        {/* <div className="hidden items-center gap-1.5 sm:flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{
                animation: `conjure-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
});

ProcessingSubmissionState.displayName = "ProcessingSubmissionState";
