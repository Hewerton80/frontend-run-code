import styles from "./index.module.css";

export function Mascot() {
  return (
    <div className="relative flex h-full min-h-105 items-center justify-center p-8">
      <div className="relative">
        {/* Glow */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full blur-3xl"
          style={{ background: "oklch(0.6 0.22 275 / 0.5)" }}
        />
        {/* Astronaut / bot */}
        <svg
          viewBox="0 0 200 220"
          className="h-64 w-64 drop-shadow-[0_20px_40px_oklch(0_0_0/0.5)]"
          fill="none"
        >
          {/* Helmet */}
          <circle
            cx="100"
            cy="80"
            r="55"
            fill="oklch(0.28 0.04 275)"
            stroke="oklch(0.62 0.22 275)"
            strokeWidth="3"
          />
          <ellipse
            cx="85"
            cy="70"
            rx="18"
            ry="10"
            fill="oklch(0.85 0.05 275 / 0.6)"
          />
          {/* Eyes */}
          <circle cx="85" cy="82" r="6" fill="oklch(0.9 0.18 200)" />
          <circle cx="115" cy="82" r="6" fill="oklch(0.9 0.18 200)" />
          <circle cx="86" cy="80" r="2" fill="white" />
          <circle cx="116" cy="80" r="2" fill="white" />
          {/* Smile */}
          <path
            d="M88 98 Q100 108 112 98"
            stroke="oklch(0.9 0.18 200)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Body */}
          <rect
            x="65"
            y="130"
            width="70"
            height="60"
            rx="14"
            fill="oklch(0.32 0.05 275)"
            stroke="oklch(0.62 0.22 275)"
            strokeWidth="3"
          />
          {/* Code symbol </> */}
          <g
            transform="translate(100, 160) scale(1.5) translate(-12, -12)"
            stroke="oklch(0.62 0.22 275)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
          </g>
          {/* Arms */}
          <rect
            x="40"
            y="140"
            width="22"
            height="12"
            rx="6"
            fill="oklch(0.32 0.05 275)"
            stroke="oklch(0.62 0.22 275)"
            strokeWidth="3"
            className={styles.armLeft}
          />
          <rect
            x="138"
            y="140"
            width="22"
            height="12"
            rx="6"
            fill="oklch(0.32 0.05 275)"
            stroke="oklch(0.62 0.22 275)"
            strokeWidth="3"
            className={styles.armRight}
          />
          {/* Antenna */}
          <line
            x1="100"
            y1="25"
            x2="100"
            y2="12"
            stroke="oklch(0.62 0.22 275)"
            strokeWidth="3"
          />
          <circle cx="100" cy="9" r="4" fill="oklch(0.75 0.19 40)" />
        </svg>
      </div>
    </div>
  );
}
