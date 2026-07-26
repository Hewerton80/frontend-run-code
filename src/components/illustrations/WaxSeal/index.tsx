import { memo } from "react";

export const WaxSeal = memo(({ label = "Q" }: { label?: string }) => {
  return (
    <span className="relative inline-grid h-10 w-10 place-items-center">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, oklch(0.72 0.22 275), oklch(0.42 0.22 275) 70%)",
          boxShadow:
            "0 0 0 2px oklch(0.14 0.02 275), 0 0 0 3px oklch(0.62 0.22 275 / 0.5), inset 0 -3px 6px oklch(0 0 0 / 0.35), inset 0 2px 4px oklch(1 0 0 / 0.15)",
        }}
        aria-hidden
      />
      <span className="relative text-sm font-black text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
        {label}
      </span>
    </span>
  );
});
WaxSeal.displayName = "WaxSeal";
