import { Chest } from "@/components/illustrations/Chest";
import { SparkleBurst } from "@/components/illustrations/SparkleBurst";
import { cn } from "@/utils/cn";
import { memo } from "react";

export const ProcessedSubmissionSuccessState = memo(
  ({ xp }: { xp?: number }) => {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-success/40 bg-linear-to-r",
          "from-success/25 via-success/15 to-success/5 p-4",
        )}
      >
        <SparkleBurst />
        <div className="relative z-10 flex items-center gap-4">
          <Chest />
          <div>
            <div className="text-lg font-black text-foreground">
              Parabéns! 🎉
            </div>
            <p className="text-sm text-foreground/90">
              Você resolveu o desafio
              {xp ? (
                <>
                  <span className="font-black text-warning">
                    {" "}
                    e ganhou+{xp} XP
                  </span>
                  . O baú foi aberto!
                </>
              ) : (
                "!"
              )}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

ProcessedSubmissionSuccessState.displayName = "ProcessedSubmissionSuccessState";
