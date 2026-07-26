import { memo } from "react";
import styles from "./styles.module.css";
import { cn } from "@/utils/cn";

export const SparkleBurst = memo(() => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {[
        { l: "10%", d: "0s" },
        { l: "30%", d: "0.3s" },
        { l: "55%", d: "0.15s" },
        { l: "72%", d: "0.5s" },
        { l: "88%", d: "0.2s" },
      ].map((s, i) => (
        <span
          key={i}
          className={cn(
            "absolute bottom-2 h-1.5 w-1.5 rounded-full bg-warning",
            styles["animate-sparkle"],
          )}
          style={{
            left: s.l,
            animationDelay: s.d,
            boxShadow: "0 0 8px oklch(0.86 0.16 90)",
          }}
        />
      ))}
    </div>
  );
});
