import { cn } from "@/utils/cn";
import styles from "./styles.module.css";
import { memo } from "react";

export const RocketFlying = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <div className={styles["animate-rocket-fly"]}>
        <svg
          viewBox="0 0 140 90"
          className="h-16 w-24 drop-shadow-[0_4px_18px_rgba(88,101,242,0.55)]"
        >
          {/* Flame trail */}
          <g
            className={styles["animate-rocket-flame"]}
            style={{ transformOrigin: "34px 45px" }}
          >
            <path d="M34 45 L6 38 L14 45 L6 52 Z" fill="#FFB020" />
            <path d="M34 45 L14 40 L20 45 L14 50 Z" fill="#FF6A2B" />
            <path d="M34 45 L22 42 L26 45 L22 48 Z" fill="#FFE27A" />
          </g>
          {/* Rocket body */}
          <g transform="translate(30 15)">
            {/* main body */}
            <path
              d="M8 30 Q8 12 40 6 Q78 6 92 22 Q78 38 40 54 Q8 48 8 30 Z"
              fill="#4DA8E0"
              stroke="#0F1230"
              strokeWidth="2"
            />
            {/* nose highlight */}
            <path
              d="M60 12 Q80 12 90 22 Q78 30 62 30 Q56 20 60 12 Z"
              fill="#7EC8F0"
            />
            {/* yellow stripe */}
            <path
              d="M18 22 Q40 12 74 14 Q60 24 40 30 Q20 30 18 22 Z"
              fill="#FFD24D"
              stroke="#0F1230"
              strokeWidth="1.5"
            />
            {/* window */}
            <circle cx="48" cy="28" r="8" fill="#0F1230" />
            <circle cx="48" cy="28" r="6" fill="#5865F2" />
            <circle cx="45" cy="26" r="2" fill="#EAF1FF" />
            {/* red fins back */}
            <path
              d="M8 30 L0 20 L4 34 Z"
              fill="#E24B4B"
              stroke="#0F1230"
              strokeWidth="1.5"
            />
            <path
              d="M8 30 L0 40 L4 28 Z"
              fill="#B83636"
              stroke="#0F1230"
              strokeWidth="1.5"
            />
            {/* red fin front */}
            <path
              d="M78 42 L86 52 L72 44 Z"
              fill="#E24B4B"
              stroke="#0F1230"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
});

RocketFlying.displayName = "RocketFlying";
