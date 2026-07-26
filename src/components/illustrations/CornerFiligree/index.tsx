import { memo } from "react";

export const CornerFiligree = memo(
  ({ className = "", rotate = 0 }: { className?: string; rotate?: number }) => {
    return (
      <svg
        viewBox="0 0 40 40"
        className={className}
        style={{ transform: `rotate(${rotate}deg)` }}
        aria-hidden
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M2 2 L2 14 M2 2 L14 2" />
          <path d="M2 14 Q 10 14 14 10 Q 14 2 14 2" />
          <circle cx="14" cy="14" r="1.6" fill="currentColor" />
          <path d="M6 6 L10 10" />
        </g>
      </svg>
    );
  },
);
CornerFiligree.displayName = "CornerFiligree";
