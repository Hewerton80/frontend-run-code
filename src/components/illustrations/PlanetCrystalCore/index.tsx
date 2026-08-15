import { cn } from "@/utils/cn";

export const PlanetCrystalCore = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn(
        "h-24 w-24 drop-shadow-[0_8px_30px_rgba(88,101,242,0.55)]",
        className,
      )}
    >
      <defs>
        <linearGradient id="splash-planet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C86FF" />
          <stop offset="55%" stopColor="#5865F2" />
          <stop offset="100%" stopColor="#2B3175" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r="34"
        fill="url(#splash-planet)"
        stroke="#0F1230"
        strokeWidth="3"
      />
      <path
        d="M32 52 Q52 44 88 54"
        stroke="#EAF1FF"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M34 70 Q56 80 86 68"
        stroke="#EAF1FF"
        strokeWidth="3"
        fill="none"
        opacity="0.35"
      />
      <circle cx="48" cy="48" r="6" fill="#A9B4FF" opacity="0.8" />
      <ellipse
        cx="60"
        cy="62"
        rx="52"
        ry="14"
        fill="none"
        stroke="#FFD24D"
        strokeWidth="3"
        opacity="0.8"
        transform="rotate(-18 60 62)"
      />
    </svg>
  );
};
