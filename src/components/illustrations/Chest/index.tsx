import { memo } from "react";
import styles from "./styles.module.css";

export const Chest = memo(() => {
  return (
    <div className={styles["animate-chest-open"]}>
      <svg viewBox="0 0 64 56" className="h-14 w-16" aria-hidden>
        <defs>
          <linearGradient id="chest-body" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.42 0.08 55)" />
            <stop offset="1" stopColor="oklch(0.28 0.06 45)" />
          </linearGradient>
          <linearGradient id="chest-gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.86 0.16 90)" />
            <stop offset="1" stopColor="oklch(0.6 0.14 80)" />
          </linearGradient>
          <radialGradient id="chest-glow" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0" stopColor="oklch(0.92 0.18 90 / 0.9)" />
            <stop offset="1" stopColor="oklch(0.92 0.18 90 / 0)" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="26" r="24" fill="url(#chest-glow)" />
        {/* Body */}
        <rect
          x="6"
          y="26"
          width="52"
          height="26"
          rx="3"
          fill="url(#chest-body)"
          stroke="oklch(0.22 0.03 275)"
        />
        {/* Lid */}
        <g
          style={{
            transformOrigin: "32px 26px",
            transform: "rotate(-38deg)",
            transition: "transform 0.6s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          <path
            d="M6 26 Q6 10 32 10 Q58 10 58 26 Z"
            fill="url(#chest-body)"
            stroke="oklch(0.22 0.03 275)"
          />
          <rect
            x="28"
            y="22"
            width="8"
            height="6"
            rx="1"
            fill="url(#chest-gold)"
          />
        </g>
        {/* Gold bands */}
        <rect x="6" y="32" width="52" height="3" fill="url(#chest-gold)" />
        <rect x="6" y="48" width="52" height="3" fill="url(#chest-gold)" />
        <g>
          <circle cx="20" cy="30" r="1.6" fill="oklch(0.92 0.18 90)" />
          <circle cx="32" cy="24" r="2" fill="oklch(0.92 0.18 90)" />
          <circle cx="44" cy="30" r="1.6" fill="oklch(0.92 0.18 90)" />
        </g>
      </svg>
    </div>
  );
});
Chest.displayName = "Chest";
