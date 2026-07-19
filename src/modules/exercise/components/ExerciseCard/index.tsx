import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { memo, useMemo, useRef, useState } from "react";
import { useGetCachedExerciseOfList } from "../../hooks/useGetCachedExerciseOfList";
import {
  SubmissionStatus,
  SubmissionStatusLabels,
} from "@/modules/submission/submissionType";
import { cn } from "@/utils/cn";
import {
  CheckCircle2,
  Clock,
  Zap,
  Loader2,
  XCircle,
  Timer,
  AlertTriangle,
  HelpCircle,
  FileX,
  Star,
  Trophy,
} from "lucide-react";
import { getRandomInt } from "@/utils/getRandomInt";
import { getRange } from "@/utils/getRange";
import { ExerciseCardWrapper } from "./ExerciseCardWrapper";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

const XP_BY_DIFFICULTY: Record<number, number> = {
  1: 50,
  2: 100,
  3: 150,
  4: 250,
  5: 400,
};

const DIFF_META: Record<
  number,
  { label: string; stars: number; art: string; tone: string }
> = {
  1: {
    label: "Muito Fácil",
    stars: 1,
    art: "card-art-easy",
    tone: "text-success",
  },
  2: {
    label: "Fácil",
    stars: 2,
    art: "card-art-easy",
    tone: "text-success",
  },
  3: {
    label: "Médio",
    stars: 3,
    art: "card-art-medium",
    tone: "text-warning",
  },
  4: {
    label: "Difícil",
    stars: 4,
    art: "card-art-hard",
    tone: "text-destructive",
  },
  5: {
    label: "Muito Difícil",
    stars: 5,
    art: "card-art-very-hard",
    tone: "text-destructive",
  },
};

const SUBMISSION_META: Record<
  SubmissionStatus,
  {
    label: string;
    tone: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  [SubmissionStatus.PENDING]: {
    label: "Não Submetida",
    tone: "bg-white/10 text-white/80 ring-white/15",
    icon: Clock,
  },
  [SubmissionStatus.RUNNING]: {
    label: "Executando",
    tone: "bg-info/30 text-white ring-info/50",
    icon: Loader2,
  },
  [SubmissionStatus.ACCEPTED]: {
    label: "Aceito",
    tone: "bg-success/30 text-white ring-success/60",
    icon: CheckCircle2,
  },
  [SubmissionStatus.WRONG_ANSWER]: {
    label: "Resposta errada",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: XCircle,
  },
  [SubmissionStatus.TIME_LIMIT_EXCEEDED]: {
    label: "Tempo excedido",
    tone: "bg-warning/30 text-white ring-warning/60",
    icon: Timer,
  },
  [SubmissionStatus.MEMORY_LIMIT_EXCEEDED]: {
    label: "Memória excedida",
    tone: "bg-warning/30 text-white ring-warning/60",
    icon: AlertTriangle,
  },
  [SubmissionStatus.RUNTIME_ERROR]: {
    label: "Erro em execução",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: AlertTriangle,
  },
  [SubmissionStatus.COMPILATION_ERROR]: {
    label: "Erro de compilação",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: AlertTriangle,
  },
  [SubmissionStatus.UNKNOWN_ERROR]: {
    label: "Erro desconhecido",
    tone: "bg-destructive/30 text-white ring-destructive/60",
    icon: HelpCircle,
  },
  [SubmissionStatus.NO_OUTPUT]: {
    label: "Sem saída",
    tone: "bg-white/10 text-white/80 ring-white/15",
    icon: FileX,
  },
};
// Deterministic art emoji per exercise
const ART_EMOJIS = [
  "🐉",
  "⚔️",
  "🧙",
  "🛡️",
  "🔮",
  "🏹",
  "👑",
  "🗝️",
  "💎",
  "🧝",
  "🦅",
  "🐺",
  "🔥",
  "❄️",
  "⚡",
];

interface ExerciseCardProps {
  exerciseUuId: string;
  listId: number;
  classroomUuId: string;
}

export const ExerciseCard = memo(
  ({ exerciseUuId, listId, classroomUuId }: ExerciseCardProps) => {
    const { exerciseOfList: ex } = useGetCachedExerciseOfList(
      exerciseUuId,
      listId,
    );

    const submissionStatus = useMemo(
      () => ex?.submissionStatus!,
      [ex?.submissionStatus],
    );

    const diff = DIFF_META[ex.difficulty || 1];
    const sub = SUBMISSION_META[submissionStatus || SubmissionStatus.PENDING];
    const SubIcon = sub.icon;
    const spin = submissionStatus === SubmissionStatus.RUNNING;
    const done = submissionStatus === SubmissionStatus.ACCEPTED;

    const emoji = useMemo(
      () => ART_EMOJIS[getRandomInt(0, ART_EMOJIS.length - 1)],
      [],
    );
    const xp = XP_BY_DIFFICULTY[ex.difficulty || 1];

    return (
      <ExerciseCardWrapper
        classroomUuId={classroomUuId}
        exerciseUuId={exerciseUuId}
        listId={listId}
        done={done}
      >
        {/* Top bar: XP gem + stars + language */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* <XPGem xp={xp} /> */}
            <DifficultyStars count={diff.stars} tone={diff.tone} />
          </div>
          {/* <span
          title={langMeta.label}
          className="inline-grid h-6 w-6 place-items-center rounded-md font-black text-black text-[10px] shadow-card ring-1 ring-white/20"
          style={{ background: langMeta.color }}
        >
          {langMeta.icon}
        </span> */}
        </div>

        {/* Art window */}
        <div
          className={cn(
            "relative mt-2 flex-1 overflow-hidden rounded-xl ring-1 ring-white/10",
            // diff.art,
            done ? "card-holo card-art-medium" : "",
          )}
        >
          {/* {done && <span className="card-holo-layer" aria-hidden />} */}
          <div className="absolute inset-0 grid place-items-center">
            <span
              className={cn(
                "text-6xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)]",
                "transition-transform duration-300 group-hover:scale-110",
              )}
              aria-hidden
            >
              {done ? "🏆" : "⚔️"}
            </span>
          </div>
          {/* sheen overlay */}
          <span
            className="pointer-events-none absolute inset-0 card-sheen"
            aria-hidden
          />
          {/* grain */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(oklch(1 0 0 / 0.4) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
            aria-hidden
          />
        </div>

        {/* Name banner */}
        <div
          className={cn(
            "relative z-10 mt-2 rounded-lg card-name-banner",
            "px-2.5 py-1.5 text-center ring-1 ring-white/10",
          )}
        >
          <Tooltip textContent={ex.title} align="center">
            <span className="line-clamp-1 text-[13px] font-black tracking-tight text-white">
              {ex.title}
            </span>
          </Tooltip>
        </div>

        {/* Type + status */}
        <div className="relative z-10 mt-2 space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            [{ex?.category?.name || "N/A"}]
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
              "font-bold ring-1",
              sub.tone,
            )}
          >
            <SubIcon className={cn("size-4", spin && "animate-spin")} />
            {sub.label}
          </span>
        </div>

        {/* Footer: reward */}
        <div className="relative z-10 mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[11px]">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-bold text-primary",
              done && "line-through",
            )}
          >
            <Zap className="size-3" /> +{xp} XP
          </span>
          {done && (
            <span className="inline-flex items-center gap-1 font-bold text-warning/90">
              <Trophy className="size-3" /> Conquistado
            </span>
          )}
        </div>
        {/* <div className="flex gap-1 ">
            <div className="flex flex-col">
              <Tooltip align="start" textContent={ex?.title}>
                <h4 className="text-lg font-bold text-white mb-4 line-clamp-1">
                  {ex?.title}
                </h4>
              </Tooltip>
              {loggedUser?.role === RoleUser.STUDENT && solveStatusEmoji && (
                <Tooltip
                  align="start"
                  textContent={
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">
                        {solveStatusName} {solveStatusEmoji}
                      </p>
                    </div>
                  }
                >
                  <p className="text-base text-white line-clamp-1 w-fit">
                    Status: {solveStatusEmoji}
                  </p>
                </Tooltip>
              )}
            </div>
            <FaCode
              className={cn(
                "my-auto ml-auto text-7xl text-white opacity-80",
                "rotate-x-45 rotate-z-43 transform-3d",
                "group-hover:rotate-x-0 group-hover:rotate-z-0",
                "duration-500 ease-in-out",
              )}
            />
          </div> */}
      </ExerciseCardWrapper>
    );
  },
);

function XPGem({ xp }: { xp: number }) {
  return (
    <span
      className={cn(
        "relative inline-grid h-8 w-8 place-items-center rounded-md text-[0.625rem]",
        "font-black text-white shadow-[0_0_12px_-2px_oklch(0.62_0.22_275/0.7)] ring-1",
        "ring-white/25",
      )}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.7 0.2 275) 0%, oklch(0.5 0.22 265) 100%)",
        transform: "rotate(45deg)",
      }}
      aria-label={`${xp} XP`}
    >
      <span style={{ transform: "rotate(-45deg)" }} className="tabular-nums">
        {xp}
      </span>
    </span>
  );
}

function DifficultyStars({ count, tone }: { count: number; tone: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {getRange(1, 5).map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= count ? cn(tone, "fill-current") : "text-white/20",
          )}
        />
      ))}
    </span>
  );
}
